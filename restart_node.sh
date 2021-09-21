#!/bin/bash

git pull

if [ ! -d log ]; then 
  mkdir log
fi

pm2 restart 1