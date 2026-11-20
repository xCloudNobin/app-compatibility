# Python / WSGI (plain)

- Action: **create**
- Current source: None; new app required
- Planned canonical repository: `xCloudNobin/deploy-test-python-wsgi`
- Current source visibility: Not created; intended public
- Status: **implementation merged; local verification recorded; live xCloud not verified**

## Implementation brief

A WSGI callable without Flask/Django; production WSGI server.

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

Current source: https://github.com/xCloudNobin/deploy-test-python-wsgi

Merged PR: https://github.com/xCloudNobin/deploy-test-python-wsgi/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-20)

- Candidate commit: `85361b94d1c1187cca7d6e011f690be466599093` (`main`).
- Category: **Deploy via Git > app recipe, Python WSGI (recipe `python-wsgi`: python:3.12-slim, container port 8000; the app serves with Waitress)**. xCloud `dev` at `0400217263d85436d6b1e448dfcd74ec574c4d3b` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, MySQL 8 (unused by this app). Docker was installed by the first recipe deploy.
- Created over the Public API with a personal access token: `POST /api/v1/servers/{server}/sites/git/auto` with only `repository.url` and `repository.branch: main` (and `generate_ai_script: false`). xCloud's repository detection picked the recipe and built the app with the Dockerfile it generates for it. No environment variables. A recipe site cannot be created without that detection call at this commit.
- Go-live the way a customer adds a domain: deploy on the staging name, point the domain's A record at the server, then `PUT /api/v1/sites/{site}/domain {ssl_provider: xcloud}`.

| Check | Result |
|---|---|
| Create over the Public API | 202; first deploy live on the staging name |
| HTTPS on its own domain | Let's Encrypt certificate (SAN = the site's domain) 195 s after the create call, including the domain change; strict `curl` 200; HTTP redirects to HTTPS |
| Page | "WSGI Taskboard"; runtime python 3.12.16 / waitress; `/api/health/ready` 200 `{"status":"ready","database":"/app/data/taskboard.db"}` |
| Redeploy (`POST /sites/{site}/git/deploy`) | Done in 41 s; a project created before it was still listed after it; page and readiness still 200 over HTTPS |

Evidence (redacted screenshot):

- [Live page over HTTPS](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-h-1120/20261120/070b3826091b77de280f9083f9153656/python-wsgi-live.png)
