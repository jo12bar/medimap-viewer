#!/usr/bin/env bash
INSTALL_DIR=$HOME/NOMC-medimap-viewer

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

# Epiphany needs this to store it's config. Otherwise, if the first time it
# ever starts up is in koisk mode, it simply won't start.
mkdir -p "${HOME}/.config"

info 'Cloning repo from git'
git clone https://github.com/jo12bar/NOMC-medimap-viewer "${INSTALL_DIR}"
cd "${INSTALL_DIR}"
success 'Repo cloned!'

info 'Installing packages from npm'
npm prune
npm install
success 'Packages installed!'

info 'Building app'
npm run build
success 'App built!'

info 'Adding autostart script for this user at ${HOME}/.config/lxsession/LXDE/autostart'
mkdir -p "${HOME}/.config/lxsession/LXDE"
echo "@${INSTALL_DIR}/raspi-scripts/startup > ${INSTALL_DIR}/startup.log" >> "${HOME}/.config/lxsession/LXDE/autostart"
success 'Script added!'

echo ''

success 'All installed!'
echo ''
exit 0
