# Astro

- Action: **upgrade**
- Current source: https://github.com/xCloudNobin/deploy-test-astro
- Planned canonical repository: `xCloudNobin/deploy-test-astro`
- Current source visibility: public
- Status: **implementation merged; local verification recorded; live xCloud deployment verified 2026-11-19 (see below)**

## Implementation brief

Static content site: collections, multiple pages, assets and client-side search.

Use the target-specific static/client acceptance criteria; do not add a backend just to imitate server fixtures.

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

Current source: https://github.com/xCloudNobin/deploy-test-astro

Merged PR: https://github.com/xCloudNobin/deploy-test-astro/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-19)

- Candidate commit: `a099a08d5d3ba05a5219ba728fd6f824c2c9ff7e` (`main`).
- Category: **Deploy via Git > Node.js, static serving** (xCloud's own detection: `site_type nodejs`, `serving_mode static`, framework Astro, `npm run build`, web root `dist`). xCloud `dev` at `6b5ffbabbd248c776f8565d71c7b21776acc8c30` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, Node.js 22.
- Created over the Public API: `POST /api/v1/servers/{server}/sites/git/auto` with only the repository URL and branch. No environment variables.

| Check | Result |
|---|---|
| Create over the Public API (`sites/git/auto`) | 202; first deploy done (`deploy_state: deployed`) in 37 s |
| HTTPS on its own domain | Go-live (`PUT /sites/{site}/domain`, `ssl_provider: xcloud`): Let's Encrypt certificate (SAN = the site's domain); strict `curl` 200; HTTP redirects to HTTPS |
| Page | "Field Notes — a small static library" with categories; `/healthz.txt` 200 |
| Redeploy (`POST /sites/{site}/git/deploy`) | Done in 10 s; page still 200 |

Evidence (redacted screenshot):

- [Live page over HTTPS](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-c-1119/20261119/be40ced310856d93f27eaba1c5000fe0/screenshot.png)
