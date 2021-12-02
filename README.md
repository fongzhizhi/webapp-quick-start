# webapp-quick-start

> 快速启用一个相对完整的webapp，切换不同分支以选择不同的开发环境。

## 分支（[base-ts](https://github.com/fongzhizhi/webapp-quick-start/tree/base-ts)）详情

> 本分支基于[base](https://github.com/fongzhizhi/webapp-quick-start/tree/base)分支，引入`typescript`作为本地开发语言。

### 准备工作

1. 为了正常使用`typescript`，首先需要安装`typescript`模块，用于编译`ts`文件：

   ```shell
   npm install typescript
   ```

2. 编写配置文件`tsconfig.json`。

3. 将所有`.js`的文件修改为`.ts`文件。

4. 编写或安装声明文件。比如该分支使用到了未提供声明文件的`marked`第三方模块，我们就需要手动安装：

   ```shell
   npm install '@types/marked'
   ```

### 打包

本分支使用了`rollup`进行模块打包，现在我们需要增加一个可以处理`.ts`文件的插件。

```shell
npm install rollup-plugin-typescript2
```

然后在`rollup.config.js`中配置好：

```js
plugins: [
    //...
    typescript({
    	tsconfig: "tsconfig.json",
	})
]
```

接下来就可以愉快地使用`typescipt`开发了！