# Account-Age & Alt Protection

Stop raids and throwaway alt accounts at the door. ArkenBot can automatically act on brand-new accounts as they join, and flag young accounts for staff review. These controls live under **Auto-Mod** in the dashboard.

## Minimum Account Age

Reject accounts younger than a threshold when they join.

| Setting | Description | Default |
|---|---|---|
| **Enable** | Turn the account-age gate on | Off |
| **Minimum age (hours)** | Accounts younger than this are actioned | 72 |
| **Action** | `kick`, `ban`, or `alert` (log only) | kick |

The member is DM'd the reason before being removed (when the action is kick or ban).

## New-Account Flagging

Post a staff alert when a young — but allowed — account joins, so moderators can keep an eye on it without blocking entry.

| Setting | Description | Default |
|---|---|---|
| **Enable** | Turn new-account flagging on | Off |
| **Flag age (hours)** | Joins from accounts younger than this are flagged | 168 |

Alerts go to your mod-log channel (falling back to the log channel) and include the account's creation time as a live relative timestamp.

> These work alongside the existing **anti-raid** join-rate protection — the account-age gate runs first, before a member is counted toward raid detection.
