# MySQL命令

启动mysql服务:`net start mysql57`

关闭mysql服务：`net stop mysql57`

> mysql登录

`mysql`：

- 用户名：-uroot
- 密码：-p123456
- ip：-hlocalhost
- 端口：-p3306

显示数据库：`show databases;`

- information_schema：保存数据库服务的一些系统信息，比如数据库的名称、表的名称、字段名称和存储权限等
- mysql：保存数据库服务器的运行时需要的系统信息，比如数据库的文件夹和当前的字符集等
- performance_schema：主要用来存储监控mysql的各项性能指标
- sys：存储性能指标，供数据库管理员或开发人员监控mysql性能的

CREATE TABLE `employee` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(15) DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARSET=latin1





dbtest1	CREATE DATABASE `dbtest1` /*!40100 DEFAULT CHARACTER SET latin1 */



**employee	CREATE TABLE `employee` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(15) CHARACTER SET latin1 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8**