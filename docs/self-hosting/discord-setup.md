---
id: discord-setup
title: Discord Application Setup
sidebar_label: Discord Setup
sidebar_position: 3
---

# Discord Application Setup

Before installing the bot you need to create a Discord application and bot account at the [Discord Developer Portal](https://discord.com/developers/applications).

## 1. Create the Application

1. Go to [https://discord.com/developers/applications](https://discord.com/developers/applications) and click **New Application**.
2. Give it a name (e.g. `ArkenBot`) and click **Create**.
3. Note the **Application ID** — this becomes your `DISCORD_CLIENT_ID` environment variable.

## 2. Create the Bot Account

1. In the left sidebar click **Bot**.
2. Click **Add Bot** → **Yes, do it!**
3. Under **Token**, click **Reset Token** and copy the value — this is your `DISCORD_TOKEN`.

:::danger Keep your bot token secret
Anyone with your bot token has full control of your bot. Never commit it to git or share it publicly.
:::

4. Scroll down to **Privileged Gateway Intents** and enable:

| Intent | Required for |
|---|---|
| **Server Members Intent** | Welcome messages, invite tracking, leveling |
| **Message Content Intent** | AutoMod, counting game, custom commands |

## 3. OAuth2 Configuration

1. In the left sidebar click **OAuth2** → **General**.
2. Copy the **Client Secret** — this is your `DISCORD_CLIENT_SECRET`.
3. Under **Redirects**, click **Add Redirect** and enter your dashboard callback URL:
   - Local development: `http://localhost:3000/auth/callback`
   - Production: `https://yourdomain.com/auth/callback`

:::warning Exact match required
The redirect URI in your `.env` must match the one registered here **exactly**, including the protocol and path. A mismatch causes login to fail.
:::

## 4. Invite the Bot to Your Server

1. In the left sidebar click **OAuth2** → **URL Generator**.
2. Under **Scopes** select: `bot`, `applications.commands`.
3. Under **Bot Permissions** select at minimum:
   - Manage Roles
   - Manage Channels
   - Kick Members / Ban Members
   - Read Messages / Send Messages
   - Manage Messages
   - Add Reactions
   - Embed Links / Attach Files
   - View Channel
4. Copy the generated URL, open it in a browser, and select your server to invite the bot.

:::tip Role hierarchy
Place the ArkenBot role **above** any roles you want it to manage. Discord prevents bots from assigning roles that are higher than their own.
:::

---

Next: [Installation & Configuration →](installation)
