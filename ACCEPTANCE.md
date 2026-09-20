# Acceptance criteria

## Backend and full-stack baseline

- Usable UI with list/create/edit/delete, status and search/filter; projects/tasks by default, guestbook domain for existing Next.js app.
- Real database reads/writes; deterministic, idempotent schema initialization or migrations and repeatable seed data.
- Data survives application restart AND redeploy. Explicitly document persistent path/volume or external database; never store persistent data only in an ephemeral release directory.
- Validate invalid input, return meaningful errors and not-found responses. Use parameterized queries, escape output and protect cookie-authenticated mutations against CSRF.
- Production install/build/start commands, pinned supported runtime, lockfiles where supported, bind address and configurable port.
- Document required/optional environment variables using safe `.env.example` values; no committed credentials or secrets in client bundles.
- UI assets and nested routes work. Logs go to stdout/stderr without credentials.
- Separate liveness (process alive) and readiness (required dependencies available). Readiness must fail when the database is unavailable; a static success marker is insufficient.
- Show a non-sensitive release/build marker to distinguish deployed revisions.
- Automated smoke test exercises create/read/update/delete and invalid input. A separate persistence check leaves a record, restarts/redeploys, then verifies it survives before cleanup.
- Clean shutdown and documented production process/worker commands where relevant.

## Target-specific requirements

Read the app brief. Laravel/Django/Rails include login/session and one real background job. SSR targets include a server-rendered data view, server-side mutation and client interaction. Do not replace native target detection with Docker-only deployment unless Docker is the target.

Astro: built static multi-page content collection, local assets, client search, nested paths and correct output directory; no backend/database requirement.

React/Vite: interactive client task board with CRUD/filtering, deep links, localStorage persistence across reloads, clearly labeled browser-only storage; no fabricated server readiness claim.

Dockerfile: real app behavior plus multi-stage build, non-root runtime, health check and a persistent mount.

Compose: frontend/API/database, health-aware startup, private dependency network, persistent database volume, and only intentional host ports. Test dependency failure and recovery.

Next.js guestbook: actual Supabase CRUD, server-only privileged credentials, schema and appropriate database/API authorization. A reachable Supabase endpoint alone is not a pass.

## Definition of done

1. Source and license review passes; no unsafe history is published.
2. Clean-checkout production install/build/test succeeds with captured real results.
3. Production process is exercised, not merely the development server.
4. Smoke, error and applicable persistence checks pass.
5. A reviewer examines the change; agent self-report alone is not approval.
6. Deploy via the intended xCloud category and repeat applicable checks externally at the exact candidate commit. Until then mark `local-verified`, NOT `deployment-verified`.
7. Publish only redacted evidence: commit SHA, versions, commands, outcome, date, category and limitations. Keep sensitive environment details outside this public repo.

Suggested statuses: `not-started`, `in-progress`, `blocked`, `local-verified`, `deployment-verified`. Set catalog `deployment_verified` true only with linked real deployment evidence. Failed or unrun checks must remain explicit.
