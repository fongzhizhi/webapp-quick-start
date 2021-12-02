const { babel } = require("@rollup/plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const typescript = require("rollup-plugin-typescript2");

module.exports = {
  // 打包入口
  input: "src/app.ts",
  // 输出配置
  output: {
    file: "dist/app.bundle.js",
    format: "cjs",
    name: "webapp-quick-start",
  },
  // 插件
  plugins: [
    // 让rollup支持第三方库的引用
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: "tsconfig.json",
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      presets: ["@babel/preset-env"],
    }),
    json(),
  ],
  // 外链
  external: [],
  watch: {
    include: "src/**/*.js",
  },
};
