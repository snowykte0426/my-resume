#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/common.sh"

require_command docker

old_image_id=""
if image_exists "${IMAGE_NAME}:latest"; then
  old_image_id="$(docker image inspect --format '{{.Id}}' "${IMAGE_NAME}:latest")"
fi

docker tag "${IMAGE_NAME}:next" "${IMAGE_NAME}:latest"
docker image rm "${IMAGE_NAME}:next" >/dev/null

if container_exists; then
  docker rm -f "$CONTAINER_NAME"
fi

run_container "${IMAGE_NAME}:latest"
echo "Started ${CONTAINER_NAME} on ${HOST_BIND}:${HOST_PORT}"

new_image_id="$(docker image inspect --format '{{.Id}}' "${IMAGE_NAME}:latest")"
if [[ -n "$old_image_id" && "$old_image_id" != "$new_image_id" ]]; then
  docker image rm "$old_image_id" >/dev/null 2>&1 || true
fi
