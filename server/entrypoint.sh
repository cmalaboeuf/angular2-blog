#! /bin/bash
set -ef -o pipefail

npm install  

exec supervisor server.js