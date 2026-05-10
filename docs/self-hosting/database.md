---
id: database
title: Database Setup
sidebar_label: Database
sidebar_position: 5
---

# Database Setup

ArkenBot uses **PostgreSQL** as its primary database, managed through the **Prisma ORM**. All schema changes are applied via `prisma db push` or `prisma migrate deploy`.

## Create the Database and User

```bash
sudo -u postgres psql
```

```sql
CREATE USER arkenbot WITH PASSWORD 'your_secure_password';
CREATE DATABASE arkenbot OWNER arkenbot;
GRANT ALL PRIVILEGES ON DATABASE arkenbot TO arkenbot;
\q
```

Update `DATABASE_URL` in your `.env` to match:

```
DATABASE_URL=postgresql://arkenbot:your_secure_password@localhost:5432/arkenbot
```

## Apply the Schema

Push the Prisma schema to the database and generate the Prisma client:

```bash
pnpm db:push
```

This creates all tables. Re-run it after pulling updates that include schema changes.

### Production Migrations (Alternative)

For a more controlled production workflow, use the migration runner instead of `db:push`:

```bash
pnpm db:migrate     # applies pending migrations
pnpm db:generate    # regenerates the Prisma client
```

## Verify the Connection

Test that your connection string is correct before starting the services:

```bash
psql "postgresql://arkenbot:your_secure_password@localhost:5432/arkenbot" -c "SELECT 1;"
```

A result of `1` confirms the connection is working.

---

Next: [Deployment →](deployment)
