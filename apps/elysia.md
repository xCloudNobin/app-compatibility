# Elysia

- Action: **create**
- Current source: None; new app required
- Planned canonical repository: `xCloudNobin/deploy-test-elysia`
- Current source visibility: Not created; intended public
- Status: **implementation merged; local verification recorded; live xCloud not verified**

## Implementation brief

Bun runtime, typed validation and framework-native middleware.

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

Current source: https://github.com/xCloudNobin/deploy-test-elysia

Merged PR: https://github.com/xCloudNobin/deploy-test-elysia/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-20)

- Candidate commit: `4f09a32551aa4477707200d8aeec8c61742566c3` (`main`).
- Category: **Deploy via Git > Node.js site with the Bun package manager (native, PM2 running Bun)**. xCloud `dev` at `324be14f2ebeaf4fe64ba3f2e1c14368feb9db3c` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, MySQL 8 (unused by this app).
- Created over the Public API with a personal access token, every field explicit (no repository detection): `POST /api/v1/servers/{server}/sites/git/auto` with `site_type: nodejs`, `deploy_mode: native`, `serving_mode: ssr`, `package_manager: bun`, `build_command: `bun run build``, `start_command: `bun run start``, `port`, `web_root: public` and a one-line deploy script. No environment variables.
- Go-live the way a customer adds a domain: deploy on the staging name, point the domain's A record at the server, then `PUT /api/v1/sites/{site}/domain {ssl_provider: xcloud}`.

| Check | Result |
|---|---|
| Create over the Public API | 202; first deploy live on the staging name in 123 s |
| HTTPS on its own domain | Let's Encrypt certificate (SAN = the site's domain) 292 s after the create call, including the domain change; strict `curl` 200; HTTP redirects to HTTPS |
| Page | "Elysia Taskboard"; the footer shows "elysia on bun 1.4.5"; `/api/health/ready` 200 `{"status":"ready","db":"sqlite"}` |
| Redeploy (`POST /sites/{site}/git/deploy`), twice | Done in 15 s and 16 s; a record created before the redeploy was still there after it; page and readiness still 200 over HTTPS |

Evidence (redacted screenshot):

- [Live page over HTTPS](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-e2-1120/20261120/05e1168794dc6b0317ebde5d09efa7b8/elysia-live.png)
