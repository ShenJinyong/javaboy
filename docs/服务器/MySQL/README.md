# Linux上使用MySQL

> Linux版本为Centos7.9，MySQL版本为5.7。

服务器上安装MySQL的方式：

- 在线安装：yum、宝塔面板

- 离线安装：tar.gz、rpm

## 1.安装

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

## 2.配置

查看MySQL运行状态：

```sh
systemctl status mysqld.service
```

启动MySQL服务：

```sh
# 启动
systemctl start mysqld.service
# 重启
systemctl restart mysqld.service
```

关闭MySQL服务：

```sh
systemctl stop mysqld.service
```

查看是否开机启动：

```sh
systemctl list-unit-files|grep mysqld.service
```

---

查看一次性密码：

```sh
grep "password" /var/log/mysqld.log
```

进入数据库：

```sh
mysql -uroot -p
```

查看密码策略：

```sql
SHOW VARIABLES LIKE 'validate_password%';
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

修改默认的比较规则和字符集：

```sh
vim /etc/my.cnf
[client]
# 比较规则
default_character_set=utf8
[mysqld]
# 字符集
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

---

卸载`yum repository`：

```sh
yum -y remove mysql57-community-release-el7-10.noarch
```

删除`yum repository`：

```sh
rm -rf mysql57-community-release-el7-10.noarch.rpm
```

---

查看防火墙状态：

```sh
systemctl status firewalld.service
```

打开防火墙：

```sh
# 打开防火墙
systemctl start firewalld;
# 开机时打开防火墙
systemctl enable firewalld;
```

关闭防火墙：

```sh
systemctl stop firewalld.service
# 开机时关闭防火墙
systemctl disable firewalld.service
```

---

阿里云配置安全组：

| 授权策略 | 优先级 | 协议类型  | **端口范围**   | 授权对象     |
| -------- | ------ | --------- | -------------- | ------------ |
| 允许     | 1      | 自定义TCP | 目的:3306/3306 | 源:0.0.0.0/0 |

## 3.卸载

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

## 4.使用

mysql命令详解：

```sh
mysql 
# -h 添加连接主机ip:localhost 
# -P 添加端口:3306 
# -u 添加用户名:root 
# -p 添加密码和数据库
# -e 添加查询sql
```
