# Modmail

Give members a private way to reach your staff. When a user DMs the bot, ArkenBot opens a private staff channel and relays messages both ways — like a support ticket that lives in the user's DMs.

## Setup

Run `/modmail setup` and choose:

| Option | Description |
|---|---|
| **Category** | Where new modmail channels are created |
| **Staff role** | Role that can see and reply in threads (pinged on new threads) |
| **Log channel** | Where a transcript is posted when a thread closes |
| **Anonymous** | Hide individual staff identities from the user |
| **Greeting** | Optional message DM'd to the user when a thread opens |

Use `/modmail config` to review the current setup and `/modmail disable` to turn it off.

## How It Works

1. A member sends the bot a direct message
2. ArkenBot opens a private channel under the configured category and pings the staff role
3. Staff reply in that channel; messages relay to the member's DMs (as the server name when anonymous, or the staff member's tag otherwise)
4. Either side continues the conversation naturally
5. Staff run `/modmail close` to end the thread — the member is notified and a transcript is posted to the log channel

> If a member shares multiple servers that have modmail enabled, the bot asks which server they want to contact.
