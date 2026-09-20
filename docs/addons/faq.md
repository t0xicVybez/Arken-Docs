# FAQ / Knowledge Base

A searchable, self-serve knowledge base for your server. Admins store question-and-answer entries; members find them instantly with `/faq` and typeahead autocomplete. No AI, API key, or external service is required — answers are the ones your team wrote.

## Setup

1. Install the **FAQ / Knowledge Base** addon from the Addon Manager.
2. Add your first entry:
   ```
   /faq-admin add
   ```
   A modal appears for the **title**, **answer**, and optional **tags**.
3. Members can now search with `/faq`.

## Commands

### /faq

Search the knowledge base.

| Option | Required | Description |
|---|---|---|
| `query` | Yes | What you're looking for. Autocomplete suggests matching entries as you type. |

Picking a suggestion returns that exact entry. Typing free text and pressing enter returns the best match by title and tags. Each answer is posted as an embed and the entry's use counter is incremented.

### /faq-admin

Manage entries. Requires the **Manage Server** permission.

| Subcommand | Options | Description |
|---|---|---|
| `add` | — | Open a modal to create a new entry (title, answer, tags). |
| `edit` | `entry` (required, autocomplete) | Open a pre-filled modal to change an existing entry. |
| `remove` | `entry` (required, autocomplete) | Delete an entry. |
| `list` | — | Show every entry with its tags (private reply). |

### Entry fields

| Field | Limit | Notes |
|---|---|---|
| Title | 100 characters | Shown in autocomplete and as the answer heading. |
| Answer | 2000 characters | Supports Discord markdown. |
| Tags | 200 characters | Comma-separated. Improves search matching; optional. |

## How it works

- **Search** matches against both titles and tags, so a member who types a keyword from the tags still finds the entry even if it isn't in the title.
- **Autocomplete** returns up to 25 matching titles as the member types, so most answers are one selection away.
- **Usage counting** — every time an entry is served it records a use, so you can see which questions come up most.
- Entries are stored per server; each server maintains its own knowledge base.

## Example

```
Member: /faq query: how do I level up

┌─────────────────────────────────────┐
│  ❓ How do I level up?              │
│                                     │
│  Send messages and stay active in   │
│  voice channels to earn XP. Check   │
│  your rank any time with /rank.     │
│                                     │
│  Knowledge Base                     │
└─────────────────────────────────────┘
```

## Permissions

- **`/faq`** — available to everyone.
- **`/faq-admin`** — requires **Manage Server**.
