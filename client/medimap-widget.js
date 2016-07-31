import axios from 'axios';

require('./medimap-widget.css');

export function loadMedimapData(widget, clinicID) {
  const jsonUrl = `https://crossorigin.me/https://medimap.ca/clinics/widgetdata/${clinicID}.json`;

  axios.get(jsonUrl)
  .then((res) => {
    widget.innerHTML = res.data.html; // eslint-disable-line no-param-reassign

    // Make sure to remove the default stylesheet
    const defaultStylesheet = widget.querySelector('link[rel="stylesheet"]');
    if (defaultStylesheet) {
      widget.removeChild(defaultStylesheet);
    }
  });
}

export default function setupMedimapWidgets(elementSelector = '.medimap-widget') {
  const widgets = document.querySelectorAll(elementSelector);
  for (const widget of widgets) {
    const { attributes: attr } = widget;
    const clinicID = attr.getNamedItem('data-clinic-id').value;
    if (attr.getNamedItem('data-auto-reload')) {
      const reloadInterval = parseInt(attr.getNamedItem('data-auto-reload-interval').value, 10);

      // Make sure to load the widget at least once before setting the timer
      loadMedimapData(widget, clinicID);

      // http://stackoverflow.com/a/457830/5013691
      setInterval(() => loadMedimapData(widget, clinicID), reloadInterval);
    } else {
      loadMedimapData(widget, clinicID);
    }
  }
}
