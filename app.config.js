// const babel = require('@babel/core');
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const less = require("less");
const del = require("del");
const chokidar = require("chokidar");
const { rollup } = require("rollup");
const rollupConfig = require("./rollup.config.js");
const cp = require("child_process");
const express = require("express");
const { uglify } = require("rollup-plugin-uglify");

/**
 * 全局配置
 */
const appConfig = {
  BASE_URL: "",
  dest: "dist",
  page_title: "webapp-quick-start",
  css_path: "",
  js_path: "",
  assets_path: "",
};
const isProd = process.argv.includes("production"); // 生成环境

/**
 * 一些初始化工作
 */
function appInit() {
  createDir(path.resolve(__dirname, appConfig.dest));
  if (isProd) {
    rollupConfig.plugins.push(uglify());
    const fileName = rollupConfig.output.file;
    if (/(.+)\.js$/.test(fileName)) {
      rollupConfig.output.file = RegExp.$1 + ".min.js";
    }
  }
}

/**
 * 创建目录
 * @param {string} dir
 */
function createDir(dir) {
  try {
    fs.statSync(dir);
  } catch (error) {
    fs.mkdirSync(dir);
  }
}

/**
 * 读取指定目录下的文件路径
 * @param {string} dir 路径
 * @param {string?} accept 接受的文件类型
 * @param {boolean?} deep 深度遍历
 * @param {string?} ignore 忽略的文件类型
 * @returns {{relativePath: string;path: string;fileName: string;}[]}
 */
function readDir(dir, accept, deep, ignore) {
  const files = [];
  const res = fs.readdirSync(dir);
  res &&
    res.forEach((p) => {
      const filePath = path.resolve(dir, p);
      const state = fs.statSync(filePath);
      if (state.isDirectory()) {
        deep && files.push(...readDir(filePath, accept, deep));
      } else if (
        (!accept || filePath.endsWith(accept)) &&
        (!ignore || !filePath.endsWith(ignore))
      ) {
        files.push({
          path: filePath,
          relativePath: path.join(dir, p),
          fileName: p,
        });
      }
    });
  return files;
}

/**
 * 获取目标路径
 * @param {string} extendPath
 */
function getDestPath(extendPath) {
  return path.resolve(appConfig.dest, extendPath);
}

/**
 * 打印任务日志
 * @param {string} title
 * @param {string[]} msgs
 */
function taskLog(title, ...msgs) {
  console.log(`[${title}]`, ...msgs);
}

/**
 * html渲染
 * @param {boolean?} watch 是否监听文件变化并自动编译
 */
function htmlTempRender(watch) {
  const fileName = path.resolve(__dirname, "public/index.html");
  ejs.renderFile(fileName, appConfig, (err, str) => {
    if (err) throw err;
    const htmlPath = getDestPath("index.html");
    fs.writeFileSync(htmlPath, str);
    taskLog("htmlTempRender", "html template was rendered in", htmlPath);
  });
  if (watch) {
    chokidar.watch(fileName).on("change", (status, path) => {
      htmlTempRender(false);
    });
  }
}

/**
 * css编译
 * @param {boolean?} watch 是否观测文件变化并重新编译
 */
function cssCompiler(watch) {
  let index = 0;
  readDir("src/styles", ".less", false).forEach((item) => {
    index++;
    const content = fs.readFileSync(item.path).toString();
    let cssStr = "";
    less.render(content, (err, res) => {
      if (err) throw err;
      cssStr += `\n/* [fileSource] ${item.relativePath} */ \n`;
      cssStr += res.css;
      if (--index === 0) {
        const cssName = "main.css";
        const cssPath = getDestPath(cssName);
        appConfig.css_path = cssName;
        fs.writeFileSync(cssPath, cssStr);
        taskLog("cssCompiler", "css was compiled in", cssPath);
      }
    });
  });
  if (watch) {
    chokidar.watch("src/styles/**/*.less").on("all", (status, path) => {
      cssCompiler(false);
    });
  }
}

/**
 * js编译
 */
async function jsComplier(watch) {
  const build = await rollup(rollupConfig);
  await build.write(rollupConfig.output);
  appConfig.js_path = rollupConfig.output.file.replace(
    new RegExp(`\.*${appConfig.dest}\/`),
    ""
  );
  taskLog(
    "jsComplier",
    "js was compiled in",
    path.resolve(appConfig.dest, appConfig.js_path)
  );
  if (watch) {
    chokidar.watch(rollupConfig.watch.include).on("change", (status, path) => {
      jsComplier(false);
    });
  }
}

/**
 * 清除缓存目录
 */
function clearDist() {
  del.sync(appConfig.dest);
  taskLog("clearDist", appConfig.dest, "dir was clean.");
}

/**
 * 资源文件clone
 */
function assetsClone() {
  const dirName = "assets";
  const copyDest = path.resolve(appConfig.dest, dirName);
  createDir(copyDest);
  readDir(path.resolve("src", dirName), "", false).forEach((item) => {
    fs.copyFileSync(item.path, path.resolve(copyDest, item.fileName));
  });
  readDir("public", "", false, ".html").forEach((item) => {
    fs.copyFileSync(item.path, path.resolve(appConfig.dest, item.fileName));
  });
  appConfig.assets_path = appConfig.BASE_URL + dirName + "/";
  taskLog("assetsClone", "assets was cloned in", copyDest);
}

/**
 * 服务器
 */
function server() {
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
    taskLog("server", `App listening at ${url}`);
    cp.exec("start " + url);
  });
}

/**
 * 执行任务
 * @param {Function[]} taskList
 */
async function runTasks(taskList) {
  clearDist();
  appInit();
  assetsClone();
  cssCompiler(true);
  await jsComplier(true);
  htmlTempRender(true);
  server();
}

// ===> app run
runTasks();
