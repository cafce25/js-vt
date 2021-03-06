//TODO const CleanWebpackPlugin   = require('clean-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const path                 = require('path');
const webpack              = require('webpack');

module.exports = (_env, argv) => {
    const mode = argv.mode;
    const outputDirectory = "dist/" + mode;
    const entry = {};
    argv.mode = mode === "production" ? "production" : "development";
    entry[`main`] = "./source/index.js";

    const stats = {
        builtAt:      true,
        children:     false,
        chunks:       false,
        chunkGroups:  false,
        chunkModules: false,
        chunkOrigins: false,
        colors:       true,
        entrypoints:  true,
    };
    const plugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(mode),
        }),
        // http://stackoverflow.com/questions/29080148/expose-jquery-to-real-window-object-with-webpack
        new webpack.ProvidePlugin({
            // automatically provede jquery as jquery, jQuery and $
            jquery: "jquery",
            jQuery: "jquery",
            $: "jquery",
            process: 'process/browser'
        })
    ];

    if (mode !== "test") {
        plugins.push( new HtmlWebpackPlugin({
            title: "js-vt" + (mode === "production" ? "" : ' - ' + mode),
            template: "source/index.html",
            //favicon: "source/assets/favicon.ico",
            googleAnalytics: {
                trackingId: 'UA-100157497-1'
            },
            meta: {},
            minify: mode === "production" && {
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: false,
                collapseWhitespace: false,
                conservativeCollapse: false,
                html5: true,
                includeAutoGeneratedTags: false,
                keepClosingSlash: true,
                minifyCSS: false,
                minifyJS: false ,
                minifyURLs: false,
                preserveLineBreaks: false,
                preventAttributesEscaping: false,
                processConditionalComments: false,
                quoteCharacter: "\"",
                removeAttributeQuotes: false,
                removeComments: false,
                removeEmptyAttributes: false,
                removeEmptyElements: false,
                removeOptionalTags: false,
                removeScriptTypeAttributes: false,
                removeStyleLinkTypeAttributes: false,
                removeTagWhitespace: false,
                sortAttributes: false,
                sortClassName: false,
                useShortDoctype: false
            },
        }));
    }

    const rules = [];

    rules.push({
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
        }
    }, {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
    }, {
        test: /\.s?css$/,
        use: mode === "test" ? 'null-loader' : [
            "css-loader",
            "sass-loader"
        ]
    }, {
        test: /\.(png|xml|svg|webmanifest)$/,
        type: 'asset/resource',
    });
    return {
        plugins,
        target: "web",
        entry,
        devtool: "source-map",
        output: {
            path: path.resolve(__dirname, outputDirectory),
            publicPath: "",
            assetModuleFilename: "[base]",
        },
        module: { rules },
        optimization: {
            removeAvailableModules: true,
            removeEmptyChunks: true,
            mergeDuplicateChunks: true,
            flagIncludedChunks: true,
            sideEffects: true,
            providedExports: true,
            usedExports: true,
            concatenateModules: false,
            minimize: mode === "production",
            portableRecords: true,
            /*splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: `${outputDirectory}/vendor`,
                        chunks: 'all'
                    }
                }
            }*/
        },
        devServer: {
            port: 8000,
            publicPath: `/`,
            stats,
        },
        resolve: {
            extensions: [
                ".tsx",
                ".ts",
                ".js",
                ".jsx",
            ],
            modules: [
                "node_modules",
                "source",
                "test",
            ],
            alias: {
                'fs': 'memfs',
                //'stream': require.resolve("stream-browserify"),
            },
        },
        stats,
    };
};
