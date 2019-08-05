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

---
[LICENSE](./LICENSE)
