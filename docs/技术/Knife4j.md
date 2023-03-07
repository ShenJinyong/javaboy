# Knife4j

官网：`https://doc.xiaominfo.com/`

Knife4j是一个集Swagger2 和 OpenAPI3 为一体的增强解决方案

## 快速开始

> Spring Boot 2 + OpenAPI2

- 创建Spring Boot项目并且在pom.xml中引入Knife4j的依赖包

```xml
<!--引入Knife4j的官方start包,该指南选择Spring Boot版本<3.0,开发者需要注意-->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-openapi2-spring-boot-starter</artifactId>
    <version>4.0.0</version>
</dependency>
```

- 创建Swagger配置依赖

```java
@Configuration
@EnableSwagger2WebMvc
public class Knife4jConfiguration {

    @Bean(value = "dockerBean")
    public Docket dockerBean() {
        //指定使用Swagger2规范
        Docket docket=new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(new ApiInfoBuilder()
                //描述字段支持Markdown语法
                .description("# Knife4j RESTful APIs")
                .termsOfServiceUrl("https://doc.xiaominfo.com/")
                .contact("xiaoymin@foxmail.com")
                .version("1.0")
                .build())
                //分组名称
                .groupName("用户服务")
                .select()
                //这里指定Controller扫描包路径
                .apis(RequestHandlerSelectors.basePackage("com.github.xiaoymin.knife4j.controller"))
                .paths(PathSelectors.any())
                .build();
        return docket;
    }
}
```

- 新建一个接口Controller类

```java
@Api(tags = "首页模块")
@RestController
public class IndexController {

    @ApiImplicitParam(name = "name",value = "姓名",required = true)
    @ApiOperation(value = "向客人问好")
    @GetMapping("/sayHi")
    public ResponseEntity<String> sayHi(@RequestParam(value = "name")String name){
        return ResponseEntity.ok("Hi:"+name);
    }
}
```

- 启动Spring Boot项目，浏览器访问Knife4j的文档地址即可查看效果

```
http://localhost:8080/doc.html
```

