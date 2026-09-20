# xCloud App Compatibility Suite

One meaningful, open-source application per deployment target. The goal is to establish application compatibility, not merely prove that a homepage responds or GitHub authentication works.

This is the **parent documentation and coordination repository**, not a monorepo. Application code lives in separate repositories under `xCloudNobin`. No submodules are required.

## Scope

- 24 canonical apps: 18 runtime/framework targets plus 6 additional framework/deployment targets.
- 10 existing starting points to upgrade; 14 new apps to create.
- One app per type. No simple/complex or public/private duplicates.
- Dockerfile and Docker Compose are dedicated deployment-method fixtures, not extra framework variants.
- Public source with an explicit open-source license. The seven previously private canonical sources were made public after a Gitleaks full-history scan and a targeted content review on 2026-09-20. This is not a guarantee that automated scanning detects every issue. Child-app license work remains pending.
- Existing repositories are starting points, **not freshly certified deployments**. A source inventory is not a test result.

## Start here

1. [Inventory](#inventory) and machine-readable [catalog](catalog.json).
2. [TODO and rollout order](TODO.md).
3. [Shared acceptance criteria](ACCEPTANCE.md).
4. [Agent instructions](AGENTS.md) and [copyable task prompt](AGENT-TASK.md).
5. [Migration and publication checklist](MIGRATION.md).
6. [Separate GitHub authentication tests](AUTH-TESTS.md).

## Inventory

Source ownership and visibility checked on 2026-09-20. Target repository names are planned destinations, not claims that transfers or creation have happened. Status in `catalog.json` starts at `not-started` for every app.

| Target | Current source | Visibility | Work / brief |
|---|---|---|---|
| Laravel | [neobuilds/mcp-qa-laravel](https://github.com/neobuilds/mcp-qa-laravel) | public | [upgrade](apps/laravel.md) |
| Bun (native) | Not created | Planned public | [create](apps/bun.md) |
| Django | Not created | Planned public | [create](apps/django.md) |
| Elysia | Not created | Planned public | [create](apps/elysia.md) |
| Express | [xCloudNobin/deploy-test-express](https://github.com/xCloudNobin/deploy-test-express) | public | [upgrade](apps/express.md) |
| Flask | [xCloudNobin/deploy-test-flask](https://github.com/xCloudNobin/deploy-test-flask) | public | [upgrade](apps/flask.md) |
| Go | [xCloudNobin/deploy-test-go](https://github.com/xCloudNobin/deploy-test-go) | public | [upgrade](apps/go.md) |
| Hono | Not created | Planned public | [create](apps/hono.md) |
| Java (plain) | Not created | Planned public | [create](apps/java.md) |
| Spring Boot | Not created | Planned public | [create](apps/spring-boot.md) |
| Node.js (plain) | Not created | Planned public | [create](apps/nodejs.md) |
| NestJS | Not created | Planned public | [create](apps/nestjs.md) |
| Nuxt | Not created | Planned public | [create](apps/nuxt.md) |
| PHP (plain) | Not created | Planned public | [create](apps/php.md) |
| FastAPI | Not created | Planned public | [create](apps/fastapi.md) |
| Ruby / Rack | Not created | Planned public | [create](apps/ruby-rack.md) |
| Rails | Not created | Planned public | [create](apps/rails.md) |
| Python / WSGI (plain) | Not created | Planned public | [create](apps/python-wsgi.md) |
| Astro | [xCloudNobin/deploy-test-astro](https://github.com/xCloudNobin/deploy-test-astro) | public | [upgrade](apps/astro.md) |
| React + Vite | [neobuilds/mcpqa-react-vite](https://github.com/neobuilds/mcpqa-react-vite) | public | [upgrade](apps/react-vite.md) |
| Next.js | [xCloudNobin/supabase-guestbook](https://github.com/xCloudNobin/supabase-guestbook) | public | [upgrade](apps/nextjs.md) |
| TanStack Start | [neobuilds/mcpqa-tanstack-start](https://github.com/neobuilds/mcpqa-tanstack-start) | public | [upgrade](apps/tanstack-start.md) |
| Dockerfile deployment | [xCloudNobin/deploy-test-dockerfile](https://github.com/xCloudNobin/deploy-test-dockerfile) | public | [upgrade](apps/dockerfile.md) |
| Docker Compose deployment | [xCloudNobin/deploy-test-docker-compose](https://github.com/xCloudNobin/deploy-test-docker-compose) | public | [upgrade](apps/docker-compose.md) |

## Design

Use a small project/task board for backend fixtures: projects, task CRUD, status and search/filter. Use idiomatic framework patterns rather than sharing an artificial framework wrapper. Backend fixtures need real server-side persistence; SQLite is a reasonable low-dependency default with an explicit persistent path. PostgreSQL may be used where the target scenario requires it. Never hide a missing backend behind localStorage.

Preserve the Next.js Supabase guestbook instead of rewriting it solely for naming consistency. Static Astro and React/Vite apps have explicitly different acceptance criteria. Avoid Redis, queues and extra containers unless the fixture has a reason to test them.

## Historical fixtures

Duplicate Express/Astro/Next/Go QA repos are historical sources, not extra canonical apps. PostgreSQL and Supabase connectivity-only fixtures may inform integration tests but are not meaningful standalone app coverage. Evidence archives and shell-only hello-world repos are excluded. Do not delete or archive historical repositories as part of implementation.

## Evidence and security

Record tested commit, runtime versions, commands, outcomes, and limitations. Separate local build/test success from live platform qualification. Never publish tokens, private keys, customer information, internal endpoints, raw private QA logs, or private deployment configuration. Public examples must be safe and use placeholders. Demo apps are not production security templates; publicly writable demos need bounded data/reset behavior and must never hold sensitive data.

The parent documentation is MIT licensed. Each child app must include its own compatible license and retain required upstream notices.
