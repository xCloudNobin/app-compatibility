# Express + PostgreSQL (database-option fixture)

- Action: **create**
- Current source: https://github.com/neobuilds/deploy-test-express-postgres (transfer to `xCloudNobin` pending, like React)
- Current source visibility: public
- Status: **implementation published; config unit tests pass; real PostgreSQL and live xCloud qualification pending**

## Why it exists

A companion fixture for xCloud's **PostgreSQL** database option on Node.js sites (PostgreSQL v1). It is not a second canonical Express app: it does not count toward the 24 canonical apps. It proves that an app works with the `.env` xCloud writes for a PostgreSQL site (`DATABASE_URL`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) with no manual setup.

## What it does

Node 22, Express 5 and `pg`, no ORM or build step. A server-rendered notes list with add/delete, an idempotent `notes` table created at startup with the role's ordinary privileges, `/health` (liveness) and `/ready` (live query; reports PostgreSQL version, database and user, never credentials). Binds `127.0.0.1:$PORT`. Parameterized queries, escaped output, CSRF form tokens, bounded storage.

## Deploy on xCloud

Node.js site from git, Node 22, **Database: PostgreSQL**, install `npm ci --omit=dev`, start `npm start`.

## Qualification

- [x] Config/redaction/port unit tests (`npm test`, no database needed).
- [ ] Real PostgreSQL: migration, add/list/delete, validation errors, restart/redeploy persistence, DB outage → `/ready` 503 then recovery (procedure in the app README).
- [ ] Live xCloud deployment with the PostgreSQL option.

Read [ACCEPTANCE.md](../ACCEPTANCE.md) and [AGENTS.md](../AGENTS.md).
