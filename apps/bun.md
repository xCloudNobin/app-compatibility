# Bun (native)

- Action: **create**
- Current source: None; new app required
- Planned canonical repository: `xCloudNobin/deploy-test-bun`
- Current source visibility: Not created; intended public
- Status: **implementation merged; local verification recorded; live xCloud not verified**

## Implementation brief

Native Bun HTTP server; do not substitute Elysia or Hono.

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

Current source: https://github.com/xCloudNobin/deploy-test-bun

Merged PR: https://github.com/xCloudNobin/deploy-test-bun/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-20)

- Candidate commit: `57961e466760ea23a53934c0e2f5b2f05902d961` (`main`).
- Category: **Deploy via Git > Node.js site with the Bun package manager (native, PM2 running Bun)**. xCloud `dev` at `324be14f2ebeaf4fe64ba3f2e1c14368feb9db3c` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, MySQL 8 (unused by this app).
- Created over the Public API with a personal access token, every field explicit (no repository detection): `POST /api/v1/servers/{server}/sites/git/auto` with `site_type: nodejs`, `deploy_mode: native`, `serving_mode: ssr`, `package_manager: bun`, `build_command: `bun run build``, `start_command: `bun run start``, `port`, `web_root: public` and a one-line deploy script. No environment variables.
- Go-live the way a customer adds a domain: deploy on the staging name, point the domain's A record at the server, then `PUT /api/v1/sites/{site}/domain {ssl_provider: xcloud}`.

| Check | Result |
|---|---|
| Create over the Public API | 202; first deploy live on the staging name in 118 s |
| HTTPS on its own domain | Let's Encrypt certificate (SAN = the site's domain) 235 s after the create call, including the domain change; strict `curl` 200; HTTP redirects to HTTPS |
| Page | "Bun Taskboard"; the footer shows the runtime "bun 1.4.5"; `/api/health/ready` 200 `{"status":"ready","db":"sqlite"}` |
| Redeploy (`POST /sites/{site}/git/deploy`), twice | Done in 20 s and 17 s; a record created before the redeploy was still there after it; page and readiness still 200 over HTTPS |

Evidence (redacted screenshot):

- [Live page over HTTPS](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-e2-1120/20261120/1ee98149875331abc25637da90a9637a/bun-live.png)
