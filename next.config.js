/** @type {import('next').NextConfig} */
const path = require("path");
const fs = require("fs-extra");
require("dotenv").config();
const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = {
  ...nextConfig,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (config, { isServer }) => {
    const pathFile = path.join(__dirname, "./public/firebase-messaging-sw.js");
    const fileRead = path.join(__dirname, "./public/sw_conf.js");
    const file = fs.readFileSync(fileRead, "utf-8");
    let jsonFile = file.toString();
    Object.keys(process.env).forEach((v) => {
      if (v.indexOf("NEXT_PUBLIC_") !== -1) {
        jsonFile = jsonFile.replace(`process.env.${v}`, `'${process.env[v]}'`);
      }
    });
    if (fs.existsSync(pathFile)) {
      fs.unlinkSync(pathFile);
    }
    fs.writeFileSync(pathFile, jsonFile, { encoding: "utf-8" });
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
};
// module.exports = nextConfig;
