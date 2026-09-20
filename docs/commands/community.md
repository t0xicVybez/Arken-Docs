# Community Commands

Commands for community engagement features like invite tracking, reputation, and counting.

---

## /invites

Check how many members you or another user has invited.

| Option | Required | Description |
|---|---|---|
| `user` | No | User to check (defaults to yourself) |

Shows invite count, bonus invites, and total.

---

## /invitetop

Show the top inviters leaderboard for the server. Top 3 are highlighted with medals (🥇🥈🥉).

No options.

---

## /rep give

Give a reputation point to a member. Each user can give one rep point per 24 hours.

| Option | Required | Description |
|---|---|---|
| `user` | Yes | The member to give rep to |

### /rep top

View the top reputation leaderboard.

### /rep check

Check a member's reputation points.

| Option | Required | Description |
|---|---|---|
| `user` | No | Member to check (defaults to yourself) |

---

## /suggest

Submit a suggestion for the server. Requires the Suggestions feature to be enabled.

| Option | Required | Description |
|---|---|---|
| `suggestion` | Yes | Your suggestion text (max 1,000 characters) |

The suggestion is posted to the suggestions channel for members to vote on.

---

## /birthday set

Register your birthday. Only month and day are stored — no year.

| Option | Required | Description |
|---|---|---|
| `month` | Yes | Month (1–12) |
| `day` | Yes | Day (1–31) |

### /birthday remove

Remove your registered birthday.

### /birthday list

List upcoming birthdays in the server.

### /birthday check

Check a specific member's birthday.

| Option | Required | Description |
|---|---|---|
| `user` | Yes | The member to check |

---

## /poll

Create a poll with up to 10 options.

| Option | Required | Description |
|---|---|---|
| `question` | Yes | The poll question |
| `options` | Yes | Options separated by `|` (e.g. `Yes | No | Maybe`) |
| `duration` | No | Duration in minutes before the poll closes (1–10080) |
| `multi` | No | Allow multiple votes per user (default: false) |

---

## /startcounting

Post a counting game announcement in the counting channel. Requires the Counting addon to be installed and configured.

No options.

---

## /report

Report a member to the moderation team. The report is sent privately to the staff channel configured with `/report-setup`.

| Option | Required | Description |
|---|---|---|
| `user` | Yes | The user to report |
| `reason` | Yes | Why you're reporting them |

You can also right-click a message → **Apps** to report it. See [Reports Setup](../setup/reports.md).

---

## /report-setup

Configure where member reports are delivered.

**Required permission:** Administrator

| Option | Required | Description |
|---|---|---|
| `channel` | Yes | The channel where reports are sent |

---

## /vote

Vote for ArkenBot on top.gg and see your rewards for voting.

| Option | Required | Description |
|---|---|---|
| `reminders` | No | Set to `true` to get a DM when you can vote again |

---

## /topvoters

Show the leaderboard of the members who support the bot the most through top.gg votes.

No options.
