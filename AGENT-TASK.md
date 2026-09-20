# Copyable single-app task

Implement the app `<id>` from https://github.com/xCloudNobin/app-compatibility.
Read `apps/<id>.md`, `ACCEPTANCE.md`, `AGENTS.md` and `MIGRATION.md` before work.

Repository: `<verified-current-repository>`
Branch: `feat/compatibility-<id>`
Scope: one canonical app, no simple/complex duplicate, no work on other repositories.

1. Verify repository identity and inspect existing implementation.
2. Implement the brief using idiomatic framework patterns and the shared acceptance criteria.
3. Document runtime, dependency install, build, production start, port, health, variables, schema, persistence and smoke commands.
4. Run clean-install/build/tests and exercise the actual production server. Test failure cases and persistence where applicable.
5. Open a PR. Do not merge, transfer, change visibility or provision infrastructure.
6. Return PR URL + commit SHA + changed components + exact executed checks/outcomes + checks not run + blockers.

A reviewer must verify the evidence. Local success is not live xCloud compatibility certification. If GitHub write access or a transfer blocks work, report the exact blocker rather than fabricating a PR.
