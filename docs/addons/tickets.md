# Ticket System

Full-featured support ticket system with panels, staff controls, transcripts, SLA warnings, ratings, canned responses, and a dashboard portal.

![Ticket System in the ArkenBot dashboard](/img/screenshots/tickets.png)

## Setup

Install the **Ticket System** addon from the Addon Manager, then go to **Tickets** in the sidebar.

### Creating a Panel

A panel is a button-based embed posted in a channel. Members click the button to open a ticket.

Use `/ticket-setup panel create` with these options:

| Option | Required | Description |
|---|---|---|
| `name` | Yes | Panel name (internal label) |
| `description` | No | Text shown in the panel embed |
| `emoji` | No | Button emoji (e.g. 🎫) |
| `button_label` | No | Button text |
| `button_color` | No | Button color (blurple, grey, green, red) |
| `category` | No | Category where ticket channels are created |
| `log_channel` | No | Channel to post transcripts |
| `staff_role` | Yes | Role that can manage tickets. A panel can't be created without one, so every panel has a staff team that can act on its tickets. |
| `max_tickets` | No | Max open tickets per user **on this panel**. Tickets on other panels don't count toward it. |

After creation, deploy the panel to a channel with `/ticket-setup panel deploy`.

**Channel naming** uses the panel's naming pattern with these placeholders: `{number}` (zero-padded), `{username}`, and `{category}` (the clicked button's category tag). For example `{category}-{number}` names a ticket opened from a button tagged `con` as `con-0009`.

### Buttons & form questions

A single panel can offer **multiple buttons** for different ticket types — General Support, Bug Report, Player Report, Rank Code Claim, and so on — so you don't need a separate panel for each. Configure these in **Tickets → Panels →** edit a panel.

- **Buttons tab** — add up to 25 buttons. Each button has its own label, emoji, colour, optional category tag (applied to tickets it opens), and optional staff roles.
- **Fields tab** — set up to 5 form questions. When a member opens a ticket, they're shown a modal with these questions; the answers are saved to the ticket and shown in the ticket embed and transcript.

#### Display as buttons or a dropdown

By default a panel shows one **button** per ticket type. For panels with several ticket types you can switch to a **dropdown menu** instead, which collapses every option into a single tidy select menu. In the **Buttons tab**, use **Display options as** → **Buttons** or **Dropdown menu**.

The dropdown option appears once a panel has **2 or more** buttons (a single-option panel always shows one button). Picking a type from the dropdown opens a ticket exactly like clicking its button — category tags and per-button questions all still apply. Changing the style and saving updates the already-posted panel in Discord automatically, so there's no need to re-deploy it.

#### Different questions per button

Each button can ask its **own** questions instead of the shared ones. In the **Fields tab**, use the **Questions for** selector at the top:

- **All buttons (default)** — the shared questions, used by any button that doesn't have its own.
- **A specific button** — questions shown only for that button (up to 5). Leave it empty to use the default.

A button with its own questions shows them when clicked (its modal is titled with the button's label); a button without falls back to the default.

This lets one panel ask, for example, "Steps to reproduce" on a **Bug Report** button and "Who are you reporting?" on a **Player Report** button, while a plain **General Support** button uses the shared default questions. Set common defaults in the Fields tab and only override the buttons that need something different.

## Ticket Commands

All ticket management is done with `/ticket` subcommands inside an open ticket channel. Staff actions (claim, transfer, priority, tags, notes, and so on) are limited to the panel's staff roles, and to members with the **Manage Channels** permission. The ticket's opener can close their own ticket. Members added with `/ticket add` can read and reply, but can't close it.

| Subcommand | Description |
|---|---|
| `close [reason]` | Close the ticket |
| `claim` | Claim the ticket as your own |
| `unclaim` | Release your claim |
| `reopen` | Reopen a closed ticket (if the panel has a reopen window set, this stops working once it's expired — see [Lifecycle automation](#lifecycle-automation)) |
| `transfer <staff>` | Transfer ownership to another staff member |
| `add <user>` | Add a user to the ticket |
| `remove <user>` | Remove a user from the ticket |
| `rename <name>` | Rename the ticket channel |
| `priority <level>` | Set ticket priority (low/medium/high/urgent) |
| `tag <action> <tag>` | Add or remove a tag |
| `note <text>` | Add a private staff note (visible to staff only) |
| `notes` | View all staff notes (ephemeral) |
| `info` | Show ticket info (priority, tags, claim status) |
| `transcript` | Generate and send the transcript now |
| `respond` | Use a canned response (supports placeholders — see below) |
| `requestclose` | Ask the opener to confirm closing (posts Confirm / Keep Open buttons) |
| `snooze <in>` | Remind yourself about this ticket later (e.g. `2h`, `30m`, `1d`) |

These two run **anywhere**, not just inside a ticket:

| Subcommand | Description |
|---|---|
| `find <query>` | Search tickets by number, username/ID, or tag (staff only) |
| `mine` | List your own open tickets in this server |

### Canned-response placeholders

Canned responses sent with `/ticket respond` substitute these placeholders at send time: `{user}` (mentions the opener), `{username}`, `{staff}` (mentions you), `{staffname}`, and `{ticket}` (e.g. `#42`). Each use is tracked — the **Canned Responses** dashboard page shows how many times each one's been sent and when it was last used, so you can spot which ones are actually useful and prune the rest.

## AI Triage & Assist

Run **`/triage`** inside an open ticket for a private (ephemeral), staff-only triage. The bot reads the ticket's reason, form answers, and conversation so far, and returns:

- **Summary** — a sentence or two describing the user's issue
- **Urgency** — a colour-coded low / medium / high estimate
- **Suggested tag** — a short category label
- **Suggested reply** — a friendly first response the staff member can adapt and send

The result now carries action buttons: **Set Priority** (applies the AI's urgency), **Post Reply** (sends the suggested reply into the ticket), and **Save as Note**.

### Auto-triage on open

Enable **AI Assist → Auto-triage on open** in settings to run this automatically whenever a ticket is created. The summary and suggested reply are saved as a staff note (viewable with `/ticket notes`) and surfaced in the dashboard, and the staff-notification ping includes the summary. Optionally let it **set the priority** from the AI's urgency and **add a tag**.

When a staff member **claims** the ticket, the brief (summary, suggested reply, and the action buttons) is sent to them privately — so the person handling it sees the context immediately without running `/ticket notes`. If the conversation has moved on since the brief was first made, it's **regenerated** so the claimer always sees current context.

On **`/ticket transfer`**, the brief is **regenerated from the whole conversation so far** and **DM'd to the new owner** — a proper handoff that reflects everything discussed, not just the opening message. **Auto-assign** DMs the assigned staffer the brief the same way. If the recipient has DMs closed, they get a quiet in-channel nudge to run `/triage` instead (the private AI content is never posted publicly).

### Multi-language replies

When auto-triage generates a suggested reply, it first detects the language the customer wrote their ticket in and writes the reply **in that language** — so a staff member can post it straight through without translating by hand. The summary and suggested tag stay in English either way, since those are for staff, not the customer.

### Opener history

With **Show opener history** on, staff see how many previous tickets the opener has (and their average rating) in the new-ticket notification — instant context on repeat visitors.

`/triage` is a standalone command (not a `/ticket` subcommand) so you can restrict it on its own. To hide it from regular members, set it to your staff roles in **Commands → Role Permissions**. The bot also enforces staff-only at runtime regardless.

> Staff-only, and it degrades gracefully when no AI key is configured. On the hosted ArkenBot it works out of the box; self-hosters need `GROQ_API_KEY` (see [Installation](../self-hosting/installation.md)). Ticket content is sent to Groq to generate the triage — see the [Privacy Policy](https://arkenbot.app/privacy).

## Dashboard Portal

The **Tickets** section in the sidebar provides:

- **Open tickets** — Active tickets with status, priority, and assigned staff. Updates live as the ticket changes in Discord (new messages, claims, closes) — no need to refresh the page. Search matches message content as well as ticket metadata, so you can find a ticket by something that was said in it. Select multiple tickets with the checkbox column for **bulk actions** — close, tag, or set priority on all of them at once.
- **Ticket detail** — View the full conversation thread and staff notes, also updated live. Transfer uses a **real staff picker** — a dropdown of actual members with the panel's staff roles, instead of typing in a user ID — and falls back to manual entry if the member list can't be loaded. **Merge** another ticket into this one by its ticket number: messages, tags, and notes combine, and the source ticket closes automatically. Download the transcript as **HTML, JSON, or plain text**.
- **Canned Responses** — Create pre-written replies staff can insert with one click; see usage counts per response above.
- **Panels** — Manage and redeploy panels.
- **Stats** — Ticket volume, resolution time, satisfaction ratings, a **per-agent leaderboard** (including an **SLA-adherence** column — see [SLA & escalation](#sla--escalation)), and a **CSV export** of every ticket.
- **Settings** — Global ticket config (below).

## Settings

Configure in **Tickets → Settings**:

| Setting | Description |
|---|---|
| **Transcript Channel** | Channel to archive transcripts |
| **Staff Notify Channel / Role** | Channel + role pinged on new tickets |
| **Rating Window** | Minutes after close to request a rating. The prompt first asks a quick **Yes/No: was your issue resolved?**, then opens the star-rating + feedback modal — so Stats and the per-agent leaderboard can track resolution rate separately from satisfaction. |
| **Auto Assign** | Assigns to whichever available staff member (across every staff role on the panel) currently has the **fewest open tickets**; round-robin only breaks ties, it's not the primary rule |
| **AI Assist** | Auto-triage on open, set-priority-from-AI, auto-tag, opener history, multi-language replies |
| **Lifecycle** | Hours before auto-close to nudge the opener with a *Keep Open* button |
| **Business Hours** | Timezone + open/close times + active days; pause SLA and post an away reply outside hours |
| **Quality & Feedback** | Alert a role/channel when a rating is at or below a threshold |
| **Access Controls** | Open cooldown, minimum account age, and a required role to open |
| **Weekly Digest** | Post a weekly ticket summary to a channel |
| **SLA Levels** | Warning thresholds (hours) with optional ping role and **priority escalation** |
| **Blacklisted Users** | Users blocked from opening tickets |
| **Webhook URL** | External webhook called on ticket events. Once set, a signing secret is generated automatically (shown read-only in Settings) — each request carries an `X-ArkenBot-Signature` HMAC-SHA256 header so your receiver can verify it actually came from ArkenBot, plus one automatic retry on failure. |

## SLA & escalation

Set multiple SLA levels by hours. When a ticket with no first response crosses a threshold, the bot pings the configured role. Each level can also **escalate the priority** (e.g. bump to *urgent*) and ping a senior role. With **Business Hours → Pause SLA** enabled, these timers don't advance outside your support hours, so you won't get false breaches overnight or on weekends.

## Lifecycle automation

- **Pre-close nudge** — a few hours before a ticket auto-closes for inactivity, the opener is pinged with a **Keep Open** button that resets the timer. Set the lead time in **Settings → Lifecycle**.
- **Request to close** — `/ticket requestclose` asks the opener to confirm (Confirm Close / Keep Open) instead of closing unilaterally.
- **Snooze** — `/ticket snooze 2h` re-pings you about a ticket later.
- **Reopen window** — limit how long after close a ticket can be reopened (via `/ticket reopen` or the Reopen button). Set per panel in **Tickets → Panels → edit a panel**, next to Auto-close. Leave it unset for no limit.

## Access controls

Curb spam and abuse in **Settings → Access Controls**: require a **minimum account age**, enforce an **open cooldown** between a member's tickets, or require a specific **role** to open one. These apply in addition to the per-panel max-open limit and the blacklist.

## Analytics & export

The **Stats** page adds a **per-agent leaderboard** (tickets handled, closed, average rating, and average close time per staff member) alongside the per-panel breakdown, and an **Export CSV** button that downloads every ticket (status, priority, panel, opener, handler, rating, feedback, timestamps). Enable the **Weekly Digest** to have a summary posted to a channel automatically.
