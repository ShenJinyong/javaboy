# Git中解决commit大文件

## 问题说明

原因：

- git要求提交单个文件最大不能超过100MB

- 面试宝典pdf文件超过提交文件最大的限制
- 编译生成的文件超过提交文件最大的限制

问题：

- 在git push到远程仓库的过程中报错
- 虽然在后续的commit中移除掉了面试宝典，但是在之前的commit已经包含过这些大文件

解决方法：

- 撤销commit
- 合并commit

## 查看commit

先查看一下最近提交的commit的版本号

```sh
git log
```

![查看commit的版本号](.\images\查看commit的版本号.png)

## 依次撤销commit

包含过要删除的大文件的commit必须都给撤销了，要不然会报错

```sh
git reset xxxxxxxxxxxxx
```

![依次撤销commit](.\images\依次撤销commit.png)

你一定在想你的代码还在不在？不要担心，上面的撤销只是对commit命令的撤销，不会对你修改过的代码撤销的，他们还是在的。

## 大文件处理

- 删除掉本地的大文件
- 备份到其他地方

## 重新提交

将修改添加到暂存区

```sh
git add .
```

将修改添加到本地仓库

```sh
git commit -m '提交版本的注释'
```

推送到远程仓库

```sh
git push
```

