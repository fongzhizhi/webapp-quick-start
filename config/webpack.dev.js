const webpackCommon = require("./webpack.common");

const devConfig = Object.assign({}, webpackCommon, {
  target: "web",
  mode: "development",
  devtool: "eval-cheap-module-source-map",
});

module.exports = devConfig;
