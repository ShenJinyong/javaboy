module.exports = {
  title: 'javaboy',
  description: 'javaboy的文档库',
  base: '/javaboy/',
  themeConfig: {
    logo: '/logo.png',
	nav: [
      { text: '首页', link: '/' },
	  {
		text: 'MyBatisPlus',
		items: [
			{ text: '简介', link: '/MyBatisPlus/简介/' },
			{ text: '快速开始', link: '/MyBatisPlus/快速开始/' },
			{ text: '注解', link: '/MyBatisPlus/注解/' },
			{ text: '自动填充功能', link: '/MyBatisPlus/自动填充功能/' }
		]
	  },
	  { text: '关于我', link: '/About/' }
    ]
  }
}