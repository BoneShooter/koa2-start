const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HashOutput = require('webpack-plugin-hash-output');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('./config');

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.js']
    },
    entry: {
        index: [path.join(config.srcPath, 'index.ts')]
    },
    output: {
        hashFunction: 'md5',
        path: config.buildClient,
        publicPath: config.contextPath + '/',
        filename: 'js/[name]-[chunkhash].js',
        chunkFilename: 'js/[name]-[chunkhash].js'
    },
    performance: {
        hints: false
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                cache: true,
                uglifyOptions: {
                    output: {
                        comments: false,
                        beautify: false
                    }
                }
            })
        ]
    },
    module: {
        rules: [
            { test: /\.js$/ },
            {
                test: /\.ts$/,
                use: {
                    loader: 'awesome-typescript-loader'
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            }, {
                test: /\.(jpg|png|svg|webp|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        fallback: 'file-loader',
                        outputPath: 'img/',
                        name: '[name]-[hash:20].[ext]',
                        limit: 1 * 1024 * 5 //5KB以内的图片都使用base64
                    }
                }
            }, {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new CircularDependencyPlugin({
            exclude: /[\\\/]node_modules[\\\/]/,
            failOnError: false,
            cwd: process.cwd()
        }),
        new webpack.DefinePlugin({
            'ENV_TARGET': JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css'
        }),
        new HashOutput(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            favicon: path.join(config.srcPath, 'favicon.ico'),
            template: path.join(config.srcPath, 'index.html'),
            chunks: ['index']
            // ,chunksSortMode: (function () {
            //     const orders = ['index'];
            //     return function (left, right) {
            //         let leftIndex = orders.indexOf(left.names[0]);
            //         let rightindex = orders.indexOf(right.names[0]);
            //         if (leftIndex > rightindex) {
            //             return 1;
            //         }
            //         else if (leftIndex < rightindex) {
            //             return -1;
            //         }
            //         else {
            //             return 0;
            //         }
            //     }
            // })()
        })
    ]
};
