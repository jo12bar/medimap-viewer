import React, { useState, useEffect } from 'react';
import withIpcImages, {
  WithIpcImagesPassedDownProps,
} from '../WithIpcImages/WithIpcImages';

import styles from './ImageSlideshow.css';

interface SlideProps {
  url: string,
  visible: boolean,
}

const Slide: React.FC<SlideProps> = ({ url, visible }) => (
  <li
    className={`${styles.slide} ${visible ? styles.shown : ''}`}
  >
    <img src={url} />
  </li>
);

interface ImageSlideshowProps extends WithIpcImagesPassedDownProps {
  /** The time in milliseconds to wait before switching slides. */
  delay?: number,
}

/**
 * An autoplaying image slideshow. Images are automatically loaded from
 * /mnt/medimap-photos when running in balena, or a folder in the current
 * working directory called 'images-for-local-development' when in development.
 *
 * Implements WithIpcImagesPassedDownProps.
 */
const ImageSlideshow: React.FC<ImageSlideshowProps> = ({
  imageUrls,
  delay = 30 * 1000,
}) => {
  const [visibileSlide, setVisibleSlide] = useState(0);

  useEffect(() => {
    const changeSlides = () => {
      if (visibileSlide + 1 >= imageUrls.length) {
        setVisibleSlide(0);
      }
      else {
        setVisibleSlide(visibileSlide + 1);
      }
    };

    const timer = setInterval(changeSlides, delay);
    return () => clearInterval(timer);
  });

  return (
    <ul className={styles.slideshow}>
      {imageUrls.map((url, i) => (
        <Slide
          key={url}
          url={url}
          visible={i === visibileSlide}
        />
      ))}
    </ul>
  );
};

export default withIpcImages(ImageSlideshow);
