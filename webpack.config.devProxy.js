const path = require('path');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const IS_DEV = (process.env.NODE_ENV === 'dev');
const dirAssets = path.join(__dirname, 'build/styles');

module.exports = merge(webpackConfig, {

    devtool: 'eval',

    output: {
        pathinfo: true,
        publicPath: 'http://localhost:8080/scripts/',
        filename: '[name].js'
    },

    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/': {
                target: "http://www.webpack.test/", // this is the watched server - like php site
                changeOrigin: true,
                secure: false
            }
        }
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new BrowserSyncPlugin({
            proxy: 'http://localhost:8080',
            files: [{
                match: [
                    '**/*.php',
                    '**/*.html'
                ],
                fn: function(event, file) {
                    if (event === "change") {
                        const bs = require('browser-sync').get('bs-webpack-plugin');
                        bs.reload();
                    }
                }
            }]
        }, {
            reload: false
        })
    ],

    module: {
        rules: [
            // CSS / SASS
            {
                test: /\.(css|scss)/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
                            includePaths: [dirAssets]
                        }
                    }
                ]
            }
        ]
    }

});