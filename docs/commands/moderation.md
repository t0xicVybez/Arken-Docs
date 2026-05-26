# Moderation Commands

All moderation commands require the corresponding Discord permission. Every action creates a numbered **case** in the audit log.

---

## /ban

Ban a member from the server.

**Required permission:** Ban Members

| Option | Required | Description |
|---|---|---|
| `user` | Yes | The member to ban |
| `reason` | No | Reason for the ban (recorded in the case) |
| `duration` | No | Temp ban duration (e.g. `1h`, `12h`, `1d`, `7d`). Leave empty for permanent. |
| `delete_messages` | No | Delete messages from the last N days (0–7) |

A DM is sent to the user before the ban is applied.

---

## /kick

Kick a member from the server.

**Required permission:** Kick Members

| Option | Required | Description |
|---|---|---|
| `user` | Yes | The member to kick |
| `reason` | No | Reason for the kick |

---

## /mute

Apply a Discord timeout (mute) to a member.

**Required permission:** Moderate Members

| Option | Required | Description |
|---|---|---|
| `user` | Yes | The member to mute |
| `duration` | Yes | Timeout duration (e.g. `10m`, `1h`, `1d`) — maximum 28 days |
| `reason` | No | Reason for the mute |

---

## /warn

Warn a member. Warnings are stored in the case history.

**Required permission:** Manage Messages

| Option | Required | Description |
|---|---|---|
| `user` | Yes | The member to warn |
| `reason` | Yes | Reason for the warning |

---

## /warnings

View all warnings for a member.

**Required permission:** Manage Messages

| Option | Required | Description |
|---|---|---|
| `user` | Yes | The member to check |
| `include_cleared` | No | Include warnings that have been cleared (default: false) |

---

## /clearwarnings

Clear all active warnings for a member.

**Required permission:** Manage Messages

| Option | Required | Description |
|---|---|---|
| `user` | Yes | The member whose warnings to clear |
| `reason` | No | Reason for clearing |

---

## /unban

Unban a user by their Discord user ID.

**Required permission:** Ban Members

| Option | Required | Description |
|---|---|---|
| `user_id` | Yes | The Discord user ID to unban |
| `reason` | No | Reason for the unban |

---

## /purge

Bulk delete messages from a channel (up to 100 at a time).

**Required permission:** Manage Messages

| Option | Required | Description |
|---|---|---|
| `amount` | Yes | Number of messages to delete (1–100) |
| `user` | No | Only delete messages from this specific user |
| `bots` | No | Only delete bot messages |
| `contains` | No | Only delete messages containing this text |

> Discord's API only allows bulk deletion of messages younger than 14 days.

---

## /case

Manage moderation cases.

**Required permission:** Manage Messages

### Subcommands

| Subcommand | Description |
|---|---|
| `view` | Look up a specific case by number |
| `bulk-close` | Close all open cases for a user at once |

#### /case view

| Option | Required | Description |
|---|---|---|
| `number` | Yes | The case number to look up |

#### /case bulk-close

Closes every active case for a user in one action — useful when unbanning someone.

| Option | Required | Description |
|---|---|---|
| `user` | Yes | The user whose cases to close |
| `reason` | No | Reason recorded against the bulk closure |

---

## /temprole

Assign a Discord role to a member for a fixed duration. The role is automatically removed when the time expires.

**Required permission:** Manage Roles

### Subcommands

| Subcommand | Description |
|---|---|
| `add` | Assign a temporary role |
| `remove` | Remove a temporary role early |
| `list` | List all active temporary roles in the server |

#### /temprole add

| Option | Required | Description |
|---|---|---|
| `user` | Yes | The member to assign the role to |
| `role` | Yes | The role to assign |
| `duration` | Yes | How long to keep the role (e.g. `30m`, `2h`, `7d`) |
| `reason` | No | Reason for the assignment |

#### /temprole remove

| Option | Required | Description |
|---|---|---|
| `user` | Yes | The member to remove the role from |
| `role` | Yes | The role to remove |

---

## /suggestion

Update the status of a member-submitted suggestion. Staff only.

**Required permission:** Manage Guild

### Subcommands

| Subcommand | Description |
|---|---|
| `approve` | Mark a suggestion as approved |
| `deny` | Mark a suggestion as denied |
| `consider` | Mark a suggestion as under consideration |

Each subcommand accepts:
- `id` (required) — The suggestion ID
- `note` (optional) — A staff note explaining the decision
