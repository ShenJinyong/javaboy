# Spring

官网 : http://spring.io/

官方下载地址 : https://repo.spring.io/libs-release-local/org/springframework/spring/

GitHub : https://github.com/spring-projects

## 概述

Spring理念 : 使现有技术更加实用 . 本身就是一个大杂烩 , 整合现有的框架技术！

优点：

1. Spring是一个开源免费的框架 , 容器  .
2. Spring是一个轻量级的框架 , 非侵入式的 .
3. 控制反转 IoC  , 面向切面 Aop
4. 对事物的支持 , 对框架的支持

一句话概括：

**Spring是一个轻量级的控制反转(IoC)和面向切面(AOP)的容器（框架）。**

Spring 框架是一个分层架构，由 7 个定义良好的模块组成。Spring 模块构建在核心容器之上，核心容器定义了创建、配置和管理 bean 的方式 。组成 Spring 框架的每个模块（或组件）都可以单独存在，或者与其他一个或多个模块联合实现。每个模块的功能如下：

- **核心容器**：核心容器提供 Spring 框架的基本功能。核心容器的主要组件是 BeanFactory，它是工厂模式的实现。BeanFactory 使用*控制反转*（IOC） 模式将应用程序的配置和依赖性规范与实际的应用程序代码分开。
- **Spring 上下文**：Spring 上下文是一个配置文件，向 Spring 框架提供上下文信息。Spring 上下文包括企业服务，例如 JNDI、EJB、电子邮件、国际化、校验和调度功能。
- **Spring AOP**：通过配置管理特性，Spring AOP 模块直接将面向切面的编程功能 , 集成到了 Spring 框架中。所以，可以很容易地使 Spring 框架管理任何支持 AOP的对象。Spring AOP 模块为基于 Spring 的应用程序中的对象提供了事务管理服务。通过使用 Spring AOP，不用依赖组件，就可以将声明性事务管理集成到应用程序中。
- **Spring DAO**：JDBC DAO 抽象层提供了有意义的异常层次结构，可用该结构来管理异常处理和不同数据库供应商抛出的错误消息。异常层次结构简化了错误处理，并且极大地降低了需要编写的异常代码数量（例如打开和关闭连接）。Spring DAO 的面向 JDBC 的异常遵从通用的 DAO 异常层次结构。
- **Spring ORM**：Spring 框架插入了若干个 ORM 框架，从而提供了 ORM 的对象关系工具，其中包括 JDO、Hibernate 和 iBatis SQL Map。所有这些都遵从 Spring 的通用事务和 DAO 异常层次结构。
- **Spring Web 模块**：Web 上下文模块建立在应用程序上下文模块之上，为基于 Web 的应用程序提供了上下文。所以，Spring 框架支持与 Jakarta Struts 的集成。Web 模块还简化了处理多部分请求以及将请求参数绑定到域对象的工作。
- **Spring MVC 框架**：MVC 框架是一个全功能的构建 Web 应用程序的 MVC 实现。通过策略接口，MVC 框架变成为高度可配置的，MVC 容纳了大量视图技术，其中包括 JSP、Velocity、Tiles、iText 和 POI。

**Spring Boot与Spring Cloud**

- Spring Boot 是 Spring 的一套快速配置脚手架，可以基于Spring Boot 快速开发单个微服务;
- Spring Cloud是基于Spring Boot实现的；
- Spring Boot专注于快速、方便集成的单个微服务个体，Spring Cloud关注全局的服务治理框架；
- Spring Boot使用了约束优于配置的理念，很多集成方案已经帮你选择好了，能不配置就不配置 , Spring Cloud很大的一部分是基于Spring Boot来实现，Spring Boot可以离开Spring Cloud独立使用开发项目，但是Spring Cloud离不开Spring Boot，属于依赖的关系。

## IOC基础

**控制反转IoC(Inversion of Control)，是一种设计思想，DI(依赖注入)是实现IoC的一种方法**，也有人认为DI只是IoC的另一种说法。在没有IoC的程序中 , 我们使用面向对象编程 , 对象的创建与对象间的依赖关系完全硬编码在程序中，对象的创建由程序自己控制，控制反转后将对象的创建转移给第三方，个人认为所谓控制反转就是：获得依赖对象的方式反转了。

**IoC是Spring框架的核心内容**，使用多种方式完美的实现了IoC，可以使用XML配置，也可以使用注解，新版本的Spring也可以零配置实现IoC。

Spring容器在初始化时先读取配置文件`applicationContext.xml`，根据配置文件或元数据创建与组织对象`Bean`存入容器中，程序使用时再从Ioc容器中取出需要的对象`Bean`。

采用XML方式配置Bean的时候，Bean的定义信息是和实现分离的，而采用注解的方式可以把两者合为一体，Bean的定义信息直接以注解的形式定义在实现类中，从而达到了零配置的目的。

**控制反转是一种通过描述（XML或注解）并通过第三方去生产或获取特定对象的方式。在Spring中实现控制反转的是IoC容器，其实现方法是依赖注入（Dependency Injection,DI）。**

## 快速开始

> 添加依赖

```xml
<dependency>   
     <groupId>org.springframework</groupId>   
     <artifactId>spring-webmvc</artifactId>   
     <version>5.1.10.RELEASE</version>
</dependency>
<dependency>
    <groupId>commons-logging</groupId>
    <artifactId>commons-logging</artifactId>
    <version>1.2</version>
</dependency>
```

> 编写实体类

```java
public class Hello {
    
   private String name;

   public String getName() {
       return name;
  }
   public void setName(String name) {
       this.name = name;
  }

   public void show(){
       System.out.println("Hello,"+ name );
  }
    
}
```

> 编写Spring文件`beans.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

   <!--bean就是java对象 , 由Spring创建和管理-->
   <bean id="hello" class="com.kuang.pojo.Hello">
       <property name="name" value="Spring"/>
   </bean>

</beans>
```

> 测试

```java
@Test
public void test(){
   // 解析beans.xml文件 , 生成管理相应的Bean对象
   ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
   // getBean : 参数即为spring配置文件中bean的id .
   Hello hello = (Hello) context.getBean("hello");
   hello.show();
}
```

> IOC/DI

IOC控制反转（针对容器）: 对象由Spring 来创建 , 管理 , 装配 ! 

DI依赖注入（针对对象） : 对于就是利用set方法来进行注入的。

控制 :  传统应用程序的对象是由程序本身控制创建的 ； Spring应用程序的对象是由Spring来创建的

反转 : 程序本身不创建对象 , 而变成被动的接收对象

## 创建对象方式

### 无参构造方法

> 编写实体类

```java
public class User {

   private String name;

   public User() {
       System.out.println("user无参构造方法");
  }

   public void setName(String name) {
       this.name = name;
  }

   public void show(){
       System.out.println("name="+ name );
  }

}
```

> 编写Spring文件`beans.xml`

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

   <bean id="user" class="com.javaboy.entity.User">
       <property name="name" value="javaboy"/>
   </bean>

</beans>
```

> 测试

```java
@Test
public void test(){
   ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
   //在执行getBean的时候, user已经创建好了 , 通过无参构造
   User user = (User) context.getBean("user");
   //调用对象的方法 .
   user.show();
}
```

### 有参构造方法

> 编写实体类

```java
public class User {

   private String name;

   public UserT(String name) {
       this.name = name;
  }

   public void setName(String name) {
       this.name = name;
  }

   public void show(){
       System.out.println("name="+ name );
  }

}
```

> 编写Spring文件`beans.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 第一种根据index参数下标设置 -->
    <bean id="user" class="com.javaboy.entity.User">
       <!-- index指构造方法 , 下标从0开始 -->
       <constructor-arg index="0" value="javaboy1"/>
    </bean>
    <!-- 第二种根据参数名字设置 -->
    <bean id="user" class="com.javaboy.entity.User">
       <!-- name指参数名 -->
       <constructor-arg name="name" value="javaboy2"/>
    </bean>
    <!-- 第三种根据参数类型设置 -->
    <bean id="user" class="com.javaboy.entity.User">
       <constructor-arg type="java.lang.String" value="javaboy3"/>
    </bean>

</beans>
```

> 测试

```java
@Test
public void testT(){
   ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
   User user = (User) context.getBean("user");
   user.show();
}
```

## 配置

> 别名

alias 设置别名 , 为bean设置别名 , 可以设置多个别名，在获取Bean的时候可以使用别名获取

```xml
<alias name="user" alias="userNew"/>
```

> Bean的配置

bean就是java对象,由Spring创建和管理。

```xml
<bean id="hello" name="hello2 h2,h3;h4" class="com.kuang.pojo.Hello">
   <property name="name" value="Spring"/>
</bean>
```

参数说明：

- id 是bean的标识符,要唯一,如果没有配置id,name就是默认标识符
- 如果配置id,又配置了name,那么name是别名
- name可以设置多个别名,可以用逗号,分号,空格隔开
- 如果不配置id和name,可以根据applicationContext.getBean(.class)获取对象;
- class是bean的全限定名=包名+类名

> import

团队的合作通过import来实现 。

```xml
<import resource="{path}/beans.xml"/>
```

## 依赖注入（DI）

### 注入方式

DI：Dependency Injection

依赖 : 指Bean对象的创建依赖于容器 ，Bean对象的依赖资源 。

注入 : 指Bean对象所依赖的资源 , 由容器来设置和装配 。

要求被注入的属性 , 必须有set方法 , set方法的方法名由set + 属性首字母大写 , 如果属性是boolean类型 , 没有set方法 , 是 is方法。

> 测试类

```java
public class Address {

    private String address;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}

public class Student {

    private String name;
    private Address address;
    private String[] books;
    private List<String> hobbys;
    private Map<String,String> card;
    private Set<String> games;
    private String wife;
    private Properties info;

    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setBooks(String[] books) {
        this.books = books;
    }

    public void setHobbys(List<String> hobbys) {
        this.hobbys = hobbys;
    }

    public void setCard(Map<String, String> card) {
        this.card = card;
    }

    public void setGames(Set<String> games) {
        this.games = games;
    }

    public void setWife(String wife) {
        this.wife = wife;
    }

    public void setInfo(Properties info) {
        this.info = info;
    }

    public void show(){
        System.out.println("name="+ name
                           + ",address="+ address.getAddress()
                           + ",books="
                          );
        for (String book:books){
            System.out.print("<<"+book+">>\t");
        }
        System.out.println("\n爱好:"+hobbys);

        System.out.println("card:"+card);

        System.out.println("games:"+games);

        System.out.println("wife:"+wife);

        System.out.println("info:"+info);

    }
}
```

> 编写spring配置文件`bean.xml`

**常量注入**

```xml
<bean id="student" class="com.javaboy.entity.Student">
    <property name="name" value="小明"/>
</bean>
```

**Bean注入**

```xml
<bean id="addr" class="com.javaboy.entity.Address">
    <property name="address" value="重庆"/>
</bean>

<bean id="student" class="com.kuang.pojo.Student">
    <property name="name" value="小明"/>
    <property name="address" ref="addr"/>
</bean>
```

**数组注入**

```xml
<bean id="student" class="com.javaboy.entity.Student">
    <property name="name" value="小明"/>
    <property name="address" ref="addr"/>
    <property name="books">
        <array>
            <value>西游记</value>
            <value>红楼梦</value>
            <value>水浒传</value>
        </array>
    </property>
</bean>
```

**List注入**

```xml
 <property name="hobbys">
     <list>
         <value>听歌</value>
         <value>看电影</value>
         <value>爬山</value>
     </list>
 </property>
```

**Map注入**

```xml
<property name="card">
    <map>
        <entry key="中国邮政" value="456456456465456"/>
        <entry key="建设" value="1456682255511"/>
    </map>
</property>
```

**set注入**

```xml
<property name="games">
    <set>
        <value>LOL</value>
        <value>BOB</value>
        <value>COC</value>
    </set>
</property>
```

**Null注入**

```xml
<property name="wife"><null/></property>
```

**Properties注入**

```xml
<property name="info">
    <props>
        <prop key="学号">20190604</prop>
        <prop key="性别">男</prop>
        <prop key="姓名">小明</prop>
    </props>
</property>
```

> 测试

```java
@Test
public void test01(){
    
    ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

    Student student = (Student) context.getBean("student");

    System.out.println(student.getName());

}
```

> p命名和c命名注入

1、P命名空间注入 : 需要在头文件中加入约束文件`xmlns:p="http://www.springframework.org/schema/p"`

```xml
<!--P(属性: properties)命名空间 , 属性依然要设置set方法-->
<bean id="user" class="com.javaboy.entity.User" p:name="javaboy" p:age="18"/>
```

2、c 命名空间注入 : 需要在头文件中加入约束文件`xmlns:c="http://www.springframework.org/schema/c"`

```xml
<!--C(构造: Constructor)命名空间 , 属性依然要设置set方法，c 就是所谓的构造器注入！-->
<bean id="user" class="com.javaboy.entity.User" c:name="javaboy" c:age="18"/>
```

### Bean的作用域

在Spring中，那些组成应用程序的主体及由Spring IoC容器所管理的对象，被称之为bean。

简单地讲，bean就是由IoC容器初始化、装配及管理的对象 。

#### Singleton

当一个bean的作用域为Singleton，那么Spring IoC容器中只会存在一个共享的bean实例，并且所有对bean的请求，只要id与该bean定义相匹配，则只会返回bean的同一实例。Singleton是单例类型，就是在创建容器时就同时自动创建了一个bean的对象，不管你是否使用，它都存在了，每次获取到的对象都是同一个对象。注意，Singleton作用域是Spring中的缺省作用域。要在XML中将bean定义成singleton，可以这样配置：

```xml
 <bean id="ServiceImpl" class="cn.csdn.service.ServiceImpl" scope="singleton">
```

> 测试

```java
 @Test
 public void test03(){
     ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
     User user1 = (User) context.getBean("user");
     User user2 = (User) context.getBean("user");
     System.out.println(user1==user2);
 }
```

#### Prototype

当一个bean的作用域为Prototype，表示一个bean定义对应多个对象实例。Prototype作用域的bean会导致在每次对该bean请求（将其注入到另一个bean中，或者以程序的方式调用容器的`getBean()`方法）时都会创建一个新的bean实例。Prototype是原型类型，它在我们创建容器的时候并没有实例化，而是当我们获取bean的时候才会去创建一个对象，而且我们每次获取到的对象都不是同一个对象。根据经验，对有状态的bean应该使用prototype作用域，而对无状态的bean则应该使用singleton作用域。在XML中将bean定义成prototype，可以这样配置：

```xml
<!--第一种-->
<bean id="account" class="com.foo.DefaultAccount" scope="prototype"/>  
<!--第二种-->
<bean id="account" class="com.foo.DefaultAccount" singleton="false"/>
```

#### Request

当一个bean的作用域为Request，表示在一次HTTP请求中，一个bean定义对应一个实例；即每个HTTP请求都会有各自的bean实例，它们依据某个bean定义创建而成。该作用域仅在基于web的Spring ApplicationContext情形下有效。考虑下面bean定义：

```xml
 <bean id="loginAction" class=cn.csdn.LoginAction" scope="request"/>
```

针对每次HTTP请求，Spring容器会根据loginAction bean的定义创建一个全新的LoginAction bean实例，且该loginAction bean实例仅在当前HTTP request内有效，因此可以根据需要放心的更改所建实例的内部状态，而其他请求中根据loginAction bean定义创建的实例，将不会看到这些特定于某个请求的状态变化。当处理请求结束，request作用域的bean实例将被销毁。

#### Session

当一个bean的作用域为Session，表示在一个HTTP Session中，一个bean定义对应一个实例。该作用域仅在基于web的Spring ApplicationContext情形下有效。考虑下面bean定义：

```xml
 <bean id="userPreferences" class="com.foo.UserPreferences" scope="session"/>
```

针对某个HTTP Session，Spring容器会根据userPreferences bean定义创建一个全新的userPreferences bean实例，且该userPreferences bean仅在当前HTTP Session内有效。与request作用域一样，可以根据需要放心的更改所创建实例的内部状态，而别的HTTP Session中根据userPreferences创建的实例，将不会看到这些特定于某个HTTP Session的状态变化。当HTTP Session最终被废弃的时候，在该HTTP Session作用域内的bean也会被废弃掉。

## 自动装配

> 说明

- 自动装配是使用spring满足bean依赖的一种方法
- spring会在应用上下文中为某个bean寻找其依赖的bean。

> 装配机制

1. 在xml中显式配置；
2. 在java中显式配置；
3. 隐式的bean发现机制和自动装配。

> 自动装配

Spring的自动装配需要从两个角度来实现，或者说是两个操作：

1. 组件扫描(component scanning)：spring会自动发现应用上下文中所创建的bean；
2. 自动装配(autowiring)：spring自动满足bean之间的依赖，也就是我们说的IoC/DI；

组件扫描和自动装配组合发挥巨大威力，使得显示的配置降低到最少。

> 新建实体类

```java
public class Cat {
   public void shout() {
       System.out.println("miao~");
  }
}
public class Dog {
   public void shout() {
       System.out.println("wang~");
  }
}

public class User {
   private Cat cat;
   private Dog dog;
   private String str;
}
```

> 编写Spring配置文件`bean.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

   <bean id="dog" class="com.javaboy.entity.Dog"/>
   <bean id="cat" class="com.javaboy.entity.Cat"/>

   <bean id="user" class="com.javaboy.entity.User">
       <property name="cat" ref="cat"/>
       <property name="dog" ref="dog"/>
       <property name="str" value="javaboy"/>
   </bean>
</beans>
```

> 测试

```java
public class MyTest {
   @Test
   public void testMethodAutowire() {
       ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
       User user = (User) context.getBean("user");
       user.getCat().shout();
       user.getDog().shout();
  }
}
```

### byName

**按名称自动装配：autowire byName**

由于在手动配置xml过程中，常常发生字母缺漏和大小写等错误，而无法对其进行检查，使得开发效率降低。采用自动装配将避免这些错误，并且使配置简单化。

> 测试

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

   <bean id="dog" class="com.javaboy.entity.Dog"/>
   <bean id="cat" class="com.javaboy.entity.Cat"/>

   <bean id="user" class="com.javaboy.entity.User" autowire="byName">
       <property name="cat" ref="cat"/>
       <property name="dog" ref="dog"/>
       <property name="str" value="javaboy"/>
   </bean>
</beans>
```

当一个bean节点带有 autowire byName的属性时:

1. 将查找其类中所有的set方法名，例如setCat，获得将set去掉并且首字母小写的字符串，即cat。
2. 去spring容器中寻找是否有此字符串名称id的对象。
3. 如果有，就取出注入；如果没有，就报空指针异常。

### byType

**按类型自动装配：autowire byType**

使用autowire byType首先需要保证：同一类型的对象，在spring容器中唯一。如果不唯一，会报不唯一的异常`NoUniqueBeanDefinitionException`。

> 测试

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="dog" class="com.javaboy.entity.Dog"/>
    <bean id="cat1" class="com.javaboy.entity.Cat"/>
    <bean id="cat2" class="com.javaboy.entity.Cat"/>

    <bean id="user" class="com.javaboy.entity.User" autowire="byType">
       <property name="str" value="javaboy"/>
       <property name="cat" ref="cat1"/>
       <property name="dog" ref="dog"/>
    </bean>
</beans>
```

### 使用注解

在spring配置文件中引入context文件头

```xml
xmlns:context="http://www.springframework.org/schema/context"

http://www.springframework.org/schema/context
http://www.springframework.org/schema/context/spring-context.xsd
```

开启属性注解支持！

```xml
<context:annotation-config/>
```

> 注解

**@Autowired**

是按类型自动转配的，不支持id匹配。需要导入 spring-aop的包！

@Autowired(required=false)  

说明：false，对象可以为null；true，对象必须存对象，不能为null。

**@Qualifier**

@Autowired是根据类型自动装配的，加上@Qualifier则可以根据byName的方式自动装配，@Qualifier不能单独使用。

**@Resource**

@Resource如有指定的name属性，先按该属性进行byName方式查找装配；其次再进行默认的byName方式进行装配；如果以上都不成功，则按byType的方式自动装配。最后都不成功，则报异常。

## 注解开发

在spring4之后，想要使用注解形式，必须得要引入aop的包。

在配置文件当中，还得要引入一个context约束。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:context="http://www.springframework.org/schema/context"
      xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd">

</beans>
```

**Bean的实现**

> 配置扫描哪些包下的注解

```xml
<!--指定注解扫描包-->
<context:component-scan base-package="com.javaboy.entity"/>
```

> 在指定包下编写类，增加注解

```java
@Component("user")
// 相当于配置文件中 <bean id="user" class="当前注解的类"/>
public class User {
   public String name = "秦疆";
}
```

> 测试

```java
@Test
public void test(){
   ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
   User user = (User) applicationContext.getBean("user");
   System.out.println(user.name);
}
```

> 属性注入

可以不用提供set方法，直接在直接名上添加@value("值")

```java
@Component("user")
// 相当于配置文件中 <bean id="user" class="当前注解的类"/>
public class User {
   @Value("秦疆")
   // 相当于配置文件中 <property name="name" value="javaboy"/>
   public String name;
}
```

如果提供了set方法，在set方法上添加@value("值")

```java
@Component("user")
public class User {

   public String name;

   @Value("javaboy")
   public void setName(String name) {
       this.name = name;
  }
}
```

> 衍生注解

**@Component三个衍生注解**

为了更好的进行分层，Spring可以使用其它三个注解，功能一样，目前使用哪一个功能都一样。

- @Controller：web层
- @Service：service层
- @Repository：dao层

> 作用域

**@scope**

- singleton：默认的，Spring会采用单例模式创建这个对象。关闭工厂 ，所有的对象都会销毁。
- prototype：原型模式。关闭工厂 ，所有的对象不会销毁。内部的垃圾回收机制会回收。

```java
@Controller("user")
@Scope("prototype")
public class User {
   @Value("javaboy")
   public String name;
}
```

> 基于Java类进行配置

1、编写一个实体类，Dog

```java
@Component  //将这个类标注为Spring的一个组件，放到容器中！
public class Dog {
   public String name = "dog";
}
```

2、新建一个config配置包，编写一个MyConfig配置类

```java
@Configuration  //代表这是一个配置类
public class MyConfig {

   @Bean //通过方法注册一个bean，这里的返回值就Bean的类型，方法名就是bean的id！
   public Dog dog(){
       return new Dog();
  }

}
```

3、测试

```java
@Test
public void test2(){
    
   ApplicationContext applicationContext = new AnnotationConfigApplicationContext(MyConfig.class);
   Dog dog = (Dog) applicationContext.getBean("dog");
   System.out.println(dog.name);
    
}
```

## 代理模式

### 静态代理

**静态代理角色分析**

- 抽象角色 : 一般使用接口或者抽象类来实现。
- 真实角色 : 被代理的角色。
- 代理角色 : 代理真实角色 ; 代理真实角色后 , 一般会做一些附属的操作 。
- 客户  :  使用代理角色来进行一些操作 。

> 新建实体类

```java
//抽象角色：租房
public interface Rent {
   public void rent();
}

//真实角色: 房东，房东要出租房子
public class Host implements Rent{
   public void rent() {
       System.out.println("房屋出租");
  }
}

//代理角色：中介
public class Proxy implements Rent {

   private Host host;
   public Proxy() { }
   public Proxy(Host host) {
       this.host = host;
  }

   //租房
   public void rent(){
       seeHouse();
       host.rent();
       fare();
  }
   //看房
   public void seeHouse(){
       System.out.println("带房客看房");
  }
   //收中介费
   public void fare(){
       System.out.println("收中介费");
  }
}

```

> 测试

```java
//客户类，一般客户都会去找代理！
public class Client {
   public static void main(String[] args) {
       //房东要租房
       Host host = new Host();
       //中介帮助房东
       Proxy proxy = new Proxy(host);

       //你去找中介！
       proxy.rent();
  }
}
```

**静态代理的好处:**

- 可以使得我们的真实角色更加纯粹 . 不再去关注一些公共的事情 
- 公共的业务由代理来完成 . 实现了业务的分工 
- 公共业务发生扩展时变得更加集中和方便 

**静态代理的缺点 :**

- 类多了 , 多了代理类 , 工作量变大了 . 开发效率降低 

### 动态代理

动态代理的角色和静态代理的一样。

动态代理的代理类是动态生成的 ，静态代理的代理类是我们提前写好的

动态代理分为两类 : 

- 基于接口动态代理 ===>JDK动态代理
- 基于类的动态代理 ===>cglib

> Javaassist 就是一个用来 处理 Java 字节码的类库。它可以在一个已经编译好的类中添加新的方法，或者是修改已有的方法，并且不需要对字节码方面有深入的了解。同时也可以去生成一个新的类对象，通过完全手动的方式。
>
> 参考文章：[javassist详解 - 掘金 (juejin.cn)](https://juejin.cn/post/7078681608206680094)

**JDK的动态代理 :*

> InvocationHandler：调用处理程序；

`Object invoke(Object proxy, 方法 method, Object[] args)；`
参数说明：

- proxy - 调用该方法的代理实例
- method -所述方法对应于调用代理实例上的接口方法的实例。方法对象的声明类将是该方法声明的接口，它可以是代理类继承该方法的代理接口的超级接口。
- args -包含的方法调用传递代理实例的参数值的对象的阵列，或null如果接口方法没有参数。原始类型的参数包含在适当的原始包装器类的实例中，例如java.lang.Integer或java.lang.Boolean 。

> Proxy：代理

```java
//生成代理类
public Object getProxy(){
   return Proxy.newProxyInstance(this.getClass().getClassLoader(),
                                 rent.getClass().getInterfaces(),this);
}
```

> 代码

```java
//抽象角色：租房
public interface Rent {
   public void rent();
}

//真实角色: 房东，房东要出租房子
public class Host implements Rent{
   public void rent() {
       System.out.println("房屋出租");
  }
}

public class ProxyInvocationHandler implements InvocationHandler {
   private Rent rent;

   public void setRent(Rent rent) {
       this.rent = rent;
  }

   //生成代理类，重点是第二个参数，获取要代理的抽象角色！之前都是一个角色，现在可以代理一类角色
   public Object getProxy(){
       return Proxy.newProxyInstance(this.getClass().getClassLoader(),
               rent.getClass().getInterfaces(),this);
  }

   // proxy : 代理类 method : 代理类的调用处理程序的方法对象.
   // 处理代理实例上的方法调用并返回结果
   @Override
   public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
       seeHouse();
       //核心：本质利用反射实现！
       Object result = method.invoke(rent, args);
       fare();
       return result;
  }

   //看房
   public void seeHouse(){
       System.out.println("带房客看房");
  }
   //收中介费
   public void fare(){
       System.out.println("收中介费");
  }

}
```

> 测试

```java
//租客
public class Client {

   public static void main(String[] args) {
       //真实角色
       Host host = new Host();
       //代理实例的调用处理程序
       ProxyInvocationHandler pih = new ProxyInvocationHandler();
       pih.setRent(host); //将真实角色放置进去！
       Rent proxy = (Rent)pih.getProxy(); //动态生成对应的代理类！
       proxy.rent();
  }

}
```

核心：**一个动态代理 , 一般代理某一类业务 , 一个动态代理可以代理多个类，代理的是接口！**

> ##### 动态代理的好处

静态代理有的它都有，静态代理没有的，它也有！

- 可以使得我们的真实角色更加纯粹 . 不再去关注一些公共的事情 
- 公共的业务由代理来完成 . 实现了业务的分工 
- 公共业务发生扩展时变得更加集中和方便 
- 一个动态代理 , 一般代理某一类业务
- 一个动态代理可以代理多个类，代理的是接口！

## AOP

### 概念

AOP（Aspect Oriented Programming）意为：面向切面编程，通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术。

AOP是OOP的延续，是软件开发中的一个热点，也是Spring框架中的一个重要内容，是函数式编程的一种衍生范型。

利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。

> Aop在Spring中的作用

提供声明式事务；允许用户自定义切面。

- 横切关注点：跨越应用程序多个模块的方法或功能。即是，与我们业务逻辑无关的，但是我们需要关注的部分，就是横切关注点。如日志 , 安全 , 缓存 , 事务等等 ....
- 切面（ASPECT）：横切关注点 被模块化 的特殊对象。即，它是一个类。
- 通知（Advice）：切面必须要完成的工作。即，它是类中的一个方法。
- 目标（Target）：被通知对象。
- 代理（Proxy）：向目标对象应用通知之后创建的对象。
- 切入点（PointCut）：切面通知 执行的 “地点”的定义。
- 连接点（JointPoint）：与切入点匹配的执行点。

SpringAOP中，通过Advice定义横切逻辑，Spring中支持5种类型的Advice:

| 通知类型     | 连接点               | 实现接口                |
| ------------ | -------------------- | ----------------------- |
| 前置通知     | 方法执行前           | MethodBeforeAdvice      |
| 后置通知     | 方法执行后           | AfterReturningAdvice    |
| 环绕通知     | 方法执行前后         | MethodInterceptor       |
| 异常抛出通知 | 方法抛出异常         | ThrowsAdvice            |
| 引介通知     | 类中增加新的方法属性 | IntroductionInterceptor |

即 Aop 在 不改变原有代码的情况下 , 去增加新的功能。

> 使用Spring实现Aop

添加依赖

```xml
<dependency>
   <groupId>org.aspectj</groupId>
   <artifactId>aspectjweaver</artifactId>
   <version>1.9.4</version>
</dependency>
```

### Spring API

> 编写我们的业务接口和实现类

```java
public interface UserService {

   public void add();

   public void delete();

   public void update();

   public void search();

}
public class UserServiceImpl implements UserService{

   @Override
   public void add() {
       System.out.println("增加用户");
  }

   @Override
   public void delete() {
       System.out.println("删除用户");
  }

   @Override
   public void update() {
       System.out.println("更新用户");
  }

   @Override
   public void search() {
       System.out.println("查询用户");
  }
}
```

> 编写增强类

**前置增强**

```java
public class Log implements MethodBeforeAdvice {

   @Override
   public void before(Method method, Object[] objects, Object o) throws Throwable {
       System.out.println( o.getClass().getName() + "的" + method.getName() + "方法被执行了");
  }
    
}
```

参数说明:

- method : 要执行的目标对象的方法
- objects : 被调用的方法的参数
- Object : 目标对象

**后置增强**

```java
public class AfterLog implements AfterReturningAdvice {

   @Override
   public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
       System.out.println("执行了" + target.getClass().getName() + "的" + method.getName()+"方法,返回值："+returnValue);
  }
    
}
```

参数说明：

- returnValue：返回值
- method：被调用的方法
- args：被调用的方法的对象的参数
- target：被调用的目标对象

> spring的文件中注册 , 并实现aop切入实现 , 注意导入约束

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:aop="http://www.springframework.org/schema/aop"
      xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/aop
       http://www.springframework.org/schema/aop/spring-aop.xsd">

   <!--注册bean-->
   <bean id="userService" class="com.javaboy.entity.UserServiceImpl"/>
   <bean id="log" class="com.javaboy.log.Log"/>
   <bean id="afterLog" class="com.javaboy.log.AfterLog"/>

   <!--aop的配置-->
   <aop:config>
       <!--切入点 expression:表达式匹配要执行的方法-->
       <aop:pointcut id="pointcut" expression="execution(* com.javaboy.service.UserServiceImpl.*(..))"/>
       <!--执行环绕; advice-ref执行方法 . pointcut-ref切入点-->
       <aop:advisor advice-ref="log" pointcut-ref="pointcut"/>
       <aop:advisor advice-ref="afterLog" pointcut-ref="pointcut"/>
   </aop:config>

</beans>
```

> 测试

```java
public class MyTest {
   @Test
   public void test(){
       ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
       UserService userService = (UserService) context.getBean("userService");
       userService.search();
  }
}
```

### 自定义类

目标业务类不变依旧是userServiceImpl

> 写我们自己的一个切入类

```java
public class DiyPointcut {

   public void before(){
       System.out.println("---------方法执行前---------");
  }
   public void after(){
       System.out.println("---------方法执行后---------");
  }
   
}
```

> 去spring中配置

```xml
<!--第二种方式自定义实现-->
<!--注册bean-->
<bean id="diy" class="com.javaboy.config.DiyPointcut"/>

<!--aop的配置-->
<aop:config>
   <!--第二种方式：使用AOP的标签实现-->
   <aop:aspect ref="diy">
       <aop:pointcut id="diyPonitcut" expression="execution(* com.javaboy.service.UserServiceImpl.*(..))"/>
       <aop:before pointcut-ref="diyPonitcut" method="before"/>
       <aop:after pointcut-ref="diyPonitcut" method="after"/>
   </aop:aspect>
</aop:config>
```

### 注解实现

> 编写一个注解实现的增强类

```java
@Aspect
public class AnnotationPointcut {
    
   @Before("execution(* com.javaboy.service.UserServiceImpl.*(..))")
   public void before(){
       System.out.println("---------方法执行前---------");
  }

   @After("execution(* com.kuang.service.UserServiceImpl.*(..))")
   public void after(){
       System.out.println("---------方法执行后---------");
  }

   @Around("execution(* com.kuang.service.UserServiceImpl.*(..))")
   public void around(ProceedingJoinPoint jp) throws Throwable {
       System.out.println("环绕前");
       System.out.println("签名:"+jp.getSignature());
       //执行目标方法proceed
       Object proceed = jp.proceed();
       System.out.println("环绕后");
       System.out.println(proceed);
  }
    
}
```

> 在Spring配置文件中，注册bean，并增加支持注解的配置

```xml
<!--第三种方式:注解实现-->
<bean id="annotationPointcut" class="com.javaboy.config.AnnotationPointcut"/>
<aop:aspectj-autoproxy/>
```

> aop:aspectj-autoproxy说明

- 通过`aop`命名空间的声明自动为`Spring`容器中那些配置`@AspectJ`切面的bean创建代理，织入切面。

- `Spring` 在内部依旧采用`AnnotationAwareAspectJAutoProxyCreator`进行自动代理的创建工作，但具体实现的细节已经被隐藏。

- `<aop:aspectj-autoproxy />`的`proxy-target-class`属性，默认为`false`，表示使用`jdk`动态代理织入增强。
  - 但是如果目标类没有声明接口，则`spring`将自动使用`CGLib`动态代理。
- `<aop:aspectj-autoproxy />`的`proxy-target-clas`s属性，设置为`true`时，表示使用`CGLib`动态代理技术织入增强。

## MyBatis-Spring

MyBatis-Spring 会帮助你将 MyBatis 代码无缝地整合到 Spring 中。

要和 Spring 一起使用 MyBatis，需要在 Spring 应用上下文中定义至少两样东西：

- 一个 SqlSessionFactory 
- 至少一个数据映射器类。

> 对比

- 在基础的 MyBatis 用法中，是通过 SqlSessionFactoryBuilder 来创建 SqlSessionFactory 的；在 MyBatis-Spring 中，可使用SqlSessionFactoryBean来创建 SqlSessionFactory。
- 在基础的 MyBatis 中，可以使用 SqlSessionFactory 来创建 SqlSession；在 MyBatis-Spring 中，可使用 SqlSessionFactory 作为构造方法的参数来创建 SqlSessionTemplate 对象，是DefaultSqlSession 的一个实现。

## 声明式事务

> 事务四个属性ACID

- 原子性（atomicity）：事务是原子性操作，由一系列动作组成，事务的原子性确保动作要么全部完成，要么完全不起作用

- 一致性（consistency）：一旦所有事务动作完成，事务就要被提交。数据和资源处于一种满足业务规则的一致性状态中

- 隔离性（isolation）：可能多个事务会同时处理相同的数据，因此每个事务都应该与其他事务隔离开来，防止数据损坏

- 持久性（durability）：
- - 事务一旦完成，无论系统发生什么错误，结果都不会受到影响。通常情况下，事务的结果被写到持久化存储器中

> Spring中的事务管理

Spring在不同的事务管理API之上定义了一个抽象层，使得开发人员不必了解底层的事务管理API就可以使用Spring的事务管理机制。Spring支持编程式事务管理和声明式的事务管理。

**编程式事务管理**

- 将事务管理代码嵌到业务方法中来控制事务的提交和回滚
- 缺点：必须在每个事务操作业务逻辑中包含额外的事务管理代码

**明式事务管理**

- 一般情况下比编程式事务好用。
- 将事务管理代码从业务方法中分离出来，以声明的方式来实现事务管理。
- 将事务管理作为横切关注点，通过aop方法模块化。Spring中通过Spring AOP框架支持声明式事务管理。

**使用Spring管理事务，注意头文件的约束导入 : tx**

```xml
<beans xmlns:tx="http://www.springframework.org/schema/tx"
		xsi:schemaLocation= "http://www.springframework.org/schema/tx
		http://www.springframework.org/schema/tx/spring-tx.xsd">
</beans>
```

**事务管理器**

- 无论使用Spring的哪种事务管理策略（编程式或者声明式）事务管理器都是必须的。
- 就是 Spring的核心事务管理抽象，管理封装了一组独立于技术的方法。

**JDBC事务**

```xml
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
       <property name="dataSource" ref="dataSource" />
</bean>
```

**配置好事务管理器后我们需要去配置事务的通知**

```xml
<!--配置事务通知-->
<tx:advice id="txAdvice" transaction-manager="transactionManager">
   <tx:attributes>
       <!--配置哪些方法使用什么样的事务,配置事务的传播特性-->
       <tx:method name="add" propagation="REQUIRED"/>
       <tx:method name="delete" propagation="REQUIRED"/>
       <tx:method name="update" propagation="REQUIRED"/>
       <tx:method name="search*" propagation="REQUIRED"/>
       <tx:method name="get" read-only="true"/>
       <tx:method name="*" propagation="REQUIRED"/>
   </tx:attributes>
</tx:advice>
```

**spring事务传播特性：**

事务传播行为就是多个事务方法相互调用时，事务如何在这些方法间传播。spring支持7种事务传播行为：

- propagation_requierd：如果当前没有事务，就新建一个事务，如果已存在一个事务中，加入到这个事务中，这是最常见的选择。
- propagation_supports：支持当前事务，如果没有当前事务，就以非事务方法执行。
- propagation_mandatory：使用当前事务，如果没有当前事务，就抛出异常。
- propagation_required_new：新建事务，如果当前存在事务，把当前事务挂起。
- propagation_not_supported：以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。
- propagation_never：以非事务方式执行操作，如果当前事务存在则抛出异常。
- propagation_nested：如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则执行与propagation_required类似的操作

Spring 默认的事务传播行为是 `PROPAGATION_REQUIRED`，它适合于绝大多数的情况。

**配置AOP**

```xml
<!--配置aop织入事务-->
<aop:config>
   <aop:pointcut id="txPointcut" expression="execution(* com.javaboy.dao.*.*(..))"/>
   <aop:advisor advice-ref="txAdvice" pointcut-ref="txPointcut"/>
</aop:config>
```
