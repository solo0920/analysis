#!/usr/bin/env bash
# 等 Cloudflare 部署完成，並確認正式站的 version.json 是目前 commit。
set -euo pipefail

cd "$(dirname "$0")/../.."

expected="${1:-$(git rev-parse HEAD)}"
url="${LIVE_URL:-https://analysis.ragdemo.win/version.json}"
retries="${RETRIES:-36}"
interval="${INTERVAL:-5}"

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
    exit 0
  fi

  echo "waiting for $expected (live: ${live:-none}) ${attempt}/${retries}"
  sleep "$interval"
done

echo "timeout: live version did not match $expected" >&2
echo "確認 Cloudflare Build command 已設為 bash site/scripts/verify.sh，且部署已完成。" >&2
exit 1
