# Laravel with a bun.lock frontend and a Dockerfile (detection fixture)

- Action: **fixture** (third-party repository, used as-is)
- Current source: https://github.com/victor-falcon/plain-week
- Pinned commit: `8fcc287d14e09e34bda14b2320435c74c5a0b1fc`
- Current source visibility: public (MIT)
- Status: **registered for QA; live xCloud not verified**

## What it is

A Laravel 13 app (PHP ^8.3, `artisan`, `composer.lock`) with an Inertia/React frontend built by Bun (`bun.lock`, `build: "vp build"`). The root has a FrankenPHP `Dockerfile` that runs `bun install --frozen-lockfile`. There is no compose file at the root (only `deploy/docker-compose.yml`, used for its own Coolify setup). `.env.example` uses `DB_CONNECTION=sqlite`.

## Why it is registered

Guards against a regression in xCloudDev/xCloud#10226 (issue #8803): a Laravel app whose frontend uses Bun and which has a development Dockerfile must stay a native Laravel site, not move to the container flow.

## Acceptance checks

- [ ] Detection (Public API and MCP): site type `laravel`, `recommended_flow: native`.
- [ ] `/git/auto` deploy at the pinned commit creates a native (not DOCKER_COMPOSE) Laravel site that is live.
- [ ] The frontend build runs during deploy (Bun install + build in the deploy log).
- [ ] Database: SQLite gives the expected "create database/database.sqlite" warning; or choose MySQL at create.

Deploy only the pinned commit. Never commit credentials or raw internal logs.
