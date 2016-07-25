#!/bin/sh

if [ ! -f src/config.json ]; then if [ "$NODE_ENV" -ne "production" ]; then cp src/config.json.example src/config.json; fi; fi
