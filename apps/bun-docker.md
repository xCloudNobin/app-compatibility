# Bun with its own Dockerfile (detection fixture)

- Action: **fixture** (third-party repository, used as-is)
- Current source: https://github.com/render-examples/bun-docker
- Pinned commit: `aa1de85f6c00d1eb03721c5f5ffbc71031fae0ed`
- Current source visibility: public (MIT)
- Status: **registered for QA; live xCloud not verified**

## What it is

A minimal Bun HTTP server (`app.ts`, `Bun.serve`) with `bun.lock`, `package.json` (`start: "bun app.ts"`) and a root `Dockerfile` (`FROM oven/bun`, `CMD ["bun", "start"]`). No compose file. The app listens on `PORT` (default 8081) and answers every request with `Welcome to Bun!`.

## Why it is registered

Qualifies the Bun-with-Dockerfile detection path (xCloudDev/xCloud#10226, issue #8803): a Bun app that ships its own Dockerfile must keep that Dockerfile instead of going through the native Bun recipe.

## Acceptance checks

- [ ] Detection (Public API and MCP): Node.js site, `recommended_flow: container`, and the repo Dockerfile is kept (not replaced by a generated one).
- [ ] `/git/auto` deploy at the pinned commit: site is live over HTTPS and returns `Welcome to Bun!`.
- [ ] The running container's image was built from the repo's own Dockerfile (`docker inspect` / build log shows `oven/bun` and `bun start`).
- [ ] A redeploy succeeds and the site stays live.
- [ ] Dashboard deploy of the same repo gives the same result.

Deploy only the pinned commit. Never commit credentials or raw internal logs.
