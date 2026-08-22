# Building an Addon

This guide walks you through creating an addon from scratch using the Arken Addon SDK. Everything here is based on the actual SDK source and the bundled example addons (`example-greeting` and `example-economy`).

---

## Prerequisites

- Node.js 20+
- pnpm (the repo uses pnpm workspaces)
- The full Arken Bot repo cloned and dependencies installed

---

## Project setup

Create a new folder inside the `addons/` directory at the root of the repo. The folder name becomes your addon's ID on disk.

```
addons/
  my-addon/
    src/
      index.ts
    package.json
    tsconfig.json
```

### package.json

```json
{
  "name": "my-addon",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "@arkenbot/addon-sdk": "workspace:*",
    "@arkenbot/shared": "workspace:*"
  },
  "peerDependencies": {
    "discord.js": "^14.0.0"
  },
  "devDependencies": {
    "discord.js": "^14.18.0",
    "typescript": "^5.7.0"
  }
}
```

### tsconfig.json

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

Install dependencies from the addon directory:

```bash
pnpm install
```

---

## Minimal addon

Every addon exports a default value created by `defineAddon()`. The manifest is the only required field.

```ts
import { defineAddon } from '@arkenbot/addon-sdk';

export default defineAddon({
  manifest: {
    name: 'my-addon',
    displayName: 'My Addon',
    version: '1.0.0',
    description: 'Does something useful.',
    author: 'Your Name',
  },
});
```

---

## Manifest fields

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Unique identifier — must match your folder name |
| `displayName` | Yes | Human-readable name shown in the dashboard |
| `version` | Yes | Semver string |
| `description` | Yes | Short description shown in the Addon Manager |
| `author` | Yes | Your name or org |
| `homepage` | No | URL to your docs or repo |
| `commands` | No | Array of command names the addon registers (informational) |
| `events` | No | Array of Discord event names the addon listens to (informational) |
| `settings` | No | Settings schema — see [Settings](#settings) |
| `permissions` | No | Discord permission strings your addon requires |
| `dependencies` | No | Other addon names this addon depends on |

---

## Commands

Register slash commands by adding a `commands` array to your definition. Each entry provides a `data` builder and an `execute` function that receives the interaction and an `AddonContext`.

```ts
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { defineAddon } from '@arkenbot/addon-sdk';

export default defineAddon({
  manifest: {
    name: 'my-addon',
    displayName: 'My Addon',
    version: '1.0.0',
    description: 'Example with a command.',
    author: 'Your Name',
    commands: ['ping'],
  },

  commands: [
    {
      data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check latency'),

      async execute(interaction, ctx) {
        const latency = interaction.client.ws.ping;
        await interaction.reply(`Pong! Latency: ${latency}ms`);
        ctx.logger.info(`/ping used in guild ${interaction.guildId}`);
      },
    },
  ],
});
```

### Autocomplete

Add an `autocomplete` function alongside `execute` to handle autocomplete interactions for that command:

```ts
{
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Check a saved server')
    .addStringOption((o) =>
      o.setName('name').setDescription('Server name').setRequired(true).setAutocomplete(true)
    ),

  async execute(interaction, ctx) {
    const name = interaction.options.getString('name', true);
    // ...
  },

  async autocomplete(interaction, ctx) {
    const focused = interaction.options.getFocused().toLowerCase();
    const saved = await ctx.storage.keys(interaction.guildId ?? undefined);
    const matches = saved
      .filter((k) => k.startsWith('server:') && k.includes(focused))
      .slice(0, 25)
      .map((k) => ({ name: k.replace('server:', ''), value: k.replace('server:', '') }));
    await interaction.respond(matches);
  },
},
```

---

## Event listeners

Listen to any Discord.js gateway event by adding an `events` array. The `handler` receives the `AddonContext` as the first argument, followed by the event's normal arguments.

```ts
import { defineAddon } from '@arkenbot/addon-sdk';
import type { GuildMember } from 'discord.js';

export default defineAddon({
  manifest: {
    name: 'my-addon',
    displayName: 'My Addon',
    version: '1.0.0',
    description: 'Greets new members.',
    author: 'Your Name',
    events: ['guildMemberAdd'],
  },

  events: [
    {
      event: 'guildMemberAdd',
      async handler(ctx, member: GuildMember) {
        const channelId = await ctx.getSetting<string>(member.guild.id, 'channelId');
        if (!channelId) return;

        const channel = member.guild.channels.cache.get(channelId);
        if (!channel?.isTextBased()) return;

        await channel.send(`Welcome, <@${member.id}>!`).catch(() => null);
      },
    },
  ],
});
```

Set `once: true` on an event to have the handler fire only on the first occurrence:

```ts
{
  event: 'ready',
  once: true,
  async handler(ctx, client) {
    ctx.logger.info(`Logged in as ${client.user.tag}`);
  },
},
```

---

## Lifecycle hooks

Hooks let the runtime notify your addon at key moments. All hooks are optional.

| Hook | When it fires |
|---|---|
| `onLoad` | Once when the addon activates at bot startup |
| `onUnload` | When the addon is deactivated or the process shuts down |
| `onSettingsUpdate` | Each time a guild admin saves new settings for this addon |
| `onGuildInstall` | When a guild installs your addon for the first time |
| `onGuildUninstall` | When a guild removes your addon |

```ts
hooks: {
  async onLoad(ctx) {
    ctx.logger.info('Addon loaded — setting up...');
  },

  async onUnload(ctx) {
    ctx.logger.info('Addon unloaded — cleaning up...');
  },

  async onSettingsUpdate(ctx, guildId, settings) {
    ctx.logger.info(`Settings updated for guild ${guildId}`, settings);
    // Bust any caches that depend on these settings.
  },

  async onGuildInstall(ctx, guildId) {
    // Seed default data for this guild.
    await ctx.storage.set('installed', true, guildId);
  },

  async onGuildUninstall(ctx, guildId) {
    // Clean up guild-specific data.
    const keys = await ctx.storage.keys(guildId);
    for (const key of keys) {
      await ctx.storage.delete(key, guildId);
    }
  },
},
```

---

## AddonContext

Every command handler, event handler, and lifecycle hook receives an `AddonContext` (`ctx`). It provides everything your addon needs to interact with the bot.

| Property / Method | Type | Description |
|---|---|---|
| `ctx.addonName` | `string` | Your addon's manifest name |
| `ctx.client` | `discord.js Client` | The live Discord client |
| `ctx.storage` | `AddonStorage` | Per-guild key-value persistence |
| `ctx.logger` | `AddonLogger` | Structured logger |
| `ctx.events` | `AddonEventBus` | Inter-addon event bus |
| `ctx.getSettings(guildId)` | `Promise<Record<string, unknown>>` | All settings for a guild |
| `ctx.getSetting(guildId, key, default?)` | `Promise<T>` | A single setting value |
| `ctx.getGuild(guildId)` | `Guild \| undefined` | Guild from the client cache |
| `ctx.resolveLocale(arg)` | `Promise<string>` | Picks the viewer's language (see [Localization](#localization-i18n)) |
| `ctx.t(key, locale, vars?)` | `string` | Translates a key from your addon's catalogs |

---

## Localization (i18n)

Your addon can speak the same 11 languages as the core bot. Ship message catalogs on your `AddonDefinition` and the runtime wires up translation for you — no extra dependencies.

### 1. Declare catalogs with `locales`

`locales` is a map of locale code → a nested object of message strings. Provide `en-US` (the fallback) plus any languages you want to support.

```ts
// src/locales.ts
import type { AddonMessages } from '@arkenbot/addon-sdk';

export const locales: AddonMessages = {
  'en-US': {
    greet: { hello: 'Hello, {name}!' },
  },
  'es-ES': {
    greet: { hello: '¡Hola, {name}!' },
  },
};
```

```ts
// src/index.ts
import { defineAddon } from '@arkenbot/addon-sdk';
import { locales } from './locales.js';

export default defineAddon({
  locales,
  manifest: { /* … */ },
  // …
});
```

### 2. Resolve the viewer's language

`ctx.resolveLocale(arg)` returns the locale code to reply in. It follows the same rules as the core bot: the user's saved preference, then their Discord client language, then the guild default, falling back to `en-US`.

A discord.js `ChatInputCommandInteraction` (or context-menu interaction) satisfies the argument directly. For event handlers that don't have an interaction, pass a `LocaleResolvable`:

```ts
interface LocaleResolvable {
  user: { id: string };
  locale?: string | null;
  guildId?: string | null;
  guildLocale?: string | null;
}
```

### 3. Translate with `ctx.t`

`ctx.t(key, locale, vars?)` looks up a dot-path `key`, interpolates `{placeholders}` from `vars`, and falls back requested-locale → `en-US` → the key itself, so a missing translation is always visible but never throws.

```ts
async execute(interaction, ctx) {
  const loc = await ctx.resolveLocale(interaction);
  const t = (k: string, v?: Record<string, string | number>) => ctx.t(k, loc, v);

  await interaction.reply(t('greet.hello', { name: interaction.user.username }));
}
```

### Choosing the right locale

- **A reply or DM to one person** → resolve from that person: `ctx.resolveLocale(interaction)`, or `ctx.resolveLocale({ user: { id: targetUserId }, guildId, guildLocale: ctx.getGuild(guildId)?.preferredLocale })`.
- **A message that stays in a channel for everyone** (control panels, staff logs, transcripts) → use the guild's language so it reads consistently: `ctx.resolveLocale({ user: { id: '' }, guildId, guildLocale: ctx.getGuild(guildId)?.preferredLocale })`.

> Keep `{placeholders}`, emoji, and slash-command names identical across every locale. Slash-command and option **names** stay English (Discord restricts them to a lowercase token set); their descriptions can still be localized separately.

---

## Storage

`ctx.storage` is a scoped key-value store backed by PostgreSQL. Data is automatically namespaced to your addon — you cannot accidentally read or write another addon's data.

Pass a `guildId` to scope data to a specific server. Omit it for global (cross-guild) data.

```ts
// Store a value for a specific guild
await ctx.storage.set('welcome:channelId', '123456789', guildId);

// Read it back (returns null if not set)
const channelId = await ctx.storage.get<string>('welcome:channelId', guildId);

// Delete a value
await ctx.storage.delete('welcome:channelId', guildId);

// List all keys in a guild scope
const keys = await ctx.storage.keys(guildId);
```

Keys are plain strings — use a prefix pattern (e.g. `balance:${userId}`) to organise multiple records under a single guild scope:

```ts
await ctx.storage.set(`balance:${userId}`, 500, guildId);
const balance = await ctx.storage.get<number>(`balance:${userId}`, guildId) ?? 0;
```

---

## Settings

Declare a `settings` array in your manifest to expose configuration controls in the dashboard. Each entry maps to a typed input rendered in the Addon Manager.

```ts
manifest: {
  name: 'my-addon',
  // ...
  settings: [
    {
      key: 'channelId',
      type: 'channel',
      label: 'Announcement Channel',
      description: 'Where to post announcements.',
    },
    {
      key: 'message',
      type: 'string',
      label: 'Welcome Message',
      description: 'Use {user} and {server} as placeholders.',
      default: 'Welcome, {user}!',
    },
    {
      key: 'dailyAmount',
      type: 'number',
      label: 'Daily Reward',
      default: 100,
      min: 1,
      max: 10000,
    },
    {
      key: 'enabled',
      type: 'boolean',
      label: 'Enable Feature',
      default: true,
    },
    {
      key: 'theme',
      type: 'select',
      label: 'Theme',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ],
      default: 'dark',
    },
  ],
},
```

**Setting types:**

| Type | Dashboard control | Value |
|---|---|---|
| `string` | Text input | `string` |
| `number` | Number input | `number` |
| `boolean` | Toggle | `boolean` |
| `channel` | Channel picker | Channel ID as `string` |
| `role` | Role picker | Role ID as `string` |
| `color` | Hex color picker | Hex string e.g. `#5865F2` |
| `select` | Dropdown | One of the `options[].value` strings |

Read settings in your handlers with `ctx.getSetting()`. Always provide a default value so the addon works before a server admin has configured it:

```ts
const channelId = await ctx.getSetting<string>(guildId, 'channelId');
const message = await ctx.getSetting<string>(guildId, 'message', 'Welcome, {user}!');
const amount = await ctx.getSetting<number>(guildId, 'dailyAmount', 100);
```

---

## Logger

`ctx.logger` wraps the bot's structured logger and tags every message with your addon name, making it easy to filter in logs.

```ts
ctx.logger.info('Addon loaded successfully');
ctx.logger.warn('Config missing, using defaults');
ctx.logger.error('Failed to reach external API', error);
ctx.logger.debug('Processing guild', guildId);
```

---

## Inter-addon event bus

`ctx.events` is a typed event bus that lets addons publish and subscribe to named events. This is useful when one addon needs to react to something another addon does.

```ts
// Addon A: publish an event
await ctx.events.emit('economy:reward', { userId: '123', amount: 50, guildId: '456' });

// Addon B: subscribe to it
const unsubscribe = ctx.events.on<{ userId: string; amount: number; guildId: string }>(
  'economy:reward',
  async (data) => {
    ctx.logger.info(`User ${data.userId} received ${data.amount} coins`);
  },
);

// Fire once only
ctx.events.once('economy:reward', async (data) => { /* ... */ });

// Remove a specific handler
ctx.events.off('economy:reward', handler);
```

Subscribe in `onLoad` and store the returned unsubscribe function; call it in `onUnload` to avoid leaked handlers after the addon is deactivated.

---

## Full example

Below is a complete working addon. It demonstrates commands, storage, settings, lifecycle hooks, and logging.

```ts
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { defineAddon } from '@arkenbot/addon-sdk';

export default defineAddon({
  manifest: {
    name: 'counter',
    displayName: 'Counter',
    version: '1.0.0',
    description: 'A per-guild message counter with a leaderboard.',
    author: 'Your Name',
    commands: ['counter'],
    events: ['messageCreate'],
    settings: [
      {
        key: 'channelId',
        type: 'channel',
        label: 'Count Channel',
        description: 'Only count messages in this channel. Leave unset to count everywhere.',
      },
    ],
  },

  commands: [
    {
      data: new SlashCommandBuilder()
        .setName('counter')
        .setDescription('Show your message count')
        .addUserOption((o) =>
          o.setName('user').setDescription('User to check').setRequired(false)
        ),

      async execute(interaction, ctx) {
        if (!interaction.guildId) return;
        const target = interaction.options.getUser('user') ?? interaction.user;
        const count = await ctx.storage.get<number>(`count:${target.id}`, interaction.guildId) ?? 0;

        const embed = new EmbedBuilder()
          .setColor(0x5865f2)
          .setDescription(`**${target.tag}** has sent **${count.toLocaleString()}** messages.`);

        await interaction.reply({ embeds: [embed] });
      },
    },
  ],

  events: [
    {
      event: 'messageCreate',
      async handler(ctx, message) {
        if (message.author.bot || !message.guildId) return;

        const channelId = await ctx.getSetting<string>(message.guildId, 'channelId');
        if (channelId && message.channelId !== channelId) return;

        const key = `count:${message.author.id}`;
        const current = await ctx.storage.get<number>(key, message.guildId) ?? 0;
        await ctx.storage.set(key, current + 1, message.guildId);
      },
    },
  ],

  hooks: {
    async onLoad(ctx) {
      ctx.logger.info('Counter addon loaded');
    },
  },
});
```

---

## Building and installing

Build your addon from its directory:

```bash
cd addons/my-addon
pnpm build
```

This compiles `src/` into `dist/`. The bot runtime looks for `dist/index.js` inside every subdirectory of `addons/`. On next bot startup, your addon is discovered, registered in the database automatically, and its commands become available. No manual database entry or portal registration is needed.

To test changes, rebuild and restart the bot:

```bash
pnpm build
sudo -u bot pm2 restart bot
```

---

## Tips

- **Keep command names unique across all addons and built-in commands.** Discord command names are global — a collision will silently overwrite the other command.
- **Always guard `interaction.guildId`.** It can be null in DMs, and most addon storage and settings calls require a guild ID.
- **Use key prefixes in storage.** Multiple records under one guild scope (e.g. `balance:${userId}`, `cooldown:${userId}`) stay organised and are all returned by `ctx.storage.keys(guildId)`.
- **Read settings with a fallback.** `ctx.getSetting(guildId, key, default)` returns the default when the guild hasn't configured the addon yet, so the addon always works out of the box.
- **Clean up in `onGuildUninstall`.** Iterate `ctx.storage.keys(guildId)` and delete everything to avoid orphaned data after a guild removes your addon.
