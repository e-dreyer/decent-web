/** @type {import('next').NextConfig} */
const nextConfig = {
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    },
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )

    return config
  },

  reactStrictMode: true,
}

module.exports = nextConfig
