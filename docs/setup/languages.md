---
sidebar_label: Languages
---

# Languages & Localization

ArkenBot speaks your language. The bot, the web dashboard, and the public site are all fully translated into **11 languages**, so your members can use ArkenBot in whatever language they're most comfortable with — no configuration required.

## Supported languages

| Language | Native name | Code |
|---|---|---|
| English (US) | English (US) | `en-US` |
| Spanish | Español | `es-ES` |
| French | Français | `fr` |
| German | Deutsch | `de` |
| Italian | Italiano | `it` |
| Portuguese (Brazil) | Português do Brasil | `pt-BR` |
| Russian | Русский | `ru` |
| Polish | Polski | `pl` |
| Japanese | 日本語 | `ja` |
| Korean | 한국어 | `ko` |
| Chinese (Simplified) | 中文 | `zh-CN` |

## How ArkenBot picks a language

For every reply, embed, DM, and menu, the bot works out which language to use in this order:

1. **Your explicit choice** — a language you set with the `/language` command or the dashboard language switcher. This always wins, and it follows you across every server.
2. **Automatic detection** — if you haven't set a preference, ArkenBot matches the language your Discord app is set to.
3. **English** — the fallback when your Discord language isn't one of the supported languages.

This means most members see ArkenBot in their own language automatically, and anyone can override it for themselves at any time.

## Setting your language

### With the `/language` command

Any member can control the language the bot uses when replying to **them**:

| Command | What it does |
|---|---|
| `/language set` | Choose the language for ArkenBot's replies to you. Start typing to search by name (e.g. "Deutsch", "French", "ja"). |
| `/language show` | See which language is currently active for you. |
| `/language clear` | Remove your preference and go back to automatic detection. |

Your choice is saved to your Discord account, so it follows you across every server that uses ArkenBot.

### With the dashboard

Both the [dashboard](https://arkenbot.app) and the public site have a **language switcher** (the globe icon in the navigation bar). Pick a language and the whole interface updates instantly. When you're logged in, your choice is remembered and kept in sync with your `/language` preference.

## What gets translated

Localization runs deep — it's not just menu labels. The following are all fully translated:

- **The web dashboard** — every settings page, form, tooltip, and notification.
- **The public site** — home, features, add-ons, changelog, privacy, and terms pages.
- **Bot responses** — command replies, embeds, error messages, modals, and DMs.
- **Slash-command menus** — command and option descriptions show in your Discord client's language when you browse the command picker.
- **Achievements, level-ups, and alerts** — including stream and RSS notifications.
- **Add-ons** — Tickets, Applications, Game Servers, and the rest all speak the same languages as the core bot, including ticket **HTML transcripts**.

### A few things stay in English

- **Slash-command names** (like `/ban` or `/language`) — Discord requires these to use a restricted character set, so the names stay canonical English while their descriptions translate.
- **User-generated content** — usernames, message content, form answers, and anything your members type is shown exactly as written.

## Shared messages

Most of ArkenBot's replies are personal — a command reply or a DM speaks to one person, in that person's language. But some messages live in a channel for everyone to read: ticket **control panels**, **staff logs**, and **transcripts**. These use one consistent language rather than changing depending on who's looking, so a shared log always reads the same way for the whole team.

## Adding a language

ArkenBot is [open source](https://github.com/t0xicVybez/ArkenBot), and its translations live in the repository as plain catalog files. If you'd like to see your language added — or help improve an existing one — contributions are welcome. See the repository for the translation catalogs and the `scripts/i18n-check.mjs` validator that checks a new language for completeness.
