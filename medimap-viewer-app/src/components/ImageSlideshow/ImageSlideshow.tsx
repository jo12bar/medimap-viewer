import React from 'react';
import withIpcImages, {
  WithIpcImagesPassedDownProps,
} from '../WithIpcImages/WithIpcImages';

/**
 * An autoplaying image slideshow. Images are automatically loaded from
 * /mnt/medimap-photos when running in balena, or a folder in the current
 * working directory called 'images-for-local-development' when in development.
 *
 * Implements WithIpcImagesPassedDownProps.
 */
const ImageSlideshow: React.FC<WithIpcImagesPassedDownProps> = ({ imageUrls }) => (
  <ul>
    {imageUrls.map((url) => (
      <li key={url}>{url}</li>
    ))}
  </ul>
);

export default withIpcImages(ImageSlideshow);
