/** @type {import('next').NextConfig} */
const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  // optional
  modifyVars: {
    '@primary-color': '#222',
    '@secondary-color': '#FFD54F',
    // '@menu-bg': '#222',
    '@link-color': '#FFD54F',
    // '@menu-highlight-color': '#FFD54F',
    '@dropdown-selected-color': '#d0d0d0',
    '@menu-item-active-bg': '#cacaca',
    '@font-size-base': '15px',
    '@font-size-lg': '16px',
    '@font-size-sm': '14px'
  },
  // optional
  // lessVarsFilePath: './src/styles/variables.less',
  // optional
  lessVarsFilePathAppendToEndOfContent: false,
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},

  // Other Config Here...
  reactStrictMode: true,

  webpack(config) {
    return config;
  }
});
