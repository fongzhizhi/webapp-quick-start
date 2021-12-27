const webpackCommon = require("./webpack.common");

const prodConfig = Object.assign({}, webpackCommon, {
  target: "web",
  mode: "production",
  devtool: "source-map",
});

module.exports = prodConfig;
