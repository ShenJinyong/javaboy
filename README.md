# javaboy

javaboy的文档库

## 快速开始

创建目录：`mkdir javaboy`

进入目录：`cd javaboy`

全局安装yarn源：`npm install -g yarn`

初始化：`yarn init`

本地安装 VitePress：`yarn add --dev vitepress`

创建第一篇文档：`mkdir docs && echo '# Hello VitePress' > docs/index.md`

在`package.json`添加一些`script`:

```json
{
  "name": "javaboy",
  "version": "1.0.0",
  "description": "javaboy的文档网站",
  "main": "index.js",
  "repository": "git@github.com:ShenJinyong/javaboy.git",
  "author": "ShenJinyong <438217638@qq.com>",
  "license": "MIT",
  "devDependencies": {
    "vitepress": "^1.0.0-alpha.15"
  },
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  }
}
```

在本地服务器上启动文档站点：`yarn docs:dev`

VitePress 会在 `http://localhost:5173`启动一个热重载的开发服务器。

> 小问题：
>
> - cmd模式下，使用命令权限不足
>
> 解决方法：
>
> - 首先在windows搜索windows PowerSell
> - 然后以管理员身份运行ISE
> - 执行命令：`set-ExecutionPolicy RemoteSigned`

## 自定义主题

添加配置：`/javaboy/docs/.VitePress/config.js`

```js
module.exports = {
  title: 'javaboy', //标题
  base: '/javaboy/',//github仓库名
  titleTemplate: "沈金勇的博客", //标题模板
  description: 'javaboy的文档库',//描述
  lastUpdated: true, //开启上次更新时间
  markdown: {
    // 主题
    theme: "nord",
  },
  themeConfig: {
    //导航栏图标
    logo: '/logo.png',
    //标签页图标
    head:[
      ["link", { rel: "icon", href: "/favicon.ico" }],
    ],
    //导航栏
	  nav: [
      { text: '首页', link: '/' }
    ],
    //社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/ShenJinyong" },
      { icon: "twitter", link: "https://github.com/ShenJinyong" },
      { icon: "instagram", link: "https://github.com/ShenJinyong" },
      {
        icon: "youtube",
        link: "https://github.com/ShenJinyong",
      },
    ],
    //页脚
    footer: {
      copyright: "Copyright © 2018-present 沈金勇",
    },
    //碳广告
    carbonAds: {
      code: "your-carbon-code",
      placement: "your-carbon-placement",
    }
  }
}
```

静态图片目录：`/javaboy/docs/public`/

- 添加导航栏图标`logo.png`
- 添加标签页图标`favicon.ico`

本地启动：`yarn docs:dev`

访问项目：`http://localhost:5173/javaboy/`

> 注意
>
> 自定义配置`/javaboy/docs/.VitePress/config.js`中base既是项目根路径，也是github仓库地址

## Github部署

部署脚本`/javaboy/deploy.sh`，双击运行`deploy.sh`

```sh
#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
npm run docs:build

# 进入待发布的目录
cd docs/.vitepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:ShenJinyong/javaboy.git master:gh-pages

cd -
```

Github配置

![github-pages](.\images\github-pages.png)

步骤：

- 点击项目仓库Settings

- 点击Pages
- 选择`Source`：`Deploy from a branch`
- 选择`Branch`：`gh-pages`/`root`
- 访问`Visit site`

>注意：
>
>- `gh-pages`分支在第一次`deploy`后才生成
>- 修改内容，重新运行`deploy.sh`，访问地址`https://shenjinyong.github.io/javaboy/`
