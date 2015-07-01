'use strict';

var _ = require('lodash-node');

module.exports = function(environment, appConfig) {
  if (!appConfig) {
    return {};
  }

  var contentSecurityPolicy = _.defaults({
    'default-src': "'none'",
    'script-src': "'self'",
    'font-src': "'self'",
    'connect-src': "'self'",
    'img-src': "'self'",
    'style-src': "'self'",
    'media-src': "'self'"
  }, appConfig.contentSecurityPolicy);


  if (contentSecurityPolicy['style-src'].indexOf('unsafe-inline') === -1) {
    contentSecurityPolicy['style-src'] += " 'unsafe-inline'";
  }

  return { contentSecurityPolicy: contentSecurityPolicy };
};
