# Redis

官网：https://redis.io/

桌面客户端：https://gitee.com/qishibo/AnotherRedisDesktopManager/releases

Redis诞生于2009年，全称是Remote Dictionary Server，远程词典服务器，是一个基于内存的键值型NoSQL数据库。

特征：

- 简直型，value支持多种不同数据结构，功能丰富
- 单线程,每个命令具备原子性
- 低延迟，速度快（基于内存、IO多路复用、良好的编码）
- 支持数据持久化
- 支持主从集群、分片集群

## 数据结构

Redis时一个key-value的数据库，key一般是String类型，不过value的类型多种多样：

- String：hello world
- Hash： {name："jack",age:21}
- List：[A->B->C->C]
- Set：{A，B，C}
- SortedSet：{A：1，B:2，C：3}
- GEO：{A：(120.3,30.5)}
- BitMap：0110110101110101011
- HyperLog：0110110101110101011

前面五种为基本数据类型，后面三种是按位进去存储的。

### Redis通用命令

通用指令是部分数据类型的，都可以使用的指令，常见的有：

- keys：查看符合模板的所有key，不建议在生产环境设备上使用
- del：删除一个指定的key
- expire:给一个key设置有效期，有效期到期时该key会被自动删除
- ttl：查看一个key的剩余有效期

### String类型

String类型，也就是字符串类型，是Redis种最简单的存储类型。

其value是字符串，不过根据字符串的格式不同，又可以分为3类：

- String：普通字符串
- int：整数类型，可以做自增和自减操作
- float：浮点类型，可以做自增和自减操作

不管是哪种格式，底层都是字节数组形式存储，只不过是编码方式不同。

字符串类型的最大空间不能超过512m。

> String类型的常见命令

String的常见命令有：

- set：添加或者修改已经存在的一个String类型的键值对
- get：根据key获取String类型的value
- mset：批量添加多个String类型的value
- mget：根据多个key获取多个String类型的value
- incr：让一个整型的key自增1
- incrby：让一个整型的key自增并指定步长，例如incrby num 2 让num只自增2
- incrbyfloat：让一个浮点类型的数字自增并指定步长
- setnx：添加一个String类型的键值对，前提是这个key不存在，否则不执行
- serex：添加一个String类型的键值对，并且指定有效期

### key的层级格式

key的结构

Redis的key运行有多个单词形成层级结构，多个单词之间用':'隔开，格式如下：

项目名：业务名：类型：id

### Hash类型

Haash类型，也叫散列，其value是一个无序字典，类似于Java中的HashMap结构。

String结构是讲对象序列化为JSON字符串后存储，当需要修改对象某个字段时很不方便。

Hash结构可以将对象中的每个字段独立存储，可以针对单个字段做CRUD。

Hash的常见命令有：

- hset key field value：添加或者修改hash类型key的field的值

- hget key field：获取一个hash类型key的field的值

- hmset：批量添加多个hash类型key的field的值，redis4.0开始被弃用，使用hset代替~
- hmget：批量获取多个hash类型key的field的值
- hgetall：获取一个hash类型的key中的所有的field和value
- hkeys：获取一个hash类型的key中所有的field
- hvals：获取一个hash类型的key中的所有value

- hincrby：让一个hash类型key的字段值自增并指定步长
- hsetnx：添加一个hash类型的key的field值，前提是这个filed不存在，否则不执行

> List类型

Redis中的List类型与Java中的LinkedList类似，可以看做是一个双向链表结构。

既可以支持正向检索和也可以支持反向检索。

特征也与LinkedList类似：

- 有序
- 元素可以重复
- 插入和删除快
- 查询速度一般

List的常见命令有：

- lpush key element ...：向列表左侧插入一个或多个元素
- lpop key：移除并返回列表左侧的第一个元素，没有则返回nil
- rpush key element ...：向列表右侧插入一个或多个元素
- rpop key：移除并返回列表右侧的第一个元素
- lrange key star end：返回一段角标范围内的所有元素
- blpop和brpop：与lpop和rpop类似，只不过在没有元素是等待指定时间，而不是直接返回nil

思考：

> 如何利用List结构模拟一个栈？

栈：先进后出

同端push和pop

> 如何利用List结构模拟一个队列？

队列：先进先出

异端push和pop

> 如何利用List结构模拟一个阻塞队列？

- 异端push和pop

- 循环pop

### Set类型

Redis的Set结构与Java中的HashSet类似，可以看做是一个value为null的HashMap。

因为也是一个hash表，因此具备与HashSet类似的特征：

- 无序
- 元素不可重复
- 查找快
- 支持交集、并集和差集等功能

Set的常见命令：

- SADD key member ...：向set中添加一个或多个
- SREM key member ...：移除set中的指定元素
- SCARD key：返回set中元素的个数
- SISMEMBER key member：判断一个元素是否存在与set中
- SMEMBERS：获取set中的所有元素
- SINTER key1 key2 ...：求key1与key2的交集
- SDIFF key1 key2 ...：求key1与key2的差集
- SUNION key1 key2 ...：求key1与key2的并集

scard词的由来：returns the set cardinality （number of elements 基数）of the set stored at key

### SortedSet类型

TreeSet默认升序，底层使用红黑树实现的。

Redis的SortedSet是一个可排序的set集合，与Java中的TreeSet有些类似，但底层数据结构却差别很大。SortedSet中的每一个元素都带有一个score属性，可以基于score属性对元素排序，底层的实现是一个跳表（SkipList）加hash表。

SortedSet具备下列特性：

- 可排序
- 元素不重复
- 查询速度快

因为SortedSet的可排序性，经常被用来实现排行榜这样的功能。

说明：添加元素少的时候用的是压缩表ziplist，数据多了就转成调表skiplist

SortedSet的常见命令有：

- ZADD key score member：添加一个或多个元素到sorted set，如果已经存在则更新其score值
- ZREM key member：删除sorted set中的一个指定元素
- ZSCORE key member：获取sorted set中的指定元素的score
- ZRANK key member：获取sorted set 中的指定元素的排名
- ZCARD key：获取sorted set中的元素个数
- ZCOUNT key increment member：让sorted set中的指定元素自增，步长为指定的increment值
- ZRANGE key min max：按照score排序后，获取指定排名范围内的元素
- ZRANGEBYSCORE key min max：按照score排序后，获取指定score范围内的元素，闭区间
- ZDIFF、ZINTER、ZUNION：求差集、交集和并集

说明：

- 角标从0开始的
- 所有的排名默认都是升序，如果要降序则在命令的Z后面添加REV即可
- 在score相同的情况下，redis使用字典排序

## Redis的Java客户端

官网：https://redis.io/resources/clients/#java

> 客户端

Jedis:以Redis命令作为方法名称，学习成本低，见到那实用。但是Jedis实例时线程不安全的，多线程环境下需要基于连接池来使用。

Lettuce：Lettuce时基于Netty实现的，支持同步、异步和响应编程方式，并且是线程安全的。支持Redis的哨兵模式、集群模式和管道模式。

Redisson：是一个基于Redis实现的分布式、可伸缩的Java数据结构集合。包含了诸如Map、Queue、Lock、Semaphore、AtomicLog等强档功能。

> Spring Data Redis

SpringData 是Spring中数据操作的模块，包含对各种数据库的集成，其中对Redis的集成模块就叫做SrpingDataRedis。

官网地址：https://spring.io/projects/spring-data-redis

- 提供了对不同Redis客户端的整合（Jedis 和Lettuce）

- 提供了RedisTemplate统一API来操作Redis
- 支持Redis的发布订阅模型
- 支持Redis哨兵和Redis集群
- 支持基于Lettuce的响应式编程
- 支持基于JDK、JSON、字符串、Spring对象的数据序列化及反序列化
- 支持基于Redis的JDK Collection实现

SpringDataRedis提供了RedisTemplate工具类，其中封装了各种对Redis的操作。并且将不同数据类型的操作API风封装到了不同的类型中：

| API                         | 返回值类型      | 说明                  |
| --------------------------- | --------------- | --------------------- |
| redisTemplate.opsForValue() | ValueOperations | 操作String类型数据    |
| redisTemplate.opsForHash()  | HashOperations  | 操作Hash类型数据      |
| redisTemplate.opsForList()  | ListOperations  | 操作List类型数据      |
| redisTemplate.opsForSet()   | SetOperations   | 操作Set类型数据       |
| redisTemplate.opsForZSet()  | ZSetOperations  | 操作SortedSet类型数据 |
| redisTemplate               |                 | 通用的命令            |

默认使用的jdk的序列化方式，需要在配置类中配置序列化方式。ObjectOutputStream。

json处理的依赖

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jack-databind</artifactId>
</dependency>
```

> StringRedisTemplate

为了节省内存空间，我们并不会使用JSON序列化器来处理value，而是统一使用String序列化器，要求只能存储String类型的key和value。当需要存储Java对象时，手动完成对象的序列化和反序列化。

Spring默认提供了一个StringRedisTemplate类，它的key和value序列化默认就是String方式。

```java
// JSON工具
private static final ObjectMapper mapper = new ObjectMapper();
// 手动序列化
String json = mapper.writeValueAsString(user);
// 反序列化
User user1 = mapper.readValue(val,User.class);
```

## 实战

> 集群的session共享问题

session共享问题：堕胎Tomcat并不共享session存储空间，当请求到不同tomcat服务时导致数据丢失的问题。

session的替代方案应该满足：

- 数据共享
- 内存存储
- key、value结构

nginx的负载均衡可以搞成ip hash的模式，让一个客户端只访问固定的服务，但是这样负载就不平衡了。

服务：业务：类型：用户名