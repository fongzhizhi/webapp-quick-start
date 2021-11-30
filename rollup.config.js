// @ts-nocheck
const { babel } = require("@rollup/plugin-babel");
const { DEFAULT_EXTENSIONS } = require("@babel/core");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const { uglify } = require("rollup-plugin-uglify");
const typescript = require("rollup-plugin-typescript2");
const path = require("path");

module.exports = {
  // 打包入口
  input: "src/app.ts",
  // 输出配置
  output: {
    file: "dist/app.min.js",
    format: "cjs",
    name: "webapp-quick-start",
  },
  // 插件
  plugins: [
    // 让rollup支持第三方库的引用
    resolve({  jsnext : true ,  preferBuiltins : true ,  browser : true  }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-env"],
      // babel 默认不支持 ts 需要手动添加
      extensions: [
        '.ts',
        ...DEFAULT_EXTENSIONS,
      ],
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
    include: "src/**/*.ts",
  },
};
