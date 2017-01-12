'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

let _createClass = (function () {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      let descriptor = props[ i ];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) {
        descriptor.writable = true;
      }
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) {
      defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
      defineProperties(Constructor, staticProps);
    }
    return Constructor;
  };
})();

const _debug = require('debug');

const _debug2 = _interopRequireDefault(_debug);

const _crypto = require('crypto-js');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[ key ] = value;
  }
  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

let debug = (_debug2.default)('feathers-authentication-local:verify');

let LocalVerifier = (function () {
  function LocalVerifier(app) {
    let options = arguments.length > 1 && arguments[ 1 ] !== undefined ? arguments[ 1 ] : {};

    _classCallCheck(this, LocalVerifier);

    this.app = app;
    this.options = options;
    this.service = typeof options.service === 'string' ? app.service(options.service) : options.service;

    if (!this.service) {
      throw new Error('options.service does not exist.\n\tMake sure you are passing a valid service path or service instance and it is initialized before feathers-authentication-local.');
    }

    this._comparePassword = this._comparePassword.bind(this);
    this._normalizeResult = this._normalizeResult.bind(this);
    this.verify = this.verify.bind(this);
  }

  _createClass(LocalVerifier, [ {
    key: '_comparePassword',
    value: function _comparePassword(entity, password) {
      let decrypted = entity[ this.options.passwordField ];

      if (!decrypted) {
        return Promise.reject(new Error('\'' + this.options.entity + '\' record in the database is missing a \'' + this.options.passwordField + '\''));
      }

      decrypted = _crypto.AES.decrypt(decrypted,
        process.env.BACKEND_SECRET_KEY).toString(_crypto.enc.Utf8);

      debug('Verifying password');

      return new Promise(function (resolve, reject) {

        if (decrypted === password) {
          debug('Password correct');
          return resolve(entity);
        } else {
          debug('Password incorrect');
          return reject(false);
        }

      });
    }
  }, {
    key: '_normalizeResult',
    value: function _normalizeResult(results) {
      // Paginated services return the array of results in the data attribute.
      let entities = results.data ? results.data : results;
      let entity = entities[ 0 ];

      // Handle bad username.
      if (!entity) {
        return Promise.reject(false);
      }

      debug(this.options.entity + ' found');
      return Promise.resolve(entity);
    }
  }, {
    key: 'verify',
    value: function verify(req, username, password, done) {
      let _query,
        _this = this;

      debug('Checking credentials', username, password);
      let query = (_query = {}, _defineProperty(_query, '$limit', 1), _query);
      query[ '$or' ] = [
        { email: username },
        { telephoneNumber: username }
      ];

      // Look up the entity
      this.service.find({ query: query }).then(this._normalizeResult).then(function (entity) {
        return _this._comparePassword(entity, password);
      }).then(function (entity) {
        let id = entity[ _this.service.id ];
        let payload = _defineProperty({}, _this.options.entity + 'Id', id);
        done(null, entity, payload);
      }).catch(function (error) {
        return error ? done(error) : done(null, error);
      });
    }
  } ]);

  return LocalVerifier;
})();

exports.default = LocalVerifier;
module.exports = exports[ 'default' ];
