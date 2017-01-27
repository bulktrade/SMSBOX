'use strict';

const webpack = require('webpack');
const path = require('path');
const helpers = require('./helpers');
const clone = require('js.clone');
const webpackMerge = require('webpack-merge');
const V8LazyParseWebpackPlugin = require('v8-lazy-parse-webpack-plugin');
const __serverConfig = require('./webpack.server');
const __clientConfig = require('./webpack.client');
// const CompressionPlugin = require('compression-webpack-plugin');

export const commonPlugins = [
    new V8LazyParseWebpackPlugin(),

    new webpack.DefinePlugin({
        // do not use an object for 'process.env' otherwise all other environment
        // variables are set to 'undefined' see issue #291
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.AOT': true
    }),

    // Loader options
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),

    new webpack.NormalModuleReplacementPlugin(
        /facade(\\|\/)async/,
        helpers.root('node_modules/@angular/core/src/facade/async.js')
    ),
    new webpack.NormalModuleReplacementPlugin(
        /facade(\\|\/)collection/,
        helpers.root('node_modules/@angular/core/src/facade/collection.js')
    ),
    new webpack.NormalModuleReplacementPlugin(
        /facade(\\|\/)errors/,
        helpers.root('node_modules/@angular/core/src/facade/errors.js')
    ),
    new webpack.NormalModuleReplacementPlugin(
        /facade(\\|\/)lang/,
        helpers.root('node_modules/@angular/core/src/facade/lang.js')
    ),
    new webpack.NormalModuleReplacementPlugin(
        /facade(\\|\/)math/,
        helpers.root('node_modules/@angular/core/src/facade/math.js')
    ),

];
export const commonConfig = {
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[chunkhash].js'
    },
};

// Server.

export const serverPlugins = [
    new webpack.optimize.UglifyJsPlugin({
        // beautify: true,
        mangle: false, // to ensure process.env still works
        output: {
            comments: false
        },
        compress: {
            warnings: false,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
            negate_iife: false // we need this for lazy v8
        },
        sourceMap: true
    }),
];
export const serverConfig = {
    target: 'node',
    entry: helpers.root('src/main.node.aot'),
    output: {
        filename: 'index.js',
        chunkFilename: '[id].bundle.js',
        crossOriginLoading: false
    },
    node: {
        global: true,
        crypto: true,
        process: true,
        Buffer: true
    }
};

export default [
    // Client
    webpackMerge(clone(__clientConfig()), clone(commonConfig), { plugins: [].concat(commonPlugins) }),

    // Server
    webpackMerge(clone(__serverConfig()), clone(commonConfig), serverConfig, { plugins: [].concat(commonPlugins, serverPlugins) })
];
