# Economy

Give your server a full currency system — members earn, spend, gamble, and compete on a wealth leaderboard, all configurable from the dashboard.

## Setup

Go to **Economy** in the dashboard sidebar and toggle **Enable economy** on. Set your currency name (e.g. "Coins") and symbol (e.g. 🪙).

## Configuration

| Setting | Description | Default |
|---|---|---|
| **Currency name / symbol** | The label and emoji used everywhere | Coins / 🪙 |
| **Starting balance** | Wallet balance a member starts with | 0 |
| **Daily reward** | Amount from `/daily` | 200 |
| **Streak bonus** | Extra per consecutive daily, capped at 7 days | 50 |
| **Work reward (min/max)** | Random range for `/work` | 50–300 |
| **Work cooldown** | Seconds between `/work` | 3600 |
| **Robbing** | Enable `/rob`, success rate, max steal %, fine %, minimum target wallet, cooldown | On, 40% |
| **Gambling** | Enable `/gamble`, and the maximum bet | On, 10000 |

## Commands

| Command | What it does |
|---|---|
| `/balance [user]` | Show wallet, bank, net worth and rank |
| `/daily` | Claim the daily reward (with streak bonus) |
| `/work` | Earn a random reward on a cooldown |
| `/pay <user> <amount>` | Transfer currency from your wallet |
| `/bank deposit\|withdraw <amount>` | Move currency between wallet and bank |
| `/rob <user>` | Risk stealing from another member |
| `/shop view` / `/shop buy <item>` | Browse and purchase items |
| `/inventory [user]` | List owned items |
| `/gamble coinflip\|slots\|dice <amount>` | Play a minigame |
| `/richest` | View the wealth leaderboard |
| `/economy give\|take\|reset\|additem\|removeitem` | Admin controls (Manage Server) |

## The Shop

Add items from the dashboard or with `/economy additem`. Each item has a price and an optional **reward role** — buying it grants the role automatically. Set a limited **stock** or leave it blank for unlimited. Purchases are recorded in each member's `/inventory`.

> For role rewards to work, ArkenBot's highest role must sit **above** the reward role, and the bot needs the **Manage Roles** permission.
