var defaultData = [
    {
        'email': 'admin@smsc.io',
        'password': 'U2FsdGVkX19aNj43R9CqM8ffafT3hqr7EE0X6RaVzu4=',
        'permissions': 'ADMIN'
    },
    {
        'email': 'user@smsc.io',
        'password': 'U2FsdGVkX1/AdqdIaIa26bX2MbRcrgYC2pXbzqGVrYA=',
        'permissions': 'USER'
    },
    {
        'email': 'guest@smsc.io',
        'password': 'U2FsdGVkX1+WYXfMUiKlZm1BY73ZU7Shk+MVNJdwjc0=',
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
