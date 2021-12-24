const path = require("path");
const fs = require("fs");
const cp = require("child_process");
const { series, parallel, src, dest, watch } = require("gulp");
const less = require("gulp-less");
const cssnano = require("gulp-cssnano");
const cssConcat = require("gulp-concat-css");
const rename = require("gulp-rename");
const clean = require("gulp-clean");
const minify = require("gulp-minify");
const ejs = require("gulp-ejs");
const express = require("express");
const esbuild = require("gulp-esbuild");

/**
 * 全局配置
 */
const appConfig = {
  // => config
  /**生产环境 */
  isProd: false,
  /**文件监听 */
  watch: true,

  // => entry
  html_paths: "public/*.html",
  styles_paths: "src/styles/**/*.less",
  scripts_paths: "src/**/*.ts",
  script_entry: "src/app.ts",
  assets_paths: "src/assets/**/*",
  publicPaths: ["public/*", "!public/*.html"],

  // => output
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
  assets_path: "assets/",
};

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
  return src(appConfig.dest, { read: false, allowEmpty: true }).pipe(clean());
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
  if (appConfig.isProd) {
    // 压缩
    plugins.push(cssnano());
    // 重命名
    plugins.push(rename({ suffix: ".min" }));
    appConfig.css_path = appConfig.css_path.replace(/$\.css/, ".min.css");
  }
  // 输出
  plugins.push(dest(appConfig.dest));

  let stream = src(appConfig.styles_paths);
  plugins.forEach((f) => (stream = stream.pipe(f)));

  return stream;
}

/**
 * 脚本编译
 */
function scriptCompiler() {
  const plugins = [];
  // 编译
  plugins.push(
    esbuild({
      bundle: true,
      format: "cjs",
      loader: {
        ".tsx": "tsx",
      },
      sourcemap: appConfig.isProd,
      minify: appConfig.isProd,
    })
  );
  if (appConfig.isProd) {
    // 压缩
    // plugins.push(minify());
    // 重命名
    plugins.push(rename({ suffix: ".min" }));
    appConfig.js_path = appConfig.css_path.replace(/$\.js/, ".min.js");
  }
  // 输出
  plugins.push(dest(appConfig.dest));

  let stream = src(appConfig.script_entry);
  plugins.forEach((f) => (stream = stream.pipe(f)));
  return stream;
}

/**
 * 静态资源拷贝
 */
function assetsCopy() {
  // assets
  const copyDest = path.resolve(appConfig.dest, "assets");
  src(appConfig.assets_paths).pipe(dest(copyDest));
  // public
  return src(appConfig.publicPaths).pipe(dest(appConfig.dest));
}

/**
 * html模板编译
 */
function htmlCompiler() {
  return src(appConfig.html_paths)
    .pipe(ejs(appConfig))
    .pipe(dest(appConfig.dest));
}

/**
 * 服务器
 */
function server(cb) {
  const app = express();
  const port = 3000;
  app.use(express.static(appConfig.dest));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(appConfig.dest, "index.html"));
  });
  app.get("/readme", (req, res) => {
    res.send(fs.readFileSync(path.resolve(__dirname, "README.md")).toString());
  });
  app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log("[server running]", `App listening at ${url}`);
    cp.exec("start " + url);
  });
  cb();
}

/**
 * 设置为生产环境
 */
function setProdEnv(cb) {
  appConfig.isProd = true;
  cb();
}

/**
 * 构建任务监听
 */
function watchTask(cb) {
  if (!appConfig.watch) {
    return;
  }
  watch(appConfig.html_paths, htmlCompiler);
  watch(appConfig.styles_paths, styleCompiler);
  watch(appConfig.scripts_paths, scriptCompiler);
  watch(appConfig.assets_paths, assetsCopy);
  watch(appConfig.publicPaths, assetsCopy);
  cb();
}

/**
 * 构建
 */
exports.build = series(
  cleanDist,
  parallel(htmlCompiler, styleCompiler, scriptCompiler, assetsCopy, watchTask)
);
exports.buildProd = series(setProdEnv, exports.build);
/**
 * 启动服务
 */
exports.server = server;
/**
 * 本地|默认
 */
exports.default = exports.dev = series(exports.build, exports.server);
/**
 * 生产环境
 */
exports.prod = series(exports.buildProd, exports.server);

/**
 * 测试
 */
exports.test = parallel(styleCompiler);
