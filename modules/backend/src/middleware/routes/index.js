const _crypto = require('crypto-js');
const errors = require('feathers-errors');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('./../../config');

module.exports = function (app) {

  return router.post('/send-mail', function (req, res, next) {
    const to = req.body[ 'email' ] || ''; // sender address

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: config.nodemailService,
      auth: {
        user: config.nodemailUsername,
        pass: config.nodemailPassword
      }
    });

    const query = { email: to };

    app.service('users').find({ query: query })
      .then(function (results) {
        const entities = results.data ? results.data : results;
        const entity = entities[ 0 ];

        // Handle bad username.
        if (!entity) {
          next(new errors.NotFound(`User ${to} not found`));
          return Promise.reject(false);
        }

        return Promise.resolve(entity);
      })
      .then(function (entity) {

        const forgottenPassword = _crypto.AES.decrypt(entity[ 'password' ], config.secretKey);

        // setup e-mail data with unicode symbols
        const mailOptions = {
          from: config.nodemailUsername, // sender address
          to: to, // list of receivers
          subject: 'Restore password', // Subject line
          text: `
            Your email: ${to}
            Your password: ${forgottenPassword.toString(_crypto.enc.Utf8)}
          `,
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return res.status(error.responseCode).send(error);
          }
          res.status(201).send({ 'Message sent': info });
        });

      })
  });

};
