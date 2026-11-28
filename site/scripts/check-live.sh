#!/usr/bin/env bash
# 等 Cloudflare 部署完成，檢查正式站狀態與 version.json。
set -euo pipefail

cd "$(dirname "$0")/../.."

expected="${1:-$(git rev-parse HEAD)}"
base="${LIVE_BASE:-https://analysis.ragdemo.win}"
url="${LIVE_URL:-$base/version.json}"
retries="${RETRIES:-36}"
interval="${INTERVAL:-5}"
fail=0

check_status() {
  local path="$1"
  local expected_code="$2"
  local label="$3"
  local code
  code="$(curl -sS -o /dev/null -w '%{http_code}' -H 'Cache-Control: no-cache' "$base$path" 2>/dev/null || echo 000)"
  if [ "$code" != "$expected_code" ]; then
    echo "FAIL $label: expected $expected_code, got $code ($base$path)" >&2
    fail=1
  else
    echo "ok   $label ($code)"
  fi
}

echo "== Live status =="
check_status "/" 200 "home"
check_status "/robots.txt" 200 "robots.txt"
check_status "/sitemap.xml" 200 "sitemap.xml"
check_status "/chapters/" 200 "chapters index"
check_status "/assets/content-core-bundle.js" 200 "core bundle"
check_status "/this-path-does-not-exist-$(date +%s)" 404 "404 page"

echo "== Live version =="
for attempt in $(seq 1 "$retries"); do
  live="$(node -e '
    const url = process.argv[1];
    fetch(url, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(String(response.status))))
      .then((data) => process.stdout.write(String(data.sha || "")))
      .catch(() => process.stdout.write(""));
  ' "$url")"

  if [ "$live" = "$expected" ]; then
    echo "live version: $expected"
    [ "$fail" -eq 0 ] || exit 1
    exit 0
  fi

  echo "waiting for $expected (live: ${live:-none}) ${attempt}/${retries}"
  sleep "$interval"
done

echo "timeout: live version did not match $expected" >&2
echo "確認 GitHub Actions 的 Deploy workflow 已成功，且 Cloudflare 部署已完成。" >&2
exit 1
