# Hono

- Action: **create**
- Current source: None; new app required
- Planned canonical repository: `xCloudNobin/deploy-test-hono`
- Current source visibility: Not created; intended public
- Status: **implementation merged; local verification recorded; live xCloud not verified**

## Live xCloud qualification from the repository URL (2026-11-27)

Fixture commit `84e105b85bdd6d9b52ea40ef5047be990aaa2bf3` on `main`. xCloud `dev` at `837d4392db27e3982d1e7609a2dd81e67236387e`.

Sent `POST /api/v1/servers/{server}/sites/git/auto` with a public DNS record already pointing to the lab server. The deployment used native Node.js SSR with Node.js v24.22.3. The request used this JSON payload.

```json
{
  "repository": {
    "url": "https://github.com/xCloudNobin/deploy-test-hono",
    "branch": "main"
  },
  "domain": {
    "mode": "live",
    "name": "qurlu1-hono.tmp1.dev",
    "ssl_provider": "xcloud"
  }
}
```

- **Time to live** · 68 seconds from the create request to the first matching readiness response over strict HTTPS. xCloud issued the Let's Encrypt certificate.
- **Redeploy** · 18 seconds from the redeploy request to completion. `/api/health/ready` returned HTTP 200 with SQLite ready. The project created over HTTPS survived the redeploy.

[Redacted lab evidence](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-urlonly-u1-1127/20261127/f9af038de91e4e6c199c51b5aa6bbd72/hono-url-only-1127.png)

## Implementation brief

Use the Node adapter as the initial deployment contract; document runtime explicitly.

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

Current source: https://github.com/xCloudNobin/deploy-test-hono

Merged PR: https://github.com/xCloudNobin/deploy-test-hono/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.
