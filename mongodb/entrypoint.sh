#! /bin/bash
set -ef -o pipefail

MONGO=mongod
MONGODB_OPTIONS="--smallfiles --oplogSize 128"
START_MONGO="$MONGO $MONGO_OPTS"

exec $START_MONGO