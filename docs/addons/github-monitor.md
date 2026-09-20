# GitHub Monitor

Watch public GitHub repositories and post new **commits**, **pull requests**, and **issues** to a Discord channel. No GitHub account, OAuth, or webhook access is required — the addon polls the public GitHub API on a schedule.

## Setup

1. Install the **GitHub Monitor** addon from the Addon Manager.
2. Open its settings from **Configure** and fill in:
   - **Repositories** — a comma-separated list of public repos, e.g. `torvalds/linux, microsoft/vscode`.
   - **Notification Channel** — where updates are posted (required).
3. Save. The first poll runs shortly after and starts tracking from the current state, then checks every **5 minutes**.

Settings are configured from the addon's panel in the Addon Manager.

## Settings

| Setting | Type | Default | Description |
|---|---|---|---|
| **Repositories** | Text | *(empty)* | Comma-separated `owner/repo` list of public repositories to monitor. |
| **Notification Channel** | Channel | *(required)* | Channel where notifications are posted. |
| **Monitor Commits** | Toggle | On | Post when new commits are pushed. |
| **Monitor Pull Requests** | Toggle | On | Post when new pull requests are opened. |
| **Monitor Issues** | Toggle | On | Post when new issues are opened. |
| **Branch** | Text | `main` | Branch to watch for commits. If it doesn't exist, the repo's real default branch is auto-detected and used. |

## Commands

### /github status

Show the current configuration for this server — monitored repositories, notification channel, watched branch, which event types are enabled, and the poll interval. Replies privately.

### /github check

Fetch and post the current open PRs, open issues, and most recent commits **right now**, without waiting for the next scheduled poll. Useful for verifying setup or catching up a channel on demand.

## How it works

- **Polling** — every 5 minutes the addon checks each configured repository through the public GitHub API. There is nothing to install on GitHub's side and no token to manage.
- **First run** — when a repo is first configured, the addon records the current latest commit/PR/issue as a baseline and does **not** backfill history. Only activity from that point forward is posted. (Use `/github check` if you want to see the current state immediately.)
- **Branch auto-detection** — if the configured branch has no commits, the repo's default branch is detected automatically and cached for later polls.
- **Commits** are grouped per poll; if more than five land at once, a summary line links to the full commit list.
- Because it uses the **public** GitHub API, only public repositories can be monitored, and requests are subject to GitHub's unauthenticated rate limits.

## Notification examples

New commit:

```
┌─────────────────────────────────────────────┐
│  📝 Fix null check in session refresh       │
│  Repository  owner/repo   Branch  main      │
│  Author      octocat      SHA     a1b2c3d    │
└─────────────────────────────────────────────┘
```

New pull request:

```
┌─────────────────────────────────────────────┐
│  🔀 #128 Add dark-mode toggle               │
│  Repository  owner/repo                      │
│  Author      octocat      Status  Open       │
└─────────────────────────────────────────────┘
```

New issue:

```
┌─────────────────────────────────────────────┐
│  🐛 #341 Crash when saving empty form       │
│  Repository  owner/repo   Author  octocat    │
│  Labels      bug  needs-triage               │
└─────────────────────────────────────────────┘
```

## Permissions

- **`/github status`** and **`/github check`** follow your server's [command role permissions](../setup/command-permissions.md). Admins always have access.
- The bot needs permission to **send messages and embeds** in the notification channel.
