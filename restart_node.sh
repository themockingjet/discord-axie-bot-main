#!/bin/sh

echo "Pulling files from the repo."
git pull

echo ""
echo "=================================="
echo "Restarting node...\n"
pm2 restart 1

echo ""
echo "=================================="
echo "Exiting..."
exit 0