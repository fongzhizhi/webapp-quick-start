# webapp-quick-start

> 切换分支，选择你的喜欢的构建工具流，快速启用你的前端应用。

## 分支构建细节

本分支基于仓库[主分支-ts版本](https://github.com/fongzhizhi/webapp-quick-start/tree/main-ts)，借助自动化构建工具[gulp](https://www.gulpjs.com.cn/)来**更优雅地**完成[base](https://github.com/fongzhizhi/webapp-quick-start/tree/base)分支那些编译任务。同[gulp](https://github.com/fongzhizhi/webapp-quick-start/tree/gulp)分支基本无差别，差别仅仅是脚本编译的不同而已，在[gulp](https://github.com/fongzhizhi/webapp-quick-start/tree/gulp)分支我们使用`rollup`打包，这里我们替换为`esbuild`来打包`ts`，当然，你也可以使用`gulp-typescript`来完成打包工作。

### 准备工作

拉取[主分支-ts版本](https://github.com/fongzhizhi/webapp-quick-start/tree/main-ts)分支代码，安装`gulp`，创建`gulpfile.js`配置文件。

### 样式编译

安装`gulp-less`模块：

```shell
npm install gulp-less
```

### 脚本编译

安装`gulp-esbuild`：

```shell
npm intsall gulp-esbuild
```

基本无配置运行。

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