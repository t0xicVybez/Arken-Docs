# Anonymous Confessions

Let members share thoughts anonymously. Submissions are made privately through a modal and posted to a public channel without any name attached — with optional staff approval, reply threads, per-user cooldowns, a blocklist, and a staff-only author lookup for abuse handling.

## Setup

1. Install the **Anonymous Confessions** addon from the Addon Manager.
2. Set the public channel where confessions are posted:
   ```
   /confess-setup channel channel:#confessions
   ```
3. (Optional) Require staff approval, open reply threads, or set a cooldown — see below.

That's the minimum. Members can now run `/confess`.

## Commands

### /confess

Opens a private modal where the member types their confession (1–1000 characters). When submitted, it is posted anonymously to the confessions channel as a numbered embed — the submitter's name never appears in the post.

- If a **review channel** is set, the confession is held for staff approval instead of posting immediately.
- Members who are on the blocklist, or still within the cooldown window, are told privately and nothing is posted.

### /confess-setup

Configuration commands. Requires the **Manage Server** permission.

| Subcommand | Options | Description |
|---|---|---|
| `channel` | `channel` (text channel, required) | Set the public channel confessions are posted to. |
| `review` | `channel` (text channel, optional) | Route new confessions to a staff channel for approval first. Omit the channel to turn approval **off**. |
| `replies` | `enabled` (true/false, required) | Open a reply thread under each posted confession. |
| `cooldown` | `seconds` (0–3600, required) | Minimum wait between confessions per member. `0` disables the cooldown. |
| `block` | `user` (required) | Block a member from submitting confessions. |
| `unblock` | `user` (required) | Remove a member from the blocklist. |
| `whois` | `number` (required) | Reveal who submitted a given confession number — for abuse handling. |
| `status` | — | Show the current configuration (channel, review channel, replies, cooldown, blocked count, total confessions). |
| `disable` | — | Turn the confessions system off. |

## How it works

**Numbering** — Every confession gets a sequential number (Confession #1, #2, …). This number is how staff reference a specific post in `whois`.

**Approval flow** — When a review channel is set, each submission is sent there with **Approve** and **Deny** buttons. A staff member with **Manage Messages** clicks one:

- **Approve** posts the confession publicly (and opens a reply thread if replies are enabled).
- **Deny** discards it — nothing is posted.

The review message records who approved or denied it.

**Reply threads** — With `replies` enabled, each public confession gets its own thread so members can discuss it without derailing the channel.

**Cooldown & blocklist** — The cooldown is enforced per member, per server. Blocked members can't submit at all. Both are checked at submission time.

**Anonymity vs. accountability** — The submitter's ID is stored privately on the confession record but never shown in any message. Only `/confess-setup whois` (Manage Server) can reveal it, so you can act on abusive submissions without exposing identities to everyone.

## Example

A posted confession looks like this:

```
┌─────────────────────────────────────┐
│  Confession #42                     │
│                                     │
│  I've never actually watched any    │
│  of the movies everyone quotes.     │
│                                     │
│  Submitted anonymously              │
└─────────────────────────────────────┘
   └─ 💬 Thread: Confession #42   (if replies are enabled)
```

## Permissions

- **Members** — need no special permission to run `/confess`.
- **Approve / Deny** buttons — require **Manage Messages**.
- **`/confess-setup`** (including `whois`) — requires **Manage Server**.
