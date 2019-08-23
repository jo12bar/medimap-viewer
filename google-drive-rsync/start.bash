#!/usr/bin/env bash
#
# Starts an rclone sync with google drive.

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "Script directory is $DIR"
echo "Working directory is $(pwd)"

while true; do
  rclone --version
  sleep 1
done
