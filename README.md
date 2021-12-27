# webapp-quick-start

> 快速启用一个相对完整的webapp，切换不同分支以选择不同的开发环境。

## 分支构建细节

本分支同[webpack](https://github.com/fongzhizhi/webapp-quick-start/tree/webpack)分支基本无差别，只是项目使用了`typescript`，因此我们再引入专门的`loader`来打包`ts`即可，这里我们使用的是`esbuild-loader`。

另外值得注意的是，我们还需要补充配置文件可接受的后缀：

```js
resolve: {
  extensions: [".ts", ".js"],
},
```

其他配置同[webpack](https://github.com/fongzhizhi/webapp-quick-start/tree/webpack)完全一致，这里不再展开。