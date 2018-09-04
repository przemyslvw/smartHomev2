const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src/scripts/lib');
const dirAssets = path.join(__dirname, 'src/styles');

module.exports = {
    entry: {
        main: path.join(dirApp, 'main') // here you can add another entries -> anotherEntry: path.join(dirApp, 'anotherEntry')
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets
        ]
    },
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true,
                    presets: [
                        ['env', {
                            modules: false,
                            browsers: ['ie >= 10']
                        }], 'stage-1'
                    ],
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            },

            // FONTS
            {
                test: /\.(woff|woff2|otf|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'styles/fonts/[name]/[name].[ext]'
                    }
                }]
            },
            // IMAGES
            {
                test: /\.(png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name].[ext]'
                    }
                }]
            },
            // MEDIA
            {
                test: /\.(mp4|ogg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        // HIDE/DELETE if you do not need html templates (ie. you have PHP site on nginx or apache -> then use devProxy for dev mode)
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/templates/index.html'),
            filename: 'index.html'
        }),

        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        })
    ]
};
console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
console.log("powered by majrin")