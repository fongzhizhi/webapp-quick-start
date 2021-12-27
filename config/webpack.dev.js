const commonConfig = require("./webpack.common");

const devConfig = Object.assign({}, commonConfig, {
  target: "web",
  mode: "development",
  devtool: "eval-cheap-module-source-map",
});

module.exports = devConfig;
