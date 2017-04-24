#!/usr/bin/env bash
BIN_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$BIN_DIR/.."

# Terminating script if something goes wrong
set -e

sudo -u postgres createuser -P sample-db
sudo -u postgres createdb -O sample-db sample-db
