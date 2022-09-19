# Linux下安装JDK

## 检查

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

## 查看

列出所有可安装的rpm软件包

```sh
yum list java-1.8*
```

![列出所有可安装的rpm软件包](.\images\列出所有可安装的rpm软件包.png)

## 安装

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