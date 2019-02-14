const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const config = require('./config');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.js']
    },
    entry: {
        home: [path.join(config.srcPath, 'home.ts')]
    },
    output: {
        hashFunction: 'md5',
        path: config.buildClient,
        publicPath: config.contextPath + '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js'
    },
    performance: {
        hints: false
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
                        limit: 1 * 8 * 1024 * 2 //2KB以内的图片都使用base64
                    }
                }
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
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
            'ENV_TARGET': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            favicon: path.join(config.srcPath, 'favicon.ico'),
            template: path.join(config.srcPath, 'index.html'),
            chunks: ['home'],
            chunksSortMode: (function () {
                const orders = ['home'];
                return function (left, right) {
                    let leftIndex = orders.indexOf(left.names[0]);
                    let rightindex = orders.indexOf(right.names[0]);
                    if (leftIndex > rightindex) {
                        return 1;
                    }
                    else if (leftIndex < rightindex) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }
            })()
        })
    ]
};
