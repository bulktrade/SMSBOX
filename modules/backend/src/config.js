const env = 'development';
const databaseClient = 'mysql';
const databaseHost = '127.0.0.1';
const databaseUser = 'root';
const databasePassword = '';
const databaseName = 'smsbox';
const secretKey = 'smsbox';

const nodemailService = ''; // See the list of all supported services https://github.com/andris9/nodemailer-wellknown#supported-services
const nodemailUsername = '';
const nodemailPassword = '';

exports.env = process.env.ENV ? process.env.ENV : env;
exports.databaseClient = process.env.DATABASE_CLIENT ? process.env.DATABASE_CLIENT : databaseClient;
exports.databaseHost = process.env.DATABASE_HOST ? process.env.DATABASE_HOST : databaseHost;
exports.databaseUser = process.env.DATABASE_USER ? process.env.DATABASE_USER : databaseUser;
exports.databasePassword = process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : databasePassword;
exports.databaseName = process.env.DATABASE_NAME ? process.env.DATABASE_NAME : databaseName;
exports.secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : secretKey;
exports.nodemailService = process.env.NODEMAIL_SERVICE ? process.env.NODEMAIL_SERVICE : nodemailService;
exports.nodemailUsername = process.env.NODEMAIL_USERNAME ? process.env.NODEMAIL_USERNAME : nodemailUsername;
exports.nodemailPassword = process.env.NODEMAIL_PASSWORD ? process.env.NODEMAIL_PASSWORD : nodemailPassword;
