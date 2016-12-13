const helpers = require('./helpers');

// Server.
export var serverPlugins = [

];
export var serverConfig = {
    target: 'node',
    entry: './src/server', // use the entry file of the node server if everything is ts rather than es5
    output: {
        filename: 'index.js',
        path: helpers.root('dist/server'),
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            { test: /@angular(\\|\/)material/, use: "imports-loader?window=>global" }
        ],
    },
    externals: helpers.includeClientPackages(
        /@angularclass|@angular|angular2-|ng2-|ng-|@ng-|angular-|@ngrx|ngrx-|@angular2|ionic|@ionic|-angular2|-ng2|-ng/
    ),
    node: {
        global: true,
        crypto: true,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: true
    }
};