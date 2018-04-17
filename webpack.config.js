"use strict";

const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = (options) => {
  const dest = path.resolve("./dist");

  let webpackConfig = {
    entry: "./src/app.js",
    output: {
      filename: "app.js"
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader"
        },
        {
          test: /\.html$/,
          use: "html-loader"
        },
        {
          test: /\.sass$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        hash: true
      }),
      new OptimizeCSSAssetsPlugin(),
      new MiniCssExtractPlugin({
        filename: "app.css"
      }),
      new UglifyJsPlugin({
        cache: true,
        parallel: true
        
      }),
      new CleanWebpackPlugin([dest])
    ]
  };

  return webpackConfig;
};
