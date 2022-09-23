# MyBatis

官方网站：[MyBatis中文网](https://mybatis.net.cn/)

## 简介

- MyBatis 是一款优秀的持久层框架，它支持自定义 SQL、存储过程以及高级映射。

- MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作。

- MyBatis 可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。

## 快速开始

---

> 表结构和数据

```sql
# 创建数据库
CREATE DATABASE `mybatis`;
# 使用数据库
USE `mybatis`;
# 删除表
DROP TABLE IF EXISTS `user`;
# 创建表
CREATE TABLE `user` (
`id` int(20) NOT NULL,
`name` varchar(30) DEFAULT NULL,
`pwd` varchar(30) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
# 插入数据
insert  into `user`(`id`,`name`,`pwd`) values (1,'javaboy','123456'),(2,'张三','123456'),(3,'李四','123456')，(4,'王麻子','123456');
```

---

> 导入依赖

```xml
<dependency>
   <groupId>org.mybatis</groupId>
   <artifactId>mybatis</artifactId>
   <version>3.5.2</version>
</dependency>
<dependency>
   <groupId>mysql</groupId>
   <artifactId>mysql-connector-java</artifactId>
   <version>5.1.47</version>
</dependency>
```

> 编写`db.properties`，放到resource目录下

```
driver=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/mybatis
username=root
password=123456
```

> 编写MyBatis核心配置文件

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
       PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
       "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
   <properties resource="db.properties"/>
   <environments default="development">
       <environment id="development">
           <transactionManager type="JDBC"/>
           <dataSource type="POOLED">
               <property name="driver" value="${driver}"/>
               <property name="url" value="${url}"/>
               <property name="username" value="${username}"/>
               <property name="password" value="${password}"/>
           </dataSource>
       </environment>
   </environments>
   <mappers>
       <mapper resource="com/javaboy/dao/UserMapper.xml"/>
   </mappers>
</configuration>
```

XML 配置文件中包含了对 MyBatis 系统的核心设置:

- 获取数据库连接实例的数据源（DataSource）
- 决定事务作用域和控制方式的事务管理器（TransactionManager）

关键：

- 注意 XML 头部的声明，它用来验证 XML 文档的正确性。
- environment 元素体中包含了事务管理和连接池的配置。
- mappers 元素则包含了一组映射器（mapper），这些映射器的 XML 映射文件包含了 SQL 代码和映射定义信息。

注意：

- dataSource这里使用的是占位符，需要使用properties获取
- resource这里使用的我的，需要修改为自己的

> 编写MyBatis工具类

```java
public class MybatisUtils {

   private static SqlSessionFactory sqlSessionFactory;

   static {
       try {
           // mybatis-config.xml放到resource目录下，从 XML 中构建 SqlSessionFactory
           String resource = "mybatis-config.xml";
           InputStream inputStream = Resources.getResourceAsStream(resource);
           sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
      } catch (IOException e) {
           e.printStackTrace();
      }
  }

   // 获取SqlSession连接,默认false事务不自动提交,事务自动提交sqlSessionFactory.openSession(true)
   public static SqlSession getSession(){
       return sqlSessionFactory.openSession();
  }

}
```

原理：

- 每个基于 MyBatis 的应用都是以一个 SqlSessionFactory 的实例为核心的。
- SqlSessionFactory 的实例可以通过 SqlSessionFactoryBuilder 获得。
- SqlSessionFactoryBuilder 则可以从 XML 配置文件或一个预先配置的 Configuration 实例来构建出 SqlSessionFactory 实例。

说明：

- 从 XML 文件中构建 SqlSessionFactory 的实例非常简单，建议使用类路径下的资源文件进行配置。 

- 但也可以使用任意的输入流（InputStream）实例，比如用文件路径字符串或 file:// URL 构造的输入流。

- MyBatis 包含一个名叫 Resources 的工具类，它包含一些实用方法，使得从类路径或其它位置加载资源文件更加容易。

> 创建实体类

```java
// 需要Lombok支持
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
   
   private int id;
   private String name;
   private String pwd;
   
}
```

> 编写Mapper接口类

```java
public interface UserMapper {
   List<User> selectUser();
}
```

> 编写Mapper.xml配置文件

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
       PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
       "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.javaboy.dao.UserMapper">
 <select id="selectUser" resultType="com.javaboy.entity.User">
  select * from user
 </select>
</mapper>
```

注意：

- `namespace`中的名称为对应Mapper接口或者Dao接口的完整包名,必须一致！十分重要，不能写错！

- id对应Mapper接口类里面的方法名
- resultType对应返回结果类的全路径名

>编写测试类

```java
public class MyTest {
   @Test
   public void selectUser() {
       // 获取SqlSession
       SqlSession session = MybatisUtils.getSession();
       // 查询方法一：session.selectList
       List<User> users1 = session.selectList("com.kuang.mapper.UserMapper.selectUser");
       // 查询方法二：session.getMapper,本质上利用了jvm的动态代理机制
       UserMapper mapper = session.getMapper(UserMapper.class);
       List<User> users2 = mapper.selectUser();
	   // 遍历
	   user1.forEach(System.out::println);
       user2.forEach(System.out::println);
       // 关闭连接
       session.close();
  }
}
```

>问题说明：Maven静态资源过滤问题，加载不到`.properties`文件

```java
<resources>
   <resource>
       <directory>src/main/java</directory>
       <includes>
           <include>**/*.properties</include>
           <include>**/*.xml</include>
       </includes>
       <filtering>false</filtering>
   </resource>
   <resource>
       <directory>src/main/resources</directory>
       <includes>
           <include>**/*.properties</include>
           <include>**/*.xml</include>
       </includes>
       <filtering>false</filtering>
   </resource>
</resources>
```

## 概念说明

**类型处理器**

无论是 MyBatis 在预处理语句（PreparedStatement）中设置一个参数时，还是从结果集中取出一个值时， 都会用类型处理器将获取的值以合适的方式转换成 Java 类型。

---

**对象工厂**

MyBatis 每次创建结果对象的新实例时，它都会使用一个对象工厂（ObjectFactory）实例来完成。默认的对象工厂需要做的仅仅是实例化目标类，要么通过默认构造方法，要么在参数映射存在的时候通过有参构造方法来实例化。

---

**作用域（Scope）和生命周期**

理解我们之前讨论过的不同作用域和生命周期类别是至关重要的，因为错误的使用会导致非常严重的并发问题。

---

 **对象生命周期和依赖注入框架**

依赖注入框架可以创建线程安全的、基于事务的 SqlSession 和映射器，并将它们直接注入到你的 bean 中，因此可以直接忽略它们的生命周期。 如果对如何通过依赖注入框架使用 MyBatis 感兴趣，可以研究一下 MyBatis-Spring 或 MyBatis-Guice 两个子项目。

------

**SqlSessionFactoryBuilder**

这个类可以被实例化、使用和丢弃，一旦创建了 SqlSessionFactory，就不再需要它了。 因此 SqlSessionFactoryBuilder 实例的最佳作用域是方法作用域（也就是局部方法变量）。 你可以重用 SqlSessionFactoryBuilder 来创建多个 SqlSessionFactory 实例，但最好还是不要一直保留着它，以保证所有的 XML 解析资源可以被释放给更重要的事情。

 **SqlSessionFactoryBuilder 实例的最佳作用域是方法作用域**（也就是局部方法变量）。

---

**SqlSessionFactory**

SqlSessionFactory 一旦被创建就应该在应用的运行期间一直存在，没有任何理由丢弃它或重新创建另一个实例。 

使用 SqlSessionFactory 的最佳实践是在应用运行期间不要重复创建多次，多次重建 SqlSessionFactory 被视为一种代码“坏习惯”。

**因此 SqlSessionFactory 的最佳作用域是应用作用域。** 有很多方法可以做到，最简单的就是使用单例模式或者静态单例模式。

---

**SqlSession**

每个线程都应该有它自己的 SqlSession 实例。

**SqlSession 的实例不是线程安全的，因此是不能被共享的，所以它的最佳的作用域是请求或方法作用域。**

 绝对不能将 SqlSession 实例的引用放在一个类的静态域，甚至一个类的实例变量也不行。 

也绝不能将 SqlSession 实例的引用放在任何类型的托管作用域中，比如 Servlet 框架中的 HttpSession。 如

果你现在正在使用一种 Web 框架，考虑将 SqlSession 放在一个和 HTTP 请求相似的作用域中。 

换句话说，每次收到 HTTP 请求，就可以打开一个 SqlSession，返回一个响应后，就关闭它。 

这个关闭操作很重要，为了确保每次都能执行关闭操作，你应该把这个关闭操作放到 finally 块中。 

下面的示例就是一个确保 SqlSession 关闭的标准模式：

```java
try (SqlSession session = sqlSessionFactory.openSession()) {
  // 你的应用逻辑代码
}
```

在所有代码中都遵循这种使用模式，可以保证所有数据库资源都能被正确地关闭。

**映射器实例**

映射器是一些绑定映射语句的接口。映射器接口的实例是从 SqlSession 中获得的。

虽然从技术层面上来讲，任何映射器实例的最大作用域与请求它们的 SqlSession 相同。

但方法作用域才是映射器实例的最合适的作用域。

也就是说，映射器实例应该在调用它们的方法中被获取，使用完毕之后即可丢弃。 映射器实例并不需要被显式地关闭。

尽管在整个请求作用域保留映射器实例不会有什么问题，但是你很快会发现，在这个作用域上管理太多像 SqlSession 的资源会让你忙不过来。 

因此，最好将映射器放在方法作用域内。就像下面的例子一样：

```java
try (SqlSession session = sqlSessionFactory.openSession()) {
  BlogMapper mapper = session.getMapper(BlogMapper.class);
  // 你的应用逻辑代码
}
```

---

**命名空间（Namespaces）**

在之前版本的 MyBatis 中，**命名空间（Namespaces）**的作用并不大，是可选的。 但现在，随着命名空间越发重要，你必须指定命名空间。

命名空间的作用有两个，一个是利用更长的全限定名来将不同的语句隔离开来，同时也实现了你上面见到的接口绑定。就算你觉得暂时用不到接口绑定，你也应该遵循这里的规定，以防哪天你改变了主意。 长远来看，只要将命名空间置于合适的 Java 包命名空间之中，你的代码会变得更加整洁，也有利于你更方便地使用 MyBatis。

`命名解析`：为了减少输入量，MyBatis 对所有具有名称的配置元素（包括语句，结果映射，缓存等）使用了如下的命名解析规则。

- 全限定名（比如 “com.mypackage.MyMapper.selectAllThings）将被直接用于查找及使用。
- 短名称（比如 “selectAllThings”）如果全局唯一也可以作为一个单独的引用。 如果不唯一，有两个或两个以上的相同名称（比如 “com.foo.selectAllThings” 和 “com.bar.selectAllThings”），那么使用时就会产生“短名称不唯一”的错误，这种情况下就必须使用全限定名。

## CRUD操作

> select

思路一：直接在方法中传递参数

1、在接口方法的参数前加 @Param属性

2、Sql语句编写的时候，直接取@Param中设置的值即可，不需要单独设置参数类型

```java
//通过密码和名字查询用户
User selectUserByNP(@Param("username") String username,@Param("pwd") String pwd);
```

3、使用`#{}`格式获取数据，可以实现预编译，会先把#{变量}编译成?，在执行时再取值，可以防止sql注入。

```xml
<select id="selectUserByNP" resultType="com.javaboy.entity.User">
    select * from user where name = #{username} and pwd = #{pwd}
</select>
```

思路二：使用万能的Map

1、在接口方法中，参数直接传递Map；

```java
User selectUserByNP2(Map<String,Object> map);
```

2、编写sql语句的时候，需要传递参数类型，参数类型为map

```java
<select id="selectUserByNP2" parameterType="map" resultType="com.kuang.pojo.User">
 select * from user where name = #{username} and pwd = #{pwd}
</select>
```

3、在使用方法的时候，Map的 key 为 sql中取的值即可，没有顺序要求！

```java
Map<String, Object> map = new HashMap<String, Object>();
map.put("username","小明");
map.put("pwd","123456");
User user = mapper.selectUserByNP2(map);
```

总结：如果参数过多，我们可以考虑直接使用Map实现，如果参数比较少，直接传递参数即可！

> insert

1、在UserMapper接口中添加对应的方法

```java
// 添加一个用户
int addUser(User user);
```

2、在UserMapper.xml中添加insert语句

```xml
<insert id="addUser" parameterType="com.javaboy.entity.User">
    insert into user (id,name,pwd) values (#{id},#{name},#{pwd})
</insert>
```

3、测试

```java
@Test
public void testAddUser() {
   SqlSession session = MybatisUtils.getSession();
   UserMapper mapper = session.getMapper(UserMapper.class);
   User user = new User(5,"王五","zxcvbn");
   int i = mapper.addUser(user);
   System.out.println(i);
   // 提交事务,重点!不写的话不会提交到数据库
   session.commit();
   session.close();
}
```

**注意点：增、删、改操作需要提交事务！**

> update

1、同理，编写接口方法

```java
// 修改一个用户
int updateUser(User user);
```

2、编写对应的配置文件SQL

```
<update id="updateUser" parameterType="com.kuang.pojo.User">
  update user set name=#{name},pwd=#{pwd} where id = #{id}
</update>
```

3、测试

```java
@Test
public void testUpdateUser() {
   SqlSession session = MybatisUtils.getSession();
   UserMapper mapper = session.getMapper(UserMapper.class);
   User user = mapper.selectUserById(1);
   user.setPwd("asdfgh");
   int i = mapper.updateUser(user);
   System.out.println(i);
   // 提交事务,重点!不写的话不会提交到数据库
   session.commit();
   session.close();
}
```

> delete

1、同理，编写接口方法

```java
//根据id删除用户
int deleteUser(int id);
```

2、编写对应的配置文件SQL

```xml
<delete id="deleteUser" parameterType="int">
  delete from user where id = #{id}
</delete>
```

3、测试

```java
@Test
public void testDeleteUser() {
   SqlSession session = MybatisUtils.getSession();
   UserMapper mapper = session.getMapper(UserMapper.class);
   int i = mapper.deleteUser(5);
   System.out.println(i);
   // 提交事务,重点!不写的话不会提交到数据库
   session.commit();
   session.close();
}
```

**小结：**

- 所有的增删改操作都需要提交事务！
- 接口所有的普通参数，尽量都写上`@Param`参数，尤其是多个参数时，必须写上！
- 有时候根据业务的需求，可以考虑使用map传递参数！
- 为了规范操作，在SQL的配置文件中，我们尽量将Parameter参数和resultType都写上！

> 模糊查询

**模糊查询like语句该怎么写?**

第1种：在Java代码中添加sql通配符。

```java
string wildcardname = "%smi%";
list<name> names = mapper.selectlike(wildcardname);

<select id="selectlike">
select * from foo where bar like #{value}
</select>
```

第2种：在sql语句中拼接通配符，会引起sql注入

```java
string wildcardname = "smi";
list<name> names = mapper.selectlike(wildcardname);

<select id="selectlike">
    select * from foo where bar like "%"#{value}"%"
</select>
```

## 配置解析

> 核心配置文件` mybatis-config.xml`

注意：元素节点的顺序！顺序不对会报错!


```XML
<!-- configuration（配置） -->
<!-- properties（属性） -->
<!-- settings（设置） -->
<!-- typeAliases（类型别名） -->
<!-- typeHandlers（类型处理器） -->
<!-- objectFactory（对象工厂） -->
<!-- plugins（插件） -->
<!-- environments（环境配置） -->
<!-- environment（环境变量） -->
<!-- transactionManager（事务管理器） -->
<!-- dataSource（数据源） -->
<!-- databaseIdProvider（数据库厂商标识 -->
<!-- mappers（映射器）-->
```

> environments元素
> 

```xml
<environments default="development">
 <environment id="development">
   <transactionManager type="JDBC">
     <property name="..." value="..."/>
   </transactionManager>
   <dataSource type="POOLED">
     <property name="driver" value="${driver}"/>
     <property name="url" value="${url}"/>
     <property name="username" value="${username}"/>
     <property name="password" value="${password}"/>
   </dataSource>
 </environment>
</environments>
```

`environments`说明：

配置MyBatis的多套运行环境，将SQL映射到多个不同的数据库上，必须指定其中一个为默认运行环境（通过default指定）

`environment`说明：


- dataSource 元素使用标准的 JDBC 数据源接口来配置 JDBC 连接对象的资源。
- 数据源是必须配置的,有三种内建的数据源类型
  - `UNPOOLED`：这个数据源的实现只是每次被请求时打开和关闭连接。
  - **`POOLED`**：这种数据源的实现利用“池”的概念将 JDBC 连接对象组织起来 , 这是一种使得并发 Web 应用快速响应请求的流行处理方式。
  - JNDI：这个数据源的实现是为了能在如 Spring 或应用服务器这类容器中使用，容器可以集中或在外部配置数据源，然后放置一个 JNDI 上下文的引用。
  - 数据源也有很多第三方的实现，比如dbcp，c3p0，druid等等....


`transactionManager`说明：

- 事务管理器类型都不需要设置任何属性
  - JDBC
  - MANAGED

> mappers元素

```xml
<!-- 使用相对于类路径的资源引用 -->
<mappers>
 <mapper resource="org/mybatis/builder/PostMapper.xml"/>
</mappers>
<!-- 使用完全限定资源定位符（URL） -->
<mappers>
 <mapper url="file:///var/mappers/AuthorMapper.xml"/>
</mappers>
<!-- 使用映射器接口实现类的完全限定类名,需要配置文件名称和接口名称一致，并且位于同一目录下 -->
<mappers>
 <mapper class="org.mybatis.builder.AuthorMapper"/>
</mappers>
<!-- 将包内的映射器接口实现全部注册为映射器.但是需要配置文件名称和接口名称一致，并且位于同一目录下 -->
<mappers>
 <package name="org.mybatis.builder"/>
</mappers>
```

> Mapper文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
       PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
       "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.kuang.mapper.UserMapper">
   
</mapper>
```

> typeAliases优化

类型别名是为 Java 类型设置一个短的名字。它只和 XML 配置有关，存在的意义仅在于用来减少类完全限定名的冗余。

```xml
<!--配置别名,注意顺序-->
<typeAliases>
   <typeAlias type="com.javaboy.entity.User" alias="User"/>
</typeAliases>
```

当这样配置时，`User`可以用在任何使用`com.javaboy.entity.User`的地方。

也可以指定一个包名，MyBatis 会在包名下面搜索需要的 Java Bean，比如:

```xml
<typeAliases>
   <package name="com.javaboy.entity"/>
</typeAliases>
```

每一个在包 `com.javaboy.entity` 中的 Java Bean，在没有注解的情况下，会使用 Bean 的首字母小写的非限定类名来作为它的别名。

若有注解，则别名为其注解值。见下面的例子：

```java
@Alias("user")
public class User {
  ...
}
```

> 完整settings 

```xml
<settings>
 <setting name="cacheEnabled" value="true"/>
 <setting name="lazyLoadingEnabled" value="true"/>
 <setting name="multipleResultSetsEnabled" value="true"/>
 <setting name="useColumnLabel" value="true"/>
 <setting name="useGeneratedKeys" value="false"/>
 <setting name="autoMappingBehavior" value="PARTIAL"/>
 <setting name="autoMappingUnknownColumnBehavior" value="WARNING"/>
 <setting name="defaultExecutorType" value="SIMPLE"/>
 <setting name="defaultStatementTimeout" value="25"/>
 <setting name="defaultFetchSize" value="100"/>
 <setting name="safeRowBoundsEnabled" value="false"/>
 <setting name="mapUnderscoreToCamelCase" value="false"/>
 <setting name="localCacheScope" value="SESSION"/>
 <setting name="jdbcTypeForNull" value="OTHER"/>
 <setting name="lazyLoadTriggerMethods" value="equals,clone,hashCode,toString"/>
</settings>
```

## ResultMap

**要解决的问题：属性名和字段名不一致**

> 解决方案

方案一：为列名指定别名 , 别名和java实体类的属性名一致 。

自动映射：

ResultMap 的设计思想是，对于简单的语句根本不需要配置显式的结果映射，而对于复杂一点的语句只需要描述它们的关系就行了。

```xml
<select id="selectUserById" resultType="User">
  select id , name , pwd as password from user where id = #{id}
</select>
```

方案二：使用结果集映射->ResultMap 【推荐】

手动映射：

如果世界总是这么简单就好了。但是肯定不是的，数据库中，存在一对多，多对一的情况，会使用到一些高级的结果集映射！

```xml
<resultMap id="UserMap" type="User">
   <!-- id为主键 -->
   <id column="id" property="id"/>
   <!-- column是数据库表的列名 , property是对应实体类的属性名 -->
   <result column="name" property="name"/>
   <result column="pwd" property="password"/>
</resultMap>

<select id="selectUserById" resultMap="UserMap">
  select id , name , pwd from user where id = #{id}
</select>
```

## 执行流程

- Resource加载全局配置文件
- 实例化SqlSessionBuilder构建器
- 由XMLConfigBuilder解析配置文件流
- 把配置信息存放到Configuration中
- 实例化SqlSessionFactory实现类DefaultSqlSessionFactory
- 【事务】由TransactionFactory创建一个Transaction事务对象
- 创建执行器Excutor
- 创建SqlSession接口实现类DefaultSqlSession
- 实现CRUD
- 结果
  - 执行成功，提交事务
  - 执行失败，回滚事务

- 关闭

## 高级映射

**关联-association**：用于一对一和多对一关系

**集合-collection**：collection是用于一对多的关系

映射处理：

- 按照查询进行嵌套处理就像SQL中的子查询

- 按照结果进行嵌套处理就像SQL中的联表查询

---

表结构和数据

```sql
CREATE TABLE `teacher` (
`id` INT(10) NOT NULL,
`name` VARCHAR(30) DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8

INSERT INTO teacher(`id`, `name`) VALUES (1, 'javaboy');

CREATE TABLE `student` (
`id` INT(10) NOT NULL,
`name` VARCHAR(30) DEFAULT NULL,
`tid` INT(10) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `fktid` (`tid`),
CONSTRAINT `fktid` FOREIGN KEY (`tid`) REFERENCES `teacher` (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8


INSERT INTO `student` (`id`, `name`, `tid`) VALUES ('1', '小明', '1');
INSERT INTO `student` (`id`, `name`, `tid`) VALUES ('2', '小红', '1');
INSERT INTO `student` (`id`, `name`, `tid`) VALUES ('3', '小张', '1');
INSERT INTO `student` (`id`, `name`, `tid`) VALUES ('4', '小李', '1');
INSERT INTO `student` (`id`, `name`, `tid`) VALUES ('5', '小王', '1');
```

---

**多个学生对应一个老师**

> 按查询嵌套处理

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
       PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
       "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.kuang.mapper.StudentMapper">

   <resultMap id="StudentTeacher" type="Student">
       <!--association关联属性 property属性名 javaType属性类型 column在多的一方的表中的列名-->
       <association property="teacher"  column="tid" javaType="Teacher" select="getTeacher"/>
   </resultMap>
   <select id="getStudents" resultMap="StudentTeacher">
    select * from student
   </select>
   <select id="getTeacher" resultType="teacher">
      select * from teacher where id = #{id}
   </select>

</mapper>
```

association中column多参数配置：`column="{key=value,key=value}"`。

举个栗子：设值`column="{id=tid,name=tid}"`,取值`#{id},#{name}`

> 按结果嵌套处理

```xml
<select id="getStudents2" resultMap="StudentTeacher2" >
  select s.id sid, s.name sname , t.name tname
  from student s,teacher t
  where s.tid = t.id
</select>

<resultMap id="StudentTeacher2" type="Student">
   <id property="id" column="sid"/>
   <result property="name" column="sname"/>
   <!--关联对象property 关联对象在Student实体类中的属性-->
   <association property="teacher" javaType="Teacher">
       <result property="name" column="tname"/>
   </association>
</resultMap>
```

**一个老师对应多个学生**

>按结果嵌套处理

```xml
<mapper namespace="com.kuang.mapper.TeacherMapper">

   <select id="getTeacher" resultMap="TeacherStudent">
      select s.id sid, s.name sname , t.name tname, t.id tid
      from student s,teacher t
      where s.tid = t.id and t.id=#{id}
   </select>

   <resultMap id="TeacherStudent" type="Teacher">
       <result  property="name" column="tname"/>
       <collection property="students" ofType="Student">
           <result property="id" column="sid" />
           <result property="name" column="sname" />
           <result property="tid" column="tid" />
       </collection>
   </resultMap>
</mapper>
```

## 动态SQL

> if 语句

```xml
<select id="queryBlogIf" parameterType="map" resultType="blog">
  select * from blog where
   <if test="title != null">
      title = #{title}
   </if>
   <if test="author != null">
      and author = #{author}
   </if>
</select>
```

> Where

```xml
<select id="queryBlogIf" parameterType="map" resultType="blog">
  select * from blog
   <where>
       <if test="title != null">
          title = #{title}
       </if>
       <if test="author != null">
          and author = #{author}
       </if>
   </where>
</select>
```

> Set

```xml
<!--注意set是用的逗号隔开-->
<update id="updateBlog" parameterType="map">
  update blog
     <set>
         <if test="title != null">
            title = #{title},
         </if>
         <if test="author != null">
            author = #{author}
         </if>
     </set>
  where id = #{id};
</update>
```

> choose

```xml
<select id="queryBlogChoose" parameterType="map" resultType="blog">
  select * from blog
   <where>
       <choose>
           <when test="title != null">
                title = #{title}
           </when>
           <when test="author != null">
              and author = #{author}
           </when>
           <otherwise>
              and views = #{views}
           </otherwise>
       </choose>
   </where>
</select>
```

> SQL片段

注意：

- 最好基于 单表来定义 sql 片段，提高片段的可重用性

- 在 sql 片段中不要包括 where

```xml
<sql id="if-title-author">
   <if test="title != null">
      title = #{title}
   </if>
   <if test="author != null">
      and author = #{author}
   </if>
</sql>

<select id="queryBlogIf" parameterType="map" resultType="blog">
  select * from blog
   <where>
       <!-- 引用 sql 片段，如果refid 指定的不在本文件中，那么需要在前面加上 namespace -->
       <include refid="if-title-author"></include>
       <!-- 在这里还可以引用其他的 sql 片段 -->
   </where>
</select>
```

> Foreach

```xml
<select id="queryBlogForeach" parameterType="map" resultType="blog">
  select * from blog
   <where>
       <!--
       collection:指定输入对象中的集合属性
       item:每次遍历生成的对象
       open:开始遍历时的拼接字符串
       close:结束时拼接的字符串
       separator:遍历对象之间需要拼接的字符串
       select * from blog where 1=1 and (id=1 or id=2 or id=3)
     -->
       <foreach collection="ids"  item="id" open="and (" close=")" separator="or">
          id=#{id}
       </foreach>
   </where>
</select>
```

## 缓存

> Mybatis缓存

- MyBatis包含一个非常强大的查询缓存特性，它可以非常方便地定制和配置缓存。缓存可以极大的提升查询效率。
- MyBatis系统中默认定义了两级缓存：**一级缓存**和**二级缓存**
  - 默认情况下，只有一级缓存开启。（SqlSession级别的缓存，也称为本地缓存）
  - 二级缓存需要手动开启和配置，它是基于namespace级别的缓存。
  - 为了提高扩展性，MyBatis定义了缓存接口Cache。我们可以通过实现Cache接口来自定义二级缓存

> 一级缓存

一级缓存也叫本地缓存，与数据库同一次会话期间查询到的数据会放在本地缓存中。**一级缓存就是一个map！**

> 一级缓存失效的四种情况

一级缓存是SqlSession级别的缓存，是一直开启的，我们关闭不了它!

- sqlSession不同,每个sqlSession中的缓存相互独立
- sqlSession相同，查询条件不同
- sqlSession相同，两次查询之间执行了增删改操作！
- sqlSession相同，手动清除一级缓存`session.clearCache();`

> 二级缓存

二级缓存也叫全局缓存，一级缓存作用域太低了，所以诞生了二级缓存。

它基于namespace级别的缓存，一个名称空间，对应一个二级缓存。

工作机制：

- 一个会话查询一条数据，这个数据就会被放在当前会话的一级缓存中；

- 如果当前会话关闭了，这个会话对应的一级缓存就没了；但是我们想要的是，会话关闭了，一级缓存中的数据被保存到二级缓存中；
- 新的会话查询信息，就可以从二级缓存中获取内容；
- 不同的mapper查出的数据会放在自己对应的缓存（map）中；

> 使用步骤

- 开启全局缓存 【mybatis-config.xml】

  ```xml
  <setting name="cacheEnabled" value="true"/>
  ```

- 去每个mapper.xml中配置使用二级缓存，这个配置非常简单【xxxMapper.xml】

  ```xml
  <cache eviction="FIFO" flushInterval="60000" size="512" readOnly="true"/>
  ```

说明：

- 创建了一个 FIFO 缓存，

- 每隔 60 秒刷新，

- 最多可以存储结果对象或列表的 512 个引用，

- 返回的对象被认为是只读的，因此对它们进行修改可能会在不同线程中的调用者产生冲突

>结论

- 只要开启了二级缓存，我们在同一个Mapper中的查询，可以在二级缓存中拿到数据
- 查出的数据都会被默认先放在一级缓存中
- 只有会话提交或者关闭以后，一级缓存中的数据才会转到二级缓存中

> EhCache

Ehcache是一种广泛使用的java分布式缓存，用于通用缓存，第三方缓存。

**引入依赖**

```xml
<!-- https://mvnrepository.com/artifact/org.mybatis.caches/mybatis-ehcache -->
<dependency>
   <groupId>org.mybatis.caches</groupId>
   <artifactId>mybatis-ehcache</artifactId>
   <version>1.1.0</version>
</dependency>
```

**在mapper.xml中使用对应的缓存**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="http://ehcache.org/ehcache.xsd"
        updateCheck="false">
   <!--
      diskStore：为缓存路径，ehcache分为内存和磁盘两级，此属性定义磁盘的缓存位置。参数解释如下：
      user.home – 用户主目录
      user.dir – 用户当前工作目录
      java.io.tmpdir – 默认临时文件路径
    -->
   <diskStore path="./tmpdir/Tmp_EhCache"/>
   
   <!-- defaultCache：默认缓存策略，当ehcache找不到定义的缓存时，则使用这个缓存策略。只能定义一个。-->
   <defaultCache
           eternal="false"
           maxElementsInMemory="10000"
           overflowToDisk="false"
           diskPersistent="false"
           timeToIdleSeconds="1800"
           timeToLiveSeconds="259200"
           memoryStoreEvictionPolicy="LRU"/>

   <cache
           name="cloud_user"
           eternal="false"
           maxElementsInMemory="5000"
           overflowToDisk="false"
           diskPersistent="false"
           timeToIdleSeconds="1800"
           timeToLiveSeconds="1800"
           memoryStoreEvictionPolicy="LRU"/>

</ehcache>
```

参数说明：

- name:缓存名称
- maxElementsInMemory:缓存最大数目
- maxElementsOnDisk：硬盘最大缓存个数。
- eternal:对象是否永久有效，一但设置了，timeout将不起作用。
- overflowToDisk:是否保存到磁盘，当系统当机时
- timeToIdleSeconds:设置对象在失效前的允许闲置时间（单位：秒）。仅当eternal=false对象不是永久有效时使用，可选属性，默认值是0，也就是可闲置时间无穷大。
- timeToLiveSeconds:设置对象在失效前允许存活时间（单位：秒）。最大时间介于创建时间和失效时间之间。仅当eternal=false对象不是永久有效时使用，默认是0.，也就是对象存活时间无穷大。
- diskPersistent：是否缓存虚拟机重启期数据 Whether the disk store persists between restarts of the Virtual Machine. The default value is false。
- diskSpoolBufferSizeMB：这个参数设置DiskStore（磁盘缓存）的缓存区大小。默认是30MB。每个Cache都应该有自己的一个缓冲区。
- diskExpiryThreadIntervalSeconds：磁盘失效线程运行时间间隔，默认是120秒。
- memoryStoreEvictionPolicy：当达到maxElementsInMemory限制时，Ehcache将会根据指定的策略去清理内存。默认策略是LRU（最近最少使用）。你可以设置为FIFO（先进先出）或是LFU（较少使用）。
- clearOnFlush：内存数量最大时是否清除。
- memoryStoreEvictionPolicy:可选策略有：LRU（最近最少使用，默认策略）、FIFO（先进先出）、LFU（最少访问次数）。
  - FIFO，first in first out，这个是大家最熟的，先进先出。
  - LFU， Less Frequently Used，就是上面例子中使用的策略，直白一点就是讲一直以来最少被使用的。如上面所讲，缓存的元素有一个hit属性，hit值最小的将会被清出缓存。
  - LRU，Least Recently Used，最近最少使用的，缓存的元素有一个时间戳，当缓存容量满了，而又需要腾出地方来缓存新的元素的时候，那么现有缓存元素中时间戳离当前时间最远的元素将被清出缓存。
