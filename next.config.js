/** @type {import('next').NextConfig} */
if (process.env.NODE_ENV === "development") {

  const nextConfig = {
    webpackDevMiddleware: config => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        env: {
          GITHUB_ID: process.env.GITHUB_ID,
          GITHUB_SECRET: process.env.GITHUB_SECRET,
        },
      }
      return config
    },

    reactStrictMode: true,
  }

  module.exports = nextConfig
}

if (process.env.NODE_ENV === "production") {

  const nextConfig = {
    reactStrictMode: true,
  }

  module.exports = nextConfig
}
