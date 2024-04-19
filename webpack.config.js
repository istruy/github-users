const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config({ path: './.env' });

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
    ],
    devServer: {
        client: {
            overlay: false,
        },
        open: true,
        historyApiFallback: true,
    },
};
