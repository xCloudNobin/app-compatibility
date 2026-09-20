# Implementation completion

All 24 app implementations have merged PRs. Local verification was recorded by the execution coordinator; GitHub merged states were read back for every app. Live xCloud qualification has not run.

23 repos reside under xCloudNobin; React remains at its source pending transfer.

| App | Current repository | Merged PR | Merge commit |
|---|---|---|---|
| Laravel | [xCloudNobin/laravel-taskboard](https://github.com/xCloudNobin/laravel-taskboard) | [PR #1](https://github.com/xCloudNobin/laravel-taskboard/pull/1) | `99b72fdc` |
| Bun (native) | [xCloudNobin/deploy-test-bun](https://github.com/xCloudNobin/deploy-test-bun) | [PR #1](https://github.com/xCloudNobin/deploy-test-bun/pull/1) | `57961e46` |
| Django | [xCloudNobin/deploy-test-django](https://github.com/xCloudNobin/deploy-test-django) | [PR #1](https://github.com/xCloudNobin/deploy-test-django/pull/1) | `c410010f` |
| Elysia | [xCloudNobin/deploy-test-elysia](https://github.com/xCloudNobin/deploy-test-elysia) | [PR #1](https://github.com/xCloudNobin/deploy-test-elysia/pull/1) | `4f09a325` |
| Express | [xCloudNobin/deploy-test-express](https://github.com/xCloudNobin/deploy-test-express) | [PR #1](https://github.com/xCloudNobin/deploy-test-express/pull/1) | `d9bab494` |
| Flask | [xCloudNobin/deploy-test-flask](https://github.com/xCloudNobin/deploy-test-flask) | [PR #1](https://github.com/xCloudNobin/deploy-test-flask/pull/1) | `0c984453` |
| Go | [xCloudNobin/deploy-test-go](https://github.com/xCloudNobin/deploy-test-go) | [PR #1](https://github.com/xCloudNobin/deploy-test-go/pull/1) | `5994abea` |
| Hono | [xCloudNobin/deploy-test-hono](https://github.com/xCloudNobin/deploy-test-hono) | [PR #1](https://github.com/xCloudNobin/deploy-test-hono/pull/1) | `84e105b8` |
| Java (plain) | [xCloudNobin/deploy-test-java](https://github.com/xCloudNobin/deploy-test-java) | [PR #1](https://github.com/xCloudNobin/deploy-test-java/pull/1) | `de7b6980` |
| Spring Boot | [xCloudNobin/deploy-test-spring-boot](https://github.com/xCloudNobin/deploy-test-spring-boot) | [PR #1](https://github.com/xCloudNobin/deploy-test-spring-boot/pull/1) | `e8485642` |
| Node.js (plain) | [xCloudNobin/deploy-test-nodejs](https://github.com/xCloudNobin/deploy-test-nodejs) | [PR #1](https://github.com/xCloudNobin/deploy-test-nodejs/pull/1) | `8a066dfa` |
| NestJS | [xCloudNobin/deploy-test-nestjs](https://github.com/xCloudNobin/deploy-test-nestjs) | [PR #1](https://github.com/xCloudNobin/deploy-test-nestjs/pull/1) | `5ab98390` |
| Nuxt | [xCloudNobin/deploy-test-nuxt](https://github.com/xCloudNobin/deploy-test-nuxt) | [PR #1](https://github.com/xCloudNobin/deploy-test-nuxt/pull/1) | `47254bc5` |
| PHP (plain) | [xCloudNobin/deploy-test-php](https://github.com/xCloudNobin/deploy-test-php) | [PR #1](https://github.com/xCloudNobin/deploy-test-php/pull/1) | `fb19bc53` |
| FastAPI | [xCloudNobin/deploy-test-fastapi](https://github.com/xCloudNobin/deploy-test-fastapi) | [PR #1](https://github.com/xCloudNobin/deploy-test-fastapi/pull/1) | `d5b126e6` |
| Ruby / Rack | [xCloudNobin/deploy-test-ruby-rack](https://github.com/xCloudNobin/deploy-test-ruby-rack) | [PR #1](https://github.com/xCloudNobin/deploy-test-ruby-rack/pull/1) | `5e43cdc6` |
| Rails | [xCloudNobin/deploy-test-rails](https://github.com/xCloudNobin/deploy-test-rails) | [PR #1](https://github.com/xCloudNobin/deploy-test-rails/pull/1) | `f0be46be` |
| Python / WSGI (plain) | [xCloudNobin/deploy-test-python-wsgi](https://github.com/xCloudNobin/deploy-test-python-wsgi) | [PR #1](https://github.com/xCloudNobin/deploy-test-python-wsgi/pull/1) | `85361b94` |
| Astro | [xCloudNobin/deploy-test-astro](https://github.com/xCloudNobin/deploy-test-astro) | [PR #1](https://github.com/xCloudNobin/deploy-test-astro/pull/1) | `a099a08d` |
| React + Vite | [neobuilds/mcpqa-react-vite](https://github.com/neobuilds/mcpqa-react-vite) | [PR #1](https://github.com/neobuilds/mcpqa-react-vite/pull/1) | `8d2c1515` |
| Next.js | [xCloudNobin/supabase-guestbook](https://github.com/xCloudNobin/supabase-guestbook) | [PR #1](https://github.com/xCloudNobin/supabase-guestbook/pull/1) | `f1d19817` |
| TanStack Start | [xCloudNobin/tanstack-taskboard](https://github.com/xCloudNobin/tanstack-taskboard) | [PR #1](https://github.com/xCloudNobin/tanstack-taskboard/pull/1) | `3231757d` |
| Dockerfile deployment | [xCloudNobin/deploy-test-dockerfile](https://github.com/xCloudNobin/deploy-test-dockerfile) | [PR #1](https://github.com/xCloudNobin/deploy-test-dockerfile/pull/1) | `303d80f3` |
| Docker Compose deployment | [xCloudNobin/deploy-test-docker-compose](https://github.com/xCloudNobin/deploy-test-docker-compose) | [PR #1](https://github.com/xCloudNobin/deploy-test-docker-compose/pull/1) | `8c0f627b` |

## Remaining qualification and housekeeping

- React transfer to `xCloudNobin/react-taskboard` is not verified; GitHub reported a destination-name conflict. Source implementation is merged; no duplicate was created.
- Live xCloud qualification remains pending for all targets, separate from local implementation completion.
- Next.js host standalone production with real isolated Supabase/Postgres/PostgREST passed; its Docker app-image build was blocked by build-network DNS.
- Dockerfile/Compose local builds required documented build-only network workarounds.
- Separate private GitHub-auth fixture/testing remains outside the public app implementation suite.
