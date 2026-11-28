# Docker Compose deployment

- Action: **upgrade**
- Current source: https://github.com/xCloudNobin/deploy-test-docker-compose
- Planned canonical repository: `xCloudNobin/deploy-test-docker-compose`
- Current source visibility: public
- Status: **implementation merged; local verification recorded; live xCloud not verified**

## Live xCloud qualification from the repository URL (2026-11-27)

Fixture branch `main`. xCloud `dev` at `837d4392db27e3982d1e7609a2dd81e67236387e`.

Sent `POST /api/v1/servers/{server}/sites/git/auto` with a public DNS record already pointing to the lab server. xCloud detected the repository's `compose.yaml` and inferred host port `8188`. The request used this JSON payload with the generated test value redacted.

```json
{
  "repository": {
    "url": "https://github.com/xCloudNobin/deploy-test-docker-compose",
    "branch": "main"
  },
  "domain": {
    "mode": "live",
    "name": "qurlu1-docker-compose.tmp1.dev",
    "ssl_provider": "xcloud"
  },
  "env_file_content": "POSTGRES_PASSWORD=<generated test value>"
}
```

- **Time to live** · 68 seconds from the create request to the first matching readiness response over strict HTTPS. xCloud issued the certificate.
- **Redeploy** · 19 seconds from the redeploy request to completion. Readiness returned HTTP 200 over strict HTTPS after completion, and project #2 survived the redeploy.
- **Known limitation** · During a redeploy the site is briefly unavailable (one HTTPS 502 seen in a 19 s redeploy) because the default Compose deploy script stops the running services before starting the new ones. The site is live again when the redeploy finishes; data is kept.

[Redacted lab evidence](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-urlonly-u1-1127/20261127/0531f74e627b93fa8ee52cb5febc261e/docker-compose-url-only-1127.png)

## Implementation brief

Frontend + API + database, private networking, health checks and named volume; expose only intended public services.

Implement the shared meaningful-app baseline: UI, validated CRUD, persistent storage, schema setup, production configuration, health/readiness and automated smoke/persistence checks. Use a project/task board unless the specific requirement preserves another domain.

## Required deliverables

- [ ] Verify source owner; resolve any pending transfer before creating a destination.
- [ ] Inspect/reuse the existing source if provided; implement the brief, not a success-page shell.
- [ ] Include license/attribution, README, safe environment example and reproducible dependencies.
- [ ] Document install/build/production start, runtime version, port/bind address, health, schema and persistence.
- [ ] Automated positive/negative smoke tests; applicable restart/redeploy persistence test.
- [ ] Real local production verification and reviewable PR with exact commit and evidence.
- [ ] Separate live xCloud qualification using the intended category before marking deployment verified.

Read [ACCEPTANCE.md](../ACCEPTANCE.md) and [AGENTS.md](../AGENTS.md). Return evidence and blockers to the coordinator; do not self-merge or change repository visibility.

## Delivered implementation

Current source: https://github.com/xCloudNobin/deploy-test-docker-compose

Merged PR: https://github.com/xCloudNobin/deploy-test-docker-compose/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.
