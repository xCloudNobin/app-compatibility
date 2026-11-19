# Django

- Action: **create**
- Current source: None; new app required
- Planned canonical repository: `xCloudNobin/deploy-test-django`
- Current source visibility: Not created; intended public
- Status: **implementation merged; local verification recorded; live xCloud deployment verified 2026-11-19 (see below)**

## Implementation brief

ORM migrations, login/session, one background job with a documented worker command.

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

Current source: https://github.com/xCloudNobin/deploy-test-django

Merged PR: https://github.com/xCloudNobin/deploy-test-django/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-19)

- Candidate commit: `c410010f6da0373868913e3b3ae5bd0b4a962fda` (`main`).
- Category: **Deploy via Git**, auto-detected by xCloud as Django (app recipe, xCloud-generated Dockerfile, `deploy_mode = dockerfile`, container port 8000). xCloud `dev` at `6b5ffbabbd248c776f8565d71c7b21776acc8c30` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, 4 GiB; Docker not installed before this site (xCloud installed it).
- Created over the Public API: `POST /api/v1/servers/{server}/sites/git/auto` with only the repository URL and branch. No env vars set; staging domain chosen by xCloud.

| Check | Result |
|---|---|
| Create over the Public API (`sites.git.auto`) | Live in 167 s (includes the Docker install, 67 s) |
| Release step | xCloud ran `collectstatic` and `migrate --noinput`; gunicorn started |
| HTTPS on the site's domain | `/` 302 to `/accounts/login/`, which answers 200 ("Log in · Django Taskboard"); `/health/live` and `/health/ready` 200 |
| Redeploy (`POST /sites/{uuid}/git/deploy`) | Done in 37 s; same pages 200 after it |

Notes: the lab's staging domain uses the lab's stand-in wildcard certificate (production uses a public one), so the HTTPS check ran at the server with the site's name. The task board is behind the app's login; making the first user is the fixture's documented `manage.py ensureuser` step.

Evidence (redacted screenshot):

- [Live login page over HTTPS](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-b-1119/20261119/a9e733a724198c61af5fb1e838d6a7b7/screenshot.png)
