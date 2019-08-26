import electron, { ipcRenderer } from 'electron';
import path from 'path';
import url from 'url';
import React from 'react';
import { Subtract } from 'utility-types';
import { getDisplayName } from '../../util/react-util';
import { isStringArray } from '../../util/util';
import { fileWalk } from '../../util/fs-util';

/** Whether or not the application is running inside a balena container. */
const IS_BALENA = process.env.BALENA ? !!(parseInt(process.env.BALENA)) : false;

const DIR_TO_WALK = IS_BALENA
  ? '/mnt/medimap-photos'
  : path.resolve(process.cwd(), 'images-for-local-development/');

const IMAGES_REGEX = /\.(jpg|jpeg|png|webp|svg|gif)/i;

export interface WithIpcImagesPassedDownProps {
  imageUrls: string[],
}

interface WithIpcImagesState {
  imageUrls: string[] | null,
  initialFileListGotten: boolean,
}

/**
 * Connects a component to updated image file lists recieved via ipc. Will also
 * walk DIR_TO_WALK after first being mounted. The prop `imageUrls` on the
 * passed-in component will be the most recently recieved list of image urls,
 * pre-formatted as "medimap-image://" uris.
 *
 * If DIR_TO_WALK is still being walked on first render, a <p> tag explaining
 * that the images are still being looked for will be displayed instead of the
 * passed-in component.
 *
 * The passed-in component must implemtn WithIpcImagesPassedDownProps.
 *
 * @param Component The react component to connect to updated image file lists
 *                  recieved via ipc.
 * @return A wrapping, higher-order component.
 */
function withIpcImages<T extends WithIpcImagesPassedDownProps>(
  Component: React.ComponentType<T>,
) {
  return class WithIpcImages extends React.Component<
    Subtract<T, WithIpcImagesPassedDownProps>,
    WithIpcImagesState
  > {
    static displayName = `WithIpcImages(${getDisplayName(Component)})`;

    state: Readonly<WithIpcImagesState> = {
      imageUrls: null,
      initialFileListGotten: false,
    };

    private onIpcDataRecieved = (
      _e: electron.IpcRendererEvent,
      imageUrls: any,
    ) => {
      console.log(`${WithIpcImages.displayName} got imageUrls:`, imageUrls);
      if (isStringArray(imageUrls)) {
        this.setState({ imageUrls, initialFileListGotten: true });
      }
    };

    async componentDidMount() {
      ipcRenderer.addListener('images', this.onIpcDataRecieved);

      // Need to manually do a file walk, just in case if the app takes too
      // long to render and we miss the ipc message.
      try {
        const filePaths = await fileWalk(DIR_TO_WALK);
        const imageUrls = filePaths.filter((f) => IMAGES_REGEX.test(f));
        console.log(
          `${WithIpcImages.displayName} got initial imageUrls:`,
          imageUrls,
        );
        this.setState({ imageUrls, initialFileListGotten: true });
      }
      catch (err) {
        console.error(err);
      }
    }

    componentWillUnmount() {
      ipcRenderer.removeListener('images', this.onIpcDataRecieved);
    }

    render() {
      const { initialFileListGotten, imageUrls } = this.state;

      // If we've rendered before the initial file walk has completed, we tell
      // the user that we're still scanning for images.
      if (!initialFileListGotten || !isStringArray(imageUrls)) {
        return <p>Scanning for images...</p>;
      }

      return <Component
        {...this.props as T}
        imageUrls={imageUrls.map((f) => url.format({
          pathname: encodeURI(f),
          protocol: 'medimap-image:',
          slashes: true,
        }))}
      />;
    }
  }
}

export default withIpcImages;
