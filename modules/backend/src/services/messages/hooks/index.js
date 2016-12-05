'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

exports.before = {
	all: [
		auth.verifyToken(),
		auth.populateUser(),
		auth.restrictToAuthenticated()
	],
	find: [
		globalHooks.restrictToOwner({ idField: 'id', as: 'USER_ID', adminRole: 'ADMIN' })
	],
	get: [
		globalHooks.restrictToOwner({ idField: 'id', as: 'USER_ID', adminRole: 'ADMIN' })
	],
	create: [],
	update: [],
	patch: [],
	remove: []
};

exports.after = {
	all: [],
	find: [],
	get: [],
	create: [],
	update: [],
	patch: [],
	remove: []
};
