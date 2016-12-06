var defaultData = [
    {
        'email': 'admin@smsc.io',
        'password': '$2a$10$0Uk/Si20QcvzYkrkHZWXGe7iPy5VU9AQBnAwFBH9eNuTS/71S7mD6',
        'permissions': 'ADMIN'
    },
    {
        'email': 'user@smsc.io',
        'password': '$2a$10$WoBlxhh5ekxyebIOjnmBYeXNcyRZlgEnU22oGhh9PAfU..ffC1Pfq',
        'permissions': 'USER'
    },
    {
        'email': 'guest@smsc.io',
        'password': '$2a$10$ENDfpYGeuJI7DmHX6OwmFOUwX6mqUuCsYie6KN2N3yk7CnzyFOYjC',
        'permissions': 'GUEST'
    }
];

exports.up = function (knex, Promise) {

    return Promise.all([

        knex.schema.createTable('users', function (table) {
            table.increments('id');
            table.string('email');
            table.string('permissions');
            table.string('password');
        }),

        knex('users').insert(defaultData)

    ])

};

exports.down = function (knex, Promise) {

    return Promise.all([
        knex.schema.dropTable('users')
    ])

};
