import axios from 'axios';
import uuid from 'node-uuid';

require('./medimap-widget.css');

export function loadMedimapData(widget) {
  const baseUrl = '/api/medimap-widget';
  const cacheBreakerUUID = uuid.v4();

  const jsonUrl = `${baseUrl}?CACHE_BREAKER_UUID=${cacheBreakerUUID}`;

  axios.get(jsonUrl)
    .then((res) => {
      widget.innerHTML = res.data.html; // eslint-disable-line no-param-reassign

      // Make sure to remove the default stylesheet
      const defaultStylesheet = widget.querySelector('link[rel="stylesheet"]');
      if (defaultStylesheet) {
        widget.removeChild(defaultStylesheet);
      }
    })
    .catch((err) => {
      console.error(err.response.data);
    });
}

export default function setupMedimapWidgets(elementSelector = '.medimap-widget') {
  const widgets = document.querySelectorAll(elementSelector);
  for (const widget of widgets) {
    const { attributes: attr } = widget;
    if (attr.getNamedItem('data-auto-reload')) {
      const reloadInterval = parseInt(attr.getNamedItem('data-auto-reload-interval').value, 10);

      // Make sure to load the widget at least once before setting the timer
      loadMedimapData(widget);

      // http://stackoverflow.com/a/457830/5013691
      setInterval(() => loadMedimapData(widget), reloadInterval);
    } else {
      loadMedimapData(widget);
    }
  }
}
