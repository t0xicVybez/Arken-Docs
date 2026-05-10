---
id: prerequisites
title: Prerequisites
sidebar_label: Prerequisites
sidebar_position: 2
---

# Prerequisites

Install the following on your Linux server (Ubuntu 22.04 LTS recommended) before proceeding.

## Node.js 20+

```bash
# Add the NodeSource repository and install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version   # should print v20.x.x or higher
```

## pnpm 9+

ArkenBot uses pnpm workspaces to manage all packages in a single repository.

```bash
npm install -g pnpm

# Verify
pnpm --version   # should print 9.x.x or higher
```

## PostgreSQL 15+

```bash
sudo apt-get install -y postgresql postgresql-contrib

sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## Redis 7+

Redis handles caching, rate limiting, cooldowns, and pub/sub messaging between services.

```bash
sudo apt-get install -y redis-server

sudo systemctl start redis-server
sudo systemctl enable redis-server
```

Test that Redis is running:

```bash
redis-cli ping
# Should respond: PONG
```

## PM2

PM2 is the process manager that keeps all three services alive and restarts them automatically on crash.

```bash
npm install -g pm2
```

## Git

```bash
sudo apt-get install -y git
```

---

Next: [Discord Setup →](discord-setup)
