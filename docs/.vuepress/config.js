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
			{ text: 'CRUD接口', link: '/MyBatisPlus/CRUD接口/' },
			{ text: '条件构造器', link: '/MyBatisPlus/条件构造器/' },
			{ text: '代码生成器', link: '/MyBatisPlus/代码生成器/' },
			{ text: '自动填充功能', link: '/MyBatisPlus/自动填充功能/' }，
			{ text: '注解', link: '/MyBatisPlus/注解/' },
			{ text: '主键', link: '/MyBatisPlus/主键/' },
			{ text: '逻辑删除', link: '/MyBatisPlus/逻辑删除/' },
			{ text: '乐观锁', link: '/MyBatisPlus/乐观锁/' },
			{ text: '分页', link: '/MyBatisPlus/分页/' }
		]
	  },
	  { text: '关于我', link: '/About/' }
    ]
  }
}