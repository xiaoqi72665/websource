---
title: 'Linux,Redhat 安装命令'
ai: true
description: 基础命令
cover: 'https://bu.dusays.com/2022/09/21/632b0108adfc3.jpg'
tags: 小笔记
categories: 小笔记
abbrlink: 73c16f1f
date: 2022-09-22 12:10:34
---
# Linux,Redhat 安装命令
| 功能                             | Debian             | Redhat                                 | Redhat  (dnf)         |
|--------------------------------|--------------------|----------------------------------------|-----------------------|
| 安装软件包                          | dpkg -i            | rpm -ivh                               | dnf install           |
| 移除软件（保留配置）                     | dpkg -r            | rpm -evh                               |                       |
| 移除软件（不保留配置）                    | dpkg -P            |                                        |                       |
| 列出安装包的内容                       | dpkg -c            | rpm -qlp                               |                       |
| 配合&#124;grep，查找主机包                  | dpkg -l&#124;grep       | rpm -qa&#124;grep                           |                       |
| 查找包的详细信息                       | dpkg -s            |                                        | dnf info nano         |
| 查看已安装的软件包文件分布                  | dpkg -L            |                                        |                       |
| 显示安装包的状态信息                     | dpkg -S            | rpm -ql                                |                       |
| 列出软件的所有设置文件                    |                    | rpm -qc                                |                       |
| 查询安装包依赖软件                      |                    | rpm -qR                                |                       |
| 查询文件出生（文件名）                    |                    | rpm -qf                                | dnf provides          |
| 安装软件包                          | apt-get install    | yum -y install                         |                       |
| 卸载软件（不包含配置）                    | apt-get remove     | yum remove                             | dnf remove            |
| 卸载指令（包含配置）                     | apt-get purge      |                                        |                       |
| 将所有包的来源更新（更新源）                 | apt-get update     | yum makecache                        | dnf update            |
| 将系统中旧版本的包更新至最新                 | apt-get upgrade    | yum update                             |                       |
| 用关键词搜索包                        | apt-cache search   | yum search                           |                       |
| 显示特定包的基本信息                     | apt-cache show     | yum info                               |                       |
| 列出包的依赖                         | apt-cache depends  | yum deplist rpm                      |                       |
| 清理本地包占用                        | apt-get clean      | yum clean all                          | dnf clean all         |
| 卸载软件附带依赖且不要的包                  | apt-get autoremove |                                        | dnf autoremove        |
| 显示所有已经安装和可以安装的程序包              |                    | yum list |grep                         |                       |
| 列出组                            |                    | yum group list                         |                       |
| 安装‘Security Tools’软件组          |                    | yum group install "Security Tools" |                       |
| 显示系统中可用的 DNF 软件库               |                    |                                        | dnf repolist          |
| 显示系统中可用和不可用的所有的 DNF 软件库        |                    |                                        | dnf repolist all      |
| 列出所有来自软件库的可用软件包和所有已经安装在系统上的软件包 |                    |                                        | dnf list              |
| 列出所有安装了的 RPM 包                 |                    |                                        | dnf list installed    |
| 列出所有可用软件库的可供安装的软件包             |                    |                                        | dnf list available    |
| 查找某一文件的提供者                     |                    |                                        | dnf provides          |
| 升级指定软件包                        |                    |                                        | dnf update systemd  |
| 检查系统中所有软件包的更新                  |                    |                                        | dnf check-update      |
| 查看系统上dnf命令的执行历史                |                    |                                        | dnf history           |
| 列出所有的软件包组                      |                    |                                        | dnf grouplist         |
| 安装一个软件包组                       |                    |                                        | dnf groupupdate       |
| 卸载一个软件包组                       |                    |                                        | dnf groupremove       |
| 重新安装特定软件包                      |                    |                                        | dnf reinstall         |
