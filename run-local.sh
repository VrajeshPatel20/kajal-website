#!/bin/sh
# Prefer the developer's Node installation; fall back to the bundled desktop runtime.
set -eu
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  kajal_node_dir="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin"
  if [ ! -x "$kajal_node_dir/node" ]; then
    echo 'Install Node.js 22 or newer, then run pnpm install and pnpm dev.' >&2
    exit 1
  fi
  PATH="$kajal_node_dir:$PATH"
  export PATH
fi
exec node node_modules/vite/bin/vite.js --host 127.0.0.1
