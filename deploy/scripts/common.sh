#!/usr/bin/env bash

set -Eeuo pipefail

export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

APP_DIR="${RESUME_DEPLOY_DIR:-${HOME}/deploy/my-resume}"
IMAGE_NAME="${RESUME_IMAGE_NAME:-my-resume}"
CONTAINER_NAME="${RESUME_CONTAINER_NAME:-my-resume}"
HOST_BIND="${RESUME_HOST_BIND:-127.0.0.1}"
HOST_PORT="${RESUME_HOST_PORT:-4173}"
CONTAINER_PORT="${RESUME_CONTAINER_PORT:-4173}"
PUBLIC_HOST="${RESUME_PUBLIC_HOST:-kimtaeeun.site}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Required command not found: $1" >&2
    exit 1
  fi
}

image_exists() {
  docker image inspect "$1" >/dev/null 2>&1
}

container_exists() {
  docker container inspect "$CONTAINER_NAME" >/dev/null 2>&1
}

run_container() {
  docker run -d \
    --name "$CONTAINER_NAME" \
    --restart unless-stopped \
    -p "${HOST_BIND}:${HOST_PORT}:${CONTAINER_PORT}" \
    "$1"
}
