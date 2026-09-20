# Agent working contract

This repository coordinates work; do not put application implementation here.

- One worker owns one app at a time. DeepSeek agents may implement apps; no model is launched by these documents.
- Read README.md, ACCEPTANCE.md, the assigned apps/<id>.md and MIGRATION.md first.
- Verify current repository ownership before checkout. The catalog target may not exist yet. If a transfer is pending, report it instead of creating a conflicting destination or fork.
- Existing source remains the starting point. New apps use the target name in the brief. Do not create duplicate simple/complex variants.
- Use a branch and PR for implementation, with no automatic merge. Do not alter credentials, deploy keys, repository visibility, collaborators or other apps.
- Use the target framework's native conventions and production runtime. Keep the app small but functional.
- Never invent test output. Report exact commands, exit results and missing verification. No live platform claims from local-only tests.
- Avoid publishing internal notes or raw private evidence. Use placeholders for environment values.
- Workers return app PR URL, commit SHA, test results, security/license notes and blockers. The coordinator updates this parent's catalog/TODO to avoid concurrent conflicting edits.
- Repository transfers, publication and live provisioning require the owner's authorization. Nobin is handling the planned source transfers; do not perform them implicitly.
