const connection = require('./src/config').connect;

module.exports = {

    development: {
        client: 'mysql',
        connection: connection,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'smsbox'
        }
    }

};
