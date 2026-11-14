# Healthchecks (Django + managed PostgreSQL)

- Action: **reuse existing source**; preserve the monitoring application and upstream license.
- Source and canonical repository: https://github.com/xCloudNobin/healthchecks
- Branch: `master` (an independent copy of `healthchecks/healthchecks`).
- Status: **in-progress; deployment qualification pending**.

## Implementation brief

A database-option regression fixture for Git Docker dockerfile deployment, not another canonical Django app. Follow [ACCEPTANCE.md](../ACCEPTANCE.md) and [AGENTS.md](../AGENTS.md); registration does not certify those acceptance checks.

The upstream-style source keeps its Dockerfile under `docker/Dockerfile`. For the original Dockerfile-mode baseline, use immutable commit `29e93d12a461f6c9f7ab138af12552777cf61914`: its root Dockerfile uses `healthchecks/healthchecks:v5.0.3` with two Gunicorn workers. This is the trial revision before the custom database-mapping entrypoint; `xcloud-v503` includes that workaround and must not be substituted for the baseline.

## Environment and runtime

Healthchecks selects PostgreSQL with `DB=postgres` and reads `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`. It does not consume `DATABASE_URL`. Provide secrets through the deployment environment only; never put credentials in this catalog or evidence.

The official image runs migrations then Gunicorn from `/opt/healthchecks`; inspect `docker/run.sh` and `docker/gunicorn.conf.py` at the selected revision. HTTP listens on port 8000. Database data belongs in managed PostgreSQL; SQLite fallback is not a successful PostgreSQL qualification. Native Python deployment is not supported on the current xCloud nginx stack; use Git Docker.

## Required qualification

1. Create a dockerfile-mode site with managed PostgreSQL and no customer environment. Record stored, server-file and container database key names, plus host/port only; redact every credential and full connection URL.
2. Check the actual selected database engine; a SQLite migration failure is a failed first boot, not a working PostgreSQL deployment.
3. Repeat creation with customer `DB_HOST=localhost`; confirm the supplied value wins.
4. Record exact xCloud and fixture commits, API transport, task results and cleanup. Compare any mapping workaround separately, preserving the baseline result.
5. Before deployment certification, run the applicable login/check creation, invalid input, monitoring/background-worker and restart/redeploy persistence acceptance checks. These are not certified by this registration.
