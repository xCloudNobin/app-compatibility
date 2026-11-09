# Compose release mode: one web service plus PostgreSQL

Reuse `xCloudNobin/deploy-test-docker-compose`, using `compose.release.yaml` and `RELEASE-MODE.md`. This is an engine qualification shape of the existing canonical Compose app, not a new app implementation.

One `website` service builds from `./api` and publishes one loopback web port. The supporting `database` service uses PostgreSQL 17 with `database_data`, a named persistent volume. Reuse existing project/task CRUD, parameterized queries, schema initialization, seed rows, liveness and database-backed readiness.

Required qualification: create through xCloud; verify base refuses compose-file release mode; enable the temporary lab config; turn on; deploy two visibly different code revisions; rollback; turn off; deploy normally; delete. After every step verify the saved project/task IDs, one serving web container and nginx's intended upstream. Send at least five requests per second throughout switching, reporting all non-2xx responses and maximum latency. During overlap verify database DNS works from both containers and the candidate has no web-service alias on live networks. Also run the shipped Dockerfile fixture through deploy and rollback.

Do not mark deployment_verified until the exact engine commit and traffic/persistence evidence are recorded. Never commit test credentials or raw internal logs.
