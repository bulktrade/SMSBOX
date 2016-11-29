'use strict';

const service = require('feathers-knex');
const invoices = require('./invoices-model');
const hooks = require('./hooks');

module.exports = function () {
	const app = this;

	const options = {
		Model: invoices,
		name: 'INVOICE',
		paginate: {
			default: 5,
			max: 25
		}
	};

	// Initialize our service with any options it requires
	app.use('/invoices', service(options));

	// Get our initialize service to that we can bind hooks
	const invoicesService = app.service('/invoices');

	// Set up our before hooks
	invoicesService.before(hooks.before);

	// Set up our after hooks
	invoicesService.after(hooks.after);
};
