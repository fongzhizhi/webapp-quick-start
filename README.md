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

我们只需重新编写`app.config.js`里的`jsComplier`函数。

#### 使用esbuild打包

引入`esbuild`并进行js打包：

```js
await esbuild.build({
  entryPoints: [path.resolve("src", "app.js")],
  outfile,
  bundle: true,
  format: "cjs",
  minify: isProd,
  sourcemap: !isProd,
  watch,
});
```

#### 引入babel插件

这些都是最基本的配置，为了兼容低版本浏览器，我们还需要引入`babel`插件进行js版本转换，由于目前在`npm`上没有找到比较适合的插件，我们可以手写这个插件。插件的使用可参考官方说明文档：[esbuild-plugins](https://esbuild.docschina.org/plugins/)。

官网拷贝一份最简单的配置文件，`babel.config.js`：

```js
const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
    },
  ],
];

module.exports = { presets };
```

`esbuild-plugin-babel`的编写：

```js
const esbuildPluginBabel = {
  name: "esbuild-plugin-babel",
  setup(build) {
    build.onLoad(
      {
        filter: /\.js$/,
      },
      (res) => {
        const contents = fs.readFileSync(res.path).toString();
        const babelRes = babel.transform(contents, {
          configFile: path.resolve("babel.config.js"),
        });
        return {
          contents: babelRes.code,
        };
      }
    );
  },
};
```

其他使用细节可查询[esbuild](https://esbuild.docschina.org/)官方文档。

### 使用

接下来就可以打包测试了。

```shell
npm run dev
npm run prod
```

我们发现编译正常无报错，服务器正常启动，但是代码中引用的`marked`库未正常工作。这是因为`marked`仓库引用入口没有导出`default`变量，`esbuild`无法处理，而在`rollup`打包器中我们是通过安装`rollup-plugin-node-resolve`来实现第三方库导入的。

这里的解决办法不需要这么复杂，我们只需要修改`src/app.js`中`marked`的引用方式为：

```js
import { marked } from "marked";
```

然后重启项目即可。

