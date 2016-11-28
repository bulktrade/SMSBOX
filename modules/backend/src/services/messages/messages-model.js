'use strict';

const knex = require('knex');
const connection = require('./../../connection-properties');
const messagesData = require('./messages-data');

const db = knex({
	client: 'mysql',
	useNullAsDefault: true,
	connection: connection
});

const tableName = 'message';

// Clean up our data. This is optional and is here
// because of our integration tests
db.schema.dropTableIfExists(tableName).then(function () {
	console.log('Dropped message table');

	// Initialize your table
	return db.schema.createTable(tableName, function (table) {
		console.log('Creating message table');

		table.increments('id');
		table.string('telephoneNumber');
		table.string('messageText');
		table.date('date');
		table.string('state');
	}).then(function () {
		return db(tableName).insert(messagesData);
	});
});

module.exports = db;
