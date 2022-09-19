# Linux下部署jar包

## Linux

### 命令

执行jar包的命令和在windows操作系统上是一样

```sh
java -jar serverboot-1.0.0.jar
```

>注意:
>
>  关闭服务器连接时会关闭此程序进程,（推荐测试可用）

将jar程序设置成后台运行，并且将标准输出的日志重定向至文件msg.log

```sh
nohup java -jar serverboot-1.0.0.jar >msg.log 2>&1 &
```

> 注意： 
>
> nohup命令的作用就是让程序在后台运行，不用担心关闭连接进程断掉的问题了（推荐使用)

![Linux部署jar包](.\images\Linux部署jar包.png)

### 参数

> nohup

- nohup命令运行由Command参数和任何相关的Arg参数指定的命令，忽略所有挂断（SIGHUP）信号。
- 在注销后使用 nohup 命令运行后台中的程序。要运行后台中的 nohup命令，添加 &（表示“and”的符号）到命令的尾部。
- nohup是no hang up的缩写，就是不挂断的意思。
  nohup命令：如果你正在运行一个进程，而且你觉得在退出帐户时该进程还不会结束，那么可以使用nohup命令。
  该命令可以在你退出帐户/关闭终端之后继续运行相应的进程。
- 在缺省情况下该作业的所有输出都被重定向到一个名为nohup.out的文件中。

> nohup和&的区别

- &：指在后台运行,但当用户推出(挂起)的时候，命令自动也跟着退出
- nohup：不挂断的运行，注意并没有后台运行的功能，就是指，用nohup运行命令可以使命令永久的执行下去，和用户终端没有关系

> 输出

- 0：stdin (standard input)
- 1：stdout (standard output)
- 2：stderr (standard error)；

上面示例说明：将标准错误（2）重定向到标准输出（&1），标准输出（&1）再被重定向输入到msg.log文件中

### 重新部署

查看进程：

```sh
ps -ef|grep java;
```

![查看进程](.\images\查看进程.png)

杀死进程;

```sh
kill -9 2071
```

![杀死进程](.\images\杀死进程.png)

注意：

> - 9836 为进程标识号
>- Linux下还提供了一个killall命令，可以直接使用进程的名字而不是进程标识号，例如：`killall -9 name`
> - 重新执行一下nohup命令即可

## Windows

### 脚本

建一个bat文件，输入： 

```bash
@echo off
start javaw -jar xxx.jar --server.port=端口号
exit
```

执行这个批处理程序就可以在后台运行jar包了

### 说明

注意：

- Win10有个UAC虚拟化，如果启动不成功，请在任务管理器（详细信息）找到该进程，右键UAC虚拟化，改成已启动
  UAC设置请自行百度，大体如下：
  - 按“win+R”打开“运行”窗口，键入“gpedit.msc”命令，打开组策略编辑器；
  - 在左打开的组策略编辑器中，依次展开“本地计算机——windows设置——安全设置——本地策略——安全选项”
    在此将该分支下的“将文件及注册表写入失败虚拟化到每用户位置”设置为启用即可
  - 如果是启动，请先设置禁用后在设置启动，重启电脑即可生效
- --server.port=端口号，如不设置的话，为项目开发默认的端口