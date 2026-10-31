#!/usr/bin/env bash
# Check that every test repo is listed in FIXTURES.md (or fixtures-ignore.txt),
# and that every listed repo still exists. Needs an authenticated gh.
# Exit 0 = all registered; 1 = something to fix.
set -euo pipefail
export LC_ALL=C
cd "$(dirname "$0")/.."
# The repo is the first cell of each table row: | `owner/name` | ...
listed=$(grep -oE '^\| `[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+`' FIXTURES.md | tr -d '|` ' | sort -u)
ignored=$(grep -vE '^\s*(#|$)' fixtures-ignore.txt | sort -u)
pattern='test|qa|fixture|hello|demo|sample|mcp'
actual=$( {
  gh repo list xCloudNobin --limit 1000 --json nameWithOwner --jq '.[].nameWithOwner'
  gh repo list neobuilds   --limit 1000 --json nameWithOwner --jq '.[].nameWithOwner'
  gh repo list NasirNobin  --limit 1000 --json nameWithOwner --jq '.[].nameWithOwner' | grep -iE "/.*($pattern)" || true
} | sort -u)
rc=0
missing=$(comm -23 <(echo "$actual") <(printf '%s\n%s\n' "$listed" "$ignored" | sort -u))
if [ -n "$missing" ]; then rc=1; echo "Not registered (add to FIXTURES.md or fixtures-ignore.txt):"; echo "$missing" | sed 's/^/  /'; fi
for r in $listed; do
  gh repo view "$r" --json name >/dev/null 2>&1 || { rc=1; echo "Listed but not found on GitHub: $r"; }
done
[ $rc -eq 0 ] && echo "OK: $(echo "$listed" | wc -l) registered test repos, all present."
exit $rc
