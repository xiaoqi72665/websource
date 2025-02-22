---
title: 搭建DVWA靶机
ai: true
description: 'LAMP,LNMP.DVWA'
cover: 'https://bu.dusays.com/2022/09/21/632b03ae9b401.jpg'
tags: 小笔记
categories: 小笔记
abbrlink: 721dcdef
date: 2022-09-22 12:05:34
---
# 搭建DVWA靶机

- **LAMP环境** `(linux,apache,mariadb,php)`
    
    需准备DVWA部署包。可用命令下载：`git clone https://github.com/digininja/DVWA.git`
    
    ```
    dnf install -y httpd httpd-devel mariadb mariadb-server php php-mysqlnd php-gd libjpeg* php-ldap php-odbc php-pear php-xml php-mbstring php-bcmath php-mhash
    ```
    
    ```
    systemctl start mariadb
    systemctl enable mariadb
    mysqladmin -u root password 123456
    systemctl start httpd
    systemctl enable httpd
    scp -r * root@192.168.31.187:/var/www/html/
    mysql -u root -p123456
    create database wordpress;
    ```
    
- **LNMP环境** `(linux,nginx,mariadb,php)`
    
    ```
    dnf -y install nginx mariadb mariadb-server php* 
    ```
    
    ```
    systemctl start mariadb
    systemctl enable mariadb
    mysqladmin -u root password 123456
    systemctl start nginx
    systemctl enable nginx
    ```
    

## **搭建DVWA**

将DVWA文件拷贝至apache网页目录：

```
scp -r * root@192.168.x.x:/var/www/html/
```

{% image https://bu.dusays.com/2022/09/21/632b08c7776d9.png, alt= %}

请确保您的 `config/config.inc.php`文件存在

只有 `config.inc.php.dist`是不够的，您必须编辑它以适应您的环境并将其重命名为 `config.inc.php`

**数据库设置**：

请确保您在 `./config/config.inc.php` 中的数据库凭据是正确的

变量默认设置如下：

```
$_DVWA[ 'db_user' ] = 'dvwa';
$_DVWA[ 'db_password' ] = 'p@ssw0rd';
$_DVWA[ 'db_database' ] = 'dvwa';
```

要根据数据库更改其设置。

{% image https://bu.dusays.com/2022/09/21/632b08c6b0e97.png, alt= %}

访问网址根据网页提示完成其他设置：

**文件夹权限**：

- `./hackable/uploads/` - 需要允许web服务可写（用于文件上传）。
- `./external/phpids/0.6/lib/IDS/tmp/phpids_log.txt` - 需要允许web服务可写（如果你想使用 PHPIDS）。

**PHP配置**:

- `allow_url_include = on` - 允许远程文件包含 (RFI) [[allow_url_include](https://secure.php.net/manual/en/filesystem.configuration.php#ini.allow-url-include)]
- `allow_url_fopen = on` - 允许远程文件包含 (RFI) [[allow_url_fopen](https://secure.php.net/manual/en/filesystem.configuration.php#ini.allow-url-fopen)]
- `safe_mode = off` - （如果 PHP <= v5.4）允许 SQL 注入（SQLi） [[safe_mode](https://secure.php.net/manual/en/features.safe-mode.php)]
- `magic_quotes_gpc = off` - （如果 PHP <= v5.4）允许 SQL 注入（SQLi） [[magic_quotes_gpc](https://secure.php.net/manual/en/security.magicquotes.php)]
- `display_errors = off` - （可选）隐藏 PHP 警告消息以使其不那么冗长 [[display_errors](https://secure.php.net/manual/en/errorfunc.configuration.php#ini.display-errors)]

**文件: `config/config.inc.php`**:

- `$_DVWA[ 'recaptcha_public_key' ]` & `$_DVWA[ 'recaptcha_private_key' ]` - 这些值需要从[https://www.google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create) 生成

一般来说只需要以下命令：

```
chmod 777 /var/www/html/hackable/uploads/
```

```
chmod 777 /var/www/html/external/phpids/0.6/lib/IDS/tmp/phpids_log.txt
```

```
chmod 777 /var/www/html/config
```

```
vi /etc/php.ini                # 设置allow_url_include=On
```

```
vi /var/www/html/config/config.inc.php # 设置数据库信息；填写key（可选）
```

```
systemctl restart httpd.service
```

当以上设置全部完成后，网页应如下图所示，此时单击`Create / Reset Database`按钮。 这将为您创建/重置数据库，并填入一些数据。

{% image https://bu.dusays.com/2022/09/21/632b08c6c0771.png, alt= %}