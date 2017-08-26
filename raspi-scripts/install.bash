#!/usr/bin/env bash
INSTALL_DIR=$HOME/medimap-viewer

set -e

info () {
  printf "\r  [ \033[00;34m..\033[0m ] %s\n" "$1"
}

user () {
  printf "\r  [ \033[0;33m??\033[0m ] %s\n" "$1"
}

success () {
  printf "\r\033[2K  [ \033[00;32mOK\033[0m ] %s\n" "$1"
}

fail () {
  printf "\r\033[2K  [\033[0;31mFAIL\033[0m] %s\n" "$1"
}

echo ''

info 'Installing required packages'
info 'NOTE: Using sudo for this'
# Refresh sources & install packages
sudo apt update
sudo apt install -y git usbmount build-essential xautomation unclutter jq
# Install nodejs as according to https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt install -y nodejs

info 'Installing nvm (Node Version Manager)'
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

info 'Cloning repo from git'
git clone https://github.com/jo12bar/medimap-viewer "${INSTALL_DIR}"
cd "${INSTALL_DIR}"
success 'Repo cloned!'

info 'Installing yarn'
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install -y yarn

info 'Installing packages from npm'
yarn
success 'Packages installed!'

info 'Building app'
yarn build
success 'App built!'

info 'Adding autostart script for this user at ${HOME}/.config/lxsession/LXDE/autostart'
mkdir -p "${HOME}/.config/lxsession/LXDE"
echo "@lxterminal --command=\"${INSTALL_DIR}/raspi-scripts/startup\"" >> "${HOME}/.config/lxsession/LXDE-pi/autostart"
success 'Script added!'

info 'Making ping work for all users (due to a bug in Raspbian...)'
info 'NOTE: sudo must be used for this.'
sudo chmod u+s /bin/ping
success 'ping should now work for all users!'

echo ''

success 'All installed!'
echo ''
exit 0
