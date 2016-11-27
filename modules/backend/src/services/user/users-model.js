'use strict';

const knex = require('knex');
const usersData = require('./users-data');

const db = knex({
	client: 'mysql',
	useNullAsDefault: true,
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'smsbox'
	}
});

const tableName = 'users';

// Clean up our data. This is optional and is here
// because of our integration tests
db.schema.dropTableIfExists(tableName).then(function () {
	console.log('Dropped users table');

	// Initialize your table
	return db.schema.createTable(tableName, function (table) {
		console.log('Creating users table');

		table.increments('id');
		table.string('email');
		table.string('password');
	}).then(function () {
		return db(tableName).insert(usersData);
	});
});

module.exports = db;
