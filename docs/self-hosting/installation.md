---
id: installation
title: Installation & Configuration
sidebar_label: Installation
sidebar_position: 4
---

# Installation & Configuration

## Clone the Repository

```bash
git clone https://github.com/t0xicVybez/ArkenBot.git
cd ArkenBot
```

## Configure Environment Variables

Copy the example file to `.env` and fill in your values:

```bash
cp .env.example .env
nano .env
```

The `.env` file lives in the **repository root** and is read by all three services. The table below covers every required variable:

| Variable | Description |
|---|---|
| `DISCORD_TOKEN` | Bot token from the Discord Developer Portal |
| `DISCORD_CLIENT_ID` | Application ID |
| `DISCORD_CLIENT_SECRET` | OAuth2 client secret |
| `DISCORD_REDIRECT_URI` | OAuth2 callback URL — must match the portal exactly |
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string (default: `redis://localhost:6379`) |
| `API_SECRET` | Random string used to sign JWTs — generate with `openssl rand -hex 32` |
| `BOT_OWNER_IDS` | Your Discord user ID — grants bot-owner access to the dashboard |
| `NEXT_PUBLIC_API_URL` | Public URL of the API (baked into the Next.js bundle at build time) |
| `NEXT_PUBLIC_WS_URL` | Public WebSocket URL of the API |
| `NEXT_PUBLIC_DISCORD_CLIENT_ID` | Same value as `DISCORD_CLIENT_ID` |
| `CORS_ORIGIN` | URL of the web dashboard (e.g. `http://localhost:3000`) |
| `WEB_URL` | Public URL of the web dashboard |
| `JWT_ACCESS_EXPIRY` | How long access tokens last (e.g. `1h`) |
| `JWT_REFRESH_EXPIRY` | How long refresh tokens last (e.g. `90d`) |

:::info NEXT_PUBLIC_* variables
These are embedded into the Next.js build **at compile time**, not at runtime. If you change them you must rebuild the `web` package with `pnpm --filter @arkenbot/web build`.
:::

### Optional Variables

| Variable | Description |
|---|---|
| `DISCORD_GUILD_ID` | Dev server ID — makes slash commands register instantly to one guild during development |
| `LAVALINK_HOST / PORT / PASSWORD` | Required for music playback (see [Deployment](deployment#lavalink)) |
| `TWITCH_CLIENT_ID / SECRET` | Required for Twitch stream alerts |
| `YOUTUBE_API_KEY` | Required for YouTube stream alerts |
| `TWITTER_BEARER_TOKEN` | Required for Twitter/X stream alerts |
| `GROQ_API_KEY` | Enables AI-powered code review in the Code Review addon |

## Install Dependencies

```bash
pnpm install
```

## Build

Build all packages in the correct dependency order:

```bash
pnpm build
```

This compiles: shared → addon-sdk → addons → API → bot → web. The first build takes a few minutes; subsequent builds are faster.

## Deploy Slash Commands

Register slash commands with Discord. Run this once after first setup and again whenever commands are added or renamed:

```bash
pnpm deploy:commands
```

:::tip Guild vs. global commands
If `DISCORD_GUILD_ID` is set, commands register to that guild instantly. Without it, commands are registered globally and may take up to one hour to appear in Discord.
:::

---

Next: [Database Setup →](database)
