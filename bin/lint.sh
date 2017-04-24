#!/usr/bin/env bash
BIN_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$BIN_DIR/.."

# Terminating script if something goes wrong
set -e

# We need to use `--force` in order to return zero code instead of default (2)
# when linting errors are present. Otherwise it will break `npm run`.

${PROJECT_DIR}/node_modules/.bin/tslint \
--project "$PROJECT_DIR" \
--force \
--format stylish \
"$PROJECT_DIR/src/**/*.ts"
