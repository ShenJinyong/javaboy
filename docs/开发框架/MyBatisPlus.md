# MyBatisPlus

官方网站：[MyBatis-Plus (baomidou.com)](https://baomidou.com/)

## 简介

MyBatis-Plus（简称 MP）是一个 MyBatis的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

> 愿景

我们的愿景是成为 MyBatis 最好的搭档，就像 [魂斗罗](https://baomidou.com/img/contra.jpg) 中的 1P、2P，基友搭配，效率翻倍。

> 特性

- **无侵入**：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑
- **损耗小**：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作
- **强大的 CRUD 操作**：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求
- **支持 Lambda 形式调用**：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
- **支持主键自动生成**：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题
- **支持 ActiveRecord 模式**：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作
- **支持自定义全局通用操作**：支持全局通用方法注入（ Write once, use anywhere ）
- **内置代码生成器**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用
- **内置分页插件**：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询
- **分页插件支持多种数据库**：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer 等多种数据库
- **内置性能分析插件**：可输出 SQL 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询
- **内置全局拦截插件**：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作

> 支持数据库

任何能使用 `MyBatis` 进行 CRUD, 并且支持标准 SQL 的数据库，具体支持情况如下：

- MySQL，Oracle，DB2，H2，HSQL，SQLite，PostgreSQL，SQLServer，Phoenix，Gauss ，ClickHouse，Sybase，OceanBase，Firebird，Cubrid，Goldilocks，csiidb
- 达梦数据库，虚谷数据库，人大金仓数据库，南大通用(华库)数据库，南大通用数据库，神通数据库，瀚高数据库

> 框架结构

![mybatis-plus-framework](.\images\mybatis-plus-framework.jpg)

## 快速开始

> 表结构和数据

---

现有一张 `User` 表，其表结构如下：

| id   | name   | age  | email              |
| ---- | ------ | ---- | ------------------ |
| 1    | Jone   | 18   | test1@baomidou.com |
| 2    | Jack   | 20   | test2@baomidou.com |
| 3    | Tom    | 28   | test3@baomidou.com |
| 4    | Sandy  | 21   | test4@baomidou.com |
| 5    | Billie | 24   | test5@baomidou.com |

其对应的数据库 Schema 脚本如下：

```sql
DROP TABLE IF EXISTS user;

CREATE TABLE user
(
    id BIGINT(20) NOT NULL COMMENT '主键ID',
    name VARCHAR(30) NULL DEFAULT NULL COMMENT '姓名',
    age INT(11) NULL DEFAULT NULL COMMENT '年龄',
    email VARCHAR(50) NULL DEFAULT NULL COMMENT '邮箱',
    PRIMARY KEY (id)
);
```

其对应的数据库 Data 脚本如下：

```sql
DELETE FROM user;

INSERT INTO user (id, name, age, email) VALUES
(1, 'Jone', 18, 'test1@baomidou.com'),
(2, 'Jack', 20, 'test2@baomidou.com'),
(3, 'Tom', 28, 'test3@baomidou.com'),
(4, 'Sandy', 21, 'test4@baomidou.com'),
(5, 'Billie', 24, 'test5@baomidou.com');
```

---

> 创建SpringBoot项目`2.0+ 版本`，添加依赖

```xml
<!-- MybatisPlus -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.2</version>
</dependency>
<!-- MySQL驱动包 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

> 配置yaml

```yaml
spring:
  # 数据源
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/server_boot
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: 123456
```

> 扫描Mapper，二选一即可

- 在 Spring Boot 启动类中添加 `@MapperScan` 注解

```java
@SpringBootApplication
@MapperScan("com.baomidou.mybatisplus.samples.quickstart.mapper")
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
```

- 在每一个具体的Mapper下使用`@Mapper`注解

```java
@Mapper
public interface UserMapper extends BaseMapper<User> {

}
```

> 实体类，注意需要添加Lombok依赖和插件

```java
@Data
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}
```

> 测试

```java
@SpringBootTest
public class SampleTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testSelect() {
        System.out.println(("----- selectAll method test ------"));
        // UserMapper 中的 selectList() 方法的参数为 MP 内置的条件封装器 Wrapper，所以不填写就是无任何条件
        List<User> userList = userMapper.selectList(null);
        Assert.assertEquals(5, userList.size());
        userList.forEach(System.out::println);
    }

}
```

## 注解

> @TableName

- 描述：表名注解，标识实体类对应的表


> @TableId

- 描述：主键注解

> @TableField

- 描述：字段注解（非主键）

> @Version

- 描述：乐观锁注解、标记 `@Verison` 在字段上

> @TableLogic

- 描述：表字段逻辑处理注解（逻辑删除）

## CRUD接口

[CRUD 接口 | MyBatis-Plus (baomidou.com)](https://baomidou.com/pages/49cc81/#service-crud-接口)

## 条件构造器

[条件构造器 | MyBatis-Plus (baomidou.com)](https://baomidou.com/pages/10c804/)

## 代码生成器

> 添加依赖

```xml
<!-- 代码自动生成器 -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.5.1</version>
</dependency>
<!-- 模板引擎 -->
<dependency>
    <groupId>org.apache.velocity</groupId>
    <artifactId>velocity-engine-core</artifactId>
    <version>2.0</version>
</dependency>
```

> 最佳实践

```java
@SpringBootTest
public class GeneratorTest {

    // 定义数据源数据
    private static String DATABASE_URL = "jdbc:mysql://127.0.0.1:3306/server_boot";
    private static String DATABASE_USERNAME = "root";
    private static String DATABASE_PASSWORD = "123456";

    @Test
    public void generatorCode(){

        FastAutoGenerator
                // 1.配置数据源
                .create(DATABASE_URL,DATABASE_USERNAME,DATABASE_PASSWORD)
                // 2.全局配置
                .globalConfig((scanner, builder) -> builder
                        // 设置作者名
                        .author(scanner.apply("请输入作者名称？"))
                        // 生成代码存放的目录
                        .outputDir(System.getProperty("user.dir") + "/src/main/java")
                        // 注释日期
                        .commentDate("yyyy-MM-dd hh:mm:ss")
                        // 定义生成的实体类中日期的类型 【TIME_PACK=LocalDateTime】、【ONLY_DATE=Date】
                        .dateType(DateType.ONLY_DATE)
                        // 开启Swagger模式
                        .enableSwagger()
                        // 使用FileOverride覆盖开启覆盖模式，默认不覆盖
                        // .fileOverride()
                        // 禁止打开输出目录，默认打开
                        .disableOpenDir()
                )
                // 3.包配置
                .packageConfig((scanner, builder) -> builder
                        // 设置父包名
                        .parent("com.javaboy")
                        // 设置模块名
                        .moduleName(scanner.apply("请输入模块名？"))
                        // pojo 实体类
                        .entity("entity")
                        // Service 包名
                        .service("service")
                        // ***ServiceImpl 包名
                        .serviceImpl("service.impl")
                        // Mapper 包名
                        .mapper("mapper")
                        // Mapper XML 包名
                        .xml("mapper")
                        // Controller 包名
                        .controller("controller")
                        // 自定义文件包名
                        .other("utils")
                        // 把mapper里面的xml放到resources目录下
                        .pathInfo(Collections.singletonMap(OutputFile.mapperXml, System.getProperty("user.dir")+"/src/main/resources/mapper"))
                )
                // 4.策略配置
                .strategyConfig((scanner, builder) -> builder
                        // 设置需要生成的数据表名
                        .addInclude(getTables(scanner.apply("请输入表名，多个英文逗号分隔？所有输入 all")))
                        // 设置过滤前缀，多个使用逗号分隔，过滤不需要生成的数据库表
                        .addTablePrefix("tbl_")

                        // Mapper 策略配置
                        .mapperBuilder()
                        // 设置父类
                        .superClass(BaseMapper.class)
                        // 格式化 mapper 文件名称
                        .formatMapperFileName("%sMapper")
                        // 开启 @Mapper 注解
                        .enableMapperAnnotation()
                        // 格式化 Xml 文件名称
                        .formatXmlFileName("%sMapper")

                        // Service 策略配置
                        .serviceBuilder()
                        // 格式化 service 接口文件名称，%s进行匹配表名，如 UserService
                        .formatServiceFileName("%sService")
                        // 格式化 service 实现类文件名称，%s进行匹配表名，如 UserServiceImpl
                        .formatServiceImplFileName("%sServiceImpl")

                        // Controller 策略配置
                        .controllerBuilder()
                        // 格式化 Controller 类文件名称，%s进行匹配表名，如 UserController
                        .formatFileName("%sController")
                        // 开启生成 @RestController 控制器
                        .enableRestStyle()

                        // 实体类策略配置
                        .entityBuilder()
                        .formatFileName("%sDo")
                        // 开启 Lombok
                        .enableLombok()
                        // 不实现 Serializable 接口，不生成 SerialVersionUID
                        .disableSerialVersionUID()
                        // 逻辑删除字段名
                        .logicDeleteColumnName("deleted")
                        // 乐观锁
                        .versionColumnName("version")
                        // 数据库表映射到实体的命名策略，下划线转驼峰命
                        .naming(NamingStrategy.underline_to_camel)
                        // 数据库表字段映射到实体的命名策略：下划线转驼峰命
                        .columnNaming(NamingStrategy.underline_to_camel)
                        // 自动填充配置,"create_time"字段自动填充为插入时间，"update_time"字段自动填充为插入修改时间
                        .addTableFills(new Column("gmt_create",FieldFill.INSERT),new Column("gmt_modified",FieldFill.INSERT_UPDATE))
                        // 开启生成实体时生成字段注解
                        .enableTableFieldAnnotation()
                )
                // 5.模板引擎配置，默认 Velocity 可选模板引擎 Beetl 或 Freemarker
                .templateEngine(new VelocityTemplateEngine())
                // 6.执行
                .execute();
    }

    // 处理 all 情况
    protected static List<String> getTables(String tables) {
        return "all".equals(tables) ? Collections.emptyList() : Arrays.asList(tables.split(","));
    }

}
```

> 使用说明

- 配置数据源，修改自己定义的数据源
- 全局配置，一般不修改
- 包配置，修改自己的父包名
- 策略配置，修改过滤前缀

问题：IDEA测试模式下，没有办法输入？

解决：修改**idea.exe.vmoptions** 文件，最后一行添加参数`-Deditable.java.test.console=true`，重新启动IDEA

## 自动填充功能

> 实体类添加注解`@TableField`

```java
@ApiModelProperty("创建时间")
@TableField(value = "gmt_create", fill = FieldFill.INSERT)
private Date gmtCreate;

@ApiModelProperty("更新时间")
@TableField(value = "gmt_modified", fill = FieldFill.INSERT_UPDATE)
private Date gmtModified;
```

> 自定义实现类`MyMetaObjectHandler`

```java
@Slf4j // 该注解说明可以使用slf4j日志打印
@Component // 该注解说明把处理器加载到IOC容器中
public class MyMetaObjectHandler implements MetaObjectHandler {

    // 插入时的填充策略
    @Override
    public void insertFill(MetaObject metaObject) {
        log.info("start insert fill ...");
        this.strictInsertFill(metaObject, "gmtCreate", Date.class, new Date());
        this.strictUpdateFill(metaObject, "gmtModified", Date.class, new Date());
    }

    // 填充时的填充策略
    @Override
    public void updateFill(MetaObject metaObject) {
        log.info("start update fill ...");
        this.strictUpdateFill(metaObject, "gmtModified", Date.class, new Date());
    }

}
```

> 说明

填充原理是直接给`entity`的属性设置值，因此`cloumn`需要使用驼峰命名。

## 逻辑删除

> 实体类添加注解`@TableLogic`

```java
@TableLogic
private Integer deleted;
```

> 配置yaml

```yaml
mybatis-plus:
  global-config:
    db-config:
      # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配置步骤2)
      logic-delete-field: flag
      # 逻辑已删除值(默认为 1)
      logic-delete-value: 1
      # 逻辑未删除值(默认为 0)
      logic-not-delete-value: 0
```

## 乐观锁

> 实体类添加注解`@Version`

```java
@Version
private Integer version;
```

> 配置MybatisPlusConfig

```java
@EnableTransactionManagement // 事务管理，默认开启
@Configuration // 该注解说明是配置类
public class MybatisPlusConfig {

    // 注册乐观锁插件
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();
        mybatisPlusInterceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return mybatisPlusInterceptor;
    }

}
```

## 分页插件

参考资料：[Mybatis-Plus实现分页查询 - FZU_TKQ - 博客园 (cnblogs.com)](https://www.cnblogs.com/FZU-TKQ/p/14944506.html)

> 配置

```java
@EnableTransactionManagement // 事务管理，默认开启
@Configuration // 该注解说明是配置类
public class MybatisPlusConfig {

    /**
     * 新的分页插件,一缓和二缓遵循mybatis的规则,
     * 需要设置 MybatisConfiguration#useDeprecatedExecutor = false
     * 避免缓存出现问题(该属性会在旧插件移除后一同移除)
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 注册分页插件
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }

}
```

> 定义通用返回实体类

```java
public class ListResponseEntity<T> {
    // 总数量
    private int total = 0;
    // 当前页
    private int page = 1;
    // 页大小
    private int size = 20;
    // 页数据
    private List<T> list;

    public ListResponseEntity() {
    }

    /**
     * mybatis-plus进行分页
     * */
    public ListResponseEntity(List<T> t,Page<T> page) {
        this.list = t;
        this.total = Integer.parseInt(String.valueOf(page.getTotal()));
        this.page = Integer.parseInt(String.valueOf(page.getCurrent()));
        this.size = Integer.parseInt(String.valueOf(page.getSize()));
    }
    
}
```

> 简单使用

```java
@Override
public ListResponseEntity<xxxVo> getXxxList(int current, int size) {
    // 定义分页
    Page<Xxx> page = new Page<>(current, size);
    // 定义查询条件
    QueryWrapper<Xxx> wrapper = new QueryWrapper<>();
	// 添加查询条件
    // StrUtil.....
    // 分页查询
    Page<Xxx> XxxPage = XxxMapper.selectPage(page, wrapper);
    // 实体类转换，Xxx转换成XxxVO
    List<XxxVo> XxxVoList = XxxPage.getRecords().stream().map(item -> {
        return xxxToXxxVo(item);
    }).collect(Collectors.toList());
    // 返回分页查询结果
    return new ListResponseEntity(XxxVoList,XxxPage);
}
```

## 多数据源

[多数据源 | MyBatis-Plus (baomidou.com)](https://baomidou.com/pages/a61e1b/#文档-documentation)

敬请期待...
