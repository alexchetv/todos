/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'todos',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
	  EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true

      },
	    ENABLE_DS_FILTER:true
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };


  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

	ENV.remote_couch = 'http://localhost:5984/todos';
	ENV.local_couch = 'todos';
  if (environment === 'production') {
	  ENV.baseURL = '/';
	  ENV.remote_couch = '??????https://martinic.cloudant.com/todos';
  }

	ENV.contentSecurityPolicy = {
		'img-src': "'self' data:",
		'connect-src': "'self' blob: " + ENV.remote_couch.substring(0, ENV.remote_couch.indexOf('/', 9))
	};
  return ENV;
};
