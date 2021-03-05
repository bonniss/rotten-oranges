const common = require('./webpack.common');
const path = require('path');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    inline: true,
    port: 8001,
    historyApiFallback: true
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'   // relative path for assets
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader',   // inject css into dom
          'css-loader',     // load css
          'sass-loader'     // sass to css
        ],
      }
    ]
  },
})