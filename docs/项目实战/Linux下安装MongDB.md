# Linux下安装MongDB

## 下载

安装依赖

```sh
sudo yum install libcurl openssl
```

下载安装包

```sh
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-6.0.2.tgz
```

解压

```sh
tar -zxvf mongodb-linux-x86_64-rhel70-6.0.2.tgz 
```

创建dbpath和logpath

```sh
mkdir -p /mongodb/data /mongodb/log
```

启动mongodb服务

```sh
bin/mongod --port=27017 --dbpath=/mongodb/data --logpath=/mongodb/log/mongodb.log --binf_ip=0.0.0.0 --fork
```

## 使用

```sh
# 进入
bin/mongod
# 查看dbs
show dbs
# 查看集合，默认test
show collections
# 查看对应的表
show tables
# 查看表数据
db.emp.find()
```

## 关闭

> 方式一

```sh
mongod -f /mongodb/conf/mongo.conf --shutdown
```

> 方式二

进入mongo shell，使用命令

```sh
use admin
db.shutdownServer()
```

## 配置文件

编辑配置文件

```sh
vim /conf/mongo.conf
```

内容

```sh
systemLog:
  destination: file
  # log path
  path: /home/codvision/environment/mongodb-linux-x86_64-rhel70-6.0.2/log/mongod.log
  logAppend: true
storage:
  # data directory
  dbPath: /home/codvision/environment/mongodb-linux-x86_64-rhel70-6.0.2/data
  # 存储引擎
  engine: wiredTiger
  # 是否启用journal日志
  journal:
    enabled: true
net:
  bindIp: 0.0.0.0
  # port
  port: 27017
processManagement:
  fork: true
```

启动

```sh
./bin/mongod -f conf/mongo.conf 
```

## 操作

> 数据库相关操作

```sh
# 查看所有库
show dbs
# 切换到指定数据库，不存在则创建
use test
# 删除当前数据库
db.dropDatabase()
```

> 集合操作

```sh
# 查看集合
show collections
# 创建集合
db.createCollection("emp")
# 删除集合
db.emp.drop()
```

创建集合语法

```sh
db.createCollection(name,options)
```

options参数

| 字段   | 类型 | 描述                                                         |
| ------ | ---- | ------------------------------------------------------------ |
| capped | 布尔 | （可选）如果为true，则创建固定集合。固定集合是指有着固定大小的集合，当达到最大值时，它会自动覆盖最早的文档。 |
| size   | 数值 | (可选)为固定集合指定一个最大值（以字节计）。如果capped为true，也需要指定该字段 |
| max    | 数值 | （可选）指定固定集合中包含文档的最大数量                     |

注意：当集合不存在时，想集合中插入文档也会创建集合

## 安全认证

> 创建管理员账号

```sh
# 设置管理员用户名密码需要切换到admin库
use admin
# 创建管理员
db.createUser({user:"admin",pwd:"123456",roles;["root"]})
# 查看所有用户信息
show users
# 删除用户
db.dropUser("admin")
```

启动命令

```sh
mongo -uadmin -p123456 --authenticationDatabase=admin 
```

授权启动服务

```sh
--auth
```

