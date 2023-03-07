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

## mybatis-spring-boot

官方文档：http://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/

**导入依赖**

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.1</version>
</dependency>
```

**配置数据源**

```yaml
spring:
  datasource:
    username: root
    password: 123456
    #?serverTimezone=UTC解决时区的报错
    url: jdbc:mysql://localhost:3306/springboot?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8
    driver-class-name: com.mysql.cj.jdbc.Driver
    type: com.alibaba.druid.pool.DruidDataSource

    #Spring Boot 默认是不注入这些属性值的，需要自己绑定
    #druid 数据源专有配置
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

    #配置监控统计拦截的filters，stat:监控统计、log4j：日志记录、wall：防御sql注入
    #如果允许时报错  java.lang.ClassNotFoundException: org.apache.log4j.Priority
    #则导入 log4j 依赖即可，Maven 地址：https://mvnrepository.com/artifact/log4j/log4j
    filters: stat,wall,log4j
    maxPoolPreparedStatementPerConnectionSize: 20
    useGlobalDataSourceStat: true
    connectionProperties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=500
```

**编写Mapper类测试即可**

## 静态资源处理

> 静态资源映射规则

在SpringBoot中，SpringMVC的web配置都在 WebMvcAutoConfiguration 这个配置类里面。WebMvcAutoConfigurationAdapter 中有很多配置方法，addResourceHandlers 是添加资源处理。

```java
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // 已禁用默认资源处理
    if (!this.resourceProperties.isAddMappings()) {
        logger.debug("Default resource handling disabled");
    } else {
         // 缓存控制
        Duration cachePeriod = this.resourceProperties.getCache().getPeriod();
        CacheControl cacheControl = this.resourceProperties.getCache().getCachecontrol().toHttpCacheControl();
        // webjars 配置
        if (!registry.hasMappingForPattern("/webjars/**")) {
            this.customizeResourceHandlerRegistration(registry.addResourceHandler(new String[]{"/webjars/**"}).addResourceLocations(new String[]{"classpath:/META-INF/resources/webjars/"}).setCachePeriod(this.getSeconds(cachePeriod)).setCacheControl(cacheControl));
        }

        // 静态资源配置
        String staticPathPattern = this.mvcProperties.getStaticPathPattern();
        if (!registry.hasMappingForPattern(staticPathPattern)) {
            this.customizeResourceHandlerRegistration(registry.addResourceHandler(new String[]{staticPathPattern}).addResourceLocations(WebMvcAutoConfiguration.getResourceLocations(this.resourceProperties.getStaticLocations())).setCachePeriod(this.getSeconds(cachePeriod)).setCacheControl(cacheControl));
        }

    }
}
```

读一下源代码：比如所有的`/webjars/**`， 都需要去`classpath:/META-INF/resources/webjars/`找对应的资源

> webjars

官方网址：https://www.webjars.org 

以前要导入一个静态资源文件，直接导入即可。在SpringBoot需要使用Webjars，Webjars本质就是以jar包的方式引入我们的静态资源。

举个栗子：

导入jQuery依赖

```xml
<dependency>
    <groupId>org.webjars</groupId>
    <artifactId>jquery</artifactId>
    <version>3.4.1</version>
</dependency>
```

访问：只要是静态资源，SpringBoot就会去对应的路径寻找资源`http://localhost:8080/webjars/jquery/3.4.1/jquery.js`

> 静态资源配置

staticPathPattern第二种映射规则 ：/** , 访问当前的项目任意资源，它会去找 resourceProperties 这个类，点进分析

```java
// 进入方法
public String[] getStaticLocations() {
    return this.staticLocations;
}

public ResourceProperties() {
    // 找到对应的值
    this.staticLocations = CLASSPATH_RESOURCE_LOCATIONS;
    this.addMappings = true;
    this.chain = new ResourceProperties.Chain();
    this.cache = new ResourceProperties.Cache();
}

// 找到路径
private static final String[] CLASSPATH_RESOURCE_LOCATIONS = new String[]{"classpath:/META-INF/resources/", "classpath:/resources/", "classpath:/static/", "classpath:/public/"};
private String[] staticLocations;
private boolean addMappings;
private final ResourceProperties.Chain chain;
private final ResourceProperties.Cache cache;
```

ResourceProperties 可以设置和我们静态资源有关的参数；这里面指向了它会去寻找资源的文件夹，即上面数组的内容，所以得出结论，以下四个目录存放的静态资源可以被我们识别：

```
"classpath:/META-INF/resources/"
"classpath:/resources/"
"classpath:/static/"
"classpath:/public/"
```

我们可以在resources根目录下新建对应的文件夹，都可以存放我们的静态文件。

> 自定义静态资源路径

一旦自己定义了静态文件夹的路径，原来的自动配置就都会失效了！在application.properties中配置

```
spring.resources.static-locations=classpath:/coding/,classpath:/javaboy/
```

> 首页处理

```java
@Bean
public WelcomePageHandlerMapping welcomePageHandlerMapping(ApplicationContext applicationContext, FormattingConversionService mvcConversionService, ResourceUrlProvider mvcResourceUrlProvider) {
    WelcomePageHandlerMapping welcomePageHandlerMapping = new WelcomePageHandlerMapping(new TemplateAvailabilityProviders(applicationContext), applicationContext, this.getWelcomePage(), this.mvcProperties.getStaticPathPattern());
    welcomePageHandlerMapping.setInterceptors(this.getInterceptors(mvcConversionService, mvcResourceUrlProvider));
    welcomePageHandlerMapping.setCorsConfigurations(this.getCorsConfigurations());
    return welcomePageHandlerMapping;
}

// 获得欢迎页
private Optional<Resource> getWelcomePage() {
    String[] locations = WebMvcAutoConfiguration.getResourceLocations(this.resourceProperties.getStaticLocations());
    return Arrays.stream(locations).map(this::getIndexHtml).filter(this::isReadable).findFirst();
}

// 欢迎页就是一个location下的的 index.html 而已
private Resource getIndexHtml(String location) {
    return this.resourceLoader.getResource(location + "index.html");
}
```

> 网站图标

与其他静态资源一样，Spring Boot在配置的静态内容位置中查找 favicon.ico。如果存在这样的文件，它将自动用作应用程序的favicon。

**关闭SpringBoot默认图标**

```
spring.mvc.favicon.enabled=false
```

**放一个图标在静态资源目录下**

 favicon.ico

**清除浏览器缓存,刷新网页!**

## Thymeleaf模板引擎

Thymeleaf 官网：https://www.thymeleaf.org/

模板引擎的作用是帮我们解析表达式、填充数据和输出页面。

> 导入依赖

```xml
<!--thymeleaf-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

> thymeleaf分析

```java
public class ThymeleafTemplateAvailabilityProvider implements TemplateAvailabilityProvider {
    public ThymeleafTemplateAvailabilityProvider() {
    }

    public boolean isTemplateAvailable(String view, Environment environment, ClassLoader classLoader, ResourceLoader resourceLoader) {
        if (ClassUtils.isPresent("org.thymeleaf.spring5.SpringTemplateEngine", classLoader)) {
            String prefix = environment.getProperty("spring.thymeleaf.prefix", "classpath:/templates/");
            String suffix = environment.getProperty("spring.thymeleaf.suffix", ".html");
            return resourceLoader.getResource(prefix + view + suffix).exists();
        } else {
            return false;
        }
    }
}
```

在其中看到默认的前缀和后缀，使用thymeleaf什么都不需要配置，只需要将他放在指定的文件夹下即可！即把html页面放在类路径下的templates下，thymeleaf就可以自动渲染了。

> Thymeleaf 语法学习

要使用thymeleaf，需要在html文件中导入命名空间的约束，方便提示

```
xmlns:th="http://www.thymeleaf.org"
```

## MVC自动配置原理

官方网站

```java
Spring MVC Auto-configuration
// Spring Boot为Spring MVC提供了自动配置，它可以很好地与大多数应用程序一起工作。
Spring Boot provides auto-configuration for Spring MVC that works well with most applications.
// 自动配置在Spring默认设置的基础上添加了以下功能：
The auto-configuration adds the following features on top of Spring’s defaults:
// 包含视图解析器
Inclusion of ContentNegotiatingViewResolver and BeanNameViewResolver beans.
// 支持静态资源文件夹的路径，以及webjars
Support for serving static resources, including support for WebJars 
// 自动注册了Converter：
// 转换器，这就是我们网页提交数据到后台自动封装成为对象的东西，比如把"1"字符串自动转换为int类型
// Formatter：【格式化器，比如页面给我们了一个2019-8-10，它会给我们自动格式化为Date对象】
Automatic registration of Converter, GenericConverter, and Formatter beans.
// HttpMessageConverters
// SpringMVC用来转换Http请求和响应的的，比如我们要把一个User对象转换为JSON字符串，可以去看官网文档解释；
Support for HttpMessageConverters (covered later in this document).
// 定义错误代码生成规则的
Automatic registration of MessageCodesResolver (covered later in this document).
// 首页定制
Static index.html support.
// 图标定制
Custom Favicon support (covered later in this document).
// 初始化数据绑定器：帮我们把请求数据绑定到JavaBean中！
Automatic use of a ConfigurableWebBindingInitializer bean (covered later in this document).

/*
如果您希望保留Spring Boot MVC功能，并且希望添加其他MVC配置（拦截器、格式化程序、视图控制器和其他功能），则可以添加自己
的@configuration类，类型为webmvcconfiguer，但不添加@EnableWebMvc。如果希望提供
RequestMappingHandlerMapping、RequestMappingHandlerAdapter或ExceptionHandlerExceptionResolver的自定义
实例，则可以声明WebMVCregistrationAdapter实例来提供此类组件。
*/
If you want to keep Spring Boot MVC features and you want to add additional MVC configuration 
(interceptors, formatters, view controllers, and other features), you can add your own 
@Configuration class of type WebMvcConfigurer but without @EnableWebMvc. If you wish to provide 
custom instances of RequestMappingHandlerMapping, RequestMappingHandlerAdapter, or 
ExceptionHandlerExceptionResolver, you can declare a WebMvcRegistrationsAdapter instance to provide such components.

// 如果您想完全控制Spring MVC，可以添加自己的@Configuration，并用@EnableWebMvc进行注释。
If you want to take complete control of Spring MVC, you can add your own @Configuration annotated with @EnableWebMvc.
```

> ContentNegotiatingViewResolver 内容协商视图解析器

```java
@Bean
@ConditionalOnBean({ViewResolver.class})
@ConditionalOnMissingBean(
    name = {"viewResolver"},
    value = {ContentNegotiatingViewResolver.class}
)
public ContentNegotiatingViewResolver viewResolver(BeanFactory beanFactory) {
    ContentNegotiatingViewResolver resolver = new ContentNegotiatingViewResolver();
    resolver.setContentNegotiationManager((ContentNegotiationManager)beanFactory.getBean(ContentNegotiationManager.class));
    // ContentNegotiatingViewResolver使用所有其他视图解析器来定位视图，因此它应该具有较高的优先级
    resolver.setOrder(-2147483648);
    return resolver;
}
```

点进`ContentNegotiatingViewResolver`，找到对应的解析视图的代码

```java
// 注解说明：@Nullable 即参数可为null
@Nullable
public View resolveViewName(String viewName, Locale locale) throws Exception {
    RequestAttributes attrs = RequestContextHolder.getRequestAttributes();
    Assert.state(attrs instanceof ServletRequestAttributes, "No current ServletRequestAttributes");
    List<MediaType> requestedMediaTypes = this.getMediaTypes(((ServletRequestAttributes)attrs).getRequest());
    if (requestedMediaTypes != null) {
        // 获取候选的视图对象
        List<View> candidateViews = this.getCandidateViews(viewName, locale, requestedMediaTypes);
        // 选择一个最适合的视图对象，然后把这个对象返回
        View bestView = this.getBestView(candidateViews, requestedMediaTypes, attrs);
        if (bestView != null) {
            return bestView;
        }
    }

    String mediaTypeInfo = this.logger.isDebugEnabled() && requestedMediaTypes != null ? " given " + requestedMediaTypes.toString() : "";
    if (this.useNotAcceptableStatusCode) {
        if (this.logger.isDebugEnabled()) {
            this.logger.debug("Using 406 NOT_ACCEPTABLE" + mediaTypeInfo);
        }

        return NOT_ACCEPTABLE_VIEW;
    } else {
        this.logger.debug("View remains unresolved" + mediaTypeInfo);
        return null;
    }
}
```

获得候选的视图getCandidateViews

```java
private List<View> getCandidateViews(String viewName, Locale locale, List<MediaType> requestedMediaTypes) throws Exception {
    List<View> candidateViews = new ArrayList();
    if (this.viewResolvers != null) {
        Assert.state(this.contentNegotiationManager != null, "No ContentNegotiationManager set");
        // 把所有的视图解析器拿来，进行while循环，挨个解析！
        Iterator var5 = this.viewResolvers.iterator();

        while(var5.hasNext()) {
            ViewResolver viewResolver = (ViewResolver)var5.next();
            View view = viewResolver.resolveViewName(viewName, locale);
            if (view != null) {
                candidateViews.add(view);
            }

            Iterator var8 = requestedMediaTypes.iterator();

            while(var8.hasNext()) {
                MediaType requestedMediaType = (MediaType)var8.next();
                List<String> extensions = this.contentNegotiationManager.resolveFileExtensions(requestedMediaType);
                Iterator var11 = extensions.iterator();

                while(var11.hasNext()) {
                    String extension = (String)var11.next();
                    String viewNameWithExtension = viewName + '.' + extension;
                    view = viewResolver.resolveViewName(viewNameWithExtension, locale);
                    if (view != null) {
                        candidateViews.add(view);
                    }
                }
            }
        }
    }

    if (!CollectionUtils.isEmpty(this.defaultViews)) {
        candidateViews.addAll(this.defaultViews);
    }

    return candidateViews;
}
```

**结论：ContentNegotiatingViewResolver 这个视图解析器就是用来组合所有的视图解析器的** 

> 实现视图解析器

组合逻辑，在容器中去找视图解析器

```java
protected void initServletContext(ServletContext servletContext) {
    // 这里是从beanFactory工具中获取容器中的所有视图解析器，ViewRescolver.class 把所有的视图解析器来组合的
    Collection<ViewResolver> matchingBeans = BeanFactoryUtils.beansOfTypeIncludingAncestors(this.obtainApplicationContext(), ViewResolver.class).values();
    ViewResolver viewResolver;
    if (this.viewResolvers == null) {
        this.viewResolvers = new ArrayList(matchingBeans.size());
        Iterator var3 = matchingBeans.iterator();

        while(var3.hasNext()) {
            viewResolver = (ViewResolver)var3.next();
            if (this != viewResolver) {
                this.viewResolvers.add(viewResolver);
            }
        }
    } else {
        for(int i = 0; i < this.viewResolvers.size(); ++i) {
            viewResolver = (ViewResolver)this.viewResolvers.get(i);
            if (!matchingBeans.contains(viewResolver)) {
                String name = viewResolver.getClass().getName() + i;
                this.obtainApplicationContext().getAutowireCapableBeanFactory().initializeBean(viewResolver, name);
            }
        }
    }

    AnnotationAwareOrderComparator.sort(this.viewResolvers);
    this.cnmFactoryBean.setServletContext(servletContext);
}
```

**编写自定义视图解析器**

```java
@Bean // 放到bean中
public ViewResolver myViewResolver(){
    return new MyViewResolver();
}

// 写一个静态内部类，视图解析器就需要实现ViewResolver接口
private static class MyViewResolver implements ViewResolver{
    @Override
    public View resolveViewName(String s, Locale locale) throws Exception {
        return null;
    }
}
```

给 DispatcherServlet 中的 doDispatch方法 加个断点进行调试一下，因为所有的请求都会走到这个方法中。

找到this，找到视图解析器，可以看到我们自己定义的就在这里了。

所以说，如果想要使用自己定制化的东西，只需要给容器中添加这个组件就好，剩下的事情SpringBoot就会帮我们做了！

> 转换器和格式化器

```java
@Bean
public FormattingConversionService mvcConversionService() {
    // 拿到配置文件中的格式化规则
    Format format = this.mvcProperties.getFormat();
    WebConversionService conversionService = new WebConversionService((new DateTimeFormatters()).dateFormat(format.getDate()).timeFormat(format.getTime()).dateTimeFormat(format.getDateTime()));
    this.addFormatters(conversionService);
    return conversionService;
}
```

查看`mvcProperties.getFormat()`源码

```java
public WebMvcProperties.Format getFormat() {
    return this.format;
}

// Date format to use. For instance, `dd/MM/yyyy`. 默认的
private final WebMvcProperties.Format format;
```

在Properties文件中，可以进行自动配置它！

如果配置了自己的格式化方式，就会注册到Bean中生效，可以在配置文件中配置日期格式化的规则。

> 扩展使用SpringMVC

编写一个@Configuration注解类，并且类型要为WebMvcConfigurer，还不能标注@EnableWebMvc注解。

```java
// 应为类型要求为WebMvcConfigurer，所以我们实现其接口，可以使用自定义类扩展MVC的功能
@Configuration
public class MyMvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // 浏览器发送/test ， 就会跳转到test页面；
        registry.addViewController("/test").setViewName("test");
    }
}
```

**原理分析**

1. WebMvcAutoConfiguration是SpringMVC的自动配置类

2. WebMvcAutoConfiguration里面有一个类WebMvcAutoConfigurationAdapter

3. WebMvcAutoConfigurationAdapter类上有@Import注解

4. @Import(EnableWebMvcConfiguration.class)在做其他自动配置时会导入

5. EnableWebMvcConfiguration继承了一个父类DelegatingWebMvcConfiguration

   ```java
   // 从容器中获取所有的webmvcConfigurer
   @Autowired(
       required = false
   )
   public void setConfigurers(List<WebMvcConfigurer> configurers) {
       if (!CollectionUtils.isEmpty(configurers)) {
           this.configurers.addWebMvcConfigurers(configurers);
       }
   
   }
   ```

6. 寻找viewController当做参考

   ```java
   protected void addViewControllers(ViewControllerRegistry registry) {
       this.configurers.addViewControllers(registry);
   }
   ```

7. 查看addViewControllers源码

   ```java
   public void addViewControllers(ViewControllerRegistry registry) {
       Iterator var2 = this.delegates.iterator();
   
       while(var2.hasNext()) {
           // 将所有的WebMvcConfigurer相关配置来一起调用！包括自己配置的和Spring给我们配置的
           WebMvcConfigurer delegate = (WebMvcConfigurer)var2.next();
           delegate.addViewControllers(registry);
       }
   
   }
   ```

**结论：所有的WebMvcConfiguration都会被作用，不止Spring自己的配置类，我们自己的配置类当然也会被调用！**

> 全面接管SpringMVC

**当然，我们开发中，不推荐使用全面接管SpringMVC！**

全面接管是SpringBoot对SpringMVC的自动配置不需要了，所有都是我们自己去配置！

简单使用，只需在我们的配置类中要加一个@EnableWebMvc。

**源码分析**

1、查看注解`@EnableWebMvc`，导入`DelegatingWebMvcConfiguration.class`

```java
@Import({DelegatingWebMvcConfiguration.class})
public @interface EnableWebMvc {
}
```

2、查看`DelegatingWebMvcConfiguration`，继承父类 WebMvcConfigurationSupport

```java
public class DelegatingWebMvcConfiguration extends WebMvcConfigurationSupport {
  // ......
}
```

3、我们来回顾一下Webmvc自动配置类

```java
@Configuration(proxyBeanMethods = false)
@ConditionalOnWebApplication(type = Type.SERVLET)
@ConditionalOnClass({ Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class })
// 这个注解的意思就是：容器中没有这个组件的时候，这个自动配置类才生效
@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE + 10)
@AutoConfigureAfter({ DispatcherServletAutoConfiguration.class, TaskExecutionAutoConfiguration.class,
    ValidationAutoConfiguration.class })
public class WebMvcAutoConfiguration {
    
}
```

**结论：@EnableWebMvc将WebMvcConfigurationSupport组件导入进来了，而导入的WebMvcConfigurationSupport只是SpringMVC最基本的功能！**

## 页面国际化

> 配置文件编写

在resources资源文件下新建一个i18n目录，存放国际化配置文件,建立一个login.properties、login_zh_CN.properties和login_en_US.properties

>配置文件生效探究

SpringBoot对国际化的自动配置：MessageSourceAutoConfiguration

MessageSourceAutoConfiguration已经自动配置好了管理我们国际化资源文件的组件 ResourceBundleMessageSource；

```java
// 获取 properties 传递过来的值进行判断
@Bean
public MessageSource messageSource(MessageSourceProperties properties) {
    ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
    if (StringUtils.hasText(properties.getBasename())) {
        // 设置国际化文件的基础名（去掉语言国家代码的
messageSource.setBasenames(StringUtils.commaDelimitedListToStringArray(StringUtils.trimAllWhitespace(properties.getBasename())));
    }

    if (properties.getEncoding() != null) {
        messageSource.setDefaultEncoding(properties.getEncoding().name());
    }

    messageSource.setFallbackToSystemLocale(properties.isFallbackToSystemLocale());
    Duration cacheDuration = properties.getCacheDuration();
    if (cacheDuration != null) {
        messageSource.setCacheMillis(cacheDuration.toMillis());
    }

    messageSource.setAlwaysUseMessageFormat(properties.isAlwaysUseMessageFormat());
    messageSource.setUseCodeAsDefaultMessage(properties.isUseCodeAsDefaultMessage());
    return messageSource;
}
```

真实的情况是放在了i18n目录下，所以要去配置这个messages的路径

```
spring.messages.basename=i18n.login
```

> 配置国际化解析

在Spring中有一个国际化的Locale （区域信息对象）；里面有一个叫做LocaleResolver （获取区域信息对象）的解析器！

webmvc自动配置文件，寻找一下！看到SpringBoot默认配置

```java
@Bean
@ConditionalOnMissingBean
@ConditionalOnProperty(
    prefix = "spring.mvc",
    name = {"locale"}
)
public LocaleResolver localeResolver() {
    // 容器中没有就自己配，有的话就用用户配置的
    if (this.mvcProperties.getLocaleResolver() == org.springframework.boot.autoconfigure.web.servlet.WebMvcProperties.LocaleResolver.FIXED) {
        return new FixedLocaleResolver(this.mvcProperties.getLocale());
    } else {
        // 接收头国际化分解
        AcceptHeaderLocaleResolver localeResolver = new AcceptHeaderLocaleResolver();
        localeResolver.setDefaultLocale(this.mvcProperties.getLocale());
        return localeResolver;
    }
}
```

AcceptHeaderLocaleResolver的resolveLocale方法

```java
public Locale resolveLocale(HttpServletRequest request) {
    Locale defaultLocale = this.getDefaultLocale();
    // 默认的就是根据请求头带来的区域信息获取Locale进行国际化
    if (defaultLocale != null && request.getHeader("Accept-Language") == null) {
        return defaultLocale;
    } else {
        Locale requestLocale = request.getLocale();
        List<Locale> supportedLocales = this.getSupportedLocales();
        if (!supportedLocales.isEmpty() && !supportedLocales.contains(requestLocale)) {
            Locale supportedLocale = this.findSupportedLocale(request, supportedLocales);
            if (supportedLocale != null) {
                return supportedLocale;
            } else {
                return defaultLocale != null ? defaultLocale : requestLocale;
            }
        } else {
            return requestLocale;
        }
    }
}
```

那假如现在想点击链接让我们的国际化资源生效，就需要让我们自己的Locale生效！

编写自己的LocaleResolver，可以在链接上携带区域信息，编写一个处理的组件类

```java
//可以在链接上携带区域信息
public class MyLocaleResolver implements LocaleResolver {

    //解析请求
    @Override
    public Locale resolveLocale(HttpServletRequest request) {

        String language = request.getParameter("l");
        // 如果没有获取到就使用系统默认的
        Locale locale = Locale.getDefault();
        //如果请求链接不为空
        if (!StringUtils.isEmpty(language)){
            //分割请求参数
            String[] split = language.split("_");
            //国家，地区
            locale = new Locale(split[0],split[1]);
        }
        return locale;
    }

    @Override
    public void setLocale(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Locale locale) {

    }
}
```

为了让区域化信息能够生效，需要再配置一下这个组件！在自己的MvcConofig下添加bean

```java
@Bean
public LocaleResolver localeResolver(){
    return new MyLocaleResolver();
}
```

## Swagger

官方网址：https://swagger.io/

> 快速开始

添加依赖

```xml
<!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger2 -->
<dependency>
   <groupId>io.springfox</groupId>
   <artifactId>springfox-swagger2</artifactId>
   <version>2.9.2</version>
</dependency>
<!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger-ui -->
<dependency>
   <groupId>io.springfox</groupId>
   <artifactId>springfox-swagger-ui</artifactId>
   <version>2.9.2</version>
</dependency>
```

编写配置文件

```java
// 配置类
@Configuration
// 开启Swagger2的自动配置
@EnableSwagger2
public class SwaggerConfig {  
}
```

访问测试:`http://localhost:8080/swagger-ui.html`

> 配置Swagger

通过配置Docket实例来配置Swaggger

```java
// 配置docket以配置Swagger具体参数
@Bean
public Docket docket() {
   return new Docket(DocumentationType.SWAGGER_2);
}
```

通过apiInfo()属性配置文档信息

```java
//配置文档信息
private ApiInfo apiInfo() {
   Contact contact = new Contact("联系人名字", "http://xxx.xxx.com/联系人访问链接", "联系人邮箱");
   return new ApiInfo(
       	   // 标题
           "Swagger学习",
     	   // 描述
           "学习演示如何配置Swagger",
       	   // 版本
           "v1.0",
       	   // 组织链接
           "http://terms.service.url/组织链接",
       	   // 联系人信息
           contact, 
      	   // 许可
           "Apach 2.0 许可",
           "许可链接",
    	   // 扩展
           new ArrayList<>()
  );
}
```

Docket 实例关联上 apiInfo()

```java
@Bean
public Docket docket() {
   return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo());
}
```

> 配置扫描接口

构建Docket时通过select()方法配置怎么扫描接口

```java
@Bean
public Docket docket() {
   return new Docket(DocumentationType.SWAGGER_2)
      .apiInfo(apiInfo())
       // 通过.select()方法，去配置扫描接口,RequestHandlerSelectors配置如何扫描接口
      .select()
      .apis(RequestHandlerSelectors.basePackage("com.javaboy.swagger.controller"))
      .build();
}
```

除了通过包路径配置扫描接口外，还可以通过配置其他方式扫描接口，这里注释一下所有的配置方式：

```java
// 扫描所有，项目中的所有接口都会被扫描到
any()
// 不扫描接口
none()
// 通过方法上的注解扫描，如withMethodAnnotation(GetMapping.class)只扫描get请求
withMethodAnnotation(final Class<? extends Annotation> annotation)
// 通过类上的注解扫描，如.withClassAnnotation(Controller.class)只扫描有controller注解的类中的接口
withClassAnnotation(final Class<? extends Annotation> annotation)
// 根据包路径扫描接口
basePackage(final String basePackage)
```

可以配置接口扫描过滤

```java
@Bean
public Docket docket() {
   return new Docket(DocumentationType.SWAGGER_2)
      .apiInfo(apiInfo())
       // 通过.select()方法，去配置扫描接口,RequestHandlerSelectors配置如何扫描接口
      .select()
      .apis(RequestHandlerSelectors.basePackage("com.javaboy.swagger.controller"))
       // 配置如何通过path过滤,即这里只扫描请求以/javaboy开头的接口
      .paths(PathSelectors.ant("/javaboy/**"))
      .build();
}
```

配置接口扫描的可选值

```java
// 任何请求都扫描
any()
// 任何请求都不扫描
none()
// 通过正则表达式控制
regex(final String pathRegex)
// 通过ant()控制
ant(final String antPattern)
```

> 配置Swagger开关

通过enable()方法配置是否启用swagger

```java
@Bean
public Docket docket() {
   return new Docket(DocumentationType.SWAGGER_2)
      .apiInfo(apiInfo())
       //配置是否启用Swagger，如果是false，在浏览器将无法访问
      .enable(false)
       // 通过.select()方法，去配置扫描接口,RequestHandlerSelectors配置如何扫描接口
      .select()
      .apis(RequestHandlerSelectors.basePackage("com.javaboy.swagger.controller"))
       // 配置如何通过path过滤,即这里只扫描请求以/javaboy开头的接口
      .paths(PathSelectors.ant("/javaboy/**"))
      .build();
}
```

动态配置当项目处于test、dev环境时显示swagger

```java
@Bean
public Docket docket(Environment environment) {
   // 设置要显示swagger的环境
   Profiles profile = Profiles.of("dev", "test");
   // 判断当前是否处于该环境,通过 enable() 接收此参数判断是否要显示
   boolean flag = environment.acceptsProfiles(profile);
   
   return new Docket(DocumentationType.SWAGGER_2)
      .apiInfo(apiInfo())
       // 配置是否启用Swagger，如果是false，在浏览器将无法访问
      .enable(flag)
       // 通过.select()方法，去配置扫描接口,RequestHandlerSelectors配置如何扫描接口
      .select()
      .apis(RequestHandlerSelectors.basePackage("com.javaboy.swagger.controller"))
       // 配置如何通过path过滤,即这里只扫描请求以/javaboy开头的接口
      .paths(PathSelectors.ant("/javaboy/**"))
      .build();
}
```

> 配置API分组

如果没有配置分组，默认是default,通过groupName()方法即可配置分组

```java
@Bean
public Docket docket(Environment environment) {
   return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo())
      .groupName("hello") // 配置分组
       // 省略配置....
}
```

配置多个分组

```java
@Bean
public Docket docket1(){
   return new Docket(DocumentationType.SWAGGER_2).groupName("group1");
}
@Bean
public Docket docket2(){
   return new Docket(DocumentationType.SWAGGER_2).groupName("group2");
}
@Bean
public Docket docket3(){
   return new Docket(DocumentationType.SWAGGER_2).groupName("group3");
}
```

> 实体配置

```java
@ApiModel("用户实体")
public class User {
   @ApiModelProperty("用户名")
   public String username;
   @ApiModelProperty("密码")
   public String password;
}
```

@ApiModel为类添加注释，@ApiModelProperty为类属性添加注释。

但是并不是因为@ApiModel这个注解让实体显示在这里了，而是只要出现在接口方法的返回值上的实体都会显示在这里

> 常用注解

| Swagger注解                                            | 简单说明                                             |
| ------------------------------------------------------ | ---------------------------------------------------- |
| @Api(tags = "xxx模块说明")                             | 作用在模块类上                                       |
| @ApiOperation("xxx接口说明")                           | 作用在接口方法上                                     |
| @ApiModel("xxxPOJO说明")                               | 作用在模型类上：如VO、BO                             |
| @ApiModelProperty(value = "xxx属性说明",hidden = true) | 作用在类方法和属性上，hidden设置为true可以隐藏该属性 |
| @ApiParam("xxx参数说明")                               | 作用在参数、方法和字段上，类似@ApiModelProperty      |

> 拓展：其他皮肤

**默认**

```xml
<dependency>
   <groupId>io.springfox</groupId>
   <artifactId>springfox-swagger-ui</artifactId>
   <version>2.9.2</version>
</dependency>
```

**bootstrap-ui**

```xml
<dependency>
   <groupId>com.github.xiaoymin</groupId>
   <artifactId>swagger-bootstrap-ui</artifactId>
   <version>1.9.1</version>
</dependency>
```

**Layui-ui**

```xml
<dependency>
   <groupId>com.github.caspar-chen</groupId>
   <artifactId>swagger-ui-layer</artifactId>
   <version>1.1.3</version>
</dependency>
```

**mg-ui**

```xml
<dependency>
   <groupId>com.zyplayer</groupId>
   <artifactId>swagger-mg-ui</artifactId>
   <version>1.0.6</version>
</dependency>
```

## 多线程实现

### 异步任务

**编写异步服务**

```java
@Service
public class AsyncService {

   // 告诉Spring这是一个异步方法
   @Async
   public void hello(){
       try {
           Thread.sleep(3000);
      } catch (InterruptedException e) {
           e.printStackTrace();
      }
       System.out.println("业务进行中....");
  }
}
```

**编写异步实现**

```java
@RestController
public class AsyncController {

   @Autowired
   AsyncService asyncService;

   @GetMapping("/hello")
   public String hello(){
       asyncService.hello();
       return "success";
  }

}
```

**开启异步注解功能**

```java
@EnableAsync
@SpringBootApplication
public class SpringbootTaskApplication {

   public static void main(String[] args) {
       SpringApplication.run(SpringbootTaskApplication.class, args);
  }

}
```

### 定时任务

Spring为我们提供了异步执行任务调度的方式。

两个接口：

- TaskExecutor接口
- TaskScheduler接口

两个注解：

- @EnableScheduling
- @Scheduled

**编写定时任务**

```java
@Service
public class ScheduledService {
   // 秒   分   时     日   月   周几
   // 0 * * * * MON-FRI
   // 注意cron表达式的用法；
   @Scheduled(cron = "0 * * * * 0-7")
   public void hello(){
       System.out.println("hello.....");
  }
}
```

**开启定时任务功能**

```java
// 开启异步注解功能
@EnableAsync
// 开启基于注解的定时任务
@EnableScheduling
@SpringBootApplication
public class SpringbootTaskApplication {

   public static void main(String[] args) {
       SpringApplication.run(SpringbootTaskApplication.class, args);
  }

}
```

**在线Cron表达式：https://www.bejson.com/othertools/cron/**

**常用表达式**

```
（1）0/2 * * * * ?   表示每2秒 执行任务
（1）0 0/2 * * * ?   表示每2分钟 执行任务
（1）0 0 2 1 * ?   表示在每月的1日的凌晨2点调整任务
（2）0 15 10 ? * MON-FRI   表示周一到周五每天上午10:15执行作业
（3）0 15 10 ? 6L 2002-2006   表示2002-2006年的每个月的最后一个星期五上午10:15执行作
（4）0 0 10,14,16 * * ?   每天上午10点，下午2点，4点
（5）0 0/30 9-17 * * ?   朝九晚五工作时间内每半小时
（6）0 0 12 ? * WED   表示每个星期三中午12点
（7）0 0 12 * * ?   每天中午12点触发
（8）0 15 10 ? * *   每天上午10:15触发
（9）0 15 10 * * ?     每天上午10:15触发
（10）0 15 10 * * ?   每天上午10:15触发
（11）0 15 10 * * ? 2005   2005年的每天上午10:15触发
（12）0 * 14 * * ?     在每天下午2点到下午2:59期间的每1分钟触发
（13）0 0/5 14 * * ?   在每天下午2点到下午2:55期间的每5分钟触发
（14）0 0/5 14,18 * * ?     在每天下午2点到2:55期间和下午6点到6:55期间的每5分钟触发
（15）0 0-5 14 * * ?   在每天下午2点到下午2:05期间的每1分钟触发
（16）0 10,44 14 ? 3 WED   每年三月的星期三的下午2:10和2:44触发
（17）0 15 10 ? * MON-FRI   周一至周五的上午10:15触发
（18）0 15 10 15 * ?   每月15日上午10:15触发
（19）0 15 10 L * ?   每月最后一日的上午10:15触发
（20）0 15 10 ? * 6L   每月的最后一个星期五上午10:15触发
（21）0 15 10 ? * 6L 2002-2005   2002年至2005年的每月的最后一个星期五上午10:15触发
（22）0 15 10 ? * 6#3   每月的第三个星期五上午10:15触发
```

### 邮件任务

**导入依赖**

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

spring-boot-starter-mail包含依赖jakarta.mail

```xml
<dependency>
   <groupId>com.sun.mail</groupId>
   <artifactId>jakarta.mail</artifactId>
   <version>1.6.4</version>
   <scope>compile</scope>
</dependency>
```

**查看自动配置类MailSenderAutoConfiguration**

```java
@Configuration(
    proxyBeanMethods = false
)
@ConditionalOnClass({MimeMessage.class, MimeType.class, MailSender.class})
@ConditionalOnMissingBean({MailSender.class})
@Conditional({MailSenderAutoConfiguration.MailSenderCondition.class})
@EnableConfigurationProperties({MailProperties.class})
@Import({MailSenderJndiConfiguration.class, MailSenderPropertiesConfiguration.class})
public class MailSenderAutoConfiguration {
    public MailSenderAutoConfiguration() {
    }

    static class MailSenderCondition extends AnyNestedCondition {
        MailSenderCondition() {
            super(ConfigurationPhase.PARSE_CONFIGURATION);
        }

        @ConditionalOnProperty(
            prefix = "spring.mail",
            name = {"jndi-name"}
        )
        static class JndiNameProperty {
            JndiNameProperty() {
            }
        }

        @ConditionalOnProperty(
            prefix = "spring.mail",
            name = {"host"}
        )
        static class HostProperty {
            HostProperty() {
            }
        }
    }
}
```

查看`MailSenderJndiConfiguration.class`

```java
@Configuration(
    proxyBeanMethods = false
)
@ConditionalOnClass({Session.class})
@ConditionalOnProperty(
    prefix = "spring.mail",
    name = {"jndi-name"}
)
@ConditionalOnJndi
class MailSenderJndiConfiguration {
    private final MailProperties properties;

    MailSenderJndiConfiguration(MailProperties properties) {
        this.properties = properties;
    }

    @Bean
    JavaMailSenderImpl mailSender(Session session) {
        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        sender.setDefaultEncoding(this.properties.getDefaultEncoding().name());
        sender.setSession(session);
        return sender;
    }

    @Bean
    @ConditionalOnMissingBean
    Session session() {
        String jndiName = this.properties.getJndiName();

        try {
            return (Session)JndiLocatorDelegate.createDefaultResourceRefLocator().lookup(jndiName, Session.class);
        } catch (NamingException var3) {
            throw new IllegalStateException(String.format("Unable to find Session in JNDI location %s", jndiName), var3);
        }
    }
}
```

查看`MailSenderPropertiesConfiguration`

```java
@Configuration(
    proxyBeanMethods = false
)
@ConditionalOnProperty(
    prefix = "spring.mail",
    name = {"host"}
)
class MailSenderPropertiesConfiguration {
    MailSenderPropertiesConfiguration() {
    }

    @Bean
    @ConditionalOnMissingBean({JavaMailSender.class})
    JavaMailSenderImpl mailSender(MailProperties properties) {
        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        this.applyProperties(properties, sender);
        return sender;
    }

    private void applyProperties(MailProperties properties, JavaMailSenderImpl sender) {
        sender.setHost(properties.getHost());
        if (properties.getPort() != null) {
            sender.setPort(properties.getPort());
        }

        sender.setUsername(properties.getUsername());
        sender.setPassword(properties.getPassword());
        sender.setProtocol(properties.getProtocol());
        if (properties.getDefaultEncoding() != null) {
            sender.setDefaultEncoding(properties.getDefaultEncoding().name());
        }

        if (!properties.getProperties().isEmpty()) {
            sender.setJavaMailProperties(this.asProperties(properties.getProperties()));
        }

    }

    private Properties asProperties(Map<String, String> source) {
        Properties properties = new Properties();
        properties.putAll(source);
        return properties;
    }
}
```

查看`MailProperties`

```java
@ConfigurationProperties(
    prefix = "spring.mail"
)
public class MailProperties {
    private static final Charset DEFAULT_CHARSET;
    private String host;
    private Integer port;
    private String username;
    private String password;
    private String protocol = "smtp";
    private Charset defaultEncoding;
    private Map<String, String> properties;
    private String jndiName;

    public MailProperties() {
        this.defaultEncoding = DEFAULT_CHARSET;
        this.properties = new HashMap();
    }

    public String getHost() {
        return this.host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public Integer getPort() {
        return this.port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProtocol() {
        return this.protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public Charset getDefaultEncoding() {
        return this.defaultEncoding;
    }

    public void setDefaultEncoding(Charset defaultEncoding) {
        this.defaultEncoding = defaultEncoding;
    }

    public Map<String, String> getProperties() {
        return this.properties;
    }

    public void setJndiName(String jndiName) {
        this.jndiName = jndiName;
    }

    public String getJndiName() {
        return this.jndiName;
    }

    static {
        DEFAULT_CHARSET = StandardCharsets.UTF_8;
    }
}
```

**配置文件**

```
spring.mail.username=24736743@qq.com
spring.mail.password=你的qq授权码
spring.mail.host=smtp.qq.com
# qq需要配置ssl
spring.mail.properties.mail.smtp.ssl.enable=true
```

获取授权码：在QQ邮箱中的设置->账户->开启pop3和smtp服务

**单元测试**

```java
@Autowired
JavaMailSenderImpl mailSender;

@Test
public void contextLoads() {
   // 邮件设置1：一个简单的邮件
   SimpleMailMessage message = new SimpleMailMessage();
   message.setSubject("通知-明天来狂神这听课");
   message.setText("今晚7:30开会");

   message.setTo("438217638@qq.com");
   message.setFrom("438217638@qq.com");
   mailSender.send(message);
}

@Test
public void contextLoads2() throws MessagingException {
   // 邮件设置2：一个复杂的邮件
   MimeMessage mimeMessage = mailSender.createMimeMessage();
   MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

   helper.setSubject("通知-明天来开会");
   helper.setText("<b style='color:red'>今天 7:30来开会</b>",true);

   // 发送附件
   helper.addAttachment("1.jpg",new File(""));
   helper.addAttachment("2.jpg",new File(""));

   helper.setTo("438217638@qq.com");
   helper.setFrom("438217638@qq.com");

   mailSender.send(mimeMessage);
}
```

## 富文本编辑器

> 市面上有许多非常成熟的富文本编辑器

- **Editor.md**——功能非常丰富的编辑器，左端编辑，右端预览，非常方便，完全免费
  - 官网：https://pandao.github.io/editor.md/
- **wangEditor**——基于javascript和css开发的 Web富文本编辑器， 轻量、简洁、界面美观、易用、开源免费。
  - 官网：http://www.wangeditor.com/
- **TinyMCE**——TinyMCE是一个轻量级的基于浏览器的所见即所得编辑器，由JavaScript写成。它对IE6+和Firefox1.5+都有着非常良好的支持。功能齐全，界面美观，就是文档是英文的，对开发人员英文水平有一定要求。
  - 官网：https://www.tiny.cloud/docs/demo/full-featured/
- **百度ueditor**——UEditor是由百度web前端研发部开发所见即所得富文本web编辑器，具有轻量，功能齐全，可定制，注重用户体验等特点，开源基于MIT协议，允许自由使用和修改代码，缺点是已经没有更新了
  - 官网：https://ueditor.baidu.com/website/onlinedemo.html
- **kindeditor**——界面经典。
  - 官网：http://kindeditor.net/demo.php
- **Textbox**——Textbox是一款极简但功能强大的在线文本编辑器，支持桌面设备和移动设备。主要功能包含内置的图像处理和存储、文件拖放、拼写检查和自动更正。此外，该工具还实现了屏幕阅读器等辅助技术，并符合WAI-ARIA可访问性标准。
  - 官网：https://textbox.io/
- **CKEditor**——国外的，界面美观。
  - 官网：https://ckeditor.com/ckeditor-5/demo/
- **quill**——功能强大，还可以编辑公式等
  - 官网：https://quilljs.com/
- **simditor**——界面美观，功能较全。
  - 官网：https://simditor.tower.im/
- **summernote**——UI好看，精美
  - 官网：https://summernote.org/
- **jodit**——功能齐全
  - 官网：https://xdsoft.net/jodit/
- **froala Editor**——界面非常好看，功能非常强大，非常好用（非免费）
  - 官网：https://www.froala.com/wysiwyg-editor

> Editor.md

博客上传页面

```html
<!DOCTYPE html>
<html class="x-admin-sm" lang="zh" xmlns:th="http://www.thymeleaf.org">

<head>
   <meta charset="UTF-8">
   <title>秦疆'Blog</title>
   <meta name="renderer" content="webkit">
   <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
   <meta name="viewport" content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi" />
   <!--Editor.md-->
   <link rel="stylesheet" th:href="@{/editormd/css/editormd.css}"/>
   <link rel="shortcut icon" href="https://pandao.github.io/editor.md/favicon.ico" type="image/x-icon" />
</head>

<body>

<div class="layui-fluid">
   <div class="layui-row layui-col-space15">
       <div class="layui-col-md12">
           <!--博客表单-->
           <form name="mdEditorForm">
               <div>
                  标题：<input type="text" name="title">
               </div>
               <div>
                  作者：<input type="text" name="author">
               </div>
               <div id="article-content">
                   <textarea name="content" id="content" style="display:none;"> </textarea>
               </div>
           </form>

       </div>
   </div>
</div>
</body>

<!--editormd-->
<script th:src="@{/editormd/lib/jquery.min.js}"></script>
<script th:src="@{/editormd/editormd.js}"></script>

<script type="text/javascript">
   var testEditor;

   //window.onload = function(){ }
   $(function() {
       testEditor = editormd("article-content", {
           width : "95%",
           height : 400,
           syncScrolling : "single",
           path : "../editormd/lib/",
           saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
           emoji: true,
           theme: "dark",//工具栏主题
           previewTheme: "dark",//预览主题
           editorTheme: "pastel-on-dark",//编辑主题
           tex : true,                   // 开启科学公式TeX语言支持，默认关闭
           flowChart : true,             // 开启流程图支持，默认关闭
           sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
           //图片上传
           imageUpload : true,
           imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
           imageUploadURL : "/article/file/upload",
           onload : function() {
               console.log('onload', this);
          },
           /*指定需要显示的功能按钮*/
           toolbarIcons : function() {
               return ["undo","redo","|",
                   "bold","del","italic","quote","ucwords","uppercase","lowercase","|",
                   "h1","h2","h3","h4","h5","h6","|",
                   "list-ul","list-ol","hr","|",
                   "link","reference-link","image","code","preformatted-text",
                   "code-block","table","datetime","emoji","html-entities","pagebreak","|",
                   "goto-line","watch","preview","fullscreen","clear","search","|",
                   "help","info","releaseIcon", "index"]
          },

           /*自定义功能按钮，下面我自定义了2个，一个是发布，一个是返回首页*/
           toolbarIconTexts : {
               releaseIcon : "<span bgcolor=\"gray\">发布</span>",
               index : "<span bgcolor=\"red\">返回首页</span>",
          },

           /*给自定义按钮指定回调函数*/
           toolbarHandlers:{
               releaseIcon : function(cm, icon, cursor, selection) {
                   //表单提交
                   mdEditorForm.method = "post";
                   mdEditorForm.action = "/article/addArticle";//提交至服务器的路径
                   mdEditorForm.submit();
              },
               index : function(){
                   window.location.href = '/';
              },
          }
      });
  });
</script>

</html>
```

博客展示页面

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
   <title th:text="${article.title}"></title>
</head>
<body>

<div>
   <!--文章头部信息：标题，作者，最后更新日期，导航-->
   <h2 style="margin: auto 0" th:text="${article.title}"></h2>
  作者：<span style="float: left" th:text="${article.author}"></span>
   <!--文章主体内容-->
   <div id="doc-content">
       <textarea style="display:none;" placeholder="markdown" th:text="${article.content}"></textarea>
   </div>

</div>

<link rel="stylesheet" th:href="@{/editormd/css/editormd.preview.css}" />
<script th:src="@{/editormd/lib/jquery.min.js}"></script>
<script th:src="@{/editormd/lib/marked.min.js}"></script>
<script th:src="@{/editormd/lib/prettify.min.js}"></script>
<script th:src="@{/editormd/lib/raphael.min.js}"></script>
<script th:src="@{/editormd/lib/underscore.min.js}"></script>
<script th:src="@{/editormd/lib/sequence-diagram.min.js}"></script>
<script th:src="@{/editormd/lib/flowchart.min.js}"></script>
<script th:src="@{/editormd/lib/jquery.flowchart.min.js}"></script>
<script th:src="@{/editormd/editormd.js}"></script>

<script type="text/javascript">
   var testEditor;
   $(function () {
       testEditor = editormd.markdownToHTML("doc-content", {//注意：这里是上面DIV的id
           htmlDecode: "style,script,iframe",
           emoji: true,
           taskList: true,
           tocm: true,
           tex: true, // 默认不解析
           flowChart: true, // 默认不解析
           sequenceDiagram: true, // 默认不解析
           codeFold: true
      });});
</script>
</body>
</html>
```

> 图片上传问题

1、前端js中添加配置

```js
//图片上传
imageUpload : true,
imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
imageUploadURL : "/article/file/upload", // 这个是上传图片时的访问地址
```

2、后端请求，接收保存这个图片, 需要导入 FastJson 的依赖！

```java
// 博客图片上传问题
@RequestMapping("/file/upload")
@ResponseBody
public JSONObject fileUpload(@RequestParam(value = "editormd-image-file", required = true) MultipartFile file, HttpServletRequest request) throws IOException {
   // 上传路径保存设置

   // 获得SpringBoot当前项目的路径：System.getProperty("user.dir")
   String path = System.getProperty("user.dir")+"/upload/";

   // 按照月份进行分类：
   Calendar instance = Calendar.getInstance();
   String month = (instance.get(Calendar.MONTH) + 1)+"月";
   path = path+month;

   File realPath = new File(path);
   if (!realPath.exists()){
       realPath.mkdir();
  }

   // 上传文件地址
   System.out.println("上传文件保存地址："+realPath);

   // 解决文件名字问题：我们使用uuid;
   String filename = "ks-"+UUID.randomUUID().toString().replaceAll("-", "");
   // 通过CommonsMultipartFile的方法直接写文件（注意这个时候）
   file.transferTo(new File(realPath +"/"+ filename));

   // 给editormd进行回调
   JSONObject res = new JSONObject();
   res.put("url","/upload/"+month+"/"+ filename);
   res.put("success", 1);
   res.put("message", "upload success!");

   return res;
}
```

3、解决文件回显显示的问题，设置虚拟目录映射！在我们自己拓展的MvcConfig中进行配置即可！

```java
@Configuration
public class MyMvcConfig implements WebMvcConfigurer {

   // 文件保存在真实目录/upload/下，
   // 访问的时候使用虚路径/upload，比如文件名为1.png，就直接/upload/1.png就ok了。
   @Override
   public void addResourceHandlers(ResourceHandlerRegistry registry) {
       registry.addResourceHandler("/upload/**")
          .addResourceLocations("file:"+System.getProperty("user.dir")+"/upload/");
  }

}
```

> 表情包问题

自己手动下载emoji 表情包，放到图片路径下并修改editormd.js文件

```js
// Emoji graphics files url path
editormd.emoji     = {
   path : "../editormd/plugins/emoji-dialog/emoji/",
   ext   : ".png"
};
```
