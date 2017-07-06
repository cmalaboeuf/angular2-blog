#!/bin/bash
set -ex
yarn install --no-lockfile
cd server && yarn install --no-lockfile