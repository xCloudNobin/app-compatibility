# Ruby / Rack

- Action: **create**
- Current source: None; new app required
- Planned canonical repository: `xCloudNobin/deploy-test-ruby-rack`
- Current source visibility: Not created; intended public
- Status: **implementation merged; local verification recorded; live xCloud not verified**

## Implementation brief

Rack app, no Rails; production server and database-backed forms.

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

Current source: https://github.com/xCloudNobin/deploy-test-ruby-rack

Merged PR: https://github.com/xCloudNobin/deploy-test-ruby-rack/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-20)

- Candidate commit: `5e43cdc63732cab0cc84ffc836165fbe974c7243` (`main`).
- Category: **Deploy via Git > app recipe, Ruby (Rack) (recipe `ruby-rack`: ruby slim image, container port 9292)**. xCloud `dev` at `0400217263d85436d6b1e448dfcd74ec574c4d3b` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, MySQL 8 (unused by this app). Docker was installed by the first recipe deploy.
- Created over the Public API with a personal access token: `POST /api/v1/servers/{server}/sites/git/auto` with only `repository.url` and `repository.branch: main` (and `generate_ai_script: false`). xCloud's repository detection picked the recipe and built the app with the Dockerfile it generates for it. No environment variables. A recipe site cannot be created without that detection call at this commit.
- Go-live the way a customer adds a domain: deploy on the staging name, point the domain's A record at the server, then `PUT /api/v1/sites/{site}/domain {ssl_provider: xcloud}`.

| Check | Result |
|---|---|
| Create over the Public API | 202; first deploy live on the staging name in 105 s |
| HTTPS on its own domain | Let's Encrypt certificate (SAN = the site's domain) 180 s after the create call, including the domain change; strict `curl` 200; HTTP redirects to HTTPS |
| Page | "Rack Taskboard"; runtime ruby 3.2.11 / webrick (as the fixture pins); `/api/health/ready` 200 `{"status":"ready","database":"/app/data/taskboard.db"}` |
| Redeploy (`POST /sites/{site}/git/deploy`) | Done in 88 s (it ran next to another site's first build); a project created before it was still listed after it; page and readiness still 200 over HTTPS |

Evidence (redacted screenshot):

- [Live page over HTTPS](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-h-1120/20261120/7af4edb1286eb57ed84f4ec4c13e94bf/ruby-rack-live.png)
