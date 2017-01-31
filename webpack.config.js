// webpack.config.js
"use strict";

let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');

let CopyWebpackPlugin = require('copy-webpack-plugin');
let path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle_[hash].js'
  },
  devServer: {
    contentBase: './dist/',
    host: '0.0.0.0',
    port: 8080
  },
  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: ['css-loader', 'sass-loader'],
        })
      },
      {
        test: /\.(jpe?g|png|gif|ttf|svg|mp4)$/i,
        loader: "file-loader?name=/assets/[name].[ext]",
      },
      {
        test: /\.(svg)$/i,
        loader: "url-loader",
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin("styles_[hash].css"),
    new CopyWebpackPlugin([{
      from: './src/assets',
      to: 'assets'
    }])
  ]
}
