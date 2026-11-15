# Node PM2 ecosystem with web and workers (release mode)

Branch `fixture/node-ecosystem-multi` of this repository. The root `ecosystem.config.js` has three apps with the same code and the same `cwd: web`: `multi-web` (HTTP, reads `process.env.PORT`, binds 127.0.0.1), `multi-queue` (long-running worker, no port) and `multi-cron` (in-process cron, one run every 10 s on the clock). Each starts as `node_modules/.bin/env-cmd -f ../.env node <file>` with `interpreter: none`. No credentials and no external services. Node 22; the root `npm install` installs `web/` through `postinstall`.

Without `--no-override`, env-cmd replaces the slot's PORT with the PORT in the site `.env`. Set `MULTI_NO_OVERRIDE=1` in the deploy shell (or edit the args) to add `--no-override`.

`multi-queue` and `multi-cron` append `<ISO time> <kind> <pid> <version> <dir>` to `$HOME/multi-fixture-runs.log`, outside the release tree. Two lines for the same 10 s cron slot mean two cron workers ran at once (overlap). Change `web/version.json` to mark a release.

Use: a native Node site with this branch, deployed normally first. For release-mode qualification: turn on, deploy twice (v2, v3), add and remove a worker, roll back, turn off, and a worker that fails to start. Under at least five requests per second, record every non-2xx and the max latency per step. Count cron runs per slot across each deploy. Check that `pm2 logs multi-queue` still works. Clean up every site, server and environment you created.

This file models a real customer layout and must be used only on disposable test sites. Deployment verification is pending until an xCloud builder report records a tested head.
