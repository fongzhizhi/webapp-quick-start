const { series, parallel, src } = require("gulp");
const gulpLess = require("gulp-less");

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
  css_path: "",
  /**打包的js路径 */
  js_path: "",
  /**静态资源路径 */
  assets_path: "",
};

/**
 * 样式编译
 */
function styleCompiler() {
  src("src/styles/**/*.less").pipe(gulpLess()).dest();
}
