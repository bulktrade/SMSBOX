const helpers = require('./helpers');
const webpack = require('webpack');

export const commonConfig = {
    // https://webpack.github.io/docs/configuration.html#devtool
    devtool: 'source-map',
    resolve: {

        /*
         * An array of extensions that should be used to resolve modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
         */
        extensions: ['.ts', '.js', '.json'],

        // An array of directory names to be resolved to the current directory
        modules: [helpers.root('src'), 'node_modules'],

    },
    // context: __dirname,
    output: {
        publicPath: '',
        filename: '[name].bundle.js'
    },
    module: {

        rules: [

            /*
             * Typescript loader support for .ts and Angular 2 async routes via .async.ts
             * Replace templateUrl and stylesUrl with require()
             *
             * See: https://github.com/s-panferov/awesome-typescript-loader
             * See: https://github.com/TheLarkInn/angular2-template-loader
             */
            {
                test: /\.ts$/,
                loaders: [
                    '@angularclass/hmr-loader',
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },

            /*
             * Json loader support for *.json files.
             *
             * See: https://github.com/webpack/json-loader
             */
            {
                test: /\.json$/,
                loader: 'json-loader'
            },

            /*
             * to string and css loader support for *.css files
             * Returns file content as string
             *
             */
            { test: /(\.css$)/, loaders: ['style-loader', 'css-loader', 'postcss-loader'] },

            /* Raw loader support for *.html
             * Returns file content as string
             *
             * See: https://github.com/webpack/raw-loader
             */
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [helpers.root('src/index.html')]
            },

            /* File loader for supporting images, for example, in CSS files.
             */
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader'
            },

            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'raw-loader!sass-loader'
            },

            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },

            // Bootstrap 4
            { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' }

        ]

    },
    plugins: [
        // Use commonPlugins.
    ]

};

export const commonPlugins = [
    new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
        helpers.root('./src'),
        {
            // your Angular Async Route paths relative to this root directory
        }
    ),

    // Loader options
    new webpack.LoaderOptionsPlugin({

    }),

];