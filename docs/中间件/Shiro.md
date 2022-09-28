# Shiro

官方网址：http://shiro.apache.org/

## 概念

> 功能

- Authentication：身份认证、登录，验证用户是不是拥有相应的身份
- Authorization：授权，即权限验证，验证某个已认证的用户是否拥有某个权限，即判断用户能否进行什么操作
- Session Manager:会话管理，即用户登录后就是第一次会话，在没有退出之前，它的所有信息都在会话中；会话可以是普通的JavaSE缓解，也可以是Web环境
- Cryptography：加密，保护数据的安全性，如密码加密存储到数据库中，而不是明文存储
- Web Support：Web支持，可以非常容易地集成Web环境
- Caching：缓存，比如用户登录后，其用户信息，拥有的角色，权限不必每次去查，这样可以提高效率
- Concurrency：Shiro支持多线程应用程序的并发验证，即，如在一个线程中开启另一个线程，能把权限自动的传播过去
- Testing：提供测试支持
- Run As：允许一个用户假装为另外一个用户（如果他们允许)的身份进行访问
- Remember Me:记住我，这个是非常常见的功能，即一次登录后，下次载来的话不用登录了

> Shiro架构（外部）

从外部来看Shiro，即从应用程序角度来观察如何使用shiro完成工作：

- Subject：即“当前操作用户”。但是，在Shiro中，Subject这一概念并不仅仅指人，也可以是第三方进程、后台帐户（Daemon Account）或其他类似事物。

- SecurityManager：它是Shiro框架的核心，典型的[Facade模式](https://baike.baidu.com/item/Facade模式/7557140)，Shiro通过SecurityManager来管理内部组件实例，并通过它来提供安全管理的各种服务。

- Realm： Realm充当了Shiro与应用安全数据间的“桥梁”或者“连接器”。也就是说，当对用户执行认证（登录）和授权（访问控制）验证时，Shiro会从应用配置的Realm中查找用户及其权限信息。

> Shiro架构（内部）

- 它仅仅意味着“当前跟软件交互的东西”。Subject代表了当前用户的安全操作，SecurityManager则管理所有用户的安全操作。

- 从这个意义上讲，Realm实质上是一个安全相关的DAO：它封装了数据源的连接细节，并在需要时将相关数据提供给Shiro。当配置Shiro时，你必须至少指定一个Realm，用于认证和（或）授权。配置多个Realm是可以的，但是至少需要一个。

- Shiro内置了可以连接大量安全数据源（又名目录）的Realm，如LDAP、关系数据库（JDBC）、类似INI的文本配置资源以及属性文件等。如果系统默认的Realm不能满足需求，你还可以插入代表自定义数据源的自己的Realm实现。

## 快速开始

> Shiro环境搭建

**导入依赖**

```xml
<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-spring</artifactId>
    <version>1.4.1</version>
</dependency>
```

**自定义UserRole**

```java
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
```

**编写配置类**

```java
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
```

**编写控制层**

```java
@RestController
public class HelloController {

    @RequestMapping("/hello")
    public String hello() {
        return "Hello World !";
    }

    @RequestMapping({"/","/index"})
    public String toIndex(){
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

    @RequestMapping("/toLogin")
    public String toLogin(){
        return "login";
    }
}
```

> Shiro实现登录拦截

```java
//ShiroFilterFactoryBean 第三步
@Bean
public ShiroFilterFactoryBean getShiroFilterFactoryBean(@Qualifier("getDefaultWebSecurityManager") DefaultWebSecurityManager defaultWebSecurityManager){
    ShiroFilterFactoryBean bean = new ShiroFilterFactoryBean();
    //设置安全管理器
    bean.setSecurityManager(defaultWebSecurityManager);

    //添加Shiro的内置过滤器
    LinkedHashMap<String, String> filterMap = new LinkedHashMap<>();
    filterMap.put("/user/*","authc");

    bean.setFilterChainDefinitionMap(filterMap);

    //设置登录的请求
    bean.setLoginUrl("/toLogin");
    return bean;
}
```

说明：

 * anon:无需认证就可以访问
 * authc:必须认证了才能访问
 * user:必须拥有 记住我功能才能用
 * perms:拥有对某个资源的权限才能访问
 * role:拥有某个角色权限才能访问

> Shiro实现用户认证

**修改UserRealm**

```java
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
```

> Shiro整合Mybatis

**添加依赖**

```xml
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
```

