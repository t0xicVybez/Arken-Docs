# Vote Rewards

Reward your members for voting on [top.gg](https://top.gg) — free votes that boost your ranking, in exchange for roles, XP, and a public thank-you. Configure everything under **Dashboard → Vote Rewards** (in the Community section).

![Vote Rewards in the ArkenBot dashboard](/img/screenshots/voting.png)

## Two kinds of votes

top.gg lets people vote for two different things, and Arken Bot supports both:

| | **Bot vote** | **Server vote** |
|---|---|---|
| What's voted for | Arken Bot itself | *Your* Discord server |
| Where | `top.gg/bot/…` | `top.gg/servers/…` |
| Helps rank | Arken Bot | Your server |
| Setup for you | Just enable rewards | List your server + add a webhook (below) |

Both reward the voter with whatever you configure on the Vote Rewards page. The difference is only in setup and who the vote helps.

---

## Rewards

When someone votes, Arken Bot can give them:

| Reward | Notes |
|---|---|
| **Voter role** | A temporary role, removed automatically after the duration you set (default 12h). |
| **Bonus XP** | Added to the member's [leveling](leveling.md) XP. |
| **Weekend double** | top.gg counts weekend votes twice — enable this to double the XP to match. |
| **Thank-you announcement** | A public message in a channel you choose. |

The announcement message supports these placeholders:

| Placeholder | Becomes |
|---|---|
| `{user}` | A mention of the voter |
| `{url}` | Your vote link (see [Vote link](#vote-link)) |
| `{streak}` | The voter's current voting streak |
| `{count}` | The voter's total vote count |

> Members with an exempt setup, or the reward channel being inaccessible to the bot, are handled gracefully — a missing channel or permission just skips the announcement.

---

## Rewarding bot votes (no setup)

Bot voting works out of the box. Just open **Vote Rewards**, turn on **Enable vote rewards**, and pick your rewards. When your members vote for Arken Bot, they'll be rewarded here automatically — there's no webhook to configure, because the bot's owner already runs it.

---

## Rewarding server votes (per-server webhook)

To reward votes for **your server**, you point top.gg at Arken Bot's webhook and paste your server's secret into the dashboard:

1. **List your server** at [top.gg/servers/new](https://top.gg/servers/new).
2. On your server's top.gg page, open **Webhooks / Integrations** and **create a webhook**:
   - **URL:** `https://api.arkenbot.app/topgg/webhook`
   - **Event:** enable **Vote Created**
3. top.gg generates a signing secret that starts with **`whs_`**. Copy it.
4. Back in **Dashboard → Vote Rewards**, paste it into **Server vote webhook secret** and save.

That's it — server votes now verify and reward your members. Each server uses its own secret, so this is completely self-service; you don't need the bot's owner.

> The secret is stored securely and never shown again — the dashboard only tells you whether one is saved. To replace it, paste a new value; leaving the field blank keeps the current one.

### Vote link

The **Vote link** field controls where `/vote` and the `{url}` placeholder send people. Paste your server's link (e.g. `https://top.gg/servers/<your-server-id>/vote`) for server votes, or leave it empty to use the bot's vote page.

---

## Commands

| Command | Description |
|---|---|
| `/vote` | Shows the vote link, your vote status and 12-hour cooldown, your streak, and this server's rewards. |
| `/vote reminders:on` | Get a DM when you can vote again. Turn off with `reminders:off`. |
| `/topvoters` | The server's most dedicated voters, ranked by total votes. |

---

## How voting works

- A person can vote once every **12 hours** (weekends count double).
- Streaks increase when someone votes again within about a day of their last vote.
- Reminders (opt-in via `/vote`) DM the voter the moment their cooldown ends.
