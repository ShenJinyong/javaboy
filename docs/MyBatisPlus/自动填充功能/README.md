# 自动填充功能

## 引用原因

在阿里巴巴关于Java开发标准开发手册中提到，数据库中核心表的设计应该建立类似`gmt_create`字段标识创建时间，`gmt_modified`字段标识更新时间，这是一种规范。

如果我们选择在数据库层面做，那么就需要创建触发器。一方面会增加数据库的开销，另一方面会增加维护的成本。

因此我们选择在服务的层面去处理，但是如果每次我们都去手动新建时间然后更新，这样同样是会存在问题的。一方面是重复的工作，增加工作量，另一方面就是容易忘记，导致数据不准确。

## 官方使用

示例工程：

👉 [mybatis-plus-sample-auto-fill-metainfo](https://gitee.com/baomidou/mybatis-plus-samples/tree/master/mybatis-plus-sample-auto-fill-metainfo)

原理：

- 实现元对象处理器接口：`com.baomidou.mybatisplus.core.handlers.MetaObjectHandler`

- 注解填充字段 `@TableField(.. fill = FieldFill.INSERT) `生成器策略部分也可以配置！

```java
public class User {
    // 注意！这里需要标记为填充字段
    @TableField(.. fill = FieldFill.INSERT)
    private String fillField;

    ....
}
```
- 自定义实现类 `MyMetaObjectHandler`

```java
@Slf4j
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        log.info("start insert fill ....");
        this.strictInsertFill(metaObject, "createTime", LocalDateTime.class, LocalDateTime.now()); // 起始版本 3.3.0(推荐使用)
        // 或者
        this.strictInsertFill(metaObject, "createTime", () -> LocalDateTime.now(), LocalDateTime.class); // 起始版本 3.3.3(推荐)
        // 或者
        this.fillStrategy(metaObject, "createTime", LocalDateTime.now()); // 也可以使用(3.3.0 该方法有bug)
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        log.info("start update fill ....");
        this.strictUpdateFill(metaObject, "updateTime", LocalDateTime.class, LocalDateTime.now()); // 起始版本 3.3.0(推荐)
        // 或者
        this.strictUpdateFill(metaObject, "updateTime", () -> LocalDateTime.now(), LocalDateTime.class); // 起始版本 3.3.3(推荐)
        // 或者
        this.fillStrategy(metaObject, "updateTime", LocalDateTime.now()); // 也可以使用(3.3.0 该方法有bug)
    }
}
```
> 注意事项：
>
> - 填充原理是直接给`entity`的属性设置值!!!
> - 注解则是指定该属性在对应情况下必有值,如果无值则入库会是`null`
> - `MetaObjectHandler`提供的默认方法的策略均为:如果属性有值则不覆盖,如果填充值为null则不填充
> - 字段必须声明`TableField`注解,属性fill选择对应策略,该声明告知`Mybatis-Plus`需要预留注入`SQL`字段
> - 填充处理器`MyMetaObjectHandler`在`Spring Boot` 中需要声明`@Component`或`@Bean`注入
> - 要想根据注解`FieldFill.xxx`和字段名以及字段类型来区分必须使用父类的`strictInsertFill`或者`strictUpdateFill`方法
> - 不需要根据任何来区分可以使用父类的`fillStrategy`方法
> - `update(T t,Wrapper updateWrapper)`时`t`不能为空,否则自动填充失效

```java
public enum FieldFill {
    /**
     * 默认不处理
     */
    DEFAULT,
    /**
     * 插入填充字段
     */
    INSERT,
    /**
     * 更新填充字段
     */
    UPDATE,
    /**
     * 插入和更新填充字段
     */
    INSERT_UPDATE
}
```

## 快速开始
