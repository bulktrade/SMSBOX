const path = require('path');
const config = require('./../../../config');

process.env.NODE_CONFIG_DIR = path.join(__dirname, '../config');
process.env.NODE_ENV = 'development';
