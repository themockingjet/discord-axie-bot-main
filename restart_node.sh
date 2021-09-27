#!/bin/sh

echo "\n\nPulling files from the repo.\n"
git pull

echo "\n\nRestarting node...\n"
pm2 restart 1

echo "\n\nExiting..."
exit 0