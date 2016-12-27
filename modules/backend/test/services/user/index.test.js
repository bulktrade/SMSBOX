'use strict';

const assert = require('assert');
const request = require('request');
const app = require('../../../src/app');

describe('user service', function () {
  let credentials = {
    email: 'admin@smsc.io',
    password: 'admin',
  };

  let accessToken = '';

  it('registered the user service', () => {
    assert.ok(app.service('user'));
  });

  it('authentication', (done) => {
    request.post({
      url: 'http://localhost:3030/authentication',
      form: { email: credentials.email, password: credentials.password }
    }, function (err, httpResponse, body) {
      assert.equal(201, httpResponse.statusCode);
      assert.ok(JSON.parse(body).accessToken);
      accessToken = JSON.parse(body).accessToken;
      done(err);
    });
  });

  it('shows the user data', (done) => {
    request.get({
      url: 'http://localhost:3030/user',
      headers: {
        'Authorization': accessToken,
      }
    }, function (err, httpResponse, body) {
      assert.equal(200, httpResponse.statusCode);
      done(err);
    });
  });
});
