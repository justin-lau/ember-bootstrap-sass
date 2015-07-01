# ember-bootstrap-sass

This add-on adds Twitter Bootstrap files from bower or from CDN to your Ember
app, configurable in your `Brocfile.js`.

## Installation

```
$ ember install justin-lau/ember-bootstrap-sass#development
```

## Example
In your `Brocfile.js`:

```js
var app = new EmberApp({
  bootstrapSass: {
    excludeStyle: true,
    useCDNForStyle: true,
    useCDNForScripts: true
  }
});
```

## Brocfile Options

### bootstrapSass.excludeStyle

Type: `Boolean` Default: `false`

By default, the compiled Bootstrap CSS will be appended to `vendor.css`,
glyphicon fonts will be copied to `dist/assets/fonts/bootstrap/`. The add-on
also fixed the `$icon-font-path`.

Set `excludeStyle` to `true` to never include Bootstrap CSS as well as the
fonts. It is useful if you would like to override Bootstrap's SASS by
importing and compiling the files yourself.

### bootstrapSass.exludeScripts

Type: `Boolean` Default: `false`

By default, Bootstrap's JavaScript file will be appended to `vendor.js`.

Set `excludeScripts` to `true` to never include Bootstrap's JavaScript.

### bootstrapSass.useCDNForStyle

Type: `Boolean` | `String` Default: `false`

Set to `true` to inject a CDN `<link>` tag in the `{{content-for 'head'}}` block
on `index.html`.

Set to a string to customize the name of the `content-for` block to inject into.

*This option only works in production mode.*

### bootstrapSass.useCDNForScripts

Type: `Boolean` | `String` Default: `false`

Set to `true` to inject a CDN `<script>` tag in the
`{{content-for 'body-footer'}}` block on `index.html`.

Set to a string to customize the name of the `content-for` block to inject into.

*This option only works in production mode.*
