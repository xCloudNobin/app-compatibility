# TODO

## Current status

- [x] Implement all 24 canonical apps and merge their PRs.
- [x] Record local production verification.
- [x] Reconcile current repositories and merges in [COMPLETION.md](COMPLETION.md) and catalog.json.
- [ ] Complete React repository transfer.
- [ ] Run live xCloud qualification per target.
- [ ] Run separate GitHub authentication suite.

The historical per-app checkboxes below include live qualification and therefore remain open.


## Foundation

- [x] Agree one meaningful public app per type; separate GitHub auth testing.
- [x] Document 24 canonical targets, source inventory, shared acceptance and agent briefs.
- [ ] Complete the remaining React source transfer in MIGRATION.md; implementation is merged but destination ownership is not verified.
- [ ] Review history/license/security and approve publication of each existing private canonical app.
- [ ] Confirm runtime versions and supported native deployment settings before each implementation.

## App work

Every checkbox below means implementation AND review AND real platform qualification, not simply repository creation. All begin unverified.

- [ ] **Laravel** — upgrade [`xCloudNobin/laravel-taskboard`](https://github.com/xCloudNobin/laravel-taskboard); [brief](apps/laravel.md).
- [ ] **Bun (native)** — create [`xCloudNobin/deploy-test-bun`](https://github.com/xCloudNobin/deploy-test-bun); [brief](apps/bun.md).
- [ ] **Django** — create [`xCloudNobin/deploy-test-django`](https://github.com/xCloudNobin/deploy-test-django); [brief](apps/django.md).
- [ ] **Elysia** — create [`xCloudNobin/deploy-test-elysia`](https://github.com/xCloudNobin/deploy-test-elysia); [brief](apps/elysia.md).
- [ ] **Express** — upgrade [`xCloudNobin/deploy-test-express`](https://github.com/xCloudNobin/deploy-test-express); [brief](apps/express.md).
- [ ] **Flask** — upgrade [`xCloudNobin/deploy-test-flask`](https://github.com/xCloudNobin/deploy-test-flask); [brief](apps/flask.md).
- [ ] **Go** — upgrade [`xCloudNobin/deploy-test-go`](https://github.com/xCloudNobin/deploy-test-go); [brief](apps/go.md).
- [ ] **Hono** — create [`xCloudNobin/deploy-test-hono`](https://github.com/xCloudNobin/deploy-test-hono); [brief](apps/hono.md).
- [ ] **Java (plain)** — create [`xCloudNobin/deploy-test-java`](https://github.com/xCloudNobin/deploy-test-java); [brief](apps/java.md).
- [ ] **Spring Boot** — create [`xCloudNobin/deploy-test-spring-boot`](https://github.com/xCloudNobin/deploy-test-spring-boot); [brief](apps/spring-boot.md).
- [ ] **Node.js (plain)** — create [`xCloudNobin/deploy-test-nodejs`](https://github.com/xCloudNobin/deploy-test-nodejs); [brief](apps/nodejs.md).
- [ ] **NestJS** — create [`xCloudNobin/deploy-test-nestjs`](https://github.com/xCloudNobin/deploy-test-nestjs); [brief](apps/nestjs.md).
- [ ] **Nuxt** — create [`xCloudNobin/deploy-test-nuxt`](https://github.com/xCloudNobin/deploy-test-nuxt); [brief](apps/nuxt.md).
- [ ] **PHP (plain)** — create [`xCloudNobin/deploy-test-php`](https://github.com/xCloudNobin/deploy-test-php); [brief](apps/php.md).
- [ ] **FastAPI** — create [`xCloudNobin/deploy-test-fastapi`](https://github.com/xCloudNobin/deploy-test-fastapi); [brief](apps/fastapi.md).
- [ ] **Ruby / Rack** — create [`xCloudNobin/deploy-test-ruby-rack`](https://github.com/xCloudNobin/deploy-test-ruby-rack); [brief](apps/ruby-rack.md).
- [ ] **Rails** — create [`xCloudNobin/deploy-test-rails`](https://github.com/xCloudNobin/deploy-test-rails); [brief](apps/rails.md).
- [ ] **Python / WSGI (plain)** — create [`xCloudNobin/deploy-test-python-wsgi`](https://github.com/xCloudNobin/deploy-test-python-wsgi); [brief](apps/python-wsgi.md).
- [ ] **Astro** — upgrade [`xCloudNobin/deploy-test-astro`](https://github.com/xCloudNobin/deploy-test-astro); [brief](apps/astro.md).
- [ ] **React + Vite** — upgrade [`xCloudNobin/react-taskboard`](https://github.com/xCloudNobin/react-taskboard); [brief](apps/react-vite.md).
- [ ] **Next.js** — upgrade [`xCloudNobin/supabase-guestbook`](https://github.com/xCloudNobin/supabase-guestbook); [brief](apps/nextjs.md).
- [ ] **TanStack Start** — upgrade [`xCloudNobin/tanstack-taskboard`](https://github.com/xCloudNobin/tanstack-taskboard); [brief](apps/tanstack-start.md).
- [ ] **Dockerfile deployment** — upgrade [`xCloudNobin/deploy-test-dockerfile`](https://github.com/xCloudNobin/deploy-test-dockerfile); [brief](apps/dockerfile.md).
- [ ] **Docker Compose deployment** — upgrade [`xCloudNobin/deploy-test-docker-compose`](https://github.com/xCloudNobin/deploy-test-docker-compose); [brief](apps/docker-compose.md).

## Suggested execution order

1. Upgrade Express as the reference backend pattern; agree the common smoke-test contract without forcing shared code.
2. Upgrade existing Go/Flask/Laravel and the existing frontend/SSR fixtures; preserve the Next.js guestbook domain.
3. Create the missing frameworks in independent, bounded single-app jobs.
4. Complete Dockerfile and Compose deployment-method scenarios.
5. Review each PR and qualify each exact commit on xCloud before marking complete.

## Suite closeout

- [ ] Every canonical app is under xCloudNobin, licensed and safe to publish.
- [ ] Each app has a documented real workflow, production commands and automated checks.
- [ ] Each applicable app passes restart/redeployment persistence and dependency-failure checks.
- [ ] Collect redacted qualification evidence by commit; record failures and limitations honestly.
- [ ] Create/select one separate private auth fixture and run AUTH-TESTS.md.
- [ ] Reconcile catalog, README and this checklist after ownership/status changes.

## Implementation progress

- Resume checkpoint 2026-09-20: Rails, Next.js/Supabase guestbook, and renamed TanStack Start are implemented, locally verified, and merged. React is merged in the source repository with the authorized transfer still unverified. Live xCloud qualification remains pending for all entries.
- Rails: PR #1 merged as `f0be46be10181138a8b9bf0551843fdc7b3c8b2f`; coordinator reran `./scripts/verify.sh` with 34 tests, production Puma, DB job, login/session, CRUD, and restart persistence passing.
- Next.js: PR #1 merged as `f1d19817a85f82dcdf807bed065c1e0874378c19`; `scripts/verify.sh` passed real Supabase/Postgres/PostgREST CRUD, validation, SSR, readiness, schema/RLS, and restart persistence. Docker app-image build was separately blocked by BuildKit registry DNS; host standalone production verification passed.
- TanStack Start: source renamed to `xCloudNobin/tanstack-taskboard`; PR #1 merged as `3231757d1d2390bd0cb8633ed870a5dc295e9172`; `scripts/verify.sh` passed 27 checks including production SSR, health/readiness, CRUD/error cases, and SQLite restart persistence.
- React transfer attempt remains blocked: GitHub transfer API returned `Repository has already been taken` for the authorized destination name, while owner listing does not expose `xCloudNobin/react-taskboard`; no duplicate repository was created.

- Express, Flask and Go: PR #1 in each app repository merged on 2026-09-20 after owner authorization. Local tests and production smoke checks rerun by coordinator. Live xCloud qualification remains pending; completion checkboxes above stay open.
- Astro, Dockerfile and Docker Compose: draft PR #1 delivered in each repository; coordinator reran local checks successfully. Astro: typecheck/build, 10 unit tests and 47 browser/HTTP smoke checks. Dockerfile: 17 tests and 48 container checks. Compose: build, smoke, full-stack recreate persistence and database outage/recovery passed. Container builds required a build-only host-network workaround; Compose used the per-command default builder. These PRs are now merged; live xCloud qualification remains pending.
- Flask verification document has a stale test count (34 vs actual 35); correct in a follow-up.
