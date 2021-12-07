# webapp-quick-start

> 切换分支，选择你的喜欢的构建工具流，快速启用你的前端应用。

## 分支构建细节

> 该分支基于 [base](https://github.com/fongzhizhi/webapp-quick-start/tree/base) 分支，将js打包器[rollup](https://www.rollupjs.com/)替换为[esbuild](https://esbuild.docschina.org/)打包器。

### 准备工作

首先清除和`rollup`库相关的库和文件。

+ 移除相关库
+ 移除配置文件：`rollup.config.js`
+ 移除使用`rullup`打包的相关代码：`app.config.js`

安装`esbuild`:

```shell
npm install esbuild
```

### 编写打包逻辑

我们只需要重新编写：`app.config.js`里的`jsComplier`函数。



