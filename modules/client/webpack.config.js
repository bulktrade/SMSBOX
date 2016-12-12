/**
 * @author: @AngularClass
 */

// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack/webpack.prod.js')({env: 'production'});
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack/webpack.test.js')({env: 'test'});
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack/webpack.dev.js')({env: 'development'});
}
