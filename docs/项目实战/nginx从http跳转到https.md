# nginx从http跳转到https

## 使用rewrite指令

```
server {
    listen 80;
    server_name domain.com;
    rewrite ^(.*) https://$server_name$1 permanent;
}
server {
    listen 443 ssl;
    server_name domain.com;
    ssl on;
    ssl_certificate     /etc/nginx/ssl/domain.com.crt;
    ssl_certificate_key /etc/nginx/ssl/domain.com.crt;
    # other
}
```

## 使用return指令

```
server {
    listen 80;
    server_name domain.com;
    return 301 https://$server_name$request_uri;
}
server {
    listen 443 ssl;
    server_name domain.com;
    ssl on;
    ssl_certificate     /etc/nginx/ssl/domain.com.crt;
    ssl_certificate_key /etc/nginx/ssl/domain.com.crt;
    # other
}
```

## 使用error_page指令

```
server {
    listen 80;
    listen 443 ssl;
    server_name domain.com;
    ssl on;
    ssl_certificate     /etc/nginx/ssl/domain.com.crt; 
    ssl_certificate_key /etc/nginx/ssl/domain.com.crt;
    # other
    error_page 497 https://$server_name$request_uri;
}
```

