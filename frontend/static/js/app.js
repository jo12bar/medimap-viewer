requirejs.config({
  paths: {
    jquery: 'jquery.min',
    highcharts: 'highcharts',
    socketio: '../socket.io/socket.io',
  },

  shim: {
    highcharts: {
      exports: 'Highcharts',
      deps: ['jquery'],
    },
    socketio: { exports: 'io' },
  },
});

/** Retry failed module loading */
function requireWithRetry(modules) {
  const retryInterval = 5000;
  let retryCount = 0;

  const retryOnError = err => {
    const failedId = err.requireModules && err.requireModules[0];
    // this is what tells RequireJS not to cache the previous failure status
    requirejs.undef(failedId);
    retryCount++;
    console.log(`Retrying module loading #${retryCount} after wait...`);
    setTimeout(() => requirejs([failedId], null, retryOnError), retryInterval);
  };

  requirejs(modules, null, retryOnError);
}

requireWithRetry(['main']);
