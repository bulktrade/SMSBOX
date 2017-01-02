const env = 'development';
const databaseClient = 'mysql';
const databaseHost = '127.0.0.1';
const databaseUser = 'root';
const databasePassword = '';
const databaseName = 'smsbox';
const secretKey = 'smsbox';

exports.env = process.env.ENV ? process.env.ENV : env;
exports.databaseClient = process.env.DATABASE_CLIENT ? process.env.DATABASE_CLIENT : databaseClient;
exports.databaseHost = process.env.DATABASE_HOST ? process.env.DATABASE_HOST : databaseHost;
exports.databaseUser = process.env.DATABASE_USER ? process.env.DATABASE_USER : databaseUser;
exports.databasePassword = process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : databasePassword;
exports.databaseName = process.env.DATABASE_NAME ? process.env.DATABASE_NAME : databaseName;
exports.secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : secretKey;
