const config = require('./../knexfile.js');
const env = process.env.NODE_ENV;
const knex = require('knex')(config[ env ]);

module.exports = knex;

knex.migrate.latest([ config ]);
