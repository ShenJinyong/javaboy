# SpringBoot整合Shiro

## 1.简介

### 1.1什么是Shiro？

- Apache Shiro是一个强大且易用的Java安全框架

- 执行身份验证、授权、密码和会话管理

- 使用Shiro的易于理解的API,您可以快速、轻松地获得任何应用程序,从最小的移动应用程序到最大的网络和企业应用程序。
- 官网：http://shiro.apache.org/
- github:https://github.com/apache/shiro

### 1.2有哪些功能？

- Authentication：身份认证、登录，验证用户是不是拥有相应的身份
- Authorization：授权，即权限验证，验证某个已认证的用户是否拥有某个权限，即判断用户能否进行什么操作
- Session Manager:会话管理，即用户登录后就是第一次会话，在没有退出之前，它的所有信息都在会话中；会话可以是普通的JavaSE缓解，也可以是Web环境
- Cryptography：加密，保护数据1的安全性，如密码加密存储到数据库中，而不是明文存储
- Web Support：Web支持，可以非常容易地集成Web环境
- Caching：缓存，比如用户登录后，其用户信息，拥有的角色，权限不必每次去查，这样可以提高效率
- Concurrency:Shiro支持多线程应用程序的并发验证，即，如在一个线程中开启另一个线程，能把权限自动的传播过去
- Testing：提供测试支持
- Run As：允许一个用户假装为另外一个用户（如果他们允许)的身份进行访问
- Remember Me:记住我，这个是非常常见的功能，即一次登录后，下次载来的话不用登录了

### 1.3Shiro架构（外部）

从外部来看Shiro，即从应用程序角度来观察如何使用shiro完成工作：

- Subject：即“当前操作用户”。但是，在Shiro中，Subject这一概念并不仅仅指人，也可以是第三方进程、后台帐户（Daemon Account）或其他类似事物。

- SecurityManager：它是Shiro框架的核心，典型的[Facade模式](https://baike.baidu.com/item/Facade模式/7557140)，Shiro通过SecurityManager来管理内部组件实例，并通过它来提供安全管理的各种服务。

- Realm： Realm充当了Shiro与应用安全数据间的“桥梁”或者“连接器”。也就是说，当对用户执行认证（登录）和授权（访问控制）验证时，Shiro会从应用配置的Realm中查找用户及其权限信息。

### 1.4Shiro架构（内部）

- 它仅仅意味着“当前跟软件交互的东西”。Subject代表了当前用户的安全操作，SecurityManager则管理所有用户的安全操作。

- 从这个意义上讲，Realm实质上是一个安全相关的DAO：它封装了数据源的连接细节，并在需要时将相关数据提供给Shiro。当配置Shiro时，你必须至少指定一个Realm，用于认证和（或）授权。配置多个Realm是可以的，但是至少需要一个。

- Shiro内置了可以连接大量安全数据源（又名目录）的Realm，如LDAP、关系数据库（JDBC）、类似INI的文本配置资源以及属性文件等。如果系统默认的Realm不能满足需求，你还可以插入代表自定义数据源的自己的Realm实现。

## 2.快速开始

1. 导入依赖
2. 配置文件
3. HelloWorld

## 3.Subject分析

~~~java
// 获取当前用户对象Subject
Subject currentUser = SecurityUtils.getSubject();

//通过当前用户拿到Session
Session session = currentUser.getSession();

//判断当前用户是否被认证
currentUser.isAuthenticated();
    
//获得当前用户的认证
currentUser.getPrincipal();
    
//判断用户是否获得角色
currentUser.hasRole("vip1");
    
//获得用户的权限（细粒度）
currentUser.isPermitted("lightsaber:wield");

//注销
currentUser.logout();
~~~

## 4.SpringBoot整合Shiro环境搭建

### 4.1新建工程

新建一个Springboot工程，选择web工程，thymeleaf依赖，测试运行成功

### 4.2导入依赖

~~~xml
        <dependency>
            <groupId>org.apache.shiro</groupId>
            <artifactId>shiro-spring</artifactId>
            <version>1.4.1</version>
        </dependency>
~~~

### 4.3编写配置类

**ShiroConfig**

~~~java
package com.simpleteen.config;

import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ShiroConfig {

    //ShiroFilterFactoryBean 第三步
    @Bean
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(@Qualifier("getDefaultWebSecurityManager") DefaultWebSecurityManager defaultWebSecurityManager){
        ShiroFilterFactoryBean bean = new ShiroFilterFactoryBean();
        //设置安全管理器
        bean.setSecurityManager(defaultWebSecurityManager);
        return bean;
    }

    //DefaultWebSecurityManager 第二步
    @Bean
    public DefaultWebSecurityManager getDefaultWebSecurityManager(@Qualifier("userRealm") UserRealm userRealm){
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        //关联UserRealm
        securityManager.setRealm(userRealm);
        return securityManager;
    }

    //创建realm对象，需要自定义 第一步
    @Bean
    public UserRealm userRealm(){
        return new UserRealm();
    }
}
~~~

### 4.4自定义UserRole

~~~java
package com.simpleteen.config;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

//自定义的UserRealm
public class UserRealm extends AuthorizingRealm {
    //授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        System.out.println("执行了授权=>AuthorizationInfo");
        return null;
    }

    //认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        System.out.println("执行了认证=>AuthenticationInfo");
        return null;
    }
}
~~~

### 4.5MyController

~~~java
package com.simpleteen.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MyController {

    @RequestMapping({"/","/index"})
    public String toIndex(Model model){
        model.addAttribute("msg","hello world");
        return "index";
    }

    @RequestMapping("/user/add")
    public String add(){
        return "user/add";
    }

    @RequestMapping("/user/update")
    public String update(){
        return "user/update";
    }
}
~~~

### 4.6页面

**index.html**

~~~html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>首页</h1>
<p th:text="${{msg}}"></p>
<a th:href="@{/user/add}">add</a>
<a th:href="@{/user/update}">update</a>
</body>
</html>
~~~

**add.html**

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>add</h1>
</body>
</html>
~~~

**update.html**

~~~java
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>update</h1>
</body>
</html>
~~~

### 4.7测试运行

OK！

## 5.Shiro实现登录拦截

### 5.1配置ShiroConfig

~~~java
   //ShiroFilterFactoryBean 第三步
    @Bean
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(@Qualifier("getDefaultWebSecurityManager") DefaultWebSecurityManager defaultWebSecurityManager){
        ShiroFilterFactoryBean bean = new ShiroFilterFactoryBean();
        //设置安全管理器
        bean.setSecurityManager(defaultWebSecurityManager);

        //添加Shiro的内置过滤器
        /*
        * anon:无需认证就可以访问
        * authc:必须认证了才能访问
        * user:必须拥有 记住我功能才能用
        * perms:拥有对某个资源的权限才能访问
        * role:拥有某个角色权限才能访问
        * */

        LinkedHashMap<String, String> filterMap = new LinkedHashMap<>();

        //filterMap.put("/user/add","authc");
        //filterMap.put("/user/update","authc");
        filterMap.put("/user/*","authc");

        bean.setFilterChainDefinitionMap(filterMap);

        //设置登录的请求
        bean.setLoginUrl("/toLogin");

        return bean;
    }

    //DefaultWebSecurityManager 第二步
    @Bean
    public DefaultWebSecurityManager getDefaultWebSecurityManager(@Qualifier("userRealm") UserRealm userRealm){
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        //关联UserRealm
        securityManager.setRealm(userRealm);
        return securityManager;
    }
~~~

### 5.2增加跳转请求MyController

~~~java
    @RequestMapping("/toLogin")
    public String toLogin(){
        return "login";
    }
~~~

### 5.3增加login.html

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>登录</h1>
<form action="">
    <p>用户名：<input type="text" name="username"></p>
    <p>密  码：<input type="text" name="password"></p>
    <p><input type="submit"></p>
</form>
</body>
</html>
~~~

## 6.Shiro实现用户认证

### 6.1修改login.html

~~~html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>登录</h1>
<hr/>
<p th:text="${msg}" style="color: red"></p>
<form th:action="@{/login}">
    <p>用户名：<input type="text" name="username"></p>
    <p>密  码：<input type="text" name="password"></p>
    <p><input type="submit"></p>
</form>
</body>
</html>
~~~

### 6.2增加跳转请求MyController

~~~java
    @RequestMapping("/login")
    public String login(String username,String password,Model model){
        //获取当前的用户
        Subject subject = SecurityUtils.getSubject();
        //封装用户的登录数据
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);

        try {
            subject.login(token);//执行登录方法，如果没有异常就说明OK
            return "index";
        } catch (UnknownAccountException e){//用户名不存在
            model.addAttribute("msg","用户名错误");
            return "login";
        }  catch (IncorrectCredentialsException e){//密码不存在
            model.addAttribute("msg","密码错误");
            return "login";
        }
    }
~~~

### 6.3修改UserRealm

~~~java
    //认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        System.out.println("执行了认证=>AuthenticationInfo");

        //用户名、密码 数据库中取
        String name = "root";
        String password = "123456";

        UsernamePasswordToken token = (UsernamePasswordToken) authenticationToken;

        if(!token.getUsername().equals(name)){
            return null;//抛出异常 UnknownAccountException
        }
        //密码认证，shiro做~
        return new SimpleAuthenticationInfo("",password,"");
    }
~~~

### 6.4测试

OK

## 7.Shiro整合Mybatis

### 7.1导入依赖pom.xml

~~~xml
        <!--mysql-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <!--druid-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.1.21</version>
        </dependency>
        <!--log4j-->
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
        <!--mybatis整合Springboot-->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.1.3</version>
        </dependency>
        <!--lombok-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
~~~

### 7.2配置文件application.yaml

~~~yml
spring:
  datasource:
    username: root
    password: 123456
    url: jdbc:mysql://localhost:3306/mybatis?useUnicode=true&characterEncoding=utf-8&serverTimezone=UTC
    driver-class-name: com.mysql.cj.jdbc.Driver
    type: com.alibaba.druid.pool.DruidDataSource # 自定义数据源

    #Spring Boot默认是不注入这些属性值的，需要自己绑定
    #druid 数据源专有配置
    initialSize: 5
    minIdle: 5
    maxWait: 60000
    timeBetweeEvictionRunsMillis: 60000
    minEvictableIdleTimeMillis: 300000
    validationQuery: SELECT 1 FROM DUAL
    testWhileIdle: true
    testOnBorrow: false
    poolPreparedStatements: true

    #配置监控统计拦截的filters，start：监控统计、log4j:日志记录、wall:防御sql注入
    #如果运行时报错 java。Lang。ClassNotFoundException：org。apache.log4j.Priority
    #则导入log4j依赖即可，Maven地址：http://mvnrepository.com/artifact/log4j/log4j
    filters: stat,wall,log4j
    maxPoolPreparedStatementPerConnectionSize: 20
    useGlobalDataSourceStat: true
    connectionProperties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=500

# 整合mybatis
mybatis:
  type-aliases-package: com.simpleteen.pojo
  mapper-locations: classpath:mybatis/mapper/*.xml
~~~

### 7.3增加实体类pojo

**User**

~~~java
package com.simpleteen.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int id;
    private String name;
    private String pwd;
}
~~~

### 7.4增加UserMapper

/simpleteen/mapper/UserMapper

~~~java
package com.simpleteen.mapper;

import com.simpleteen.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserMapper {
    public User queryUserByName(String name);
}
~~~

### 7.5增加UserMapper.xml

/resources/mybatis/mapper/UserMapper.xml

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.simpleteen.mapper.UserMapper">
    <select id="queryUserByName" parameterType="String" resultType="User">
        select * from user where name=#{name}
    </select>
</mapper>
~~~

### 7.6增加UserService

/simpleteen/service/UserService

~~~java
package com.simpleteen.service;

import com.simpleteen.pojo.User;

public interface UserService {
    public User queryUserByName(String name);
}
~~~

### 7.6增加UserServiceImpl

/simpleteen/service/UserServiceImpl

~~~java
@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;
    @Override
    public User queryUserByName(String name) {
        return userMapper.queryUserByName(name);
    }
}
~~~

### 7.7测试

~~~java
@SpringBootTest
class Springboot07ShiroApplicationTests {

    @Autowired
    private UserServiceImpl userService;

    @Test
    void contextLoads() {
        System.out.println(userService.queryUserByName("shen"));
    }

}
~~~

### 7.8修改UserRealm

~~~java
    @Autowired
    private UserServiceImpl userService;

    //认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        System.out.println("执行了认证=>AuthenticationInfo");

        UsernamePasswordToken token = (UsernamePasswordToken) authenticationToken;

        //用户名、密码 数据库中取
        User user = userService.queryUserByName(token.getUsername());
        if(user==null){
            //没有这个人
            //抛出异常 UnknownAccountException
            return null;
        }

        //密码认证，shiro做~，加密了
        return new SimpleAuthenticationInfo("",user.getPwd(),"");
    }
~~~

然后再测试查看，OK

## 8.Shiro请求授权实现

### 8.1修改Shiroonfig

~~~java
    //ShiroFilterFactoryBean 第三步
    @Bean
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(@Qualifier("getDefaultWebSecurityManager") DefaultWebSecurityManager defaultWebSecurityManager){
        ShiroFilterFactoryBean bean = new ShiroFilterFactoryBean();
        //设置安全管理器
        bean.setSecurityManager(defaultWebSecurityManager);

        //添加Shiro的内置过滤器
        /*
        * anon:无需认证就可以访问
        * authc:必须认证了才能访问
        * user:必须拥有 记住我功能才能用
        * perms:拥有对某个资源的权限才能访问
        * role:拥有某个角色权限才能访问
        * */

        LinkedHashMap<String, String> filterMap = new LinkedHashMap<>();

        //授权，正常的情况下，没有授权跳转到未授权页面
        filterMap.put("/user/add","perms[user:add]");
        //filterMap.put("/user/update","authc");
        filterMap.put("/user/*","authc");

        bean.setFilterChainDefinitionMap(filterMap);

        //设置登录的请求
        bean.setLoginUrl("/toLogin");
        //未授权页面
        bean.setUnauthorizedUrl("/noauth");

        return bean;
    }
~~~

### 8.2增加未授权跳转

~~~java
    @RequestMapping("/noauth")
    @ResponseBody
    public String unauthorized(){
        return "未经授权,无法访问此页面";
    }
~~~

### 8.3测试

登录之后，可以正常进入update，但是访问add页面时跳到未授权页面

### 8.4修改UserRealm

~~~java
    //授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        System.out.println("执行了授权=>AuthorizationInfo");

        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
        info.addStringPermission("user:add");
        
        return info;
    }
~~~

### 8.5再测试

登录之后，可以正常进入add页面

### 8.6真实业务

我们不是需要每个人都赋予权限，而是应该在数据库中赋予权限，我们从数据库中查询，于是我们可以在数据库中增减一个字段perms！！！

在认证里面传递user

`return new SimpleAuthenticationInfo(user,user.getPwd(),"");`

在授权里面拿到当前登录的这个对象

`Subject subject = SecurityUtils.getSubject();`

拿到User对象

`User currentUser = (User)subject.getPrincipal();`

设置当前用户的权限

`info.addStringPermissions(currentUser.getPerms())`

## 9.Shiro整合thymeleaf

### 9.1导入依赖

~~~xml
        <!--shiro-thymeleaf-->
        <dependency>
            <groupId>com.github.theborakompanioni</groupId>
            <artifactId>thymeleaf-extras-shiro</artifactId>
            <version>2.0.0</version>
        </dependency>
~~~

### 9.2修改ShiroConfig

~~~java
    //整合ShiroDialect：用来整合shiro thymeleaf
    @Bean
    public ShiroDialect getShiroDialect(){
        return new ShiroDialect();
    }
~~~

### 9.3修改首页

~~~html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org"
                xmlns:shiro="http://www.thymeleaf.org/thymeleaf-extras-shiro">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>首页</h1>
<div th:if="session.loginUser==null">
    <a th:href="@{/toLogin}">登录</a>
</div>

<p th:text="${{msg}}"></p>
<div shiro:hasPermission="user:add">
    <a th:href="@{/user/add}">add</a>
</div>

<div shiro:hasPermission="user:update">
    <a th:href="@{/user/update}">update</a>
</div>
</body>
</html>
~~~

### 9.4修改UserRealm

~~~java
    //认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        System.out.println("执行了认证=>AuthenticationInfo");

        UsernamePasswordToken token = (UsernamePasswordToken) authenticationToken;

        //用户名、密码 数据库中取
        User user = userService.queryUserByName(token.getUsername());
        if(user==null){
            //没有这个人
            //抛出异常 UnknownAccountException
            return null;
        }

        Subject currentSubject = SecurityUtils.getSubject();
        Session session = currentSubject.getSession();
        session.setAttribute("loginUser",user);

        //密码认证，shiro做~
        return new SimpleAuthenticationInfo("",user.getPwd(),"");
    }
~~~

### 9.5测试

显示正常！！！
