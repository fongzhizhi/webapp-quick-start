# webapp-quick-start

> 快速启用一个相对完整的webapp，切换不同分支以选择不同的开发环境。

## 分支构建细节

本分支基于仓库[主分支-ts版本](https://github.com/fongzhizhi/webapp-quick-start/tree/main-ts)，借助零配置Web应用打包工具[parcel](https://www.parceljs.cn/)构建项目。

### 准备工作

拉取[主分支-ts版本](https://github.com/fongzhizhi/webapp-quick-start/tree/main-ts)分支代码，安装`parcel-bundler`：

```shell
npm install parcel-bundler
```

由于`parcel`不需要配置文件，我们只需要指定打包文件，`parcel`会自动根据文件入口打包使用到的相关资源。

因此我们改造一下`public/index.html`，不需要再使用`ejs`模板来编写了，我们直接引用项目使用到的资源即可。

### 编译

添加指令：

```json
"scripts": {
  "build": "parcel build public/index.html",
  "server": "node app.router.js",
  "parcel:dev": "SET NODE_ENV=development && parcel public/index.html --open",
  "parcel:prod": "SET NODE_ENV=production && parcel public/index.html --open",
  "dev": "npm-run-all -p server parcel:dev",
  "prod": "npm-run-all -p server parcel:prod"
}
```

编译：

```shell
npm run build
```

启动本地服务：

```shell
npm run dev
npm run prod
```

### 其他细节

由于`parcel`能自动启动服务，但该项目首页需要向服务器发起`/readme`请求`README.md`文件，所以我们还需要另外开启另一个端口的服务器。具体请查看`app.router.js`。