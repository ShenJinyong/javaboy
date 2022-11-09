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

获取锁的Lua脚本

```
local key = KEYS[1]; -- 锁的key
local thread = ARGV[1]; -- 线程唯一标识
local releaseTime = ARGV[2]; -- 锁的自动释放时间
-- 判断是否存在
if(redis.call('exists',key) == 0)then
	-- 不存在，获取锁
	redis.call('hset',key,threadId,'1');
	-- 设置有效期
	redis.call('expire',key,releaseTime);
	return 1; -- 返回结果
end;
-- 锁已经存在，判断threadId是否是自己
if(redis.call('hexists',key,threadId) == 1)then
	-- 不存在，获取锁，重入次数+1
	redis.call('hincrby',key,threadId,'1');
	-- 设置有效期
	redis.call('expire',key,releaseTime);
	return 1; -- 返回结果
end;
return 0; --代码走到这里，说明获取锁的不是自己，获取锁失败
```

释放锁的Lua脚本：

```
local key = KEYS[1]; -- 锁的key
local thread = ARGV[1]; -- 线程唯一标识
local releaseTime = ARGV[2]; -- 锁的自动释放时间
-- 判断当前锁是否还是被自己持有
if(redis.call('HEXISTS',key，threadId) == 0)then
	return nil; -- 如果已经不是自己，则直接返回
end;
-- 是自己的锁，则重入次数-1
local count = redis.call('HINCRBY',key,threadId,-1);
-- 判断是否重入次数已经为0
if(count > 0) then
	-- 大于0说明不能释放锁，重置有效期然后返回
	redis.call('expire',key,releaseTime);
	return nil;
else -- 等于0说明可以释放锁，直接删除
	redis.call('DEL',key);
	return nil;
end;
```

> 锁重试和WatchDog机制

```java
@Override
public boolean tryLock(long waitTime, long leaseTime, TimeUnit unit) throws InterruptedException {
    long time = unit.toMillis(waitTime);
    long current = System.currentTimeMillis();
    long threadId = Thread.currentThread().getId();
    Long ttl = tryAcquire(waitTime, leaseTime, unit, threadId);
    // lock acquired
    if (ttl == null) {
        return true;
    }

    time -= System.currentTimeMillis() - current;
    if (time <= 0) {
        acquireFailed(waitTime, unit, threadId);
        return false;
    }

    current = System.currentTimeMillis();
    RFuture<RedissonLockEntry> subscribeFuture = subscribe(threadId);
    if (!subscribeFuture.await(time, TimeUnit.MILLISECONDS)) {
        if (!subscribeFuture.cancel(false)) {
            subscribeFuture.onComplete((res, e) -> {
                if (e == null) {
                    unsubscribe(subscribeFuture, threadId);
                }
            });
        }
        acquireFailed(waitTime, unit, threadId);
        return false;
    }

    try {
        time -= System.currentTimeMillis() - current;
        if (time <= 0) {
            acquireFailed(waitTime, unit, threadId);
            return false;
        }

        while (true) {
            long currentTime = System.currentTimeMillis();
            ttl = tryAcquire(waitTime, leaseTime, unit, threadId);
            // lock acquired
            if (ttl == null) {
                return true;
            }

            time -= System.currentTimeMillis() - currentTime;
            if (time <= 0) {
                acquireFailed(waitTime, unit, threadId);
                return false;
            }

            // waiting for message
            currentTime = System.currentTimeMillis();
            if (ttl >= 0 && ttl < time) {
                subscribeFuture.getNow().getLatch().tryAcquire(ttl, TimeUnit.MILLISECONDS);
            } else {
                subscribeFuture.getNow().getLatch().tryAcquire(time, TimeUnit.MILLISECONDS);
            }

            time -= System.currentTimeMillis() - currentTime;
            if (time <= 0) {
                acquireFailed(waitTime, unit, threadId);
                return false;
            }
        }
    } finally {
        unsubscribe(subscribeFuture, threadId);
    }
    //        return get(tryLockAsync(waitTime, leaseTime, unit));
}
```

流程

- 尝试获取锁
- 判断ttl是否为null
- 是，判断leaseTime是否为-1
  - 是开启watchDog
  - 否返回true

- 否，判断剩余等待时间是都大于0
  - 否，返回false
  - 是，订阅并等待释放锁的信号

- 判断等待时间是否超时
  - 是，返回false
  - 否，回到尝试获取锁

> Redisson分布式锁原理

- 可重入：利用hash结构记录线程id和可重入次数
- 可重试：利用信号量和pubsub功能实现等待、唤醒，获取锁失败的重试机制
- 超时续约：利用watchDog，每隔一段时间（releaseTime/3），重置超时时间

> Redisson分布式锁主从一致性问题

getMultiLock连锁，多主，互不通信，对应从

总结：

- 不可重入Redis分布式锁：
  - 原理：利用setnx的互斥性；利用ex避免死锁；释放锁时判断线程标识
  - 缺陷：不可重入、无法重试、锁超时失效

- 可重入的Redis分布式锁：
  - 原理：利用hash结构，记录线程标识和重入次数；利用watchDog延续锁时间；利用信号量控制锁重试等待
  - 缺点：redis宕机引起锁失效问题

- Redisson的multiLock：
  - 原理：多个独立的Redis结点，必须在所有节点都获取重入锁，才算获取锁成功
  - 缺险运维成本高、实现复杂

## Redis优化秒杀

需求：

- 新增秒杀优惠卷的同时，将优惠卷信息保存到Redis中
- 基于Lua脚本，判断秒杀库存、一人一单，决定用户是否抢购成功
- 如果抢购成功，将优惠卷id和用户id封装后存入阻塞队列
- 开启线程任务，不断从阻塞队列中获取信息，实现异步下单功能

lua脚本

```
--- 1.参数列表
--- 1.1优惠卷id
local voucherId = ARGV[1]
--- 1.2用户id
local userId = ARGV[2]

--- 2.数据key
--- 2.1库存key
local stockKey = 'seckill:stock:' .. voucherId
--- 2.2订单key
local orderKey = 'seckill:order:' .. voucherId

--- 3.脚本业务
--- 3.1判断库存是否充足 get stockKey
if(tonumber(redis.call('get',stockKey)) <= 0) then
    --- 库存不足，返回1
    return 1
end
--- 3.2判断用户是否下单 sismember orderKey userId
if(redis.call('sismember',orderKey,userId) == 1) then
    --- 存在，说明时重复下单，返回2
    return 2
end
--- 3.3扣库存 incrby stockKey -1
redis.call('incrby',stockKey,-1)
--- 3.4下单(保存用户) saddorderKey userId
redis.call('sadd',orderKey,userId)
return 0
```

> 总结

秒杀业务的优化思路是什么？

- 先利用Redis完成库存余量、一人一旦判断，完成抢单业务
- 再将下单业务放入阻塞对，利用独立线程异步下单

基于阻塞队列的异步秒杀存在哪些问题？

- 内存限制问题
- 数据安全问题

## Redis消息队列实现异步秒杀