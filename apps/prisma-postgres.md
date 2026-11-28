# Prisma + PostgreSQL (database-option fixture)

- Action: **create**
- Source: [neobuilds/deploy-test-prisma-postgres](https://github.com/neobuilds/deploy-test-prisma-postgres/tree/f1dec7212e9d0b102f3514fb95dd459e2b9bdc20) at `f1dec7212e9d0b102f3514fb95dd459e2b9bdc20`
- Status: **deployment-verified**

## Why it exists

A companion fixture for xCloud's **PostgreSQL** database option on Node.js sites, using an **ORM with a generate step and a migration step** (Prisma). It is not a second canonical Express app and does not count toward the 24 canonical apps. Where [express-postgres](express-postgres.md) uses raw `pg` and creates its table at startup, this one proves that `npm ci` (with `postinstall: prisma generate`) and `prisma migrate deploy` on every start work with the `.env` xCloud writes (`DATABASE_URL`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) and the site role's ordinary privileges.

## What it does

Node 22, Express 5, Prisma 6.19 (pinned) with PostgreSQL, plain JavaScript. A todo list: JSON CRUD API (`/api/todos`, title 1-200 chars, `?q=` search, `?done=` filter, 400/404 JSON errors), one vanilla-JS page, CSRF protection by custom header plus JSON body, escaped output, bounded storage (1000 todos). A committed migration under `prisma/migrations`; `npm start` runs `scripts/start.js` (resolves the URL, `prisma migrate deploy`, then the server). `/health` (liveness, no DB) and `/ready` (`SELECT 1` through Prisma, 503 without leaking details) both report a release marker (`APP_RELEASE` or git sha). Falls back to building the URL from `DB_*` when `DATABASE_URL` is absent. Binds `127.0.0.1:$PORT`.

## Deploy on xCloud

Node.js site from git, Node 22, **Database: PostgreSQL**, install `npm ci` (Prisma is a runtime dependency, so no `--omit=dev`), no build command, start `npm start`.

## Qualification

- [x] Unit and HTTP-layer tests with a fake Prisma client (`npm test`, no database needed); `prisma validate`; migration SQL matches the schema.
- [x] Real PostgreSQL: `migrate deploy` on an empty database and again (idempotent), `scripts/smoke.sh` CRUD, search/filter and invalid input, `leave`/`verify` persistence across restart and redeploy, DB outage → `/ready` 503 then recovery.
- [x] Live xCloud deployment with the PostgreSQL option (confirms `postinstall` engine download works on the site and the role can run `migrate deploy`).

Read [ACCEPTANCE.md](../ACCEPTANCE.md) and [AGENTS.md](../AGENTS.md).

## Live xCloud qualification (2026-11-28)

- The Public API Git auto endpoint detected a Node.js site on port 3000. The server ran Node 22 and used `site_database_engine: postgresql`. With AI script generation disabled in the lab, the default install was `npm install --no-audit --no-fund` and the start command was `npm run start`. Postinstall generated Prisma Client 6.19.0. The separate clean-checkout test verified the documented `npm ci` command.
- The first strict HTTPS 200 arrived 70.85 seconds after the create request started. `/ready` named PostgreSQL, and CRUD, search, filtering and invalid-input checks passed over HTTPS.
- One redeploy finished in 24.58 seconds with exit 0. The todo survived and `prisma migrate deploy` reported no pending migrations. Four of 49 probes at 0.5-second intervals returned HTTP 502 during the process restart.
- xCloud dev commit `837d4392db27e3982d1e7609a2dd81e67236387e`. [Redacted qualification evidence](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-prismafix-1128/20261128/466e735cd3c917346a388bbff4a94edc/prisma-postgres-live-1128.png).
