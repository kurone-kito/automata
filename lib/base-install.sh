#!/bin/sh
# -*- mode: sh -*-
# vim: set ft=sh :

set -eu
cd "$(cd "$(dirname "$0")"; pwd)/.."

sudo apt-get update
sudo apt-get upgrade -y

sudo apt-get install -y --no-install-recommends build-essential \
  ca-certificates cmake curl g++ gh gist git gnupg locales make

sudo apt-get autoremove -y
sudo apt-get clean
