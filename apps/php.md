# PHP (plain)

- Action: **create**
- Current source: None; new app required
- Planned canonical repository: `xCloudNobin/deploy-test-php`
- Current source visibility: Not created; intended public
- Status: **implementation merged; local verification recorded; live xCloud deployment verified 2026-11-19 (see below)**

## Implementation brief

Plain PHP, no Laravel; PDO storage, sessions and documented web-root routing.

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

Current source: https://github.com/xCloudNobin/deploy-test-php

Merged PR: https://github.com/xCloudNobin/deploy-test-php/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-19)

- Candidate commit: `fb19bc53a2f42daefc4be0cbe32f6fcaa1bf10cd` (`main`).
- Category: **Deploy via Git > custom PHP** (xCloud's own detection: `site_type custom-php`, PHP 8.3, web root `public`). xCloud `dev` at `6b5ffbabbd248c776f8565d71c7b21776acc8c30` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, MySQL 8 (the app uses its own SQLite file).
- Created over the Public API: `POST /api/v1/servers/{server}/sites/git/auto` with only the repository URL and branch. No environment variables.

| Check | Result |
|---|---|
| Create over the Public API (`sites/git/auto`) | 202; first deploy done in 182 s |
| HTTPS on its own domain | Let's Encrypt certificate (SAN = the site's domain); strict `curl` 200; HTTP redirects to HTTPS |
| Page | "PHP Taskboard" with projects and tasks, readiness badge "ready"; `/api/health/ready` 200 `{"status":"ready","db":"sqlite"}` |
| Redeploy (`POST /sites/{site}/git/deploy`) | Done in 5 s; page and readiness still 200 over HTTPS |

Limitation: the first Let's Encrypt attempt hit an Ubuntu archive outage on the lab (12:10Z) and was finished after it. See "Must know" in the PR.

Evidence (redacted screenshot):

- [Live page over HTTPS](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-d-1119/20261119/2e118f7c9f975d1b31bf60e8a18ffdec/screenshot.png)
