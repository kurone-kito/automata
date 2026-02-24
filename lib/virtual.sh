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

tar --format ustar -cvf "${VM}.tar" setup lib/*
multipass transfer "${VM}.tar" "${VM}:.local/src/automata.tar"
multipass exec "${VM}" -- /usr/local/bin/automata-setup
