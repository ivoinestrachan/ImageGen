/** @type {import('next').NextConfig} */

const path = require('path');

// Use the path.join function to concatenate the path strings
const libvipsPath = path.join(process.cwd(), 'lib', 'libvips-8.dll');

module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /sharp-linux-x64\.node$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'sharp/build/Release',
            publicPath: '/_next/static/sharp/build/Release/' 
          }
        }
      ]
    });
    return config;
  }
}
