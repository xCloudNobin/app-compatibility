# Test repository registry

Every repository used to test xCloud deployments, under any owner. If a repo is used for a test, it is listed here. The canonical apps also have rows in [catalog.json](catalog.json) and the README inventory. This file lists all of them, plus the QA, feature and temporary fixtures.

Rule: **register a test repo the day you create it**, in the same change that first uses it. Then run `scripts/check-fixtures.sh`. It fails when a test repo under a scanned owner is missing from this file, or when a listed repo no longer exists. Repositories that are not test repos go in [fixtures-ignore.txt](fixtures-ignore.txt).

Scanned owners: `xCloudNobin` and `neobuilds` (all repos), `NasirNobin` (names with test, qa, fixture, hello, demo, sample or mcp).

Columns: **Status** is `canonical` (one of the 24 suite apps), `option` (database-option companion), `feature` (fixture for one xCloud feature or PR), `qa` (MCP or QA batch fixture), `copy` (same code as a canonical repo), `temporary` (delete after its QA), `evidence` (QA evidence archive, not an app).

## Canonical apps (24)

| Repo | Visibility | Target | Status |
|---|---|---|---|
| `xCloudNobin/laravel-taskboard` | public | Laravel | canonical |
| `xCloudNobin/deploy-test-bun` | public | Bun | canonical |
| `xCloudNobin/deploy-test-django` | public | Django (also #9209 Python recipes) | canonical |
| `xCloudNobin/deploy-test-elysia` | public | Elysia | canonical |
| `xCloudNobin/deploy-test-express` | public | Express | canonical |
| `xCloudNobin/deploy-test-flask` | public | Flask (also #9209 Python recipes) | canonical |
| `xCloudNobin/deploy-test-go` | public | Go | canonical |
| `xCloudNobin/deploy-test-hono` | public | Hono | canonical |
| `xCloudNobin/deploy-test-java` | public | Java | canonical |
| `xCloudNobin/deploy-test-spring-boot` | public | Spring Boot | canonical |
| `xCloudNobin/deploy-test-nodejs` | public | Node.js | canonical |
| `xCloudNobin/deploy-test-nestjs` | public | NestJS | canonical |
| `xCloudNobin/deploy-test-nuxt` | public | Nuxt | canonical |
| `xCloudNobin/deploy-test-php` | public | PHP | canonical |
| `xCloudNobin/deploy-test-fastapi` | public | FastAPI (also #9209 Python recipes) | canonical |
| `xCloudNobin/deploy-test-ruby-rack` | public | Ruby / Rack | canonical |
| `xCloudNobin/deploy-test-rails` | public | Rails | canonical |
| `xCloudNobin/deploy-test-python-wsgi` | public | Python WSGI (also #9209 Python recipes) | canonical |
| `xCloudNobin/deploy-test-astro` | public | Astro | canonical |
| `neobuilds/mcpqa-react-vite` | public | React + Vite (transfer to `xCloudNobin/react-taskboard` pending) | canonical |
| `xCloudNobin/supabase-guestbook` | public | Next.js | canonical |
| `xCloudNobin/tanstack-taskboard` | public | TanStack Start | canonical |
| `xCloudNobin/deploy-test-dockerfile` | public | Dockerfile deployment | canonical |
| `xCloudNobin/deploy-test-docker-compose` | public | Docker Compose deployment | canonical |

## Database-option fixtures

| Repo | Visibility | Used for | Status |
|---|---|---|---|
| `neobuilds/deploy-test-express-postgres` | public | Node site with the PostgreSQL option | option |

`deploy-test-prisma-postgres` (brief in [apps/prisma-postgres.md](apps/prisma-postgres.md)) is not created yet. Add it here when it is.

## Feature and PR fixtures

| Repo | Visibility | Used for | Created | Status |
|---|---|---|---|---|
| `neobuilds/zdd-laravel-fixture` | private | xCloud #9271 zero-downtime deploys with a private deploy key | 2026-10-31 | feature |
| `neobuilds/qa-db-laravel-rw` | public | Laravel database read/write QA | 2026-10-25 | feature |
| `neobuilds/qa-pg-laravel-rw` | public | Laravel + PostgreSQL read/write QA | 2026-10-25 | feature |
| `neobuilds/qa-pg-node-rw` | public | Node + PostgreSQL read/write QA | 2026-10-25 | feature |
| `neobuilds/qa-pg-php-rw` | public | PHP + PostgreSQL read/write QA | 2026-10-25 | feature |

## MCP and QA batch fixtures

| Repo | Visibility | Used for | Created | Status |
|---|---|---|---|---|
| `neobuilds/mcp-qa-b-express` | public | MCP deploy QA batch B | 2026-09-13 | qa |
| `neobuilds/mcp-qa-b-express-private` | private | MCP deploy QA batch B, private repo | 2026-09-13 | qa |
| `neobuilds/mcp-qa-b-astro` | public | MCP deploy QA batch B | 2026-09-13 | qa |
| `neobuilds/mcp-qa-b-nextjs` | public | MCP deploy QA batch B | 2026-09-13 | qa |
| `neobuilds/mcp-qa-express` | public | MCP deploy QA | 2026-09-14 | qa |
| `neobuilds/mcp-qa-express-final` | public | MCP deploy QA | 2026-09-14 | qa |
| `neobuilds/mcp-qa-private-express` | private | MCP deploy QA, private repo | 2026-09-14 | qa |
| `neobuilds/mcp-qa-private-express-final` | private | MCP deploy QA, private repo | 2026-09-14 | qa |
| `neobuilds/mcp-qa-next` | public | MCP deploy QA | 2026-09-14 | qa |
| `neobuilds/mcp-qa-astro` | public | MCP deploy QA | 2026-09-14 | qa |
| `neobuilds/mcp-qa-vite-docker` | public | MCP Dockerfile deploy QA | 2026-09-14 | qa |
| `neobuilds/mcp-qa-compose-go-8085` | public | MCP compose deploy QA (Go, port 8085) | 2026-09-14 | qa |
| `neobuilds/mcp-qa-compose-flask-8086` | public | MCP compose deploy QA (Flask with its own Dockerfile, port 8086) | 2026-09-14 | qa |
| `neobuilds/mcpqa-go-compose` | private | MCP compose deploy QA | 2026-09-15 | qa |
| `neobuilds/mcpqa-postgres-app` | public | App that needs a PostgreSQL one-click | 2026-09-15 | qa |
| `neobuilds/mcpqa-supabase-app` | public | App that needs a Supabase one-click | 2026-09-15 | qa |
| `NasirNobin/xcloud-mcp-go-hello` | public | MCP deploy test, Go | 2026-09-16 | qa |
| `NasirNobin/xcloud-mcp-rust-hello` | public | MCP deploy test, Rust (Axum) | 2026-09-16 | qa |

## Copies of canonical repos

Forks in `neobuilds` with the same latest commit as the canonical repo (checked 2026-10-31). Use the canonical repo for new tests.

| Repo | Visibility | Same as | Status |
|---|---|---|---|
| `neobuilds/deploy-test-nodejs` | public | `xCloudNobin/deploy-test-nodejs` | copy |
| `neobuilds/deploy-test-php` | public | `xCloudNobin/deploy-test-php` | copy |
| `neobuilds/deploy-test-ruby-rack` | public | `xCloudNobin/deploy-test-ruby-rack` | copy |
| `neobuilds/laravel-taskboard` | public | `xCloudNobin/laravel-taskboard` | copy |

## Temporary and other

| Repo | Visibility | Used for | Created | Status |
|---|---|---|---|---|
| `NasirNobin/qa-5623-edge-port` | public | Port validation QA for xCloud #5623 (marked "delete after QA") | 2026-09-21 | temporary |
| `xCloudNobin/helloworld` | public | Hello-world placeholder | 2026-04-29 | temporary |
| `xCloudNobin/mcpqa-20260915-1252-evidence` | private | Evidence from the 2026-09-15 MCP QA run | 2026-09-15 | evidence |

Do not delete or archive any repo listed here without the owner's approval. Mark it `temporary` first, then remove its row in the same change that deletes it.
