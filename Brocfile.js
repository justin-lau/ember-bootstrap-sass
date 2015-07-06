/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

/*
  This Brocfile specifes the options for the dummy test app of this
  addon, located in `/tests/dummy`

  This Brocfile does *not* influence how the addon or the app using it
  behave. You most likely want to be modifying `./index.js` or app's Brocfile
*/

var app = new EmberAddon({

  sassOptions: {
    extension: 'scss',
    precision: 10,
  },

  bootstrapSass: {
    /**
     * By default, the compiled Bootstrap CSS will be appended to `vendor.css`,
     * glyphicon fonts will be copied to `dist/assets/fonts/bootstrap/`. The add-on
     * also fixed the `$icon-font-path`.
     *
     * Set `excludeStyle` to `true` to never include Bootstrap CSS as well as the
     * fonts. It is useful if you would like to override Bootstrap's SASS by
     * importing and compiling the files yourself.
     *
     * @type Boolean
     * @default false
     */
    // excludeStyle: false,

    /**
     * By default, Bootstrap's JavaScript file will be appended to `vendor.js`.
     *
     * Set `excludeScripts` to `true` to never include Bootstrap's JavaScript.
     *
     * @type Boolean
     * @default false
     */
    // excludeScripts: false,

    /**
     * Set to `true` to inject a CDN `<link>` tag in the `{{content-for 'head'}}` block
     * on `index.html`.
     *
     * Set to a string to customize the name of the `content-for` block to inject into.
     *
     * *This option only works in production mode.*
     *
     * @type Boolean|String
     * @default false
     */
    useCDNForStyle: true,

    /**
     * Set to `true` to inject a CDN `<script>` tag in the
     * `{{content-for 'body-footer'}}` block on `index.html`.
     *
     * Set to a string to customize the name of the `content-for` block to inject into.
     *
     * @type Boolean|String
     * @default false
     */
    useCDNForScripts: true,
  }

});

module.exports = app.toTree();
