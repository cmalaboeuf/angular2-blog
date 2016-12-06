FROM nginx:1

RUN rm -f /etc/nginx/nginx.conf
ADD nginx.conf /etc/nginx/

RUN rm -f /etc/nginx/sites-enabled/default
ADD sites-enabled/default /etc/nginx/sites-enabled/

EXPOSE 80