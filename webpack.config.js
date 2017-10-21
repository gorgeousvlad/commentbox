webpack = require('webpack');
path = require('path');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');


webpackConfig = {
    entry: "./static/app.js",
    output:{
        filename: './static/build/bundle.js',
        library: 'bundle'
    },
    watch: true,
    resolve: {
        extensions: [' ','.js','.jsx']
    },
    devtool: '#cheap-module-source-map',
    module: {
        loaders: [
            {
                test:/\.js$/,
                loader:'babel-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react', 'stage-0', 'stage-1']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                loader: 'file-loader'
            }
        ]
    }//,
    // plugins: [
    //     new ExtractTextPlugin('styles.css', {
    //         allChunks: true
    //     })
    // ]
};
module.exports = webpackConfig;