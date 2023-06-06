/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    nextScriptWorkers: true,
  },
  env: {
    HOST: process.env.HOST,
    API_V: process.env.API_V,
    SHORT_URLS: process.env.SHORT_URLS,
    SHORT_URL: process.env.SHORT_URL,
    GA_ID: process.env.GA_ID
  }
  /* webpack: function (config, options) {
    config.module.rules = [
        {
          test: /\.js$|jsx$|ts$|tsx/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        }
    ]

    return config;
  } */
  /* experimental: { 
    appDir: true,
    //output: 'standalone',
  }, */
}

module.exports = nextConfig
