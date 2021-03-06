'use strict';

const authentication = require('feathers-authentication');
const local = require('feathers-authentication-local');
const jwt = require('feathers-authentication-jwt');
const LocalVerifier = require('./auth-verifier');

module.exports = function () {
  const app = this;

  app.configure(authentication({ secret: process.env.BACKEND_SECRET_KEY }))
    .configure(local({ Verifier: LocalVerifier, usernameField: 'username' }))
    .configure(jwt());

  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate('local')
      ]
    }
  });
};
