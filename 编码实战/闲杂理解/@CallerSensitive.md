# @CallerSensitive

## 初识@CallerSensitive

第一次见到@CallerSensitive注解是在探究Java.util.logging源码的时候

```java
@CallerSensitive
public static Logger getLogger(String name) {
    return demandLogger(name, null, Reflection.getCallerClass());
}
```

可以发现 Class.forName 方法上有 @CallerSensitive 注解， 因为代码里的Reflection.getCallerClass()这个native方法要求。

```java
@CallerSensitive
public static native Class<?> getCallerClass();
```

## 理解@CallerSensitive

### JDK说明

- 使用能够精确识别caller-sensitive方法并且保证这些方法的调用者可靠地被发现的一种机制 代替 现存的手动维护的caller-sensitive方法表，提高JDK method-handler实现的安全性。

- caller-sensitive方法会根据其直接调用者的类型改变其行为。通过调用sun.reflect.Reflection.getCallerClass方法可以获得调用者class类型。
- 大多数caller-sensitive方法某种程度上是作为调用者的代理。当通过反射调用时，这些方法必须经过特殊处理以确保getCallerClass返回的是实际调用者的class类型，而不是反射机制本身的某些类。

**解释**

- 这个注解是为了堵住漏洞用的。曾经有黑客通过构造双重反射来提升权限， 原理是当时反射只检查固定深度的调用者的类，看它有没有特权。

- 例如固定看两层的调用者（getCallerClass(2)）。如果我的类本来没足够 权限群访问某些信息，那我就可以通过双重反射去达到目的：反射相关 的类是有很高权限的，而在 我->反射1->反射2 这样的调用链上，反射2 检查权限时看到的是反射1的类，这就被欺骗了，导致安全漏洞。 使用CallerSensitive后，getCallerClass不再用固定深度去寻找 actual caller（“我”），而是把所有跟反射相关的接口方法都标注上 CallerSensitive，搜索时凡看到该注解都直接跳过，这样就有效解决了 前面举例的问题

### @CallerSensitive使用

JDK内有些方法，JVM的开发者认为这些方法危险，不希望开发者调用，就把这种危险的方法用@CallerSensitive修饰，并在“jvm”级别检查。

比如Reflection.getCallerClass()方法规定，调用它的对象，必须有 @CallerSensitive 注解，否则报异常` Exception in thread "main" java.lang.InternalError: CallerSensitive annotation expected at frame 1`

`@CallerSensitive` 有个特殊之处，必须由启动类classloader加载（如rt.jar ），才可以被识别。 所以rt.jar下面的注解可以正常使用。开发者自己写的`@CallerSensitive` 不可以被识别。 但是，可以利用jvm参数 `-Xbootclasspath/a: path` 假装自己的程序是启动类。

**添加jvm 启动参数，然后再测试下面的方法**

```java
/* 执行前jvm 添加参数 -Xbootclasspath/a:D:\workspace\demo\target\classes */
@CallerSensitive
public static void withCallerSensitiveAndJvmParam() {
    System.out.format("Method is called by %s%n",Reflection.getCallerClass());
}
```

就会正确地显示 Method is called by class rt.java.lang.ClassDemo。

## 知识扩展

### Xbootclasspath介绍

```
-Xbootclasspath:bootclasspath ：让jvm从指定的路径中加载bootclass，用来替换jdk的rt.jar。一般不会用到。
-Xbootclasspath/a: path ： 被指定的文件追加到默认的bootstrap路径中。
-Xbootclasspath/p: path ： 让jvm优先于默认的bootstrap去加载path中指定的class。
```

### 加载器介绍

- 启动类加载器Bootstrap ClassLoader:加载JRE_HOME/lib下的核心包，该类加载器是用c++写的。
- 扩展类加载器**Extension ClassLoader**:加载**JRE_HOME/lib/ext**目录下的扩展包,也可以通过启动参数**-Djava.ext.dirs**指定，该类用java编写。对应**ExtClassLoader**类
- 应用类加载器**Application ClassLoader**:应用类加载器，加载classpath下的字节码文件，用java编写，对应**AppClassLoader**这个类，可以通过**ClassLoader**类的静态方法**getSystemClassLoader()**获得，所以又叫系统类加载器
- 自定义类加载器：自定义的类加载器，通过直接或者间接继承抽象的ClassLoader类。