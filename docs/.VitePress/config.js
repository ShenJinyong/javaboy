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
      {
        text: "📦数据库",
        items: [
          { text: "🐬 MySQL", link: "/数据库/MySQL/MySQL" },
          { text: "📦 PostgreSQL", link: "/数据库/PostgreSQL/PostgreSQL" },
          { text: "🍃 Redis", link: "/数据库/Redis/Redis" },
          { text: "🗄️ MongoDB", link: "/数据库/MongoDB/MongoDB" }
        ]
      },
	    {
        text: "📦运维类",
        items: [
          {
            text:"Linux",
            items: [
              { text: "🏹 Linux基础", link: "/运维类/Linux/Linux基础" },
              { text: "🏹 Linux服务器白嫖", link: "/运维类/Linux/Linux服务器白嫖" },
              { text: '🗂️ Linux下安装JDK', link: '/运维类/Linux/Linux下安装JDK' },
              { text: "🐬 Linux下安装MySQL", link: "/运维类/Linux/Linux下安装MySQL" },
              { text: "🧶 Linux下安装PostgreSQL", link: "/运维类/Linux/Linux下安装PostgreSQL" },
              { text: "🧶 Linux下安装Tomcat", link: "/运维类/Linux/Linux下安装Tomcat" },
              { text: "🧶 Linux下安装Nginx", link: "/运维类/Linux/Linux下安装Nginx" },
              { text: "🧶 Linux下安装Docker", link: "/运维类/Linux/Linux下安装Docker" },
              { text: "🧶 Linux下部署jar包", link: "/运维类/Linux/Linux下部署jar包" },
            ],
          },
          {
            text:"Git",
            items: [
              { text: "🏹 Git基础", link: "/运维类/Git/Git基础" },
              { text: "🏹 Git中解决commit大文件", link: "/运维类/Git/Git中解决commit大文件" },
            ],
          },
          {
            text:"Maven",
            items: [
              { text: "🏹 Maven基础", link: "/运维类/Maven/Maven基础" },
            ],
          },
        ]
      },
      { text: '📖简历', link: '/简历/简历' },
      // { text: '📖面试宝典', link: '/面试宝典/Java面试' },
      // {
      //   text: "💻日志框架",
      //   items: [
      //     { text: "🟩 预览篇", link: "/日志框架/日志框架-预览篇" },
      //     { text: "🖥️ JCL篇", link: "/日志框架/日志框架-JCL篇" },
      //     { text: "🟧 JUL篇", link: "/日志框架/日志框架-JUL篇" },
      //     { text: "🟥 Log4j2篇", link: "/日志框架/日志框架-Log4j2篇" },
      //     { text: "🟨 Log4j篇", link: "/日志框架/日志框架-Log4j篇" },
      //     { text: "🟦 LogBack篇", link: "/日志框架/日志框架-LogBack篇" },
      //     { text: "🟩 Slf4J篇", link: "/日志框架/日志框架-Slf4J篇" },
      //     { text: "🛠️ 最佳实践", link: "/日志框架/日志框架-最佳实践" }
      //   ],
      // },
      // {
      //   text: "📖设计模式",
      //   items: [
      //     { text: "🐈‍⬛ 设计模式", link: "/设计模式/设计模式" },
      //     {
      //       text:"创建型模式",
      //       items: [
      //         { text: '🗂️ 抽象工厂模式', link: '/设计模式/创建型模式/抽象工厂模式' },
      //         { text: "🏹 工厂方法模式", link: "/设计模式/创建型模式/工厂方法模式" },
      //         { text: "🧶 单例模式", link: "/设计模式/创建型模式/单例模式" },
      //         { text: "🎒 建造者模式", link: "/设计模式/创建型模式/建造者模式" },
      //         { text: "♾️ 原型模式", link: "/设计模式/创建型模式/原型模式" }
      //       ],
      //     },
      //     {
      //       text:"结构型模式",
      //       items: [
      //         { text: "🐞 代理模式", link: "/设计模式/结构型模式/代理模式" },
      //         { text: "⭕ 桥梁模式", link: "/设计模式/结构型模式/桥梁模式" },
      //         { text: "📚 适配器模式", link: "/设计模式/结构型模式/适配器模式" },
      //         { text: '🗂️ 外观模式', link: '/设计模式/结构型模式/外观模式' },
      //         { text: '🏹 享元模式', link: '/设计模式/结构型模式/享元模式' },
      //         { text: "⬜ 装饰器模式", link: "/设计模式/结构型模式/装饰器模式" },
      //         { text: "⬛ 组合模式", link: "/设计模式/结构型模式/组合模式" },

      //       ],
      //     },
      //     {
      //       text:"行为型模式",
      //       items: [
      //         { text: "🌽 备忘录模式", link: "/设计模式/行为型模式/备忘录模式" },
      //         { text: "⭕ 策略模式", link: "/设计模式/行为型模式/策略模式" },
      //         { text: "📚 迭代器模式", link: "/设计模式/行为型模式/迭代器模式" },
      //         { text: '🗂️ 访问者模式', link: '/设计模式/行为型模式/访问者模式' },
      //         { text: '🏹 观察者模式', link: '/设计模式/行为型模式/观察者模式' },
      //         { text: "⬜ 解释器模式", link: "/设计模式/行为型模式/解释器模式" },
      //         { text: "⬛ 命令模式", link: "/设计模式/行为型模式/命令模式" },
      //         { text: "🌽 模板方法模式", link: "/设计模式/行为型模式/模板方法模式" },
      //         { text: "⭕ 责任链模式", link: "/设计模式/行为型模式/责任链模式" },
      //         { text: "📚 中介者模式", link: "/设计模式/行为型模式/中介者模式" },
      //         { text: "🌽 状态模式", link: "/设计模式/行为型模式/状态模式" },
      //       ],
      //     },
      //   ],
      // },
    ],
    //社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/ShenJinyong" },
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