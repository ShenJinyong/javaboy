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