---
title: Nginx反向代理
ai: true
description: 要事先准备一台`LNMP环境`搭载好网站的服务器，再另准备一台Centos环境虚拟机作为本节实验操作主机
cover: 'https://bu.dusays.com/2022/09/21/632b03b17e530.png'
categories: 小笔记
tags: 小笔记
abbrlink: dfa9b87c
date: 2022-09-22 17:05:34

---

# Nginx反向代理

正向代理是一个位于客户端和目标服务器之间的代理服务器(中间服务器)。为了从原始服务器取得内容，客户端向代理服务器发送一个请求，并且指定目标服务器，之后代理向目标服务器转交并且将获得的内容返回给客户端。

反向代理实际运行方式是指以代理服务器来接受internet上的连接请求，然后将请求转发给内部网络上的服务器，并将从服务器上得到的结果返回给internet上请求连接的客户端，此时代理服务器对外就表现为一个服务器。

反向代理工作在服务期的前端，作为前端服务器，正向代理工作在客户端的前端，为客户端做代理。

简单理解的话，在日常上网过程中，如果在正向代理场景中，你需要知道欲访问资源的地址，在浏览器输入欲访问资源的地址，然后流量经由代理去访问它。通常情况下，客户端与代理在同一内网环境下，典型的场景是burp suite(后文会讲)；

在反向代理场景中，你需要知道的是代理地址，在浏览器输入代理地址，代理会替你请求到欲访问资源。通常情况下，代理与服务端在同一内网环境下，典型的场景是nigix作为代理使用的情况。

```
[root@localhost nginx]# nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf testis successful
[root@localhost nginx]# nginx -s reload
```

                                                              正向代理和反向代理

# ****NGINX 反向代理的配置文件案例****

需要事先准备一台`LNMP环境`搭载好网站的服务器，再另准备一台Centos环境虚拟机作为本节实验操作主机

**192.168.0.244 # nginx反向代理IP**

**192.168.0.222 # real server ip（被代理服务器地址）**

修改`/etc/nginx/nginx.conf`

```bash
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
include /usr/share/nginx/modules/*.conf;
events {
worker_connections 1024;
}
http {
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
'$status $body_bytes_sent "$http_referer" '
'"$http_user_agent" "$http_x_forwarded_for"';
access_log  /var/log/nginx/access.log  main;
sendfile            on;
tcp_nopush          on;
tcp_nodelay         on;
keepalive_timeout   65;
types_hash_max_size 2048;
include             /etc/nginx/mime.types;
default_type        application/octet-stream;
include /etc/nginx/conf.d/*.conf;

    include /etc/nginx/default.d/*.conf;
upstream web1 {
server 192.168.0.222  weight=1;        #此处填写被代理服务器IP
#server 192.168.0.17  weight=1;
#ip_hash;
}
server{
listen 80;
server_name www.farmsec.org;
access_log  /var/log/nginx/farmsec.log;
location / {
root /home/web1_root;
proxy_pass http://web1;
proxy_read_timeout 300;
proxy_connect_timeout 300;
proxy_redirect     off;
proxy_set_header   X-Forwarded-Proto $scheme;
proxy_set_header   Host              $http_host;
proxy_set_header   X-Real-IP         $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
}
}
```

**upstream**模块： 定义一组服务器。 这些服务器可以监听不同的端口。 而且，监听在TCP和UNIX域套接字的服务器可以混用。

在如下配置文件中，nginx反向代理服务器代理了两个服务器(192.168.0.12和192.168.0.17)，并采用负载均衡模式。所谓负载均衡是指将负载（工作任务）进行平衡、分摊到多个操作单元上进行运行。在此场景中，可以理解为nginx服务器将来访流量平均分配给被代理的两个服务器。配置文件中weigtht参数表示权值，权值越高被分配到的几率越大，此配置文件中两个weight值都为1，即代表平均分配。

```bash
upstream web1 {
server 192.168.0.12  weight=1;      #weigtht参数表示权值，权值越高被分配到的几率越大
server 192.168.0.17  weight=1;
ip_hash;                            #负载均衡集群模式
location / {
root /home/web1_root;       #定义服务器的默认网站根目录位置
        proxy_pass <http://web1>;     #请求转向mysvr 定义的服务器列表
        proxy_read_timeout 300;     #连接成功后，后端服务器响应时间(代理接收超时)
        proxy_connect_timeout 300;  #nginx跟后端服务器连接超时时间(代理连接超时)
        proxy_redirect     off;     #代理重定向
                                    #后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_set_header   Host              $http_host;
        proxy_set_header   X-Real-IP         $remote_addr;
}
```

## ****启动NGINX反向代理****

修改好nginx配置文件后，执行以下命令重启nginx服务

```bash
nginx -t              # 测试配置文件是否有语法错误
nginx -s reload       # 重新加载Nginx配置文件，然后以优雅的方式重启Nginx
```

{% image https://bu.dusays.com/2022/09/23/632da5c7db56f.png, alt= %}

用浏览器打开`http://反向代理IP/文件`的格式访问，可以发现当你访问nginx反向代理时，服务器代你去访问了其代理的网站资源

{% image https://bu.dusays.com/2022/09/23/632da6039fa0c.png, alt= %}

同时查看nginx的日志(两台均看)

{% image https://bu.dusays.com/2022/09/23/632da619caec9.png, alt= %}

发现，当你访问nginx代理服务器时，代理服务器会记录你的主机IP来访问，而被代理服务器（网站）则会记录nginx反代服务器IP来访问的情况

## **捕获客户端真实IP**

在此架构中，后端真实服务器获取的log中，IP地址变成了反向代理IP。但在实际工作时，尤其在防御黑客入侵方面，我们更需要日志记录来访的真实IP而非代理IP。这需要在配置文件中修改一个参数实现。

在反向代理服务器上开启X-Forwarded-For

```bash
vi /etc/nginx/nginx.conf# 在配置文件中修改如下内容：
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

{% image https://bu.dusays.com/2022/09/23/632dab216bddb.png, alt= %}

查看nginx的日志（2台都看)

{% image https://bu.dusays.com/2022/09/23/632da651038c7.png, alt= %}

看到，目前反向代理服务器和被代理（网站）服务器的日志都记录了，你的kali主机IP的访问情况

# ****高可用及负载均衡****

装两台nginx服务，在nginx网页目录下保存一个1.html作为网页文件。并将nignx启动

```
dnf install nginx
systemctl start 知道什么程序干什么用的
systemctl enable nginx
```

两台安装好后，设置另两台服务器上安装nignx为反向代理并代理后端真实server，配置文件相同。

两台都重启一下nginx服务 systemctl restart nginx 访问一下是否更改成功

{% image https://bu.dusays.com/2022/09/23/632da6769d7fe.png, alt= %}

**装keepalived**

两台nginx反向代理服务器均安装`keepalived`服务，`keepalived`服务可以的作用是检测服务器的状态，如果有一台web服务器宕机，或工作出现故障，Keepalived将检测到，并将有故障的服务器从系统中剔除，同时使用其他服务器代替该服务器的工作，当服务器工作正常后Keepalived自动将服务器加入到服务器群中，这些工作全部自动完成，不需要人工干涉，需要人工做的只是修复故障的服务器。

`yum -y install keepalived`

{% image https://bu.dusays.com/2022/09/23/632dab4bf04ff.png, alt= %}

修改keepalived配置文件 `vi /etc/keepalived/keepalived.conf`
主：

```bash
###keepa.conf
global_defs{
router_id keepalived_91
}
vrrp_script Monitor_Nginx {
script "/etc/keepalived/monitor_nginx.sh"
interval 5
weight 2
}
vrrp_instance VI_1 {
state MASTER
interface ens3
virtual_router_id 91
priority 150
advert_int 1
authentication {
    auth_type PASS
    auth_pass 1122
}

#VIP
virtual_ipaddress {
    192.168.0.101
}
track_script {
    Monitor_Nginx
}
}
global_defs{
router_id keepalived_181
}
vrrp_instance VI_2 {
state BACKUP
interface ens3
virtual_router_id 181
priority 100
advert_int 1

authentication {
    auth_type PASS
    auth_pass 2211
}

#VIP
virtual_ipaddress {
    192.168.0.100
}
track_script {
    Monitor_Nginx
}
authentication {
    auth_type PASS
    auth_pass 2211
}

#VIP
virtual_ipaddress {
    192.168.0.100
}
track_script {
    Monitor_Nginx
}
}
```

第二台

```
###keepb.conf
global_defs{
router_id keepalived_91
}
vrrp_instance VI_1 {
state BACKUP
interface ens3
virtual_router_id 91
priority 100
advert_int 1
authentication {
    auth_type PASS
    auth_pass 1122
}

#VIP
virtual_ipaddress {
    192.168.0.100
}
track_script {
    Monitor_Nginx
}
}
global_defs{
router_id keepalived_181
}
vrrp_script Monitor_Nginx {
script "/etc/keepalived/monitor_nginx.sh"
interval 5
weight 2
}
vrrp_instance VI_2 {
state MASTER
interface ens3
virtual_router_id 181
priority 150
advert_int 1
authentication {
    auth_type PASS
    auth_pass 2211
}

#VIP
virtual_ipaddress {
    192.168.0.101
}
track_script {
    Monitor_Nginx
}
}
```

{% image https://bu.dusays.com/2022/09/23/632dab787418c.png, alt= %}
> vrrp_instance VI_1 {
state BACKUP               #此处修改为BACKUP
interface  enp0s3          #注意网卡名是否一样
virtual_router_id 109
priority 100               #此处需要比主数值低，主是150，从则为100
advert_int 1
> 

为两台keepalived编写监测脚本，脚本内容主从均为一样 `vi /etc/keepalived/monitor_nginx.sh`

```bash
#!/bin/bash
farmsec=$(ps -C nginx --no-heading|wc -l)
if [ "${farmsec}" = "0" ]; then
systemctl stop keepalived
fi
```

监测脚本添加权限并启动keepalived：

```bash
chmod 755 /etc/keepalived/monitor_nginx.sh
systemctl start keepalived
systemctl enable keepalived
```

启动keeplived后，使用命令ip a查看是否配置成功

`server1 ip为192.168.0.242      #虚拟IP 192.168.0.100`

`server2 ip为192.168.0.244        #虚拟IP 192.168.0.101`

可以看到虚拟ip已分别挂载到两台server上

使用虚拟ip访问一下查看是访问，成功访问到后段真实server