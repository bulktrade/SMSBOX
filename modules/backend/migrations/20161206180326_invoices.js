var defaultData = [
    {
        'ID': '1',
        'AMOUNT': '345678687',
        'USER_ID': '1'
    }
];

exports.up = function (knex, Promise) {

    return Promise.all([

        knex.schema.createTable('INVOICE', function (table) {
            table.increments('ID');
            table.string('AMOUNT');
            table.string('USER_ID');
        }),

        knex('INVOICE').insert(defaultData)

    ])

};

exports.down = function (knex, Promise) {

    return Promise.all([
        knex.schema.dropTable('INVOICE')
    ])

};
