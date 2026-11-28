# Node ecosystem release engine fixtures

Targeted PM2 engine fixtures in this repository (not a replacement canonical CRUD app). No dependencies or credentials. Node 22, `npm ci`, `npm test`, `npm start`. PM2 uses the root `ecosystem.config.cjs`.

## Live xCloud qualification from the repository URL (2026-11-28)

Fixture commit `949a8c59de64b9a8f15843cd995e80d42df2461b` on `main`. xCloud `dev` at `837d4392db27e3982d1e7609a2dd81e67236387e`.

Sent `POST /api/v1/servers/{server}/sites/git/auto` with public DNS already pointing to the lab server. xCloud selected native Node.js and used the repository's own ecosystem config. This is the cluster request.

```json
{
  "repository": {
    "url": "https://github.com/xCloudNobin/app-compatibility",
    "branch": "main"
  },
  "domain": {
    "mode": "live",
    "name": "qurlu3-cluster.tmp1.dev",
    "ssl_provider": "xcloud"
  }
}
```

The fork request used `qurlu3-fork.tmp1.dev` and added only `"env_file_content": "ECO_KIND=fork"` to select the test fixture variant.

Both first deployments finished in xCloud. xCloud issued Let's Encrypt certificates, and `/health` and `/settings` returned the expected release and ecosystem settings. Each redeploy event finished with exit 0 and `/health` returned the expected HTTP 200 over strict HTTPS afterward.

| Variant | First strict HTTPS response | Redeploy | Failed HTTPS probes during redeploy | Evidence |
| --- | ---: | ---: | ---: | --- |
| cluster | 58 s | 19 s | 2/38 (HTTP 502) | [Redacted lab evidence](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-urlonly-u3-1128/20261128/1ca4a771d53319dd4cadd3a720e9d5ca/node-ecosystem-cluster-url-only-1128.png) |
| fork | 35 s | 18 s | 1/36 (HTTP 502) | [Redacted lab evidence](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-urlonly-u3-1128/20261128/633148763fde6cef8337c6ef8f5db9ad/node-ecosystem-fork-url-only-1128.png) |

PM2 showed two cluster workers online. The fork worker was online with `--max-old-space-size=96` and a 140 MiB restart limit.

- **Known limitation** · A normal redeploy briefly interrupts requests while PM2 stops the existing workers and starts the replacements. Probes ran every 0.5 s and caught 2 HTTP 502 responses for cluster and 1 for fork.

## Fixture settings and release-mode checks

Set `ECO_KIND=cluster` (default), `fork`, `fixed`, or `ignores` in the site .env. Optional `ECO_CWD` sets a hardcoded site directory to qualify release-path rebasing. Cluster starts two workers and exposes its ecosystem env value. Fork exposes that value and `--max-old-space-size=96`; inspect `max_memory_restart=140M` in pm2 jlist. The fixed case passes `--port 31234` and must be refused before release mode changes the live site. The ignores case deliberately binds 31235 and must fail the candidate health check. Bind is IPv4 loopback. `/settings` returns JSON, `/` shows the same settings; `/health` checks the process, with no external dependencies. There is no persistent data.

For cluster and fork: enable release mode, commit version.json as v2 and v3, deploy each, rollback to v2, disable release mode, deploy normally. Send at least five requests/second throughout, record every non-2xx and max latency per step, inspect all live PM2 settings and verify exactly one serving slot (two workers for cluster). Test ignored PORT without moving the live slot. Clean up every created site/server/environment.

Only bump `fixtures/node-ecosystem/version.json` for the visible revision; there is no build output to commit. These files deliberately model unsupported configurations for negative qualification and must be used only on disposable test sites. Deployment verification remains pending until the xCloud builder report records a tested head.

Root-reload variant: use the root `ecosystem.config.js` entrypoint and the saved script in `fixtures/node-ecosystem/deploy.sh`. Its exact PM2 reload is line 17, under `# Reload services`. Keep the root `docker-compose.yml`; choose a native Node site, so this inert compose file must have no effect. Use `ECO_KIND=fork`. The ecosystem has the fixed customer name `ecosystem-fixture`; it does not read `PM2_PROCESS_NAME`. Enable, deploy, rollback and disable under at least five requests/second, then run TWO normal deploys and verify each saved reload finds exactly one `ecosystem-fixture` process in place, with no second app or orphan listener. The lead merges this fixture PR; qualification may use its branch before merge.
