'use strict';

const assert = require('assert');
const request = require('request');
const app = require('../../../src/app');

describe('payment-histories service', function () {
  let credentials = {
    username: 'admin@smsc.io',
    password: 'admin',
  };

  let accessToken = '';

  it('registered the payment-histories service', () => {
    assert.ok(app.service('payment-histories'));
  });

  it('authentication', (done) => {
    request.post({
      url: 'http://localhost:3030/authentication',
      form: { username: credentials.username, password: credentials.password }
    }, function (err, httpResponse, body) {
      assert.equal(201, httpResponse.statusCode);
      assert.ok(JSON.parse(body).accessToken);
      accessToken = JSON.parse(body).accessToken;
      done(err);
    });
  });

  it('shows the payment-histories data', (done) => {
    request.get({
      url: 'http://localhost:3030/payment-histories',
      headers: {
        'Authorization': accessToken,
      }
    }, function (err, httpResponse, body) {
      assert.equal(200, httpResponse.statusCode);
      done(err);
    });
  });
});
