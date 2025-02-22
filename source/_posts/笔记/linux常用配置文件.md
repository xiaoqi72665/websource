---
title: linux常用配置文件
ai: true
description: 常用配置
cover: 'https://bu.dusays.com/2022/09/21/632b03a609806.png'
tags: 小笔记
categories: 小笔记
abbrlink: 295d673e
date: 2022-09-22 13:05:34
---

# ****Linux 的文件结构****

---
{% image https://bu.dusays.com/2022/09/21/632b0437daf85.png, alt= %}

- `/bin`目录下包含了用户命令文件，也就是shell命令
- `/boot`包含了系统启动过程中所需要的所有内容
- `/dev`目录是设备文件或者专有文件的存放位置
- `/etc`目录包含了系统的配置文件
- `/root`用户专有的家目录。一个用户对自己的家目录拥有绝对的控制权
- `/lib`目录里面存放着共享库和内核模块。在系统的启动阶段和运行根文件系统的各种命令时，都需要用到这些共享库，所以必须与根文件放在一起
- `/media`与`/mnt`是常见的挂载点
- `/opt`目录系统附加软件的存放地址
- `/sbin`目录必备的系统软件存放处。用户系统维护的软件和某些只限root用户使用的命令存储在`/sbin /usr/sbin`以及`/usr/local/sbin`目录下
- `/srv`目录某些服务进程启动以后，他们需要读取的数据会放在srv目录中
- `/tmp`目录存放临时文件。任何程序都不用对`/tmp`目录下的任何文件或目录负责
- `/var`目录包含着系统中绝大多数的随时变化着的数据，比如系统日志。/var的某些内容是不能共享给其他系统的，典型的就是`/var/logs /var/run,`某些是可以共享的，如`/var/spool/news`

---

# 1.用户相关

## 1.1 `/etc/passwd`文件

`/etc/passwd`**保存系统所有用户和用户的主要信息，每一行代表一个用户**
{% image https://bu.dusays.com/2022/09/21/632b045205c8b.png, alt= %}


例：`root:x:0:0:root:/root:/usr/bin/zsh`

第一段：用户名

第二段：密码表示，但是不是真正的密码，密码在****`/etc/shadow`****

第三段：UID，用户ID

第四段：GID，group组ID

第五段：用户说明

第六段：用户家目录

第七段：shell，用户登陆之后所拥有的权限

## 1.2 `/etc/shadow`文件

****`/etc/shadow`存放密码的文件**

{% image https://bu.dusays.com/2022/09/21/632b051fb9b0f.png, alt= %}

`root:$y$j9T$7V5kh9kP55i2dK9YExkF6/$7sIs3o.U13D3vSlWYwZ1rRxoETUYZ3ms0xGLRpe8f95:19104:0:99999:7:::`

第一段：用户名

第二段：加密后的密码，没有密码的用户则是`*`或者`!!`，是不能登录的

第三段：密码何时修改过，1970 年 1 日 1 日往后加的日子

第四段：两次修改密码的间隔时间，若5，则至少间隔5天再改密码

第五段：密码有效期，1970 年 1 日 1 日开始计算，单位天

第六段：密码到期前多少天开始警告

第七段：密码到期后宽限的天数

第八段：用户失效的时间，用时间戳表示

第九段：无功能

## 1.3 `/etc/group`文件

`/etc/group`**组信息**
{% image https://bu.dusays.com/2022/09/21/632b05b432b1d.png, alt= %}

第一段：用户组名

第二段：用户组密码

第三段：对应GID

第四段：用户列表，可以为空

## 1.4 `/etc/gshadow`文件

`/etc/gshadow`**存放组密码**
{% image https://bu.dusays.com/2022/09/21/632b056ecc326.png, alt= %}


第一个字段：用户组名称

第二个字段：用户组密码，通常不会设置

第三个字段：组管理员

第四个字段：用户列表，本字段可以为空

## 1.5 useradd命令和groupadd命令

`useradd -o -u 0 root2`
{% image https://bu.dusays.com/2022/09/21/632b05cd8a139.png, alt= %}


建立的是root用户的别名用户

`-o` 允许创建的用户的 UID 相同

`-u` UID，0为uid数，root为0

`groupadd kkk`

添加kkk的用户组

`useradd root2 -g kkk` 新建一个root2的用户，并加入kkk组

`usermod -l`  修改账号名称

`usermod -c`  修改账号的备注

`usermod -g` 修改用户所属的群组

`usermod -G` 修改用户所属的附加群组

`usermod -d` 修改用户登入时的目录

`usermod -e` 修改账号的有效期限

`usermod -f` 修改过期后多少天关闭该账号

`usermod -L` 锁定用户密码，使密码无效

`usermod -s <sherll>`修改用户登入后所使用的shell

`usermod -u<uid>`  修改用户的id

`usermod -U` 解除密码锁定

例：`usermod kali -l kk123`  把kali改成kk123

组同理`groupmod fsec -n fsec123`

`groupmod -g`  改组gid

`groupmod -h` 显示被帮助信息

`groupmod -n` 改组名

`groupmod -o` 允许使用重复GID

`groupmod -p 改密码`

`groupmod -R` 在CHROOT_DIR目录中，修改的内容将会生效

`userdel`和`groupdel` 删除用户和组

## 1.6 passwd命令

passwd修改或添加用户密码

# 2.网络相关

## 2.1网卡配置文件

Centos:`/etc/sysconfig/network-scripts/ifcfg-[网卡名]`

```
DEVICE="eth0"                                #网卡名
HWADDR="00:0C:29:FD:FF:2A"                   #mac地址
NM_CONTROLLED="yes"                          #network mamager的参数，实时生效，不需要重启
ONBOOT="yes"                                 #开机自动链接
IPADDR=192.168.1.31                          #ip地址
NETMASK=255.255.255.0                        #子网掩码
GATEWAY=192.168.1.1                          #网关
BOOTPROTO=static                             #静态ip
```

## 2.2设置网卡状态的两种方法

### 2.2.1 systemctl 和 service 命令

`systemctl restart/stop/start/status network`          #重启/停止/启动/查看状态
`service network restart/stop/start/status`            #重启/停止/启动/查看状态

### 2.2.2  nmcli 命令

`nmcli c show`                 #查看状态
`nmcli c up/down [网卡名]`      #启动/关闭
`nmcli c reload [网卡名]`       #重启
`nmcli c modify enp0s3 ipv4.addresses 192.168.0.62/24`
`nmcli c modify enp0s3 ipv4.gateway 192.168.0.1`
`nmcli c modify enp0s3 ipv4.dns 8.8.8.8`

## 2.3 DNS相关

DNS配置文件`/etc/resolv.conf`  nameserver 114.114.114.114

## 2.4 查看网络IP的命令

`ip -a` 

`ifconfig`

## 2.5 Ubantu/Kali上网相关

### 2.5.1 网卡配置

Ubantu : `/etc/network/inferfaces`

主要参数：

`#若设置静态IP`

`auto [网卡名]
iface [网卡名] inet static
address 192.168.3.90                #ip地址
gateway 192.168.3.1                 #网关
netmask 255.255.255.0               #子网掩码`

`#若设置动态IP`

`auto [网卡名]
iface eth0 inet dhcp`

### 2.5.2****设置网卡状态****

`/etc/init.d/networking restart`  #重启网卡
`/etc/init.d/networking start`    #启动网卡
`/etc/init.d/networking stop`     #关闭网卡

### 2.5.3DNS配置

配置文件储存于`/etc/resolv.conf`

nameserver 192.168.0.1

## 3.sudo

`/etc/sudoers`

给KK添加权限`%KK ALL=(ALL) ALL`

`sudo -i` 切换为root用户，会切换目录

`sudo -s` 不换环境，用sodo环境

## 4.`su`切换用户,切换后是原来的环境变量

`su -` 切换用户 是用户的变量

## 5.文件权限

`ls -al` 

{% image https://bu.dusays.com/2022/09/21/632b06034021a.png, alt= %}

- 第一个字段为：是文件类型，和属主属组其他人的读写执行权限。严格来说这是两个字段。
- 第二个字段为：也就是上图看到的1字样，对文件是文件内容被系统记录的次数。对目录是目录中文件属性的字节数
- 第三个字段为：属主，文件的所有者
- 第四个字段为：属组，文件的所有组
- 第五个字段为：内容大小
- 第六个字段为：文件最后一次被修改的时间
- 第七个字段为：文件名字

第一个字段中，会出现这样的形式`drwxr-xr-x.`共是11个字符

常规d,-

- `-`：常规文件
- **`b`**：块特殊文件
- **`c`**：字符特殊文件
- **`C`**：高性能（”连续数据“）文件
- **`d`**：目录
- **`D`**：门(Solaris 2.5及以上版本)
- **`l`**：符号链接
- **`M`**：离线（”前已“）文件（Cray DMF）
- **`n`**：网络专用文件（HP-UX）
- **`p`**：FIFO（命名管道）
- **`P`**：断开（Solaros 10及以上）
- **`s`**：套接字
- **`?`**：其他文件

第二到第十个字符：共有9个字符，每三个为一组。代表`属主` 、`属组` 、`其他人`的权限。

常见的权限有`r` `w` `x`，分别为读权限、写权限、执行权限

如一个文件这一部分字段表达为`-rwxrw-r--.`。

- 则表示此文件是一个文件而非目录；
- 此文件的属主（拥有者/创建者）具备对其的**读、写、执行**权限；
- 此文件的属组（文件所有者同一个用户组的用户）具备**读、写**权限，而没有执行权限；
- 此文件属主与属组之外的用户，具有**读**权限，但无法修改与执行。
- 如果一个文件需要能够被读取，则需要`r`权限
- 如果一个文件需要能够被编辑，则需要`r`与`w`权限。
- 如果一个文件能够被执行，则需要`x`权限

在第四、第七和第十个字符中，除却常见的`x`执行权限外，还有其他情况：

- **`S`**：设置了SUID或SGID，没有执行权限
- **`s`**：设置了SUID或SGID，具有执行权限
- **`T`**：设置了粘滞位，没有执行权限
- **`t`**：设置了粘滞位，具有执行权限

第十一个字符的含义：

- **`.`**：没有任何其他替代访问方法的SELinux安全上下文（没有设置ACL）
- **`+`**：具有任何其他组合访问方法的SELinux安全上下文（设置了ACL）

### 6.计划任务

`crontab`被用来提交和管理用户的需要周期性执行的任务

`crontab -e` 编辑当前用户的cron表

`crontab -l`查看当前用户的cron表

`crontab -r` 删除当前用户的cron表

- `/var/spool/cron/` 目录下存放的是每个用户包括root的crontab任务，每个任务以创建者的名字命名
- `/etc/crontab` 这个文件负责调度各种管理和维护任务。
- `/etc/cron.d/` 这个目录用来存放任何要执行的crontab文件或脚本。

cron的格式为：`分 时 日 月 周 命令`

```
*    #代表任意时间
,    #代表不联系的时间点，2,3 表示2和3都行
-    #代表连续的时间段，比如2-4表示2,3,4
*/n  #代表每隔单位时间
```

`crontab -u <user> -l` 可以看其他用户的计划任务

### 7.开机自启

`systemctl`的命令中，`enable`代表开机自启，`disable`代表取消开机自启。

如想设置某服务开机自启，可使用`systemctl enable [服务名]`

案例：

`systemctl enable nginx`

**开机自动执行命令**

`/etc/rc.d/rc.local`用于添加开机启动命令,`/etc/rc.local`是`/etc/rc.d/rc.local`的软链接，软连接相当于windows的快捷方式。

系统开机后会自动执行`/etc/rc.local`,换句话说，只要将你想执行的命令写入这个文件，`vi /etc/rc.local`，就可以做到开机自动执行。

如我们在此处写入`echo 'hello' >> /root/hello`。

如果你是第一次使用这个文件，需要对其加上执行权限。`chmod +x /etc/rc.local`

老版本的系统中，控制服务启动的命令还有如下的内容：

`chkconfig`

`/etc/init.d/  /etc/rc.d/init.d`

配置的方法可参考网上详细教程。

从centos7开始，系统的服务控制开始由systemctl替换早起版本的chkconfig与service的指令。

systemctl的服务的位置位于`/usr/lib/systemd/system`中。

所以未来在应急响应的排查中，需要排查的目录需要依照操作系统的版本进行针对性的排查。