const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  /**入口 */
  entry: {
    app: "./src/app.ts",
  },
  /**出口 */
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
    clean: true,
  },
  target: "web",
  devtool: false,
  /**模块化 */
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        // type: 'asset/resource'
        // type: 'asset/inline',
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.(md|txt)$/,
        type: "asset/source",
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
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "ts",
          target: "es2015",
          // tsconfigRaw: require('../tsconfig.json'),
        },
      },
    ],
  },
  /**插件 */
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
  /**服务器 */
  devServer: {
    static: path.join(__dirname, "../dist"),
    compress: true,
    // hot: true,
    port: 3000,
    open: true,
  },
  // others
  watch: true,
  resolve: {
    extensions: [".ts", ".js"],
  },
};

module.exports = config;
