/* 
author: majrin
*/
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// postcss plugins
const postcssCssnext = require('postcss-cssnext');
const precss = require('precss');

const IS_DEV = (process.env.NODE_ENV === 'dev');
const dirAssets = path.join(__dirname, 'build/styles');

module.exports = merge(webpackConfig, {

    // devtool: 'source-map', // uncomment if you want to generate source maps to compiled js and css files

    output: {
        path: path.join(__dirname, 'build'),
        filename: 'scripts/[name].js'
    },

    plugins: [
        new CleanWebpackPlugin(['build']),

        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: 'styles/[id].css'
        })
    ],

    module: {
        rules: [
            // CSS / SASS
            {
                test: /\.(css|scss)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV,
                            includePaths: [dirAssets]
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                precss(),
                                postcssCssnext({
                                    features: {
                                        autoprefixer: {
                                            grid: false
                                        }
                                    }
                                })
                            ]
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