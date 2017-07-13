#! /bin/bash
set -ef -o pipefail

npm install
npm prune
npm cache clean --force

exec supervisor server.js