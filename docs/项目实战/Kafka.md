# Kafka

官网：https://kafka.apache.org/

Apache Kafka 是一个开源分布式事件流平台，被数千家公司用于高性能数据管道、流分析、数据集成和任务关键型应用程序。

消息队列的应用场景：削峰、解耦和异步通信。

消息队列的两者模式：点对点模式、发布/订阅模式。

Kafka组成：生产者、消费者、主题（分区）。

## 组成

**main线程：**

- Producer调用send(ProducerRecord)方法
- 经过Interceptors拦截器
- 经过Serializer序列化器
- 经过Partitioner分区器
  - RecordAccumulator（默认32M）
    - DQueue双端队列
      - ProducerBatch(默认16k)
      - 内存池

**sender线程：**

- Sender（读取数据）
- NetworkClient：链路请求
  - Broker1 
    - Request1
    - Request2
    - ...
  - InFightRequests，默认每个broker节点最多缓存5个请求
- Selector：链路通道

**Kafka集群：**

- Borker1
  - 分区1
  - 分区2
- Borker2
  - 分区1
  - 分区2

sender说明：

- batch.size:只有数据积累到batch,size之后，sender才会发送数据，默认16K.
- linger.ms:如果数据迟迟未达到batch.size,sender等待linger.ms设置的时间到了之后就会发送数据，单位ms，默认是0ms，表示没有延迟。

应答说明:

- 0：生产者发送过来的数据，不需要等数据落盘应答
- 1：生产者发送过来的数据，Leader收到数据后应答
- -1（all）：生产者发送过来的数据，Leader和ISR队列里面的所有节点收齐数据后应答，-1和all等价。【心跳机制：replica.lag.time.max.ms=30000,默认30s】
- 失败后重试次数是int的最大值

> 数据完全可靠条件：【ACK级别设置未-1】+【分区副本大于等于2】+【ISR里面应答的最小副本大于等于2】

## SpringBoot集成

配置文件

```
###########【Kafka集群】###########
spring.kafka.bootstrap-servers=112.126.74.249:9092,112.126.74.249:9093
###########【初始化生产者配置】###########
# 重试次数
spring.kafka.producer.retries=0
# 应答级别:多少个分区副本备份完成时向生产者发送ack确认(可选0、1、all/-1)
spring.kafka.producer.acks=1
# 批量大小
spring.kafka.producer.batch-size=16384
# 提交延时
spring.kafka.producer.properties.linger.ms=0
# 当生产端积累的消息达到batch-size或接收到消息linger.ms后,生产者就会将消息提交给kafka
# linger.ms为0表示每接收到一条消息就提交给kafka,这时候batch-size其实就没用了
# 生产端缓冲区大小
spring.kafka.producer.buffer-memory = 33554432
# Kafka提供的序列化和反序列化类
spring.kafka.producer.key-serializer=org.apache.kafka.common.serialization.StringSerializer
spring.kafka.producer.value-serializer=org.apache.kafka.common.serialization.StringSerializer
# 自定义分区器
# spring.kafka.producer.properties.partitioner.class=com.felix.kafka.producer.CustomizePartitioner
###########【初始化消费者配置】###########
# 默认的消费组ID
spring.kafka.consumer.properties.group.id=defaultConsumerGroup
# 是否自动提交offset
spring.kafka.consumer.enable-auto-commit=true
# 提交offset延时(接收到消息后多久提交offset)
spring.kafka.consumer.auto.commit.interval.ms=1000
# 当kafka中没有初始offset或offset超出范围时将自动重置offset
# earliest:重置为分区中最小的offset;
# latest:重置为分区中最新的offset(消费分区中新产生的数据);
# none:只要有一个分区不存在已提交的offset,就抛出异常;
spring.kafka.consumer.auto-offset-reset=latest
# 消费会话超时时间(超过这个时间consumer没有发送心跳,就会触发rebalance操作)
spring.kafka.consumer.properties.session.timeout.ms=120000
# 消费请求超时时间
spring.kafka.consumer.properties.request.timeout.ms=180000
# Kafka提供的序列化和反序列化类
spring.kafka.consumer.key-deserializer=org.apache.kafka.common.serialization.StringDeserializer
spring.kafka.consumer.value-deserializer=org.apache.kafka.common.serialization.StringDeserializer
# 消费端监听的topic不存在时，项目启动会报错(关掉)
spring.kafka.listener.missing-topics-fatal=false
# 设置批量消费
# spring.kafka.listener.type=batch
# 批量消费每次最多消费多少条消息
# spring.kafka.consumer.max-poll-records=50
```

发送方法

```java
@Component
public class Sender {

    @Resource
    private KafkaTemplate<String, String> kafkaTemplate;

    public ListenableFuture<SendResult<String, String>> sendMessage(String topic, @Nullable String message){
        return kafkaTemplate.send(topic,message);
    }

}
```

接收方法

```java
@Component
public class Receiver {

    @KafkaListener(topicPattern = "kafka-grab-single-disputes")
    public void DevicePropertyGet(String message){
        System.out.println("收到message:"+message);
    }
}
```

发送

```java
@Resource
private Sender sender;

@ApiOperation(value = "kafka发送消息")
@PostMapping("/kafkaSender")
public ResponseEntity kafkaSender(){
    ResponseEntity response = new ResponseEntity();
    sender.sendMessage("kafka-grab-single-disputes","hello-20221101");
    return response;
}
```

发送处理

```java
@Component
@Slf4j
public class ResultHandler implements ProducerListener {

    @Override
    public void onSuccess(ProducerRecord producerRecord, RecordMetadata recordMetadata) {
        //成功时处理
        log.info("【成功】主题：{},分区:{}",recordMetadata.topic(),recordMetadata.partition());
    }

    @Override
    public void onError(ProducerRecord producerRecord, @Nullable RecordMetadata recordMetadata, Exception exception) {
        //失败时处理
        if(exception == null){
            log.info("【失败】主题：{},分区:{}",recordMetadata.topic(),recordMetadata.partition());
        }
    }
}
```

## 分区策略

默认配置

	acks = 1
	batch.size = 16384
	bootstrap.servers = [localhost:9092]
	buffer.memory = 33554432
	client.dns.lookup = use_all_dns_ips
	client.id = producer-1
	compression.type = none
	connections.max.idle.ms = 540000
	delivery.timeout.ms = 120000
	enable.idempotence = false
	interceptor.classes = []
	internal.auto.downgrade.txn.commit = true
	key.serializer = class org.apache.kafka.common.serialization.StringSerializer
	linger.ms = 0
	max.block.ms = 60000
	max.in.flight.requests.per.connection = 5
	max.request.size = 1048576
	metadata.max.age.ms = 300000
	metadata.max.idle.ms = 300000
	metric.reporters = []
	metrics.num.samples = 2
	metrics.recording.level = INFO
	metrics.sample.window.ms = 30000
	partitioner.class = class org.apache.kafka.clients.producer.internals.DefaultPartitioner
	receive.buffer.bytes = 32768
	reconnect.backoff.max.ms = 1000
	reconnect.backoff.ms = 50
	request.timeout.ms = 30000
	retries = 2147483647
	retry.backoff.ms = 100
	sasl.client.callback.handler.class = null
	sasl.jaas.config = null
	sasl.kerberos.kinit.cmd = /usr/bin/kinit
	sasl.kerberos.min.time.before.relogin = 60000
	sasl.kerberos.service.name = null
	sasl.kerberos.ticket.renew.jitter = 0.05
	sasl.kerberos.ticket.renew.window.factor = 0.8
	sasl.login.callback.handler.class = null
	sasl.login.class = null
	sasl.login.refresh.buffer.seconds = 300
	sasl.login.refresh.min.period.seconds = 60
	sasl.login.refresh.window.factor = 0.8
	sasl.login.refresh.window.jitter = 0.05
	sasl.mechanism = GSSAPI
	security.protocol = PLAINTEXT
	security.providers = null
	send.buffer.bytes = 131072
	socket.connection.setup.timeout.max.ms = 127000
	socket.connection.setup.timeout.ms = 10000
	ssl.cipher.suites = null
	ssl.enabled.protocols = [TLSv1.2]
	ssl.endpoint.identification.algorithm = https
	ssl.engine.factory.class = null
	ssl.key.password = null
	ssl.keymanager.algorithm = SunX509
	ssl.keystore.certificate.chain = null
	ssl.keystore.key = null
	ssl.keystore.location = null
	ssl.keystore.password = null
	ssl.keystore.type = JKS
	ssl.protocol = TLSv1.2
	ssl.provider = null
	ssl.secure.random.implementation = null
	ssl.trustmanager.algorithm = PKIX
	ssl.truststore.certificates = null
	ssl.truststore.location = null
	ssl.truststore.password = null
	ssl.truststore.type = JKS
	transaction.timeout.ms = 60000
	transactional.id = null
	value.serializer = class org.apache.kafka.common.serialization.StringSerializer

默认分区策略

```java

/**
 * The default partitioning strategy:
 * <ul>
 * <li>If a partition is specified in the record, use it
 * <li>If no partition is specified but a key is present choose a partition based on a hash of the key
 * <li>If no partition or key is present choose the sticky partition that changes when the batch is full.
 * 
 * See KIP-480 for details about sticky partitioning.
 */
public class DefaultPartitioner implements Partitioner {

    private final StickyPartitionCache stickyPartitionCache = new StickyPartitionCache();

    public void configure(Map<String, ?> configs) {}

    /**
     * Compute the partition for the given record.
     *
     * @param topic The topic name
     * @param key The key to partition on (or null if no key)
     * @param keyBytes serialized key to partition on (or null if no key)
     * @param value The value to partition on or null
     * @param valueBytes serialized value to partition on or null
     * @param cluster The current cluster metadata
     */
    public int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster) {
        return partition(topic, key, keyBytes, value, valueBytes, cluster, cluster.partitionsForTopic(topic).size());
    }

    /**
     * Compute the partition for the given record.
     *
     * @param topic The topic name
     * @param numPartitions The number of partitions of the given {@code topic}
     * @param key The key to partition on (or null if no key)
     * @param keyBytes serialized key to partition on (or null if no key)
     * @param value The value to partition on or null
     * @param valueBytes serialized value to partition on or null
     * @param cluster The current cluster metadata
     */
    public int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster,
                         int numPartitions) {
        if (keyBytes == null) {
            return stickyPartitionCache.partition(topic, cluster);
        }
        // hash the keyBytes to choose a partition
        return Utils.toPositive(Utils.murmur2(keyBytes)) % numPartitions;
    }

    public void close() {}
    
    /**
     * If a batch completed for the current sticky partition, change the sticky partition. 
     * Alternately, if no sticky partition has been determined, set one.
     */
    public void onNewBatch(String topic, Cluster cluster, int prevPartition) {
        stickyPartitionCache.nextPartition(topic, cluster, prevPartition);
    }
}
```

说明：

- 如果记录中指定了分区，则使用它
- 如果没有指定分区但有一个键，则根据键的散列选择一个分区
- 如果不存在分区或键，则选择在批处理满时更改的粘性分区
  - 随即选择分区，直到batch.size满了或者linger.ms到了，再次选择与上一次不同的分区

```java
public ListenableFuture<SendResult<K, V>> send(String topic, @Nullable V data) {
    ProducerRecord<K, V> producerRecord = new ProducerRecord(topic, data);
    return this.doSend(producerRecord);
}

public ListenableFuture<SendResult<K, V>> send(String topic, K key, @Nullable V data) {
    ProducerRecord<K, V> producerRecord = new ProducerRecord(topic, key, data);
    return this.doSend(producerRecord);
}

public ListenableFuture<SendResult<K, V>> send(String topic, Integer partition, K key, @Nullable V data) {
    ProducerRecord<K, V> producerRecord = new ProducerRecord(topic, partition, key, data);
    return this.doSend(producerRecord);
}

public ListenableFuture<SendResult<K, V>> send(String topic, Integer partition, Long timestamp, K key, @Nullable V data) {
    ProducerRecord<K, V> producerRecord = new ProducerRecord(topic, partition, timestamp, key, data);
    return this.doSend(producerRecord);
}
```

## 原理

> 优化参数

缓冲区大小：33553342（32m，默认16）

批次大小：16384(16m,默认16m)

过期时间：1（1ms，默认0ms）

压缩：snappy（默认不压缩）

> 数据传递语义

- 至少一次（At Least Once）=【ACK级别设置为-1】+【分区副本大于等于2】+【ISR里应答的最小副本数量大于等于2】
- 最多一次（At Most Once）=ACK级别设置为0

总结：

- At Least Once可以保证数据不丢失，但是不能保证数据不重复
- At Most Once可以保证数据不重复，但是不能保证数据不丢失

Kafka 0.11版本以后，引入了一项重大特性：幂等性和事务。

- Exactly Once对于一些非常重要的信息，比如和钱的数据，要求数据既不能重复也不丢失。

- 精确一次（Exactly Once）=幂等性+至少一次（【ack=-1】 + 【分区副本数>=2】 + 【ISR最小副本数量>=2】）

重复数据的判断标准：具有<PID,Partition,SeqNumber>相同主键的消息提交时，Broker只会持久化一条。

- PID是Kafka每次重启都会分配一个新的
- Partition表示分区号
- Sequence Number是单调自增的

所以幂等性只能保证的是单分区单会话内不重复！！！

> 如何使用幂等性？

开启参数enable.idempotence默认为true，false关闭！

> Kafka事务原理

说明：开启事务,必须开启幂等性！

broker0：

- Transaction Coordinator事务协调器
- TopicA-Partition0 Leader
- _transaction_state-分区-Leader存储事务信息的特殊主题
  - 默认有50个分区，每个分区负责一部分事务。事务划分是根据transactional.id的hashcode值%50，计算出该事务属于哪个分区。该分区Leader副本所在的broker节点即为这个transactional.id对应的Transaction Coordinator节点。
  
- TopicA-Partition0、Leader

说明:

- Producer在使用事务功能钱，必须先自定义一个唯一的transactional.id。有了transactional.id，即使客户端挂掉了，它重启后也能继续处理未完成的事务。
- 事务只是弥补幂等性重启换id问题，依赖还是只是保证单分区数据不重复

流程：

- 生产者向事务协调器请求producer id（幂等性需要）
- 事务协调器返回producer id到生产者
- 生产者发送消息到TopicA主题
- 生产者发送commit请求到事务协调器
- 事务协调器在存储事务信息的特殊主题持久化commit请求
- 事务协调器返回成功给生产者
- 事务协调器后台发送commit请求给主题
- 主题返回成功给事务协调器
- 事务协调器持久化事务成功信息给存储事务信息的特殊主题

> 数据有序

单分区内，有序；多分区，分区与分区间无序。

kafka在1.x版本之前保证数据单分区有序，条件如下：

- max.in.flight.request.per.connection=1(不需要考虑是是否幂等性)

kafka在1.x版本之后保证数据单分区有序，条件如下：

- 未开启幂等性：max.in.flight.request.per.connection需要设置为1
- 开启幂等性：max.in.flight.request.per.connection需要设置小于等于5

原因说明：因为在kafka1.x以后，启用幂等后，kafka服务端会缓存producer发来的最近5个request的元数据，故无论如何，都可以保证最近5个request的数据都是有序的。

> 工作流程

- broker启动后在zk中注册
- controller谁先注册，谁说了算
- 由选举出来的Controller监听brokers节点变化
- Controoler决定Leader选举，选举规则是在isr中存活为前提，按照AR中排在前面的优先。
- Controller将节点信息上传到ZK
- 其他contorller从zk同步相关信息
  - .log文件:底层存储Segment（1G）
  - .index文件:索引加快检索速度

- 假设Leader挂了
- Controller监听到节点变化
- 获取ISR
- 选举新的Leader
- 更新Leader及ISR

> 服役新节点

新增新节点的kafka+负载均衡

负载均衡=数据迁移~

负责均衡指的是副本的存储压力，新节点的加入不会影响分区数，过多的节点会导致性能降低~

> 退役旧节点

缩容~

>Kafka副本

kafka默认的副本数量是1个，生产环境一般配置为2个

> Leader的选举机制

设计偏向性原则

> Follower故障

LEO（Log End Offset）：每个副本的最后一个offset，LEO起诉就是最新的offset+1

HW（High Watemark）：所有副本中最小的LEO

Kafka是只有副本全部将该数据落磁盘之后才对消费者可见，即消费者只能拉取到HW这个offset之前的消息，俗称高水位，是一个特定的消息偏移量（offset）

所有与Leader副本保持一定程度的同步（包括leader在内）组成ISR

> Leader故障

注意：只能保证副本之间的数据一致性，并不能保证数据不丢失或者不重复

> Leader Partition 自动平衡

正常情况下，Kafka本身会自动把Leader Partition均匀分散在各个机器上，来保证每台机器的读写吞吐量都是均匀的。但是如果某些broker宕机，会导致leader Partition过于集中在其他少部分几台broker上，这会导致少数几台broker的读写请求压力过高，其他宕机的broker重启之后都是follower partition，读写请求很低，造成集群不均衡。

解决方法：

- auto.leader.rebalance.enable默认是true，自动Leader Partition平衡

- leader.imbalance.broker.percentage,默认是10%。每个broker允许的不平衡的leader的比率。如果每个broker超过了这个值，控制器会触发leader的平衡

- leader.imbalance.check.interval.seconds,默认值300秒。检查leader负载是否平衡的间隔时间。

> 文件存储机制

Topic是逻辑上的概念，而partition是物理上的概念，每个partition对应与一个log文件，该log文件中存储的就是Producer生产的数据。Producer生产的数据会被不断追加到该log文件末端，为防止log文件过大导致数据定位效率低下，Kafka采取了分片和索引机制，将每个partition分为多个segment。每个segment包括：`.index`文件，`.log`文件和`.timeindex`等文件。这些文件位于一个文件夹下，该文件夹的命名规则为：topic名称+分区序号，例如first-0。

注意：

- index为稀疏索引，大约每往log文件写入4kb数据。会往index文件写入一条索引。参数log.index.interval.bytes默认4kb。
- index文件中保存的offset为相对offset，这样能确保offset的值所占空间不会过大，因此能将offset的值控制在固定大小

> 文件清除策略

log.retention.hours,最低优先级，默认保留7天

log.retention.check.interval.ms,负责检查周期，默认5分钟

Kafka中提供的日志清理策略由delete和compact两种。

log.cleanup.policy=delete,默认删除。

- 基于时间：默认打开，以segment种所有记录种的最大时间戳作为该文件的时间戳
- 基于大小：默认关闭。超过设置的所有日志总大小，删除最早的segment。log.retention.bytes,默认等于-1，表示无穷大。

log.cleanup.policy=compact

compact日志压缩：对于相同key的不同value值，只保留最后一个版本。

压缩后的offset可能是不连续的，实际上会拿比这个offset大的数据，从这个开始后续消费。

这种策略只适合特殊场景，比如消息的key是用户id，value是用户的资料，通过这种压缩策略，整个消息集里就保存了所有用户最新的资料。

> 高效读写数据

- kafka本身是分布式集群，可以采用分区技术，并行度高
- 读数据采用稀疏索引，可以快速定位要消费的数据
- 顺序写磁盘
  - kafka的producer生产数据，要写入到log文件种，写的过程是一致追加到文件末端，为顺序写。官网有数据表明，同样的磁盘，顺序写能到600M/S，而随机写只有100k/s。者与磁盘的机械结构有关，顺序写之所以快，是因为其省去了磁头寻址的时间。

- 页缓存+零拷贝技术
  - 零拷贝：kafka的数据加工处理操作交由kafka生产者和kafka消费者处理。kafka broker应用层不关心存储的数据，所以不用走应用层，传输效率高。
  - PageCache页缓存：kafka重度依赖底层操作系统提供的PageCache功能。当上层有写操作时，操作系统只是将数据写入PageCache。当读操作发生时，先从PageCache种查找，如果找不到，再去磁盘种读取。实际上PageCache是把尽可能多的空闲内存都当作磁盘缓存来使用。

## 消费者

> kafka消费方式

pull拉模式：consumer采用从broker种主动拉取数据。kafka采用这种方式。

push推模式：kafka没有采用这种方式，因为由broker决定消息发送速率，很难适应所有消费者的消费速率。

pull模式不足之处是，如果kafka没有数据，消费者可能会陷入循环种，一直返回空数据。

> 消费者总体工作流程

一个消费者可以消费多个分区数据

每个分区的数据只能由消费者组中的一个消费者消费

每个消费者的offset由消费者提交到系统主题保存_consumer_offsets

> 消费者组

Consumer Group(CG):消费者组，由多个consumer组成。形成一个消费者组的条件，是所有消费者的groupid相同。

- 消费者组内每个消费者负责不同分区的数据，一个分区只能由一个组内消费者消费
- 消费者组之间不影响。所有的消费者都数据某个消费者组，即消费者组是逻辑上的一个订阅者。
- 如果向消费组中添加更多的消费者，超过主题分区数量，则有一部分消费者就会闲置，不会接收任何消息。

> 消费者组初始化流程

coordinator：辅助实现消费者组的初始化和分区的分配。

coordinator节点选择=groupid的hashcode值 % 50（_consumer_offsets的分区数量）

- 每个consumer都发送JoinGroup请求
- coordinator选出一个consumer作为leader
- 把要消费的topic情况发送个ileader消费者
- leader会负责指定消费方案
- 把消费方案发给coordinator
- coordinator就把消费方案下发给各个consumer
- 每个消费者都会和coordinator保持心跳（默认3s），一旦超过（session.timeout.ms=45s）,该消费者会被移除，并触发再平衡；或者消费者处理消息的时间过长（max.poll.interval.ms=5分钟），也会触发再平衡。

> 消费者组详细消费流程

- Consumer通过sendFetches发送消费请求到ConsumerNetworkClient
  - Fetch.min.bytes每批次最小抓取大小，默认1字节
  - Fetch.max.wait.ms一批数据最小值未达到的超时时间，默认500ms
  - Fetch.max.bytes每批次最大抓取大小，默认50m

- ConsumerNetworkClient通过send方法发送消费请求，通过回调函数onSuccess把对应的结果拉取过来，放到completedFetches(queue)里面。
- consumer通过parseRecord反序列化
- consumer通过Interceptors拦截器
- consumer消费处理数据

> 消费一个主题

注意：在消费者API代码中必须配置消费者组id。命令行启动消费者不填写消费者组id会被自动填写随机的消费者组id。

subscribe

> 消费一个分区

assign

> 分区分配策略

kafka有四种主流的分区分配策略：Range、RoundRobin、Sticky、CooperativeSticky。

可以通过配置参数partition.assignment.straegy,修改分区的分配策略。

默认策略是Range+CooperativeSticky。kafka可以同时使用多个分区分配策略。

> Range是对每个topic而言的。

首先对同一个topic里面的分区按照序号进行排序，并对消费者按照字母顺序进行排序。

通过partitions数/consumer数来决定每个消费者应该消费几个分区。如果除不尽，那么前面几个消费者将会多消费1个分区。

注意：如果只是针对1个topic而言，前面的消费者多消费1个分区影响不是很大。但是如果有N多个topic，那么针对每个topic，前面的消费者都将多消费1个分区，topic越多，消费者的分区会比其他消费者明显多消费N个分区。

**容易产生数据倾斜！**

如果一个consumer挂了之后，45s内发送的而数据，45s后会把任务整体的移交给下一个consumer，45s后再下一次获取到数据的时候会使用range分配！

> RoundRobin针对集群中所有Topic而言

RoundRobin轮询分区策略，是把所有的partition和所有的consumer都列出来，然后按照hashcode进行排序，最后通过轮询算法来分配partition给到各个消费者。

如果一个consumer挂了之后，45s内发送的而数据，45s后会把任务轮询交给其他consumer，45s后再下一次获取到数据的时候会使用轮询分配！

> sticky

随机选择第一次，粘性分配，尽量均匀。

如果一个consumer挂了之后，45s内发送的而数据，45s后会把任务粘性交给其他consumer，45s后再下一次获取到数据的时候会使用粘性分配！

> offset的默认维护位置

kafka0.9版本之前，consumer默认将offset保存在Zookeeper中。

从0.9版本开始，consumer默认将保存再kafka一个内置的topic中，该topic为_consumer_offsets。

_consumer_offsets主题里面采用key和value的方式存储数据。key是group.id+topic+分区号，value就是当前offset的值。每隔一段时间，kafka内部会对这个topic进行compact，也就是每个group.id+topic+分区号就保留最新数据。

> 自动提交offset

为了使我们能够专注于自己的业务逻辑，kafka提供了自动提交offset的功能。

自动提交offset的相关参数：

- enable.auto.commit:是否开启自动提交offset功能，默认是true
- auto.commit.interval.ms:自动提交offset的时间间隔，默认是5秒

流程：

- consumer不断的拉取数据
- consumer每5s提交offset

> 手动提交offset

虽然自动提交offset十分简单遍历，但由于其是基于时间提交的，开发人员难以把握offset提交的实际。因此kafka还提供了手动提交offset的API。

手动提交offset的方法有两种：分别是commitSync(同步提交)和commitAsync(异步提交)。两者的相同点是，都会将本次提交的一批数据最高的偏移量提交；不同点是同步提交阻塞当前线程，一直到成功，并且会自动失败重试（由不可控因素导致，也会出现提交失败）；而异步提交则没有失败重试机制，故有可能提交失败。

> 指定offset消费

auto.offset.reset=earliest|latest|none 默认是latest

当kafka中没有初始偏移量（消费者组第一次消费）活服务器上不再存在当前偏移量时，例如该数据已被删除，该怎么办？

- earliest：自动将偏移量重置为最早的的便宜量，--from-beginning
- latest默认值：自动将偏移量重置为最新偏移量
- none：如果未找到消费者组的先前偏移量，则向消费者抛出异常

> 指定时间消费

时间转换成offset

> 漏消费和重复消费

重复消费：已经消费类数据，但是offset没提交

漏消费：先提交offset后消费，有可能会造成数据的漏消费

> 消费者事务

如果想完成Consumer端的精确一次性消费，那么需要kafka消费将消费过程和提交offset过程做原子绑定。次是我们需要将kafka的offset保存到支持事务的自定义介质中，比如mysql。

> 数据积压

默认日志的存储时间是7天

- 如果是kafka消费能力不足，则可以考虑增加topic的分区数，兵器人同时提升消费者的消费者数量，消费者数=分区数，两者缺一不可。
- 如果是下游的数据处理不及时，则可以提高每批次拉去的数量。批次拉去数量过少（拉取数据/处理时间<生产速度），会是处理的额数据小于生产的数据，也会造成数据挤压。默认是500条，每批次的大小是50m

## 调优

> 场景说明

100万日活，每人每天100条日志，每天总共的日志条数是100万*100条=1亿条。

1亿/24小时/60分/60秒 = 1150条/每秒种。

每条日志大小：0.5k~2k（取1k）。

1150条/每秒钟 * 1k ≈1m/s。

高峰期每秒钟：1150条 * 20倍 =23000条

每秒多少数据量：20MB/s。

> 购买服务器

服务器台数 = 2 * (生产者峰值生产速率 * 副本数 / 100) + 1

2 * （20m/s  * 2 /100） + 1 约等于 3台

> 磁盘选择

kafka是按照顺序读写

机械硬盘和固态硬盘 顺序读写速度差不多~

差不多指的是SATA接口硬盘，NVME固态硬盘速度是机械的20倍以上

1亿条 * 1k = 100g

100g * 2个副本 * 3天 / 0.7 ≈ 1t

建议三台服务器总的磁盘大小大于1t。

> 内存选择

kafka 内存 = 堆内存（kafka内部配置）+ 页缓存（服务器的内存）

堆内存 10-15g

页缓存 segment(1g)  （分区数Leader（10）* 1g * 25%） / 3 ≈ 1g

一台服务器10g + 1g

查看kafka的gc情况`YGC`

```sh
jstat -gc 2321 1s 10
```

查看kafka的内存使用率 `G1 Heap`

```sh
jmap -heap 2321
```

> CPU选择

num.io.threads = 8 负责写磁盘的线程数，整个参数值要占总核数的50%。

num.replica.fetchers = 1,副本拉去线程数，这个参数占总核数的50%的1/3。

num.network.threads = 3数据传输线程数，这个参数传输线程数，这个参数占总核数的50%的2/3。

建议32个cpu的core~

> 网络选择

网络带宽 =峰值吞吐量 ≈ 20MB/s 选择千兆网卡即可。

100Mbps单位是bit；10M/s单位是byte，1byte = 8bit，100Mbps/8-12.5M/s。

一般百兆的网卡（100Mbps）、千兆的网卡（1000Mbps）、万兆的网卡(10000Mbps）。

> 生产者

read-only：需要重新启动代理进行更新

per-broker：可以为每个代理动态更新

cluster-wide：以作为集群范围的默认值动态更新。也可以更新为每个代理的值以进行测试

## 源码

https://downloads.apache.org/kafka/3.3.1/kafka-3.3.1-src.tgz

> main线程初始化

- 用户自定义生产者CustomProducer.java

- main

- 创建Kafka生产者对象new KafkaProducer
- 连续点击三次this构造器
- 获取事务id transactionalid
- 获取客户端id clientid
- 监控相关配置 new JmxReporter()
- 分区器配置 this.partitioner
- 序列化配置keySerializer valueSerializer
- 拦截器配置 interceptorList
- 单挑信息的最大值，默认1m maxRequestSize
- 缓存大小，默认32m totalMemorySize
- 创建缓存队列 new RecordAccumulator()
  - 批次大小，默认16k BATH_SIZE_CONFIG
  - 是否压缩，默认none compressionType
  - linger.ms，默认值0 lingerMs()
  - 重试间隔时间，默认值100ms retryBackoffMs

- 从Kafka集群获取元数据 this.metadata
- 创建sender线程 newSender
- 启动发送线程this.ioThread.start()

> 初始化sender线程

- 初始化sender线程 this.sender =new Sender()

- 创建网络请求客户端 new NetworkClient()
  - 缓存的发送请求，默认值是5 maxInflightRequests
  - 请求超时时间，默认是30s requestTimeoutMs
  - socket发送数据的缓冲区大小，默认值128k send.buffer.bytes

- 配置应答级别（0，1，-1）configureAcks()
- 创建sender new Sender()
  - 生产者往Kafka集群单条信息的最大值，默认值1m。max.request.size
  - 重试次数，默认值Int的最大值 retries

> 启动sender线程

- this.ioThread = new KafkaThread(ioThreadName,this.sender,true);

- this.ioThread.start();

- @Override public void run(){ while(running){ runOnce() } }
  - sender线程从缓冲区准备拉取数据，刚启动拉不到数据

> 消费者初始化流程

- 用户自定义消费者CustomConsumer.java
- main
- 创建Kafka消费者对象new KafkaConsumer
- 连续点击三次this构造器
- 获取消费者组this.groupid
- 获取客户端id this.clientId
- 拦截器配置interceptorList
- key和value反序列化keyDeserializer/valueDeserializer
- offset从上面位置开始消费offsetResetStrategy
- 获取元数据this.metadata
- 连接Kafka集群BOOTSTARAP_SERVERS_CONFIG
- 心跳时间，默认3s heartbeatIntervalMs
- 创建网络客户端new NetworkClient()
- 创建一个消费者客户端 new ConsumerNetworkClient()
- 获取消费者分区分配策略this.assignors
- 创建消费者协调器new ConsumerCoordinator()
- 抓取数据配置new Fetcher<>()
