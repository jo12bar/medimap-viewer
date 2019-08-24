#!/usr/bin/env bash
#
# Starts an rclone sync with google drive.
# Largely based off of https://github.com/Mumie-hub/docker-services/blob/master/rclone-mount/start.sh

# The directory that this script is stored in.
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Where the rclone remote gets mounted.
MOUNT_POINT='/mnt/remote'

# The path of the remote.
REMOTE_PATH='remote:'

# Location of the config file.
CONFIG_FILE='/rclone.conf'

# Flags for mounting the remote.
MOUNT_FLAGS=''

# Flags for unmounting the remote.
UNMOUNT_FLAGS='-u -z'

echo '========================================================='
echo "Script directory is $DIR"
echo "Working directory is $(pwd)"
echo "Mounting $REMOTE_PATH to $MOUNT_POINT at: $(date +%Y.%m.%d-%T)"

mkdir -p $MOUNT_POINT

function term_handler() {
  echo 'Sending SIGTERM to child pid'

  # Kill last-spawned background process $(pidof rclone)
  kill -SIGTERM "${!}"

  fuse_unmount
  rm -f "${CONFIG_FILE}.oauth.conf"
  echo 'Exiting container now'
  exit $?
}

function cache_handler() {
  # SIGHUP is for cache clearing.
  echo 'Sending SIGHUP to child pid'
  kill -SIGHUP "${!}"
  wait "${!}"
}

function fuse_unmount() {
  echo "Unmounting: fusermount $UNMOUNT_FLAGS $MOUNT_POINT at: $(date +%Y.%m.%d-%T)"
  fusermount $UNMOUNT_FLAGS "$MOUNT_POINT"
}

# Setup signal traps
trap term_handler SIGINT SIGTERM
trap cache_handler SIGHUP

# rclone has no way to pass in OAuth tokens to Google Drive remotes via env vars
# or commandline flags. So, we create a copy of the $CONFIG_FILE (to be removed
# on SIGTERM) and just straight-up append the OAuth token to it.
cp "$CONFIG_FILE" "${CONFIG_FILE}.oauth.conf"
echo "token = $RCLONE_CONFIG_REMOTE_TOKEN"

# Mount rclone remote, and wait
/usr/sbin/rclone --config "${CONFIG_FILE}.oauth.conf" mount $REMOTE_PATH $MOUNT_POINT $MOUNT_FLAGS &
wait "${!}"

# Will only reach the below if rclone crashes.
echo "rclone crashed at $(date +%Y.%m.%d-%T)"
fuse_unmount
exit $?
