# Flask

- Action: **upgrade**
- Current source: https://github.com/xCloudNobin/deploy-test-flask
- Planned canonical repository: `xCloudNobin/deploy-test-flask`
- Current source visibility: public
- Status: **implementation merged; local verification recorded; live xCloud not verified**

## Implementation brief

Production WSGI server, templates and database migrations.

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

Current source: https://github.com/xCloudNobin/deploy-test-flask

Merged PR: https://github.com/xCloudNobin/deploy-test-flask/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-24)

- Candidate commit: `0c984453a076129691b0d6c20e2b899b804c2cae` (`main`).
- Category: **Deploy via Git > app recipe, Flask (the Dockerfile xCloud generates for Flask, container port 8000, `/app/data` kept)**. xCloud `dev` at `c53ef2ac8858f7f72898b0f8dae78faac1b4a9a8` on the xcdev lab (Incus control plane).
- Server: lab VM with a public IPv4, xCloud Nginx stack, Ubuntu 24.04, MySQL 8 (unused by this app). Docker was installed by the first recipe deploy (20 s).
- Created over the Public API with a personal access token: `POST /api/v1/servers/{server}/sites/git/auto` with only `repository.url`, `repository.branch: main` and a live domain (`domain.mode: live`, `domain.ssl_provider: xcloud`). xCloud's repository detection picked the recipe. No environment variables, no deploy-script edit, no manual SSL call. The domain's A record was added right after the create, as the create response asks.
- This rerun checks fix xCloudDev/xCloud#11428 (on dev through #11589): in batch B (2026-11-19) the same request deployed but never got a certificate (cause C1).

| Check | Result |
|---|---|
| Create over the Public API | 202 on the first call, `deploy_mode: dockerfile`; the status endpoint shows `ssl.provider: xcloud` at once |
| HTTPS on its own domain | Let's Encrypt certificate (issuer YE2, SAN = the site's domain) issued by xCloud itself; strict `curl` 200 "Task Board" 163 s after the create call; `/health` 200, `/ready` 200 `{"database":"ok"}`; HTTP redirects 301 to HTTPS |
| Data | A task "qa-marker-daily-1124" added through the app's own form (CSRF) after the first deploy |
| Redeploy (`POST /sites/{site}/git/deploy`) | Two redeploys, 39 s and 42 s (exit 0); after the second the marker task is still listed on `/` and in `/api/tasks`; 20/20 strict requests 200. A redeploy of the same commit keeps the running container; the SQLite file lives in the kept `/app/data` volume |

Evidence (redacted, text rendered by the lab):

- [Strict HTTPS, certificate, health and the marker after the redeploy](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-daily-1124/20261124/ed0eb8a4ebde7c4c99fd6005ff2df657/flask-live-https-1124.png)
