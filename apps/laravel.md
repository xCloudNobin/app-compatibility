# Laravel

- Action: **upgrade**
- Current source: https://github.com/neobuilds/mcp-qa-laravel
- Planned canonical repository: `xCloudNobin/laravel-taskboard`
- Current source visibility: public
- Status: **implementation merged; local verification recorded; live xCloud not verified**

## Implementation brief

ORM migrations, login/session, one database-backed background job.

Implement the shared meaningful-app baseline: UI, validated CRUD, persistent storage, schema setup, production configuration, health/readiness and automated smoke/persistence checks. Use a project/task board unless the specific requirement preserves another domain.

## Required deliverables

- [ ] Verify source owner; resolve any pending transfer before creating a destination.
- [ ] Inspect/reuse the existing source if provided; implement the brief, not a success-page shell.
- [ ] Include license/attribution, README, safe environment example and reproducible dependencies.
- [ ] Document install/build/production start, runtime version, port/bind address, health, schema and persistence.
- [ ] Automated positive/negative smoke tests; applicable restart/redeploy persistence test.
- [ ] Real local production verification and reviewable PR with exact commit and evidence.
- [ ] Separate live xCloud qualification using the intended category before marking deployment verified.

Read [ACCEPTANCE.md](../ACCEPTANCE.md) and [AGENTS.md](../AGENTS.md). Return evidence and blockers to the coordinator; do not self-merge or change repository visibility.

## Delivered implementation

Current source: https://github.com/xCloudNobin/laravel-taskboard

Merged PR: https://github.com/xCloudNobin/laravel-taskboard/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-20)

- Candidate commit: `99b72fdce135d42ee7e7a20a98b243aab0d327ce` (`main`).
- Category: **Deploy via Git > Laravel (native, PHP 8.4, SQLite)**. xCloud `dev` at `324be14f2ebeaf4fe64ba3f2e1c14368feb9db3c` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, MySQL 8 (unused by this app).
- Created over the Public API with a personal access token, every field explicit (no repository detection): `POST /api/v1/servers/{server}/sites/git/auto` with `site_type: laravel`, `deploy_mode: native`, `php_version: 8.4`, `database: none` and xCloud's own default Laravel deploy script passed as `deploy_script` (byte-identical to `DefaultDeployScript::for('laravel', true)`). No environment variables.
- Go-live the way a customer adds a domain: deploy on the staging name, point the domain's A record at the server, then `PUT /api/v1/sites/{site}/domain {ssl_provider: xcloud}`.

| Check | Result |
|---|---|
| Create over the Public API | 202; first deploy live on the staging name in 73 s |
| HTTPS on its own domain | Let's Encrypt certificate (SAN = the site's domain) 180 s after the create call, including the domain change; strict `curl` 200; HTTP redirects to HTTPS |
| Page | Sign-in page 200; register + login + create project + create task over HTTPS; `/health/ready` 200 `{"status":"ready","checks":{"database":"up"}}` |
| Background job | Queue worker started from the site's Laravel page (dashboard: `connection database`, `queue default`, 1 process; the Public API has no queue-worker endpoint). Creating a task wrote the `RecordTaskActivity` row (`activity_logs`: `task.created`); `jobs` table empty |
| Login session | The session cookie still opened `/tasks` after the redeploy |
| Redeploy (`POST /sites/{site}/git/deploy`), twice | Done in 9 s and 10 s; a record created before the redeploy was still there after it; page and readiness still 200 over HTTPS |

Evidence (redacted screenshot):

- [Live page over HTTPS](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-e2-1120/20261120/fda17d7dacbec5faca06dc59c5c91de1/laravel-live.png)
