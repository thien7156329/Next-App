/** @type {import('next').NextConfig} */
require("dotenv").config();
const { parsed: localEnv } = require("dotenv").config();
const path = require('path')
const webpack = require("webpack");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
};

module.exports = {
  ...nextConfig,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
};
// module.exports = nextConfig;
