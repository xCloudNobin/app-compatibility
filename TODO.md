# TODO

## Foundation

- [x] Agree one meaningful public app per type; separate GitHub auth testing.
- [x] Document 24 canonical targets, source inventory, shared acceptance and agent briefs.
- [ ] Complete the three initiated transfers in MIGRATION.md; destination ownership/renaming awaits verification.
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

No app creation agents have been launched by this initial documentation setup.
