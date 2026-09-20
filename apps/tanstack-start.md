# TanStack Start

- Action: **upgrade**
- Current source: https://github.com/xCloudNobin/tanstack-taskboard (renamed from `neobuilds/mcpqa-tanstack-start`)
- Planned canonical repository: `xCloudNobin/tanstack-taskboard`
- Current source visibility: public
- Status: **implementation merged; local verification recorded; live xCloud not verified**

## Implementation brief

SSR, server-side database reads, form mutation and hydration.

Implement the shared meaningful-app baseline: UI, validated CRUD, persistent storage, schema setup, production configuration, health/readiness and automated smoke/persistence checks. Use a project/task board unless the specific requirement preserves another domain.

## Required deliverables

- [ ] Verify source owner; resolve any pending transfer before creating a destination.
- [ ] Inspect/reuse the existing source if provided; implement the brief, not a success-page shell.
- [ ] Include license/attribution, README, safe environment example and reproducible dependencies.
- [ ] Document install/build/production start, runtime version, port/bind address, health, schema and persistence.
- [ ] Automated positive/negative smoke tests; applicable restart/redeploy persistence test.
- [x] Real local production verification and reviewable PR with exact commit and evidence (`xCloudNobin/tanstack-taskboard/pull/1`, merge `3231757d1d2390bd0cb8633ed870a5dc295e9172`).
- [ ] Separate live xCloud qualification using the intended category before marking deployment verified.

Read [ACCEPTANCE.md](../ACCEPTANCE.md) and [AGENTS.md](../AGENTS.md). Return evidence and blockers to the coordinator; do not self-merge or change repository visibility.

## Delivered implementation

Current source: https://github.com/xCloudNobin/tanstack-taskboard

Merged PR: https://github.com/xCloudNobin/tanstack-taskboard/pull/1

See [completion ledger](../COMPLETION.md) for outstanding qualification and ownership details.
