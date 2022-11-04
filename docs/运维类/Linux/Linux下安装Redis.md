# Linux安装Redis

## 安装

安装redis依赖

```sh
yum install -y gcc tcl
```

![redis安装gcc依赖](.\images\redis安装gcc依赖.png)

下载redis依赖包

```sh
wget https://github.com/redis/redis/archive/7.0.5.tar.gz
```

![](.\images\redis下载.png)

解压

```sh
tar -zvxf 7.0.5.tar.gz
```

![](.\images\redis解压.png)

进入redis

```sh
cd redis-7.0.5/
```

![](.\images\进入redis.png)

编译和安装

```sh
make && make install
```

![编译和安装redis](.\images\编译和安装redis.png)

进入redis的默认安装路径

```sh
cd /usr/local/bin
ls
```

![进入redis的默认安装路径](.\images\进入redis的默认安装路径.png)

## 启动

> 默认启动

```sh
./redis-server
```

![默认启动redis](.\images\默认启动redis.png)

> 指定配置文件启动

拷贝配置文件

```sh
 cp redis.conf redis.conf.bck
```

![拷贝redis的配置文件](.\images\拷贝redis的配置文件.png)

修改配置文件

```sh
vim redis.conf
```

修改内容

```sh
# 监听的地址，默认是127.0.0.1，会导致只能在本地访问，修改为0.0.0.0则可以在任意ip访问，生产环境不要设置为0.0.0.
bind 0.0.0.0
# 守护进程，修改为yes后即可后台运行
daemonize yes
# 密码，设置后访问redis必须输入密码
requirepass 123456
# protected-mode参数是为了禁止外网访问redis
peotected-mode no
```

其他常见配置

```sh
# 监听的端口
port 6379
# 工作目录，默认是当前目录，也就是运行redis-serer时的命令，日志、持久化等文件也会保存在这个目录
dir .
# 数据库数量，设置为1，代表只使用1个库，默认有16个库，编号0-15
databases 1
# 设置reddis能够使用的最大内存
maxmemory 512mb
# 日志文件，默认为空，不记录日志，可以指定日志文件名
logfile "redis.log"
```

拷贝配置文件

```sh
cp redis.conf /usr/local/bin
```

![redis配置文件移动](.\images\redis配置文件移动.png)

指定文件启动

```sh
./redis-server ./redis.conf 
```

![redis指定配置文件启动](.\images\redis指定配置文件启动.png)

查看redis启动情况

```sh
ps -ef|grep redis
```

![查看redis启动情况](.\images\查看redis启动情况.png)

说明：不要粗暴的使用kill -9强制杀死Redis服务，这样不但不会做持久化操作，还会造成缓冲区等资源不能被优雅关闭，极端情况会造成AOF和复制丢失数据的情况。

>开机自启

新建一个系统服务文件

```sh
vim /etc/systemd/system/redis.service
```

内容如下

```
[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/bin/redis-server /usr/local/src/redis-6.2.6/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

重载系统服务

```sh
systemctl daemon-reload
```

启动redis

```sh
systemctl start redis
```

查看redis状态

```sh
systemctl status redis
```

停止redis

```sh
systemctl stop redis
```

设置开启自启

```SH
SYSTEMCTL enable redis
```

