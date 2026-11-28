# Express + PostgreSQL (database-option fixture)

- Action: **create**
- Current source: https://github.com/neobuilds/deploy-test-express-postgres (transfer to `xCloudNobin` pending, like React)
- Current source visibility: public
- Status: **live xCloud deployment verified; extended PostgreSQL checks pending**

## Why it exists

A companion fixture for xCloud's **PostgreSQL** database option on Node.js sites (PostgreSQL v1). It is not a second canonical Express app: it does not count toward the 24 canonical apps. It proves that an app works with the `.env` xCloud writes for a PostgreSQL site (`DATABASE_URL`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) with no manual setup.

## What it does

Node 22, Express 5 and `pg`, no ORM or build step. A server-rendered notes list with add/delete, an idempotent `notes` table created at startup with the role's ordinary privileges, `/health` (liveness) and `/ready` (live query; reports PostgreSQL version, database and user, never credentials). Binds `127.0.0.1:$PORT`. Parameterized queries, escaped output, CSRF form tokens, bounded storage.

## Deploy on xCloud

Node.js site from git, Node 22, **Database: PostgreSQL**, install `npm ci --omit=dev`, start `npm start`.

## Qualification

- [x] Config/redaction/port unit tests (`npm test`, no database needed).
- [ ] Real PostgreSQL: migration, add/list/delete, validation errors, restart/redeploy persistence, DB outage → `/ready` 503 then recovery (procedure in the app README).
- [x] Live xCloud deployment with the PostgreSQL option.

## Live xCloud qualification (2026-11-28)

- The URL-only Public API path (`POST /api/v1/servers/{uuid}/sites/git/auto`) used the fixture's `main` branch at `e2926f962f0d83dd35ab23ad42617c7bf5b6f77c`, a live domain, xCloud SSL and `site_database_engine: postgresql`. xCloud detected Node.js on the Node 22 server and provisioned the app database and its environment variables. This path requires managed PostgreSQL to be ready on the Nginx server.
- The first strict HTTPS `200` arrived 43.05 seconds after the create request. `/ready` returned `200` and reported PostgreSQL 17.12 and the app database. Adding, listing and deleting notes worked over HTTPS.
- One redeploy finished with exit 0 in 19.04 seconds. The retained note persisted. Two of 39 half-second HTTPS probes returned `502` during the restart. The final probe returned `200`.
- The broader PostgreSQL suite remains pending, including validation failures, repeated restarts and a database outage and recovery drill. [Redacted lab evidence](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-pgfix-1128/20261128/cd1d3c1a7b8f59f7390183ba13580fdf/express-postgres-live-1128.png).

Read [ACCEPTANCE.md](../ACCEPTANCE.md) and [AGENTS.md](../AGENTS.md).
