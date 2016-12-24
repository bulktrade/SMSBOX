var _crypto = require("crypto-js");
var secretKey = require('./../../config').secretKey;

exports.default = function (options) {
  return function (hook) {
    if (hook.type !== 'before') {
      throw new Error('The \'encryptPassword\' hook should only be used as a \'before\' hook.');
    }

    if (hook.method !== 'update' && hook.method !== 'create') {
      throw new Error('The \'encryptPassword\' hook should only be used as a \'update\' or \'create\' hook.');
    }

    if (hook.data === undefined) {
      return hook;
    }

    var dataToCheck = hook.data,
      passwordField;

    if (options) {
      if (options.hasOwnProperty('passwordField')) {
        passwordField = options.passwordField;
      } else {
        passwordField = defaults.passwordField;
      }
    } else {
      passwordField = defaults.passwordField;
    }

    if (!dataToCheck[ passwordField ]) {
      return hook;
    }

    // Encrypt
    var ciphertext = _crypto.AES.encrypt(dataToCheck[ passwordField ], secretKey);

    dataToCheck[ passwordField ] = ciphertext.toString();

    return hook;
  };
};

var defaults = { passwordField: 'password' };

module.exports = exports[ 'default' ];
