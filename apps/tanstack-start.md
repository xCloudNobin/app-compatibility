# TanStack Start

- Action: **upgrade**
- Current source: https://github.com/xCloudNobin/tanstack-taskboard (renamed from `neobuilds/mcpqa-tanstack-start`)
- Planned canonical repository: `xCloudNobin/tanstack-taskboard`
- Current source visibility: public
- Status: **implementation merged; local verification recorded; live xCloud deployment verified 2026-11-19 (see below)**

## Implementation brief

SSR, server-side database reads, form mutation and hydration.

Implement the shared meaningful-app baseline: UI, validated CRUD, persistent storage, schema setup, production configuration, health/readiness and automated smoke/persistence checks. Use a project/task board unless the specific requirement preserves another domain.

## Required deliverables

- [ ] Verify source owner; resolve any pending transfer before creating a destination.
- [ ] Inspect/reuse the existing source if provided; implement the brief, not a success-page shell.
- [ ] Include license/attribution, README, safe environment example and reproducible dependencies.
- [ ] Document install/build/production start, runtime version, port/bind address, health, schema and persistence.
- [ ] Automated positive/negative smoke tests; applicable restart/redeploy persistence test.
- [x] Real local production verification and reviewable PR with exact commit and evidence (`xCloudNobin/tanstack-taskboard/pull/1`, merge `3231757d1d2390bd0cb8633ed870a5dc295e9172`).
- [ ] Separate live xCloud qualification using the intended category before marking deployment verified.

Read [ACCEPTANCE.md](../ACCEPTANCE.md) and [AGENTS.md](../AGENTS.md). Return evidence and blockers to the coordinator; do not self-merge or change repository visibility.

## Delivered implementation

Current source: https://github.com/xCloudNobin/tanstack-taskboard

Merged PR: https://github.com/xCloudNobin/tanstack-taskboard/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-19)

- Candidate commit: `3231757d1d2390bd0cb8633ed870a5dc295e9172` (`main`).
- Category: **Deploy via Git > Node.js, SSR** (xCloud's own detection: `site_type nodejs`, server under PM2). xCloud `dev` at `6b5ffbabbd248c776f8565d71c7b21776acc8c30` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, Node.js 22.
- Created over the Public API: `POST /api/v1/servers/{server}/sites/git/auto` with only the repository URL and branch. No environment variables.

| Check | Result |
|---|---|
| Create over the Public API (`sites/git/auto`) | 202; app answered at the origin in about 2.5 minutes; `deploy_state: deployed` at 418 s (the monitoring install waited on the server's apt lock) |
| HTTPS on its own domain | Let's Encrypt certificate (SAN = the site's domain); strict `curl` 200 (`/` redirects to `/?status=all`); HTTP redirects to HTTPS |
| Page | "TanStack Taskboard" with seeded tasks and status filters; `/api/health/ready` 200 `{"status":"ready","db":"ok"}` |
| Redeploy (`POST /sites/{site}/git/deploy`) | Done in 18 s; page still 200 over HTTPS |

Limitation: the first Let's Encrypt attempt hit an Ubuntu archive outage on the lab (12:10Z) and was finished after it. See "Must know" in the PR.

Evidence (redacted screenshot):

- [Live page over HTTPS](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-c-1119/20261119/4b42c02bb5c6d970300a15d0e4f7e367/screenshot.png)
