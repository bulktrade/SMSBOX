'use strict';

const knex = require('knex');
const connection = require('./../../connection-properties');

const db = knex({
	client: 'mysql',
	useNullAsDefault: true,
	connection: connection
});

const tableName = 'PAYMENT_HISTORY';

// Clean up our data. This is optional and is here
// because of our integration tests
db.schema.dropTableIfExists(tableName).then(function () {
	console.log('Dropped PAYMENT_HISTORY table');

	// Initialize your table
	return db.schema.createTable(tableName, function (table) {
		console.log('Creating PAYMENT_HISTORY table');

		table.increments('ID');
		table.string('SENDING_SMS');
		table.string('SENT_BY');
	});
});

module.exports = db;
