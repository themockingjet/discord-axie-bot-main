#!/bin/bash

git pull

if [ ! -d log ]; then 
  mkdir log
fi

nodemon .