# Shiro

`Apache Shiro` 是一个强大易用的 `Java`安全框架。

## 简介

> 基本功能点图示

![img](http://dl2.iteye.com/upload/attachment/0093/9788/d59f6d02-1f45-3285-8983-4ea5f18111d5.png)

> 外部架构（应用程序）

从角度的来观察如何使用Shiro完成工作

![img](http://dl2.iteye.com/upload/attachment/0093/9790/5e0e9b41-0cca-367f-8c87-a8398910e7a6.png)

对于开发者而言，最简单的一个Shiro应用：

1、应用代码通过Subject来进行认证和授权，而Subject又委托给SecurityManager；

2、需要给Shiro的SecurityManager注入Realm，从而让SecurityManager能得到合法的用户及其权限进行判断。

> 内部架构（系统设计）

![img](http://dl2.iteye.com/upload/attachment/0093/9792/9b959a65-799d-396e-b5f5-b4fcfe88f53c.png)

## 认证

用户需要提供**身份principals** 和**凭证credentials**

> 身份认证流程

![img](https://atts.w3cschool.cn/attachments/image/wk/shiro/4.png)

流程如下：

- **获取Subject**:`SecurityUtils.getSubject()`
- **调用login**:`Subject.login(token)` 

- **设置SecurityManager**:`SecurityUtils.setSecurityManager()` ==>`Authenticator`
- **绑定Realm**`securityManager.setRealm()`
- **自定义单Realm**
  -  身份验证`Authenticator` 

- **自定义多 Realm** 
  - 默认 `ModularRealmAuthenticator` 会调用 `AuthenticationStrategy` 进行多 `Realm` 身份验证

>Shiro 默认提供的 Realm

![img](https://atts.w3cschool.cn/attachments/image/wk/shiro/5.png)

## 授权

![img](https://atts.w3cschool.cn/attachments/day_210114/202101141719562904.png)

流程如下：

- **获取Subject**:`SecurityUtils.getSubject()`

- **调用** `Subject.isPermitted/hasRole`接口
- **设置SecurityManager**:`SecurityUtils.setSecurityManager()` ==>`Authorizer`
- 调用` isPermitted(“user:view”)`，
  - 首先会通过 `PermissionResolver` 把字符串转换成相应的` Permission` 实例

- 在进行授权之前，其会调用相应的`Realm` 获取 `Subject` 相应的角色/权限用于匹配传入的角色/权限；
- **单Realm**
  - `Authorizer` 会判断 `Realm` 的角色/权限是否和传入的匹配
- **多Realm**
  -  `ModularRealmAuthorizer` 进行循环判断
    - 如果匹配如 `isPermitted/hasRole` 会返回 `true`
    - 否则返回 `false` 表示授权失败。

## INI

## 编码加密

## Realm

## Web集成

## 拦截器机制