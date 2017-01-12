'use strict';

const knex = require('knex');

module.exports = function (app) {
  return knex({
    client: process.env.BACKEND_DATABASE_CLIENT,
    useNullAsDefault: true,
    connection: {
      host: process.env.BACKEND_DATABASE_HOST,
      user: process.env.BACKEND_DATABASE_USER,
      password: process.env.BACKEND_DATABASE_PASSWORD,
      database: process.env.BACKEND_DATABASE_NAME
    },
  });
};
