const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const prodConfig = merge(common, {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[contentHash].js',
    publicPath: '/'   // relative path for assets
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',     // load css
          'sass-loader'     // sass to css
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash].css'
    }),
    new CopyPlugin({
      patterns: [
        { from: '_redirects', to: '' }
      ]
    }),
    new CleanWebpackPlugin()
  ]
})

module.exports = prodConfig