'use strict';

const knex = require('knex');

module.exports = function (app) {
  const dbConfig = app.get('database');

  return knex({
    client: process.env.BACKEND_DATABASE_CLIENT ? process.env.BACKEND_DATABASE_CLIENT : dbConfig.client,
    useNullAsDefault: true,
    connection: {
      host: process.env.BACKEND_DATABASE_HOST ? process.env.BACKEND_DATABASE_HOST : dbConfig.host,
      user: process.env.BACKEND_DATABASE_USER ? process.env.BACKEND_DATABASE_USER : dbConfig.user,
      password: process.env.BACKEND_DATABASE_PASSWORD ? process.env.BACKEND_DATABASE_PASSWORD : dbConfig.password,
      database: process.env.BACKEND_DATABASE_NAME ? process.env.BACKEND_DATABASE_NAME : dbConfig.name
    }
  });
};
