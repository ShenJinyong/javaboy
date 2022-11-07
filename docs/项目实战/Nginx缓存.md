# Nginx缓存

1. 缓存文件放在哪儿？
2. 如何指定哪些请求被缓存？
3. 缓存的有效期是多久？
4. 如何指定哪些请求不被缓存？

## 1 缓存文件放在哪儿？

配置

```sh
$ vim $NGINX_HOME/conf/nginx.conf
worker_processes  auto;
events {
    use  epoll;
    worker_connections  65535;
}
http {
    proxy_cache_path /data/nginx/cache  keys_zone=one:10m  max_size=10g;
    upstream aidan.org{
        server 127.0.0.1:8881 weight=3;
        server 127.0.0.1:8882 weight=2;
        server 127.0.0.1:8883 weight=1;
    }
    server {
        listen       80;
        proxy_cache  one;
        server_name  aidan.org;
        location / {
            proxy_pass  http://aidan.org;
            proxy_set_header  Host  $host;
            proxy_set_header  X-Real-IP  $remote_addr;
        }
    }
}
$ nginx -t
$ nginx -s reload

```

这里面加了两行配置

```sh
proxy_cache_path /data/nginx/cache  keys_zone=one:10m  max_size=10g;
proxy_cache  one;
```

说明

| 指令             | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| proxy_cache_path | 指定缓存位置、缓存名称、内存中缓存内容元数据信息大小限制、缓存总大小限制。缓存位置是一个目录应该先创建好，nginx并不会帮我们创建这个缓存目录 |
| proxy_cache      | 指定使用前面设置的缓存名称                                   |

## 2. 如何指定哪些请求被缓存？

- Nginx默认会缓存所有get和head方法的请求结果，缓存的key默认使用请求字符串
- 自定义key，例如 proxy_cache_key “h o s t hosthostrequest_uri$cookie_user”;
  

```sh
$ vim $NGINX_HOME/conf/nginx.conf
worker_processes  auto;
events {
    use  epoll;
    worker_connections  65535;
}
http {
    proxy_cache_path /data/nginx/cache  keys_zone=one:10m  max_size=10g;
    upstream aidan.org{
        server 127.0.0.1:8881 weight=3;
        server 127.0.0.1:8882 weight=2;
        server 127.0.0.1:8883 weight=1;
    }
    server {
        listen       80;
        proxy_cache  one;
        server_name  aidan.org;
        location / {
            proxy_pass  http://aidan.org;
            proxy_set_header  Host  $host;
            proxy_set_header  X-Real-IP  $remote_addr;
            proxy_cache_key "$host$request_uri$cookie_user";
        }
    }
}
$ nginx -t
$ nginx -s reload
```

- 指定请求至少被发送了多少次以上时才缓存，可以防止低频请求被缓存，例如：proxy_cache_min_uses 5;

- 指定哪些方法的请求被缓存，例如 proxy_cache_methods GET HEAD POST;

## 3.缓存有效期

默认情况下，缓存的内容是长期存留的，除非缓存的总量超出限制。可以指定缓存的有效期，例如：

- 响应状态码为200 302时，10分钟有效 proxy_cache_valid 200 302 10m;
- 对应任何状态码，5分钟有效 proxy_cache_valid any 5m;

```sh
$ vim $NGINX_HOME/conf/nginx.conf
worker_processes  auto;
events {
    use  epoll;
    worker_connections  65535;
}
http {
    proxy_cache_path /data/nginx/cache  keys_zone=one:10m  max_size=10g;
    upstream aidan.org{
        server 127.0.0.1:8881 weight=3;
        server 127.0.0.1:8882 weight=2;
        server 127.0.0.1:8883 weight=1;
    }
    server {
        listen       80;
        proxy_cache  one;
        server_name  aidan.org;
        location / {
            proxy_pass  http://aidan.org;
            proxy_set_header  Host  $host;
            proxy_set_header  X-Real-IP  $remote_addr;
            proxy_cache_key "$host$request$cookie_user";
            proxy_cache_valid 200 302 10m;
        }
    }
}
$ nginx -t
$ nginx -s reload
```

## 4.如何指定哪些请求不被缓存？

proxy_cache_bypass 该指令响应来自原始服务器而不是缓存
例如：proxy_cache_bypass $cookie_nocache a r g n o c a c h e arg_nocachearg nocachearg_comment;
如果任何一个参数值不为空或者不等0，nginx就不会查找缓存，直接进行代理转发。

```sh
$ vim $NGINX_HOME/conf/nginx.conf
worker_processes  auto;
events {
    use  epoll;
    worker_connections  65535;
}
http {
    proxy_cache_path /data/nginx/cache  keys_zone=one:10m  max_size=10g;
    upstream aidan.org{
        server 127.0.0.1:8881 weight=3;
        server 127.0.0.1:8882 weight=2;
        server 127.0.0.1:8883 weight=1;
    }
    server {
        listen       80;
        proxy_cache  one;
        server_name  aidan.org;
        location / {
            proxy_pass  http://aidan.org;
            proxy_set_header  Host  $host;
            proxy_set_header  X-Real-IP  $remote_addr;
            proxy_cache_key "$host$request$cookie_user";
            proxy_cache_valid 200 302 10m; 
            proxy_cache_bypass $cookie_nocache $arg_nocache$arg_comment;
        }
    }
}
$ nginx -t
$ nginx -s reload

```

网页缓存是由HTTP消息头中的"Cache-control"来控制的，常见的取值有private、no-cache、max-age、must-revalidate等，默认为private。
其作用根据不同的重新浏览方式分为以下几种情况。

Cache-directive	说明
public	所有内容都将被缓存（客户端和代理服务器都可缓存）
private	内容只缓存到私有缓存中（仅客户端可以缓存，代理服务器不可缓存）
no-cache	必须先与服务器确认返回的响应是否被更改，然后才能使用该响应来满足后续对同一个网址的请求。因此，如果存在合适的验证停牌（ETag），no-cache会发起往返通信来验证缓存的响应，如果资源未被更改，可以避免下载
no-store	所有内容都不会被缓存到缓存或Internet临时文件中
must-revalidation/proxy-revalidation	如果缓存内容失败，请求必须发送到服务器、代理以进行重新验证
max-age=xxx(xxx is numeric)	缓存的内容将在xxx秒失效，这个选项只在HTTP 1.1可用，并如果和Last-Modified一起使用时，优先级较高

```sh
$ vim /usr/local/nginx/conf/nginx.conf
worker_processes  auto;
events {
    use  epoll;
    worker_connections  65535;
}
http {
    proxy_cache_path /data/nginx/cache  keys_zone=one:10m  max_size=10g;
    upstream aidan.org{
        server 127.0.0.1:8881 weight=3;
        server 127.0.0.1:8882 weight=2;
        server 127.0.0.1:8883 weight=1;
    }
    server {
        listen       80;
        proxy_cache  one;
        server_name  aidan.org;
        location / {
            proxy_pass  http://aidan.org;
            proxy_set_header  Host  $host;
            proxy_set_header  X-Real-IP  $remote_addr;
            expires 1y;
            proxy_cache_valid any 5m;
            add_header Cache-Control "public";
            add_header X-proxy-Cache $upstream_cache_status;
        }
    }
}
$ nginx -t
$ nginx -s reload
[root@localhost cache]# curl aidan.org/a/a -I
HTTP/1.1 200 
Server: nginx/1.16.1
Date: Mon, 23 Sep 2019 16:01:47 GMT
Content-Type: text/plain;charset=UTF-8
Content-Length: 77
Connection: keep-alive
Expires: Tue, 22 Sep 2020 16:01:47 GMT
Cache-Control: max-age=31536000
Cache-Control: public
X-proxy-Cache: MISS

[root@localhost cache]# curl aidan.org/a/a -I
HTTP/1.1 200 
Server: nginx/1.16.1
Date: Mon, 23 Sep 2019 16:01:49 GMT
Content-Type: text/plain;charset=UTF-8
Content-Length: 77
Connection: keep-alive
Expires: Tue, 22 Sep 2020 16:01:49 GMT
Cache-Control: max-age=31536000
Cache-Control: public
X-proxy-Cache: HIT
```

第一次MISS，第二次命中。