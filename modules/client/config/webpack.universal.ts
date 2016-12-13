import { commonConfig, commonPlugins } from "./webpack.common";
import { serverConfig, serverPlugins } from "./webpack.server";
import { clientConfig, clientPlugins } from "./webpack.client";

const clone = require('js.clone');
const webpackMerge = require('webpack-merge');

export default [
  // Client
  webpackMerge(clone(commonConfig), clientConfig, { plugins: clientPlugins.concat(commonPlugins) }),

  // Server
  webpackMerge(clone(commonConfig), serverConfig, { plugins: serverPlugins.concat(commonPlugins) })
];
