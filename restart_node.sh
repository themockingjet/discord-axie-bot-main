#!/bin/sh

echo Pulling files from the repo.
git pull

echo Restarting node...
pm2 restart 1

exit 0