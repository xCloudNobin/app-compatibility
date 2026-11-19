# Node.js (plain)

- Action: **create**
- Current source: None; new app required
- Planned canonical repository: `xCloudNobin/deploy-test-nodejs`
- Current source visibility: Not created; intended public
- Status: **implementation merged; local verification recorded; live xCloud deployment verified 2026-11-19 (see below)**

## Implementation brief

Native Node HTTP server, no Express or other routing framework.

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

Current source: https://github.com/xCloudNobin/deploy-test-nodejs

Merged PR: https://github.com/xCloudNobin/deploy-test-nodejs/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-19)

- Candidate commit: `8a066dfa221433e8b5a6f4732e4cf33e1fd4f33d` (`main`).
- Category: **Deploy via Git > Node.js** (`site_type: nodejs`, serving mode `ssr`, start `npm run start`, release mode off), xCloud `dev` at `6b5ffbabbd248c776f8565d71c7b21776acc8c30` on the xcdev lab.
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, no database; Node.js not installed before the site (xCloud installed v24.22.3 with it).
- Created over the Public API: `POST /api/v1/git/detect` (detected `nodejs`, `ssr`, `npm run start`), then `POST /api/v1/servers/{server}/sites/git/auto`. No environment variables set; the app used its defaults (port allocated by xCloud: 3000, SQLite under `data/`).

| Check | Result |
|---|---|
| Create over the Public API (`sites.git.auto`) | 202, then `sites.status` terminal `deployed` in 110 s |
| HTTPS on its own domain (staging hostname) | 200, "Node.js Taskboard" page; `/api/health/ready` 200 (`ready`, sqlite) |
| UI | Task board renders with seed data and the release marker |
| Redeploy (`POST /api/v1/sites/{site}/git/deploy`, release mode off) | Done in 19 s; HTTPS 200 again; a task created before it still exists after it |

Limitations: the staging hostname used the lab's own `*.tmp1.dev` certificate, not a Let's Encrypt one (the lab stands in for xCloud's staging certificate). With release mode off, the redeploy restarts the Node process, so requests during the restart got 502 for a few seconds; zero-downtime deploys were not tested. The detected fields were passed to `sites.git.auto` explicitly because the lab's shared GitHub API quota was used up at that moment (a lab limit; production has its own token).

Evidence (redacted screenshot):

- [Live page over HTTPS](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-a-1119/20261119/0eba64925a3590d3242acf1b3a019c71/nodejs-live-page.png)
