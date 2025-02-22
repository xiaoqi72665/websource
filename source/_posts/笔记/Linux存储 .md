---
title: Linux存储
ai: true
description: Linux存储
cover: 'https://bu.dusays.com/2022/09/21/632b03a961073.png'
tags: 小笔记
categories: 小笔记
abbrlink: fdea95f5
date: 2022-09-22 14:05:34

---


# ****NFS服务搭建****

## 安装NFS

```bash
dnf -y install rpcbind nfs-utils
```

在NFS的服务的启动中，启动rpcbind后再启动nfs服务

```bash
systemctl start rpcbind
systemctl start nfs-server
systemctl enable rpcbind
systemctl enable nfs-server
```

查看rpc服务的注册情况，可使用rpcinfo的指令进行查看

```bash
rpcinfo -p localhost
```

## ****NFS的配置文件****

```bash
mkdir /share1
mkdir /share2
```

编辑`/etc/exports`，输入如下内容：

```bash
/share1 *(sync,ro) 192.168.x.x(sync,rw,no_root_squash)
/share2 192.168.x.0/24(sync,ro)
```

解释：

```bash
地址可以使用完整IP或网段，例如10.0.0.8或10.0.0.0/24，10.0.0.0/255.255.255.0当然也可以地址可以使用主机名，DNS解析的和本地/etc/hosts解析的都行，支持通配符，例如：*.fsec.io
权限有：
·  rw：read-write，可读写；
·  ro：read-only，只读；
·  sync：文件同时写入硬盘和内存；
·  async：文件暂存于内存，而不是直接写入内存；
·  no_root_squash：NFS客户端连接服务端时如果使用的是root的话，那么对服务端分享的目录来说，也拥有root权限。
·  root_squash：NFS客户端连接服务端时如果使用的是root的话，那么对服务端分享的目录来说，拥有匿名用户权限，通常他将使用nobody或nfsnobody身份；
·  all_squash：不论NFS客户端连接服务端时使用什么用户，对服务端分享的目录来说都是拥有匿名用户权限；
·  anonuid：匿名用户的UID值，通常是nobody或nfsnobody，可以在此处自行设定；
·  anongid：匿名用户的GID值。
```

## ****客户端的访问****

`showmount -e 服务器ip` 显示指定NFS服务器中的共享列表

如果Kali没有showmount的指令，安装：

```bash
apt-cache search showmount
apt-get install nfs-common
```

### ****mount命令****

先在客户机上面创建挂载点

```bash
mkdir /mnt
mkdir /mnt/share1
mkdir /mnt/share2

```

然后使用mount指令将远程主机的目录挂载至本机的目录

```bash
mount -t nfs 192.168.0.33:/share1 /mnt/share1
mount.nfs 192.168.0.33:/share2 /mnt/share2
```

语法`mount -t nfs`或者`mount.nfs`

# 备份

```bash
mkdir /backup
vi /etc/exports
cat /etc/exports
/backup 192.168.0.0/24(sync,rw,no_root_squash)
exportfs -r
exportfs
```

在`/etc/rc.local`文件中添加如下内容：

```bash
mount.nfs 192.168.x.x:/backup /mnt/backup/
```

创建挂载点，并给/etc/rc.local执行权限。

```bash
mkdir /mnt/backup
chmod +x /etc/rc.local
```

用shell脚本配合开机计划任务备份

```bash
#!/bin/bash
date="$(date +%F)"
cp /etc/passwd /mnt/pass_$date
```

`crontab -e`:分时日月周

{% image https://bu.dusays.com/2022/09/21/632b19811d858.png, alt= %}
{% image https://bu.dusays.com/2022/09/21/632b19a372205.png, alt= %}
