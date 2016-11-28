'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('invoices service', function() {
  it('registered the invoices service', () => {
    assert.ok(app.service('invoices'));
  });
});
