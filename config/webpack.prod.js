const commonConfig = require("./webpack.common");

const prodConfig = Object.assign({}, commonConfig, {
  target: "web",
  mode: "production",
  devtool: "source-map",
});

module.exports = prodConfig;
