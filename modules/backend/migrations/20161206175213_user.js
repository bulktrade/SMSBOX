var defaultData = [
    {
        'id': '1',
        'gender': 'male',
        'firstName': 'John',
        'surname': 'Mayer',
        'emailAddress': 'johnmayer@logist.io',
        'mobilePhoneNumber': '0963486543',
        'password': 'U2FsdGVkX19aNj43R9CqM8ffafT3hqr7EE0X6RaVzu4='
    }
];

exports.up = function (knex, Promise) {

    return Promise.all([

        knex.schema.createTable('USER', function (table) {
            table.increments('id');
            table.string('gender');
            table.string('firstName');
            table.string('surname');
            table.string('emailAddress');
            table.string('mobilePhoneNumber');
            table.string('password');
        }),

        knex('USER').insert(defaultData)

    ])

};

exports.down = function (knex, Promise) {

    return Promise.all([
        knex.schema.dropTable('USER')
    ])

};
