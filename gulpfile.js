const path = require("path");
const { series, parallel, src, dest } = require("gulp");
const less = require("gulp-less");
const cssnano = require("gulp-cssnano");
const cssConcat = require("gulp-concat-css");
const rename = require("gulp-rename");
const clean = require("gulp-clean");
const minify = require("gulp-minify");
const rollup = require("gulp-better-rollup");
const { babel } = require("@rollup/plugin-babel");
const sourcemaps = require("gulp-sourcemaps");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");

/**
 * 全局配置
 */
const appConfig = {
  /**基础路径 */
  BASE_URL: "",
  /**输出路径 */
  dest: "dist",
  /**页面标题 */
  page_title: "webapp-quick-start",
  /**打包的css路径 */
  css_path: "index.css",
  /**打包的js路径 */
  js_path: "app.js",
  /**静态资源路径 */
  assets_path: "",
};
/**是否为生产环境 */
const isProd = process.argv.includes("production");

/**
 * 目标输出路径
 * @param {string} relativePath
 */
function destPath(relativePath) {
  return path.resolve(appConfig.dest, relativePath);
}

/**
 * 清除缓存目录
 */
function cleanDist() {
  return src(appConfig.dest, { read: false }).pipe(clean());
}

/**
 * 样式编译
 */
function styleCompiler() {
  const plugins = [];
  // 编译
  plugins.push(less());
  // 合并
  plugins.push(cssConcat(destPath(appConfig.css_path)));
  // 压缩
  isProd && plugins.push(cssnano());
  // 重命名
  isProd && plugins.push(rename({ suffix: ".min" }));
  // 输出
  plugins.push(dest(appConfig.dest));

  let stream = src("src/styles/**/*.less");
  plugins.forEach((f) => (stream = stream.pipe(f)));
  return stream;
}

/**
 * 脚本编译
 */
function scriptCompiler() {
  const plugins = [];
  // sourceMap
  !isProd && plugins.push(sourcemaps.init());
  // 编译
  // plugins.push(rollup({
  //   output: {
  //     file: dest(appConfig.js_path),
  //     format: "cjs",
  //     name: "webapp-quick-start",
  //   },
  //   plugins: [
  //     // 让rollup支持第三方库的引用
  //     resolve({
  //       browser: true,
  //     }),
  //     commonjs(),
  //     babel({
  //       babelHelpers: "bundled",
  //       exclude: "node_modules/**",
  //       presets: ["@babel/preset-env"],
  //     }),
  //     json(),
  //   ],
  // }));
  // 压缩
  isProd && plugins.push(minify());
  // 重命名
  isProd && plugins.push(rename({ suffix: ".min" }));
  // 输出
  plugins.push(dest(appConfig.dest));

  let stream = src("src/app.js");
  plugins.forEach((f) => (stream = stream.pipe(f)));
  return stream;
}

exports.default = series(cleanDist, parallel(styleCompiler));
