# Laravel with a bun.lock frontend and a Dockerfile (detection fixture)

- Action: **fixture** (third-party repository, used as-is)
- Current source: https://github.com/victor-falcon/plain-week
- Pinned commit: `8fcc287d14e09e34bda14b2320435c74c5a0b1fc`
- Current source visibility: public (MIT)
- Status: **live-verified on `main` in xcdev; needs xCloudDev/xCloud#12147 merged**

## What it is

A Laravel 13 app (PHP ^8.3, `artisan`, `composer.lock`) with an Inertia/React frontend built by Bun (`bun.lock`, `build: "vp build"`). The root has a FrankenPHP `Dockerfile` that runs `bun install --frozen-lockfile`. There is no compose file at the root (only `deploy/docker-compose.yml`, used for its own Coolify setup). `.env.example` uses `DB_CONNECTION=sqlite`.

## Why it is registered

Guards against a regression in xCloudDev/xCloud#10226 (issue #8803): a Laravel app whose frontend uses Bun and which has a development Dockerfile must stay a native Laravel site, not move to the container flow.

## Acceptance checks

- [ ] Detection (Public API and MCP): site type `laravel`, `recommended_flow: native`.
- [ ] `/git/auto` deploy at the pinned commit creates a native (not DOCKER_COMPOSE) Laravel site that is live.
- [ ] The frontend build runs during deploy (Bun install + build in the deploy log).
- [x] Database: SQLite gives the expected "create database/database.sqlite" warning; or choose MySQL at create.

Use the pinned commit for pinned detection checks. Never commit credentials or raw internal logs.

## Live xCloud qualification (2026-11-28)

- Source: `victor-falcon/plain-week` branch `main` at `fdc38bed0cca01fd392d8cf47bf7d6608f06bab7`. The Public API takes a branch for this flow, so the live run used `main`. The catalogue pin still applies to the pinned detection checks above.
- xCloud head: `ee6ba504901a1bf4b36b2863df79ad8870fe36cf` on an xcdev Incus control plane and Nginx VM. This flow needs xCloudDev/xCloud#12147 merged.

| Check | Result |
| --- | --- |
| Native Git create | `POST /api/v1/servers/{server}/sites/git/auto` accepted the public repository URL, branch and live domain. xCloud created a native Laravel site. |
| Build and PHP | npm installed the frontend dependencies and ran `vp build`. Wayfinder ran `php artisan wayfinder:generate` with site PHP 8.4.28. The VM's default CLI PHP was 8.3.37. |
| Public HTTPS | The planner returned a strict HTTPS 200 in 151.9 seconds from the create request. xCloud obtained the Let's Encrypt certificate during provisioning. |
| Redeploy | `POST /api/v1/sites/{site}/git/deploy` completed in 17 seconds. The planner still returned a strict HTTPS 200. |
| SQLite | The create response returned the database-file advisory. The first deploy completed with SQLite. |
