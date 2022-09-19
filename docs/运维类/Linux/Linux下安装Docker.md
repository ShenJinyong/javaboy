# Linux下安装Docker

> yum安装

官网安装参考手册：https://docs.docker.com/install/linux/docker-ce/centos/

## 环境要求

确定你是CentOS7及以上版本

```sh
[root@192 Desktop]# cat /etc/redhat-release
CentOS Linux release 7.2.1511 (Core)
```

yum安装gcc相关（需要确保 虚拟机可以上外网 ）

```sh
yum -y install gcc
yum -y install gcc-c++
```

卸载卸载旧版本

```sh
yum -y remove docker docker-common docker-selinux docker-engine
# 官网版本
yum remove docker \
          docker-client \
          docker-client-latest \
          docker-common \
          docker-latest \
          docker-latest-logrotate \
          docker-logrotate \
          docker-engine
```

安装需要的软件包

```
yum install -y yum-utils device-mapper-persistent-data lvm2
```

设置stable镜像仓库

```sh
# 错误
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
## 报错
[Errno 14] curl#35 - TCP connection reset by peer
[Errno 12] curl#35 - Timeout

# 正确推荐使用国内的
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

更新yum软件包索引

```
yum makecache fast
```

## 安装

安装Docker CE

```
yum -y install docker-ce docker-ce-cli containerd.io
```

## 启动

启动docker

```
systemctl start docker
```

### 测试

```
docker version

docker run hello-world

docker images
```