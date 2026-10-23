---
id: deployment
title: Deployment
sidebar_label: Deployment
sidebar_position: 6
---

# Deployment

## Running with PM2

PM2 keeps all three services alive, restarts them on crash, and manages log files. The repository includes a pre-configured `ecosystem.config.cjs` that covers all three processes.

### Start all services

```bash
pm2 start ecosystem.config.cjs
```

### Check status

```bash
pm2 status
```

### View logs

```bash
pm2 logs          # all services
pm2 logs api      # API only
pm2 logs bot      # bot only
pm2 logs web      # web only
```

### Persist across reboots

```bash
pm2 save
pm2 startup
# Follow the printed instruction — it will give you a command to run as root
```

### Restart after a rebuild

After rebuilding any package, restart the affected service:

```bash
pnpm --filter @arkenbot/api build && pm2 restart api
pnpm --filter @arkenbot/bot build && pm2 restart bot
pnpm --filter @arkenbot/web build && pm2 restart web
```

:::info Running PM2 as a different user
If PM2 was started by a specific system user (e.g. `bot`), always prefix commands with `sudo -u bot pm2 ...`. Running PM2 as the wrong user will not find the running processes.
:::

---

## Nginx Reverse Proxy

Nginx lets you expose the dashboard and API on standard ports (80/443) behind a domain name.

```bash
sudo apt-get install -y nginx certbot python3-certbot-nginx
```

Create `/etc/nginx/sites-available/arkenbot`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Web dashboard (Next.js on port 3000)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # REST API (Fastify on port 4000)
    location /api/ {
        rewrite ^/api/(.*) /$1 break;
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # WebSocket endpoint
    location /socket.io/ {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Enable the site and reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/arkenbot /etc/nginx/sites-enabled/
sudo nginx -t        # verify configuration
sudo systemctl reload nginx
```

### HTTPS with Let's Encrypt

```bash
sudo certbot --nginx -d yourdomain.com
```

Certbot configures HTTPS automatically and sets up auto-renewal. After running it, update your `.env` to use `https://` and `wss://` URLs, then rebuild the `web` package and restart the `web` PM2 process.

---

## Music Support {#music}

Music playback is handled directly by the bot via [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) piped through `ffmpeg` — **there is no separate server to run** (no Lavalink, nothing to connect to). If you don't need music, skip this section.

Install both binaries on the same host the `bot` process runs on:

```bash
sudo apt-get install -y ffmpeg

# yt-dlp changes frequently to keep up with YouTube — install the standalone
# binary rather than an apt package, which is usually far out of date:
sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp

# Verify both are on PATH
yt-dlp --version
ffmpeg -version
```

:::info Keep yt-dlp updated
YouTube changes frequently break older `yt-dlp` releases. If music suddenly stops working, re-run the download command above to grab the latest release before looking for other causes.
:::

No `.env` variables are required for basic music playback. Two optional ones help if your server's outbound IP gets throttled or blocked by YouTube (common on datacenter/VPS IPs):

```
# SOCKS proxy yt-dlp routes through (e.g. a residential SOCKS5 tunnel)
YTDLP_PROXY=socks5://127.0.0.1:1080

# Netscape-format cookies file, bypasses bot-detection on server IPs — export
# from your browser using the "Get cookies.txt LOCALLY" Chrome extension
# while signed into YouTube
YOUTUBE_COOKIES_FILE=/path/to/youtube-cookies.txt
```

See [YouTube Music Proxy](youtube-music-proxy) for a full walkthrough of setting up `YTDLP_PROXY`.

---

## Updating

Pull the latest code, rebuild, and restart:

```bash
git pull
pnpm install          # pick up any new or changed dependencies
pnpm db:push          # apply any schema changes (safe to run with no changes)
pnpm build            # rebuild all packages
pm2 restart all
```

If the Prisma schema changed, also regenerate the client:

```bash
pnpm db:generate
```

---

## Quick Reference

```bash
# Start all services
pm2 start ecosystem.config.cjs

# Rebuild and restart one service
pnpm --filter @arkenbot/api build && pm2 restart api
pnpm --filter @arkenbot/bot build && pm2 restart bot
pnpm --filter @arkenbot/web build && pm2 restart web

# Apply a schema change
pnpm db:push && pnpm db:generate && pm2 restart all

# Deploy slash commands
pnpm deploy:commands

# Grant staff access to a Discord user
pnpm grant-staff <discord-user-id>
```
