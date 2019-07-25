FROM ubuntu:16.04

ENV MONGO_VERSION=4.0

RUN groupadd -r mongodb && useradd -r -g mongodb mongodb

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4

RUN  echo "deb [arch=arm64] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/${MONGO_VERSION} multiverse" | tee /etc/apt/sources.list.d/mongodb-org-${MONGO_VERSION}.list

RUN apt-get update \
    && apt-get install -y mongodb-server \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /var/lib/mongodb 

RUN mkdir -p /data/db /data/configdb \
    && chown -R mongodb:mongodb /data/db /data/configdb

VOLUME /data/db /data/configdb

WORKDIR /data

EXPOSE 27017

CMD ["mongod", "--smallfiles"]