'use strict';

// Add any common hooks you want to share across services in here.
// 
// Below is an example of how a hook is written and exported. Please
// see http://docs.feathersjs.com/hooks/readme.html for more details
// on hooks.

var encryptPassword = require('./before/encrypt-password');
var decryptPassword = require('./after/decrypt-password');
var hasRoleOrRestrict = require('./before/has-role-or-restrict');
var queryWithCurrentUser = require('./before/query-with-current-user');
var restrictToOwner = require('./before/restrict-to-owner');

exports.encryptPassword = encryptPassword;
exports.decryptPassword = decryptPassword;
exports.hasRoleOrRestrict = hasRoleOrRestrict;
exports.queryWithCurrentUser = queryWithCurrentUser;
exports.restrictToOwner = restrictToOwner;
