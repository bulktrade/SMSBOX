'use strict';

const knex = require('knex');
const connection = require('./../../connection-properties');

const db = knex({
    client: 'mysql',
    useNullAsDefault: true,
    connection: connection
});

module.exports = db;
