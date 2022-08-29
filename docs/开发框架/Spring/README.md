# Spring

官方网址：

- Spring首页：[Spring | Home](https://spring.io/)

- Spring中文网：[Spring 中文网 (springref.com)](https://springref.com/)

## 1.Spring

### 1.1简介

- Spring:春天--->给软件行业带来了春天
- 2002.首次推出了Spring框架的雏形：interface21框架
- Spring框架即以interface21框架为基础，经过重新设计，并不断丰富其内涵，于2004年3月24号，发布了1.0正式版
- Rod Johson，Spring Framework创始人，著名作者。很难想象Rod Johnson的学历，真的让好多人大吃一惊，他是[悉尼大学](https://baike.baidu.com/item/悉尼大学)的博士，然而他的专业不是计算机，而是音乐学。
- Spring理念:使先有的化技术更加容易使用，本身使一个大杂烩，整合了现有的技术框架！



- SSH：Struct2+Spring+Hibernate
- SSM:SpringMVC +Spring+Mybatis

官网：https://spring.io/projects/spring-framework#learn

中文文档：https://www.docs4dev.com/docs/zh/spring-framework/5.1.3.RELEASE/reference

Github：https://github.com/spring-projects/spring-framework

### 1.2优点

- Spring使一个开源的免费的框架（容器）！
- Spring使一个轻量级的、非入侵的框架！
- 控制反转（IOC），面向切面编程（AOP）!
- 支持事务的处理，对框架整合的支持！

==总结一句话：Spring就是一个轻量级的控制反转（IOC）和喵娘切面编程（AOP）的框架！==

### 1.3组成

Spring七大模块：

- Spring AOP

- Apring ORM

- Spring DAO 

- Spring Web

- Spring Context

- Spring Web MVC

- Spring Core

### 1.4扩展

在Spring的官网有有这样的介绍：现代化的Java开发！说白了就是基于Spring的开发！

Spring Boot：构建一切

Spring Cloud：协调一切

Spring Cloud Data Flow：连接一切

- Spring Boot
  - 一个快速开发的脚手架
  - 基于SpringBoot可以快速的开发单个微服务
  - 约定大于配置！

- Spring Cloud
  - Spring Cloud是基于Spring Boot实现的

因为现在大多数公司都在使用SpringBoot进行快速开发，学习SpringBoot的前提，需要完全掌握Spring及SpringMVC！承上启下的作用！



**弊端：发展了太久之后，违背了原来的理念！配置十分繁琐，人称：配置地狱！！！**

## 2.IOC理论指导

### 2.1原来的实现

1. UserDao接口
2. UserDaoImpl实现类
3. UserService业务接口
4. UserServiceImpl业务实现类

在我们之前得业务中，用户的需求可能会影响我们原来的代码，我们需要根据用户的需求去修改源代码!如果程序代码量十分大，修改一次的成本代价十分昂贵！

我们使用一个Set接口实现，已经发生了革命性的变化！

~~~xml
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.3.2</version>
        </dependency>
~~~

~~~java
    private UserDao userDao;

    //利用Set进习性动态实现值得注入
    public void setUserDao(UserDao userDao){
        this.userDao = userDao;
    }
~~~

- 之前，程序是主动创建对象！控制权在程序员手上！
- 使用了set注入后，程序不在具有主动性，而是变成了被动的接受对象！

这种思想，从本质上解决了问题，我们程序猿不用再去管理对象的创建了。系统的耦合性大大降低，可以更加专注在业务的实现上！这是IOC的原型！

### 2.2IOC本质

业务层（主动权在程序猿，程序猿选择用什么）

用户（主动权在用户，用户选择用什么）

**控制反转IoC（Inversion of Control），是一种设计思想，DI（依赖注入）是实现IoC的一种方法**,也有人认为DI只是IoC的另一种说法，没有IoC的陈孤忠，我们使用面向对象编程，对象的创建与对象间的依赖关系完全硬编码在程序中，对现象的创建由程序自己控制，控制反转后将对现象的创建转移给第三方，个人认为所谓控制反转就是：获得依赖对象的方式反转了。

采用XML方式配置Bean的时候，Bean的定义信息是和实现分离的，而采用注解的方式可以把两者合为一体，Bean的定义信息直接以注解的形式定义在实现类中，从而达到了零配置的目的。

**控制反转是一种通过描述（XML或注解）并通过第三放去生产获取特定对象的方式。在Spring中实现控制反转的是IoC容器，其实是现方法是依赖注入（Dependency Injection，DI）**

## 3.HelloSpring

1.实体类

~~~java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Hello {
    private String str;
}
~~~

2.配置文件applicationContext.xml

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--使用Spring来创建对象，在Spring这些都称为Bean
    类型 变量名 = new 类型();
    Hello hello = new Hello();
    id = 变量名
    class == new 的对象
    property 相当于给对象中的属性设置一个值
    bean = 对象  new Hello()
    -->
    <bean id="hello" class="com.simpleteen.pojo.Hello">
        <property name="str" value="Spring"/>
    </bean>

</beans>
~~~

3.测试

~~~java
    public static void main(String[] args) {
        //获取Spring的上下文对象
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        //我们的对象都在Spring中管理了，我们要使用，直接去里面取出来就可以！
        Hello hello = (Hello) context.getBean("hello");
        System.out.println(hello.toString());
    }
~~~

**思考问题？**

- Hell对象是谁创建的？

  Hello对象是由Spring创建的

- Hello对象的属性是怎么设置的？

  hello对象的属性下是由Spring容器设置的

这个过程就叫控制反转：

控制：谁来控制对象的创建，传统应用程序的对昂是由程序本身控制创建的，使用Spring后，对象是由Spring来创建的

反转：程序本身不创建对象，而变成被动的接受对象

依赖注入：就是利用set方法来进习性注入的

IOC是一种变成思想，由主动的变成变成被动的接受

可以通过new ClassPathXmlApplicationContext()去浏览以下底层源码

**OK，到了现在，我们彻底不用在程序中去改动了，要实现不同的操作，只需要在xml配置文件中进行修改，所谓的IoC，一句话搞定：对象由Spring来创建，管理，装配**

## 4.IOC创建对象的方式

1. 使用无参构造创建对象，默认

2. 假设我们要使用有参构造创建

   1. 下标赋值

      ~~~xml
      <!--第一种：下标赋值-->
      <constructor-arg index="0" value="沈金勇"/>
      ~~~

   2. 类型

      ~~~xml
      <!--有参构造 第二种：类型赋值 不建议使用-->
      <constructor-arg type="java.lang.String" value="沈金勇"/>
      ~~~

   3. 参数名

      ~~~xml
      <!--有参构造 第三种：直接通过参数名-->
      <property name="name" value="沈金勇"/>
      ~~~

**总结：**

在配置文件加载的时候，容器中管理的对象就已经初始化了！

## 5.Spring配置

### 5.1别名

~~~xml
<alias name=""alias=""/>
~~~

别名，如果添加了别名，我们也可以使用原来的配置

### 5.2Bean

id：bean的唯一标识符，也就是相当于我们学的对象名

class：bean对象所对应的全限定名：包名+类型

name：也是别名，而且可以同时取多个别名

scope：作用域

### 5.3import

这个import，一般用于团队开发使用，它可以将多个配置文件，导入合并为一个

假设，现在项目中有多个人开发，这三个人负责不同的类开发，不同的类需要注册在不同的bean中，我们可以利用import将所有人的applicationContext.xml合并为一个总的！

- 张三

- 李四

- 王五

- applicationContext.xml

  ~~~xml
  <import resource=""/> 
  ~~~

使用的时候，直接使用总的配置就可以了

## 6.DI依赖注入

### 6.1构造器注入

前面已经说过了

### 6.2Set方式注入【重点】

- 依赖注入：Set注入！
  - 依赖：bean对象的创建依赖于容器
  - 注入：bean对象中的所有属性，由容器来注入

【环境搭建】

1. 复杂类型

   ~~~java
   @Data
   @AllArgsConstructor
   @NoArgsConstructor
   public class Address {
       private String address;
   }
   ~~~

2. 真实测试对象

   ~~~java
   @Data
   @AllArgsConstructor
   @NoArgsConstructor
   public class Student {
       private String name;
       private Address address;
       private String[] books;
       private List<String> hobbys;
       private Map<String,String> card;
       private Set<String> games;
       private Properties info;
       private String wife;
   }
   ~~~

3. applicationContext.xml

   ~~~xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans.xsd">
   
       <bean id="student" class="com.simpleteen.pojo.Student">
           <!--第一种，普通值注入，value-->
           <property name="name" value="沈金勇"/>
       </bean>
   </beans>
   ~~~

4. 测试

   ~~~java
       public static void main(String[] args) {
           ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
           Student student = (Student) context.getBean("student");
           System.out.println(student.getName());
       }
   ~~~

**完善Ser方式注入：**

applicationContext.xml

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="address" class="com.simpleteen.pojo.Address">
        <property name="address" value="江西"/>
    </bean>

    <bean id="student" class="com.simpleteen.pojo.Student">
        <!--第一种，普通值注入，value-->
        <property name="name" value="沈金勇"/>
        <!--第二种，Bean注入，ref-->
        <property name="address" ref="address"/>
        <!--第三种，数组注入-->
        <property name="books">
            <array>
                <value>红楼梦</value>
                <value>西游记</value>
                <value>水浒传</value>
                <value>三国演义</value>
            </array>
        </property>
        <!--第四种，List注入-->
        <property name="hobbys">
            <list>
                <value>听歌</value>
                <value>敲代码</value>
                <value>看电影</value>
            </list>
        </property>
        <!--第五种，Map-->
        <property name="card">
            <map>
                <entry key="身份证" value="123456"/>
                <entry key="银行卡" value="123456"/>
            </map>
        </property>
        <!--第六种，Set-->
        <property name="games">
            <set>
                <value>LOL</value>
                <value>COC</value>
                <value>BOB</value>
            </set>
        </property>
        <!--第七种，Null-->
        <property name="wife">
            <null></null>
        </property>
        <!--第八种，Properties-->
        <property name="info">
            <props>
                <prop key="学号">231118017</prop>
                <prop key="密码">123456</prop>
                <prop key="姓名">沈金勇</prop>
            </props>
        </property>
    </bean>

</beans>
~~~

测试

~~~java
    public static void main(String[] args) {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        Student student = (Student) context.getBean("student");
        System.out.println(student.getName());
        System.out.println(student.getAddress());
        String[] books = student.getBooks();
        for (String book : books) {
            System.out.println(book);
        }
        List<String> hobbys = student.getHobbys();
        for (String hobby : hobbys) {
            System.out.println(hobby);
        }
        Map<String, String> card = student.getCard();
        System.out.println(card);
        Set<String> games = student.getGames();
        System.out.println(games);
        String wife = student.getWife();
        System.out.println(wife);
        Properties info = student.getInfo();
        System.out.println(info);

        System.out.println(student.toString());
    }
~~~

### 6.3扩展方式注入

我们可以使用p命名空间和c命名空间进行注入

p命名空间

~~~xml
<!--p命名空间注入，可以直接注入属性的值-->
<bean id="user" class="com.simpleteen.pojo.User" p:name="沈金勇" p:age="18"/>

~~~

c命名空间

~~~xml
<!--c命名空间注入，可以通过构造器注入-->
<bean id="user" class="com.simpleteen.pojo.User" c:name="沈金勇" c:age="23"/>
~~~

注意点：p命名空间和c命名空间不能直接使用，需要导入xml约束！

~~~xml
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:c="http://www.springframework.org/schema/c"
~~~

### 6.4bean的作用域

| Scope                                                        | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [singleton](https://www.docs4dev.com/docs/zh/spring-framework/5.1.3.RELEASE/reference/core.html#beans-factory-scopes-singleton) | (默认)将每个 Spring IoC 容器的单个 bean 定义范围限定为单个对象实例。 |
| [prototype](https://www.docs4dev.com/docs/zh/spring-framework/5.1.3.RELEASE/reference/core.html#beans-factory-scopes-prototype) | 将单个 bean 定义的作用域限定为任意数量的对象实例。           |
| [request](https://www.docs4dev.com/docs/zh/spring-framework/5.1.3.RELEASE/reference/core.html#beans-factory-scopes-request) | 将单个 bean 定义的范围限定为单个 HTTP 请求的生命周期。也就是说，每个 HTTP 请求都有一个在单个 bean 定义后面创建的 bean 实例。仅在可感知网络的 Spring `ApplicationContext`中有效。 |
| [session](https://www.docs4dev.com/docs/zh/spring-framework/5.1.3.RELEASE/reference/core.html#beans-factory-scopes-session) | 将单个 bean 定义的范围限定为 HTTP `Session`的生命周期。仅在可感知网络的 Spring `ApplicationContext`上下文中有效。 |
| [application](https://www.docs4dev.com/docs/zh/spring-framework/5.1.3.RELEASE/reference/core.html#beans-factory-scopes-application) | 将单个 bean 定义的范围限定为`ServletContext`的生命周期。仅在可感知网络的 Spring `ApplicationContext`上下文中有效。 |
| [websocket](https://www.docs4dev.com/docs/zh/spring-framework/5.1.3.RELEASE/reference/web.html#websocket-stomp-websocket-scope) | 将单个 bean 定义的范围限定为`WebSocket`的生命周期。仅在可感知网络的 Spring `ApplicationContext`上下文中有效。 |

1. 单例模式（Spring默认机制）

   ~~~xml
   <bean id="user" class="com.simpleteen.pojo.User" c:name="沈金勇" c:age="23" scope="singleton"/>
   ~~~

2. 原型模式：每次从容器中get的时候，都会产生一个新对象

   ~~~xml
   <bean id="user" class="com.simpleteen.pojo.User" c:name="沈金勇" c:age="23" scope="prototype"/>
   ~~~

3. 其余的request、session、application，这些个只能在web开发中使用到！

## 7.Bean的自动装配

- 自动装配式Spring满足bean依赖的一种方式
- Spring会在删改问中自动寻找，并自动给bean装配属性

在Spring中有三种装配的方式

1. 在xml中显式的配置
2. 在java中显式的配置
3. 隐式的自动装配bean【重要】

### 7.1测试

环境搭建

- 一个人有两个宠物

### 7.2ByName自动装配

~~~xml
    <!--
    byName:会自动在容器上下文中查找，和自己对象set方法后面的值对应的bean id！
    -->
    <bean id="person" class="com.simpleteen.pojo.Person" autowire="byName">
        <property name="name" value="沈金勇"/>
        <!--<property name="cat" ref="cat"/>-->
        <!--<property name="dog" ref="dog"/>-->
    </bean>
~~~

### 7.3ByType自动装配

~~~xml
    <!--
    byType：会自动在容器上下文中查找，和自己对象属性类型相同的bean id！
    -->
    <bean id="person" class="com.simpleteen.pojo.Person" autowire="byType">
        <property name="name" value="沈金勇"/>
        <!--<property name="cat" ref="cat"/>-->
        <!--<property name="dog" ref="dog"/>-->
    </bean>
~~~

小结：

- byName的时候，需要保证所有bean的id唯一，并且这个bean现需要和自动注入的属性的set方法的值一致！
- byType的时候，需要保证所有bean的class唯一，并且这个bean现需要和自动注入的属性的的类型一致！

### 7.4使用注解实现自动装配

jdk1.5开始支持注解

spring2.5开始支持注解

要使用注解须知：

1. 导入约束：context约束
2. 配置注解的支持

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">

    <context:annotation-config/>

</beans>
~~~

**@Autowired**

直接在属性上使用即可！也可以在set方法上使用！

使用Autowired我们可以不用编写Set方法了，前提式这个自动装配的属性在IOC（Spring）容器中存在，且符合名字byName！

**科普：**

~~~xml
@Nullable 字段标记了这个注解，说明这个字段可以为null
~~~

如果显示定义了Autowired的required属性为false，说明这个对象可以为null，否则不允许为空

如果@Autowired自动装配的环境比较复杂

，自动装配无法通过一个注解【@Autowired】完成的时候，我们可以使用@Qualifier(value="xxx")取配合@Autowired的式使用，指定唯一的bean对象注入！

**@Resource注解**

**小结：**

@Resource和@Autowired的区别：

- 都是用来自动装配的，都可以放在属性字段上
- @Autowired通过byType的方式实现，而且必须要求这个对象存在，不然就空指针【常用】
- @Resource默认通过byName的方式实现，如果找不到名字，则通过byType实现，如果两个都找不到的情况下，就报错！
- 执行顺序不同：@Autowired通过byType的方式实现，@Resource默认通过byName的方式实现

## 8.使用注解开发

在Spring4之后，要使用注解开发，必须要保证aop的包导入了

使用注解需要导入xontext约束，增加注解支持！

1. bean

2. 属性如何注入

   ~~~xml
   //@Component 组件
   //等价于 <bean id="user" class="com.simpleteen.pojo.User"/>
   @Component
   public class User {
       @Value("沈金勇")
       public String name;
   }
   ~~~

3. 衍生的注解

4. @Component有几个衍生注解，我们在web开发中，会按照mvc三层架构分层！

   - dao：@Repository
   - service：@Service
   - controller：@Controller
   - 这四个注解功能都是一样的，都是代表将某个类注册到Spring中，装配Bean

5. 自动装配

6. 作用域

   @Scope("singleton")

7. 小结

xml与注解：

   - xml更加万能，适用于任何场合！维护简单方便
   - 注解，不是自己类使用不了，维护性相对复杂


xml与注解最佳实践：

- xml只用来管理bean
- 注解值负责完成属性的注入
- 我们在使用的过程中，只需要注意一个问题，必须要开启注解的支持与注解的扫描

## 9.使用Java的方式配置Spring

我们现在要完全不使用Spring的xml配置了，全权交给Java来做！

JavaConfig式Spring的一个子项目，在Spring4之后，它成为了一个核心功能

实体类

~~~java
@Data
@AllArgsConstructor
@NoArgsConstructor
@Repository
public class User {
    @Value("沈金勇")
    private String name;
}
~~~

配置文件

~~~java
//这个也会被Spring容器托管，注册到容器中，因为他本来就是一个@Component。
// @Configuration代表这是一个配置类，就和我们之前看的beans.xml一样
@Configuration
@ComponentScan("com.simpleteen.pojo")
public class MyConfig {
    //注册一个bean，就相当于我们之前写的一个bean标签
    //这个方法的名字，就相当于bean标签中的id属性
    //这个方法的返回值，就相当于bean标签中的class
    @Bean
    public User getUser(){
        return new User();//就是返回要注入到bean的对象
    }
}
~~~

测试类

~~~java
    public static void main(String[] args) {
        //如果完全是用来配置类方式去做，我们就只能通过AnnotationConfigApplicationContext上线问来获取容器，通过配置类的class对象加载！
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(MyConfig.class);
        User user = context.getBean("getUser", User.class);
        System.out.println(user.getName());
    }
~~~

这种纯Java的配置方式，在SpringBoot中随处可见

## 10.代理模式

为什么要学习代理模式？

因为这就是SpringAOP的底层！【SpringAOP和SpringMVC】

代理模式的分类：

- 静态代理
- 动态代理

### 10.1静态代理

角色分析：

- 抽象角色：一般会使用接口或者抽象类来解决
- 真实角色：被代理的角色
- 代理角色：代理真实角色，代理真实角色后，我们一般会做一些附属操作
- 客户：访问代理对象的人

代码步骤：

1. 接口

   ~~~java
   //租房
   public interface Rent {
       public void rent();
   }
   ~~~

2. 真实角色

   ~~~java
   //房东
   public class Host implements Rent{
       @Override
       public void rent() {
           System.out.println("房东要出租房子");
       }
   }
   ~~~

3. 代理角色

   ~~~java
   public class Proxy implements Rent{
       private Host host;
   
       public Proxy() {
       }
   
       public Proxy(Host host) {
           this.host = host;
       }
   
       @Override
       public void rent() {
           seeHouse();
           host.rent();
           contract();
           fare();
       }
   
       //看房
       public void seeHouse(){
           System.out.println("中介带你看房");
       }
   
       //收中介费
       public void fare(){
           System.out.println("收中介费");
       }
   
       //签合同
       public void contract(){
           System.out.println("签租赁合同");
       }
   }
   ~~~

4. 客户端访问代理角色

   ~~~java
   public class Client {
       public static void main(String[] args) {
           //房东要租房子
           Host host = new Host();
           //代理，中介帮房东租房子，但是代理一般会有一些附属操作
           Proxy proxy = new Proxy(host);
           //你不用面对房东，直接找中介即可
           proxy.rent();
       }
   }
   ~~~

代理模式的好处：

- 可以使真实角色的操作更加纯粹，不用去关注一些公共的业务
- 公共业务就交给代理角色！实现了业务的分工！
- 公共业务发生扩展的时候，方便集中管理！

缺点：

一个真实角色就会产生一个代理角色；代码量会翻倍，开发效率会变低

### 10.2加深理解

**AOP**

在不改变原有的业务代码的情况下，实现横向开发

### 10.3动态代理

- 动态代理和静态代理角色一样
- 动态代理的代理类是动态生成的，不是我们直接写好的！
- 动态代理分为两大类：基于接口的动态代理，基于类的动态代理
  - 基于接口---JDK 动态代理【我们在这里使用】
  - 基于类---cglib
  - java字节码实现---javasist

需要了解两个类：Proxy代理，InvocationHandler调用处理程序

**动态代理的好处：**

- 可以使真实角色的操作更加纯粹，不用去关注一些公共的业务
- 公共业务就交给代理角色！实现了业务的分工！
- 公共业务发生扩展的时候，方便集中管理！
- 一个动态代理类代理的是一个接口，一般就是对应一类业务
- 一个动态代理类可以代理多个类，只要实现了同一个接口即可

**ProxyInvocationHandler**

~~~java
package com.simpleteen.demo4;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

//等会我们会用这个类，自动生成代理类
public class ProxyInvocationHandler implements InvocationHandler {

    //被代理的接口
    public Object target;

    public void setTarget(Object target) {
        this.target = target;
    }

    //生成得到代理类
    public Object getProxy(){
        return Proxy.newProxyInstance(this.getClass().getClassLoader(),target.getClass().getInterfaces(),this);
    }

    //处理代理实例，并返回结果
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        log(method.getName());
        //动态代理的本质，就是使用反射机制实现
        Object result = method.invoke(target, args);
        return result;
    }

    public void log(String msg){
        System.out.println("执行了"+msg+"方法");
    }
}
~~~

**Client**

~~~java
package com.simpleteen.demo4;

import com.simpleteen.demo2.UserService;
import com.simpleteen.demo2.UserServiceImpl;

public class Client {
    public static void main(String[] args) {
        //真实角色
        UserServiceImpl userService = new UserServiceImpl();
        //代理角色，不存在
        ProxyInvocationHandler pih = new ProxyInvocationHandler();

        pih.setTarget(userService);//设置代理的对象

        //动态生成代理类
        UserService proxy = (UserService) pih.getProxy();

        proxy.add();

    }
}
~~~

## 11.AOP

### 11.1什么是AOP

AOP（Aspect Oriented Programming）意为：面向切面编程，通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术。AOP是OOP的延续，是软件开发中的一个热点，也是Spring框架中的一个重要内容，是函数式编程的一种衍生范型，利用AOP可以对业务逻辑的各个部分进行隔离，从而是的业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。

### 11.2AOP在Spring中的作用

==提供声明式事务：允许用户自定义切面==

- 横切关注点：跨越应用程序多个模块的方法或功能。即是，与我们业务逻辑无关的，但是我们需要关注的部分，就是横切关注点如日志,安全,缓存,事务等等......
- 切面(ASPECT):横切关注点被模块化的特殊对象。即，它是一个类。
- 通知（Advice）：切面必须要完成的工作。即，它是类中的一个方法。
- 目标（Target):被通知对象
- 代理（Proxy）：向目标应用通知之后创建的对象。
- 切入点（PointCut）：切面通知执行的“地点”的定义。
- 连接点（JointPoint):与切入点匹配的执行点。

SpringAOP中，通过Advice定义横切罗杰，Spring中支持5种类型的Advice;

前置通知、后置通知、环绕通知、异常抛出通知、引介通知

### 11.3使用Spring实现AOP

【重点】使用AOP织入，需要导入一个依赖包

~~~xml
<dependency>
  <groupId>org.aspectj</groupId>
  <artifactId>aspectjweaver</artifactId>
  <version>1.9.6</version>
</dependency>
~~~

**方式一：使用Spring的API接口【主要是SpringAPI接口实现】**

~~~java
public class AfterLog implements AfterReturningAdvice {
    //o:返回值
    @Override
    public void afterReturning(Object o, Method method, Object[] objects, Object o1) throws Throwable {
        System.out.println("执行了"+method.getName()+"方法,返回结果为："+o);
    }
}
~~~

~~~java
public class Log implements MethodBeforeAdvice {

    //method：要执行的目标对象的方法
    //objects：参数
    //o：目标对象
    @Override
    public void before(Method method, Object[] objects, Object o) throws Throwable {
        System.out.println(o.getClass().getName()+"的"+method.getName()+"被执行了");
    }
}
~~~

~~~xml
    <!--方式一:使用原生Spring API接口-->
    <!--配置AOP:需要导入aop的约束-->
    <aop:config>
        <!--切入点:expression:表达式,execution(要执行的位置!)-->
        <aop:pointcut id="pointcut" expression="execution(* com.simpleteen.service.UserServiceImpl.*(..))"/>
        <!--执行环绕增强-->
        <aop:advisor advice-ref="log" pointcut-ref="pointcut"/>
        <aop:advisor advice-ref="afterLog" pointcut-ref="pointcut"/>
    </aop:config>
~~~

**方式二：自定义来实现AOP【主要是切面定义】**

~~~java
public class DiyPointCut {
    public void before(){
        System.out.println("方法执行前");
    }

    public void after(){
        System.out.println("方法执行后");
    }

}
~~~

~~~xml
    <!--方式二：自定义类-->
    <bean id="diy" class="com.simpleteen.diy.DiyPointCut"/>
    <aop:config>
        <!--自定义切面，ref=要引用的类-->
        <aop:aspect ref="diy">
            <!--切入点-->
            <aop:pointcut id="ponit" expression="execution(* com.simpleteen.service.UserServiceImpl.*(..))"/>
            <!--通知-->
            <aop:before method="before" pointcut-ref="ponit"/>
            <aop:after method="after" pointcut-ref="ponit"/>
        </aop:aspect>
    </aop:config>
~~~

**方式三：使用注解实现！**

~~~java
//使用注解方式实现AOP
@Aspect//标注这个类是一个切面
public class AnnotationPointCut {
    @Before("execution(* com.simpleteen.service.UserServiceImpl.*(..))")
    public void before(){
        System.out.println("方法执行前");
    }
    @After("execution(* com.simpleteen.service.UserServiceImpl.*(..))")
    public void after(){
        System.out.println("方法执行后");
    }
    //在环绕增强种，我们可以给定一个参数，代表我们要获取处理切入的点
    @Around("execution(* com.simpleteen.service.UserServiceImpl.*(..))")
    public void around(ProceedingJoinPoint jp) throws Throwable {
        System.out.println("环绕前");
        Signature signature = jp.getSignature();//获得签名
        System.out.println(signature);
        //执行方法
        Object proceed = jp.proceed();
        System.out.println("环绕后");
        System.out.println(proceed);
    }
}
~~~

~~~xml
    <!--方式三：使用注解-->
    <bean id="annotationPointCut" class="com.simpleteen.diy.AnnotationPointCut"/>
    <!--开启注解支持 JDK(默认)proxy-target-class="false"   cglib(proxy-target-class="true")-->
    <aop:aspectj-autoproxy proxy-target-class="false"/>
~~~

## 12.整合MyBatis

步骤：

1. 导入相关jar包
   - junit
   - mybatis
   - mysql数据库
   - spring相关的
   - aop植入
   - mybatis-spring
2. 编写配置文件
3. 测试

### 12.1回忆mybatis

1. 编写实体类
2. 编写核心配置文件
3. 编写接口
4. 编写Mapper.xml
5. 测试

### 12.2Mybatis-spring

1. 编写数据源配置
2. sqlSessionFactory
3. sqlSessionTemplate
4. 幼给接口加实现类
5. 将自己写的实现类，注入到Spring中
6. 测试即可

### 13.声明式事务

### 13.1回顾事务

- 把一组业务当成一个业务来做；要么多成功，要么都失败！
- 事务在项目开发中，十分重要，设计到数据的一致性问题，不能马虎！
- 确保完整性和一致性

事务的ACID原则：

- 原子性
- 一致性
- 隔离性
  - 多个业务可能操作同一个资源，防止数据损坏
- 持久性
  - 事务一旦提交，无论系统发生声明问题，结果都不会再被影响，被持久化的i二到存储器中

### 13.2Spring中的事务管理

- 声明式事务：AOP
- 编程式事务：需要在代码中，进行事务的管理
