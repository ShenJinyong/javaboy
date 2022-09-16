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
      { text: '📖面试宝典', link: '/面试宝典/Java面试' },
      {
        text: "📦项目实战",
        items: [
          { text: "📦 白嫖阿里云", link: "/项目实战/白嫖阿里云服务器" },
          { text: "📦 Linux安装JDK", link: "/项目实战/Linux安装JDK" },
        ]
      },
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
      {
        text: "📖设计模式",
        items: [
          { text: "🐈‍⬛ 设计模式", link: "/设计模式/设计模式" },
          {
            text:"创建型模式",
            items: [
              { text: '🗂️ 抽象工厂模式', link: '/设计模式/创建型模式/抽象工厂模式' },
              { text: "🏹 工厂方法模式", link: "/设计模式/创建型模式/工厂方法模式" },
              { text: "🧶 单例模式", link: "/设计模式/创建型模式/单例模式" },
              { text: "🎒 建造者模式", link: "/设计模式/创建型模式/建造者模式" },
              { text: "♾️ 原型模式", link: "/设计模式/创建型模式/原型模式" }
            ],
          },
          {
            text:"结构型模式",
            items: [
              { text: "🐞 代理模式", link: "/设计模式/结构型模式/代理模式" },
              { text: "⭕ 桥梁模式", link: "/设计模式/结构型模式/桥梁模式" },
              { text: "📚 适配器模式", link: "/设计模式/结构型模式/适配器模式" },
              { text: '🗂️ 外观模式', link: '/设计模式/结构型模式/外观模式' },
              { text: '🏹 享元模式', link: '/设计模式/结构型模式/享元模式' },
              { text: "⬜ 装饰器模式", link: "/设计模式/结构型模式/装饰器模式" },
              { text: "⬛ 组合模式", link: "/设计模式/结构型模式/组合模式" },

            ],
          },
          {
            text:"行为型模式",
            items: [
              { text: "🌽 备忘录模式", link: "/设计模式/行为型模式/备忘录模式" },
              { text: "⭕ 策略模式", link: "/设计模式/行为型模式/策略模式" },
              { text: "📚 迭代器模式", link: "/设计模式/行为型模式/迭代器模式" },
              { text: '🗂️ 访问者模式', link: '/设计模式/行为型模式/访问者模式' },
              { text: '🏹 观察者模式', link: '/设计模式/行为型模式/观察者模式' },
              { text: "⬜ 解释器模式", link: "/设计模式/行为型模式/解释器模式" },
              { text: "⬛ 命令模式", link: "/设计模式/行为型模式/命令模式" },
              { text: "🌽 模板方法模式", link: "/设计模式/行为型模式/模板方法模式" },
              { text: "⭕ 责任链模式", link: "/设计模式/行为型模式/责任链模式" },
              { text: "📚 中介者模式", link: "/设计模式/行为型模式/中介者模式" },
              { text: "🌽 状态模式", link: "/设计模式/行为型模式/状态模式" },
            ],
          },
        ],
      },
      { text: '📖我的简历', link: '/我的简历/简历' },
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