import reveal from 'reveal.js';
import setupMedimapWidgets from './medimap-widget.js'

require('reveal.js/css/reveal.css');
require('reveal.js/css/theme/black.css');
require('./index.css');

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
