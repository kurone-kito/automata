#!/bin/sh
# -*- mode: sh -*-
# vim: set ft=sh :

set -eu
cd "$(cd "$(dirname "$0")"; pwd)/.."

if [ -d "${HOME}/.nvm" ]
then
  echo "nvm is already installed at ${HOME}/.nvm"
  exit 0
fi
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/HEAD/install.sh | bash -
. "${HOME}/.nvm/nvm.sh"
nvm install --lts
nvm use --lts
nvm alias default lts/*
