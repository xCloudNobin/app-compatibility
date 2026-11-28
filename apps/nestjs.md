# NestJS

- Action: **create**
- Current source: None; new app required
- Planned canonical repository: `xCloudNobin/deploy-test-nestjs`
- Current source visibility: Not created; intended public
- Status: **implementation merged; local verification recorded; live xCloud not verified**

## Live xCloud qualification from the repository URL (2026-11-27)

Fixture commit `5ab983903affc0d043946e17d8874fe938826bce` on `main`. xCloud `dev` at `837d4392db27e3982d1e7609a2dd81e67236387e`.

Sent `POST /api/v1/servers/{server}/sites/git/auto` with a public DNS record already pointing to the lab server. The deployment used native Node.js SSR with Node.js v24.22.3. The request used this JSON payload.

```json
{
  "repository": {
    "url": "https://github.com/xCloudNobin/deploy-test-nestjs",
    "branch": "main"
  },
  "domain": {
    "mode": "live",
    "name": "qurlu1-nestjs.tmp1.dev",
    "ssl_provider": "xcloud"
  }
}
```

- **Time to live** · 49 seconds from the create request to the first matching readiness response over strict HTTPS. xCloud issued the Let's Encrypt certificate.
- **Redeploy** · 20 seconds from the redeploy request to completion. `/api/health/ready` returned HTTP 200 with the database ready. The project created over HTTPS survived the redeploy.

[Redacted lab evidence](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-urlonly-u1-1127/20261127/ba6c38b47637f1a0226c265d2ea8b8cd/nestjs-url-only-1127.png)

## Implementation brief

Modules, controllers, services, validation and production build.

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

Current source: https://github.com/xCloudNobin/deploy-test-nestjs

Merged PR: https://github.com/xCloudNobin/deploy-test-nestjs/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.
