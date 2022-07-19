/** @type {import('next').NextConfig} */
require('dotenv').config()
const webpack = require('webpack')

module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    },
    config.plugins = [
      new webpack.EnvironmentPlugin(process.env)
    ]

    return config
  },

  reactStrictMode: true,
}

