#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../.."

echo "== Build core bundle =="
node site/scripts/build-core-bundle.js

echo "== Build static landing pages =="
node site/scripts/build-static-landing-pages.js

echo "== Check JavaScript syntax and content in parallel =="
node site/scripts/check-js-syntax.js &
js_pid=$!
node site/scripts/validate-content.js &
content_pid=$!

status=0
wait "$js_pid" || status=1
wait "$content_pid" || status=1
if [ "$status" -ne 0 ]; then
  echo "JavaScript or content validation failed." >&2
  exit "$status"
fi

echo "== Validate SEO =="
node site/scripts/validate-seo.js

echo "== Write version.json =="
node site/scripts/write-version.js

echo "All checks passed."
