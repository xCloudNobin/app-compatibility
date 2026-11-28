# Bun with its own Dockerfile (detection fixture)

- Action: **fixture** (third-party repository, used as-is)
- Current source: https://github.com/render-examples/bun-docker
- Pinned commit: `aa1de85f6c00d1eb03721c5f5ffbc71031fae0ed`
- Current source visibility: public (MIT)
- Status: **registered for QA; live xCloud not verified**

## Live xCloud qualification from the repository URL (2026-11-28)

Fixture commit `aa1de85f6c00d1eb03721c5f5ffbc71031fae0ed` on `main`. xCloud `dev` at `837d4392db27e3982d1e7609a2dd81e67236387e`.

Sent `POST /api/v1/servers/{server}/sites/git/auto` with public DNS already pointing to the lab server. xCloud selected Dockerfile mode and built the repository's Dockerfile with `oven/bun`. The container ran `bun start`. The request used this JSON payload.

```json
{
  "repository": {
    "url": "https://github.com/render-examples/bun-docker",
    "branch": "main"
  },
  "domain": {
    "mode": "live",
    "name": "qurlu3-bun.tmp1.dev",
    "ssl_provider": "xcloud"
  }
}
```

- **Time to live** · 70 seconds from the create request to the first strict HTTPS 200 with `Welcome to Bun!`. The create task finished and xCloud issued the Let's Encrypt certificate.
- **Redeploy** · 6 seconds from the redeploy request to a finished event with exit 0. The expected page returned HTTP 200 over strict HTTPS afterward.
- **Known limitation** · During a redeploy the site is briefly unavailable while Docker replaces the running container. One of 12 strict HTTPS probes at 0.5 s intervals returned HTTP 502, with curl exit 0.

[Redacted lab evidence](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-urlonly-u3-1128/20261128/8412df7562bc38515756083ad766e823/bun-docker-url-only-1128.png)

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
