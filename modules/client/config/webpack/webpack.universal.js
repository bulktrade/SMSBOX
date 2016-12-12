/**
 * @author: @AngularClass
 */

const webpack = require('webpack');
const helpers = require('./../helpers');
const autoprefixer = require('autoprefixer');
const path = require('path');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./../html-elements-plugin/index');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const bourbon = require('node-bourbon').includePaths;

/*
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
    title: 'SMSBox',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */

// Helpers
function includeClientPackages(packages, localModule) {
    return function(context, request, cb) {
        if (localModule instanceof RegExp && localModule.test(request)) {
            return cb();
        }
        if (packages instanceof RegExp && packages.test(request)) {
            return cb();
        }
        if (Array.isArray(packages) && packages.indexOf(request) !== -1) {
            return cb();
        }
        if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
            return cb(null, 'commonjs ' + request);
        }
        return cb();
    };
}

module.exports = function (options) {
    return {
        devtool: 'source-map',
        resolve: {
            extensions: ['.ts', '.js', '.json'],
            modules: [ helpers.root('node_modules') ]
        },
        module: {
            rules: [
                /*
                 * Typescript loader support for .ts and Angular 2 async routes via .async.ts
                 * Replace templateUrl and stylesUrl with require()
                 *
                 * See: https://github.com/s-panferov/awesome-typescript-loader
                 * See: https://github.com/TheLarkInn/angular2-template-loader
                 */
                {
                    test: /\.ts$/,
                    loaders: [
                        '@angularclass/hmr-loader?pretty=' + false + '&prod=' + true,
                        'awesome-typescript-loader',
                        'angular2-template-loader'
                    ],
                    exclude: [/\.(spec|e2e)\.ts$/]
                },

                /*
                 * Json loader support for *.json files.
                 *
                 * See: https://github.com/webpack/json-loader
                 */
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },

                /*
                 * to string and css loader support for *.css files
                 * Returns file content as string
                 *
                 */
                {
                    test: /\.css$/,
                    loaders: ['to-string-loader', 'css-loader']
                },

                /* Raw loader support for *.html
                 * Returns file content as string
                 *
                 * See: https://github.com/webpack/raw-loader
                 */
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                    // exclude: [helpers.root('src/index.html')]
                },

                /* File loader for supporting images, for example, in CSS files.
                 */
                {
                    test: /\.(jpg|png|gif)$/,
                    loader: 'file'
                },

                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    loader: 'raw-loader!sass-loader?includePaths[]=' + bourbon
                },

                { test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/, loader: "file?name=[name].[ext]" },

                // Bootstrap 4
                { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },

                { test: /@angular(\\|\/)material/, use: "imports-loader?window=>global" }
            ],
        },
        plugins: [
            // Use commonPlugins.
        ],

        target: 'node',
        entry: './src/server', // use the entry file of the node server if everything is ts rather than es5
        output: {
            filename: 'index.js',
            path: helpers.root('dist/server'),
            libraryTarget: 'commonjs2'
        },
        externals: includeClientPackages(
            /@angularclass|@angular|angular2-|ng2-|ng-|@ng-|angular-|@ngrx|ngrx-|@angular2|ionic|@ionic|-angular2|-ng2|-ng/
        ),
        node: {
            global: true,
            crypto: true,
            __dirname: true,
            __filename: true,
            process: true,
            Buffer: true
        }
    };
};
