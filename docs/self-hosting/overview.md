---
id: overview
title: Self-Hosting Overview
sidebar_label: Overview
sidebar_position: 1
---

# Self-Hosting ArkenBot

This section covers everything you need to host ArkenBot on your own server. ArkenBot is a **pnpm monorepo** made up of three long-running services:

| Service | Technology | Purpose |
|---|---|---|
| **Bot** | Discord.js v14, TypeScript | The Discord bot process |
| **API** | Fastify 5, TypeScript | REST API + WebSocket gateway |
| **Web** | Next.js 15, React 19 | Web dashboard |

All three services read from a single `.env` file at the repository root and are managed by **PM2**.

## Prerequisites Overview

Before you start, you need the following installed on your server:

- **Node.js 20+** and **pnpm 9+**
- **PostgreSQL 15+** — the primary database
- **Redis 7+** — used for caching, rate limiting, and pub/sub
- **PM2** — process manager that keeps services alive
- **Git**

See the [Prerequisites](prerequisites) page for installation commands.

## Recommended Server Specs

| Workload | RAM | CPU | Storage |
|---|---|---|---|
| Small community (&lt;500 members) | 1 GB | 1 vCPU | 20 GB |
| Medium community (500–5,000 members) | 2 GB | 2 vCPU | 40 GB |
| Large community (5,000+ members) | 4 GB+ | 4 vCPU | 80 GB+ |

Ubuntu 22.04 LTS is the recommended operating system.

## Setup Steps

Follow these pages in order:

1. [Prerequisites](prerequisites) — Install Node.js, pnpm, PostgreSQL, Redis, PM2
2. [Discord Setup](discord-setup) — Create the Discord application and bot token
3. [Installation & Configuration](installation) — Clone the repo, configure `.env`, build
4. [Database Setup](database) — Create the PostgreSQL database and apply the schema
5. [Deployment](deployment) — Run with PM2, configure Nginx, enable HTTPS
6. [Troubleshooting](troubleshooting) — Common problems and solutions
