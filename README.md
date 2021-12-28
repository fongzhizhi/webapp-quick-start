# webapp-quick-start

> 切换分支，选择你的喜欢的构建工具流，快速启用你的前端应用。

## 分支构建细节

本分支基于仓库[主分支](https://github.com/fongzhizhi/webapp-quick-start/tree/main)，借助模块打包工具[webpack](https://www.webpackjs.com/)构建项目。

`webpack`基本能将所有文件都当成模块来打包，这也是其打包速度相比其他构建枸橘较慢的一个原因，适合大项目使用，与其他构建模块推崇的零配置打包理念相反，使用好`webpack`的关键点就在于编写好`webpack.config.js`配置文件。

如果项目不是那么复杂，对打包输出格式的格式也没有很高的自定义需求，`webpack`不是一个好的选择，它自由度高的同时臃肿、构建速度较慢。

对于自由度来说，不算是打包工具的自动构建工具`gulp`同样自由度极高，但`gulp`的专注点是自动化和流式插件，而非模块打包。

对于零配置快速上手来说，`parcel`和`vite`等构建工具追求快速启动的开发体验，适合仓库项目中使用。

对于速度上来说，目前的`esbuild`秒杀以上构建工具，但使用体验均不如上述工具，不过未来可期。

选择什么构建工具无所谓，不管是追求自由度也好、零配置也好还是构建速度也好，目的都应该是为更好地**辅助**项目的实际开发需求，所以，哪一款适合你的项目，就选哪一款就好。

### 准备工作

安装`webpack`相关库：

```shell
npm install webpack webpack-cli webpack-dev-server
```

为了更清晰地修改编写配置文件，我们专门放到一个`config`文件夹中，并新建三个配置文件：

+ `webpack.conmon.js`：通用配置。
+ `webpack.dev.js`：开发环境使用的配置文件。
+ `webpack.prod.js`：生产环境使用的配置文件。

### 配置文件

#### 通用配置

从`webpack`的四个主要配置项入手：

+ `entry`：入口。定义打包的入口文件。
+ `output`：出口。定义输出目录及文件名等信息。
+ `module`：模块化的关键。编写各种资源打包的`loader`。
+ `plugins`：插件。按需使用，当`loader`无法解决的问题，就可以考虑通过插件来解决。

##### 资源的打包

资源文件的种类特别多，如`.png`、`.svg`、`.txt`、`.json`，而本仓库还有读取`.md`文件的需求，**过去的做法**是：

- [`raw-loader`](https://v4.webpack.js.org/loaders/raw-loader/) 将文件导入为字符串。
- [`url-loader`](https://v4.webpack.js.org/loaders/url-loader/) 将文件作为 data URI 内联到 bundle 中。
- [`file-loader`](https://v4.webpack.js.org/loaders/file-loader/) 将文件发送到输出目录。

而目前的`webpack`提供了资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

- `asset/resource` 发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现。
- `asset/inline` 导出一个资源的 data URI。之前通过使用 `url-loader` 实现。
- `asset/source` 导出资源的源代码。之前通过使用 `raw-loader` 实现。
- `asset` 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现。

更多细节请参考官方文档：[资源模块](https://webpack.docschina.org/guides/asset-modules/)。

##### html文件的打包

html里会引用一些资源文件，如`img: src`中的图片资源等等，因此我们如果使用到html还需要配置`html-loader`。

##### 样式文件的打包

本项目使用了`less`编写样式文件，因此需要安装`less`模块和`less-loader`来进行打包，但`less-loader`只是编译为`css`文件，因此还需要同时配置`css-loader`和`style-loader`。

##### 脚本文件的打包

`webpack`默认就支持`js`的打包，但是为了兼容浏览器和处理一些其他转换细节，我们还可以按需使用`loader`，比如`babel-loader`。

此外，还需要设置`target`配置项来定义脚本文件的环境语言，默认为`web`，即浏览器环境。

##### 服务器配置

`webpack`提供了启动构建完成后服务器的配置，通过设置`devServer`项来定义。

##### 其他配置

+ `watch`：是否监听文件变化并自动编译。
+ `devtool`：开发工具，用于定义生成何种类型的`source-map`文件。

#### 开发环境

```js
const webpackCommon = require("./webpack.common");

const devConfig = Object.assign({}, webpackCommon, {
  target: "web",
  mode: "development",
  devtool: "eval-cheap-module-source-map",
});
```

#### 生产环境

```js
const webpackCommon = require("./webpack.common");

const prodConfig = Object.assign({}, webpackCommon, {
  target: "web",
  mode: "production",
  devtool: "source-map",
});
```

### 运行

```shell
# 构建
npm run build:dev
npm run build:prod
# 启动
npm run dev
npm run prod
```

