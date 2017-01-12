[![Build Status](https://travis-ci.org/bulktrade/SMSBOX.svg?branch=master)](https://travis-ci.org/bulktrade/SMSBOX)

# SMSBOX
Simple sms portal with billing and free sms.

## Environment Variables
	BACKEND_HOST = localhost
	
Is the hostname or IP address to connect to backend app (defaults to 'localhost')
	
	BACKEND_SECRET_KEY = smsbox
	
Is a variable that is used with an algorithm to encrypt and decrypt code
	
	BACKEND_DATABASE_CLIENT = mysql
	
The client parameter is required and determines which client adapter will be used with the library.
	
	BACKEND_DATABASE_NAME = smsbox
	
Sets database name
	
	BACKEND_DATABASE_HOST = 127.0.0.1
	
Is the hostname or IP address to connect to database (defaults to '127.0.0.1')
	
	BACKEND_DATABASE_USER = root
	
Is the username to a database
	
	BACKEND_DATABASE_PASSWORD =
	
Sets database password
	
	BACKEND_MAILER_SERVISE =
	
Can be set to the name of a well-known service so you don't have to input the port, host, and secure options (see [Using well-known services](https://www.npmjs.com/package/nodemailer#using-well-known-services))
	
	BACKEND_MAILER_USERNAME =
	
Is the username to a mail account
	
	BACKEND_MAILER_PASSWORD =
	
Is the password for the user
	
	CLIENT_PORT = 8080
	
Is the port to connect to client app (defaults to 8080)

