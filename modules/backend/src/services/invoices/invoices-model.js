'use strict';

const knex = require('knex');
const connection = require('./../../connection-properties');

const db = knex({
	client: 'mysql',
	useNullAsDefault: true,
	connection: connection
});

const tableName = 'invoice';

// Clean up our data. This is optional and is here
// because of our integration tests
db.schema.dropTableIfExists(tableName).then(function () {
	console.log('Dropped invoice table');

	// Initialize your table
	return db.schema.createTable(tableName, function (table) {
		console.log('Creating invoice table');

		table.increments('id');
		table.string('sentBy');
	})
});

module.exports = db;
