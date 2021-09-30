#!/bin/sh

echo ""
echo "=========================================================="
echo "Restarting bot..."
node discord_web.js

echo "Pulling files from the repo."
echo "=========================================================="
git pull


echo ""
echo "=========================================================="
echo "Installing npm packages"
pm2 stop 1

echo ""
echo "=========================================================="
echo "Installing npm packages"
npm install

echo ""
echo "=========================================================="
echo "Restarting node...\n"
pm2 restart 1

echo ""
echo "=========================================================="
echo "Exiting..."
exit 0
