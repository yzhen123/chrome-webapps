/* eslint-disable */
var webpackConfig = require('./webpack.build.js')
module.exports = Object.assign({}, webpackConfig, {
  debug: true,
  devtool: 'eval'
})
