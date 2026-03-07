#!/bin/sh
# -*- mode: sh -*-
# vim: set ft=sh :

set -eu
cd "$(cd "$(dirname "$0")"; pwd)/.."

CHROMA_CONTAINER='chromadb'
CHROMA_IMAGE='chromadb/chroma:latest'
CHROMA_PORT='8000'
CHROMA_DATA_DIR="${HOME}/.local/share/chromadb"
mkdir -p "${CHROMA_DATA_DIR}"
# Check if container is already running
if sudo docker ps --format '{{.Names}}' | grep -q "^${CHROMA_CONTAINER}$"
then
  exit 0
fi
# Check if container exists but is stopped
if sudo docker ps -a --format '{{.Names}}' | grep -q "^${CHROMA_CONTAINER}$"
then
  sudo docker start "${CHROMA_CONTAINER}"
else
  # Create and start the container
  sudo docker run -d \
    --name "${CHROMA_CONTAINER}" \
    -p "${CHROMA_PORT}:8000" \
    -v "${CHROMA_DATA_DIR}:/chroma/data" \
    "${CHROMA_IMAGE}"
fi
