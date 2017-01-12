const path = require('path');

module.exports = {

  development: {
    client: process.env.BACKEND_DATABASE_CLIENT,
    useNullAsDefault: true,
    connection: {
      host: process.env.BACKEND_DATABASE_HOST,
      user: process.env.BACKEND_DATABASE_USER,
      password: process.env.BACKEND_DATABASE_PASSWORD,
      database: process.env.BACKEND_DATABASE_NAME
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
