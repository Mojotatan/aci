var path = require('path')

module.exports = {
  entry: ['babel-polyfill', './browser/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node-modules/
      }
    ]
  }
}