# Compose release mode: one web service plus PostgreSQL

Reuse `xCloudNobin/deploy-test-docker-compose`, using `compose.release.yaml` and `RELEASE-MODE.md`. This is an engine qualification shape of the existing canonical Compose app, not a new app implementation.

One `website` service builds from `./api` and publishes one loopback web port. The supporting `database` service uses PostgreSQL 17 with `database_data`, a named persistent volume. Reuse existing project/task CRUD, parameterized queries, schema initialization, seed rows, liveness and database-backed readiness.

Required qualification: create through xCloud; verify base refuses compose-file release mode; enable the temporary lab config; turn on; deploy two visibly different code revisions; rollback; turn off; deploy normally; delete. After every step verify the saved project/task IDs, one serving web container and nginx's intended upstream. Send at least five requests per second throughout switching, reporting all non-2xx responses and maximum latency. During overlap verify database DNS works from both containers and the candidate has no web-service alias on live networks. Also run the shipped Dockerfile fixture through deploy and rollback.

Do not mark deployment_verified until the exact engine commit and traffic/persistence evidence are recorded. Never commit test credentials or raw internal logs.

## Live xCloud qualification (2026-11-25)

- Candidate commit: `d3acd377ff1b143a95d7ed641fd2f76bd01cebce` (`main`, `compose.release.yaml`). The second code revision was a temporary branch `qa/daily-1125-compose-release` (`f065a40cc0b46c70c89cf52e81923518a93bd917`, only the `APP_RELEASE` fallback changed to `stage1-v2-daily1125`), deleted after the run.
- Category: **Deploy via Git > Docker Compose (repository compose file) with release mode**. xCloud `dev` at `c53ef2ac8858f7f72898b0f8dae78faac1b4a9a8` on the xcdev lab (Incus control plane), which includes the release preflight fix `886e5caecdf` ("resolve the deployed Compose project in release preflight"). `config/release-mode.php` `compose_file_sites` is true at this commit.
- Server: lab VM with a public IPv4, xCloud Nginx stack, Ubuntu 24.04. Docker was installed by xCloud on the first Compose deploy.
- Created over the Public API with a personal access token: `POST /api/v1/servers/{server}/sites/git/docker` with the repository URL, branch `main`, `docker.mode: compose`, `docker.compose_file: compose.release.yaml`, `port: 8189`, a live domain (`domain.mode: live`, `domain.ssl_provider: xcloud`) and `env_file_content` with a generated test-only `POSTGRES_PASSWORD` and `FRONTEND_PORT=8189`. Release mode through `POST /sites/{site}/release-mode/enable`, `rollback` and `disable`; deploys through `POST /sites/{site}/git/deploy`.
- This rerun checks the fix for X1 (batch F2, 2026-11-20): release mode was refused for every Git Compose site ("Release mode needs this site's own Compose project").

| Check | Result |
|---|---|
| Create over the Public API | 202 on the first call; first deploy finished in 78 s, `website` and `database` containers healthy |
| HTTPS on its own domain | Let's Encrypt certificate (issuer YE2, SAN = the site's domain); strict `curl` 200 `/api/health/ready` `{"status":"ok","db":"up"}` 160 s after the create. The lab can publish the A record only after the site exists, so the first certificate attempt ran before DNS resolved and one `POST /sites/{site}/ssl-certificates` was needed; a customer who adds the A record first (as the dry run's `domain_setup` says) does not need it |
| Data | Project id 2 "release persistence daily-1125" created through `POST /api/projects` after the first deploy; present after every step below |
| Release mode on | `last_operation.status: succeeded`, release `20261125034322` (converted), 0 non-200 |
| Release deploy (`POST /sites/{site}/git/deploy`) | New release `20261125034356` at the v2 commit, 42 s from the call to the finished task; `/api/meta` `release: stage1-v2-daily1125`; one serving web container; database DNS resolves from the release container; the `website` alias exists only on the release's own network, not on the live network; 0 non-200 |
| Rollback to `20261125034322` | Finished in 38 s; `/api/meta` back to `stage1-v1`; 0 non-200 |
| Release mode off, then a normal deploy | Off: 0 non-200, release images removed. Normal deploy (release mode off): 22 × 502 in 5 s, the restart gap release mode removes |
| Delete (`DELETE /sites/{site}` with `delete_files`, `delete_database`, `delete_user`) | Finished in 8 s; no container, volume, network, nginx site or site user left on the server |
| Traffic | About 5 requests per second to `/api/health/ready` from outside the lab, 1290 requests from before release mode on to after the normal deploy. Release-mode steps: 0 non-2xx, maximum latency 0.248 s |

Not covered in this run: the base-refusal check (`compose_file_sites` is already on at this `dev` commit, so there is no base to refuse) and the shipped Dockerfile fixture through deploy and rollback.

Evidence (redacted, text rendered by the lab):

- [Create, strict HTTPS, release mode on, release deploy, rollback, off, traffic](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-daily-1125/20261125/14b2425fee4c5abd0a8a5d4ee99582e6/compose-release-single-web-daily-1125.png)
