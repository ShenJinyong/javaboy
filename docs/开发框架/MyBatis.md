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

   // 获取SqlSession连接
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
       // 查询方法二：session.getMapper
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

