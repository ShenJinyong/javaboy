# Linux下安装PostgreSQL

## 安装启动

安装

```sh
yum install -y postgresql-server
```

![yum安装PostgreSQL](.\images\yum安装PostgreSQL.png)

![PostgreSQL依赖](.\images\PostgreSQL依赖.png)

postgresql数据库初始化

````sh
service postgresql initdb
````

![postgresql数据库初始化](.\images\postgresql数据库初始化.png)

启动postgresql服务

```sh
systemctl start postgresql
# 开机启动
systemctl enable postgresql
```

![启动postgresql服务](.\images\启动postgresql服务.png)

systemctl查看postgresql状态

```sh
systemctl status postgresql
```

![systemctl查看postgresql状态](.\images\systemctl查看postgresql状态.png)

查看postgresql状态

![查看postgresql状态](.\images\查看postgresql状态.png)

## 连接postgresql数据库

想连接到数据库，需要切换到postgres用户（默认情况下，安装postgresql时会自动生成），使用psql连接到数据库中，在该用户下连接数据库，是不需要密码的。

查看生成的用户

```sh
tail -1 /etc/passwd
```

![查看生成的用户](.\images\查看生成的用户.png)

切换用户，登录postgresql

```sh
su - postgres
```

![登录postgresql](.\images\登录postgresql.png)

使用psql登录数据库

```sh
psql
```

![使用psql登录数据库](.\images\使用psql登录数据库.png)

列出所有数据库，相当于show databases;

```sh
\l
```

![postgresql列出所有数据库](.\images\postgresql列出所有数据库.png)

列出所有数据库

```sh
\q
```

![postgresql退出数据库](.\images\postgresql退出数据库.png)

## postgresql的简单配置

yum安装时路径

```sh
ll /var/lib/pgsql/data/
```

![yum安装postgresql路径](.\images\yum安装postgresql路径.png)

修改监听的Ip和端口,可选

```sh
#vim /var/lib/pgsql/data/postgresql.conf
59 #listen_addresses = 'localhost'  # what IP address(es) to listen on;
 60                               # comma-separated list of addresses;
 61                         # defaults to 'localhost'; use '*' for all
 62                                         # (change requires restart)
 63 #port = 5432                            # (change requires restart)
 修改端口时，默认把前面#去掉，不修改的话默认为5432
 #修改完后重启服务
 #systemctl restart postgresql
```

修改数据库log相关的参数，可选

```sh
# - Where to Log -

#log_destination = 'stderr'    # Valid values are combinations of
                               # stderr, csvlog, syslog, and eventlog,
                             # depending on platform.  csvlog
                              # requires logging_collector to be on.

# This is used when logging to stderr:
logging_collector = on       # Enable capturing of stderr and csvlog
#日志默认为打开
                             # into log files. Required to be on for
                                        # csvlogs.
                              # (change requires restart)

# These are only used if logging_collector is on:
#log_directory = 'pg_log'    # directory where log files are written,
                             # can be absolute or relative to PGDATA
log_filename = 'postgresql-%a.log'      # log file name pattern,
                              # can include strftime() escapes
#log_file_mode = 0600                   # creation mode for log files,
                              # begin with 0 to use octal notation
log_truncate_on_rotation = on   # If on, an existing log file with the
                              # same name as the new log file will be
                             # truncated rather than appended to.
                             # But such truncation only occurs on
                            # time-driven rotation, not on restarts
                            # or size-driven rotation.  Default is
                            # off, meaning append to existing files
                            # in all cases.
log_rotation_age = 1d       # Automatic rotation of logfiles will
#日志只保存一天
                            # happen after that time.  0 disables.
log_rotation_size = 0       # Automatic rotation of logfiles will
                             # happen after that much log output.
                              # 0 disables.
```

内存参数的设置,可选

```sh
# - Memory -

shared_buffers = 32MB                   # min 128kB
#共享内存的大小，用于共享数据块
```

编辑配置文件pg_hba.conf

```sh
vim /var/lib/pgsql/data/pg_hba.conf
```

![编辑postgersql配置文件](.\images\编辑postgersql配置文件.png)

在最后一行添加支持远程登录

```conf
host	all		all		0.0.0.0/0 		md5
```

![支持远程登录](.\images\支持远程登录.png)

编辑配置文件postgresql.conf

```sh
vim /var/lib/pgsql/data/postgresql.conf
```

把localhost更改为*

![postgresql修改localhost](.\images\postgresql修改localhost.png)

重启postgresql

```sh
systemctl restart postgresql
```

![重启postgresql](.\images\重启postgresql.png)

修改默认postgresql密码

```sh
# 注意必须有逗号,此处密码自己设置
ALTER USER postgres WITH PASSWORD '******';
```

![修改默认postgresql密码](.\images\修改默认postgresql密码.png)

添加用户、创建数据库、并登录

```sh
#创建用户和密码
postgres=# create user wang01 with password '123456';
CREATE ROLE
#创建数据库，基于用户wang01
postgres=# create database test01 owner wang01;
CREATE DATABE
#授权用户
postgres=# grant all privileges on database test01 to wang01;
GRANT
#查看结果
postgres=# \l
                             List of databases
   Name    |  Owner   | Encoding  | Collate | Ctype |   Access privileges   
-----------+----------+-----------+---------+-------+-----------------------
 postgres  | postgres | SQL_ASCII | C       | C     | 
 template0 | postgres | SQL_ASCII | C       | C     | =c/postgres          +
           |          |           |         |       | postgres=CTc/postgres
 template1 | postgres | SQL_ASCII | C       | C     | =c/postgres          +
           |          |           |         |       | postgres=CTc/postgres
 test      | wang     | SQL_ASCII | C       | C     | =Tc/wang             +
           |          |           |         |       | wang=CTc/wang
 test01    | wang01   | SQL_ASCII | C       | C     | =Tc/wang01           +
           |          |           |         |       | wang01=CTc/wang01
 test02    | postgres | SQL_ASCII | C       | C     | 
(6 rows)

#登录 
[root@centos7 data]# psql -h 10.0.0.3 -p 5432 -U wang -d test
Password for user wang: 
psql (9.2.24)
Type "help" for help.

test=> \l
                             List of databases
   Name    |  Owner   | Encoding  | Collate | Ctype |   Access privileges   
-----------+----------+-----------+---------+-------+-----------------------
 postgres  | postgres | SQL_ASCII | C       | C     | 
 template0 | postgres | SQL_ASCII | C       | C     | =c/postgres          +
           |          |           |         |       | postgres=CTc/postgres
 template1 | postgres | SQL_ASCII | C       | C     | =c/postgres          +
           |          |           |         |       | postgres=CTc/postgres
 test      | wang     | SQL_ASCII | C       | C     | =Tc/wang             +
           |          |           |         |       | wang=CTc/wang
(4 rows)
```

postgresql数据库基本应用

```sh
1、列出所有数据库
mysql: show databases
psql:    \l或\list
2、切换数据库
mysql:  use dbname
psql:     \c dbname
3、列出当前数据库下的所有表
mysql:  show tables
psql:       \d
4、列出指定表的所有字段
mysql:   shwo columns from table_name
psql:    \d table_name
5、查看表的基本情况
mysql:  describe table_name
psql:    \d+ table_name
```