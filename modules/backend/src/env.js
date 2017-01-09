const path = require('path');

process.env.NODE_CONFIG_DIR = path.join(__dirname, '../config');
process.env.NODE_ENV = 'development';
