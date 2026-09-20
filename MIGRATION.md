# Ownership and publication

All canonical apps are intended to live under `xCloudNobin`. Nobin plans to perform transfers; this parent repo does not imply they have happened. Keep existing names initially to avoid unnecessary churn.

## Canonical sources to transfer

- [ ] `neobuilds/mcp-qa-laravel` → `xCloudNobin/mcp-qa-laravel`
- [ ] `neobuilds/mcpqa-react-vite` → `xCloudNobin/mcpqa-react-vite`
- [ ] `neobuilds/mcpqa-tanstack-start` → `xCloudNobin/mcpqa-tanstack-start`

## Checklist for each existing app

- [ ] Check upstream licenses and retain attribution/notices.
- [ ] Review current files AND full Git history for credentials, private data and internal artifacts before public visibility.
- [ ] Rotate any exposed real secrets; deleting the current file is not remediation of leaked history.
- [ ] If history cannot safely be made public, use an explicitly approved clean snapshot with required attribution instead of exposing it.
- [ ] Transfer canonical sources without creating a conflicting destination first; confirm final owner via GitHub API.
- [ ] Re-check remotes, CI, webhook/integration permissions and deploy access after transfer.
- [ ] Confirm public visibility only after review and owner approval; don't flip private repos automatically.
- [ ] Update source/target links and visibility in catalog and README; record completion in TODO.

Historical duplicates are not transfer requirements for this suite. Leave them untouched unless the owner separately wants them moved. Existing evidence archives remain private and out of scope.
