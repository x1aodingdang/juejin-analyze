## 手把手教你收集掘金分析掘进数据

## steps

1. 在我本地装了一个 `ubuntu18` 虚拟机 （模拟数据库搭建在服务器上）
2. 本地连接服务器（虚拟机） 开始安装 `mysql` 环境
   - [Ubuntu18.04 下安装 MySQL](https://www.cnblogs.com/opsprobe/p/9126864.html) 并开启你的 mysql 服务
3. 将你的数据库配置 `host` `user` `password` ... 更新到 `./db/mysql.js` 配置项 4.将 `db/list.sql` 结构导入到你的数据库中
4. 执行 `npm run get-list`
5. 你就可以看到你的数据库在一条一条的插入数据了

## scripts

- `npm run get-list` 爬取掘进数据

> 本文更新 2020-01-13
