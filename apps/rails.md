# Rails

- Action: **create**
- Current source: None; new app required
- Planned canonical repository: `xCloudNobin/deploy-test-rails`
- Current source visibility: Not created; intended public
- Status: **implementation merged; local verification recorded; live xCloud not verified**

## Implementation brief

ORM migrations, login/session and one background job with worker command.

Implement the shared meaningful-app baseline: UI, validated CRUD, persistent storage, schema setup, production configuration, health/readiness and automated smoke/persistence checks. Use a project/task board unless the specific requirement preserves another domain.

## Required deliverables

- [ ] Verify source owner; resolve any pending transfer before creating a destination.
- [ ] Inspect/reuse the existing source if provided; implement the brief, not a success-page shell.
- [ ] Include license/attribution, README, safe environment example and reproducible dependencies.
- [ ] Document install/build/production start, runtime version, port/bind address, health, schema and persistence.
- [ ] Automated positive/negative smoke tests; applicable restart/redeploy persistence test.
- [x] Real local production verification and reviewable PR with exact commit and evidence (`xCloudNobin/deploy-test-rails/pull/1`, merge `f0be46be10181138a8b9bf0551843fdc7b3c8b2f`).
- [ ] Separate live xCloud qualification using the intended category before marking deployment verified.

Read [ACCEPTANCE.md](../ACCEPTANCE.md) and [AGENTS.md](../AGENTS.md). Return evidence and blockers to the coordinator; do not self-merge or change repository visibility.

## Delivered implementation

Current source: https://github.com/xCloudNobin/deploy-test-rails

Merged PR: https://github.com/xCloudNobin/deploy-test-rails/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-20)

- Candidate commit: `f0be46be10181138a8b9bf0551843fdc7b3c8b2f` (`main`).
- Category: **Deploy via Git > app recipe, Rails (recipe `rails`: ruby 3.2-slim image xCloud generates, container port 3000, `/app/data` and `/app/storage` kept)**. xCloud `dev` at `0c74c8d8453e04bfc9520d1ddc3d3c83e9ffcebc` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, MySQL 8 (unused by this app). Docker was installed by the first recipe deploy.
- Created over the Public API with a personal access token: `POST /api/v1/servers/{server}/sites/git/auto` with only `repository.url` and `repository.branch: main` (and `generate_ai_script: false`). xCloud's repository detection picked the recipe and built the app with the Dockerfile it generates for it. No environment variables (the recipe supplies the production secret). The SQLite database lives at `/app/storage/production.sqlite3`, a kept folder.
- Go-live the way a customer adds a domain: deploy on the staging name, point the domain's A record at the server, then `PUT /api/v1/sites/{site}/domain {ssl_provider: xcloud}`.

| Check | Result |
|---|---|
| Create over the Public API | 202 on the first call; first deploy (image build + Docker install) done and the site provisioned 261 s later |
| HTTPS on its own domain | Let's Encrypt certificate (SAN = the site's domain) installed 297 s after the create call, including the domain change; strict `curl`: `/` 302 to `/session/new` (anonymous redirect, as the fixture is built), `/session/new` 200 "Taskboard", `/up` and `/health/ready` 200 `{"db":"up"}`; HTTP redirects to HTTPS |
| Sign-in and data | A user and a task "QA marker cat-i" were added with `bin/rails runner` in the container (the app has no sign-up); signing in over HTTPS (CSRF form) lands on `/tasks`, which lists the task |
| Redeploy (`POST /sites/{site}/git/deploy`) | Done in 123 s (exit 0, image rebuilt); signing in again shows the same task; readiness and the certificate unchanged |

Evidence (redacted screenshots):

- [Live sign-in page over HTTPS](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-i-1120/20261120/6260edb1c5485796d03e7a30e586f310/rails-live.png)
- [Signed in after the redeploy: the marker task is still listed](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-i-1120/20261120/dadab0a4dd5f905228944ee6f460e6a7/rails-redeploy-marker.png)
