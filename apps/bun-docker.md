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

## Live xCloud qualification (2026-11-20)

- Candidate commit: `aa1de85f6c00d1eb03721c5f5ffbc71031fae0ed` (`main`, same as the pin).
- Category: **Deploy via Git > Docker, the repository's own Dockerfile**. xCloud `dev` at `324be14f2ebeaf4fe64ba3f2e1c14368feb9db3c` on the xcdev lab (Incus control plane).
- Server: lab VM, xCloud Nginx stack, Ubuntu 24.04, public IPv4. xCloud installed Docker 29.10.0 / Compose v5.8.0 on the first Docker site (33 s).
- Created over the Public API with a personal access token, no repository detection: `POST /api/v1/servers/{server}/sites/git/docker` with `docker: {mode: dockerfile, dockerfile_path: Dockerfile, container_port: 8081}` and a staging domain.
- The image was built from the repository's Dockerfile: `oven/bun` base layers, `RUN bun install --production`, `CMD ["bun", "start"]`.
- Go-live: deploy on the staging name, point the domain's A record at the server, then `PUT /api/v1/sites/{site}/domain {ssl_provider: xcloud}`. Let's Encrypt (SAN = the domain), strict `curl` 200 `Welcome to Bun!`, HTTP 301 → HTTPS. Create → live: **130 s**.
- Redeploy (`POST /sites/{site}/git/deploy`): image rebuilt and container recreated in 5 s; 40/40 requests 200 afterwards. The fixture has no persistent data, so there is no marker record.
- Not run here: the detection checks (Public API / MCP `recommended_flow`) and the dashboard deploy. The lab reads GitHub anonymously, so the run made no detection call.

Evidence (text rendered by the lab, redacted): [bun-docker](https://xclab-evidence.tmp1.dev/lab-xl-factory/q-cat-g-1120/20261120/f09bc47f9c2a54ddb8f5501f38ba72af/bun-docker-live.png)
