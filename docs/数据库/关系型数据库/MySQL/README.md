# MySQL

## MySQL使用篇

### MySQL安装

下载并安装MySQL官方的`yum repository`：

```sh
wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
```

使用yum安装：

```sh
yum -y install mysql57-community-release-el7-10.noarch.rpm
```

更新MySQL GPG密钥：

```sh
yum -y install mysql-community-server
```

安装MySQL的服务器：

```sh
yum -y install mysql-community-server
```

启动MySQL：

```sh
systemctl start mysqld.service
```

查看MySQL运行状态：

```sh
systemctl status mysqld.service
```

查看是否开机启动：

```sh
systemctl list-unit-files|grep mysqld.service
```

查看一次性密码：

```sh
grep "password" /var/log/mysqld.log
```

进入数据库：

```sh
mysql -uroot -p
```

设置密码策略：

```sql
set global validate_password_policy=0;
set global validate_password_length=1;
```

修改密码，填写真实密码：

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';
```

查看密码策略：

```sql
SHOW VARIABLES LIKE 'validate_password%';
```

授权远程连接，填写真实密码或者ip，无效可删除`WITH GRANT OPTION`：

```sql
--赋予任何主机访问权限：
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;
--允许指定主机(IP地址)访问权限：
GRANT ALL PRIVILEGES ON *.* TO 'myuser'@'192.168.1.3' IDENTIFIED BY 'root' WITH GRANT OPTION;
```

刷新权限：

```sql
FLUSH PRIVILEGES;
```

查看默认使用的字符集：

```sql
show variables like 'character%';
```

编辑mysql启动文件：

```sh
vim /etc/my.cnf
```

修改默认使用的字符集：

```sh
[mysqld]
character_set_server=utf8
```

退出数据库：

```sql
quit;
```

重启MySQL服务:

```sh
systemctl restart mysqld.service;
```

卸载`yum repository`：

```sh
yum -y remove mysql57-community-release-el7-10.noarch
```

删除`yum repository`：

```sh
rm -rf mysql57-community-release-el7-10.noarch.rpm
```

查看防火墙状态：

```sh
systemctl status firewalld.service
```

打开防火墙：

```sh
systemctl start firewalld;
## 永久打开防火墙
systemctl start firewalld;
```

关闭防火墙：

```sh
systemctl stop firewalld.service
## 永久关闭防火墙
systemctl disable firewalld.service
```

阿里云配置安全组：

| 授权策略 | 优先级 | 协议类型  | **端口范围**   | 授权对象     |
| -------- | ------ | --------- | -------------- | ------------ |
| 允许     | 1      | 自定义TCP | 目的:3306/3306 | 源:0.0.0.0/0 |

> 本地测试连接，成功！！！

### MySQL卸载

启动MySQL服务：

```sh
systemctl start mysqld.service
```

关闭MySQL服务：

```sh
systemctl stop mysqld.service
```

查看mysql的安装状况：

```sh
rpm -qa|grep -i mysql
```

开始卸载：

```sh
# 批量卸载
yum -y remove mysql-*
# 单独卸载
yum remove mysql-community-common-5.7.20-1.el7.x86_64
yum remove mysql-community-client-5.7.20-1.el7.x86_64
yum remove mysql57-community-release-el7-11.noarch
yum remove mysql-community-libs-5.7.20-1.el7.x86_64
yum removemysql-community-server-5.7.20-1.el7.x86_64
```

查看是否卸载完成：

```sh
rpm -qa |grep -i mysql
```

查找mysql相关目录：

```sh
find / -name mysql
```

删除相关目录：

```sh
rm -rf 
```

删除/etc/my.cnf：

```sh
rm -rf /etc/my.cnf
```

删除/var/log/mysqld.log：

```sh
# 如果不删除这个文件，会导致新安装的mysql无法生存新密码，从而无法登陆
rm -rf /var/log/mysqld.log
```

## MySQL基础篇

### 表

### 视图

### 存储过程

### 存储函数

### 触发器

### 事件

## MySQL高级篇

### MySQL架构篇

### 索引及调优篇

### MySQL事务篇

### 日志与备份篇
