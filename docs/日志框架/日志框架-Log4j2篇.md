# 日志框架-Log4j2篇

官网： https://logging.apache.org/log4j/2.x/

Apache Log4j 2是对Log4j的升级版，参考了logback的一些优秀的设计，并且修复了一些问题，因此带 来了一些重大的提升，主要有：

- 异常处理，在logback中，Appender中的异常不会被应用感知到，但是在log4j2中，提供了一些异 常处理机制。 
- 性能提升， log4j2相较于log4j 和logback都具有很明显的性能提升，后面会有官方测试的数据。 
- 自动重载配置，参考了logback的设计，当然会提供自动刷新参数配置，最实用的就是我们在生产 上可以动态的修改日志的级别而不需要重启应用。 
- 无垃圾机制，log4j2在大部分情况下，都可以使用其设计的一套无垃圾机制，避免频繁的日志收集 导致的jvm gc。 

## 一、Log4j2入门

目前市面上最主流的日志门面就是SLF4J，虽然Log4j2也是日志门面，因为它的日志实现功能非常强大，性能优越。所以大家一般还是将Log4j2看作是日志的实现，Slf4j + Log4j2应该是未来的大势所趋。

### 1.1添加依赖

```xml
<!-- Log4j2 门面API-->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-api</artifactId>
    <version>2.11.1</version>
</dependency>
<!-- Log4j2 日志实现 -->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.11.1</version>
</dependency>
```

### 1.2JAVA代码

```java
public class Log4j2Test {
    // 定义日志记录器对象
    public static final Logger LOGGER =
        LogManager.getLogger(Log4j2Test.class);
    @Test
    public void testQuick() throws Exception {
        LOGGER.fatal("fatal");
        LOGGER.error("error");
        LOGGER.warn("warn");
        LOGGER.info("info");
        LOGGER.debug("debug");
        LOGGER.trace("trace");
    }
}
```

### 1.3实践

**使用slf4j作为日志门面，使用log4j2作为日志的实现**

```xml
<!-- Log4j2 门面API-->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-api</artifactId>
    <version>2.11.1</version>
</dependency>
<!-- Log4j2 日志实现 -->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.11.1</version>
</dependency>
<!--使用slf4j作为日志的门面,使用log4j2来记录日志 -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.25</version>
</dependency>
<!--为slf4j绑定日志实现 log4j2的适配器 -->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-slf4j-impl</artifactId>
    <version>2.10.0</version>
</dependency>
```

## 二、Log4j2配置

log4j2默认加载classpath下的 log4j2.xml 文件中的配置。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="warn" monitorInterval="5">
	<properties>
		<property name="LOG_HOME">D:/logs</property>
	</properties>
	<Appenders>
		<Console name="Console" target="SYSTEM_OUT">
			<PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] [%-5level] %c{36}:%L --- %m%n" />
		</Console>
		<File name="file" fileName="${LOG_HOME}/myfile.log">
			<PatternLayout pattern="[%d{yyyy-MM-dd HH:mm:ss.SSS}] [%-5level] %l%c{36} - %m%n" />
		</File>
		<RandomAccessFile name="accessFile" fileName="${LOG_HOME}/myAcclog.log">
			<PatternLayout pattern="[%d{yyyy-MM-dd HH:mm:ss.SSS}] [%-5level] %l%c{36} - %m%n" />
		</RandomAccessFile>
		<RollingFile name="rollingFile" fileName="${LOG_HOME}/myrollog.log" filePattern="D:/logs/$${date:yyyy-MM-dd}/myrollog-%d{yyyyMM-dd-HH-mm}-%i.log">
			<ThresholdFilter level="debug" onMatch="ACCEPT" onMismatch="DENY" />
			<PatternLayout pattern="[%d{yyyy-MM-dd HH:mm:ss.SSS}] [%-5level] %l%c{36} - %msg%n" />
			<Policies>
				<OnStartupTriggeringPolicy />
				<SizeBasedTriggeringPolicy size="10 MB" />
				<TimeBasedTriggeringPolicy />
			</Policies>
			<DefaultRolloverStrategy max="30" />
		</RollingFile>
	</Appenders>
	<Loggers>
		<Root level="trace">
			<AppenderRef ref="Console" />
		</Root>
	</Loggers>
</Configuration>
```

## 三、Log4j2异步日志

log4j2最大的特点就是异步日志，其性能的提升主要也是从异步日志中受益。

Log4j2提供了两种实现日志的方式，

- 一个是通过AsyncAppender---**Appender组件**
- -一个是通过AsyncLogger---**Logger组件**

> 注意：配置异步日志需要添加依赖

```xml
<!--异步日志依赖-->
<dependency>
    <groupId>com.lmax</groupId>
    <artifactId>disruptor</artifactId>
    <version>3.3.4</version>
</dependency>
```

### 3.1AsyncAppender方式

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="warn">
	<properties>
		<property name="LOG_HOME">D:/logs</property>
	</properties>
	<Appenders>
		<File name="file" fileName="${LOG_HOME}/myfile.log">
		<PatternLayout>
			<Pattern>%d %p %c{1.} [%t] %m%n</Pattern>
		</PatternLayout>
		</File>
		<Async name="Async">
			<AppenderRef ref="file"/>
		</Async>
	</Appenders>
	<Loggers>
		<Root level="error">
			<AppenderRef ref="Async"/>
		</Root>
	</Loggers>
</Configuration>
```

### 3.2AsyncLogger方式

AsyncLogger才是log4j2 的重头戏，也是官方推荐的异步方式。它可以使得调用Logger.log返回的 更快。

你可以有两种选择：全局异步和混合异步。 

- 全局异步就是，所有的日志都异步的记录，在配置文件上不用做任何改动，只需要添加一个log4j2.component.properties 配置；

  ```properties
  Log4jContextSelector=org.apache.logging.log4j.core.async.AsyncLoggerContextSelector
  ```

- 混合异步就是，你可以在应用中同时使用同步日志和异步日志，这使得日志的配置方式更加灵活。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
	<properties>
		<property name="LOG_HOME">D:/logs</property>
	</properties>
	<Appenders>
		<File name="file" fileName="${LOG_HOME}/myfile.log">
			<PatternLayout>
                    <Pattern>%d %p %c{1.} [%t] %m%n</Pattern>
            </PatternLayout>
		</File>
		<Async name="Async">
			<AppenderRef ref="file"/>
		</Async>
	</Appenders>
	<Loggers>
		<AsyncLogger name="com.itheima" level="trace" includeLocation="false" additivity="false">
			<AppenderRef ref="file"/>
		</AsyncLogger>
		<Root level="info" includeLocation="true">
			<AppenderRef ref="file"/>
		</Root>
	</Loggers>
</Configuration>
```

如上配置： com.itheima 日志是异步的，root日志是同步的。

### 3.3注意点

使用异步日志需要注意的问题： 

	1. 如果使用异步日志，AsyncAppender、AsyncLogger和全局日志，不要同时出现。性能会和 AsyncAppender一致，降至最低。 
	1.  设置includeLocation=false ，打印位置信息会急剧降低异步日志的性能，比同步日志还要 慢。

## 四、Log4j的性能

### 4.1性能比较

Log4j2最牛的地方在于异步输出日志时的性能表现，Log4j2在多线程的环境下吞吐量与Log4j和 Logback的比较如下图。

下图比较中Log4j2有三种模式：

- 全局使用异步模式；
- 部分Logger采用异 步模式；
- 异步Appender。

可以看出在前两种模式下，Log4j2的性能较之Log4j和Logback有很大的优势。

![async-throughput-comparison](.\images\async-throughput-comparison.png)

### 4.2无垃圾记录

垃圾收集暂停是延迟峰值的常见原因，并且对于许多系统而言，花费大量精力来控制这些暂停。 

许多日志库（包括以前版本的Log4j）在稳态日志记录期间分配临时对象，如日志事件对象，字符串， 字符数组，字节数组等。这会对垃圾收集器造成压力并增加GC暂停发生的频率。 

从版本2.6开始，默认情况下Log4j以“无垃圾”模式运行，其中重用对象和缓冲区，并且尽可能不分配临 时对象。还有一个“低垃圾”模式，它不是完全无垃圾，但不使用ThreadLocal字段。 

Log4j 2.6中的无垃圾日志记录部分通过重用ThreadLocal字段中的对象来实现，部分通过在将文本转换 为字节时重用缓冲区来实现。 

> 对比

- **使用Log4j 2.5：内存分配速率809 MB /秒，141个无效集合。**

- **Log4j 2.6没有分配临时对象：0（零）垃圾回收。**

有两个单独的系统属性可用于手动控制Log4j用于避免创建临时对象的机制： 

- `log4j2.enableThreadlocals` - 如果“true”（非Web应用程序的默认值）对象存储在 ThreadLocal字段中并重新使用，否则将为每个日志事件创建新对象
- `log4j2.enableDirectEncoders` - 如果将“true”（默认）日志事件转换为文本，则将此文本转换 为字节而不创建临时对象。注意： 由于共享缓冲区上的同步，在此模式下多线程应用程序的同步 日志记录性能可能更差。如果您的应用程序是多线程的并且日志记录性能很重要，请考虑使用异步记录器