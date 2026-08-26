# Scheduled Events

Plan events with live RSVPs. Members click **Going / Maybe / Can't**, and attendees get an automatic reminder before it starts.

## Commands

| Command | What it does |
|---|---|
| `/event create <title> <when> [description] [location] [role] [channel]` | Create an event with RSVP buttons |
| `/event list` | List upcoming events (with their IDs) |
| `/event cancel <id>` | Cancel an event |

Creating and cancelling events needs the **Manage Events** (or Manage Server) permission.

## The `when` field

Accepts either a **relative** time like `2d`, `6h`, `90m`, or an **absolute** date like `2026-09-01 18:00`. Times display as live Discord timestamps that auto-localize for every viewer.

## RSVPs & reminders

- Members RSVP with the buttons; the counts and attendee lists update live. Clicking your current choice again clears it.
- If you attach a **role**, members who RSVP **Going** are granted that role automatically (and lose it if they change their mind).
- About 15 minutes before the event starts, ArkenBot pings everyone marked **Going** in the event channel.

> For the RSVP role to work, ArkenBot's highest role must sit above it and it needs **Manage Roles**.
