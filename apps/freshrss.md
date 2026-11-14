# FreshRSS (Custom PHP, web root p/)

- Action: **reuse existing source**; preserve the application and its upstream license.
- Source and canonical repository: https://github.com/xCloudNobin/FreshRSS
- Branch: `latest` (Nobin's trial fork, made 2026-11-14).
- Status: **in-progress; detection and deployment qualification pending**.

## Why it is here

A git.detect regression fixture from Nobin's trial: Custom PHP that serves from p/ (no root index.php); composer requires php >=8.1; package.json has engines.node with lint scripts only (no Node build). Follow [ACCEPTANCE.md](../ACCEPTANCE.md) and [AGENTS.md](../AGENTS.md); registration does not certify those checks.

## Required qualification

1. Run git.detect with a target server; record the detected web root, PHP / Node fields, database and warnings. Never record a credential or a full connection URL from a committed env file.
2. Create the site natively by API with the detected values; record that it answers HTTP 200.
3. Record exact xCloud and fixture commits, API transport, task results and cleanup.
