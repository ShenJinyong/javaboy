module.exports = {
  // 标题
  title: 'javaboy',
  // github仓库名
  base: '/javaboy/',
  // 标题模板
  titleTemplate: "沈金勇的博客",
  // 描述
  description: 'javaboy的文档库',
  // 开启上次更新时间
  lastUpdated: true,
  // 主题配置
  themeConfig: {
    // 导航栏图标
    logo: '/logo.png',
    // 标签页图标
    head:[
      ["link", { rel: "icon", href: "/favicon.ico" }],
    ],
    // 导航栏
	  nav: [
      { text: '首页', link: '/' },
      { 
        text: '开发框架', 
        items: [
          { text: "Spring", link: "/开发框架/Spring/Spring" },
          { text: "SpringMVC", link: "/开发框架/SpringMVC/SpringMVC" },
          { text: "MyBatis", link: "/开发框架/MyBatis/MyBatis" },
          { text: "MyBatisPlus", link: "/开发框架/MyBatisPlus/MyBatisPlus" },
		      { text: "MyBatisPlusPlus", link: "/开发框架/MyBatisPlusPlus/MyBatisPlusPlus" },
          { text: "SpringBoot", link: "/开发框架/SpringBoot/SpringBoot" },
          { text: "Shiro", link: "/开发框架/Shiro/Shiro" }
        ]
      },
      { 
        text: '数据库', 
        items: [
          { text: "MySQL", link: "/数据库/MySQL/MySQL" },
          { text: "PostgreSQL", link: "/数据库/PostgreSQL/PostgreSQL" },
          { text: "Redis", link: "/数据库/Redis/Redis" },
          { text: "MongoDB", link: "/数据库/MongoDB/MongoDB" }
        ]
      },
      { 
        text: '算法和数据结构', 
        items: [
          { text: "基本概念", link: "/算法和数据结构/基本概念/基本概念" },
          { text: "排序算法", link: "/算法和数据结构/排序算法/排序算法" }
      ]
    }
    ],
    //社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/ShenJinyong" },
    ],
    //页脚
    footer: {
      copyright: "Copyright © 2018-2022 沈金勇",
    },
  }
}