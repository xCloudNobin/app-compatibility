# Java (plain)

- Action: **create**
- Current source: None; new app required
- Planned canonical repository: `xCloudNobin/deploy-test-java`
- Current source visibility: Not created; intended public
- Status: **implementation merged; local verification recorded; live xCloud not verified**

## Implementation brief

Plain Java HTTP server, no Spring; reproducible build and packaged artifact.

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

Current source: https://github.com/xCloudNobin/deploy-test-java

Merged PR: https://github.com/xCloudNobin/deploy-test-java/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-20)

- Candidate commit: `de7b6980fd8046de3c187ec0afd468a41ead0011` (`main`).
- Category: **Deploy via Git > app recipe, Java (recipe `java`: Maven build, container port 8080)**. xCloud `dev` at `0400217263d85436d6b1e448dfcd74ec574c4d3b` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, MySQL 8 (unused by this app). Docker was installed by the first recipe deploy.
- Created over the Public API with a personal access token: `POST /api/v1/servers/{server}/sites/git/auto` with only `repository.url` and `repository.branch: main` (and `generate_ai_script: false`). xCloud's repository detection picked the recipe and built the app with the Dockerfile it generates for it. No environment variables. A recipe site cannot be created without that detection call at this commit.
- Go-live the way a customer adds a domain: deploy on the staging name, point the domain's A record at the server, then `PUT /api/v1/sites/{site}/domain {ssl_provider: xcloud}`.

| Check | Result |
|---|---|
| Create over the Public API | 202; first deploy live on the staging name in 84 s |
| HTTPS on its own domain | Let's Encrypt certificate (SAN = the site's domain) 196 s after the create call, including the domain change; strict `curl` 200; HTTP redirects to HTTPS |
| Page | "Java Taskboard"; Java 21.0.13; `/api/health/ready` 200 `{"db":"sqlite","status":"ready"}`; SQLite at `/app/data/taskboard.db` |
| Redeploy (`POST /sites/{site}/git/deploy`) | Done in 47 s; a project created before it was still listed after it; page and readiness still 200 over HTTPS |

Evidence (redacted screenshot):

- [Live page over HTTPS](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-h-1120/20261120/bea2634fcde4feb8a234b0d707f5878d/java-live.png)
