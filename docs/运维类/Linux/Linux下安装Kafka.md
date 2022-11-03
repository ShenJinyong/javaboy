# Linux下安装Kafka

## 安装

安装wegt

```sh
yum -y install wget
```

![安装wegt](.\images\安装wegt.png)

下载kafka压缩包

```sh
wget https://archive.apache.org/dist/kafka/3.2.1/kafka_2.13-3.2.1.tgz
```

![下载kafka](.\images\下载kafka.png)

解压kafka压缩包

```sh
tar -zxvf kafka_2.13-3.2.1.tgz
```

进入kafka

```sh
cd kafka_2.13-3.2.1
```

查看kafka

```sh
ll
```

![查看kafka](.\images\查看kafka.png)

说明：

- bin 启动脚本
- config 配置信息
- libs 第三方依赖

## 修改配置

进入配置文件

```sh
cd config
```

编辑文件`server.properties`

```sh
vim  server.properties
```

> 如果是在云服务器中，需要外网访问，则需要配置advertised.listeners

编辑内容：

- broker.id=0
- log.dirs=/home/codvision/kafka_2.13-3.2.1/kafka-logs
- zookeeper.connect=localhost:2181
- listeners=PLAINTEXT://localhost:9092
- zookeeper.connect=localhost:2181/kafka

编辑文件`zookeeper.properties`

```sh
vim zookeeper.properties
```

编辑内容

- log.dirs=/home/codvision/kafka_2.13-3.2.1/zookeeper-logs

## 启动

![](C:\Users\admin\Desktop\mine\javaboy\docs\运维类\Linux\images\启动kafka.png)

启动kafka

```sh
./binkafka-server-start.sh
```

说明:需要指定server.properties

```sh
./bin/kafka-server-start.sh -daemon config/server.properties
```

查看启动情况

```sh
jps
```

后台启动

```sh
&
```

说明：一般都是使用绝对路径

## 使用

主题命令

```sh
bin/kafka-topics.sh
```

新建主题

```sh
.\bin\kafka-topics.bat --bootstrap-server localhost:9092 --topic topicname --partitions 3 --replication-factor 3 --create
```

展示topic列表

```sh
.\bin\kafka-topics.bat --bootstrap-server localhost:9092 --list
```

删除topic

```sh
.\bin\kafka-topics.bat --bootstrap-server localhost:9092 --delete --topic topicname
```

修改topic

```sh
.\bin\kafka-topics.bat --bootstrap-server localhost:9092 --alter --topic topicname --partitions 5
```

描述topic

```sh
.\bin\kafka-topics.bat --bootstrap-server localhost:9092 --describe --topic topicname
```

说明：

- bootstrap-server 连接kafka
- topic 指定topic名称
- create 创建
- delete 删除
- alter 修改
- describe 描述
- partitions 分区
- replication-factor 主题副本数
- config 更改系统默认配置

发布

```sh
.\bin\kafka-console-producer.bat --broker-list localhost:9092 --topic topicname
```

订阅

```sh
.\bin\windows\kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic topicname
```

## Kafka-edge

下载安装包

```sh
wget https://github.com/smartloli/kafka-eagle-bin/archive/v3.0.1.tar.gz
```

解压

```sh
tar -zxvf v3.0.1.tar.gz 
```

进入解压文件夹

```sh
cd kafka-eagle-bin-3.0.1/
```

再解压

```sh
tar -zxvf efak-web-3.0.1-bin.tar.gz
```

进入efak

```sh
cd efak-web-3.0.1/
```

进入配置文件

```sh
cd conf
```

回到kafka，编辑kafka启动文件

```sh
vim kafka-server-start.sh
```

编辑内容

```sh
export KAFKA_HELP_OPTS="-server -Xms2G -Xmx2G -XX:PermSize=128m -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:ParallelGCThreads=8 -XX:ConcGCThreads=5 -XX:InitiatingHeap0ccupancyPercent=70"
export JMX_PORT="9999"
```

编辑kafka-dege配置文件

```sh
 vim system-config.properties 
```

编辑内容

```sh
# 修改
efak.zk.cluster.alias=cluster1
# 修改
cluster2.zk.list=localhost:2181/kafka
# 删除
cluster2.zk.list=tdn1:2181,tdn2:2181,tdn3:2181
# 删除
cluster2.efak.offset.storage=zk

# 修改
efak.driver=com.mysql.cj.jdbc.Driver
efak.url=jdbc:mysql://127.0.0.1:3306/ke?useUnicode=true&characterEncoding=UTF-8&zeroDateTimeBehavior=convertToNull
efak.username=root
efak.password=123456
```

添加环境变量

```sh
sudo vim /etc/profile.d/my_env.sh
```

编辑内容

```sh
# KafakEFAK
export KE_HOME=/home/codvision/efak-web-3.0.1
export PATH=$PATH:$KE_HOME/bin
```

编辑openjdk的环境变量

```sh
# OpenJDK
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk
export PATH=$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JAVA_HOME/jre/lib/rt.jar
```

环境变量生效

```sh
source /etc/profile
```

说明：安装完jdk后，配置了错误的环境变量，并执行了“source /etc/profile”命令

```sh
# 在/etc/profile中最后一行添加下述代码，回复ls,vim,等基本命令，然后上传重新连接
export PATH=$PATH:/usr/bin:/usr/sbin:/bin:/sbin
```

启动

```sh
./bin/ke.sh start
```

页面

```sh
# url
http://127.0.0.1:8048/
# account
admin
# password
123456
```



