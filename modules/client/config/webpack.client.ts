const helpers = require('./helpers');

// Client.
export var clientPlugins = [

];
export var clientConfig = {
    target: 'web',
    entry: './src/client',
    output: {
        path: helpers.root('dist/client')
    },
    node: {
        global: true,
        crypto: 'empty',
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false
    }
};
