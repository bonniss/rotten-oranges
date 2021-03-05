const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/main.js'
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        resolve: {
          extensions: ['.js', '.jsx']
        },
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'public'
          }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/assets/favicon.png',
      template: './src/index.html'
    })
  ]
}