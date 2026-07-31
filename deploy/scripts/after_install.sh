#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/common.sh"

require_command docker

cd "$APP_DIR"
docker info >/dev/null

docker build --pull -t "${IMAGE_NAME}:next" .
