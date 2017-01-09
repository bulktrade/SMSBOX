const _crypto = require('crypto-js');

const defaults = { passwordField: 'password' };

exports.default = function (options) {
  return function (hook) {
    if (hook.type !== 'after') {
      throw new Error('The \'decryptPassword\' hook should only be used as a \'after\' hook.');
    }

    if (hook.method !== 'get') {
      throw new Error('The \'decryptPassword\' hook should only be used as a \'get\' hook.');
    }

    if (hook.result === undefined) {
      return hook;
    }

    var dataToCheck = hook.result,
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

    // Decrypt
    var decrypted = _crypto.AES.decrypt(dataToCheck[ passwordField ], hook.app.get('secretKey'));

    dataToCheck[ passwordField ] = decrypted.toString(_crypto.enc.Utf8);

    return hook;
  };
};

module.exports = exports[ 'default' ];
