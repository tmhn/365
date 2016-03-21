'use strict'

const path = require('path')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')

// PostCSS plugins
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const lost = require('lost')
const fontMagician = require('postcss-font-magician')

module.exports = {
  entry: [
    './browser/index'
  ],
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js',
    publicPath: '/public/js/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new WebpackNotifierPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'react' ]
        },
        include: path.join(__dirname, 'browser')
      },
      { test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },
  postcss: function () {
    return [ precss, autoprefixer, lost, fontMagician ]
  }
}
