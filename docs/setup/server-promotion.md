# Server Promotion

Track members who promote your server — through their **custom status** or by displaying your **server tag** — and reward your most loyal supporters.

It records how long each member has been promoting, notices when they remove it, picks back up if they add it again, and ranks everyone on a leaderboard. Rewards are up to you: it's a tracking tool for running monthly giveaways or prizes, not an automated payout system.

## Setup

Open **Server Promotion** in the dashboard sidebar and turn on **Enable tracking** (it's off by default). Then choose what to track:

- **Custom status** — members whose Discord custom status contains one of your **keywords** (your server name, invite link, or a phrase). On first enable, the keywords are seeded with your server name automatically; add or edit them any time. Matching is case-insensitive.
- **Server tag** — members who display your server's Discord tag on their profile.

You can enable either or both.

## Viewing promoters

- **Dashboard** — the **Top promoters** leaderboard shows each member's total promotion time, whether they're promoting right now (status and/or tag), and their session count.
- **In Discord** — `/promotion leaderboard` shows the top members, and `/promotion check [user]` shows a member's total time (and whether they're active now).

## How duration is measured

A member is counted while they're **visibly** promoting. Their timer runs from when the bot first sees the status/tag until they remove it or go offline, and resumes with a fresh session when they add it back — so their total is the sum of all the time they've actually promoted.

:::note Custom status & invisible members
Discord only shows a member's custom status while they appear **online** (or idle/do-not-disturb). If a member sets themselves to **Invisible**, Discord hides their status from everyone — including the bot — so their timer pauses until they're visible again. This makes custom-status durations a fair, close estimate rather than a perfect second-by-second count. **Server tags are not affected by this.**
:::

The bot also re-checks everyone periodically, so the numbers stay accurate even if a status or tag is added or removed while the bot is briefly offline.

## Privacy

Tracking is **opt-in per server** and off by default. While enabled, the bot records a history of when members displayed your status or tag (and their username) so it can build the leaderboard. Turning the feature off stops new tracking. See the [Privacy Policy](https://arkenbot.app/privacy).
