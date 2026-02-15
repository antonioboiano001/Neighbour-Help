FROM nginx:1.29.4

LABEL authors="boian"

#

WORKDIR /usr/share/nginx

#

COPY static/  ./html

COPY /nginx/conf-nginx.conf /etc/nginx/conf-nginx.conf

EXPOSE 80

#

CMD ["nginx", "-c", "/etc/nginx/conf-nginx.conf", "-g", "daemon off;"]