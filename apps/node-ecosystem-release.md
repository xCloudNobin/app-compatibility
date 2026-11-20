# Node ecosystem release engine fixtures

Targeted PM2 engine fixtures in this repository (not a replacement canonical CRUD app). No dependencies or credentials. Node 22, `npm ci`, `npm test`, `npm start`. PM2 uses the root `ecosystem.config.cjs`.

Set `ECO_KIND=cluster` (default), `fork`, `fixed`, or `ignores` in the site .env. Optional `ECO_CWD` sets a hardcoded site directory to qualify release-path rebasing. Cluster starts two workers and exposes its ecosystem env value. Fork exposes that value and `--max-old-space-size=96`; inspect `max_memory_restart=140M` in pm2 jlist. The fixed case passes `--port 31234` and must be refused before release mode changes the live site. The ignores case deliberately binds 31235 and must fail the candidate health check. Bind is IPv4 loopback. `/settings` returns JSON, `/` shows the same settings; `/health` checks the process, with no external dependencies. There is no persistent data.

For cluster and fork: enable release mode, commit version.json as v2 and v3, deploy each, rollback to v2, disable release mode, deploy normally. Send at least five requests/second throughout, record every non-2xx and max latency per step, inspect all live PM2 settings and verify exactly one serving slot (two workers for cluster). Test ignored PORT without moving the live slot. Clean up every created site/server/environment.

Only bump `fixtures/node-ecosystem/version.json` for the visible revision; there is no build output to commit. These files deliberately model unsupported configurations for negative qualification and must be used only on disposable test sites. Deployment verification remains pending until the xCloud builder report records a tested head.

Root-reload variant: use the root `ecosystem.config.js` entrypoint and the saved script in `fixtures/node-ecosystem/deploy.sh`. Its exact PM2 reload is line 17, under `# Reload services`. Keep the root `docker-compose.yml`; choose a native Node site, so this inert compose file must have no effect. Use `ECO_KIND=fork`. The ecosystem has the fixed customer name `ecosystem-fixture`; it does not read `PM2_PROCESS_NAME`. Enable, deploy, rollback and disable under at least five requests/second, then run TWO normal deploys and verify each saved reload finds exactly one `ecosystem-fixture` process in place, with no second app or orphan listener. The lead merges this fixture PR; qualification may use its branch before merge.

## Live xCloud qualification (2026-11-20)

- Candidate commit: `949a8c59de64b9a8f15843cd995e80d42df2461b` (`main`). The two visible revisions were QA-only commits on a temporary branch that only bumped `fixtures/node-ecosystem/version.json` to `qa-f2-v2` and `qa-f2-v3` (branch deleted after the run).
- Category: **Deploy via Git > Node.js (SSR, PM2, the repository's own ecosystem file), release mode**. xCloud `dev` at `324be14f2ebeaf4fe64ba3f2e1c14368feb9db3c` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, Node 22, public IPv4.
- Created over the Public API with a personal access token, every field explicit (no repository detection): `POST /api/v1/servers/{server}/sites/git/auto` with `site_type: nodejs`, `deploy_mode: native`, `serving_mode: ssr`, `package_manager: npm`, `build_command: npm test`, `start_command: npm start`, `port`, `web_root: public`, a one-line deploy script and `env_file_content: ECO_KIND=<kind>`. xCloud used the root `ecosystem.config.js` ("Using existing ecosystem config").
- Go-live: deploy on the staging name, point the domain's A record at the server, then `PUT /api/v1/sites/{site}/domain {ssl_provider: xcloud}`. Let's Encrypt (SAN = the domain), strict `curl` 200, HTTP 301 → HTTPS.
- Release mode through the Public API (`/sites/{site}/release-mode/enable|rollback|disable`, `/git/deploy`), with about 8 requests/second on `/health` over HTTPS for the whole run.

| Kind | Create → live (LE HTTPS) | Release-mode run | Traffic |
|---|---|---|---|
| cluster | 276 s | enable → deploy v2 → deploy v3 → rollback to v2 → disable → normal deploy (v3). Each step showed the expected release on `/settings`; PM2 had 2 cluster workers and exactly one serving slot | 3929 requests: 0 × 502 in every release-mode step, max latency 0.051 s. 5 × 502 within 1 s in the final normal deploy (release mode off, expected restart). 1 connection error (curl 000) at another site's nginx reload |
| fork | 272 s | same, plus a second rollback (to v3) run alone: 616 requests, 0 errors. `node_args --max-old-space-size=96` and `max_memory_restart 140M` kept in every release | 3929 requests: 0 × 502 in release-mode steps, max 0.046 s; same 5 × 502 in the final normal deploy; 1 curl 000 at an nginx reload during two concurrent rollbacks |
| fixed | 343 s (with site port 31234) | With the default site port the first deploy failed with a clear log line ("nothing is listening on port 3103 … set this site's Port to the port the app actually binds"); with port 31234 it went live. Turning release mode on was refused: "ecosystem.config.js: args contains a port flag. Remove it and make the app read process.env.PORT, then retry." Nothing was converted and the live site kept serving | 295 requests during the refusal, 0 errors |

Not run here: the `ignores` kind, `ECO_CWD`, and the root-reload variant (`fixtures/node-ecosystem/deploy.sh`).

Evidence (text rendered by the lab, redacted):

- [cluster](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-f2-1120/20261120/ba5ead02537401a59bdf9704cb7d30e9/node-ecosystem-cluster-live.png)
- [fork](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-f2-1120/20261120/eeded88a9383e443472e98b671ba9001/node-ecosystem-fork-live.png)
- [fixed](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-f2-1120/20261120/2fffe96e336a7c832720f3b2df34ebfa/node-ecosystem-fixed-live.png)
