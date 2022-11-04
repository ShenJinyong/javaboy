# Actuator

官网：https://docs.spring.io/spring-boot/docs/current/actuator-api/htmlsingle/

Spring Boot Actuator 模块提供了生产级别的功能，比如健康检查，审计，指标收集，HTTP 跟踪等，帮助我们监控和管理Spring Boot 应用。

## 使用

加入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

访问：http://localhost:8099/actuator

这些 Actuator 模块本来就有的端点我们称之为原生端点。根据端点的作用的话，我们大概可以分为三大类：

- **应用配置类**：获取应用程序中加载的应用配置、环境变量、自动化配置报告等与Spring Boot应用密切相关的配置类信息。
- **度量指标类**：获取应用程序运行过程中用于监控的度量指标，比如：内存信息、线程池信息、HTTP请求统计等。
- **操作控制类**：提供了对应用的关闭等操作类功能。

需要注意的就是：

- 每一个端点都可以通过配置来单独禁用或者启动
- 不同于Actuator 1.x，**Actuator 2.x 的大多数端点默认被禁掉**。 Actuator 2.x 中的默认端点增加了`/actuator`前缀。默认暴露的两个端点为`/actuator/health`和 `/actuator/info`

参考地址：https://www.cnblogs.com/caoweixiong/p/15325382.html

## /health原理

Spring boot的健康信息都是从`ApplicationContext`中的各种`HealthIndicator `Beans中收集到的，Spring boot框架中包含了大量的`HealthIndicators`的实现类，当然你也可以实现自己认为的健康状态。

默认情况下，最终的spring boot应用的状态是由`HealthAggregator`汇总而成的，汇总的算法是：

1. 设置状态码顺序：`setStatusOrder(Status.DOWN, Status.OUT_OF_SERVICE, Status.UP, Status.UNKNOWN)`。
2. 过滤掉不能识别的状态码。
3. 如果无任何状态码，整个spring boot应用的状态是 `UNKNOWN`。
4. 将所有收集到的状态码按照 1 中的顺序排序。
5. 返回有序状态码序列中的第一个状态码，作为整个spring boot应用的状态。

## 自定义 HealthIndicator

有时候需要提供自定义的健康状态检查信息，你可以通过实现`HealthIndicator`的接口来实现，并将该实现类注册为spring bean。

你需要实现其中的`health()`方法，并返回自定义的健康状态响应信息，该响应信息应该包括一个状态码和要展示详细信息。

```java
@Component
public class MyHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        int errorCode = check(); // perform some specific health check
        if (errorCode != 0) {
            return Health.down().withDetail("Error Code", errorCode).build();
        }
        return Health.up().build();
    }

}
```

