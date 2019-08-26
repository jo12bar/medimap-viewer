# medimap-viewer

**:warning: :construction: Busy rewriting everything!!! Stand by. :construction: :warning:**

## medimap-viewer-app
This is the actual electron application that does all the display.
- Uses [electron-forge](https://www.electronforge.io/) for building (since it was quick and easy).
- Uses techniques from [balena-io/resin-electronjs](https://github.com/balena-io/resin-electronjs) to get Electron working inside of balena.
- Runs on React with Typescript, and uses CSS Modules.

### `npm` scripts:

Script | Description
------ | -----------
`start` | Starts the app in development mode. Most renderer-related files should hot-reload on change. If not, hit <kbd>Ctrl</kbd>+<kbd>r</kbd> to reload them all.
`package` | Outputs a binary, production version of the app in `out/medimap-viewer-app-<PLATFORM>-<ARCH>/`. The executable file will be called `medimap-viewer-app` (with a `.exe` on Windows).
`make` | Packages the app, and then generates an installer (`.msi`, `.deb`, etc...). Probably unnecessary.
`publish` | Makes the app, and then publishes it.

## google-drive-rsync
Uses [rclone](https://rclone.org) to sync slideshow photos from Google Drive.

Unfortunately, Google's OAuth setup means that the config has to be created first on your development machine. The below steps are written for Linux, since they're relatively simple to write. Translate to  other platforms at your own risk (Windows is a fun time). After installing docker:

1) Run `mkdir config && docker run --rm -it -v $(pwd)/config:/config bcardiff/rclone` (on Linux) to generate a config file for Google Drive.
  - What you name your remote isn't important.
  - It is *highly* recommended to set up your own `client_id`, as described [here](https://rclone.org/drive/#making-your-own-client-id)
  - Choose the drive.readonly scope.
  - Choose the folder where you want to keep your photos on Google Drive as the root_folder_id. This should be the long, random string of characters at the end of the URL when you're viewing the folder on Drive.
  - You're going to have to go through the Google OAuth confirmation flow. Have a web browser handy.

2) Copy the following config keys into their corresponding environment variables in the balena console:

Config key | Environment variable
-----------|---------------------
`client_id` | `RCLONE_CONFIG_REMOTE_CLIENT_ID`
`client_secret` | `RCLONE_CONFIG_REMOTE_CLIENT_SECRET`
`root_folder_id` | `RCLONE_CONFIG_REMOTE_ROOT_FOLDER_ID`
`token` (__COPY THE WHOLE THING - INCLUDING JSON BRACKETS__) | `RCLONE_CONFIG_REMOTE_TOKEN`

3) Repeat once per year (because of the OAuth token's expiry date)

## pi-supply-switch
This service handles safe shutdowns and restarts by use of a [Pi Supply Switch](https://uk.pi-supply.com/products/pi-supply-raspberry-pi-power-switch). The code is based off of [their official repo](https://github.com/PiSupply/Pi-Supply-Switch), with some minor modifications for compatibility with balena's http API-based power management system.

---
[LICENSE](./LICENSE)
