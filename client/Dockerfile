FROM nginx:1.17

RUN mkdir -p /var/html/data-acquisition

COPY ./client /var/html/data-acquisition
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf