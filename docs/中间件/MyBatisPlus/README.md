# MyBatisPlus

## 1.MyBatisPlus概述

基础知识：MyBatis、Spring、SpringMVC

三件套：JPA 、 tk-mapper、MyBatisPlus

MyBatisPlus可以节省我们大量工作时间，所有的CRUD代码它都可以自动化完成！偷懒的神器！

### 1.1简介

是什么？ MyBatis 本来就是简化 JDBC 操作的！

MyBatis Plus官网：https://mp.baomidou.com/ 

MyBatis Plus，简化 MyBatis ！

### 1.2特性

- **无侵入**：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑

- **损耗小**：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作， BaseMapper

- **强大的 CRUD 操作**：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求, 以后简单的CRUD操作，它不用自己编写了！

- **支持 Lambda 形式调用**：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
- **支持主键自动生成**：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题

- **支持ActiveRecord模式**：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作

- **支持自定义全局通用操作**：支持全局通用方法注入（ Write once, use anywhere ）

- **内置代码生成器**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用（自动帮你生成代码）

- **内置分页插件**：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询

- **分页插件支持多种数据库**：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、 Postgre、SQLServer 等多种数据库

- **内置性能分析插件**：可输出 Sql 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询

- **内置全局拦截插件**：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作

## 2.快速入门

官方链接：https://mp.baomidou.com/guide/quick-start.html#

初始化工程使用第三方组件：

1、导入对应的依赖

2、研究依赖如何配置

3、代码如何编写

4、提高扩展技术能力！

### 2.1步骤

1.创建数据库`mybatis_plus`

~~~sql
DROP TABLE IF EXISTS user;
CREATE TABLE user (
id BIGINT(20) NOT NULL COMMENT '主键ID',
name VARCHAR(30) NULL DEFAULT NULL COMMENT '姓名', age INT(11) NULL DEFAULT NULL COMMENT '年龄',
email VARCHAR(50) NULL DEFAULT NULL COMMENT '邮箱', PRIMARY KEY (id)
);
-- 真实开发中，version（乐观锁）、deleted（逻辑删除）、gmt_create、gmt_modified
~~~

2.创建user表

~~~sql
INSERT INTO user (id, name, age, email) VALUES 
(1, 'Jone', 18, 'test1@baomidou.com'),
(2, 'Jack', 20, 'test2@baomidou.com'),
(3, 'Tom', 28, 'test3@baomidou.com'),
(4, 'Sandy', 21, 'test4@baomidou.com'),
(5, 'Billie', 24, 'test5@baomidou.com');
~~~

3.编写项目，初始化项目！使用SpringBoot初始化！

4.导入依赖

~~~xml
<!-- 数据库驱动 -->
<dependency>
<groupId>mysql</groupId>
<artifactId>mysql-connector-java</artifactId>
</dependency>
<!-- lombok -->
<dependency>
<groupId>org.projectlombok</groupId>
<artifactId>lombok</artifactId>
</dependency>
<!-- mybatis-plus -->
<!-- mybatis-plus 是自己开发，并非官方的！ -->
<dependency>
<groupId>com.baomidou</groupId>
<artifactId>mybatis-plus-boot-starter</artifactId>
<version>3.0.5</version>
</dependency>
~~~

说明：我们使用 mybatis-plus 可以节省我们大量的代码，尽量不要同时导入 mybatis 和 mybatis- plus！版本的差异！

5.连接数据库！这一步和 mybatis 相同！

~~~properties
# 应用名称
spring.application.name=mybatis_plus
# 应用服务 WEB 访问端口
server.port=8080

# mysql 5 驱动不同 com.mysql.jdbc.Driver
# mysql 8 驱动不同com.mysql.cj.jdbc.Drive和需要增加时区的配置
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.url=jdbc:mysql://localhost:3306/mybatis_plus?useSSL=false&useUnicode=true&characterEncoding=utf-8&serverTimezone=GMT%2B8
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
~~~

6.两种方式

传统方式:pojo-dao（连接mybatis，配置mapper.xml文件）-service-controller 

使用了mybatis-plus 之后:

- pojo

  ~~~java
  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public class User {
      private Long id;
      private String name;
      private Integer age;
      private String email;
  }
  ~~~

- mapper接口

  ~~~java
  //在对应的Mapper上面实现基本的接口 BaseMapper
  public interface UserMapper extends BaseMapper<User> {
      //所有的CRUD操作都已经完成了
      //你不需要像以前一个一个写
  }
  ~~~

- 扫描我们的mapper

  ~~~java
  //扫描我们的maoer文件夹
  @MapperScan("com.simpleteen.mapper")
  @SpringBootApplication
  public class MybatisPlusApplication {
  
      public static void main(String[] args) {
          SpringApplication.run(MybatisPlusApplication.class, args);
      }
  
  }
  ~~~

- 测试

  ~~~java
  @SpringBootTest
  class MybatisPlusApplicationTests {
  
      @Autowired
      private UserMapper userMapper;
  
      @Test
      void contextLoads() {
          //参数是一个Warpper，条件构造器，这里我们先不用 null
          //查询全部用户
          List<User> userList = userMapper.selectList(null);
          userList.forEach(System.out::println);
      }
  
  }
  ~~~

- 结果

  ~~~text
  User(id=1, name=Jone, age=18, email=test1@baomidou.com)
  User(id=2, name=Jack, age=20, email=test2@baomidou.com)
  User(id=3, name=Tom, age=28, email=test3@baomidou.com)
  User(id=4, name=Sandy, age=21, email=test4@baomidou.com)
  User(id=5, name=Billie, age=24, email=test5@baomidou.com)
  ~~~

### 2.2思考问题

1、SQL谁帮我们写的 ? MyBatis-Plus 都写好了

2、方法哪里来的？ MyBatis-Plus 都写好了

## 3.配置日志

我们所有的sql现在是不可见的，我们希望知道它是怎么执行的，所以我们必须要看日志！

~~~properties
# 配置日志
mybatis-plus.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
~~~

配置完毕日志之后，后面的学习就需要注意这个自动生成的SQL，你们就会喜欢上 MyBatis-Plus！

~~~text
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@43a09ce2] was not registered for synchronization because synchronization is not active
JDBC Connection [HikariProxyConnection@351535152 wrapping com.mysql.cj.jdbc.ConnectionImpl@4c447c09] will not be managed by Spring
==>  Preparing: SELECT id,name,age,email FROM user 
==> Parameters: 
<==    Columns: id, name, age, email
<==        Row: 1, Jone, 18, test1@baomidou.com
<==        Row: 2, Jack, 20, test2@baomidou.com
<==        Row: 3, Tom, 28, test3@baomidou.com
<==        Row: 4, Sandy, 21, test4@baomidou.com
<==        Row: 5, Billie, 24, test5@baomidou.com
<==      Total: 5
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@43a09ce2]
~~~

## 4.CRUD**扩展**

### 4.1Insert 插入

测试

~~~java
    // 测试插入
    @Test
    public void testInsert(){
        User user = new User();
        user.setName("沈金勇");
        user.setAge(23);
        user.setEmail("438217638@qq.com");
        int result = userMapper.insert(user); // 帮我们自动生成id
        System.out.println(result); // 受影响的行数
        System.out.println(user); // 发现，id会自动回填
    }
~~~

结果

~~~text
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@24534cb0] was not registered for synchronization because synchronization is not active
JDBC Connection [HikariProxyConnection@1500151620 wrapping com.mysql.cj.jdbc.ConnectionImpl@6dab01d9] will not be managed by Spring
==>  Preparing: INSERT INTO user ( id, name, age, email ) VALUES ( ?, ?, ?, ? ) 
==> Parameters: 1366960553100099586(Long), 沈金勇(String), 23(Integer), 438217638@qq.com(String)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@24534cb0]
1
User(id=1366960553100099586, name=沈金勇, age=23, email=438217638@qq.com)
~~~

数据库插入的id的默认值为：全局的唯一id

默认 ID_WORKER 全局唯一id

### 4.2主键生成策略

[分布式系统唯一ID生成方案汇总](https://www.cnblogs.com/haoxinyue/p/5208136.html)

> 雪花算法

snowﬂake是Twitter开源的分布式ID生成算法，结果是一个long型的ID。其核心思想是：使用41bit作为毫秒数，10bit作为机器的ID（5个bit是数据中心，5个bit的机器ID），12bit作为毫秒内的流水号（意味着每个节点在每毫秒可以产生 4096 个 ID），最后还有一个符号位，永远是0。可以保证几乎全球唯一！

> 主键自增

我们需要配置主键自增：

1、实体类字段上@TableId(type = IdType.AUTO)

2、数据库字段一定要是自增！修改表，勾上自增

3、再次测试插入即可！

> 其余的源码解释

~~~java
public enum IdType {
    AUTO(0),// 数据库id自增
    NONE(1),// 未设置主键
    INPUT(2), // 手动输入
    ID_WORKER(3),// 默认的全局唯一id
    UUID(4),// 全 局 唯 一 id uuid
    ID_WORKER_STR(5);//ID_WORKER 字符串表示法
}
~~~

### 4.3更新操作

~~~java
    // 测试更新
    @Test
    public void testUpdate(){
        User user = new User();
        // 通过条件自动拼接动态sql
        user.setId(5L);
        user.setName("青简工作室");
        user.setAge(1);
        // 注意：updateById 但是参数是一个 对象！
        int i = userMapper.updateById(user);
        System.out.println(i);
    }
~~~

所有的sql都是自动帮你动态配置的！

### 4.4自动填充

创建时间、修改时间！这些个操作一遍都是自动化完成的，我们不希望手动更新！

阿里巴巴开发手册：所有的数据库表：gmt_create、gmt_modiﬁed几乎所有的表都要配置上！而且需要自动化！

> 方式一：数据库级别（工作中不允许你修改数据库）

1、在表中新增字段 create_time, update_time;数据类型都是datetime；默认都是CURRENT_TIMESTAMP;create_time勾选更新

2、再次测试插入方法，我们需要先把实体类同步！

~~~java
private Date createTime;
private Date updateTime;
~~~

3、再次更新查看结果即可

> 方式二：代码级别

1、删除数据库的默认值、更新操作！

2、实体类字段属性上需要增加注解

~~~java
// 字段添加填充内容
@TableField(fill = FieldFill.INSERT)
private Date createTime;
@TableField(fill = FieldFill.INSERT_UPDATE)
private Date updateTime;
~~~

3、编写处理器来处理这个注解即可！

~~~java
@Slf4j
@Component //一定不要忘记把处理器加到IOC容器中
public class MyMetaObjectHandler implements MetaObjectHandler {
    //插入时的填充策略
    @Override
    public void insertFill(MetaObject metaObject) {
        log.info("start insert fill ");
        // setFieldValByName(String fieldName, Object fieldVal, MetaObject metaObject)
        this.setFieldValByName("createTime",new Date(),metaObject);
        this.setFieldValByName("updateTime",new Date(),metaObject);
    }
    //更新时的填充策略
    @Override
    public void updateFill(MetaObject metaObject) {
        log.info("start update fill ");
        this.setFieldValByName("updateTime",new Date(),metaObject);
    }
}
~~~

4、测试插入

5、测试更新、观察时间即可！

### 4.5乐观锁

在面试过程中，我们经常会被问道乐观锁，悲观锁！这个其实非常简单！

乐观锁 : 故名思意十分乐观，它总是认为不会出现问题，无论干什么不去上锁！如果出现了问题， 再次更新值测试

悲观锁：故名思意十分悲观，它总是认为总是出现问题，无论干什么都会上锁！再去操作！

> 乐观锁机制！

乐观锁实现方式：

- 取出记录时，获取当前 version

- 更新时，带上这个version

- 执行更新时， set version = newVersion where version = oldVersion

- 如果version不对，就更新失败

~~~sql
乐观锁：先查询，获得版本号 version = 1
-- A
update user set name = "kuangshen", version = version + 1 where id = 2 and version = 1
-- B 线程抢先完成，这个时候version= 2，会导致A修改失败！ 
update user set name = "kuangshen", version = version + 1 where id = 2 and version = 1
~~~

>测试一下MP的乐观锁插件

1、给数据库中增加version字段！（数据类型是int、长度是10、默认值是1、注释是乐观锁）

2、我们实体类加对应的字段

```java
@Version //乐观锁Version注解
private Integer version;
```

3、注册组件

~~~java
//扫描我们的mapper文件夹
@MapperScan("com.simpleteen.mapper")
@EnableTransactionManagement//事务管理，默认开启
@Configuration//配置类
public class MyBatisPlusConfig {
    //注册乐观锁插件
    @Bean
    public OptimisticLockerInterceptor optimisticLockerInterceptor(){
        return new OptimisticLockerInterceptor();
    }
}
~~~

4、测试一下！

测试成功

~~~java
    // 测试乐观锁成功！
    @Test
    public void testOptimisticLocker(){
        // 1、查询用户信息
        User user = userMapper.selectById(1L);
        // 2、修改用户信息
        user.setName("shen");
        user.setEmail("438217638@qq.com");
        // 3、执行更新操作
        userMapper.updateById(user);
    }
~~~

测试失败

~~~java
    // 测试乐观锁失败！多线程下
    @Test
    public void testOptimisticLocker2(){
        // 线 程 1
        User user = userMapper.selectById(1L);
        user.setName("shen111");
        // 模拟另外一个线程执行了插队操作
        User user2 = userMapper.selectById(1L);
        user2.setName("shen222");
        // 自旋锁来多次尝试提交！
        userMapper.updateById(user2);
        userMapper.updateById(user);// 如果没有乐观锁就会覆盖插队线程的值！
    }
~~~

### 4.6查询操作

测试查询

~~~java
    // 测试查询
    @Test
    public void testSelectById(){
        User user = userMapper.selectById(1L);
        System.out.println(user);
    }
~~~

测试批量查询

~~~java
    // 测试批量查询
    @Test
    public void testSelectByBatchId(){
        List<User> users = userMapper.selectBatchIds(Arrays.asList(1, 2, 3));
        users.forEach(System.out::println);
    }
~~~

按条件查询之一使用map操作

~~~java
    //条件查询之一使用map操作
    @Test
    public void testSelectByBatchIds(){
        HashMap<String, Object> map = new HashMap<>();
        // 自定义要查询
        map.put("name","Tom");
        map.put("age",28);
        List<User> users = userMapper.selectByMap(map);
        users.forEach(System.out::println);
    }
~~~

### 4.7分页查询

分页在网站使用的十分之多！

1、原始的 limit 进行分页

2、pageHelper 第三方插件

3、MP 其实也内置了分页插件！

> 使用

1、配置拦截器组件即可

```java
// 分页插件
@Bean
public PaginationInterceptor paginationInterceptor() {
    return new PaginationInterceptor();
}
```

2、直接使用Page对象即可！

~~~java
    // 测试分页查询
    @Test
    public void testPage() {
        // 参数一：当前页
        // 参数二：页面大小
        // 使用了分页插件之后，所有的分页操作也变得简单的！
        Page<User> page = new Page<>(2, 5);
        userMapper.selectPage(page, null);
        page.getRecords().forEach(System.out::println);
        System.out.println(page.getTotal());
    }
~~~

### 4.8删除操作

测试根据 id 删除记录

~~~java
    // 测试根据id删除记录
    @Test
    public void testDeleteById(){
        userMapper.deleteById(1366960553100099588L);
    }
~~~

通过id批量删除

~~~java
    // 通过id批量删除
    @Test
    public void testDeleteBatchId(){
        userMapper.deleteBatchIds(Arrays.asList(1366960553100099586L,1366960553100099587L));
    }
~~~

通过map删除

~~~java
    // 通过map删除
    @Test
    public void testDeleteMap() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("name","青简工作室");
        userMapper.deleteByMap(map);
    }
~~~

### 4.9逻辑删除

我们在工组中会遇到一些问题：逻辑删除！

物理删除 ：从数据库中直接移除

逻辑删除 ：在数据库中没有被移除，而是通过一个变量来让他失效！ deleted = 0 => deleted = 1

管理员可以查看被删除的记录！防止数据的丢失，类似于回收站！

> 测试

1、在数据表中增加一个 deleted 字段,数据类型是int，长度是1，默认是0，注释是逻辑删除

2、实体类中增加属性

~~~java
    @TableLogic //逻辑删除
    private Integer deleted;
~~~

3、配置！

MyBatisPlusConfig

~~~java
    // 逻辑删除组件
    @Bean
    public ISqlInjector sqlInjector() { 
        return new LogicSqlInjector();
    }
~~~

application.properties

~~~properties
# 配置逻辑删除
mybatis-plus.global-config.db-config.logic-delete-value=1
mybatis-plus.global-config.db-config.logic-not-delete-value=0
~~~

4、测试一下删除！

记录依旧在数据库，但是值确已经变化了！

==走的是更新操作，并不是删除操作==

以上的所有CRUD操作及其扩展操作，我们都必须精通掌握！会大大提高你的工作和写项目的效率！

## 5.性能分析插件

我们在平时的开发中，会遇到一些慢sql。可以通过测试、druid、压测工具等找出来

作用：性能分析拦截器，用于输出每条 SQL 语句及其执行时间

MP也提供性能分析插件，如果超过这个时间就停止运行！

1、导入插件

application.properties

```properties
# 设置开发环境
spring.profiles.active=dev
```

MyBatisPlusConfig

~~~java
    /**
     * SQL执行效率插件
     */
    @Bean
    @Profile({"dev","test"})// 设置 dev test 环境开启，保证我们的效率
    public PerformanceInterceptor performanceInterceptor() {
        PerformanceInterceptor performanceInterceptor = new PerformanceInterceptor();
        performanceInterceptor.setMaxTime(100); // 设置sql执行的最大时间，如果超过了则不执行
        performanceInterceptor.setFormat(true); // 是否格式化代码
        return performanceInterceptor;
    }
~~~

2、测试使用！

记住，要在SpringBoot中配置环境为dev或者 test 环境！

使用性能分析插件，可以帮助我们提高效率！

## 6.条件构造器

**十分重要：Wrapper**

我们写一些复杂的sql就可以使用它来替代！

1、测试一，记住查看输出的SQL进行分析

~~~java
@SpringBootTest
public class WrapperTest {
    @Autowired
    private UserMapper userMapper;

    @Test
    void contextLoads() {
        // 查询name不为空的用户，并且邮箱不为空的用户，年龄大于等于12
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.isNotNull("name").
                isNotNull("email")
                .ge("age",12);//大于
        userMapper.selectList(wrapper).forEach(System.out::println); //和我们刚才学习的map对比一下
    }
}
~~~

2、测试二，记住查看输出的SQL进行分析

~~~java
    @Test
    void test2(){
        // 查询名字Jack
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.eq("name","Jack");
        User user = userMapper.selectOne(wrapper); // 查询一个数据，出现多个结果使用List或者Map
        System.out.println(user);
    }
~~~

3、测试三，记住查看输出的SQL进行分析

~~~java
    @Test
    void test3(){
        // 查询年龄在 20 ~ 30 岁之间的用户
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.between("age",20,30); // 区间
        Integer count = userMapper.selectCount(wrapper);// 查询结果数
        System.out.println(count);
    }
~~~

4、测试四，记住查看输出的SQL进行分析

~~~java
    // 模糊查询
    @Test
    void test4(){
        // 查询年龄在 20 ~ 30 岁之间的用户
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        // 左和右 t%
        wrapper.notLike("name","J")
                .likeRight("email","t");
        List<Map<String, Object>> maps = userMapper.selectMaps(wrapper);
        maps.forEach(System.out::println);
    }
~~~

5、测试五，记住查看输出的SQL进行分析

~~~java
    // 模糊查询
    @Test
    void test5(){
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        // id 在子查询中查出来
        wrapper.inSql("id","select id from user where id<3");
        List<Object> objects = userMapper.selectObjs(wrapper);
        objects.forEach(System.out::println);
    }
~~~

6、测试六，记住查看输出的SQL进行分析

~~~java
    @Test
    void test6(){
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        // 通过id进行排序
        wrapper.orderByAsc("id");
        List<User> users = userMapper.selectList(wrapper);
        users.forEach(System.out::println);
    }
~~~

## 7.代码自动生成器

dao、pojo、service、controller都给我自己去编写完成！

AutoGenerator 是 MyBatis-Plus 的代码生成器，通过 AutoGenerator 可以快速生成 Entity、 Mapper、Mapper XML、Service、Controller 等各个模块的代码，极大的提升了开发效率。

### 7.1导入mybatis-plus依赖

~~~xml
<!-- mybatis-plus -->
<!-- mybatis-plus 是自己开发，并非官方的！ -->
<dependency>
<groupId>com.baomidou</groupId>
<artifactId>mybatis-plus-boot-starter</artifactId>
<version>3.0.5</version>
</dependency>
~~~

### 7.2连接数据库

application.properties

~~~properties
# 应用名称
spring.application.name=mybatis_plus
# 应用服务 WEB 访问端口
server.port=8080
# 设置开发环境
spring.profiles.active=dev

# 数据库连接
# mysql 5 驱动不同 com.mysql.jdbc.Driver
# mysql 8 驱动不同com.mysql.cj.jdbc.Drive和需要增加时区的配置
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.url=jdbc:mysql://localhost:3306/mybatis_plus?useSSL=false&useUnicode=true&characterEncoding=utf-8&serverTimezone=GMT%2B8
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
~~~

### 7.3编写代码自动生成器

~~~java
package com.simpleteen.controller;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.PackageConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.po.TableFill;
import com.baomidou.mybatisplus.generator.config.rules.DateType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;

import java.util.ArrayList;

// 代码自动生成器
public class Code {
    public static void main(String[] args) {
        //需要构建一个 代码自动生成器 对象
        AutoGenerator mpg = new AutoGenerator();
        //配置策略
        //1、全局配置
        GlobalConfig gc = new GlobalConfig();
        String projectPath = System.getProperty("user.dir");//获取用户目录
        gc.setOutputDir(projectPath + "/src/main/java");//生成代码存放的目录
        gc.setAuthor("沈金勇");//作者信息
        gc.setOpen(false);//是否打开资源管理器
        gc.setFileOverride(false);//是否覆盖
        gc.setServiceName("%sService");//去Service的I前缀
        gc.setIdType(IdType.ID_WORKER);//主键生成策略
        gc.setDateType(DateType.ONLY_DATE);//日期的类型
        gc.setSwagger2(true);//是否生成Swagger2文档
        mpg.setGlobalConfig(gc);//把配置丢到自动生成配置里面

        //2、设置数据源
        DataSourceConfig dsc = new DataSourceConfig();
        dsc.setUrl("jdbc:mysql://localhost:3306/mybarie_plus?useSSL=false&useUnicode=true&characterEncoding=utf-8&serverTimezone=GMT%2B8");
        dsc.setDriverName("com.mysql.cj.jdbc.Driver");
        dsc.setUsername("root");
        dsc.setPassword("123456");
        dsc.setDbType(DbType.MYSQL);
        mpg.setDataSource(dsc);

        //3、包的配置
        PackageConfig pc = new PackageConfig();
        pc.setModuleName("blog");
        pc.setParent("com.simpleteen");
        pc.setEntity("entity");
        pc.setMapper("mapper");
        pc.setService("service");
        pc.setController("controller");
        mpg.setPackageInfo(pc);

        //4、策略配置
        StrategyConfig strategy = new StrategyConfig();
        // 设置要映射的表名
        strategy.setInclude("blog_tags", "course", "links", "sys_settings", "user_record", " user_say");
        strategy.setNaming(NamingStrategy.underline_to_camel);//包命名规则
        strategy.setColumnNaming(NamingStrategy.underline_to_camel);//列名字命名规则
        strategy.setEntityLombokModel(true); //自动lombok
        //逻辑删除
        strategy.setLogicDeleteFieldName("deleted");
        // 自动填充配置
        TableFill gmtCreate = new TableFill("gmt_create", FieldFill.INSERT);
        TableFill gmtModified = new TableFill("gmt_modified", FieldFill.INSERT_UPDATE);
        ArrayList<TableFill> tableFills = new ArrayList<>();
        tableFills.add(gmtCreate);
        tableFills.add(gmtModified);
        strategy.setTableFillList(tableFills);
        // 乐观锁
        strategy.setVersionFieldName("version");
        strategy.setRestControllerStyle(true);//RESTFul驼峰命名
        strategy.setControllerMappingHyphenStyle(true); //localhost:8080/hello_id_2
        mpg.setStrategy(strategy);

        //执行
        mpg.execute();
    }
~~~

### 7.4执行OK
