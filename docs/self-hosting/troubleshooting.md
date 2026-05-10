---
id: troubleshooting
title: Troubleshooting
sidebar_label: Troubleshooting
sidebar_position: 7
---

# Troubleshooting

## PM2 process not found

If you get "process not found" when running `pm2` commands, you are likely running as a different user from the one that started PM2. Prefix commands with `sudo -u <user>`:

```bash
sudo -u bot pm2 status
sudo -u bot pm2 restart all
```

## Slash commands not appearing in Discord

- Confirm `pnpm deploy:commands` completed without errors.
- **Guild commands** (when `DISCORD_GUILD_ID` is set) appear immediately.
- **Global commands** (no `DISCORD_GUILD_ID`) can take up to **60 minutes** to propagate. Set `DISCORD_GUILD_ID` during development.

## Dashboard login fails

1. Verify `DISCORD_REDIRECT_URI` in `.env` **exactly** matches the redirect registered in the Discord Developer Portal (including protocol and path).
2. Check that the API is running and healthy:
   ```bash
   curl http://localhost:4000/health
   ```
3. Check the API logs for errors:
   ```bash
   pm2 logs api
   ```

## Database connection errors

- Confirm PostgreSQL is running: `sudo systemctl status postgresql`
- Test the connection string directly:
  ```bash
  psql "postgresql://arkenbot:password@localhost:5432/arkenbot" -c "SELECT 1;"
  ```
- Make sure `DATABASE_URL` in `.env` does **not** have surrounding quotes.

## `.next` build permission errors

The `.next` directory is created by the Next.js build process. If you switch between running builds as different users, ownership conflicts can occur. Fix with:

```bash
sudo chown -R <build-user>:<group> packages/web/.next
```

## Redis connection errors

- Confirm Redis is running: `sudo systemctl status redis-server`
- Test: `redis-cli ping` — should return `PONG`.
- If your Redis instance has a password, set `REDIS_PASSWORD` in `.env`.

## Music commands not working

- Confirm Lavalink is running on the configured host and port.
- Check the bot logs for Lavalink connection errors: `pm2 logs bot`
- If you see YouTube 403 errors, set up `YOUTUBE_COOKIES_FILE` (see [Deployment → Lavalink](deployment#lavalink)).

## Bot joins but can't assign roles

The bot's role in the server role list must be **above** any roles it needs to assign. Go to **Server Settings → Roles** and drag the ArkenBot role above your managed roles.

## API returns 500 on login after a restart

Discord's OAuth2 token endpoint occasionally returns 500 during high-traffic periods or immediately after a service restart. Wait a few seconds and try again. If the error persists, check `pm2 logs api` for the underlying error.
