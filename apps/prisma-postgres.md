# Prisma + PostgreSQL (database-option fixture)

- Action: **create**
- Target source: `xCloudNobin/deploy-test-prisma-postgres` (not yet published)
- Status: **local-verified** (unit/HTTP-layer tests only); real PostgreSQL and live xCloud qualification pending

## Why it exists

A companion fixture for xCloud's **PostgreSQL** database option on Node.js sites, using an **ORM with a generate step and a migration step** (Prisma). It is not a second canonical Express app and does not count toward the 24 canonical apps. Where [express-postgres](express-postgres.md) uses raw `pg` and creates its table at startup, this one proves that `npm ci` (with `postinstall: prisma generate`) and `prisma migrate deploy` on every start work with the `.env` xCloud writes (`DATABASE_URL`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) and the site role's ordinary privileges.

## What it does

Node 22, Express 5, Prisma 6.19 (pinned) with PostgreSQL, plain JavaScript. A todo list: JSON CRUD API (`/api/todos`, title 1-200 chars, `?q=` search, `?done=` filter, 400/404 JSON errors), one vanilla-JS page, CSRF protection by custom header plus JSON body, escaped output, bounded storage (1000 todos). A committed migration under `prisma/migrations`; `npm start` runs `scripts/start.js` (resolves the URL, `prisma migrate deploy`, then the server). `/health` (liveness, no DB) and `/ready` (`SELECT 1` through Prisma, 503 without leaking details) both report a release marker (`APP_RELEASE` or git sha). Falls back to building the URL from `DB_*` when `DATABASE_URL` is absent. Binds `127.0.0.1:$PORT`.

## Deploy on xCloud

Node.js site from git, Node 22, **Database: PostgreSQL**, install `npm ci` (Prisma is a runtime dependency, so no `--omit=dev`), no build command, start `npm start`.

## Qualification

- [x] Unit and HTTP-layer tests with a fake Prisma client (`npm test`, no database needed); `prisma validate`; migration SQL matches the schema.
- [ ] Real PostgreSQL: `migrate deploy` on an empty database and again (idempotent), `scripts/smoke.sh` CRUD, search/filter and invalid input, `leave`/`verify` persistence across restart and redeploy, DB outage → `/ready` 503 then recovery.
- [ ] Live xCloud deployment with the PostgreSQL option (confirms `postinstall` engine download works on the site and the role can run `migrate deploy`).

Read [ACCEPTANCE.md](../ACCEPTANCE.md) and [AGENTS.md](../AGENTS.md).
