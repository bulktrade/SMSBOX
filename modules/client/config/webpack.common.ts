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
                use: [
                    '@angularclass/hmr-loader',
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular-router-loader'
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
            // { test: /(\.css$)/, loaders: 'raw-loader' },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader']
            },

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

    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Tether: "tether",
        "window.Tether": "tether",
        Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
        Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
        Button: "exports-loader?Button!bootstrap/js/dist/button",
        Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
        Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
        Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
        Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
        Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
        Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
        Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
        Util: "exports-loader?Util!bootstrap/js/dist/util",
    })

];