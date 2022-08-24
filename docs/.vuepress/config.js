module.exports = {
  title: 'javaboy',
  description: 'javaboy的文档库',
  themeConfig: {
    logo: '/logo.png',
	nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/' },
	  {
        text: '基础技术',
		items: [
		  { text: '数据库', items: [{ text:'MySQL', link: '/基础技术/数据库/MySQL/' },{ text: 'PostgreSQL', link: '/基础技术/数据库/PostgreSQL/' },{ text: 'MongoDB', link: '/基础技术/数据库/MongoDB/' }]},
		  { text: '消息队列', items: [{ text:'Kafka', link: '/基础技术/消息队列/Kafka/' },{ text: 'Redis', link: '/基础技术/消息队列/Redis/' },{ text: 'Message Queue', link: '/基础技术/消息队列/Message Queue/' }]}
		]
      },
	  {
        text: '理论知识',
        items: [
          { text: '算法数据结构', link: '/理论知识/算法数据结构/' }
        ]
      },
      { text: 'Github', link: 'https://github.com/ShenJinyong/javaboy' },
    ]
  }
}