'use strict';

const service = require('feathers-knex');
const users = require('./users-model');
const hooks = require('./hooks');

module.exports = function () {
	const app = this;

	const options = {
		Model: users,
		name: 'USER',
		paginate: {
			default: 5,
			max: 25
		}
	};

	// Initialize our service with any options it requires
	app.use('/user', service(options));

	// Get our initialize service to that we can bind hooks
	const userService = app.service('/user');

	// Set up our before hooks
	userService.before(hooks.before);

	// Set up our after hooks
	userService.after(hooks.after);
};
