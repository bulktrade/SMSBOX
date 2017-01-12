'use strict';

const assert = require('assert');
const request = require('request');
const app = require('../../../src/app');

describe('messages service', function () {
  let credentials = {
    username: 'admin@smsc.io',
    password: 'admin',
  };

  let accessToken = '';

  it('registered the messages service', () => {
    assert.ok(app.service('messages'));
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

  it('shows the messages data', (done) => {
    request.get({
      url: 'http://localhost:3030/messages',
      headers: {
        'Authorization': accessToken,
      }
    }, function (err, httpResponse, body) {
      assert.equal(200, httpResponse.statusCode);
      done(err);
    });
  });
});
