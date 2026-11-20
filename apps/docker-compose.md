# Docker Compose deployment

- Action: **upgrade**
- Current source: https://github.com/xCloudNobin/deploy-test-docker-compose
- Planned canonical repository: `xCloudNobin/deploy-test-docker-compose`
- Current source visibility: public
- Status: **implementation merged; local verification recorded; live xCloud not verified**

## Implementation brief

Frontend + API + database, private networking, health checks and named volume; expose only intended public services.

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

Current source: https://github.com/xCloudNobin/deploy-test-docker-compose

Merged PR: https://github.com/xCloudNobin/deploy-test-docker-compose/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-20)

- Candidate commit: `d3acd377ff1b143a95d7ed641fd2f76bd01cebce` (`main`).
- Category: **Deploy via Git > Docker Compose (the repository's own `compose.yaml`)**. xCloud `dev` at `324be14f2ebeaf4fe64ba3f2e1c14368feb9db3c` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, MySQL 8 (unused by this app).
- Created over the Public API with a personal access token, every field explicit (no repository detection): `POST /api/v1/servers/{server}/sites/git/docker` with `docker.mode: compose`, `docker.compose_file: compose.yaml`, `port: 8188` and `env_file_content` holding only the required `POSTGRES_PASSWORD` (a test-only value; the fixture's README requires it).
- Go-live the way a customer adds a domain: deploy on the staging name, point the domain's A record at the server, then `PUT /api/v1/sites/{site}/domain {ssl_provider: xcloud}`.

| Check | Result |
|---|---|
| Create over the Public API | 202; first deploy live on the staging name in 91 s |
| HTTPS on its own domain | Let's Encrypt certificate (SAN = the site's domain) 182 s after the create call, including the domain change; strict `curl` 200; HTTP redirects to HTTPS |
| Page | "Task Board" (compose + postgres); frontend, api and db containers all `healthy`; `/api/health/ready` 200 `{"status":"ok","db":"up"}` |
| Redeploy (`POST /sites/{site}/git/deploy`), twice | Done in 20 s and 21 s; a record created before the redeploy was still there after it; page and readiness still 200 over HTTPS |

Evidence (redacted screenshot):

- [Live page over HTTPS](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-e2-1120/20261120/a03ce76a0ccf6aaaccb2980ddc5d28b0/docker-compose-live.png)
