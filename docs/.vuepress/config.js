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
			{ text: '自动填充功能', link: '/MyBatisPlus/自动填充功能/' }
		]
	  },
	  { text: '关于我', link: '/About/' }
    ]
  }
}