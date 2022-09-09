module.exports = {
  title: 'javaboy',
  description: 'javaboy的文档库',
  base: '/javaboy/',
  themeConfig: {
    logo: '/logo.png',
	nav: [
      { text: '首页', link: '/' },
	  {
        text: '数据库',
		items: [
			{
				text:'关系型数据库',link:'/数据库/关系型数据库/',
				items:[
					{ text:'写在前面',link:'/数据库/关系型数据库/' },
					{ text: 'MySQL', link: '/数据库/关系型数据库/MySQL/' },
					{ text: 'PostgreSQL', link: '/数据库/关系型数据库/PostgreSQL/' },
				]
			},
			{
				text:'非关系型数据库',
				items:[
					{ text: 'Redis', link: '/数据库/非关系型数据库/Redis/' },
					{ text: 'MongoDB', link: '/数据库/非关系型数据库/MongoDB/' }
				]
			}
		]
      }
    ]
  }
}