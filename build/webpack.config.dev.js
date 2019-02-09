'use strict';
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const MiniCssExtractPlugin  = require('mini-css-extract-plugin');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }, {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: "file-loader",
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: `postcss-loader`,
                        options: {
                            ident: 'postcss',
                            plugins: [
                                autoprefixer({ browsers: [ 'last 2 versions' ] })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            data: `
                                  @import "./assets/scss/_variables.scss";
                                  @import "./assets/scss/_mixins.scss";
                            `
                        }
                    },
                ]
            }
        ]
    },
    optimization: {
        namedModules: true,
        namedChunks: true
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
        }),
        new CopyWebpackPlugin([{
            from: resolve('static/img'),
            to: resolve('dist/static/img'),
            toType: 'dir'
        }]),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ]
};