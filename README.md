# webapp-quick-start

> 切换分支，选择你的喜欢的构建工具流，快速启用你的前端应用。

## 分支构建细节

本分支基于仓库[主分支](https://github.com/fongzhizhi/webapp-quick-start/tree/main)，借助自动化构建工具[gulp](https://www.gulpjs.com.cn/)来**更优雅地**完成[base](https://github.com/fongzhizhi/webapp-quick-start/tree/base)分支那些编译任务。

### 准备工作

我们需要完成的编译效果和[base](https://github.com/fongzhizhi/webapp-quick-start/tree/base)分支一致，不同在于[base](https://github.com/fongzhizhi/webapp-quick-start/tree/base)分支是通过`app.config.js`文件来实现项目的打包编译，这里这是改由`gulp`来实现。

安装`gulp`:

```shell
npm install gulp
```

创建配置文件：`gulpfile.js`。

`gulp`的工作原理是并列或序列地组合一个个的任务，而任务的实现基本都可以通过插件来实现。由于`gulp`使用文件流的格式进行数据传递，因此各种插件之间可以很好地搭配使用。

我们将项目的编译打包任务划分为以下工作任务，逐一实现，然后再组合起来即可。

### 样式编译

安装`gulp-less`模块：

```shell
npm install gulp-less
```

### 脚本编译

这里使用的是`rollup`编译，所以安装在`gulp`中使用的插件：`gulp-better-rollup`：

```shell
npm install gulp-better-rollup
```

使用方法和`rollup`基本一致。

### 静态资源文件拷贝

利用`gulp`模块自带的`src`和`dest`函数即可实现文件流的拷贝。

### 模板编译

安装`gulp-ejs`来编译模板：

```shell
npm install gulp-ejs
```

### 服务器

服务器可以不受`gulp`控制，因此我们直接使用`express`模块即可。

### 文件清理

安装`gulp-clean`来为我们清理缓存目录：

```shell
npm install gulp-clean
```

### 文件监听

由于每项任务都被`gulp`组织为`gulp`任务了，我们直接使用`gulp`模块中的`watch`方法进行文件监听，然后触发`gulp`任务的执行即可。