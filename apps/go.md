# Go

- Action: **upgrade**
- Current source: https://github.com/xCloudNobin/deploy-test-go
- Planned canonical repository: `xCloudNobin/deploy-test-go`
- Current source visibility: public
- Status: **implementation merged; local verification recorded; live xCloud deployment verified 2026-11-19 (see below)**

## Implementation brief

Compiled binary, graceful shutdown and database queries.

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

Current source: https://github.com/xCloudNobin/deploy-test-go

Merged PR: https://github.com/xCloudNobin/deploy-test-go/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-19)

- Candidate commit: `5994abeafcf85543c40dc9ffb666444e684640de` (`main`).
- Category: **Deploy via Git > Docker (Dockerfile)** (xCloud's own detection: `deploy_mode: dockerfile`; xCloud installs Docker on the server on demand). xCloud `dev` at `6b5ffbabbd248c776f8565d71c7b21776acc8c30` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04.
- Created over the Public API: `POST /api/v1/servers/{server}/sites/git/auto` with only the repository URL and branch. No environment variables.

| Check | Result |
|---|---|
| Create over the Public API (`sites/git/auto`) | 202; first deploy done in 293 s (includes installing Docker on the server) |
| HTTPS on its own domain | Let's Encrypt certificate (SAN = the site's domain); strict `curl` 200; HTTP redirects to HTTPS |
| Page | "Taskboard" project board with projects and tasks; `/health` 200 `{"status":"ok"}` |
| Redeploy (`POST /sites/{site}/git/deploy`) | Done in 75 s (image rebuilt, container recreated); page still 200 over HTTPS |

Limitations: the first attempt failed while installing Docker, because `apt-get update` on a slow mirror took more than 90 s (an xCloud finding, see the PR). The second attempt passed. The first Let's Encrypt attempt also hit an Ubuntu archive outage on the lab (12:10Z) and was finished after it.

Evidence (redacted screenshot):

- [Live page over HTTPS](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-d-1119/20261119/b010001fa83842241273d85e41786e49/screenshot.png)
