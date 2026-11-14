# Symfony Demo (Custom PHP, Doctrine)

- Action: **reuse existing source**; preserve the application and its upstream license.
- Source and canonical repository: https://github.com/xCloudNobin/demo
- Branch: `main` (Nobin's trial fork, made 2026-11-14).
- Status: **in-progress; detection and deployment qualification pending**.

## Why it is here

A git.detect regression fixture from Nobin's trial: Symfony with public/index.php, Doctrine (doctrine/orm, doctrine-bundle) and a committed .env DATABASE_URL; composer requires a recent PHP (8.4 at the time of Nobin's trial). Follow [ACCEPTANCE.md](../ACCEPTANCE.md) and [AGENTS.md](../AGENTS.md); registration does not certify those checks.

## Required qualification

1. Run git.detect with a target server; record the detected web root, PHP / Node fields, database and warnings. Never record a credential or a full connection URL from a committed env file.
2. Create the site natively by API with the detected values; record that it answers HTTP 200.
3. Record exact xCloud and fixture commits, API transport, task results and cleanup.
