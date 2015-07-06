/* jshint node: true */
'use strict';

var _            = require('lodash-node');
var path         = require('path');
var addonConfig  = null;

module.exports = {
  name: 'ember-bootstrap-sass',

  /**
   * Compile `addon/styles/bootstrap.scss`.
   */
  setupPreprocessorRegistry: function(type, registry) {
    if (type === 'self') {
      registry.add('css', {
        name: 'ember-bootstrap-sass',
        toTree: function(tree, inputPath, outputPath, options) {
          // If `excludeStyle` is turned on, the bootstrap css will never be imported.
          // Otherwise, the css will be included in `vendor.css` unless `useCDN`
          // is turned on and the addon is building in production mode.
          if (!addonConfig.excludeStyle && !(addonConfig.useCDNForStyle && process.env.EMBER_ENV === 'production')) {
            // tell `ember-cli-sass` to compile `addon/styles/bootstrap.scss`
            options.outputPaths.bootstrap = 'bootstrap.css';

            // minimum required by bootstrap
            if (!options.precision || options.precision < 8) {
              options.precision = 8;
            }
          }

          return tree;
        }
      });
    }
  },

  /**
   * Setup config defaults. Import Bootstrap's javascripts and font files.
   */
  included: function(app) {
    this._super.included(app);

    var config = addonConfig = _.defaults(app.options.bootstrapSass || {}, {
      excludeStyle: false,
      excludeScripts: false,
      useCDNForStyle: false,
      useCDNForScripts: false,
    });

    // If `excludeScripts` is turned on, the script will never be imported.
    // Otherwise, the script will be included in `vendor.js` unless `useCDN`
    // is turned on and the addon is building in production mode.
    if (!config.excludeScripts && !(config.useCDNForScripts && process.env.EMBER_ENV === 'production')) {
      app.import(app.bowerDirectory + '/bootstrap-sass/assets/javascripts/bootstrap.js');
    }

    // Import fonts only if styles are needed
    if (!config.excludeStyle && !(config.useCDNForStyle && process.env.EMBER_ENV === 'production')) {
      var fontFilePath = path.join(app.bowerDirectory, '/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular');
      var extensions = ['.eot', '.svg', '.ttf', '.woff', '.woff2'];

      _.forEach(extensions, function(extension) {
        app.import(fontFilePath + extension, { destDir: 'assets/fonts/bootstrap' });
      });
    }
  },

  /**
   * Inject CDN resources tags.
   */
  contentFor: function(type, config) {
    var bootstrapBowerFilePath = path.join(
        this.project.root,
        this.app.bowerDirectory,
        '/bootstrap-sass/.bower.json'
      );

    var bootstrapVersion = require(bootstrapBowerFilePath).version;

    if (process.env.EMBER_ENV === 'production') {
      var styleContentType = addonConfig.useCDNForStyle === true ? 'head' : addonConfig.useCDNForStyle;
      var scriptsContentType = addonConfig.useCDNForScripts === true ? 'body-footer' : addonConfig.useCDNForScripts;

      if (type === styleContentType) {
        return '<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/' + bootstrapVersion + '/css/bootstrap.min.css">';
      }

      if (type === scriptsContentType) {
        return '<script src="//maxcdn.bootstrapcdn.com/bootstrap/' + bootstrapVersion + '/js/bootstrap.min.js"></script>';
      }
    }
  },
};
