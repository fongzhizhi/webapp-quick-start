const { babel } = require("@rollup/plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const { uglify } = require("rollup-plugin-uglify");

module.exports = {
  // 打包入口
  input: "src/app.js",
  // 输出配置
  output: {
    file: "dist/app.min.js",
    format: "cjs",
    name: "webapp-quick-start",
  },
  // 插件
  plugins: [
    // 让rollup支持第三方库的引用
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-env"],
    }),
    // uglify(),
  ],
  // 外链
  external: [],
  // 全局模块
  globals: {
    jquery: "$",
  },
  sourcemap: true,
  watch: {
    include: "src/**/*.js",
  },
};
