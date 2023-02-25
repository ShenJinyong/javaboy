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
      { text: 'Home', link: '/' },
      { 
        text: 'LeetCode', 
        items: [
          { text: "1.两数之和", link: "/LeetCode/1.两数之和" },
          { text: "2.两数相加", link: "/LeetCode/2.两数相加" },
          { text: "3.无重复字符的最长子串", link: "/LeetCode/3.无重复字符的最长子串" }
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