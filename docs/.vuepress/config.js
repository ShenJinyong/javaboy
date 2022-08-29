module.exports = {
  title: 'javaboy',
  description: 'javaboy的文档库',
  base: '/javaboy/',
  themeConfig: {
    logo: '/logo.png',
	nav: [
      { text: '首页', link: '/' },
	  {
        text: '开发框架',
        items: [
          { text: 'Spring', link: '/开发框架/Spring/' },
          { text: 'SpringMVC', link: '/开发框架/SpringMVC/' },
          { text: 'MyBatis', link: '/开发框架/MyBatis/' },
          { text: 'SpringBoot', link: '/开发框架/SpringBoot/' },
          { text: 'SpringCloud', link: '/开发框架/SpringCloud/' }
        ]
      },
	  {
        text: '中间件',
        items: [
          { text: 'MyBatisPlus', link: '/中间件/MyBatisPlus/' },
          { text: 'Swagger', link: '/中间件/Swagger/' },
          { text: 'Knife4j', link: '/中间件/Knife4j/' },
          { text: 'Shiro', link: '/中间件/Shiro/' },
          { text: 'SpringSecurity', link: '/中间件/SpringSecurity/' },
          { text: 'Kafka', link: '/中间件/Kafka/' },
		  { text: 'ZooKeeper', link: '/中间件/ZooKeeper/' }
        ]
      },
	  {
        text: '数据库',
		items: [
		  { text: 'MySQL', link: '/数据库/MySQL/' },
          { text: 'PostgreSQL', link: '/数据库/PostgreSQL/' },
          { text: 'Redis', link: '/数据库/Redis/' },
          { text: 'MongoDB', link: '/数据库/非关系型数据库/MongoDB/' }
		]
      },
	  {
        text: '运维类',
        items: [
          { text: 'Maven', link: '/运维类/Maven/' },
          { text: 'Git', link: '/运维类/Git/' },
          { text: 'Linux', link: '/运维类/Linux/' }
		]
      },
	  {
		  text: '在线工具',
		  items:[
			{ text:'JSON格式化',link: 'https://www.bejson.com/'},
			{ text:'正则表达式',link: 'https://tool.oschina.net/regex/'},
			{ text:'加密解密',link: 'https://tool.lu/encdec/'},
			{ text:'Linux命令',link: 'https://man.niaoge.com/'},
			{ text:'配色导航',link: 'https://color.uisdc.com/'},
			{ text:'进制转换',link: 'https://tool.lu/hexconvert/'},
			{ text:'二维码制作',link: 'https://cli.im/'},
			{ text:'数字大写转换器',link: 'https://tool.gaodun.com/rmb.html'},
			{ text:'计算器',link: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=%E8%AE%A1%E7%AE%97%E5%99%A8'}
		  ]
	  },
	  {
		  text: '我的简介',link: '/关于我/'
	  }
    ]
  }
}