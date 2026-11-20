# Next.js

- Action: **upgrade**
- Current source: https://github.com/xCloudNobin/supabase-guestbook
- Planned canonical repository: `xCloudNobin/supabase-guestbook`
- Current source visibility: public
- Status: **implementation merged; local verification recorded; live xCloud not verified**

## Implementation brief

Keep guestbook domain: UI/API, server-side Supabase access, validated writes, list/edit/delete and persistence. Do not replace with a shell.

Implement the shared meaningful-app baseline: UI, validated CRUD, persistent storage, schema setup, production configuration, health/readiness and automated smoke/persistence checks. Use a project/task board unless the specific requirement preserves another domain.

## Required deliverables

- [ ] Verify source owner; resolve any pending transfer before creating a destination.
- [ ] Inspect/reuse the existing source if provided; implement the brief, not a success-page shell.
- [ ] Include license/attribution, README, safe environment example and reproducible dependencies.
- [ ] Document install/build/production start, runtime version, port/bind address, health, schema and persistence.
- [ ] Automated positive/negative smoke tests; applicable restart/redeploy persistence test.
- [x] Real local production verification and reviewable PR with exact commit and evidence (`xCloudNobin/supabase-guestbook/pull/1`, merge `f1d19817a85f82dcdf807bed065c1e0874378c19`).
- [ ] Separate live xCloud qualification using the intended category before marking deployment verified.

Read [ACCEPTANCE.md](../ACCEPTANCE.md) and [AGENTS.md](../AGENTS.md). Return evidence and blockers to the coordinator; do not self-merge or change repository visibility.

## Delivered implementation

Current source: https://github.com/xCloudNobin/supabase-guestbook

Merged PR: https://github.com/xCloudNobin/supabase-guestbook/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.

## Live xCloud qualification (2026-11-20)

- Candidate commit: `f1d19817a85f82dcdf807bed065c1e0874378c19` (`main`).
- Category: **Deploy via Git > Docker Compose** (the repository's `docker-compose.yml`: the Next.js app built from its Dockerfile, plus Supabase Postgres, PostgREST and nginx), as the README documents for production. xCloud `dev` at `324be14f2ebeaf4fe64ba3f2e1c14368feb9db3c` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack with Docker, Ubuntu 24.04, public IPv4.
- Created over the Public API with a personal access token, no repository detection: `POST /api/v1/servers/{server}/sites/git/docker` with `docker: {mode: compose, compose_file: docker-compose.yml}`, `port: 8104` and a staging domain. No environment variables are needed: the compose file carries the internal settings.
- All four containers were healthy after 114 s; the BuildKit image build had registry access on the lab server.
- Go-live: deploy on the staging name, point the domain's A record at the server, then `PUT /api/v1/sites/{site}/domain {ssl_provider: xcloud}`. Let's Encrypt (SAN = the domain), HTTP 301 → HTTPS. Create → live: **190 s**.
- Checks over HTTPS: `/` 200 `Supabase Guestbook` with no "Supabase setup needed" notice; `/api/ready` 200 (`db: reachable`); a `/_next/static/` chunk 200; `POST /api/messages` 201.
- Redeploy (`POST /sites/{site}/git/deploy`, 33 s): the marker message is still listed by `/api/messages` and rendered server-side on `/`; `/api/ready` 200.
- A native PM2 deploy of this repository is not the intended category: it has no data layer (batches C-D).

Evidence (text rendered by the lab, redacted): [nextjs](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-g-1120/20261120/a951d2c5a7f68a774e7bd6010edeed28/nextjs-live.png)
