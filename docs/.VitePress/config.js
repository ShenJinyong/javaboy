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
      { text: '主页', link: '/' },
      { 
        text: '力扣', 
        items: [
          { text: "1.两数之和", link: "/力扣/1.两数之和" },
          { text: "2.两数相加", link: "/力扣/2.两数相加" },
          { text: "3.无重复字符的最长子串", link: "/力扣/3.无重复字符的最长子串" }
        ]
      },
      { 
        text: '技术', 
        items: [
          { text: "Spring", link: "/技术/Spring" },
          { text: "SpringMVC", link: "/技术/SpringMVC" },
          { text: "SpringBoot", link: "/技术/SpringBoot" },
          { text: "MyBatis", link: "/技术/MyBatis" },
          { text: "MyBatisPlus", link: "/技术/MyBatisPlus" },
          { text: "MyBatisPlusPlus", link: "/技术/MyBatisPlusPlus" },
          { text: "Knife4j", link: "/技术/Knife4j" },
          { text: "Shiro", link: "/技术/Shiro" },
        ]
      },
      { 
        text: '实战', 
        items: [
          { text: "测试用例和文档", link: "/实战/测试用例和文档" },
          { text: "信创", link: "/实战/信创" }
        ]
      }
    ],
    //社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/ShenJinyong" },
    ],
    //页脚
    footer: {
      copyright: "Copyright © 2018-2023 沈金勇",
    },
  }
}