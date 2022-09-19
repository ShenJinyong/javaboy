# Linux下安装JDK

## yum

### 检查

查看系统是否已有自带的jdk

```sh
rpm -qa |grep java
rpm -qa |grep jdk
rpm -qa |grep gcj
```

如果没有输出信息，则说明系统没有安装。

![查看是否安装JDK](.\images\查看是否安装JDK.png)

如果有输出信息，则执行下面的命令卸载。

```sh
rpm -qa | grep java | xargs rpm -e --nodeps
```

### 查看

列出所有可安装的rpm软件包

```sh
yum list java-1.8*
```

![列出所有可安装的rpm软件包](.\images\列出所有可安装的rpm软件包.png)

### 安装

```sh
yum install java-1.8.0-openjdk* -y
```

![下载依赖](.\images\下载依赖.png)

![下载完成](.\images\下载完成.png)

验证安装是否成功:

```sh
java -version
```

![查看jdk版本](.\images\查看jdk版本.png)

## rpm

### 下载

rpm下载地址http://www.oracle.com/technetwork/java/javase/downloads/index.html

### 卸载

如果有安装openjdk 则卸载

```sh
[root@kuangshen ~]# java -version
java version "1.8.0_121"
Java(TM) SE Runtime Environment (build 1.8.0_121-b13)
Java HotSpot(TM) 64-Bit Server VM (build 25.121-b13, mixed mode)
# 检查
[root@kuangshen ~]# rpm -qa|grep jdk
jdk1.8.0_121-1.8.0_121-fcs.x86_64
# 卸载 -e --nodeps 强制删除
[root@kuangshen ~]# rpm -e --nodeps jdk1.8.0_121-1.8.0_121-fcs.x86_64
[root@kuangshen ~]# java -version
-bash: /usr/bin/java: No such file or directory  # OK
```

### 安装

```sh
# 安装java rpm
[root@kuangshen kuangshen]# rpm -ivh jdk-8u221-linux-x64.rpm

# 安装完成后配置环境变量 文件：/etc/profile
JAVA_HOME=/usr/java/jdk1.8.0_221-amd64
CLASSPATH=%JAVA_HOME%/lib:%JAVA_HOME%/jre/lib
PATH=$PATH:$JAVA_HOME/bin:$JAVA_HOME/jre/bin
export PATH CLASSPATH JAVA_HOME
# 保存退出

# 让新增的环境变量生效！
source /etc/profile

# 测试 java -version
[root@kuangshen java]# java -version
java version "1.8.0_221"
Java(TM) SE Runtime Environment (build 1.8.0_221-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.221-b11, mixed mode)
```