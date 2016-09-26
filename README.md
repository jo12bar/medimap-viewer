# medimap-viewer

[![forthebadge](http://forthebadge.com/images/badges/gluten-free.svg)](http://forthebadge.com)

![Screenshot of NOMC-medimap-viewer](./README-images/NOMC-medimap-viewer.png)

Medimap widget viewer + announcement slideshow for walk-in clinics in Canada, running on a Raspberry Pi.

## I'm sorry, what?
My father works as a doctor at the [North Okanagan Medical Clinic](http://www.health-local.com/biz/walk-in-clinics/vernon/british-columbia/north-okanagan-medical-clinic/), and wanted a display running off a Raspberry Pi that could display info from [medimap.ca](https://medimap.ca) as well as a slideshow for announcements. I decided to run this off a Reveal.js slideshow.

## Installation (on a Raspberry Pi)
1. Get yourself a Raspberry Pi 2 or 3 with a fresh install of Raspbian.
2. **OPTIONAL**: Enable remote ssh access.
  1. Open terminal. Run `sudo raspi-config`.
  2. At the main menu, select option 9 (Advance Options). ![Screenshot of `raspi-config`](./README-images/raspi-config-3.png)
  3. Select option A4 (SSH). ![Screenshot of `raspi-config`](./README-images/raspi-config-4.png)
  4. Enable the SSH server. ![Screenshot of `raspi-config`](./README-images/raspi-config-5.png)
3. Exit `raspi-config`. Reboot.
4. You'll now be logged in to the desktop. First, install the following packages:
  ```bash
  # Add kusti8's chromium repository as according to https://www.raspberrypi.org/forums/viewtopic.php?f=63&t=121195
  wget -qO - http://bintray.com/user/downloadSubjectPublicKey?username=bintray | sudo apt-key add -
  echo "deb http://dl.bintray.com/kusti8/chromium-rpi jessie main" | sudo tee -a /etc/apt/sources.list

  # Refresh sources & install packages
  sudo apt update
  sudo apt install -y git usbmount build-essential xautomation unclutter chromium-browser jq

  # Install nodejs as according to https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  sudo apt install -y nodejs
  ```
5. Run the install script from GitHub with the following command:
  ```bash
  curl -sL https://raw.githubusercontent.com/jo12bar/NOMC-medimap-viewer/master/raspi-scripts/install.bash | bash -
  ```
6. Insert a USB stick loaded with images (in it's root directory), and reboot by running `sudo reboot`. The slideshow should start working - if anything goes wrong, then yell at me on [this repo's issue page](https://github.com/jo12bar/NOMC-medimap-viewer/issues).

## `npm` scripts
NOMC-medimap-viewer uses [`scripty`](https://github.com/testdouble/scripty) to organize npm scripts. The scripts are defined in the [`scripts` directory](./scripts), and replicated in [`scripts-win`](./scripts-win) for compatibility. In `package.json` you'll see the word `scripty` as opposed to the script content you'd expect. For more info, see [scripty's GitHub](https://github.com/testdouble/scripty).

| Script             | Description     |
| :----------------- | :------------------------------------------------------------------------ |
| `start`            | Run development server with webpack hot reloading.                        |
| `start:production` | Run production server with **NO** webpack hot reloading. You'll probably want to run `build` before this. |
| `build`            | Builds css & javascript in production configuration with webpack.         |
| `lint`             | Lint javascript with `eslint .`.                                          |
| `lint:fix`         | Lint & partially fix javascript with `eslint . --fix`.                    |
| `test`             | Yell about the lack of unit tests and exit with an error code of 1 :grin: |

More info will be added as I figure out what I need to do.

---
[LICENSE](./LICENSE)
