const backendPort = 3030;
const backendHost = 'localhost';
const backendSecretKey = 'smsbox';

const backendDatabaseClient = 'sqlite3';
const backendDatabaseHost = '127.0.0.1';
const backendDatabaseUser = 'root';
const backendDatabasePassword = '';
const backendDatabaseName = 'smsbox';
const backendDatabaseFilename = './smsbox.sqlite';

const backendMailerService = '';
const backendMailerUsername = '';
const backendMailerPassword = '';

const clientPort = 8080;

// backend environment variables
process.env.BACKEND_PORT = process.env.BACKEND_PORT ? process.env.BACKEND_PORT : backendPort;
process.env.BACKEND_HOST = process.env.BACKEND_HOST ? process.env.BACKEND_HOST : backendHost;
process.env.BACKEND_SECRET_KEY = process.env.BACKEND_SECRET_KEY ? process.env.BACKEND_SECRET_KEY : backendSecretKey;

process.env.BACKEND_DATABASE_CLIENT = process.env.BACKEND_DATABASE_CLIENT ? process.env.BACKEND_DATABASE_CLIENT : backendDatabaseClient;
process.env.BACKEND_DATABASE_HOST = process.env.BACKEND_DATABASE_HOST ? process.env.BACKEND_DATABASE_HOST : backendDatabaseHost;
process.env.BACKEND_DATABASE_USER = process.env.BACKEND_DATABASE_USER ? process.env.BACKEND_DATABASE_USER : backendDatabaseUser;
process.env.BACKEND_DATABASE_PASSWORD = process.env.BACKEND_DATABASE_PASSWORD ? process.env.BACKEND_DATABASE_PASSWORD : backendDatabasePassword;
process.env.BACKEND_DATABASE_NAME = process.env.BACKEND_DATABASE_NAME ? process.env.BACKEND_DATABASE_NAME : backendDatabaseName;
process.env.BACKEND_DATABASE_FILENAME = process.env.BACKEND_DATABASE_FILENAME ? process.env.BACKEND_DATABASE_FILENAME : backendDatabaseFilename;

process.env.BACKEND_MAILER_SERVICE = process.env.BACKEND_MAILER_SERVICE ? process.env.BACKEND_MAILER_SERVICE : backendMailerService; // See supported services https://github.com/nodemailer/nodemailer-wellknown#supported-services
process.env.BACKEND_MAILER_USERNAME = process.env.BACKEND_MAILER_USERNAME ? process.env.BACKEND_MAILER_USERNAME : backendMailerUsername;
process.env.BACKEND_MAILER_PASSWORD = process.env.BACKEND_MAILER_PASSWORD ? process.env.BACKEND_MAILER_PASSWORD : backendMailerPassword;

// client environment variables
process.env.CLIENT_PORT = process.env.CLIENT_PORT ? process.env.CLIENT_PORT : clientPort;

