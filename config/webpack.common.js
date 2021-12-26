const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  /**入口 */
  entry: {
    app: "./src/app.js",
  },
  /**出口 */
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    clean: true,
  },
  target: "web",
  /**模块化 */
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8 * 1024,
            esModule: false,
            outputPath: "images/",
          },
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(md|txt)$/,
        use: "raw-loader",
      },
    ],
  },
  /**插件 */
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
  /**服务器 */
  devServer: {
    static: path.join(__dirname, "../dist"),
    compress: true,
    hot: true,
    port: 3000,
    open: true,
  },
  // others
  // watch: true,
};

module.exports = config;
