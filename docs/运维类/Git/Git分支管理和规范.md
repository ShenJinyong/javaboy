# 

## Git使用中的一些问题

分布式版本管理工具

> 分支管理较为混乱

![image-20220926172200415](.\images\image-20220926172200415.png)

![image-20220926172251452](.\images\image-20220926172251452.png)

> 提交合并流程不规范，导致出错

![image-20220926172546859](.\images\image-20220926172546859.png)

> GitFlow工作流

![image-20220926172632727](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20220926172632727.png)

> 分支的类型

- master分支（主分支）： 常在的稳定分支
- develop分支（开发分支）： 常在的开发分支，保持最新
- release分支（发布分支）：发布时使用，使用后删除
- feature分支（功能开发分支）：从develop拉出，功能完成后合并回develop分支
- hotfix分支（热修复分支）：从master拉出，发布后保持develop的更新

## Git分支管理的场景工作流程

功能开发，发布，修复bug

> 开发新功能

![image-20220926173129289](.\images\image-20220926173129289.png)

步骤：

- 从远端develop拉取feature分支
  - 统一放在feature目录下面，具体的分支命名可以是发布窗口日期或者是开发的功能名称：20200618 、 huaxia2.0
  -  feature-分支创建日期-新特性关键字 ，例如: feature-20200618-huaxia2.0

- 在本地checkout feature分支，开发完成提交，提交文案规范
  - feat：新功能
  - fix：修补bug
  - docs：修改文档
  - style：样式修改
  - test：增加测试功能
  - 例如：”feat: 华夏智能识别播放器 “

- 将feature分支合并到develop，最后删除feature分支（发布完成之后）

> 发布功能

![image-20220926173450153](.\images\image-20220926173450153.png)

步骤：

- 测试完成确认之后，则创建 release 分支(发布分支)
  - release-分支创建日期-待发布版本号 ，例如: release-20200618-v1.0.0
- release在预发布环境（模拟线上环境），进行环境测试
- 对于测试bug的修改
  - 在 release 分支上修复 Bug，不允许提交任何新特性（便捷，有风险）
  - 在feature分支上完成修改，再次完成合并->develop分支 -> 合并到release分支（繁琐）

- 发布版本，在 master 分支上创建标签，命名规则:tag-日期-版本，例如:tag-20200618-v1.0.0
- 删除release分支

> 修复紧急bug

![image-20220926173805048](.\images\image-20220926173805048.png)

步骤：

- 从 master 分支某个 tag 上创建一个 hotfix 分支(热修复分支)，命名规则:hotfix-分支创建日期-待发布版本号，例如:hotfix-20200619-v1.0.1
- 修复bug，提交文案规范： hotfix: 偶尔闪退问题
- 将 hotfix 分支同时合并到 master 与 develop 分支
- 在 master 分支上创建标签
- 删除hotfix分支

## 分支管理案例

基于真实业务场景的问题

> 企业微信项目，因为分1、2期进行开发的。2期已经上马了，然而1期还有些要补充的功能。那分支如何管理？

在master分支上打上1期的tag，Develop继续2期的开发，1期的功能，以hotfix的形式开发，发布完成之后在合并回Dev分支

>一个星期之前在develop拉取的feature分支，完成开发，将feature分支合并到Develop，有冲突，没有处理，就直接提交了。

从Develop拉取了一个feature分支，完成开发之后，将Develop分支合并到feature分支，解决完冲突，再合并回develop

> 节点权限和职责

![image-20220926174211922](.\images\image-20220926174211922.png)

说明：

- 拉分支：开发组长，明确分支对应的功能和修改
- 合并请求：组员发起合并请求
- 合并：开发组长完成合并，若有冲突，要配合组员一起修改完冲突
- 删除：开发组长确认功能上线没问题，删除分支
