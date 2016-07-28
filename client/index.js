require('normalize.css');
require('reveal.js/css/reveal.css');
require('reveal.js/css/theme/black.css');
require('./index.css');

import reveal from 'reveal.js';
import setupMedimapWidgets from './medimap-widget.js';

reveal.initialize({
  controls: false,
  progress: false,
  loop: true,
  shuffle: true,
  autoSlide: 20 * 1000,
  autoSlideStoppable: false,
  transition: 'slide',
  transitionSpeed: 'default',
  backgroundTransition: 'slide',
});

// Setup all medimap widgets
setupMedimapWidgets();
