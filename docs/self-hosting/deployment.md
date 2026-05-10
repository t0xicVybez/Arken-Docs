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

## Lavalink — Music Support {#lavalink}

Music commands require a running [Lavalink](https://lavalink.dev) server. If you do not need music, skip this section.

1. Download the latest `Lavalink.jar` from the [Lavalink releases](https://github.com/lavalink-devs/Lavalink/releases).
2. Create an `application.yml` config file (the Lavalink docs provide a template).
3. Run Lavalink: `java -jar Lavalink.jar`
4. Set these variables in your `.env`:

```
LAVALINK_HOST=localhost
LAVALINK_PORT=2333
LAVALINK_PASSWORD=youshallnotpass   # must match your application.yml
LAVALINK_SECURE=false               # set to true if using TLS
```

**YouTube cookies (optional):** Server IPs are sometimes blocked by YouTube. If music fails, export cookies from your browser using the "Get cookies.txt LOCALLY" Chrome extension while signed into YouTube, save the file on the server, and set:

```
YOUTUBE_COOKIES_FILE=/path/to/youtube-cookies.txt
```

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
