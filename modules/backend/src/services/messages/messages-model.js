'use strict';

const knex = require('knex');
const connection = require('./../../connection-properties');
const messagesData = require('./messages-data');

const db = knex({
	client: 'mysql',
	useNullAsDefault: true,
	connection: connection
});

const tableName = 'MESSAGE';

// Clean up our data. This is optional and is here
// because of our integration tests
db.schema.dropTableIfExists(tableName).then(function () {
	console.log('Dropped MESSAGE table');

	// Initialize your table
	return db.schema.createTable(tableName, function (table) {
		console.log('Creating MESSAGE table');

		table.increments('ID');
		table.string('TELEPHONE_NUMBER');
		table.string('MESSAGE_TEXT');
		table.date('DATE');
		table.string('STATE');
		table.string('USER_ID');
	}).then(function () {
		return db(tableName).insert(messagesData);
	});
});

module.exports = db;
