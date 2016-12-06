var defaultData = [
    {
        'TELEPHONE_NUMBER': '+380983418360',
        'MESSAGE_TEXT': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'DATE': '2016-11-12',
        'STATE': 'received',
        'USER_ID': '1'
    },
    {
        'TELEPHONE_NUMBER': '+380983418360',
        'MESSAGE_TEXT': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'DATE': '2016-11-17',
        'STATE': 'outgoing',
        'USER_ID': '2'
    },
    {
        'TELEPHONE_NUMBER': '+380983417361',
        'MESSAGE_TEXT': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'DATE': '2016-12-12',
        'STATE': 'received',
        'USER_ID': '1'
    }
];

exports.up = function (knex, Promise) {

    return Promise.all([

        knex.schema.createTable('MESSAGE', function (table) {
            table.increments('ID');
            table.string('TELEPHONE_NUMBER');
            table.string('MESSAGE_TEXT');
            table.string('DATE');
            table.string('STATE');
            table.string('USER_ID');
        }),

        knex('MESSAGE').insert(defaultData)

    ])

};

exports.down = function (knex, Promise) {

    return Promise.all([
        knex.schema.dropTable('MESSAGE')
    ])

};
