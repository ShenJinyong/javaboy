# MyBatis

环境：

- JDK1.8
- Mysql5.7
- maven3.6.3
- IDEA

回顾：

- JDBC
- Mysql
- Java基础
- Maven
- Junit

SSM框架都是有配置文件的。学习的最好方式:官网文档。

官方文档：https://mybatis.org/mybatis-3/zh/getting-started.html

## 1.简介

### 1.1什么是 MyBatis？

- MyBatis 是一款优秀的**持久层框架**
- 它支持自定义 SQL、存储过程以及高级映射。
- MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作。
- MyBatis 可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录。
- MyBatis 本是apache的一个[开源项目](https://baike.baidu.com/item/开源项目/3406069)iBatis, 2010年这个[项目](https://baike.baidu.com/item/项目/477803)由apache software foundation 迁移到了[google code](https://baike.baidu.com/item/google code/2346604)，并且改名为MyBatis 。2013年11月迁移到[Github](https://baike.baidu.com/item/Github/10145341)。

如何获得Mybatis？

- maven仓库
- Github
- 中文文档

### 1.2持久化

数据持久化

- 持久化就是将程序的数据在持久状态和瞬时状态转化的过程
- 内存：**断电即失**

- 数据库（jdbc），IO文件持久化
- 生活：冷藏，罐头

**为什么需要持久化？**

- 有一些对象，不能让它丢掉

- 内存太贵了

### 1.3持久层

Dao层、Service层、Controller层...

- 完成持久化工作的代码
- 层界限十分明显

### 1.4为什么需要mybatis？

- 帮助程序猿将数据存入到数据库中

- 方便
- 传统的JDBC代码太复杂了，简化出来形成框架，自动化
- 不用Mybatis也可以，但是使用更容易上手
- 技术没有高低之分
- 优点
  - 简单易学
  - 灵活
  - sql和代码的分离，提高了可维护性。
  - 提供映射标签，支持对象与数据库的orm字段关系映射
  - 提供对象关系映射标签，支持对象关系组建维护
  - 提供xml标签，支持编写动态sql

**最重要的一点：使用的人多！**

## 2.第一个Mybatis程序

思路：搭建环境-->导入Mybatis-->编写代码-->测试！

### 2.1搭建环境

搭建数据库

~~~sql
CREATE DATABASE `mybatis`;

USE `mybatis`;

CREATE TABLE `user`(
`id` INT(20) NOT NULL COMMENT '主键id',
`name` VARCHAR(30) DEFAULT NULL COMMENT '用户名',
`pwd` VARCHAR(30) DEFAULT NULL COMMENT '密码',
PRIMARY KEY(`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8;

INSERT INTO `user`(`id`,`name`,`pwd`)VALUES
(1,'张三','123456'),
(2,'李四','123456'),
(3,'王五','123456');
~~~

新建项目

1. 新建一个普通的maven项目
2. 删除src目录，把这个项目变成父工程
3. 导入依赖

~~~xml
    <!--导入依赖-->
    <dependencies>
        <!--mysql-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
        </dependency>
        <!--mybatis-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.6</version>
        </dependency>
        <!--junit-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.1</version>
        </dependency>
    </dependencies>
~~~

### 2.2创建一个模块

- 编写mybatis的核心配置文件

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<!--configuration核心配置文件-->
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis?useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF-8&amp;serverTimezone=UTC"/>
                <property name="username" value="root"/>
                <property name="password" value="password"/>
            </dataSource>
        </environment>
    </environments>
</configuration>
~~~

- 编写mybatis工具类

~~~java
package com.simpleteen.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

//sqlSessionFactory-->sqlSession
public class MybatisUtils {

    private static SqlSessionFactory sqlSessionFactory;

    static{
        try {
            //使用mybatis第一步：获取sqlSessionFactory对象
            String resource = "mybatis-config.xml";
            InputStream inputStream = Resources.getResourceAsStream(resource);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //既然有了 SqlSessionFactory，顾名思义，我们可以从中获得 SqlSession 的实例。
    // org.apache.ibatis.session.SqlSession 提供了在数据库执行 SQL 命令所需的所有方法。
    // 你可以通过 SqlSession 实例来直接执行已映射的 SQL 语句。
    public static SqlSession getSqlSession(){
        return sqlSessionFactory.openSession();
    }
}
~~~

### 2.3编写代码

- 实体类

  ~~~java
  package com.simpleteen.pojo;
  
  import lombok.AllArgsConstructor;
  import lombok.Data;
  import lombok.NoArgsConstructor;
  
  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  //实体类
  public class User {
      private int id;
      private String name;
      private String pwd;
  }
  
  ~~~

  注意：这里添加了lombok支持

- Dao接口

  ~~~java
  package com.simpleteen.dao;
  
  import com.simpleteen.pojo.User;
  
  import java.util.List;
  
  public interface UserDao {
      List<User> getUserList();
  }
  ~~~

- 接口实现类

  由原来的UserDaoImpl转变为一个Mapper配置文件

  ~~~xml
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE mapper
          PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
          "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
  <!--namespace囊顶一个对应的Dao/Mapper接口-->
  <mapper namespace="com.simpleteen.dao.UserDao">
      <!--select查询语句-->
      <!--resultMap返回结果集类型，全限定类名-->
      <!--resultType返回结果类型，全限定类名-->
      <select id="getUserList" resultType="com.simpleteen.pojo.User">
          select * from mybatis.user;
      </select>
  </mapper>
  ~~~

### 2.4测试

**注意点：**

1. 配置文件没有注册

   `org.apache.ibatis.binding.BindingException: Type interface com.simpleteen.dao.UserDao is not known to the MapperRegistry.`

   **MapperRegistry是什么？**

   ~~~java
       <!--每一个Mapper.xml都需要在mybatis核心配置文件中注册！-->
       <mappers>
           <mapper resource="com/simpleteen/dao/UserMapper.xml"/>
       </mappers>
   ~~~

2. Maven导出资源问题

   在pom.xml增加配置

   ~~~xml
       <build>
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
       </build>
   ~~~

`The error may exist in com/simpleteen/dao/UserMapper.xml`

**可能会遇到的问题：**

1. 配置文件没有注册
2. 绑定接口错误
3. 方法名不对
4. 返回类型不对
5. Maven导出资源问题

**Junit测试**

~~~java
package com.sompleteen.dao;

import com.simpleteen.dao.UserDao;
import com.simpleteen.pojo.User;
import com.simpleteen.utils.MybatisUtils;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import java.util.List;

public class UserDaoTest {

    @Test
    public void test(){
        //第一步：获得sqlSession对象
        SqlSession sqlSession = MybatisUtils.getSqlSession();

        try{
            //方式一：执行SQL
            UserDao mapper = sqlSession.getMapper(UserDao.class);
            List<User> userList = mapper.getUserList();

            //方式二：
            //List<User> userList = sqlSession.selectList("com.simpleteen.dao.UserDao.getUserList");

            for (User user : userList) {
                System.out.println(user);
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            //关闭SqlSession
            sqlSession.close();
        }
    }
}

~~~

## 3.CRUD

### 3.1namespace

namespace中的包名要和Dao/Mapper接口的包名一致！

### 3.2Select

选择，查询语句

- id：就是对应namespace中的方法名
- resultType:Sql语句执行的返回值
- paramerType：参数类型

### 3.3UserMapper

~~~java
    //根据ID查询用户
    User getUserById(int id);

    //insert一个用户
    int addUser(User user);

    //修改用户
    int updateUser(User user);

    //删除一个用户
    int deleteUser(int id);
~~~

### 3.4UserMapper.xml

~~~xml
    <select id="getUserById" parameterType="int" resultType="com.simpleteen.pojo.User">
        select * from mybatis.user where id = #{id};
    </select>

    <!--对象中的属性,可以直接去出来-->
    <insert id="addUser" parameterType="com.simpleteen.pojo.User">
        insert into mybatis.user(id,name,pwd) values (#{id},#{name},#{pwd});
    </insert>

    <update id="updateUser" parameterType="com.simpleteen.pojo.User">
        update mybatis.user set name=#{name},pwd=#{pwd} where id = #{id};
    </update>

    <delete id="deleteUser" parameterType="int">
        delete from mybatis.user where id=#{id};
    </delete>
~~~

### 3.5Test

~~~java
    @Test
    public void getUserById(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        User user = mapper.getUserById(1);
        System.out.println(user);
        sqlSession.close();
    }

    //增删改需要提交事务
    @Test
    public void addUser(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        int res = mapper.addUser(new User(4, "hello", "123456"));
        if (res>0){
            System.out.println("插入成功");
        }
        //提交事务
        sqlSession.commit();
        sqlSession.close();
    }

    @Test
    public void updateUser(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        int res = mapper.updateUser(new User(4, "hello world", "123456"));
        if (res>0){
            System.out.println("更新成功");
        }
        //提交事务
        sqlSession.commit();
        sqlSession.close();
    }

    @Test
    public void deleteUser(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        int res = mapper.deleteUser(4);
        if (res>0){
            System.out.println("删除成功");
        }
        //提交事务
        sqlSession.commit();
        sqlSession.close();
    }
~~~

### 3.6注意点

**增删改需要提交事务！！！**

### 3.7分析错误

- 标签不要匹配错
- resource绑定mapper，需要使用路径
- 程序配置文件必须符合规范
- NullPointerException，没有注册到资源
- 输出的xml文件中存在中文乱码
- maven资源没有导出

### 3.8万能的Map

假设，我们的实体类，或者数据库中的表、字段或者参数过多，我们应当使用Map！

~~~java
    //万能的Map
    int addUser2(Map<String,Object> map);
~~~

~~~xml
  <insert id="addUser2" parameterType="map">
        insert into mybatis.user(id,name,pwd) values (#{userId},#{userName},#{userPwd});
    </insert>
~~~

~~~java
    @Test
    public void addUser2(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        HashMap<String, Object> map = new HashMap<>();
        map.put("userId",4);
        map.put("userName","shen");
        map.put("userPwd","123456");
        int res = mapper.addUser2(map);
        if (res>0){
            System.out.println("插入成功");
        }
        //提交事务
        sqlSession.commit();
        sqlSession.close();
    }
~~~

Map传递参数，直接在sql中取出key即可！

对象传递参数，直接在sql中取对象的属性即可！

只有一个基本类型参数的情况下，可以直接在sql中取到！

多个参数用Map,或者注解！

### 4.9.模糊查询

模糊查询怎么写？

1. Java代码执行的时候，传递通配符%%
2. 在sql拼接中使用通配符（容易sql注入）

```java
//模糊查询
List<User> getUserLike(String value);
```

~~~xml
    <select id="getUserLike" resultType="com.simpleteen.pojo.User">
        select * from mybatis.user where name like #{value};
    </select>
~~~

~~~java
    @Test
    public void getUserLike(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        List<User> users = mapper.getUserLike("%张%");
        for (User user : users) {
            System.out.println(user);
        }
        //提交事务
        sqlSession.commit();
        sqlSession.close();
    }
~~~

## 4.配置解析

==在xml中，所有的标签都可以规定其顺序！！==

### 4.1核心配置文件

- configuration（配置）
  - [properties（属性）](https://mybatis.org/mybatis-3/zh/configuration.html#properties)
  - [settings（设置）](https://mybatis.org/mybatis-3/zh/configuration.html#settings)
  - [typeAliases（类型别名）](https://mybatis.org/mybatis-3/zh/configuration.html#typeAliases)
  - [typeHandlers（类型处理器）](https://mybatis.org/mybatis-3/zh/configuration.html#typeHandlers)
  - [objectFactory（对象工厂）](https://mybatis.org/mybatis-3/zh/configuration.html#objectFactory)
  - [plugins（插件）](https://mybatis.org/mybatis-3/zh/configuration.html#plugins)
  - environments（环境配置）
    - environment（环境变量）
      - transactionManager（事务管理器）
      - dataSource（数据源）
  - [databaseIdProvider（数据库厂商标识）](https://mybatis.org/mybatis-3/zh/configuration.html#databaseIdProvider)
  - [mappers（映射器）](https://mybatis.org/mybatis-3/zh/configuration.html#mappers)

### 4.2环境配置(environment)

MyBatis可以配置成适应多种环境

**不过要记住：尽管可以配置多个环境，但每个sqlSessionFactory实例只能选择一种环境**

学会使用配置多套运行环境

Mybatis默认的事务管理器就是JDBC，连接池就是POOLED

### 4.3属性（properties）

我们可以通过properties引用配置文件

这些属性可以在外部进行配置，并可以进行动态替换。你既可以在典型的 Java 属性文件中配置这些属性，也可以在 properties 元素的子元素中设置。【db.properties】

编写一个配置文件db.properties

~~~properties
driver=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/mybatis?useSSL=false&amp;useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC
username=root
password=123456
~~~

在核心配置文件引入

~~~xml
    <!--引入外部配置文件-->
    <properties resource="db.properties"></properties>
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

        <environment id="test">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis?useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF-8&amp;serverTimezone=UTC"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
~~~

- 可以直接引入外部文件
- 可以在其中增加一些属性配置
- 如果两个文件有同一个字段，有限使用外部配置的文件

### 4.4类型别名（typeAliases）

- 类型别名可为 Java 类型设置一个缩写名字。 
- 它仅用于 XML 配置，意在降低冗余的全限定类名书写。

~~~xml
    <!--可以给实体类起别名-->
    <typeAliases>
        <typeAlias type="com.simpleteen.pojo.User" alias="User"/>
    </typeAliases>
~~~

也可以指定一个包名，MyBatis 会在包名下面搜索需要的 Java Bean，比如：

烧苗实体类的包，它的默认别名就为这个类的类名，推荐首字母小写！

~~~xml
    <typeAliases>
        <package name="com.simpleteen.pojo"/>
    </typeAliases>
~~~

**比较**

在实体类比较少的时候，使用第一种方式

如果实体类十分多，建议使用第二种

第一种可以DIY别名，第二种则不行，如果得要改，需要在实体类上增加注解

### 4.5设置（settings）

这是 MyBatis 中极为重要的调整设置，它们会改变 MyBatis 的运行时行为。

cacheEnabled、lazyLoadingEnabled  、logImpl

### 4.6其他配置

- [typeHandlers（类型处理器）](https://mybatis.org/mybatis-3/zh/configuration.html#typeHandlers)
- [objectFactory（对象工厂）](https://mybatis.org/mybatis-3/zh/configuration.html#objectFactory)
- [plugins（插件）](https://mybatis.org/mybatis-3/zh/configuration.html#plugins)
  - MyBatis Generator Core
  - Mybatis Plus
  - 通用Mapper

### 4.7映射器(mappers)

MapperRegistry：注册绑定我们的Mapper文件

方式一：使用相对于类路径的资源引用

```xml
<mappers>
    <mapper resource="com/simpleteen/dao/UserMapper.xml"/>
</mappers>
```

方式二：使用映射器接口实现类的完全限定类名 

```xml
<mappers>
    <mapper class="com.simpleteen.dao.UserMapper"/>
</mappers>
```

注意点：

- 接口和它的Mapper配置文件必须同名
- 接口和它的Mapper配置文件必须在同一个包下

方式三：将包内的映射器接口实现全部注册为映射器

```xml
<mappers>
    <package name="com.simpleteen.dao"/>
</mappers>
```

注意点：

- 接口和它的Mapper配置文件必须同名
- 接口和它的Mapper配置文件必须在同一个包下

方式四：使用完全限定资源定位符（URL）

**不推荐使用**

### 4.8生命周期和作用域

理解我们之前讨论过的不同作用域和生命周期类别是至关重要的，因为错误的使用会导致非常严重的**并发问题**。

**SqlSessionFactoryBuilder：**

- 一旦创建了 SqlSessionFactory，就不再需要它了
- 局部变量

**SqlSessionFactory:**

- 说白了就是可以想象为：数据库连接池
- SqlSessionFactory 一旦被创建就应该在应用的运行期间一直存在，**没有任何理由丢弃它或重新创建另一个实例**。
- 因此 SqlSessionFactory 的最佳作用域是应用作用域。
- 最简单的就是使用单例模式或者静态单例模式。

**SqlSession：**

- 连接到连接池的一个请求！
- SqlSession 的实例不是线程安全的，因此是不能被共享的，所以它的最佳的作用域是请求或方法作用域
- 用完之后需要赶紧关闭，否则资源被占用

SqlSession下可以有很多个Mapper，这里的每一个Mapper，就代表一个具体的业务！

## 5.结果集映射（ResultMap）

目标：解决属性名和字段名不一致的问题

### 5.1问题

数据库中的字段（User）:id、name、pwd

新建一个项目,拷贝之前的，测试实体类字段不一致的情况

修改User

~~~java
@Data
@AllArgsConstructor
@NoArgsConstructor
//实体类
public class User {
    private int id;
    private String name;
    private String password;
}
~~~

测试出现问题，password=null

解决方法

- 起别名

~~~sql
select id,name,pwd as password from mybatis.user;
~~~

### 5.2resultMap

结果集映射

~~~java
    <resultMap id="UserMap" type="User">
        <!--column数据库中的字段，property实体类中的属性-->
        <result column="id" property="id"/>
        <result column="name" property="name"/>
        <result column="pwd" property="password"/>
    </resultMap>
    <select id="getUserList" resultMap="UserMap">
        select * from mybatis.user;
    </select>
~~~

- `resultMap` 元素是 MyBatis 中最重要最强大的元素。
- ResultMap 的设计思想是，对简单的语句做到零配置，对于复杂一点的语句，只需要描述语句之间的关系就行了。
- `ResultMap` 的优秀之处——你完全可以不用显式地配置它们。

## 6.日志

### 6.1日志工厂

如果一个数据库操作，出现了异常，我们需要排错，日志就是最好的助手！

曾经：sout、debug

现在：日志工厂

logImpl：指定 MyBatis 所用日志的具体实现，未指定时将自动查找。

- SLF4J 

- LOG4J 【掌握】

- LOG4J2 

- JDK_LOGGING

- COMMONS_LOGGING

- STDOUT_LOGGING【掌握】

- NO_LOGGINsG

在Mybatis中具体使用哪一个日志实现，在设置中设定！

**STDOUT_LOGGING标志日志输出**

在mybatis核心配置文件中，配置我们的日志

~~~xml
    <settings>
        <setting name="logImpl" value="STDOUT_LOGGING"/>
    </settings>
~~~

### 6.2LOG4J

什么是log4j？

- Log4j是[Apache](https://baike.baidu.com/item/Apache/8512995)的一个开源项目，通过使用Log4j，我们可以控制日志信息输送的目的地是[控制台](https://baike.baidu.com/item/控制台/2438626)、文件、[GUI](https://baike.baidu.com/item/GUI)组件
- 我们也可以控制每一条日志的输出格式
- 通过定义每一条日志信息的级别，我们能够更加细致地控制日志的生成过程
- 通过一个[配置文件](https://baike.baidu.com/item/配置文件/286550)来灵活地进行配置，而不需要修改应用的代码。

1.先导入log4j的包

~~~xml
        <!--log4j-->
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
~~~

2.log4j.properties

~~~properties
#将等级为DEBUG的日志信息输出到console和file这两个目的地，console和file的定义在下面的代码
log4j.rootLogger=DEBUG,console,file

#控制台输出的相关设置
log4j.appender.console = org.apache.log4j.ConsoleAppender
log4j.appender.console.Target = System.out
log4j.appender.console.Threshold=DEBUG
log4j.appender.console.layout = org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern=[%c]-%m%n

#文件输出的相关设置
log4j.appender.file = org.apache.log4j.RollingFileAppender
log4j.appender.file.File=./log/Shen.log
log4j.appender.file.MaxFileSize=10mb
log4j.appender.file.Threshold=DEBUG
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=[%p][%d{yy-MM-dd}][%c]%m%n

#日志输出级别
log4j.logger.org.mybatis=DEBUG
log4j.logger.java.sql=DEBUG
log4j.logger.java.sql.Statement=DEBUG
log4j.logger.java.sql.ResultSet=DEBUG
log4j.logger.java.sql.PreparedStatement=DEBUG
~~~

3.配置log4j为日志的实现

~~~xml
    <settings>
        <setting name="logImpl" value="LOG4J"/>
    </settings>
~~~

4.Log4j的使用，直接测试运行查询

**简单使用**

1.在要使用Log4j的类中，到入包import org.apache.log4j.Logger;

2.日志对象，加载参数为当前类的class

~~~java
 static  Logger logger = Logger.getLogger(UserDaoTest.class);
~~~

3.日志级别

~~~java
logger.info("info:进入了testLog4j");
logger.debug("debug:进入了testLog4j");
logger.error("error:进入了testLog4j");
~~~

## 7.分页

**思考：为什么要分页？**

- 减少数据的处理量

### 7.1使用Limit分页

~~~sql
-- 语法：SELECT * from user limit startIndex,pageSize;
SELECT * from user limit 3; --[0,n]
~~~

**使用Mybatis实现分页，核心SQL**

1.接口

~~~java
    //分页查询Limit
    List<User> getUserByLimit(Map<String,Integer> map);
~~~

2.MapperXML

~~~xml
    <select id="getUserByLimit" parameterType="map" resultType="user">
        select * from mybatis.user limit #{startIndex},#{pageSize}
    </select>
~~~

3.测试

~~~java
    @Test
    public void getUserByLimit(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);

        HashMap<String, Integer> map = new HashMap<>();
        map.put("startIndex",0);
        map.put("pageSize",2);

        List<User> userList = mapper.getUserByLimit(map);
        for (User user : userList) {
            System.out.println(user);
        }

        sqlSession.close();
    }
~~~

### 7.2RowBounds分页

不在使用SQL实现分页，对象，但本质上还是Limit

1.接口

~~~java
//分页查询RowBounds
List<User> getUserByRowBounds();
~~~

2.MapperXML

~~~xml
    <select id="getUserByRowBounds" resultType="user">
        select * from mybatis.user
    </select>
~~~

3.测试

~~~java
    @Test
    public void getUserByRowBounds() {
        SqlSession sqlSession = MybatisUtils.getSqlSession();

        //RowBounds实现
        RowBounds rowBounds = new RowBounds(1, 2);

        //通过Java代码层面实现分页
        List<User> userList = sqlSession.selectList("com.simpleteen.dao.UserMapper.getUserByRowBounds",null,rowBounds);

        for (User user : userList) {
            System.out.println(user);
        }

        sqlSession.close();
    }
~~~

### 7.3分页插件

**Mybatis PageHelper**

了解即可，万一以后公司的架构师，说要使用，你需要知道它是什么东西！

## 8.使用注解开发

### 8.1面向接口编程

大家之前都学过面向对象编程，也学习过接口，但在真正的开发中，很多时候我们会选择面向接口编程

**根本原因：==解耦==，可扩展，提高复用，上层不用管具体的实现，大家都遵守共同的标准，是的开发变得很容易，规范性更好**

在一个面向对象的系统中，系统的各种功能是由许许多多的不同对象协作完成的。在这种情况下，各个对象内部是如何实现自己的，对系统设计人员来讲就不那么重要了

而各个对象之间的协作关系则称为系统设计的主要工作内容。面向接口编程就是按照这种思想来编程。

**关于接口的理解：**

- 接口从更深层次的理解，应是定义（规范、约束)与实现（名实分离的原则）的分离
- 接口的本身反映了系统设计热源对系统的抽象理解
- 接口应有两类
  - 第一类是对一个个体的抽象，它可对应位一个抽象体（abstract class）
  - 第二类是对一个个体某一方面的抽象，即形成一个抽限面（interface）

- 一个体有可能由多个抽象面，抽i箱体与抽象面是由区别的

**三个面向区别：**

- 面向对象是指，我们考虑问题是，以对象为考虑单位，考虑它的属性即方法；
- 面向过程是指，我们考虑问题时，以一个具体的流程（事务过程）为单位，考虑它的实现
- 接口设计与非接口设计是针对复用技术而言，与面向对象（过程)不是一个问题，更多的体现就是对系统整体的架构

### 8.2使用注解开发

1.注解在接口上实现

~~~java
public interface UserMapper {
    @Select("select * from user")
    List<User> getUsers();
}
~~~

2.需要在核心配置文件中绑定接口

~~~xml
    <!--绑定接口-->
    <mappers>
        <mapper class="com.simpleteen.dao.UserMapper"/>
    </mappers>
~~~

3.测试

~~~java
    @Test
    public void getUsers(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        //底层主要应用反射
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        List<User> users = mapper.getUsers();
        for (User user : users) {
            System.out.println(user);
        }
        sqlSession.close();
    }
~~~

本质：反射机制实现

底层：动态代理

### 8.3Mybatis详细的执行流程

1. Resource获取加载全局配置文件
2. 实例化SqlSessionFactoryBuild构造器
3. 解析文件流XMLConfigBuilder
4. Configuration所有的配置信息
5. 实例化SqlSessionFactory
6. transaction事务管理
7. 创建executor执行器
8. 创建SqlSession
9. 实现CRUD
10. 查看是否执行成功
11. 成功关闭，失败回6

### 8.4CRUD

我们可以在工具类创建的时候，实现自动提交事务

```java
//true自动提交事务
public static SqlSession getSqlSession(){
    return sqlSessionFactory.openSession(true);
}
```

1.接口

~~~java
public interface UserMapper {
    @Select("select * from user")
    List<User> getUsers();

    //方法存在多个参数时，所有的参数前面必须加上@Param注解
    @Select("select * from user where id = #{id}")
    User getUserByID(@Param("id") int id);

    @Insert("insert into user(id,name,pwd) values (#{id},#{name},#{pwd})")
    int addUser(User user);

    @Update("update user set name=#{name},pwd=#{pwd} where id=#{id}")
    int updateUser(User user);

    @Delete("delete from user where id = #{uid}")
    int deleteUser(@Param("uid") int id);
}
~~~

2.测试

~~~java
    @Test
    public void getUsers(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        //底层主要应用反射
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        List<User> users = mapper.getUsers();
        for (User user : users) {
            System.out.println(user);
        }
        sqlSession.close();
    }

    @Test
    public void getUserByID(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        //底层主要应用反射
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        User user = mapper.getUserByID(1);
        System.out.println(user);
        sqlSession.close();
    }

    @Test
    public void addUser(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        //底层主要应用反射
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        int rs = mapper.addUser(new User(5, "szs", "123456"));
        if (rs>0){
            System.out.println("插入成功");
        }
        sqlSession.close();
    }

    @Test
    public void updateUser(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        //底层主要应用反射
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        int rs = mapper.updateUser(new User(5, "sjy", "123456"));
        if (rs>0){
            System.out.println("修改成功");
        }
        sqlSession.close();
    }

    @Test
    public void deleteUser(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        //底层主要应用反射
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        int rs = mapper.deleteUser(5);
        if (rs>0){
            System.out.println("删除成功");
        }
        sqlSession.close();
    }
~~~

**关于@Param()注解**

- 基本类型的参数或者String类型，需要加上
- 引用类型不需要加
- 如果只有一个基本类型的话，可以忽略，但是建议大家都加上
- 我们在SQL中引用的就是我们这里的@Param()中设定的属性名

**#{}和${}的区别**

- 就像编译和预编译
- #{}预编译，安全
- ${}编译

### 9.Lombok

~~~txt
Project Lombok is a java library that automatically plugs into your editor and build tools, spicing up your java.
Never write another getter or equals method again, with one annotation your class has a fully featured builder, Automate your logging variables, and much more.
~~~

- java library
- plugs
- build tools
- with one annotation your class

使用步骤：

1. 在IDEA中安装Lombok插件

2. 在项目中导入lombok的jar包

   ~~~xml
           <!--lombok-->
           <dependency>
               <groupId>org.projectlombok</groupId>
               <artifactId>lombok</artifactId>
               <version>1.18.18</version>
           </dependency>
   ~~~

3. 在实体类上增加注解

   ~~~java
   @Data
   @AllArgsConstructor
   @NoArgsConstructor
   //实体类
   public class User {
       private int id;
       private String name;
       private String pwd;
   }
   ~~~

注解：

~~~java
@Getter and @Setter
@FieldNameConstants
@ToString
@EqualsAndHashCode
@AllArgsConstructor, @RequiredArgsConstructor and @NoArgsConstructor
@Log, @Log4j, @Log4j2, @Slf4j, @XSlf4j, @CommonsLog, @JBossLog, @Flogger, @CustomLog
@Data
@Builder
@SuperBuilder
@Singular
@Delegate
@Value
@Accessors
@Wither
@With
@SneakyThrows
@val
@var
~~~

说明：

- @Data：无参构造、get、set、toString、hashcode、equals

- @AllArgsConstructor：有参构造

- @NoArgsConstructor:无参构造

## 10.多对一处理

学生和老师之间的关系

- 多个学生，对应一个老师
- 对于学生而言，**关联**，多个学生关联一个老师【多对一】
- 对于老师而言，**集合**，一个老师有很多学生【一对多】

复杂查询环境搭建SQL

~~~sql
CREATE TABLE `teacher` (
  `id` INT(10) NOT NULL,
  `name` VARCHAR(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8

INSERT INTO teacher(`id`, `name`) VALUES (1, '沈老师'); 

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
~~~

### 10.1测试环境搭建

1. 导入lombok
2. 新建实体类Teacher、Student
3. 建立Mapper接口
4. 建立Mapper.xml文件
5. 在核心配置文件中绑定我们的Mapper接口或者文件
6. 测试查询

### 10.2按照查询嵌套处理

~~~xml
 <!--
    思路：
    1.查询所有的学生信息
    2.根据查询出来的写生的tid，寻找对应的老师 子查询
    -->
    <select id="getStudent" resultMap="StudentTeacher">
        select * from student
    </select>
    <resultMap id="StudentTeacher" type="student">
        <result property="id" column="id"/>
        <result property="name" column="name"/>
        <!--复杂的属性，我们现需要单独处理
        对象：association
        集合：collection
        -->
        <association property="teacher" column="tid" javaType="Teacher" select="getTeacher"/>
    </resultMap>

    <select id="getTeacher" resultType="Teacher">
        select * from teacher where id = #{id}
    </select>
~~~

### 10.3按照结果嵌套处理

~~~xml
    <!--按照结果嵌套处理-->
    <select id="getStudent2" resultMap="StudentTeacher2">
        select s.id sid,s.name sname,t.name tname
        from student s,teacher t
        where s.tid=t.id
    </select>
    <resultMap id="StudentTeacher2" type="student">
        <result property="id" column="sid"/>
        <result property="name" column="sname"/>
        <association property="teacher" javaType="teacher">
            <result property="name" column="tname"/>
        </association>
    </resultMap>
~~~

回顾mysql多对一查询方式：

- 子查询
- 联表查询

## 11.一对多处理

比如：一个老师拥有多个学生

对于老师而言，就是一对多的关系

环境搭建，和刚才一样

实体类

~~~java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    private int id;
    private String name;
    private int tid;
}
~~~

~~~java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Teacher {
    private int id;
    private String name;
    //一个老师拥有多个学生
    private List<Student> students;
}
~~~

### 11.1按照结果嵌套处理

~~~xml
  <!--按结果嵌套查询-->
    <select id="getTeacher" resultMap="TeacherStudent">
        select s.id sid,s.name sname,t.name tname,t.id tid
        from student s,teacher t
        where s.tid = t.id and t.id = #{id}
    </select>
    <resultMap id="TeacherStudent" type="Teacher">
        <result property="id" column="tid"/>
        <result property="name" column="tname"/>
        <!--集合；collection
        javaType:指定属性的类型
        集合中的泛型信息，使用ofType获取
        -->
        <collection property="students" ofType="student">
            <result property="id" column="sid"/>
            <result property="name" column="sname"/>
            <result property="tid" column="tid"/>
        </collection>
    </resultMap>
~~~

### 11.2按照查询嵌套处理

~~~xml
    <select id="getTeacher2" resultMap="TeacherStudent2">
        select * from teacher where id= #{id}
    </select>
    <resultMap id="TeacherStudent2" type="Teacher">
        <result property="id" column="id"/>
        <result property="name" column="name"/>
        <collection property="students" javaType="ArrayList" ofType="student" column="id" select="getStudentByTeacherId"/>
    </resultMap>
    <select id="getStudentByTeacherId" resultType="student">
        select * from student where tid = #{id}
    </select>
~~~

### 11.3小结

1. 关联：association【多对一】
2. 集合：collection【一对多】
3. javaType & ofType
   1. JavaType 用来指定实体类中属性的类型
   2. ofType 用来指定映射到List或者集合中的pojo类型，泛型中的约束类型

**注意点：**

- 保证SQL的可读性，尽量保证通俗易懂
- 注意一对多和多对一中，属性名和字段的问题
- 如果问题不好排查错误，可以使用日志，建议使用Log4j

**面试高频：**

- Mysql引擎
- InnoDB底层原理
- 索引
- 索引优化

## 12.动态SQL

什么是动态SQL?

**动态SQL就是指根据不同的条件生成不同的SQL语句**

~~~txt
如果你之前用过 JSTL 或任何基于类 XML 语言的文本处理器，你对动态 SQL 元素可能会感觉似曾相识。在 MyBatis 之前的版本中，需要花时间了解大量的元素。借助功能强大的基于 OGNL 的表达式，MyBatis 3 替换了之前的大部分元素，大大精简了元素种类，现在要学习的元素种类比原来的一半还要少。

if
choose (when, otherwise)
trim (where, se
~~~

### 12.1搭建环境

~~~sql
CREATE TABLE `blog`(
`id` VARCHAR(50) NOT NULL COMMENT '博客id',
`title` VARCHAR(100) NOT NULL COMMENT '博客标题',
`author` VARCHAR(30) NOT NULL COMMENT '博客作者',
`create_time` DATETIME NOT NULL COMMENT '创建时间',
`views` INT(30) NOT NULL COMMENT '浏览量'
)ENGINE=INNODB DEFAULT CHARSET=utf8
~~~

**创建一个基础工程：**

1. 导包

2. 编写配置文件

3. 编写实体类

   ~~~java
   @Data
   @AllArgsConstructor
   @NoArgsConstructor
   public class Blog {
       private String id;
       private String title;
       private String author;
       private Date createTime;
       private int views;
   }
   ~~~

4. 编写实体类对应Mapper接口和Mapper.xml文件

### 12.2IF

~~~xml
    <select id="queryBlogIF" parameterType="map" resultType="blog">
        select * from blog where 1=1
        <if test="title != null">
            and title = #{title}
        </if>
        <if test="author != null">
            and author = #{author}
        </if>
    </select>
~~~

### 12.3常用标签

**choose、when、otherwise**

~~~xml
    <select id="queryBlogChoose" parameterType="map" resultType="blog">
        select * from blog
        <where>
            <choose>
                <when test="title != null">
                    title = #{title}
                </when>
                <otherwise>
                    and views = #{views}
                </otherwise>
            </choose>
        </where>
    </select>
~~~

**trim、where、set**

~~~xml
    <select id="queryBlogIF" parameterType="map" resultType="blog">
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
~~~

~~~xml
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
        where id = #{id}
    </update>
~~~

~~~xml
<trim prefix="WHERE" prefixOverrides="AND |OR ">
  ...
</trim>
<trim prefix="SET" suffixOverrides=",">
  ...
</trim>
~~~

==所谓的动态SQL，本质还是SQL语句，只是我们可以在SQL层面，去执行一个逻辑代码==

### 12.4SQL片段

有的时候，我们可能会将一些功能的部分抽取出来，方便复用

1. 使用SQL标签抽取公共的部分

   ~~~xml
   <sql id="if-title-author">
           <if test="title != null">
               title = #{title}
           </if>
           <if test="author != null">
               and author = #{author}
           </if>
       </sql>
   ~~~

2. 在寻妖使用的地方使用include标签引用即可

   ~~~xml
   <select id="queryBlogIF" parameterType="map" resultType="blog">
           select * from blog
           <where>
               <include refid="if-title-author"></include>
           </where>
       </select>
   ~~~

注意事项：

- 最好基于单表来定义SQL片段！
- 最好不要存在where标签

### 12.5ForEach

动态 SQL 的另一个常见使用场景是对集合进行遍历（尤其是在构建 IN 条件语句的时候）。

~~~xml
<select id="selectPostIn" resultType="domain.blog.Post">
  SELECT *
  FROM POST P
  WHERE ID in
  <foreach item="item" index="index" collection="list"
      open="(" separator="," close=")">
        #{item}
  </foreach>
</select>
~~~

*foreach* 元素的功能非常强大，它允许你指定一个集合，声明可以在元素体内使用的集合项（item）和索引（index）变量。它也允许你指定开头与结尾的字符串以及集合项迭代之间的分隔符。这个元素也不会错误地添加多余的分隔符，看它多智能！

## 13.缓存

### 13.1简介

1. 什么是缓存[Cache]？
   - 存在内存中的临时数据
   - 将用户经常查询的数据放在缓存(内存)中，用户去查询数据就不用从磁盘上(关系型数据库文件)查询，从缓存中查询，从而提高传效率，解决了搞并发系统的性能问题
2. 为什么使用缓存？
   - 减少和数据库的交互次数，减少系统开销，提高系统效率
3. 什么样的数据能使用缓存？
   - 经常查询并且不经常改变的数据

### 13.2Mybatis缓存

- MyBatis 内置了一个强大的事务性查询缓存机制，它可以非常方便地配置和定制。缓存可以极大的提升查询效率
- MyBatis系统中默认定义了两级缓存：**一级缓存和二级缓存**
  - 默认情况下，只有一级缓存开启。（SqlSession级别的缓存，也称为本地缓存）
  - 二级缓存需要手动开启和配置，它是基于namespace级别的缓存
  - 为了提高扩展性,MyBatis定义了缓存接口Cache。我们可以通过实现Cache接口来定义二级缓存

### 13.3一级缓存

- 一级缓存也叫本地缓存：SqlSession
  - 与数据库同一次会话期间查询到的数据会放在本地缓存中
  - 以后如果需要获取相同的数据，直接从缓存中拿，没必要再去查询数据库

**测试步骤：**

1. 开启日志
2. 测试在一个Session中查询两次记录
3. 查看日志输出

**缓存是失效情况：**

1. 查询寻不同的东西
2. 增删改操作，可能会改变原来的数据，所以必定会刷新缓存
3. 查询不同的Mapper.xml
4. 手动清理缓存

小结：一级缓存默认时开启的。只在一次SqlSession中有效，也就是拿到连接到关闭连接这个区间段！

一级缓存就是一个Map

### 13.4二级缓存

- 二级缓存也叫全局缓，一级缓存作用域太低了，所以诞生了二级缓存

- 基于namespace级别的缓存，一个命名空间，对应一个二级缓存
- 工作机制
  - 一个会话查询一条数据，这个数据就会被放在当前会话的一级缓存中
  - 如果会话关闭了，这个会话对应的一级缓存就没了；但是我们想要的时，会话关闭流，一级缓存中的数据被保存到二级缓存中
  - 新的会话查询信息，就可以从二级缓存中获取内容
  - 不同的mapper查询出来的数据会放在自己对应的缓存（map）中

步骤：

1. 开启全局缓存

   ~~~xml
           <!--显示的开启全局缓存-->
           <setting name="cacheEnabled" value="true"/>
   ~~~

2. 在要使用二级缓存的Mapper中开启

   ~~~xml
    <!--在当前Mapper.xml中使用二级缓存-->
       <!--在当前Mapper.xml中使用二级缓存-->
   <cache
     eviction="FIFO"
     flushInterval="60000"
     size="512"
     readOnly="true"/>
   ~~~

   也可以自定义参数

3. 测试

   问题：我们需要将尸体六日序列化！否则就会报错

**小结：**

- 只要开启两二级缓存，在同一个feMapper下就有效
- 所有的数据都会先放在一级缓存中
- 只有当会话提交，或者关闭的时候，才会提交到二级缓存中

### 13.5缓存原理

缓存顺序：

1. 第一次查询先看二级缓存中有没有
2. 再看一级缓存中有没有
3. 然后才是数据库

### 13.6自定义缓存Ehcache

Ehcache是一种广泛使用的开源Java缓存，主要面向通用缓存

要在程序中使用ehcache,先要导包

~~~xml
 <!--ehcache-->
<dependency>
   <groupId>org.mybatis</groupId>
   <artifactId>mybatis-ehcache</artifactId>
   <version>1.0.0</version>
</dependency>
~~~

然后在要使用二级缓存的Mapper中开启

~~~xml
    <cache type="org.mybatis.caches.ehcache.EhcacheCache"/>
~~~

ehcache.xml

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="http://ehcache.org/ehcache.xsd"
         updateCheck="false">

    <diskStore path="./tmpdir/Tmp_EhCache"/>

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
~~~
