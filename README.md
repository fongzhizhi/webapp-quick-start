# webapp-quick-start

> 切换分支，选择你的喜欢的构建工具流，快速启用你的前端应用。

## 分支构建细节

要让项目运行起来，我们需要将代码和资源都整合到一起，也就是我们常说的打包。打包的库有很多，但本分支都未使用，我们希望通过一个`app.config.js`文件对整个项目的资源文件进行打包逻辑处理。

### 准备工作

在编写代码之前，我们需要先分析和设计一下我们需要完成的工作内容。

首先，最简单的，从**何去何从**的角度出发，我们得到三个问题：

+ **是什么**：需要打包的资源文件有哪些？
+ **去哪儿**：打包的输出路径在哪？
+ **去干嘛**: 需要打包成什么样的结构？

然后，我们的回答就是程序编写的一种设计方案：

+ 需要打包的资源(你的项目里用到了哪些资源文件)：

  + html模板
  + less文件
  + js文件
  + 静态资源文件
+ 输出路径：`dist`
+ 输出结构：

  + index.html
  + main.css
  + app[.min].js
  + assets/\*\*/\*

将一些全局使用的变量初始化以便于使用：

```js
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
```

由于html模板需要使用到资源打包路径，我们可以在其他资源准备完毕之后再来编译html模板。

当项目资源都打包完毕之后，我们还需要一个**服务器**以启动这些资源，以便于本地调试。

有了上述设计方案，我们就可以开始代码的编写工作了。

### css的编译--cssCompiler

本项目使用[less](https://less.bootcss.com/)来编写样式，因此我们需要安装`less`模块来编译这些文件。

```
npm install less
```

然后读取`src/styles`目录下的所有`less`文件，逐一使用`less.render`函数编译为`css`代码，再整合到一个文件中即可。

> 需要注意的是，这种编译方案不支持`@import`引入其他文件的写法。

具体可参考`cssCompiler`函数。

### js的编译--jsComplier

#### 版本编译器：babel

为了兼容大多数浏览器而又想使用最新的`js`语法，我们的本地编写的`js`就需要经过版本转换，因此我们安装[babel](https://babel.docschina.org/)实现最新版本的js编译：

```shell
npm install @babel/cli @babel/core @babel/preset-env
```

#### 模块打包器：rollup

工程化和模块化是前端工程的一个必然趋势，而这也是下一代浏览器需要完成的事（具体可参考[JavaScript modules 模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)），在浏览器模块化完成之前，我们写的模块化代码就需要去模块化，这就需要模块化打包器来完成：目前有[rollup](https://www.rollupjs.com/)、[esbuild](https://esbuild.docschina.org/)、[parcel](https://parceljs.org/)等js打包器。

这里我们使用`rollup`来打包：

```npm
npm install rollup
```

#### 引入第三方库：使用插件

在代码中我们引用了第三方库`axios`和`marked`，`rollup`默认是不支持导入的，因此我们需要安装一些插件来支持。

```npm
npm install @rollup/plugin-commonjs rollup-plugin-node-resolve
```

此外，为了实现其他功能，我们按需安装对应的插件即可。

其他代码细节可参考`jsComplier`函数。

### 静态资源的拷贝--assetsClone

将项目中使用到的静态资源文件拷贝到构建目录即可，具体可参考`assetsClone`函数。

### html模板的编译--htmlTempRender

html模板是使用[ejs](https://ejs.bootcss.com/)模板引擎语法编写的，因此我们安装`ejs`模块进行编译即可：

```npm
npm install ejs
```

具体可参考`htmlTempRender`函数。

### 服务器--server

安装`express`模块进行服务器的启动：

```shell
nmp install express
```

具体可参考`server`函数。

### 花边

其他一些可以完善的细节如：资源文件如图片的压缩、js的压缩、css的压缩、代码的格式化等等都可以慢慢加到`app.config.js`中来。

## 启动

```shell
# 代码格式化
npm run prettier
# 编译打包js文件
npm run bind
# 打包项目并启动服务器
npm run dev
# 打包项目并启动服务器(生产环境)
npm run prod
```