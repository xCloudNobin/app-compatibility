# Separate GitHub integration tests

Compatibility apps are public. Do not create a private duplicate of every framework.

Maintain one separate small PRIVATE fixture (repository to be selected/created independently) for GitHub authorization tests:

- [ ] Authorized account/integration can discover and deploy the private fixture.
- [ ] Unauthorized account cannot discover private metadata or clone its contents.
- [ ] Revoked access fails cleanly without leaking tokens; use an isolated test credential, never revoke a production integration.
- [ ] Branch selection deploys the selected revision.
- [ ] Authorized push/webhook triggers a deployment of the expected revision; unauthorized events are rejected.
- [ ] Deploy-key clone succeeds only for its authorized repo, with intended read-only permissions.

Keep test credentials, account fixtures and raw access-control evidence private. This is GitHub integration qualification, not per-framework application compatibility. Provisioning this private fixture is a separate TODO, not part of the 24 public apps.
