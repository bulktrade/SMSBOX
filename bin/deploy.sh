#!/bin/bash
set -x
set -e

npm run start&

sleep 1500

npm run test

npm run e2e
