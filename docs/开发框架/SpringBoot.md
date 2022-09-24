# SpringBoot

官方网址：[Spring Boot](https://spring.io/projects/spring-boot)

最高奥义：简化开发，约定大于配置

## 快速开始

> Spring Initializr源地址

官方：https://start.spring.io/

阿里：https://start.aliyun.com

> 步骤

1、创建一个新项目`FIle`==>`New`==>`Project`

2、选择`spring initalizr` ，`Server URL`可以使用阿里源地址代替默认官方

3、填写项目信息`Name`、`Location`、`Language`、`Type`、`Group`、`Articfact`、`Package name`、`Project SDK`、`Java`、`Packaging`==>Next

4、选择初始化的组件`Spring Boot`、`dependecies/Web/Spring Web`==>`Finish`

> 编写Controller

```java
@RestController
public class HelloController {

    @RequestMapping("/hello")
    public String hello() {
        return "Hello World ！";
    }
}
```

说明：

​	一定要在主程序`XxxApplication`的同级目录下，新建controller包，否则识别不到

> 启动测试

启动`XxxApplication`的`Main`方法，访问测试！

> 打包问题

跳过测试用例Maven命令：

- `mvn clean install -Dmaven.skip.test=true`：不执行测试用例，但是编译测试用例类。
  - `mvn clean install -DskipTests`

- `mvn clean install -Dmaven.test.skip=true`：不执行测试用例，也不编译测试用例类。

> 启动彩蛋

在 resources 目录下新建一个banner.txt

在线生成工具：https://www.bootschool.net/ascii

举个栗子：

```txt
${AnsiColor.BRIGHT_BLUE}
////////////////////////////////////////////////////////////////////
//                          _ooOoo_                               //
//                         o8888888o                              //
//                         88" . "88                              //
//                         (| ^_^ |)                              //
//                         O\  =  /O                              //
//                      ____/`---'\____                           //
//                    .'  \\|     |//  `.                         //
//                   /  \\|||  :  |||//  \                        //
//                  /  _||||| -:- |||||-  \                       //
//                  |   | \\\  -  /// |   |                       //
//                  | \_|  ''\---/''  |   |                       //
//                  \  .-\__  `-`  ___/-. /                       //
//                ___`. .'  /--.--\  `. . ___                     //
//              ."" '<  `.___\_<|>_/___.'  >'"".                  //
//            | | :  `- \`.;`\ _ /`;.`/ - ` : | |                 //
//            \  \ `-.   \_ __\ /__ _/   .-` /  /                 //
//      ========`-.____`-.___\_____/___.-`____.-'========         //
//                           `=---='                              //
//      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^        //
//              佛祖保佑       永无BUG     永不修改                  //
//      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^        //
```

## 原理探究

### pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <!-- 基本信息 -->
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo</name>
    <description>demo</description>

    <!-- 属性参数 -->
    <properties>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <spring-boot.version>2.3.7.RELEASE</spring-boot.version>
    </properties>

    <!-- 依赖集合 -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>

    <!-- 依赖管理 -->
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <!-- 打包插件 -->
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.3.7.RELEASE</version>
                <configuration>
                    <mainClass>com.example.demo.DemoApplication</mainClass>
                </configuration>
                <executions>
                    <execution>
                        <id>repackage</id>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

</project>
```

> 父依赖

在依赖管理里面点进去，这里才是真正管理SpringBoot应用里面所有依赖版本的地方，SpringBoot的版本控制中心。

后续导入依赖默认是不需要写版本；但是如果导入的包没有在依赖中管理着就需要手动配置版本了。

> 启动器

SpringBoot将所有的功能场景都抽取出来，做成一个个的starter （启动器），只需要在项目中引入这些starter即可，所有相关的依赖都会导入进来。我们要用什么功能就导入什么样的场景启动器即可，未来也可以自己自定义 starter。

**spring-boot-starter-xxx**：就是spring-boot的场景启动器

**spring-boot-starter-web**：帮我们导入了web模块正常运行所依赖的组件

### 主启动类

> XxxApplication

```java
//@SpringBootApplication用来标注一个主程序类
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        // 原本以为启动了一个方法，实际启动了一个服务 
        SpringApplication.run(DemoApplication.class, args);
    }

}
```

#### @SpringBootApplication

作用：标注在某个类上说明这个类是SpringBoot的主配置类

SpringBoot就应该运行这个类的main方法来启动SpringBoot应用

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(
    excludeFilters = {@Filter(
    type = FilterType.CUSTOM,
    classes = {TypeExcludeFilter.class}
), @Filter(
    type = FilterType.CUSTOM,
    classes = {AutoConfigurationExcludeFilter.class}
)}
)
public @interface SpringBootApplication {
    @AliasFor(
        annotation = EnableAutoConfiguration.class
    )
    Class<?>[] exclude() default {};

    @AliasFor(
        annotation = EnableAutoConfiguration.class
    )
    String[] excludeName() default {};

    @AliasFor(
        annotation = ComponentScan.class,
        attribute = "basePackages"
    )
    String[] scanBasePackages() default {};

    @AliasFor(
        annotation = ComponentScan.class,
        attribute = "basePackageClasses"
    )
    Class<?>[] scanBasePackageClasses() default {};

    @AliasFor(
        annotation = ComponentScan.class,
        attribute = "nameGenerator"
    )
    Class<? extends BeanNameGenerator> nameGenerator() default BeanNameGenerator.class;

    @AliasFor(
        annotation = Configuration.class
    )
    boolean proxyBeanMethods() default true;
}
```

#### @ComponentScan

这个注解在Spring中很重要 ,它对应XML配置中的元素。

作用：自动扫描并加载符合条件的组件或者bean ， 将这个bean定义加载到IOC容器中

#### @SpringBootConfiguration

作用：SpringBoot的配置类 ，标注在某个类上 ， 表示这是一个SpringBoot的配置类；

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Configuration
public @interface SpringBootConfiguration {
    @AliasFor(
        annotation = Configuration.class
    )
    boolean proxyBeanMethods() default true;
}
```

说明：

- @Target，作用是描述注解的使用范围

- @Retention，作用是定义被它所注解的注解保留多久

- **@**Documented，作用是说明这个注解应该被 javadoc工具记录

- @Configuration，作用是说明这是一个配置类 ，配置类就是对应Spring的xml 配置文件；

> @Configuration

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Configuration {
    @AliasFor(
        annotation = Component.class
    )
    String value() default "";

    boolean proxyBeanMethods() default true;
}
```

说明：

- @Component 这就说明，启动类本身也是Spring中的一个组件而已，负责启动应用！

#### @EnableAutoConfiguration

作用：开启自动配置功能

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import({AutoConfigurationImportSelector.class})
public @interface EnableAutoConfiguration {
    String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";

    Class<?>[] exclude() default {};

    String[] excludeName() default {};
}
```

说明：

- @Inherited，作用是说明其子类也会继承这个注解
- @AutoConfigurationPackage，作用是自动配置包
- @Import，作用是可以帮助我们把普通的类定义为Bean

>@AutoConfigurationPackage

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Import({Registrar.class})
public @interface AutoConfigurationPackage {
    String[] basePackages() default {};

    Class<?>[] basePackageClasses() default {};
}
```

> @Import({Registrar.class})

Registrar.class，作用是将主启动类的所在包及包下面所有子包里面的所有组件扫描到Spring容器 


```
static class Registrar implements ImportBeanDefinitionRegistrar, DeterminableImports {
    Registrar() {
    }

    public void registerBeanDefinitions(AnnotationMetadata metadata, BeanDefinitionRegistry registry) {
        AutoConfigurationPackages.register(registry, (String[])(new AutoConfigurationPackages.PackageImports(metadata)).getPackageNames().toArray(new String[0]));
    }

    public Set<Object> determineImports(AnnotationMetadata metadata) {
        return Collections.singleton(new AutoConfigurationPackages.PackageImports(metadata));
    }
}
```

>@Import({AutoConfigurationImportSelector.class})

AutoConfigurationImportSelector，作用是自动配置导入选择器

**getCandidateConfigurations()**

```java
// 获得候选的配置
protected List<String> getCandidateConfigurations(AnnotationMetadata metadata, AnnotationAttributes attributes) {
    // 这里的getSpringFactoriesLoaderFactoryClass()方法，返回的就是最开始看的启动自动导入配置文件的注解类：EnableAutoConfiguration 
    List<String> configurations = SpringFactoriesLoader.loadFactoryNames(this.getSpringFactoriesLoaderFactoryClass(), this.getBeanClassLoader());
    Assert.notEmpty(configurations, "No auto configuration classes found in META-INF/spring.factories. If you are using a custom packaging, make sure that file is correct.");
    return configurations;
}
```

**loadFactoryNames()** 

```java
public static List<String> loadFactoryNames(Class<?> factoryType, @Nullable ClassLoader classLoader) {
String factoryTypeName = factoryType.getName();
// 这里它又调用了 loadSpringFactories 方法
return (List)loadSpringFactories(classLoader).getOrDefault(factoryTypeName, Collections.emptyList());
}
```

**loadSpringFactories()**

```java
private static Map<String, List<String>> loadSpringFactories(@Nullable ClassLoader classLoader) {
    // 获得classLoader，我们返回可以看到这里得到的就是EnableAutoConfiguration标注的类本身
    MultiValueMap<String, String> result = (MultiValueMap)cache.get(classLoader);
    if (result != null) {
        return result;
    } else {
        try {
            // 去获取一个资源 "META-INF/spring.factories"
            Enumeration<URL> urls = classLoader != null ? classLoader.getResources("META-INF/spring.factories") : ClassLoader.getSystemResources("META-INF/spring.factories");
            LinkedMultiValueMap result = new LinkedMultiValueMap();
			// 将读取到的资源遍历，封装成为一个Properties
            while(urls.hasMoreElements()) {
                URL url = (URL)urls.nextElement();
                UrlResource resource = new UrlResource(url);
                Properties properties = PropertiesLoaderUtils.loadProperties(resource);
                Iterator var6 = properties.entrySet().iterator();

                while(var6.hasNext()) {
                    Entry<?, ?> entry = (Entry)var6.next();
                    String factoryTypeName = ((String)entry.getKey()).trim();
                    String[] var9 = StringUtils.commaDelimitedListToStringArray((String)entry.getValue());
                    int var10 = var9.length;

                    for(int var11 = 0; var11 < var10; ++var11) {
                        String factoryImplementationName = var9[var11];
                        result.add(factoryTypeName, factoryImplementationName.trim());
                    }
                }
            }

            cache.put(classLoader, result);
            return result;
        } catch (IOException var13) {
            throw new IllegalArgumentException("Unable to load factories from location [META-INF/spring.factories]", var13);
        }
    }
}
```

#### spring.factories

`spring-boot-autoconfigure-2.5.7.jar/META-INF/spring.factories`

spring.factories,看到了很多自动配置的文件,这就是自动配置根源所在！

```
# Initializers
org.springframework.context.ApplicationContextInitializer=\
org.springframework.boot.autoconfigure.SharedMetadataReaderFactoryContextInitializer,\
org.springframework.boot.autoconfigure.logging.ConditionEvaluationReportLoggingListener

# Application Listeners
org.springframework.context.ApplicationListener=\
org.springframework.boot.autoconfigure.BackgroundPreinitializer

# Auto Configuration Import Listeners
org.springframework.boot.autoconfigure.AutoConfigurationImportListener=\
org.springframework.boot.autoconfigure.condition.ConditionEvaluationReportAutoConfigurationImportListener

# Auto Configuration Import Filters
org.springframework.boot.autoconfigure.AutoConfigurationImportFilter=\
org.springframework.boot.autoconfigure.condition.OnBeanCondition,\
org.springframework.boot.autoconfigure.condition.OnClassCondition,\
org.springframework.boot.autoconfigure.condition.OnWebApplicationCondition

# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration,\
org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration,\
org.springframework.boot.autoconfigure.batch.BatchAutoConfiguration,\
org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration,\
org.springframework.boot.autoconfigure.cassandra.CassandraAutoConfiguration,\
org.springframework.boot.autoconfigure.context.ConfigurationPropertiesAutoConfiguration,\
org.springframework.boot.autoconfigure.context.LifecycleAutoConfiguration,\
org.springframework.boot.autoconfigure.context.MessageSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.context.PropertyPlaceholderAutoConfiguration,\
org.springframework.boot.autoconfigure.couchbase.CouchbaseAutoConfiguration,\
org.springframework.boot.autoconfigure.dao.PersistenceExceptionTranslationAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraReactiveDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraReactiveRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseReactiveDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseReactiveRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ReactiveElasticsearchRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ReactiveElasticsearchRestClientAutoConfiguration,\
org.springframework.boot.autoconfigure.data.jdbc.JdbcRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.ldap.LdapRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoReactiveDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoReactiveRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.neo4j.Neo4jDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.neo4j.Neo4jRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.solr.SolrRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.r2dbc.R2dbcDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.r2dbc.R2dbcRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.r2dbc.R2dbcTransactionManagerAutoConfiguration,\
org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration,\
org.springframework.boot.autoconfigure.data.redis.RedisReactiveAutoConfiguration,\
org.springframework.boot.autoconfigure.data.redis.RedisRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.rest.RepositoryRestMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.data.web.SpringDataWebAutoConfiguration,\
org.springframework.boot.autoconfigure.elasticsearch.ElasticsearchRestClientAutoConfiguration,\
org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration,\
org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration,\
org.springframework.boot.autoconfigure.groovy.template.GroovyTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.gson.GsonAutoConfiguration,\
org.springframework.boot.autoconfigure.h2.H2ConsoleAutoConfiguration,\
org.springframework.boot.autoconfigure.hateoas.HypermediaAutoConfiguration,\
org.springframework.boot.autoconfigure.hazelcast.HazelcastAutoConfiguration,\
org.springframework.boot.autoconfigure.hazelcast.HazelcastJpaDependencyAutoConfiguration,\
org.springframework.boot.autoconfigure.http.HttpMessageConvertersAutoConfiguration,\
org.springframework.boot.autoconfigure.http.codec.CodecsAutoConfiguration,\
org.springframework.boot.autoconfigure.influx.InfluxDbAutoConfiguration,\
org.springframework.boot.autoconfigure.info.ProjectInfoAutoConfiguration,\
org.springframework.boot.autoconfigure.integration.IntegrationAutoConfiguration,\
org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.JndiDataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.XADataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.JmsAutoConfiguration,\
org.springframework.boot.autoconfigure.jmx.JmxAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.JndiConnectionFactoryAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.activemq.ActiveMQAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.artemis.ArtemisAutoConfiguration,\
org.springframework.boot.autoconfigure.jersey.JerseyAutoConfiguration,\
org.springframework.boot.autoconfigure.jooq.JooqAutoConfiguration,\
org.springframework.boot.autoconfigure.jsonb.JsonbAutoConfiguration,\
org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration,\
org.springframework.boot.autoconfigure.availability.ApplicationAvailabilityAutoConfiguration,\
org.springframework.boot.autoconfigure.ldap.embedded.EmbeddedLdapAutoConfiguration,\
org.springframework.boot.autoconfigure.ldap.LdapAutoConfiguration,\
org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration,\
org.springframework.boot.autoconfigure.mail.MailSenderAutoConfiguration,\
org.springframework.boot.autoconfigure.mail.MailSenderValidatorAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.MongoReactiveAutoConfiguration,\
org.springframework.boot.autoconfigure.mustache.MustacheAutoConfiguration,\
org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration,\
org.springframework.boot.autoconfigure.quartz.QuartzAutoConfiguration,\
org.springframework.boot.autoconfigure.r2dbc.R2dbcAutoConfiguration,\
org.springframework.boot.autoconfigure.rsocket.RSocketMessagingAutoConfiguration,\
org.springframework.boot.autoconfigure.rsocket.RSocketRequesterAutoConfiguration,\
org.springframework.boot.autoconfigure.rsocket.RSocketServerAutoConfiguration,\
org.springframework.boot.autoconfigure.rsocket.RSocketStrategiesAutoConfiguration,\
org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration,\
org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration,\
org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration,\
org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration,\
org.springframework.boot.autoconfigure.security.reactive.ReactiveUserDetailsServiceAutoConfiguration,\
org.springframework.boot.autoconfigure.security.rsocket.RSocketSecurityAutoConfiguration,\
org.springframework.boot.autoconfigure.security.saml2.Saml2RelyingPartyAutoConfiguration,\
org.springframework.boot.autoconfigure.sendgrid.SendGridAutoConfiguration,\
org.springframework.boot.autoconfigure.session.SessionAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.client.servlet.OAuth2ClientAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.client.reactive.ReactiveOAuth2ClientAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.resource.servlet.OAuth2ResourceServerAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.resource.reactive.ReactiveOAuth2ResourceServerAutoConfiguration,\
org.springframework.boot.autoconfigure.solr.SolrAutoConfiguration,\
org.springframework.boot.autoconfigure.task.TaskExecutionAutoConfiguration,\
org.springframework.boot.autoconfigure.task.TaskSchedulingAutoConfiguration,\
org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration,\
org.springframework.boot.autoconfigure.transaction.TransactionAutoConfiguration,\
org.springframework.boot.autoconfigure.transaction.jta.JtaAutoConfiguration,\
org.springframework.boot.autoconfigure.validation.ValidationAutoConfiguration,\
org.springframework.boot.autoconfigure.web.client.RestTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.web.embedded.EmbeddedWebServerFactoryCustomizerAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.HttpHandlerAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.ReactiveWebServerFactoryAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.WebFluxAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.error.ErrorWebFluxAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.function.client.ClientHttpConnectorAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.function.client.WebClientAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.ServletWebServerFactoryAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.HttpEncodingAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.websocket.reactive.WebSocketReactiveAutoConfiguration,\
org.springframework.boot.autoconfigure.websocket.servlet.WebSocketServletAutoConfiguration,\
org.springframework.boot.autoconfigure.websocket.servlet.WebSocketMessagingAutoConfiguration,\
org.springframework.boot.autoconfigure.webservices.WebServicesAutoConfiguration,\
org.springframework.boot.autoconfigure.webservices.client.WebServiceTemplateAutoConfiguration

# Failure analyzers
org.springframework.boot.diagnostics.FailureAnalyzer=\
org.springframework.boot.autoconfigure.data.redis.RedisUrlSyntaxFailureAnalyzer,\
org.springframework.boot.autoconfigure.diagnostics.analyzer.NoSuchBeanDefinitionFailureAnalyzer,\
org.springframework.boot.autoconfigure.flyway.FlywayMigrationScriptMissingFailureAnalyzer,\
org.springframework.boot.autoconfigure.jdbc.DataSourceBeanCreationFailureAnalyzer,\
org.springframework.boot.autoconfigure.jdbc.HikariDriverConfigurationFailureAnalyzer,\
org.springframework.boot.autoconfigure.r2dbc.ConnectionFactoryBeanCreationFailureAnalyzer,\
org.springframework.boot.autoconfigure.session.NonUniqueSessionRepositoryFailureAnalyzer

# Template availability providers
org.springframework.boot.autoconfigure.template.TemplateAvailabilityProvider=\
org.springframework.boot.autoconfigure.freemarker.FreeMarkerTemplateAvailabilityProvider,\
org.springframework.boot.autoconfigure.mustache.MustacheTemplateAvailabilityProvider,\
org.springframework.boot.autoconfigure.groovy.template.GroovyTemplateAvailabilityProvider,\
org.springframework.boot.autoconfigure.thymeleaf.ThymeleafTemplateAvailabilityProvider,\
org.springframework.boot.autoconfigure.web.servlet.JspTemplateAvailabilityProvider
```

> WebMvcAutoConfiguration

举个栗子：**WebMvcAutoConfiguration**

```java
@Configuration(
    proxyBeanMethods = false
)
@ConditionalOnWebApplication(
    type = Type.SERVLET
)
@ConditionalOnClass({Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class})
@ConditionalOnMissingBean({WebMvcConfigurationSupport.class})
@AutoConfigureOrder(-2147483638)
@AutoConfigureAfter({DispatcherServletAutoConfiguration.class, TaskExecutionAutoConfiguration.class, ValidationAutoConfiguration.class})
public class WebMvcAutoConfiguration {
    public static final String DEFAULT_PREFIX = "";
    public static final String DEFAULT_SUFFIX = "";
    private static final String[] SERVLET_LOCATIONS = new String[]{"/"};

    public WebMvcAutoConfiguration() {
    }

    @Bean
    @ConditionalOnMissingBean({HiddenHttpMethodFilter.class})
    @ConditionalOnProperty(
        prefix = "spring.mvc.hiddenmethod.filter",
        name = {"enabled"},
        matchIfMissing = false
    )
    public OrderedHiddenHttpMethodFilter hiddenHttpMethodFilter() {
        return new OrderedHiddenHttpMethodFilter();
    }

    // ......

}
```

可以看到这些一个个的都是JavaConfig配置类，而且都注入了一些Bean，可以找一些自己认识的类，看着熟悉一下！

所以，自动配置真正实现是从classpath中搜寻所有的META-INF/spring.factories配置文件 ，并将其中对应的 `org.springframework.boot.autoconfigure`包下的配置项，通过反射实例化为对应标注了`@Configuration`的JavaConfig形式的IOC容器配置类 ， 然后将这些都汇总成为一个实例并加载到IOC容器中。

#### 自动配置

1. SpringBoot在启动的时候从类路径下的META-INF/spring.factories中获取EnableAutoConfiguration指定的值
2. 将这些值作为自动配置类导入容器 ， 自动配置类就生效 ， 帮我们进行自动配置工作；
3. 整个J2EE的整体解决方案和自动配置都在springboot-autoconfigure的jar包中；
4. 它会给容器中导入非常多的自动配置类 （xxxAutoConfiguration）, 就是给容器中导入这个场景需要的所有组件 ， 并配置好这些组件 ；
5. 有了自动配置类 ，免去了我们手动编写配置注入功能组件等的工作；

### Main方法

最初以为就是运行了一个main方法，没想到却开启了一个服务！

分析该方法主要分两部分，一部分是SpringApplication的实例化，二是run方法的执行。

```java
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}
```

#### SpringApplication

**这个类主要做了以下四件事情：**

1、推断应用的类型是普通的项目还是Web项目

2、查找并加载所有可用初始化器 ， 设置到initializers属性中

3、找出所有的应用程序监听器，设置到listeners属性中

4、推断并设置main方法的定义类，找到运行的主类

```java
public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources) {
    this.sources = new LinkedHashSet();
    this.bannerMode = Mode.CONSOLE;
    this.logStartupInfo = true;
    this.addCommandLineProperties = true;
    this.addConversionService = true;
    this.headless = true;
    this.registerShutdownHook = true;
    this.additionalProfiles = new HashSet();
    this.isCustomEnvironment = false;
    this.lazyInitialization = false;
    this.resourceLoader = resourceLoader;
    Assert.notNull(primarySources, "PrimarySources must not be null");
    this.primarySources = new LinkedHashSet(Arrays.asList(primarySources));
    this.webApplicationType = WebApplicationType.deduceFromClasspath();
    this.setInitializers(this.getSpringFactoriesInstances(ApplicationContextInitializer.class));
    this.setListeners(this.getSpringFactoriesInstances(ApplicationListener.class));
    this.mainApplicationClass = this.deduceMainApplicationClass();
}
```

#### run方法流程分析

![run方法流程分析](https://mmbiz.qpic.cn/mmbiz_png/uJDAUKrGC7L1vFQMnaRIJSmeZ58T2eZicjafiawQLp9u8wc4ic1Mjy6OyfibzfjVofeL5pnS1NSFKVjlIg6neI9ySg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## yaml配置

> 配置文件

**配置文件的作用 ：**修改SpringBoot自动配置的默认值，因为SpringBoot在底层都给我们自动配置好了。SpringBoot使用一个全局的配置文件 ， 配置文件名称是固定的。

- application.properties
  - 语法结构 ：key=value
- application.yml
  - 语法结构 ：key: value

举个栗子：可以在配置文件`application.properties`中修改Tomcat 默认启动的端口号！测试一下！

```
server.port=8081
```

> yaml概述

YAML是 "YAML Ain't a Markup Language" （YAML不是一种标记语言）的递归缩写。

在开发的这种语言时，YAML 的意思其实是："Yet Another Markup Language"（仍是一种标记语言）

**这种语言以数据作为中心，而不是以标记语言为重点！**

以前的配置文件，大多数都是使用xml来配置；比如一个简单的端口配置，我们来对比下yaml和xml

传统xml配置：

```xml
<server>    
    <port>8081<port>
</server>
```

yaml配置：

```yaml
server：  
	prot: 8080
```

> yaml基础语法

说明：语法要求严格！

1、空格不能省略

2、以缩进来控制层级关系，只要是左边对齐的一列数据都是同一个层级的。

3、属性和值的大小写都是十分敏感的。

**字面量：普通的值  [ 数字，布尔值，字符串  ]**

字面量直接写在后面就可以，字符串默认不用加上双引号或者单引号；

```yaml
k: v
```

注意：

- “ ” 双引号，不会转义字符串里面的特殊字符 ， 特殊字符会作为本身想表示的意思；

  比如 ：name: "javaboy \n shen"  输出 ：javaboy 换行 shen

- '' 单引号，会转义特殊字符 ， 特殊字符最终会变成和普通字符一样输出

  比如 ：name: ‘javaboy \n shen’  输出 ：javaboy \n shen

**对象、Map（键值对）**

```yaml
k:     
	v1:    
	v2:
```

在下一行来写对象的属性和值得关系，注意缩进！

```YAML
student:    
	name: javaboy    
	age: 25
```

行内写法

```yaml
student: {name:javaboy,age: 25}
```

**数组（ List、set ）**

用 - 值表示数组中的一个元素,比如：

```
pets: 
- cat 
- dog
- pig
```

行内写法

```
pets: [cat,dog,pig]
```

**修改SpringBoot的默认端口号**

配置文件中添加，端口号的参数，就可以切换端口；

```yaml
server:  
	port: 8082
```

> yaml注入配置文件

yaml文件更强大的地方在于，它可以给我们的实体类直接注入匹配值！

步骤：

1. 在springboot项目中的resources目录下新建一个文件 application.yml

2. 构建实体类

   ```java
   @Data
   @AllArgsConstructor
   @NoArgsConstructor
   // 注册bean到容器中
   @Component 
   public class Person {    
       private String name;    
       private Integer age;    
       private Boolean happy;    
       private Date birth;    
       private Map<String,Object> maps;    
       private List<Object> lists;    
       private Dog dog;        
   }
   ```

3. 编写yaml注入

   ```yaml
   person:  
   	name: javaboy  
   	age: 25
   	happy: false  
   	birth: 2000/01/01  
   	maps: {k1: v1,k2: v2}  
   	lists:   
   		- code   
   		- girl   
   		- music  
   	dog:    
   		name: 旺财    
   		age: 1
   ```

4. 绑定注入

   ```java
   @Data
   @AllArgsConstructor
   @NoArgsConstructor
   // 注册bean到容器中
   @Component 
   @ConfigurationProperties(prefix = "person")
   public class Person {    
       private String name;    
       private Integer age;    
       private Boolean happy;    
       private Date birth;    
       private Map<String,Object> maps;    
       private List<Object> lists;    
       private Dog dog;
   }
   
   
   ```

   @ConfigurationProperties作用

   - 将配置文件中配置的每一个属性的值，映射到这个组件中
   - 告诉SpringBoot将本类中的所有属性和配置文件中相关的配置进行绑定参数 prefix = “person” :
   - 将配置文件中的person下面的所有属性一一对应

5. 导入依赖

   ```xml
   <!-- 导入配置文件处理器，配置文件进行绑定就会有提示，需要重启 -->
   <dependency>  
       <groupId>org.springframework.boot</groupId>  
       <artifactId>spring-boot-configuration-processor</artifactId>  
       <optional>true</optional>
   </dependency>
   ```

>加载指定的配置文件

- **@PropertySource ：**加载指定的配置文件,比如：`@PropertySource(value = "classpath:person.properties")`

- **@configurationProperties**：默认从全局配置文件中获取值

> 配置文件占位符

- 随机uuid:`${random.uuid}` 
- 随机int: `${random.int}` 

> 对比

|                      | @ConfigurationProperties | @Value     |
| -------------------- | ------------------------ | ---------- |
| 功能                 | 批量注入配置文件中的属性 | 一个个指定 |
| 松散绑定（松散语法） | 支持                     | 不支持     |
| SpEL                 | 不支持                   | 支持       |
| JSR303数据校验       | 支持                     | 不支持     |
| 复杂类型封装         | 支持                     | 不支持     |

1、@ConfigurationProperties只需要写一次即可，@Value则需要每个字段都添加

2、松散绑定：比如我的yml中写的last-name，这个和lastName是一样的， - 后面跟着的字母默认是大写的，这就是松散绑定。

3、JSR303数据校验，这个就是我们可以在字段是增加一层过滤器验证，可以保证数据的合法性

4、复杂类型封装，yml中可以封装对象，使用value就不支持

> 结论

- 配置yml和配置properties都可以获取到值，强烈推荐yml；

- 如果我们在某个业务中，只需要获取配置文件中的某个值，可以使用一下@value；

- 如果说，我们专门编写了一个JavaBean来和配置文件进行一一映射，就直接@configurationProperties，不要犹豫！

## JSR303数据校验

Springboot中可以用@validated来校验数据，可以保证数据的正确性,如果数据异常则会统一抛出异常，方便异常中心统一处理。

举个例子：

- 实体类上添加`@Validated`
- 邮件字段上添加`@Email(message="邮箱格式错误")`

> 常见参数

**空检查**

- @Null：验证对象是否为null
- @NotNull：验证对象是否不为null, 无法查检长度为0的字符串
- @NotBlank：检查约束字符串是不是Null还有被Trim的长度是否大于0,只对字符串,且会去掉前后空格
- @NotEmpty：检查约束元素是否为NULL或者是EMPTY

**Booelan检查**

- @AssertTrue：验证 Boolean 对象是否为 true
- @AssertFalse：验证 Boolean 对象是否为 false   

**长度检查**

- @Size(min=, max=) 验证对象（Array,Collection,Map,String）长度是否在给定的范围之内
- @Length(min=, max=) string is between min and max included.

**日期检查**

- @Past：验证 Date 和 Calendar 对象是否在当前时间之前
- @Future：验证 Date 和 Calendar 对象是否在当前时间之后 
- @Pattern：验证 String 对象是否符合正则表达式的规则

## 多环境切换

profile是Spring对不同环境提供不同配置功能的支持，可以通过激活不同的环境版本，实现快速切换环境！

> 多配置文件

在主配置文件编写的时候，文件名可以是 application-{profile}.properties/yml , 用来指定多个环境版本

举个栗子：

- application-test.properties 代表测试环境配置

- application-dev.properties 代表开发环境配置

- Springboot并不会直接启动这些配置文件，它默认使用application.properties主配置文件

  ```
  spring.profiles.active=dev
  ```

>yaml的多文档块

```yaml
server:  
	port: 8081
	#选择要激活那个环境块
spring:  
	profiles:    
		active: prod
---
server: 
	port: 8083
spring:  
	profiles: dev #配置环境的名称

---
server:  
	port: 8084
spring:  
	profiles: prod  #配置环境的名称
```

> 配置文件加载位置

**外部加载配置文件的方式十分多，我们选择最常用的即可，在开发的资源文件中进行配置！**

springboot 启动会扫描以下位置的application.properties或者application.yml文件作为Spring boot的默认配置文件：

```text
优先级1：项目路径下的config文件夹配置文件
优先级2：项目路径下配置文件
优先级3：资源路径下的config文件夹配置文件
优先级4：资源路径下配置文件
```

优先级由高到低，高优先级的配置会覆盖低优先级的配置！SpringBoot会从这四个位置全部加载主配置文件，互补配置！

> 指定位置加载配置文件

- spring.config.location 改变默认的配置文件位置

- 使用命令行参数的形式，启动项目的时候来指定配置文件的新位置

- 相同配置，外部指定的配置文件优先级最高

```cmd
java -jar spring-boot-config.jar --spring.config.location=F:/application.properties
```

## 自动配置原理

SpringBoot官方文档中有大量的配置，我们无法全部记住!

> **HttpEncodingAutoConfiguration（Http编码自动配置）**为例解释自动配置原理

```java
// 表示这是一个配置类，和以前编写的配置文件一样，也可以给容器中添加组件；
@Configuration(
    proxyBeanMethods = false
)
@EnableConfigurationProperties({ServerProperties.class})
@ConditionalOnWebApplication(
    type = Type.SERVLET
)
@ConditionalOnClass({CharacterEncodingFilter.class})
@ConditionalOnProperty(
    prefix = "server.servlet.encoding",
    value = {"enabled"},
    matchIfMissing = true
)
public class HttpEncodingAutoConfiguration {
    // 它已经和SpringBoot的配置文件映射了    
    private final Encoding properties;

    // 只有一个有参构造器的情况下，参数的值就会从容器中拿
    public HttpEncodingAutoConfiguration(ServerProperties properties) {
        this.properties = properties.getServlet().getEncoding();
    }

    // 给容器中添加一个组件，这个组件的某些值需要从properties中获取
    @Bean
    @ConditionalOnMissingBean
    public CharacterEncodingFilter characterEncodingFilter() {
        CharacterEncodingFilter filter = new OrderedCharacterEncodingFilter();
        filter.setEncoding(this.properties.getCharset().name());
        filter.setForceRequestEncoding(this.properties.shouldForce(org.springframework.boot.web.servlet.server.Encoding.Type.REQUEST));
        filter.setForceResponseEncoding(this.properties.shouldForce(org.springframework.boot.web.servlet.server.Encoding.Type.RESPONSE));
        return filter;
    }

    @Bean
    public HttpEncodingAutoConfiguration.LocaleCharsetMappingsCustomizer localeCharsetMappingsCustomizer() {
        return new HttpEncodingAutoConfiguration.LocaleCharsetMappingsCustomizer(this.properties);
    }

    static class LocaleCharsetMappingsCustomizer implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory>, Ordered {
        private final Encoding properties;

        LocaleCharsetMappingsCustomizer(Encoding properties) {
            this.properties = properties;
        }

        public void customize(ConfigurableServletWebServerFactory factory) {
            if (this.properties.getMapping() != null) {
                factory.setLocaleCharsetMappings(this.properties.getMapping());
            }

        }

        public int getOrder() {
            return 0;
        }
    }
}

```

说明：

- `@Configuration`：表示这是一个配置类，和以前编写的配置文件一样，也可以给容器中添加组件。

- `@EnableConfigurationProperties`：启动指定类的ConfigurationProperties功能，进入这个HttpProperties查看，将配置文件中对应的值和HttpProperties绑定起来，并把HttpProperties加入到ioc容器中。
- `@ConditionalOnWebApplication`：Spring底层@Conditional注解，根据不同的条件判断，如果满足指定的条件，整个配置类里面的配置就会生效，这里的意思就是判断当前应用是否是web应用，如果是当前配置类生效。

- `@ConditionalOnClass`：判断当前项目有没有这个类CharacterEncodingFilter；SpringMVC中进行乱码解决的过滤器。

- `@ConditionalOnProperty`：判断配置文件中是否存在某个配置：spring.http.encoding.enabled；如果不存在，判断也是成立的。即使我们配置文件中不配置pring.http.encoding.enabled=true，也是默认生效的。
- `@ConditionalOnMissingBean`：判断容器没有这个组件。
- `@Configuration`：表示这是一个配置类，和以前编写的配置文件一样，也可以给容器中添加组件。

**一句话总结 ：根据当前不同的条件判断，决定这个配置类是否生效！**

- 一但这个配置类生效；这个配置类就会给容器中添加各种组件；
- 这些组件的属性是从对应的properties类中获取的，这些类里面的每一个属性又是和配置文件绑定的；
- 所有在配置文件中能配置的属性都是在xxxProperties类中封装着；
- 配置文件能配置什么就可以参照某个功能对应的这个属性类

>精髓

1、SpringBoot启动会加载大量的自动配置类。

2、我们看需要的功能有没有在SpringBoot默认写好的自动配置类当中。

3、我们再来看这个自动配置类中到底配置了哪些组件,只要我们要用的组件存在在其中，我们就不需要再手动配置了。

4、给容器中自动配置类添加组件的时候，会从properties类中获取某些属性,我们只需要在配置文件中指定这些属性的值即可。

**xxxxAutoConfigurartion：自动配置类。**

**xxxxProperties:封装配置文件中相关属性。**

> @Conditional

**自动配置类必须在一定的条件下才能生效，Spring注解版原生的@Conditional作用）**

作用：必须是@Conditional指定的条件成立，才给容器中添加组件，配置配里面的所有内容才生效！

那么多的自动配置类，必须在一定的条件下才能生效；也就是说，我们加载了这么多的配置类，但不是所有的都生效了。我们怎么知道哪些自动配置类生效？我们可以通过启用debug=true属性，开启springboot的调试类，来让控制台打印自动配置报告，这样我们就可以很方便的知道哪些自动配置类生效；

```
debug=true
```

- Positive matches:（自动配置类启用的：正匹配）

- Negative matches:（没有启动，没有匹配成功的自动配置类：负匹配）

- Unconditional classes: （没有条件的类）

## 自定义starter

启动器模块是一个 空 jar 文件，仅提供辅助性依赖管理，这些依赖可能用于自动装配或者其他类库！

>命名归约

官方命名：

- 前缀：spring-boot-starter-xxx
- 比如：spring-boot-starter-web....

自定义命名：

- xxx-spring-boot-starter
- 比如：mybatis-spring-boot-starter

> 编写启动器

1. 新建空项目：`spring-boot-starter-diy`

2. 新建普通Maven模块：`javaboy-spring-boot-starter`

3. 新建Springboot模块：`javaboy-spring-boot-starter-autoconfigure`

4. 在`starter`中导入 `autoconfigure` 的依赖

   ```xml
   <!-- 启动器 -->
   <dependencies>       
       <!--  引入自动配置模块 -->        
       <dependency>               
           <groupId>com.javaboy</groupId>               
           <artifactId>javaboy-spring-boot-starter-autoconfigure</artifactId>                
           <version>0.0.1-SNAPSHOT</version>        
       </dependency>
   </dependencies>
   ```

5. 将`autoconfigure`项目下多余的文件都删掉，pom中只留下一个 starter，这是所有的启动器基本配置！

6. 编写自己的服务

   ```java
   public class HelloService {
       HelloProperties helloProperties;
       public HelloProperties getHelloProperties() {        
           return helloProperties;    
       }
       public void setHelloProperties(HelloProperties helloProperties) {        
           this.helloProperties = helloProperties;    
       }
       public String sayHello(String name){        
           return helloProperties.getPrefix() + name + helloProperties.getSuffix();    
       }
   }
   ```

7. 编写HelloProperties配置类

   ```java
   @ConfigurationProperties(prefix = "javaboy.hello")
   public class HelloProperties {
       private String prefix;    
       private String suffix;
       public String getPrefix() {        
           return prefix;    
       }
       public void setPrefix(String prefix) {        
           this.prefix = prefix;    
       }
       public String getSuffix() {        
           return suffix;    
       }
       public void setSuffix(String suffix) {        
           this.suffix = suffix;    
       }
   }
   ```

8. 编写自动配置类并注入bean，测试！

   ```java
   @Configuration
   @ConditionalOnWebApplication
   @EnableConfigurationProperties(HelloProperties.class)
   public class HelloServiceAutoConfiguration {
       @Autowired    
       HelloProperties helloProperties;
       @Bean    
       public HelloService helloService(){        
           HelloService service = new HelloService();       
           service.setHelloProperties(helloProperties);        
           return service;    
       }
   }
   ```

9. resources编写一个META-INF\spring.factories

   ```
   Configureorg.springframework.boot.autoconfigure.EnableAutoConfiguration=\com.javaboy.HelloServiceAutoConfiguration
   ```

10. 编写完成后，可以安装到maven仓库中，`maven install`

> 启用测试

1. 新建一个SpringBoot项目

2. 导入自己写的启动器

```xml
<dependency>    
    <groupId>com.javaboy</groupId>    
    <artifactId>javaboy-spring-boot-starter</artifactId>    
    <version>1.0-SNAPSHOT</version>
</dependency>
```

3、编写一个HelloController 进行测试接口！

```java
@RestController
public class HelloController {
    @Autowired    
    HelloService helloService;
    @RequestMapping("/hello")    
    public String hello(){       
    return helloService.sayHello("zxc");    
    }
}
```

4、编写配置文件 application.properties

```
javaboy.hello.prefix="ppp"
javaboy.hello.suffix="sss"
```

5、启动项目进行测试，结果成功 !

## SpringData

Sping Data 官网：https://spring.io/projects/spring-data

对于数据访问层，无论是 SQL(关系型数据库) 还是 NOSQL(非关系型数据库)，Spring Boot 底层都是采用 Spring Data 的方式进行统一处理各种数据库，Spring Data 也是 Spring 中与 Spring Boot、Spring Cloud 等齐名的知名项目。

> 整合JDBC

1. 新建项目`springboot-data-jdbc`

2. 添加依赖：web和mysql

   ```xml
   <dependency>    
       <groupId>org.springframework.boot</groupId>    
       <artifactId>spring-boot-starter-jdbc</artifactId>
   </dependency>
   <dependency>    
       <groupId>mysql</groupId>    
       <artifactId>mysql-connector-java</artifactId>   
       <scope>runtime</scope>
   </dependency>
   ```

3. 编写yaml配置文件连接数据库

   ```yaml
   spring:  
   	datasource:    
   		username: root    
   		password: 123456    
   		url: jdbc:mysql://localhost:3306/springboot   
   		driver-class-name: com.mysql.cj.jdbc.Driver
   ```

4. 简单使用

   ```java
   @SpringBootTestclass SpringbootDataJdbcApplicationTests {    
       //DI注入数据源    
       @Autowired    
       DataSource dataSource;    
       @Test    
       public void contextLoads() throws SQLException {        
           //看一下默认数据源       
           System.out.println(dataSource.getClass());        
           //获得连接       
           Connection connection =   dataSource.getConnection();        
           System.out.println(connection);        
           //关闭连接        
           connection.close();    
       }
   }
   ```

默认配置的数据源为 : class com.zaxxer.hikari.HikariDataSource 

```java
@Configuration(
    proxyBeanMethods = false
)
@ConditionalOnClass({DataSource.class, EmbeddedDatabaseType.class})
@ConditionalOnMissingBean(
    type = {"io.r2dbc.spi.ConnectionFactory"}
)
@EnableConfigurationProperties({DataSourceProperties.class})
@Import({DataSourcePoolMetadataProvidersConfiguration.class, DataSourceInitializationConfiguration.class})
public class DataSourceAutoConfiguration {
    public DataSourceAutoConfiguration() {
    }

    static class EmbeddedDatabaseCondition extends SpringBootCondition {
        private static final String DATASOURCE_URL_PROPERTY = "spring.datasource.url";
        private final SpringBootCondition pooledCondition = new DataSourceAutoConfiguration.PooledDataSourceCondition();

        EmbeddedDatabaseCondition() {
        }

        public ConditionOutcome getMatchOutcome(ConditionContext context, AnnotatedTypeMetadata metadata) {
            Builder message = ConditionMessage.forCondition("EmbeddedDataSource", new Object[0]);
            if (this.hasDataSourceUrlProperty(context)) {
                return ConditionOutcome.noMatch(message.because("spring.datasource.url is set"));
            } else if (this.anyMatches(context, metadata, new Condition[]{this.pooledCondition})) {
                return ConditionOutcome.noMatch(message.foundExactly("supported pooled data source"));
            } else {
                EmbeddedDatabaseType type = EmbeddedDatabaseConnection.get(context.getClassLoader()).getType();
                return type == null ? ConditionOutcome.noMatch(message.didNotFind("embedded database").atAll()) : ConditionOutcome.match(message.found("embedded database").items(new Object[]{type}));
            }
        }

        private boolean hasDataSourceUrlProperty(ConditionContext context) {
            Environment environment = context.getEnvironment();
            if (environment.containsProperty("spring.datasource.url")) {
                try {
                    return StringUtils.hasText(environment.getProperty("spring.datasource.url"));
                } catch (IllegalArgumentException var4) {
                }
            }

            return false;
        }
    }

    static class PooledDataSourceAvailableCondition extends SpringBootCondition {
        PooledDataSourceAvailableCondition() {
        }

        public ConditionOutcome getMatchOutcome(ConditionContext context, AnnotatedTypeMetadata metadata) {
            Builder message = ConditionMessage.forCondition("PooledDataSource", new Object[0]);
            return DataSourceBuilder.findType(context.getClassLoader()) != null ? ConditionOutcome.match(message.foundExactly("supported DataSource")) : ConditionOutcome.noMatch(message.didNotFind("supported DataSource").atAll());
        }
    }

    static class PooledDataSourceCondition extends AnyNestedCondition {
        PooledDataSourceCondition() {
            super(ConfigurationPhase.PARSE_CONFIGURATION);
        }

        @Conditional({DataSourceAutoConfiguration.PooledDataSourceAvailableCondition.class})
        static class PooledDataSourceAvailable {
            PooledDataSourceAvailable() {
            }
        }

        @ConditionalOnProperty(
            prefix = "spring.datasource",
            name = {"type"}
        )
        static class ExplicitType {
            ExplicitType() {
            }
        }
    }

    @Configuration(
        proxyBeanMethods = false
    )
    @Conditional({DataSourceAutoConfiguration.PooledDataSourceCondition.class})
    @ConditionalOnMissingBean({DataSource.class, XADataSource.class})
    @Import({Hikari.class, Tomcat.class, Dbcp2.class, Generic.class, DataSourceJmxConfiguration.class})
    protected static class PooledDataSourceConfiguration {
        protected PooledDataSourceConfiguration() {
        }
    }

    @Configuration(
        proxyBeanMethods = false
    )
    @Conditional({DataSourceAutoConfiguration.EmbeddedDatabaseCondition.class})
    @ConditionalOnMissingBean({DataSource.class, XADataSource.class})
    @Import({EmbeddedDataSourceConfiguration.class})
    protected static class EmbeddedDatabaseConfiguration {
        protected EmbeddedDatabaseConfiguration() {
        }
    }
}
```

`HikariDataSource`号称 Java WEB 当前速度最快的数据源，相比于传统的 C3P0 、DBCP、Tomcat jdbc 等连接池更加优秀，可以使用 spring.datasource.type 指定自定义的数据源类型，值为要使用的连接池实现的完全限定名。

> JDBCTemplate

Spring 本身也对原生的JDBC 做了轻量级的封装，即JdbcTemplate。Spring Boot 不仅提供了默认的数据源，同时默认已经配置好了 JdbcTemplate 放在了容器中，程序员只需自己注入即可使用。

**JdbcTemplate主要提供以下几类方法：**

- execute方法：可以用于执行任何SQL语句，一般用于执行DDL语句；
- update方法及batchUpdate方法：update方法用于执行新增、修改、删除等语句；batchUpdate方法用于执行批处理相关语句；
- query方法及queryForXXX方法：用于执行查询相关语句；
- call方法：用于执行存储过程、函数相关语句。

**编写一个Controller，注入 jdbcTemplate，使用测试方法进行访问测试**

```java
@RestController
@RequestMapping("/jdbc")
public class JdbcController {
    
    @Autowired    
    JdbcTemplate jdbcTemplate;
    @GetMapping("/list")    
    public List<Map<String, Object>> userList(){        
        String sql = "select * from employee";       
        List<Map<String, Object>> maps = jdbcTemplate.queryForList(sql);        
        return maps;    
    }        
    @GetMapping("/add")    
    public String addUser(){        
        String sql = "insert into employee(last_name, email,gender,department,birth) values ('狂神说','24736743@qq.com',1,101,'"+ new Date().toLocaleString() +"')";
        jdbcTemplate.update(sql);
        return "addOk";    
    }
    @GetMapping("/update/{id}")    
    public String updateUser(@PathVariable("id") int id){        
        String sql = "update employee set last_name=?,email=? where id="+id;        
        Object[] objects = new Object[2];        
        objects[0] = "javaboy";        
        objects[1] = "438217638@qq.com";        
        jdbcTemplate.update(sql,objects);              
        return "updateOk";    
    } 
    @GetMapping("/delete/{id}")    
    public String delUser(@PathVariable("id") int id){              
        String sql = "delete from employee where id=?";        
        jdbcTemplate.update(sql,id);        
        return "deleteOk";    
    }    
}
```

说明：

- Spring Boot 默认提供了数据源，默认提供了 `org.springframework.jdbc.core.JdbcTemplate` 
- JdbcTemplate 中会自己注入数据源，用于简化 JDBC操作
- 还能避免一些常见的错误,使用起来也不用再自己来关闭数据库连接

## Druid数据源

Druid 是阿里巴巴开源平台上一个数据库连接池实现，结合了 C3P0、DBCP 等 DB 池的优点，同时加入了日志监控，可以很好的监控 DB 池连接和 SQL 的执行情况，天生就是针对监控而生的 DB 连接池。

> 配置Druid数据源

**添加Druid依赖**

```xml
<dependency>    
    <groupId>com.alibaba</groupId>    
    <artifactId>druid</artifactId>    
    <version>1.1.21</version>
</dependency>
```

**切换默认数据源**

```yaml
spring:  
	datasource:    
		username: root    
		password: 123456    
		url: jdbc:mysql://localhost:3306/springboot   
		driver-class-name: com.mysql.cj.jdbc.Driver
		# 自定义数据源
		type: com.alibaba.druid.pool.DruidDataSource 
```

**优化配置**

```yaml

spring:
  datasource:
    username: root
    password: 123456
    url: jdbc:mysql://localhost:3306/springboot
    driver-class-name: com.mysql.cj.jdbc.Driver
    type: com.alibaba.druid.pool.DruidDataSource

    # Spring Boot 默认是不注入这些属性值的，需要自己绑定
    # druid 数据源专有配置
    initialSize: 5
    minIdle: 5
    maxActive: 20
    maxWait: 60000
    timeBetweenEvictionRunsMillis: 60000
    minEvictableIdleTimeMillis: 300000
    validationQuery: SELECT 1 FROM DUAL
    testWhileIdle: true
    testOnBorrow: false
    testOnReturn: false
    poolPreparedStatements: true

    # 配置监控统计拦截的filters，stat:监控统计、log4j：日志记录、wall：防御sql注入
    # 如果允许时报错  java.lang.ClassNotFoundException: org.apache.log4j.Priority
    # 则导入 log4j 依赖即可，Maven 地址：https://mvnrepository.com/artifact/log4j/log4j
    filters: stat,wall,log4j
    maxPoolPreparedStatementPerConnectionSize: 20
    useGlobalDataSourceStat: true
    connectionProperties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=500
```

**导入Log4j 的依赖**

```xml
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
```

 **添加DruidDataSource组件到容器中绑定属性，不再使用 Spring Boot 的自动生成。**

```java
@Configuration
public class DruidConfig {

    @ConfigurationProperties(prefix = "spring.datasource")
    @Bean
    public DataSource druidDataSource() {
        return new DruidDataSource();
    }

}
```

说明：@ConfigurationProperties(prefix = "spring.datasource")：作用就是将 全局配置文件中前缀为 spring.datasource的属性值注入到 com.alibaba.druid.pool.DruidDataSource 的同名参数中，从而让它们生效。

**简单测试**

```java
@SpringBootTest
class SpringbootDataJdbcApplicationTests {

    //DI注入数据源
    @Autowired
    DataSource dataSource;

    @Test
    public void contextLoads() throws SQLException {
        //看一下默认数据源
        System.out.println(dataSource.getClass());
        //获得连接
        Connection connection =   dataSource.getConnection();
        System.out.println(connection);

        DruidDataSource druidDataSource = (DruidDataSource) dataSource;
        System.out.println("druidDataSource 数据源最大连接数：" + druidDataSource.getMaxActive());
        System.out.println("druidDataSource 数据源初始化连接数：" + druidDataSource.getInitialSize());

        //关闭连接
        connection.close();
    }
}
```

> 数据监控

Druid 数据源具有监控的功能，并提供了一个 web 界面方便用户查看，类似安装路由器时，人家也提供了一个默认的 web 页面。

**第一步需要设置 Druid 的后台管理**

```java
//配置 Druid 监控管理后台的Servlet；
//内置 Servlet 容器时没有web.xml文件，所以使用 Spring Boot 的注册 Servlet 方式
@Bean
public ServletRegistrationBean statViewServlet() {
    ServletRegistrationBean bean = new ServletRegistrationBean(new StatViewServlet(), "/druid/*");

    // 这些参数可以在 com.alibaba.druid.support.http.StatViewServlet的父类 com.alibaba.druid.support.http.ResourceServlet 中找到
    Map<String, String> initParams = new HashMap<>();
    initParams.put("loginUsername", "admin"); //后台管理界面的登录账号
    initParams.put("loginPassword", "123456"); //后台管理界面的登录密码

    //后台允许谁可以访问
    //initParams.put("allow", "localhost")：表示只有本机可以访问
    //initParams.put("allow", "")：为空或者为null时，表示允许所有访问
    initParams.put("allow", "");
    //deny：Druid 后台拒绝谁访问
    //initParams.put("javaboy", "192.168.1.20");表示禁止此ip访问

    //设置初始化参数
    bean.setInitParameters(initParams);
    return bean;
}
```

**第二步访问登录 Druid 的后台管理**

`http://localhost:8080/druid/login.html`

**第三步配置 Druid web 监控 filter 过滤器**

```java
//配置 Druid 监控 之  web 监控的 filter
//WebStatFilter：用于配置Web和Druid数据源之间的管理关联监控统计
@Bean
public FilterRegistrationBean webStatFilter() {
    FilterRegistrationBean bean = new FilterRegistrationBean();
    bean.setFilter(new WebStatFilter());

    //exclusions：设置哪些请求进行过滤排除掉，从而不进行统计
    Map<String, String> initParams = new HashMap<>();
    initParams.put("exclusions", "*.js,*.css,/druid/*,/jdbc/*");
    bean.setInitParameters(initParams);

    //"/*" 表示过滤所有请求
    bean.setUrlPatterns(Arrays.asList("/*"));
    return bean;
}
```

