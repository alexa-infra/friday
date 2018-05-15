#!/bin/bash

SASS_BIN="./node_modules/.bin/node-sass"
SASS_ARGS="--output-style expanded"

find src/ -name "*.scss" | \
  sed "s/.scss$//g" | \
  xargs --replace bash -c "echo {}.scss && $SASS_BIN $SASS_ARGS {}.scss > {}.css"
