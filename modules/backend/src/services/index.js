'use strict';
const messages = require('./messages');
const user = require('./user');
const authentication = require('./authentication');
const users = require('./users');
const Sequelize = require('sequelize');
module.exports = function() {
  const app = this;

  const sequelize = new Sequelize(app.get('mysql'), {
    dialect: 'mysql',
    logging: false
  });
  app.set('sequelize', sequelize);

  app.configure(authentication);
  app.configure(users);
  app.configure(user);
  app.configure(messages);
};
