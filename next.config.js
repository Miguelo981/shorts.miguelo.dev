/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    nextScriptWorkers: true,
  },
  env: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    NEXT_PUBLIC_API_V: process.env.NEXT_PUBLIC_API_V,
    NEXT_PUBLIC_SHORT_URLS: process.env.NEXT_PUBLIC_SHORT_URLS,
    NEXT_PUBLIC_SHORT_URL: process.env.NEXT_PUBLIC_SHORT_URL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID
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
