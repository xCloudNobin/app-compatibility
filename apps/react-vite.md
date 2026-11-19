# React + Vite

- Action: **upgrade**
- Current source: https://github.com/neobuilds/mcpqa-react-vite
- Planned canonical repository: `xCloudNobin/react-taskboard`
- Current source visibility: public
- Status: **implementation merged; local verification recorded; live xCloud deployment verified 2026-11-19 (see below)**

## Implementation brief

Client task board, deep-link routing, production assets and explicitly browser-only localStorage persistence.

Use the target-specific static/client acceptance criteria; do not add a backend just to imitate server fixtures.

## Required deliverables

- [ ] Verify source owner; resolve the pending transfer before claiming the destination. The source remains `neobuilds/mcpqa-react-vite`; the GitHub transfer API returned `Repository has already been taken` for `xCloudNobin/react-taskboard`, and no duplicate was created.
- [ ] Inspect/reuse the existing source if provided; implement the brief, not a success-page shell.
- [ ] Include license/attribution, README, safe environment example and reproducible dependencies.
- [ ] Document install/build/production start, runtime version, port/bind address, health, schema and persistence.
- [ ] Automated positive/negative smoke tests; applicable restart/redeploy persistence test.
- [ ] Real local production verification and reviewable PR with exact commit and evidence.
- [ ] Separate live xCloud qualification using the intended category before marking deployment verified.

Read [ACCEPTANCE.md](../ACCEPTANCE.md) and [AGENTS.md](../AGENTS.md). Return evidence and blockers to the coordinator; do not self-merge or change repository visibility.

## Delivered implementation

Current source: https://github.com/neobuilds/mcpqa-react-vite

Merged PR: https://github.com/neobuilds/mcpqa-react-vite/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-19)

- Candidate commit: `91bbfe1a622bc870079c47c457aa9e54b80742ca` (`main` of the registered `source_repo` `neobuilds/mcpqa-react-vite`; the `target_repo` transfer is still pending).
- Category: **Deploy via Git > Node.js, static serving** (xCloud's own detection: `site_type nodejs`, static build, web root `dist`). xCloud `dev` at `6b5ffbabbd248c776f8565d71c7b21776acc8c30` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, Node.js 22.
- Created over the Public API: `POST /api/v1/servers/{server}/sites/git/auto` with only the repository URL and branch. No environment variables.

| Check | Result |
|---|---|
| Create over the Public API (`sites/git/auto`) | 202; first deploy done in 17 s |
| HTTPS on its own domain | Let's Encrypt certificate (SAN = the site's domain); strict `curl` 200; HTTP redirects to HTTPS |
| Page | "React Taskboard" task board, build marker in the footer; `/.hidden/secret.txt` stays blocked (403) |
| Redeploy (`POST /sites/{site}/git/deploy`) | Done in 7 s; page still 200 over HTTPS |

Limitation: the first Let's Encrypt attempt hit an Ubuntu archive outage on the lab (12:10Z) and was finished after it. See "Must know" in the PR.

Evidence (redacted screenshot):

- [Live page over HTTPS](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-c-1119/20261119/a008cdfff40b7c63cf04cfb744cc9d32/screenshot.png)
