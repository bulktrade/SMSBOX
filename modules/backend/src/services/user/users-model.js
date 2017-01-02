'use strict';

const knex = require('knex');
const config = require('./../../config');

const db = knex({
  client: config.databaseClient,
  useNullAsDefault: true,
  connection: {
    host: config.databaseHost,
    user: config.databaseUser,
    password: config.databasePassword,
    database: config.databaseName
  }
});

module.exports = db;
