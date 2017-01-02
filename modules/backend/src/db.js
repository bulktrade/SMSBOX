const config = require('./../knexfile.js');
const env = require('./config').env;
const knex = require('knex')(config[ env ]);

module.exports = knex;

knex.migrate.latest([ config ]);
