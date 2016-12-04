'use strict';

const knex = require('knex');
const connection = require('./../../connection-properties');
const usersData = require('./users-data');

const db = knex({
	client: 'mysql',
	useNullAsDefault: true,
	connection: connection
});

const tableName = 'USER';

// Clean up our data. This is optional and is here
// because of our integration tests
db.schema.dropTableIfExists(tableName).then(function () {
	console.log('Dropped USER table');

	// Initialize your table
	return db.schema.createTable(tableName, function (table) {
		console.log('Creating USER table');

		table.increments('id');
		table.string('gender');
		table.string('firstName');
		table.string('surname');
		table.string('emailAddress');
		table.string('mobilePhoneNumber');
		table.string('password');
	}).then(function () {
        return db(tableName).insert(usersData);
    });
});

module.exports = db;
