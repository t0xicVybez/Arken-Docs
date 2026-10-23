---
id: dashboard
title: Self-Hosting the Dashboard (Static SPA)
sidebar_label: Dashboard (Static SPA)
sidebar_position: 7
---

# Self-Hosting the Dashboard (Static SPA)

The web dashboard described in [Deployment](deployment) runs as a Next.js process (the `web` PM2 app). There's also a **separate, from-scratch rebuild** of the same dashboard — same pages, same features, same look — that compiles down to a folder of plain static HTML/CSS/JS instead. This is what currently powers the official dashboard at [arkenbot.app](https://arkenbot.app).

| | Next.js `web` (default) | Static SPA (this page) |
|---|---|---|
| Repo | `packages/web` in the main monorepo | separate repo: [`t0xicVybez/Dashboard`](https://github.com/t0xicVybez/Dashboard) |
| Runtime | Node.js process, managed by PM2 | **none** — any static file host (nginx, Apache, a CDN) |
| Build output | `.next/` (needs `next start` to serve) | `dist/` (plain files, served by anything) |
| Good for | running everything on one box | hosting the dashboard separately/cheaper, or not wanting a 4th Node process |

Pick whichever fits your setup — both talk to the same ArkenBot API, so you can switch later without touching the bot or API at all.

:::info This dashboard is a frontend only
It doesn't include or replace the bot or the API — you still need those running and reachable over HTTPS first (see the rest of this Self-Hosting section). This page only covers the dashboard piece.
:::

## 1. Install the build tools

Only needed to *build* the site, not to run it afterward:

```bash
node -v    # need 20+; see Prerequisites if you need to install it
pnpm -v    # need 9+
```

## 2. Get the code and configure it

```bash
git clone https://github.com/t0xicVybez/Dashboard.git
cd Dashboard
cp .env.example .env
```

Fill in `.env` — these three values get baked into the build, so there's nothing to configure at runtime:

```bash
VITE_API_URL=https://api.yourdomain.com
VITE_WS_URL=wss://api.yourdomain.com
VITE_DISCORD_CLIENT_ID=123456789012345678   # your Discord application's ID — not a secret
```

## 3. Build and deploy

```bash
pnpm install
pnpm build
sudo mkdir -p /var/www/dashboard
sudo cp -r dist/* /var/www/dashboard/
```

`dist/` is the entire site. There's no process to start — it's just files for a web server to hand out.

## 4. Configure nginx

```bash
sudo apt-get install -y nginx certbot python3-certbot-nginx
sudo certbot --nginx -d dashboard.yourdomain.com
```

Create `/etc/nginx/sites-available/dashboard`:

```nginx
server {
    listen 443 ssl;
    server_name dashboard.yourdomain.com;

    ssl_certificate     /etc/letsencrypt/live/dashboard.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dashboard.yourdomain.com/privkey.pem;

    root /var/www/dashboard;
    index index.html;

    # Vite's hashed asset filenames never change contents once built.
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Single-page app: any URL that isn't a real file falls back to
    # index.html so the client-side router can take over. Without this,
    # refreshing on any route but / returns a 404.
    location / {
        try_files $uri $uri/ /index.html;
    }
}

server {
    listen 80;
    server_name dashboard.yourdomain.com;
    return 301 https://$host$request_uri;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/dashboard /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

:::warning Turn on gzip compression
Many distros ship nginx with compression barely enabled, which makes every visitor's page load noticeably slower for no reason. In `/etc/nginx/nginx.conf`'s `http {}` block, make sure `gzip on;` is set along with a `gzip_types` line covering at least `text/css application/javascript application/json font/woff2` — this single setting can cut page weight by half or more. `sudo nginx -t && sudo systemctl reload nginx` after changing it. (An Apache config is in the repo's [SETUP.md](https://github.com/t0xicVybez/Dashboard/blob/main/SETUP.md#apache-alternative) if you'd rather not use nginx.)
:::

## 5. Point the API at this dashboard's origin

The API needs to allow this dashboard's domain, or the browser silently blocks every request after login:

```bash
CORS_ORIGIN=https://dashboard.yourdomain.com
```

:::warning Dashboard and API on unrelated domains
If the dashboard's domain and the API's domain don't share a common root (e.g. `dashboard.example.com` talking to `api.a-different-host.com` — not two subdomains of the same domain), login will appear to succeed but every page after it will show you as logged out. Fix it on the API side:

```bash
SESSION_COOKIE_SAMESITE=none
NODE_ENV=production
```

Skip this if dashboard and API share a root domain (e.g. both under `yourdomain.com`) — it already works without it.
:::

## Updating

```bash
cd Dashboard
git pull
pnpm install
pnpm build
sudo cp -r dist/* /var/www/dashboard/
```

No process restart needed — the next page load serves the new files.

## Troubleshooting

- **Every route except `/` 404s, or refreshing any page breaks it** — the SPA-fallback `location /` block from step 4 is missing or wrong.
- **Login appears to work, then the dashboard acts logged out / shows 401s** — the cross-origin cookie setup from step 5; double-check `CORS_ORIGIN` and `SESSION_COOKIE_SAMESITE`.
- **Blank page with a red error in the browser console** — open DevTools (F12) → Console and read it; a `VITE_API_URL`-related error usually means `.env` wasn't filled in correctly *before* `pnpm build` ran (it's baked in at build time, not read at runtime).
- **`pnpm build` fails** — almost always a `.env` typo or Node.js older than 20.

The repo's own [SETUP.md](https://github.com/t0xicVybez/Dashboard/blob/main/SETUP.md) covers the same ground in more depth, written for people who've never set up a web server before, plus an Apache-specific walkthrough.
