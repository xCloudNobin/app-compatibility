# Dockerfile deployment

- Action: **upgrade**
- Current source: https://github.com/xCloudNobin/deploy-test-dockerfile
- Planned canonical repository: `xCloudNobin/deploy-test-dockerfile`
- Current source visibility: public
- Status: **implementation merged; local verification recorded; live xCloud deployment verified 2026-11-19 (see below)**

## Implementation brief

Real CRUD app, multi-stage build, non-root runtime, HEALTHCHECK and documented persistent volume.

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

Current source: https://github.com/xCloudNobin/deploy-test-dockerfile

Merged PR: https://github.com/xCloudNobin/deploy-test-dockerfile/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-19)

- Candidate commit: `303d80f3f892109bb0721ea62bd1fc4cfd8a1cbb` (`main`).
- Category: **Deploy via Git > Docker container > Dockerfile** (`git_info.deploy_mode = dockerfile`), xCloud `dev` at `1400b5c74a0a13a83e35324bf15b391a506ff8b2` on the xcdev lab.
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04; Docker not installed before the first site.
- Detected container port: `8080` (from `EXPOSE`).

| Check | Result |
|---|---|
| Create from the dashboard | Live in 114 s (includes the Docker install) |
| Create over MCP (`servers.sites.git.docker`, dry run, then real) | Live in 19 s (`sites.status` terminal, deployed) |
| HTTPS on its own domain | Let's Encrypt certificate from the xCloud SSL flow; strict `curl` 200; `/api/info`, `/ready` 200; HTTP redirects to HTTPS |
| UI | Task board renders with seed data |
| Redeploy (release mode off) | Done in 7 s; a task created before it still exists after it |
| Zero-downtime on, then deploy | Health check on the new container, nginx switch; 350/350 probe requests 200 during the deploy |
| Rollback to the earlier release | Done in 2 s; 212/212 probe requests 200 |
| `.env` change while zero-downtime is on | Container restarted with the new value (`/api/info` build marker) |

Limitation (an xCloud fault, not a fixture fault): with zero-downtime deploys on, each release gets a new anonymous Docker volume for `VOLUME /data`, so the SQLite data does not carry over to the new release. With release mode off, redeploys keep `/data`. Reported to the xCloud factory for a fix.

Evidence (redacted screenshots):

- [Create form](https://xclab-evidence.tmp1.dev/lab-xl-factory/dockerfile-ann/20261119/ade624159745818c0802b146816ee623/dockerfile-01-create-form.png)
- [Deploy log](https://xclab-evidence.tmp1.dev/lab-xl-factory/dockerfile-ann/20261119/b91837c2b38bd78ee5ba58addfada83e/dockerfile-02-deploy-log.png)
- [Live page over HTTPS](https://xclab-evidence.tmp1.dev/lab-xl-factory/dockerfile-ann/20261119/e9f02cb08e250affbeca249bcae1abdd/dockerfile-03-live-page.png)
- [Zero-downtime turned on](https://xclab-evidence.tmp1.dev/lab-xl-factory/dockerfile-ann/20261119/c7071445a869c428abe57b980d046748/dockerfile-05-zero-downtime-on.png)
- [Rolled back](https://xclab-evidence.tmp1.dev/lab-xl-factory/dockerfile-ann/20261119/51500868bece805d7bd4b4c259a98f20/dockerfile-07-rolled-back.png)
- [Run record: timings, MCP calls, TLS issuer and SAN, probe counts](https://xclab-evidence.tmp1.dev/lab-xl-factory/dockerfile-ann/20261119/bc49a94c3076ad6fd5e165bbf8f3eaaf/dockerfile-08-run-record.png)
