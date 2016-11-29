'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('payment-histories service', function() {
  it('registered the payment-histories service', () => {
    assert.ok(app.service('payment-histories'));
  });
});
