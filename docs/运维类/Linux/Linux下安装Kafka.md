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

