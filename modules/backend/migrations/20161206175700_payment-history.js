var defaultData = [
    {
        'ID': '1',
        'PRICE': '345678687',
        'USER_ID': '1'
    }
];

exports.up = function (knex, Promise) {

    return Promise.all([

        knex.schema.createTable('PAYMENT_HISTORY', function (table) {
            table.increments('ID');
            table.string('PRICE');
            table.string('USER_ID');
        }),

        knex('PAYMENT_HISTORY').insert(defaultData)

    ])

};

exports.down = function (knex, Promise) {

    return Promise.all([
        knex.schema.dropTable('PAYMENT_HISTORY')
    ])

};
