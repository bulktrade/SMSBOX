'use strict';

const knex = require('knex');

const rows = [
	{
		"name": "Bob",
		"mood": "Sad",
		"number": 10
	},
	{
		"name": "Harry",
		"mood": "Sad",
		"number": 3
	},
	{
		"name": "Sally",
		"mood": "Happy",
		"number": 20
	},
	{
		"name": "Mary",
		"mood": "Sad",
		"number": 5
	},
	{
		"name": "John",
		"mood": "Happy",
		"number": 15
	}
];

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
		table.string('name');
		table.string('mood');
		table.integer('number');
	}).then(function () {
		return db(tableName).insert(rows);
	});
});

module.exports = db;
