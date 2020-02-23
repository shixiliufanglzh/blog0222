#!/bin/sh
cd /Users/reedli/develop/nodeJs/blog0222/backend/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log