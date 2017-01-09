const dbConfig = require('config').get('database');
const path = require('path');

module.exports = {

  development: {
    client: dbConfig.client,
    useNullAsDefault: true,
    connection: {
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.name
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
