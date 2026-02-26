#!/bin/sh
# -*- mode: sh -*-
# vim: set ft=sh :

set -eu
cd "$(cd "$(dirname "$0")"; pwd)/.."

terraform init
terraform apply -auto-approve

VM='automata'
multipass stop "${VM}"
multipass snapshot -n vanilla "${VM}" || true
multipass start "${VM}"
