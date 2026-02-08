#!/bin/sh
# -*- mode: sh -*-
# vim: set ft=sh :

set -eu
cd "$(cd "$(dirname "$0")"; pwd)/.."

# Generate and set the Japanese locale
sudo locale-gen ja_JP.UTF-8
sudo update-locale LANG=ja_JP.UTF-8
# Set timezone to Asia/Tokyo
sudo timedatectl set-timezone Asia/Tokyo || true
# Configure Japanese keyboard layout for the console
printf 'XKBLAYOUT="jp"\nXKBMODEL="jp106"\n' \
  | sudo tee /etc/default/keyboard > /dev/null
sudo setupcon --force --save-only 2>/dev/null || true
