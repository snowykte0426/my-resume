#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/common.sh"

require_command docker
require_command curl

wait_for_url() {
  local description="$1"
  local url="$2"
  local host_header="${3:-}"
  local attempt

  for attempt in $(seq 1 45); do
    if [[ -n "$host_header" ]]; then
      if curl --fail --silent --max-time 5 \
        --header "Host: ${host_header}" "$url" >/dev/null; then
        echo "${description} is healthy."
        return 0
      fi
    elif curl --fail --silent --max-time 5 "$url" >/dev/null; then
      echo "${description} is healthy."
      return 0
    fi

    sleep 2
  done

  echo "${description} did not become healthy: ${url}" >&2
  return 1
}

if ! wait_for_url "Resume container" "http://${HOST_BIND}:${HOST_PORT}/"; then
  docker logs --tail 100 "$CONTAINER_NAME" >&2 || true
  exit 1
fi

wait_for_url "Resume Nginx route" "http://127.0.0.1/" "$PUBLIC_HOST"
