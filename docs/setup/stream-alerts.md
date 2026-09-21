# Stream Alerts

Post automatic notifications in Discord when a creator goes live or an RSS feed updates.

![Stream Alerts in the ArkenBot dashboard](/img/screenshots/stream-alerts.png)

## Setup

Go to **Stream Alerts** in the sidebar.

## Supported Platforms

| Platform | What Triggers an Alert |
|---|---|
| **Twitch** | Stream goes live |
| **Kick** | Stream goes live |
| **YouTube** | Goes live **and/or** posts a new video (each toggleable per alert) |
| **Reddit** | A new post is submitted to a subreddit |
| **RSS / Podcast** | New item in a feed |

### YouTube: live and new-upload alerts

When you add a YouTube alert you can choose what to be notified about:

- **Live streams** — fires the moment the channel goes live.
- **New uploads** — fires when the channel posts a new (non-stream) video.

Both are on by default; untick either to only get the other. YouTube alerts are fast and quota-friendly: ArkenBot watches each channel's public feed directly (typically within a minute or two, and near-instant when YouTube's push service is available), and idle channels use no API quota. A finished livestream's leftover video won't fire a duplicate "new upload" alert.

> **Note:** Twitch requires API credentials configured on the server, and YouTube requires a YouTube Data API key. Kick, Reddit, and RSS work without any credentials. Contact your bot administrator if alerts are not firing.

### Reddit alerts

Add a Reddit alert by entering a **subreddit** — just the name (`gaming`), `r/gaming`, or a full subreddit URL all work. ArkenBot then posts whenever that subreddit gets a new submission. Reddit alerts read the subreddit's public feed (no Reddit account or API key needed) and check about every 5 minutes, so a brand-new post typically appears within a few minutes.

## Creating an Alert

1. Click **Add Alert**
2. Select the **Platform**
3. Enter the channel username or feed URL (the label updates based on platform)
4. Select the **Discord Channel** to post alerts in
5. Optionally enter a **Custom Message**
6. Click **Create Alert**

## Custom Messages

Each platform supports template variables in the custom message field:

| Platform | Available Variables |
|---|---|
| Twitch | `{streamer}`, `{title}`, `{url}`, `{game}` |
| Kick | `{streamer}`, `{title}`, `{url}` |
| YouTube | `{streamer}`, `{title}`, `{url}` — `{game}` is not supported (used for both live and new-upload alerts) |
| Reddit | `{feed}` = subreddit, `{title}` = post title, `{url}` = post link |
| RSS / Podcast | `{streamer}`, `{title}`, `{url}` |

**Example:**
```
@everyone {streamer} is live playing {game}! 🎮 {url}
```

## Managing Alerts

- **Enable/Disable** — Toggle the switch in the Enabled column to pause an alert without deleting it
- **Edit** — Click **Edit** to update the username or custom message
- **Delete** — Click the trash icon to permanently remove the alert

## Username / URL Format

| Platform | What to Enter |
|---|---|
| Twitch | Channel username (e.g. `shroud`) |
| Kick | Channel username (e.g. `shroud`) |
| YouTube | Handle or channel URL (e.g. `@mkbhd` or `https://youtube.com/@mkbhd`) |
| Reddit | Subreddit name (e.g. `gaming` or `r/gaming`) |
| RSS / Podcast | Full feed URL (e.g. `https://example.com/feed.xml`) |
