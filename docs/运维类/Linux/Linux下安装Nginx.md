# Linux下安装Nginx

## 下载

删除nginx

```sh
yum remove nginx
```

下载nginx

```sh
wget  http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

![下载nginx依赖](.\images\下载nginx依赖.png)

安装依赖

```sh
rpm -ivh nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

![安装nginx依赖](.\images\安装nginx依赖.png)

安装nginx

```sh
yum install nginx  
```

![安装nginx](.\images\安装nginx.png)

启动并开机自启动

```sh
systemctl start nginx.service  
systemctl enable nginx.service
```

![设置nginx启动](.\images\设置nginx启动.png)

最后当你在浏览器输入你的服务器公网IP时候可以看到Nginx的欢迎界面就可以了：

![nginx页面](.\images\nginx页面.png)

## 配置

找到nginx配置文件

```sh
nginx -t
```

![查找nginx配置文件](.\images\查找nginx配置文件.png)

进入文件夹

![进入nginx文件夹](.\images\进入nginx文件夹.png)

查看nginx目录

![查看nginx目录](.\images\查看nginx目录.png)

目录说明：

- nginx.conf，这是一个主配置文件
- conf.d，这是一个文件夹，里面包含着服务器的独立的配置文件

查看默认配置

![查看nginx默认配置](.\images\查看nginx默认配置.png)

创建服务器配置文件builder.conf(前缀自己定)

![编辑nginx配置文件](.\images\编辑nginx配置文件.png)

buidler.conf

![编辑nginx的conf配置文件](.\images\编辑nginx的conf配置文件.png)

重载一下nginx配置

```sh
nginx -s reload
systemctl stop nginx
systemctl start nginx
```

![重载nginx配置](.\images\重载nginx配置.png)

接着你可以尝试使用浏览器从公网访问一下你的项目了，若一切正常应该就可以了，至此一切就ok了~

```text
http://xxx.xxx.xxx.xxx
```

## 问题

上面发现访问不通，出现`403 Forbidden`

> 原理探究

首先加载的是`/etc/nginx/nginx.cof`

![neginx加载所有配置文件](.\images\neginx加载所有配置文件.png)

进入默认的配置文件`/etc/nginx/conf.d/defalut.conf`

![nginx的default文件](.\images\nginx的default文件.png)

发现如果我们不修改，使用默认的`root`，即`/usr/share/nginx/html`是可以访问的。但是如果修改我们自定义的目录就出现`403 Forbidden`，于是我们看到上面的日志文件的目录，进入日志文件夹查看

![nginx日志文件夹](.\images\nginx日志文件夹.png)

查看错误日志，发现权限不足

![nginx错误日志](.\images\nginx错误日志.png)

查看`nginx`的启动用户，修改为`root`

![nginx首次加载文件](.\images\nginx首次加载文件.png)

完美解决！