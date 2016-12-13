/**
 * @author: @AngularClass
 */
var path = require('path');

// Helper functions
var ROOT = path.resolve(__dirname, '..');

function hasProcessFlag(flag) {
    return process.argv.join('').indexOf(flag) > -1;
}

function isWebpackDevServer() {
    return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [ROOT].concat(args));
}

// Helpers
function includeClientPackages(packages, localModule) {
    return function(context, request, cb) {
        if (localModule instanceof RegExp && localModule.test(request)) {
            return cb();
        }
        if (packages instanceof RegExp && packages.test(request)) {
            return cb();
        }
        if (Array.isArray(packages) && packages.indexOf(request) !== -1) {
            return cb();
        }
        if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
            return cb(null, 'commonjs ' + request);
        }
        return cb();
    };
}

exports.hasProcessFlag = hasProcessFlag;
exports.isWebpackDevServer = isWebpackDevServer;
exports.includeClientPackages = includeClientPackages;
exports.root = root;
