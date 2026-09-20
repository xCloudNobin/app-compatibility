# Dockerfile deployment

- Action: **upgrade**
- Current source: https://github.com/xCloudNobin/deploy-test-dockerfile
- Planned canonical repository: `xCloudNobin/deploy-test-dockerfile`
- Current source visibility: public
- Status: **implementation merged; local verification recorded; live xCloud not verified**

## Implementation brief

Real CRUD app, multi-stage build, non-root runtime, HEALTHCHECK and documented persistent volume.

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

Current source: https://github.com/xCloudNobin/deploy-test-dockerfile

Merged PR: https://github.com/xCloudNobin/deploy-test-dockerfile/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.
