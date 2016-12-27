'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [ auth.authenticate('jwt') ],
  find: [
    globalHooks.hasRoleOrRestrict({
      roles: [ 'ADMIN' ],
      fieldName: 'permissions',
      idField: 'id',
      restrict: { approved: true }
    })
  ],
  get: [
    globalHooks.hasRoleOrRestrict({
      roles: [ 'ADMIN' ],
      fieldName: 'permissions',
      idField: 'id',
      restrict: { approved: true }
    })
  ],
  create: [
    globalHooks.encryptPassword()
  ],
  update: [
    globalHooks.encryptPassword()
  ],
  patch: [],
  remove: []
};

exports.after = {
  all: [ hooks.remove('password') ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
