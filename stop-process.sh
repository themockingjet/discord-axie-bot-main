#!/bin/bash

ps -ef | grep src/index.js | grep -v grep | awk '{print $2}' | xargs kill