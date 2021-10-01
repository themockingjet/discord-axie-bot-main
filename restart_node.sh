#!/bin/sh

echo ""
echo "Restarting bot..."
echo "=========================================================="
node discord_web.js

echo "Pulling files from the repo."
echo "=========================================================="
git pull


echo ""
echo "Installing npm packages"
echo "=========================================================="
pm2 stop 1

echo ""
echo "=========================================================="
npm install

echo ""
echo "Restarting node...\n"
echo "=========================================================="
pm2 restart 1

echo ""
echo "Exiting..."
echo "=========================================================="
exit 0
