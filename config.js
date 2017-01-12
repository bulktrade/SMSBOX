// backend environment variables
process.env.BACKEND_PORT = process.env.BACKEND_PORT ? process.env.BACKEND_PORT : 3030;
process.env.BACKEND_HOST = process.env.BACKEND_HOST ? process.env.BACKEND_HOST : 'localhost';
process.env.BACKEND_SECRET_KEY = process.env.BACKEND_SECRET_KEY ? process.env.BACKEND_SECRET_KEY : 'smsbox';

process.env.BACKEND_DATABASE_CLIENT = process.env.BACKEND_DATABASE_CLIENT ? process.env.BACKEND_DATABASE_CLIENT : 'mysql';
process.env.BACKEND_DATABASE_HOST = process.env.BACKEND_DATABASE_HOST ? process.env.BACKEND_DATABASE_HOST : '127.0.0.1';
process.env.BACKEND_DATABASE_USER = process.env.BACKEND_DATABASE_USER ? process.env.BACKEND_DATABASE_USER : 'root';
process.env.BACKEND_DATABASE_PASSWORD = process.env.BACKEND_DATABASE_PASSWORD ? process.env.BACKEND_DATABASE_PASSWORD : '';
process.env.BACKEND_DATABASE_NAME = process.env.BACKEND_DATABASE_NAME ? process.env.BACKEND_DATABASE_NAME : 'smsbox';

process.env.BACKEND_MAILER_SERVISE = process.env.BACKEND_MAILER_SERVISE ? process.env.BACKEND_MAILER_SERVISE : ''; // See supported services https://github.com/nodemailer/nodemailer-wellknown#supported-services
process.env.BACKEND_MAILER_USERNAME = process.env.BACKEND_MAILER_USERNAME ? process.env.BACKEND_MAILER_USERNAME : '';
process.env.BACKEND_MAILER_PASSWORD = process.env.BACKEND_MAILER_PASSWORD ? process.env.BACKEND_MAILER_PASSWORD : '';

// client environment variables
process.env.CLIENT_PORT = process.env.CLIENT_PORT ? process.env.CLIENT_PORT : 8080;

