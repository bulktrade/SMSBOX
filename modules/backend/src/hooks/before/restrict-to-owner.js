var defaults = {
  idField: '_id',
  as: 'userId',
  adminRole: 'admin'
};

/**
 * It only allows the user to retrieve resources that are owned by them. ADMIN role gets all data
 * @param options
 * @return {Function}
 */
exports.default = function (options) {
  return function (hook) {
    if (hook.type !== 'before') {
      throw new Error('The \'queryWithCurrentUser\' hook should only be used as a \'before\' hook.');
    }

    if (!hook.params.user) {
      if (!hook.params.provider) {
        return hook;
      }

      throw new Error('There is no current user to associate.');
    }

    options = Object.assign({}, defaults, hook.app.get('auth'), options);

    var id = hook.params.user[ options.idField ];
    var adminRoleName = options.adminRole;

    if (id === undefined) {
      throw new Error('Current user is missing \'' + options.idField + '\' field.');
    }

    if (hook.params.user.permissions !== adminRoleName) {
      hook.params.query[ options.as ] = id;
    }
  };
};

module.exports = exports[ 'default' ];
