# Plain PHP whose root require.php excludes the lock's minimum PHP (branch fixture)

- Action: **fixture** (branch fixture in this repository; no separate repo)
- Source: https://github.com/xCloudNobin/app-compatibility/tree/fixture/php-lock-root-gap (the app is at the branch root)
- Deploy as: repository `https://github.com/xCloudNobin/app-compatibility`, branch `fixture/php-lock-root-gap`
- Pinned commit: `38e8026e6cf34b186c7e3b657b6168738674f99a`
- Visibility: public (MIT; the locked package is BSD-3-Clause)
- Status: **registered for QA; live xCloud not verified**

## What it is

A tiny plain-PHP app: `public/index.php` shows the running PHP version, `GET /health` returns JSON `{"status":"ok","php":"8.4.x",...}`. No database, no environment variables, no build step. Web root `public/`.

- Root `composer.json`: `"php": "~8.2.0 || ^8.4"`, so PHP 8.3 is excluded.
- `composer.lock`: the only package, `phpunit/php-timer 8.0.0`, requires `"php": ">=8.3"`.

## What it proves

Deploy detection must pick a PHP branch that the root constraint and every lock constraint allow together. Taking only the highest lock lower bound gives 8.3, which the root rejects; the right pick is **8.4**. On 8.3 `composer install` fails with "Root composer.json requires php ~8.2.0 || ^8.4 but your php version (8.3.x) does not satisfy that requirement". Guards xCloudDev/xCloud#11687 (fix round in rollup #11711).

## Acceptance checks

- [ ] Detection (`POST /api/v1/git/detect`, branch `fixture/php-lock-root-gap`): `php_version` 8.4.
- [ ] `/git/auto` deploy on a server whose default PHP is 8.3 with 8.4 installed: the site gets PHP 8.4, `composer install` passes, `/` and `/health` return 200 and report PHP 8.4.
- [ ] Record what the merge-base (before the fix) picks for the same branch.

Deploy only the pinned commit. Never commit credentials or raw internal logs.
