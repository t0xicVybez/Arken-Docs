# Translator

Break the language barrier in your server. The Translator addon translates messages on demand — no copy-pasting into another site — and detects the source language automatically.

## Setup

Install the **Translator** addon from the Addon Manager. On the hosted ArkenBot no extra setup is needed — translation is ready to use.

> **Self-hosting?** The Translator addon talks to a [LibreTranslate](https://libretranslate.com) instance you run yourself. Set `LIBRETRANSLATE_URL` in your `.env` (for example `http://localhost:5000`). Without a reachable instance, the commands reply that translation is unavailable. See [Installation](../self-hosting/installation.md).

## Three ways to translate

### /translate

Translate any text into the language you choose.

| Option | Required | Description |
|---|---|---|
| `text` | Yes | The text to translate (up to 1500 characters) |
| `to` | Yes | The target language |
| `private` | No | Show the result only to you (ephemeral). Default: off |

The reply shows the detected source language alongside the translation.

### Right-click → Translate

Open any message's context menu (**right-click → Apps → Translate**, or long-press on mobile) to translate it instantly into **your own** language — the one set in your Discord client. The result is shown only to you, so it never clutters the channel.

> The **Translate** action can take up to an hour to appear for everyone after the addon is first installed, while Discord propagates the command.

### Flag reactions

React to any message with a **country-flag emoji** and ArkenBot replies with that message translated into the matching language.

- 🇪🇸 → Spanish &nbsp;·&nbsp; 🇫🇷 → French &nbsp;·&nbsp; 🇩🇪 → German &nbsp;·&nbsp; 🇯🇵 → Japanese &nbsp;·&nbsp; 🇧🇷 → Portuguese &nbsp;·&nbsp; and many more
- Several flags map to the same language (🇺🇸 🇬🇧 🇦🇺 🇨🇦 all give English; 🇪🇸 🇲🇽 🇦🇷 all give Spanish)

## Good to know

- **Auto-detection** — you never have to tell ArkenBot the source language; it figures it out. If a message is already in the target language, it says so instead of translating.
- **Cooldown** — `/translate` has a short per-user cooldown to keep things responsive.
- **Machine translation** — translations are automated and may not be perfect, especially for slang or idioms. Treat them as a quick, good-enough understanding rather than a professional translation.
- **Privacy** — on the hosted ArkenBot, translation runs on our own self-hosted engine; your messages are **not** sent to any third-party translation service. See the [Privacy Policy](https://arkenbot.app/privacy).
