#!/bin/sh

echo "\n\nPulling files from the repo.\n"
git pull

echo "\n\n==================================\n"
echo "Restarting node...\n"
pm2 restart 1

echo "\n\n==================================\n"
echo "Exiting..."
exit 0