# webapp-quick-start

> 快速启用一个相对完整的webapp，切换不同分支以选择不同的开发环境。

## 分支构建细节

本分支基于仓库[主分支-ts版本](https://github.com/fongzhizhi/webapp-quick-start/tree/main-ts)，借助号称下一代前端开发与构建工具的[vitel](https://cn.vitejs.dev/)构建项目。该分支同[parcel](https://github.com/fongzhizhi/webapp-quick-start/tree/parcel)分支基本一致，也是零配置即可完成项目的快速构建。

### 准备工作

拉取[主分支-ts版本](https://github.com/fongzhizhi/webapp-quick-start/tree/main-ts)分支代码，安装`vite`：

```shell
npm install vite
```

`vite`同`parcel`一样，会自动根据文件入口打包使用到的相关资源，默认的入口为`index.html`，因此我们改造一下`public/index.html`，不需要再使用`ejs`模板来编写了，我们直接引用项目使用到的资源即可，然后移动到项目根目录。

### 编译

添加指令：

```json
"scripts": {
  "build": "vite build",
  "server": "node app.router.js",
  "vite": "vite --open",
  "dev": "npm-run-all -p server vite"
},
```

编译：

```shell
npm run build
```

启动本地服务：

```shell
npm run dev
```
