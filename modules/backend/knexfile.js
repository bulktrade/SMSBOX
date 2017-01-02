const config = require('./src/config');
const path = require('path');

module.exports = {

  development: {
    client: config.databaseClient,
    useNullAsDefault: true,
    connection: {
      host: config.databaseHost,
      user: config.databaseUser,
      password: config.databasePassword,
      database: config.databaseName
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, 'migrations')
    }
  }

};
