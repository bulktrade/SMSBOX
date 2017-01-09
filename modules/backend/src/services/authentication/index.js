'use strict';

const authentication = require('feathers-authentication');
const local = require('feathers-authentication-local');
const jwt = require('feathers-authentication-jwt');
const LocalVerifier = require('./auth-verifier');

module.exports = function () {
  const app = this;

  app.configure(authentication({ secret: app.get('secretKey') }))
    .configure(local({ Verifier: LocalVerifier }))
    .configure(jwt());

  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate('local')
      ]
    }
  });
};
