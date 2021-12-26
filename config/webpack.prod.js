const webpackCommon = require("./webpack.common");

const prodConfig = Object.assign({}, webpackCommon, {
  target: "web",
  mode: "production",
  devTool: "source-map",
});

module.exports = prodConfig;
