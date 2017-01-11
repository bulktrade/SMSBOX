const webpack = require('webpack');
const path = require('path');

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
const clone = require('js.clone');
/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig({ env: ENV }).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR
});

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
  let config = webpackMerge(commonConfig({ env: ENV }), {
    target: "node",
    node: {
      global: false,
      __dirname: false,
      __filename: false,
      process: false,
      Buffer: false
    },
    entry: [
      './src/polyfills.node',
      './src/vendor.node',
      './src/main.node'
    ],
    module: {
      rules: [
        {
          test: /ag-grid\/dist\/lib\/(widgets\/agCheckbox)|(gridCore)\.js$/,
          loader: 'string-replace-loader',
          query: {
            search: /HTMLElement/g,
            replace: 'function(){}'
          }
        }
      ]
    },
    output: {
      path: helpers.root('dist/server'),
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    }
  });
  config.plugins = [
    new webpack.IgnorePlugin(/vertx/),
    new ForkCheckerPlugin(),
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('src') // location of your src
    ),
    new LoaderOptionsPlugin({}),
  ];

  return config;
};

// Helpers
function checkNodeImport(context, request, cb) {
  // the css loader-requires must be resolved at compile time, as angular2-template-loader generates source-location specific paths back to node-modules/css-loader.
  if (!path.isAbsolute(request) && request.charAt(0) !== '.' && request.charAt(0) !== '!') {
    cb(null, 'commonjs ' + request);
    return;
  }
  cb();
}
