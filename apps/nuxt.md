# Nuxt

- Action: **create**
- Current source: None; new app required
- Planned canonical repository: `xCloudNobin/deploy-test-nuxt`
- Current source visibility: Not created; intended public
- Status: **implementation merged; local verification recorded; live xCloud deployment verified 2026-11-19 (see below)**

## Implementation brief

SSR, server-side database reads, form mutation and client hydration.

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

Current source: https://github.com/xCloudNobin/deploy-test-nuxt

Merged PR: https://github.com/xCloudNobin/deploy-test-nuxt/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-19)

- Candidate commit: `47254bc54dc7b6365548de83632d23e39ae61147` (`main`).
- Category: **Deploy via Git > Node.js, SSR** (xCloud's own detection: `site_type nodejs`, Nitro server under PM2). xCloud `dev` at `6b5ffbabbd248c776f8565d71c7b21776acc8c30` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, Node.js 22.
- Created over the Public API: `POST /api/v1/servers/{server}/sites/git/auto` with only the repository URL and branch. No environment variables.

| Check | Result |
|---|---|
| Create over the Public API (`sites/git/auto`) | 202; app answered 200 at the origin in about 2.5 minutes; `deploy_state: deployed` at 427 s (the monitoring install waited on the server's apt lock) |
| HTTPS on its own domain | Let's Encrypt certificate (SAN = the site's domain); strict `curl` 200; HTTP redirects to HTTPS |
| Page | "Nuxt Taskboard"; `/api/health/ready` 200 `{"status":"ready","db":"sqlite"}` |
| Redeploy (`POST /sites/{site}/git/deploy`) | Done in 29 s; page and readiness still 200 over HTTPS |

Limitation: the first Let's Encrypt attempt hit an Ubuntu archive outage on the lab (12:10Z) and was finished after it. See "Must know" in the PR.

Evidence (redacted capture of the HTTPS checks):

- [HTTPS checks](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-c-1119/20261119/3715c1bd667e122c3703bf4fe0403da2/nuxt-https-check.png)
