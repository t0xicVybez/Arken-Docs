# Cross-Server Ban Network

The Ban Network is an **opt-in** shared ban list across ArkenBot servers. When a user has been banned in several participating servers, ArkenBot can warn your staff — or automatically ban them — the moment they join yours. It's designed to catch known raiders, scammers, and repeat offenders before they cause trouble.

## How it works

- Participating servers contribute their bans to a shared list.
- A user is only **flagged** in your server once they've been banned in **at least your threshold** of *other* participating servers (default **3**). This is the key safeguard: no single server (or a single rogue admin) can get someone flagged everywhere — it takes multiple independent bans.
- When a flagged user joins, ArkenBot either **alerts your staff** (the default) or **auto-bans** them, based on your settings.
- Reasons shown to your staff are **anonymised** — you see the reported reasons and how many servers banned the user, but not which servers.
- **Unbanning withdraws your contribution:** if you unban a user, your server's entry is removed from the network automatically.

## Setup

Open **Dashboard → Server Settings → Cross-Server Ban Network**:

| Setting | What it does |
|---|---|
| **Enable ban network** | Join the network and start receiving flags. |
| **Share our bans** | Contribute your server's bans to the network (on by default). Turn off to receive flags without contributing. |
| **When a flagged user joins** | **Alert staff** (recommended) posts a staff notice with Ban / Dismiss buttons; **Automatically ban** bans the user on join. |
| **Flag threshold** | How many *other* servers must have banned a user before they're flagged (default 3, min 1). Higher = stricter. |
| **Alert channel** | Where flags are posted. Falls back to your mod-log, then your log channel. |

## Commands

Staff with the **Ban Members** permission get two tools:

| Command | What it does |
|---|---|
| `/bannetwork scan` | Scans your **current members** against the network and lists anyone who's flagged, with a one-click **Ban all flagged** button. Use it right after enabling the network to catch offenders who are already in your server. |
| `/bannetwork check <user>` | Shows how many network servers have banned a specific user, and the reported reasons. |

> `scan` only checks members who are already in your server (the join alert handles people who join later). The **Ban all flagged** button bans every currently-flagged member at once — it requires Ban Members and skips anyone the bot can't ban.

## The staff alert

With **Alert staff** selected, a flagged join posts an embed showing the user, how many servers banned them, and the reported reasons, with two buttons:

- **Ban** — bans the user from your server (requires the Ban Members permission).
- **Dismiss** — clears the alert.

## What counts as a contribution

Only **manual bans** — bans you issue with `/ban` or the right-click **🔨 Ban Member** action — are contributed. Automated bans (auto-mod, anti-nuke) are not shared, keeping the network to human-reviewed decisions.

## Privacy & safety

- Contributing and receiving are both **opt-in** per server.
- The **threshold** prevents any single server from blacklisting a user network-wide.
- Reasons are visible only to your staff, in your chosen channel.
- Unbanning immediately removes your contribution.

> The default (alert-only, threshold 3) is the safest configuration and recommended for most servers. Only enable **auto-ban** if you trust the network to act on your behalf.
