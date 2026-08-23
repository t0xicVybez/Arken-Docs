---
sidebar_label: YouTube Music Proxy
---

# YouTube Music via a Residential Proxy

If you self-host ArkenBot on a **VPS or datacenter server**, YouTube will often block music playback with:

```
ERROR: [youtube] Sign in to confirm you're not a bot. Use --cookies-from-browser or --cookies ...
```

This is not a bug — YouTube aggressively blocks **datacenter IP ranges**. You can work around it with login cookies, but those **expire** and need re-exporting every few weeks. The permanent fix is to route only yt-dlp's YouTube traffic through a **residential IP** (for example, an always-on PC at home) using a lightweight SSH tunnel. YouTube trusts residential IPs, so playback works **without any cookies**.

```
ArkenBot (your server) ──SSH tunnel──> Home PC (residential IP) ──> YouTube
```

Only YouTube traffic goes through the tunnel; everything else on your server is unaffected.

## Requirements

- An always-on machine on a **residential internet connection** (a home desktop is ideal). It must be powered on for music to work.
- SSH access to your server.

## 1. Update yt-dlp and install Deno (on the server)

Recent YouTube extraction needs an up-to-date yt-dlp **and** a JavaScript runtime (Deno) to solve YouTube's signature challenge.

```bash
# update yt-dlp
sudo yt-dlp -U

# install Deno and put it on PATH so yt-dlp auto-detects it
curl -fsSL https://deno.land/install.sh | sh
sudo ln -sf "$HOME/.deno/bin/deno" /usr/local/bin/deno
```

Keep them current with a weekly cron (`/etc/cron.d/ytdlp-update`):

```cron
SHELL=/bin/bash
PATH=/usr/local/bin:/usr/bin:/bin
0 5 * * 1 root yt-dlp -U >>/var/log/ytdlp-update.log 2>&1
10 5 * * 1 <youruser> /home/<youruser>/.deno/bin/deno upgrade >>/tmp/deno-upgrade.log 2>&1
```

## 2. Create a locked-down tunnel user (on the server)

This dedicated user can only be used for the tunnel — it has no password and no shell:

```bash
sudo useradd -m -s /usr/sbin/nologin ytproxy
```

If your `sshd_config` restricts logins with `AllowUsers`/`AllowGroups`, add `ytproxy` to it and reload SSH:

```bash
echo "AllowUsers ytproxy" | sudo tee -a /etc/ssh/sshd_config
sudo sshd -t && sudo systemctl reload ssh   # validate, then reload (won't drop sessions)
```

## 3. Point ArkenBot at the tunnel

Add this to the bot's `.env` (a SOCKS proxy on `localhost:1080`, which the tunnel will provide):

```env
YTDLP_PROXY=socks5://127.0.0.1:1080
```

When `YTDLP_PROXY` is set, ArkenBot passes `--proxy` to yt-dlp so YouTube requests egress through the tunnel. Restart the bot after setting it.

> **Cookies become optional.** With the proxy in place you can leave `YOUTUBE_COOKIES_FILE` unset. Keep it only if you need age-restricted videos — see [below](#optional-cookies-for-age-restricted-videos).

## 4. Set up the tunnel on your home PC

The tunnel is a reverse **dynamic** SSH forward: it creates a SOCKS proxy on your server (`127.0.0.1:1080`) whose traffic exits from your home PC.

### First, add an SSH key

On the home PC, create a key (press Enter twice for no passphrase) and copy the public key:

```powershell
ssh-keygen -t ed25519 -f "$env:USERPROFILE\.ssh\arken_tunnel"
Get-Content "$env:USERPROFILE\.ssh\arken_tunnel.pub"
```

Install that public key on the server:

```bash
sudo mkdir -p /home/ytproxy/.ssh
echo "PASTE-YOUR-PUBLIC-KEY-HERE" | sudo tee -a /home/ytproxy/.ssh/authorized_keys
sudo chown -R ytproxy:ytproxy /home/ytproxy/.ssh
sudo chmod 700 /home/ytproxy/.ssh && sudo chmod 600 /home/ytproxy/.ssh/authorized_keys
sudo passwd -l ytproxy   # key-only (disable password login)
```

### Windows — auto-reconnecting, auto-start

Save this as `arken-tunnel.bat` (replace `YOUR_SERVER_IP`). It installs itself to your Startup folder on first run, then keeps the tunnel up, reconnecting if it ever drops:

```bat
@echo off
title ArkenBot YouTube Tunnel
set "LNK=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\ArkenTunnel.lnk"
if not exist "%LNK%" powershell -NoProfile -Command "$s=(New-Object -ComObject WScript.Shell).CreateShortcut('%LNK%'); $s.TargetPath='%~f0'; $s.WindowStyle=7; $s.Save()"
:loop
ssh -N -R 127.0.0.1:1080 -i "%USERPROFILE%\.ssh\arken_tunnel" -o ServerAliveInterval=30 -o ServerAliveCountMax=3 -o ExitOnForwardFailure=yes -o StrictHostKeyChecking=accept-new ytproxy@YOUR_SERVER_IP
timeout /t 10 /nobreak >nul
goto loop
```

Double-click it once. A blank window that just sits there means it's connected (the `-N` flag means "tunnel only, no output").

### Linux / macOS — with autossh

```bash
sudo apt install autossh   # or: brew install autossh
autossh -M 0 -f -N -R 127.0.0.1:1080 \
  -i ~/.ssh/arken_tunnel \
  -o ServerAliveInterval=30 -o ServerAliveCountMax=3 -o ExitOnForwardFailure=yes \
  ytproxy@YOUR_SERVER_IP
```

Add that command to a systemd user service or `@reboot` cron entry to start it on boot.

## 5. Verify

On the server:

```bash
# tunnel is up
ss -ltn | grep 127.0.0.1:1080

# YouTube resolves cookielessly through the home IP
yt-dlp --no-cookies --proxy socks5://127.0.0.1:1080 --skip-download \
  --print "%(title)s" "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

Then play a song in Discord.

## Notes

- **The home PC must stay on.** If it sleeps or shuts down, playback fails until it's back; the tunnel reconnects automatically once it is.
- The tunnel binds only to `127.0.0.1` on the server and is key-authenticated — it is not exposed to the public internet.

### Optional: cookies for age-restricted videos {#optional-cookies-for-age-restricted-videos}

The proxy handles YouTube's bot check on its own, so cookies aren't required for normal playback. For age-restricted content you can additionally provide a cookies file (Netscape format, exported from a logged-in browser — a throwaway account is recommended):

```env
YOUTUBE_COOKIES_FILE=/path/to/youtube-cookies.txt
```

Unlike the proxy, cookies **expire** and must be re-exported periodically.
