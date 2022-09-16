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
      { text: '首页', link: '/' },
      { text: '📖开发手册', link: '/开发手册/阿里巴巴-JAVA开发手册-泰山版' },
      {
        text: "📦数据库",
        items: [
          { text: "🐬 MySQL", link: "/Database/MySQL/MySQL" },
          { text: "📦 PostgreSQL", link: "/Database/PostgreSQL/PostgreSQL" },
          { text: "🍃 Redis", link: "/Database/Redis/Redis" },
          { text: "🗄️ MongoDB", link: "/Database/MongoDB/MongoDB" }
        ]
      },
      {
        text: "💻日志框架",
        items: [
          { text: "🟩 预览篇", link: "/日志框架/日志框架-预览篇" },
          { text: "🖥️ JCL篇", link: "/日志框架/日志框架-JCL篇" },
          { text: "🟧 JUL篇", link: "/日志框架/日志框架-JUL篇" },
          { text: "🟥 Log4j2篇", link: "/日志框架/日志框架-Log4j2篇" },
          { text: "🟨 Log4j篇", link: "/日志框架/日志框架-Log4j篇" },
          { text: "🟦 LogBack篇", link: "/日志框架/日志框架-LogBack篇" },
          { text: "🟩 Slf4J篇", link: "/日志框架/日志框架-Slf4J篇" },
          { text: "🛠️ 最佳实践", link: "/日志框架/日志框架-最佳实践" }
        ],
      },
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