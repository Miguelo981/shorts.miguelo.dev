/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    nextScriptWorkers: true,
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
