# Redis实战

## 缓存

### 什么是缓存

缓存就是数据交换的缓冲区（称作Cache），是存储数据的临时地方，一般读写性能较高。

缓存可以解决CPU与内存之间读取速率之间的问题。

寄存器、高速缓存、缓存、硬盘

缓存的作用：

- 降低后端负载
- 提高读写效率，降低响应时间

缓存的成本：

- 数据一致性成本
- 代码维护成本

### 添加Redis缓存

```java
@Override
public Object queryById(Long id) {
    // 1.从Redis查询商铺缓存
    String shopJson = stringRedisTemplate.opsForValue().get(RedisConstants.CACHE_SHOP_KEY + id);
    // 2.判断是否存在
    if(StrUtil.isNotBlank(shopJson)){
        // 3.存在，直接返回
        Shop shop = JSONUtil.toBean(shopJson, Shop.class);
        return Result.ok(shop);
    }
    // 4.不存在，根据id查询数据库
    Shop shop = getById(id);
    // 5.不存在，返回错误
    if(shop == null){
        return Result.fail("店铺不存在!");
    }
    // 6.存在，写入redis
    stringRedisTemplate.opsForValue().set(RedisConstants.CACHE_SHOP_KEY + id,JSONUtil.toJsonStr(shop));
    // 7.返回
    return Result.ok(shop);
}
```

### 缓存更新策略

| 机制     | 内存淘汰                                                     | 超时剔除                                                     | 主动更新                                     |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------- |
| 说明     | 不用自己维护，利用Redis的内存淘汰机制，当内存不足时自动淘汰部分数据。下次查询时更新缓存。 | 会给缓存数据添加TTL,到期后自动删除缓存。下次查询时更新缓存。 | 编写业务逻辑，在修改数据库的同时，更新缓存。 |
| 一致性   | 差                                                           | 一般                                                         | 好                                           |
| 维护成本 | 无                                                           | 低                                                           | 高                                           |

业务场景：

- 低一致性需求：使用内存淘汰机制。例如店铺类型的查询缓存
- 高一致性需求：主动更新，并以超时剔除作为兜底方案。例如店铺详情查询的缓存。

> 主动更新策略

- Cache Aside Pattern由缓存的调用者，在更新数据库的同时更新缓存
- Read/Write Through Pattern缓存与数据库整合为一个服务，由服务来维护一致性。调用者调用该服务，无序关心一致性问题。
- Write Behind Caching Pattern调用者只操作缓存，由其他线程异步的将缓存数据持久化到数据库，保证最终一致性

说明：方案2是强一致性，3是最终一致性，方案1是企业常用的

> 操作缓存和数据库时有三个问题需要考虑

- 删除缓存还是更新缓存
  - 更新缓存：每次更新数据库都更新缓存，无效写操作较多
  - 删除缓存：更新数据库时让缓存失效，查询时再更新缓存【使用】
- 如何保证缓存与数据库的操作的同时成功或失败
  - 单体系统，将缓存与数据库操作放在一个事务
  - 分布式系统，利用TCC等分布式事务方案
- 先操作缓存还是先操作数据库
  - 先删除缓存，再操作数据库【优先】
  - 先操作数据库，再删除缓存

> 总结

缓存更新策略的最佳实践方案：

- 低一致性需求：使用Redis自带的内存淘汰机制
- 高一致性需求：主动更新，并以超时剔除作为兜底方案
  - 读操作
    - 缓存命中则直接返回
    - 缓存未命中则查询数据库，并写入缓存，设定超时实践
  - 写操作
    - 先写数据库库，然后再删除缓存
    - 要确保数据库与缓存操作的原子性

spring事务时基于aop实现的，控制的是方法，和数据库的事务不同~

用rabbitmq，每次增删改了数据库发一条消息，消费者拿到消息更新下redis就好。

### 缓存穿透

缓存穿透是指客户端请求的数据再缓存中和数据库中都不存在，这样缓存永久不会生效，这些请求打到数据库。

解决缓存传统的方法：

- 缓存空值
  - 优点：实现简单，维护方便
  - 缺点：
    - 有额外的内存消耗
    - 可能造成短期的不一致性，设置TTL时间短
- 布隆过滤器
  - 优点：内存占用较少，没有多余key
  - 缺点：
    - 实现复杂
    - 存在误判的可能

缓存穿透产生的原因是什么？

用户请求的数据在缓存中和数据库中都不存在，不断发起这样的请求给数据库带来巨大的压力

缓存穿透的剞劂方案有哪些？

- 缓存null值
- 布隆过滤
- 增加id的复杂度，避免被猜测id规律
- 做好数据基础格式校验
- 加强用户权限校验
- 做好热点参数的限流

### 缓存雪崩

缓存雪崩是指在同一时段的缓存key同时失效或者Redis服务宕机，导致大量的请求到达服务器，带来巨大压力。

解决方案：

- 给不同的key的TTL添加随机值
- 利用Redis集群服务的可用性
- 给缓存业务添加降级限流策略
- 给业务添加多级缓存

### 缓存击穿

缓存击穿问题也叫热点问题，就是一个被高并发访问并且缓存重建业务比较复杂的key突然失效了，无数的请求访问会在瞬间给数据库带来巨大的冲击。

常见的解决方案有两种：

- 互斥锁
- 逻辑过期

| 解决方案 | 优点                                     | 缺点                                     |
| -------- | ---------------------------------------- | ---------------------------------------- |
| 互斥锁   | 没有额外的内存消耗；保证一致性；实现简单 | 线程需要等待，性能受影响；可能有死锁风险 |
| 逻辑过期 | 线程无需等待，性能较好                   | 不保证一致性；有额外的内存消耗；实现复杂 |

### 缓存工具封装

基于StringRedisTemplate封装一个缓存工具类，满足下列需求：

- 方法1：将任意Java对象序列化为json并存储在string类型的key中，并且可以设置TTL过期时间
- 方法2：将任意Java对象序列化为json并存储在string类型的key中，并且可以设置逻辑过期时间，用户处理缓存击穿问题
- 方法3：根据指定的key查询缓存，并反序列化为指定类型，利用缓存空值的方式解决缓存穿透问题
- 方法4：根据指定的key查询缓存，并反序列化为指定类型，需要利用逻辑过期解决缓存击穿问题

## 优惠卷秒杀

### 全局唯一ID

> 全局ID生产器

每个店铺都可以发布优惠卷,当用户抢购时，就会生成订单并保存到tb_voucher_order这张表，而订单表如果使用数据库自增ID就存在一些问题：

- id的规律性太明显
- 受单表数据量的限制

全局ID生产器，时一种在分布式系统下用来生成全局唯一ID的工具，一般要满足下列特性：

- 唯一性
- 高可用
- 高性能
- 递增性
- 安全性

为了增加ID的安全性，我们可以不直接使用Redis自增的数值，而是拼接一些其他信息。

ID的组成部分：

- 符号位：1bit，永远为0
- 时间戳（31 bit），以秒杀为单位，可以使用69年
- 序列号（32 bit），秒内的计数器，支持每秒产生2的32次方个不同ID

全局唯一ID生成策略：

- UUID
- Redis自增
- snowflake算法
- 数据库自增

Redis自增ID策略：

- 每天一个key，方便统计订单量
- ID构造是：时间戳+计数器

### 实现优惠卷秒杀下单

下单时需要判断两点：

- 秒杀是否开始或结束，如果尚未开始或已经结束则无法下单
- 库存是否充足，不足则无法下单

### 超卖问题

超卖问题是典型的多线程安全问题，针对这一问题的常见解决方案就是加锁：

- 悲观锁：认为线程安全问题一定会发生，因此在操作数据之前先获取锁，确保线程串行执行
  - 例如Synchronized、Lock都属于悲观锁
- 乐观锁：认为线程安全问题不一定会发生，因此不加锁，只是在更新时去判断有没有其他线程对数据做了修改。
  - 如果没有修改则认为是安全的，自己才更新数据。
  - 如果已经被其他线程修改说明发生了安全问题，此时可以重试或异常

乐观锁的关键是判断之前查询得到的数据是否被修改过，常见的方式有两种：

- 版本号法
- CAS法，CompareAndSwap比较并交换+失败重试

### 一人一单

启动类

```java
@EnableAspectJAutoProxy(exposeProxy = true)
```

```java
// 锁的是当前对象的id的值
synchronized (userId.toString().intern()){
    // this调用事务会失效,获取代理对象（事务）
    IVoucherOrderService proxy = (IVoucherOrderService) AopContext.currentProxy();
    return proxy.createVoucherOrder(voucherId);
}
```

```java
@Override
@Transactional
// 当前事务级别是可重复读；事务要想生效需要拿到当前对象的代理对象
public Result createVoucherOrder(Long voucherId){
    // 7.返回订单id
    return Result.ok(orderId);
}
```

> 一人一单的并发安全问题

多台JVM，锁监视器不同，存在问题

## 分布式锁

分布式锁：满足分布式系统或集群模式下多进程可见并且互斥的锁。

特点：

- 多进程可见
- 互斥
- 高可用
- 高性能
- 安全性

### 分布式锁的实现

分布式的核心是实现多进程之间互斥，而满足这一天的方式有很多，常见的有三种：

|        | MySQL                     | Redis                    | Zookeeper                        |
| ------ | ------------------------- | ------------------------ | -------------------------------- |
| 互斥   | 利用mysql本身的互斥锁机制 | 利用setnx这样的互斥命令  | 利用节点的唯一性和有序性实现互斥 |
| 高可用 | 好                        | 好                       | 好                               |
| 高性能 | 一般                      | 好                       | 一般                             |
| 安全性 | 断开连接，自动释放锁      | 利用锁超时时间，到期释放 | 临时节点，断开连接自动释放       |

### 基于Redis的分布式锁

实现分布式锁时需要实现的两个基本方法：

- 获取锁：
  - 互斥：确保只能由一个线程获取锁
  - 添加锁，利用setnx的互斥性`setnx lock thread1`
  - 添加锁过期，避免服务宕机引起的死锁`expire lock 10`
  - 合并，原子性【添加锁，nx时互斥，ex是设置超时时间】`set lock thread1 nx ex 10`
- 释放锁：
  - 手动释放：释放锁，删除即可`del key`
  - 超时释放：获取锁时添加一个超时时间

说明:这是个不可重入锁

> 锁初级版本

```java
// 获取锁对象
SimpleRedisLock lock = new SimpleRedisLock("order:" + userId, stringRedisTemplate);
boolean isLock = lock.tryLock(100);
// 判断是否获取锁车成功
if(!isLock){
    // 获取锁失败，返回错误或重试
    return Result.fail("不允许重复下单");
}
try {
    // this调用事务会失效,获取代理对象（事务）
    IVoucherOrderService proxy = (IVoucherOrderService) AopContext.currentProxy();
    return proxy.createVoucherOrder(voucherId);
} finally {
    // 释放锁
    lock.unlock();
}
```

> 分布式锁误删问题

需求：修改之前的分布式锁实现，满足：

1. 在获取锁时存入线程标识（可以用UUID表示）
2. 在释放锁时先获取锁中的线程标识，判断是否与当前线程标示一致
   1. 如果一致则释放锁
   2. 如果不一致则不释放锁

```java
public class SimpleRedisLock implements ILock {

    private String name;

    private StringRedisTemplate stringRedisTemplate;

    public SimpleRedisLock(String name, StringRedisTemplate stringRedisTemplate) {
        this.name = name;
        this.stringRedisTemplate = stringRedisTemplate;
    }

    private static final String KEY_PREFIX = "lock:";
    private static final String ID_PREFIX = UUID.randomUUID().toString(true) + "-";

    @Override
    public boolean tryLock(long timeoutSec) {
        // 获取线程标识
        String threadId = ID_PREFIX + Thread.currentThread().getId();
        // 获取锁
        Boolean success = stringRedisTemplate.opsForValue().setIfAbsent(KEY_PREFIX + name, threadId, timeoutSec, TimeUnit.MINUTES);
        return BooleanUtil.isTrue(success);
//        return Boolean.TRUE.equals(success);
    }

    @Override
    public void unlock() {
        // 获取线程标识
        String threadId = ID_PREFIX + Thread.currentThread().getId();
        // 获取锁中的标识
        String id = stringRedisTemplate.opsForValue().get(KEY_PREFIX + name);
        if(threadId.equals(id)){
            // 释放锁
            stringRedisTemplate.delete(KEY_PREFIX + name);
        }
    }
}
```

> 分布式锁的原子性问题

JVM的Full GC的时候阻塞~；时间片用完~

Lua脚本解决多条命令原子性问题

> Redis的Lua脚本

Redis提供了Lua脚本功能，在一个脚本中编写多条Redis命令，确保多条命令执行时的原子性。

Lua语言教程：https://www.runoob.com/lua/lua-tutorial.html

Redis提供的调用函数，语法如下：

```sh
# 执行redis命令
redis.call('命令名称','key','其他参数',...)
```

调用脚本的常见命令

```sh
# 0 脚本需要的key类型的参数个数
eval "return redis.call('set','name','jack')" 0
```

实践

```
-- 锁的key
local key = KEYS[1]
-- 当前线程标识
local threadId = ARGV[1]
-- 获取锁中的线程标识 get key
local id = redis.call('get',key)

-- 标间线程标识与锁中的标识是否一致
if(id == threadId) then
    -- 释放锁 del key
    return redis.call('del',key)
end

return 0
```

> 再次改进Redis的分布式锁

需求：基于Lua脚本实现分布式锁的释放锁逻辑

提示：RedisTemplate调用Lua脚本的API

```java
private static final DefaultRedisScript<Long> UNLOCK_SCRIPT;

static {
    UNLOCK_SCRIPT = new DefaultRedisScript<>();
    UNLOCK_SCRIPT.setLocation(new ClassPathResource("unlock.lua"));
    UNLOCK_SCRIPT.setResultType(Long.class);
}

@Override
public void unlock() {
    // 调用lua脚本
    stringRedisTemplate.execute(
        UNLOCK_SCRIPT,
        Collections.singletonList(KEY_PREFIX + name),
        ID_PREFIX + Thread.currentThread().getId());
}
```

> 总结

基于Redis的分布式锁实现思路：

- 利用set nx ex 获取锁，并设置过期时间，保存线程标识
- 释放锁时先判断线程表示是否与自己一致，一致则删除锁

特性：

- 利用set ex满足互斥性
- 利用set ex保证故障时锁依然能释放，避免死锁，提高安全性
- 利用R额滴神集群保证高可用和高并发特性

### Redisson

基于setnx实现的分布式锁存在下面的问题：

- 不可重入，同一个线程无法多次获取同一把锁
- 不可重试，获取锁只尝试一次就返回false，没有重试机制
- 超时释放，锁超时释放虽然可用避免死锁，但如果业务执行耗时较长，也会导致锁释放，存在安全隐患
- 主从一致性，如果Redis提供了主从集群，主从同步存在延迟，当主宕机时，如果从并同步主中的锁数据，则会出现锁实现

Redisson时一个在Redis的基础上实现的Java驻内存数据网格（In-Memory Data Grid）。它布局提供了一系列的分布式的Java常用对象，还提供了许多分布式服务，其中就包含了各种分布式锁的实现。

> 使用

引入依赖

```xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson</artifactId>
    <version>3.13.6</version>
</dependency>
```

添加配置

```java
@Configuration
public class RedisConfig {

    @Bean
    public RedissonClient redissonClient(){
        // 配置类
        Config config = new Config();
        // 添加redis地址，这里添加了单点的地址，也可以使用config.useClusterServers()添加集群地址
        config.useSingleServer().setAddress("redis://localhost:6379").setPassword("123456");
        // 创建客户端
        return Redisson.create(config);
    }
}
```

使用Redisson的分布式锁

```java
@Resource
private RedissonClient redissonClient;

@Test
void testRedisson() throws InterruptedException {
    // 获取锁（可重入），指定锁的名称
    RLock lock = redissonClient.getLock("anyLock");
    // 尝试获取锁，参数分别是：获取锁的最大等待时间（期间会重试），锁自动释放时间，时间单位
    boolean isLock = lock.tryLock(1, 10, TimeUnit.SECONDS);
    // 判断释放获取成功
    if (isLock){
        try{
            System.out.println("执行业务");
        }finally {
            // 释放锁
            lock.unlock();
        }
    }
}
```

> Redisson可重入锁原理



## Redis优化秒杀

## Redis消息队列实现异步秒杀