# AI Assistant

AI-powered helpers for your server: ask questions and catch up on conversations without leaving Discord.

## Setup

Install the **AI Assistant** addon from the Addon Manager. On the hosted ArkenBot no extra setup is needed — AI is already configured.

> **Self-hosting?** AI features require a [Groq](https://groq.com) API key set as `GROQ_API_KEY` in your `.env`. Without it, the commands reply that AI is unavailable. See [Installation](../self-hosting/installation.md).

## Commands

### /ask

Ask the assistant a question and get a concise answer.

| Option | Required | Description |
|---|---|---|
| `question` | Yes | What you'd like to ask |
| `private` | No | Show the answer only to you (ephemeral). Default: off |

### /summarize

Summarise the recent conversation in the current channel — a one-line overview plus the key points, so anyone can catch up quickly.

| Option | Required | Description |
|---|---|---|
| `count` | No | How many recent messages to summarise (default 30, max 100) |
| `private` | No | Show the summary only to you (ephemeral). Default: off |

## Good to know

- **Cooldown** — each user can run an AI command once every few seconds, to keep things responsive and costs bounded.
- **Accuracy** — answers and summaries are AI-generated and may be wrong. Treat them as a helpful starting point, not authoritative.
- **Privacy** — when you run one of these commands, the relevant text (your question, or the recent messages being summarised) is sent to Groq to generate the response. Nothing is sent unless a command is used. See the [Privacy Policy](https://arkenbot.app/privacy).

## Related AI features

AI powers two more features documented elsewhere:

- **Ticket triage** — a 🤖 button in the [Ticket System](tickets.md#ai-triage) that summarises a ticket and suggests a reply for staff.
- **AI Moderation** — opt-in [Auto-Mod](../setup/automod.md#ai-moderation) that flags harassment, hate, threats, and scams that keyword filters miss.
