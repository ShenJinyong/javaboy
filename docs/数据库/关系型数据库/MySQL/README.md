# MySQL

## MySQL基础篇

### 数据库Database

创建数据库:

```sql
create database if not exists db2022;
```

删除数据库:

```sql
drop database if exists db2022;
```

使用数据库:

```sql
use db2022;
```

查询数据库：

```sql
# 查看所有的数据库
show databases;
```

### 表Table

```sql
CREATE TABLE <表名> ([表定义选项])[表选项][分区选项];
```

### 视图View

```sql
CREATE VIEW <视图名> AS <SELECT语句>
```

### 存储过程Procedure

```sql
# 定义分割符
DELIMITER $$
# 创建存储过程
CREATE PROCEDURE my_procedure()
# 开始
BEGIN
	# 过程体
	select * from my_table;
# 结束
END $$
# 还原分隔符
DELIMITER ;

--- 
# 调用
call my_procedure();
```

### 存储函数Function

```sql
# 定义分割符
DELIMITER $$
# 创建存储函数
CREATE PROCEDURE my_Function()
# 开始
BEGIN
	# 声明变量
	# 函数体
	select * from my_table;
# 结束
END $$
# 还原分隔符
DELIMITER ;

--- 
# 调用
select my_Function();
```

### 触发器Trigger

```sql
CREATE my_trigger 
< BEFORE | AFTER > <INSERT | UPDATE | DELETE >
ON my_table 
FOR EACH Row
select * from my_table;
```

### 事件Event

```sql
# 创建触发器
CREATE EVENT Event_Stat_Daily
# 执行时间
ON SCHEDULE EVERY 1 DAY STARTS '2022-08-27 02:00:00'
# 判断event时间是否到期
ON COMPLETION PRESERVE
# 可执行的
ENABLE
# 执行存储过程
DO call my_procedure();
```

## MySQL高级篇

### MySQL架构篇

### 索引及调优篇

### MySQL事务篇

### 日志与备份篇
