# Utility Commands

General-purpose commands available to all members.

---

## /help

Browse all commands available to you. The list is filtered based on:
- Commands the server has disabled
- Commands from addons that aren't installed/enabled
- Your Discord permissions
- Role-based command permissions configured by server admins

No options. Navigation uses buttons to page through command categories.

---

## /ping

Check the bot's current latency and API response time.

No options.

---

## /serverinfo

Display information about the current server: member count, creation date, boost level, channels, roles, and more.

No options.

---

## /userinfo

Display information about a user: account age, joined date, roles, badges, and more.

| Option | Required | Description |
|---|---|---|
| `user` | No | The user to look up (defaults to yourself) |

---

## /avatar

Get a user's avatar as a full-size image with a download link.

| Option | Required | Description |
|---|---|---|
| `user` | No | The user (defaults to yourself) |

---

## /remind

Set a personal reminder. The bot will DM you when the time is up.

| Option | Required | Description |
|---|---|---|
| `time` | Yes | When to remind you (e.g. `10m`, `2h`, `1d`) |
| `message` | Yes | What to remind you about |

---

## /autoresponse

Manage regex-triggered auto-responses for the server. Messages matching a pattern will receive an automatic reply.

**Required permission:** Manage Server

### Subcommands

| Subcommand | Description |
|---|---|
| `add` | Create a new auto-response rule |
| `remove` | Delete a rule by ID |
| `toggle` | Enable or disable a rule without deleting it |
| `list` | List all rules in this server |

#### /autoresponse add

| Option | Required | Description |
|---|---|---|
| `pattern` | Yes | Regex pattern to match against message content (no delimiters) |
| `response` | Yes | Text to reply with when the pattern matches |
| `flags` | No | Regex flags (default: `i` for case-insensitive) |
| `embed` | No | Send the response as an embed (default: false) |
| `embed_color` | No | Hex color for the embed (e.g. `#5865F2`) |
| `delete_message` | No | Delete the triggering message (default: false) |

See [Auto-Responses Setup](../setup/auto-responses) for the full guide including pattern examples.

---

## /giveaway

Manage giveaways. See [Giveaways Setup](../setup/giveaways.md) for full details.

### Subcommands

| Subcommand | Description |
|---|---|
| `start <prize> <duration> [winners]` | Start a new giveaway in the current channel |
| `end <id>` | End a giveaway early and select winners |
| `reroll <id>` | Pick new winners from the original entrant pool |

---

## /botstatus

Show a quick summary of the bot's current status, uptime, and resource usage.

No options.

---

## /selfrole

Manage the list of self-assignable roles for your server.

**Required permission:** Manage Roles

### Subcommands

| Subcommand | Description |
|---|---|
| `add role:<role> [name:<name>]` | Add a role to the self-assignable list. If no name is given, the role's name is used (lowercased). |
| `remove name:<name>` | Remove a role from the list. Supports autocomplete. |
| `list` | Show all self-assignable roles in an embed. |

See [Self-Assignable Roles Setup](../setup/self-roles) for the full guide.

---

## /selfassignrole

Assign yourself one of the server's self-assignable roles.

| Option | Required | Description |
|---|---|---|
| `name` | Yes | The short name of the role to assign (autocomplete shows available roles) |

Autocomplete only shows roles you don't already have.

---

## /selfremoverole

Remove a self-assignable role from yourself.

| Option | Required | Description |
|---|---|---|
| `name` | Yes | The short name of the role to remove (autocomplete shows your current roles) |

Autocomplete only shows self-assignable roles you currently have.
