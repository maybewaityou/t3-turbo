# phoenix-architecture-h5-react

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

**H5** 项目模板.

## 内容列表

- [背景](#背景)
- [安装](#安装)
- [项目说明](#项目说明)
- [部署](#部署)
- [TODO](#TODO)
- [维护者](#维护者)
- [License](#license)

## 背景

**H5** 项目通用模板.

## 安装

使用 **git** 进行下载安装:

```shell
git clone https://git.chinamworld.com/climb2fame/frontend/h5/phoenix-architecture-h5-react.git
```

**clone** 完成之后, 使用 **npm** 进行安装:

```shell
npm install
```

或者使用 **yarn** 进行安装:

```shell
yarn
```

或者使用 **pnpm** 进行安装:

```shell
pnpm install
```

## 项目说明

项目模板基于 **TypeScript + Vite + React** 进行开发, 并集成了以下功能:

- UI 组件库: **antd-mobile**
- 样式: **TailwindCSS**
- 数据流框架: **Zustand**
- 函数式编程
- 自动化测试: **Vitest**
- 国际化 + Dark Mode
- Mock: **vite-mock**
- **Eslint + prettier**
- **commit lint**

### 目录结构

```shell
├── Dockerfile                           # docker 构建镜像
├── __test__                             # 测试
│   └── index.spec.ts
├── commitlint.config.js
├── cypress                              # e2e 测试
├── cypress.config.ts
├── deploy                               # 部署所需相关配置文件
├── dist                                 # 打包生成的文件夹
├── index.html
├── mock                                 # mock api
│   └── index.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── public                               # 静态资源
│   └── vite.svg
├── saul.toml
├── src                                  # src
│   ├── App.tsx
│   ├── api                              # 网络请求接口, 面向业务端
│   ├── assets                           # 资源文件
│   ├── components                       # UI 组件
│   ├── extensions                       # 第三方库扩展
│   ├── locales                          # 国际化
│   ├── main.tsx
│   ├── pages                            # 页面
│   ├── router                           # 路由
│   ├── stores                           # zustand stores
│   ├── styles                           # 样式
│   ├── utils                            # 工具类
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── tsconfig.vitest.json
├── types                                # 声明文件
├── vite.config.ts
└── vitest.config.ts
```

## 部署

项目使用 **Jenkins** 进行自动化部署. 修改 **deploy** 目录下的配置文件, 再进行部署.

1. 根据 **deploy/etc/nginx/app.conf.tmpl** 配置模板, 修改 **app.conf** 中的配置.
2. 更换 **deploy/etc/nginx/ssl** 中的证书文件, 并修改 **app.conf** 中, **ssl** 的配置, 支持 **https**.

## TODO

- 封装工具类库, 统一集成引入.

## 维护者

[@MeePwn](https://github.com/maybewaityou).

## License

[MIT © MeePwn.](LICENSE)
