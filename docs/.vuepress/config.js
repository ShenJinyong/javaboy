module.exports = {
  title: 'javaboy',
  description: 'javaboy的文档库',
  base: '/javaboy/',
  themeConfig: {
    logo: '/logo.png',
	nav: [
      { text: '首页', link: '/' },
	  {
        text: '技术栈',
        items: [
          { text: 'Spring', link: '/技术栈/Spring/' },
          { text: 'SpringMVC', link: '/技术栈/SpringMVC/' },
          { text: 'MyBatis', link: '/技术栈/MyBatis/' },
          { text: 'MyBatisPlus', link: '/技术栈/MyBatisPlus/' },
          { text: 'Swagger', link: '/技术栈/Swagger/' },
          { text: 'Knife4j', link: '/技术栈/Knife4j/' },
          { text: 'SpringBoot', link: '/技术栈/SpringBoot/' },
          { text: 'Kafka', link: '/技术栈/Kafka/' },
          { text: 'SpringCloud', link: '/技术栈/SpringCloud/' },
		  { text: 'ZooKeeper', link: '/技术栈/ZooKeeper/' }
        ]
      },
	  {
        text: '数据库',
		items: [
		  { text: '关系型数据库', items: [{ text:'MySQL', link: '/数据库/关系型数据库/MySQL/' },{ text: 'PostgreSQL', link: '/数据库/关系型数据库/PostgreSQL/' }]},
		  { text: '非关系型数据库', items: [{ text:'Redis', link: '/数据库/非关系型数据库/Redis/' },{ text: 'MongoDB', link: '/数据库/非关系型数据库/MongoDB/' }]}
		]
      },
	  {
        text: '服务器',
        items: [
          { text: 'MySQL', link: '/服务器/MySQL/' },
          { text: 'JDK', link: '/服务器/JDK/' }
		]
      },
	  { text: '关于我', link: '/关于我/' },
      { text: 'Github', link: 'https://github.com/ShenJinyong/' }
    ]
  }
}