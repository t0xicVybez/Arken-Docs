# Music

Play audio from YouTube and Spotify directly in voice channels. Spotify track links are matched to a YouTube source automatically.

![Music in the ArkenBot dashboard](/img/screenshots/music.png)

## Setup

1. Go to **Settings**
2. Ensure **Music** is enabled (it is on by default)

Or go to **Music** in the sidebar and toggle **Enable Music**.

## Commands

All music controls are slash commands used in Discord:

| Command | Description |
|---|---|
| `/play <url or search>` | Play a song or add it to the queue. Accepts YouTube URLs, Spotify track links, or search terms |
| `/skip` | Skip the current track |
| `/queue` | View the current queue and now-playing track |
| `/pause` | Pause playback |
| `/resume` | Resume playback |
| `/volume <1-100>` | Adjust the playback volume |
| `/loop <off\|track\|queue>` | Repeat the current track or the whole queue |
| `/stop` | Stop playback and clear the queue |

For the full option reference, see [Music Commands](../commands/music.md).

## Notes

- The bot must be in a voice channel before playing. Join a voice channel first, then use `/play`.
- Only one queue exists per server at a time.
- If the bot is alone in a voice channel for an extended period, it will automatically disconnect.
- Disabling music via the dashboard immediately blocks all music commands for non-admin members.
