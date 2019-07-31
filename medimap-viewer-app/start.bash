#!/usr/bin/env bash

# By default docker gives us 64MB of shared memory size but to display heavy
# pages we need more.
umount /dev/shm && mount -t tmpfs shm /dev/shm

# Remove the old X lock (in case if the system crashed at some point)
rm /tmp/.X0-lock &>/dev/null || true

# If we're running on a TFT display:
if [ ! -c /dev/fb1 ] && [ "$TFT" = "1" ]; then
  modprobe spi-bcm2708 || true
  modprobe fbtft_device name=pitft verbose=0 rotate=${TFT_ROTATE:-0} || true
  sleep 1
  mknod /dev/fb1 c $(cat /sys/class/graphics/fb1/dev | tr ':' ' ') || true
  FRAMEBUFFER=/dev/fb1 startx /usr/src/app/medimap-viewer-app --enable-logging --no-sandbox
else # Otherwise:
  startx /usr/src/app/medimap-viewer-app --enable-logging --no-sandbox
fi
