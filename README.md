# xCloud App Compatibility Suite

**Implementation status: 24/24 merged.** See [completion ledger](COMPLETION.md) for current repository links, merged PRs and limitations. React ownership transfer and live xCloud qualification remain pending.

One meaningful, open-source application per deployment target. The goal is to establish application compatibility, not merely prove that a homepage responds or GitHub authentication works.

This is the **parent documentation and coordination repository**, not a monorepo. Application code lives in separate repositories: 23 under `xCloudNobin`, with React still under `neobuilds` pending transfer. No submodules are required.

## Scope

- 24 canonical apps: 18 runtime/framework targets plus 6 additional framework/deployment targets.
- All 24 implementations are merged, with local verification recorded in the completion ledger.
- One app per type. No simple/complex or public/private duplicates.
- Dockerfile and Docker Compose are dedicated deployment-method fixtures, not extra framework variants.
- Public source with an explicit open-source license. The seven previously private canonical sources were made public after a Gitleaks full-history scan and a targeted content review on 2026-09-20. This is not a guarantee that automated scanning detects every issue. Child-app license work remains pending.
- Local verification is **not live xCloud certification**. Platform deployment qualification remains pending for every target.

## Start here

1. [Inventory](#inventory) and machine-readable [catalog](catalog.json).
2. [TODO and rollout order](TODO.md).
3. [Shared acceptance criteria](ACCEPTANCE.md).
4. [Agent instructions](AGENTS.md) and [copyable task prompt](AGENT-TASK.md).
5. [Migration and publication checklist](MIGRATION.md).
6. [Separate GitHub authentication tests](AUTH-TESTS.md).

## Inventory

All 24 apps have merged implementation PRs and recorded local verification. All sources are public. Live xCloud qualification is pending for every app; local checks and build limitations are detailed in the [completion ledger](COMPLETION.md).

| Target | Current repository | Implementation | Brief |
|---|---|---|---|
| Laravel | [xCloudNobin/laravel-taskboard](https://github.com/xCloudNobin/laravel-taskboard) | [Merged](https://github.com/xCloudNobin/laravel-taskboard/pull/1) | [Brief](apps/laravel.md) |
| Bun (native) | [xCloudNobin/deploy-test-bun](https://github.com/xCloudNobin/deploy-test-bun) | [Merged](https://github.com/xCloudNobin/deploy-test-bun/pull/1) | [Brief](apps/bun.md) |
| Django | [xCloudNobin/deploy-test-django](https://github.com/xCloudNobin/deploy-test-django) | [Merged](https://github.com/xCloudNobin/deploy-test-django/pull/1) | [Brief](apps/django.md) |
| Elysia | [xCloudNobin/deploy-test-elysia](https://github.com/xCloudNobin/deploy-test-elysia) | [Merged](https://github.com/xCloudNobin/deploy-test-elysia/pull/1) | [Brief](apps/elysia.md) |
| Express | [xCloudNobin/deploy-test-express](https://github.com/xCloudNobin/deploy-test-express) | [Merged](https://github.com/xCloudNobin/deploy-test-express/pull/1) | [Brief](apps/express.md) |
| Flask | [xCloudNobin/deploy-test-flask](https://github.com/xCloudNobin/deploy-test-flask) | [Merged](https://github.com/xCloudNobin/deploy-test-flask/pull/1) | [Brief](apps/flask.md) |
| Go | [xCloudNobin/deploy-test-go](https://github.com/xCloudNobin/deploy-test-go) | [Merged](https://github.com/xCloudNobin/deploy-test-go/pull/1) | [Brief](apps/go.md) |
| Hono | [xCloudNobin/deploy-test-hono](https://github.com/xCloudNobin/deploy-test-hono) | [Merged](https://github.com/xCloudNobin/deploy-test-hono/pull/1) | [Brief](apps/hono.md) |
| Java (plain) | [xCloudNobin/deploy-test-java](https://github.com/xCloudNobin/deploy-test-java) | [Merged](https://github.com/xCloudNobin/deploy-test-java/pull/1) | [Brief](apps/java.md) |
| Spring Boot | [xCloudNobin/deploy-test-spring-boot](https://github.com/xCloudNobin/deploy-test-spring-boot) | [Merged](https://github.com/xCloudNobin/deploy-test-spring-boot/pull/1) | [Brief](apps/spring-boot.md) |
| Node.js (plain) | [xCloudNobin/deploy-test-nodejs](https://github.com/xCloudNobin/deploy-test-nodejs) | [Merged](https://github.com/xCloudNobin/deploy-test-nodejs/pull/1) | [Brief](apps/nodejs.md) |
| NestJS | [xCloudNobin/deploy-test-nestjs](https://github.com/xCloudNobin/deploy-test-nestjs) | [Merged](https://github.com/xCloudNobin/deploy-test-nestjs/pull/1) | [Brief](apps/nestjs.md) |
| Nuxt | [xCloudNobin/deploy-test-nuxt](https://github.com/xCloudNobin/deploy-test-nuxt) | [Merged](https://github.com/xCloudNobin/deploy-test-nuxt/pull/1) | [Brief](apps/nuxt.md) |
| PHP (plain) | [xCloudNobin/deploy-test-php](https://github.com/xCloudNobin/deploy-test-php) | [Merged](https://github.com/xCloudNobin/deploy-test-php/pull/1) | [Brief](apps/php.md) |
| FastAPI | [xCloudNobin/deploy-test-fastapi](https://github.com/xCloudNobin/deploy-test-fastapi) | [Merged](https://github.com/xCloudNobin/deploy-test-fastapi/pull/1) | [Brief](apps/fastapi.md) |
| Ruby / Rack | [xCloudNobin/deploy-test-ruby-rack](https://github.com/xCloudNobin/deploy-test-ruby-rack) | [Merged](https://github.com/xCloudNobin/deploy-test-ruby-rack/pull/1) | [Brief](apps/ruby-rack.md) |
| Rails | [xCloudNobin/deploy-test-rails](https://github.com/xCloudNobin/deploy-test-rails) | [Merged](https://github.com/xCloudNobin/deploy-test-rails/pull/1) | [Brief](apps/rails.md) |
| Python / WSGI (plain) | [xCloudNobin/deploy-test-python-wsgi](https://github.com/xCloudNobin/deploy-test-python-wsgi) | [Merged](https://github.com/xCloudNobin/deploy-test-python-wsgi/pull/1) | [Brief](apps/python-wsgi.md) |
| Astro | [xCloudNobin/deploy-test-astro](https://github.com/xCloudNobin/deploy-test-astro) | [Merged](https://github.com/xCloudNobin/deploy-test-astro/pull/1) | [Brief](apps/astro.md) |
| React + Vite | [neobuilds/mcpqa-react-vite](https://github.com/neobuilds/mcpqa-react-vite) | [Merged](https://github.com/neobuilds/mcpqa-react-vite/pull/1) | [Brief](apps/react-vite.md) |
| Next.js | [xCloudNobin/supabase-guestbook](https://github.com/xCloudNobin/supabase-guestbook) | [Merged](https://github.com/xCloudNobin/supabase-guestbook/pull/1) | [Brief](apps/nextjs.md) |
| TanStack Start | [xCloudNobin/tanstack-taskboard](https://github.com/xCloudNobin/tanstack-taskboard) | [Merged](https://github.com/xCloudNobin/tanstack-taskboard/pull/1) | [Brief](apps/tanstack-start.md) |
| Dockerfile deployment | [xCloudNobin/deploy-test-dockerfile](https://github.com/xCloudNobin/deploy-test-dockerfile) | [Merged](https://github.com/xCloudNobin/deploy-test-dockerfile/pull/1) | [Brief](apps/dockerfile.md) |
| Docker Compose deployment | [xCloudNobin/deploy-test-docker-compose](https://github.com/xCloudNobin/deploy-test-docker-compose) | [Merged](https://github.com/xCloudNobin/deploy-test-docker-compose/pull/1) | [Brief](apps/docker-compose.md) |

## Outstanding work

- **React ownership:** implementation remains in `neobuilds/mcpqa-react-vite`; transfer to `xCloudNobin/react-taskboard` is unresolved.
- **Live xCloud qualification:** not run for any app.
- **Next.js Docker image:** build blocked by build-network DNS; standalone production verification passed against a real isolated Supabase data layer.
- **Container build limitations:** Dockerfile/Compose verification used documented build-only network workarounds.
- **GitHub authentication:** separate from this public app compatibility suite; see [auth tests](AUTH-TESTS.md).

## Design

Use a small project/task board for backend fixtures: projects, task CRUD, status and search/filter. Use idiomatic framework patterns rather than sharing an artificial framework wrapper. Backend fixtures need real server-side persistence; SQLite is a reasonable low-dependency default with an explicit persistent path. PostgreSQL may be used where the target scenario requires it. Never hide a missing backend behind localStorage.

Preserve the Next.js Supabase guestbook instead of rewriting it solely for naming consistency. Static Astro and React/Vite apps have explicitly different acceptance criteria. Avoid Redis, queues and extra containers unless the fixture has a reason to test them.

## Historical fixtures

Duplicate Express/Astro/Next/Go QA repos are historical sources, not extra canonical apps. PostgreSQL and Supabase connectivity-only fixtures may inform integration tests but are not meaningful standalone app coverage. Evidence archives and shell-only hello-world repos are excluded. Do not delete or archive historical repositories as part of implementation.

## Evidence and security

Record tested commit, runtime versions, commands, outcomes, and limitations. Separate local build/test success from live platform qualification. Never publish tokens, private keys, customer information, internal endpoints, raw private QA logs, or private deployment configuration. Public examples must be safe and use placeholders. Demo apps are not production security templates; publicly writable demos need bounded data/reset behavior and must never hold sensitive data.

The parent documentation is MIT licensed. Each child app must include its own compatible license and retain required upstream notices.
