const connection = require('./src/config').connect;
const path = require('path');

module.exports = {

    development: {
        client: 'mysql',
        connection: connection,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: path.join(__dirname, 'migrations'),
            tableName: 'smsbox'
        }
    }

};
