'use strict';

const service = require('feathers-knex');
const paymentHistories = require('./../common/model');
const hooks = require('./hooks');

module.exports = function () {
	const app = this;

	const options = {
		Model: paymentHistories(app),
		name: 'PAYMENT_HISTORY',
		paginate: {
			default: 5,
			max: 25
		}
	};

	// Initialize our service with any options it requires
	app.use('/payment-histories', service(options));

	// Get our initialize service to that we can bind hooks
	const paymentHistoriesService = app.service('/payment-histories');

	// Set up our before hooks
	paymentHistoriesService.before(hooks.before);

	// Set up our after hooks
	paymentHistoriesService.after(hooks.after);
};
