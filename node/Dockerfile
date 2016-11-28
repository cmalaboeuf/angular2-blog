FROM ubuntu:14.04

EXPOSE 8888

RUN mkdir /app
WORKDIR /app

RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get update
RUN apt-get install -y nodejs && apt-get install -y npm
RUN npm install --no-bin-links

CMD /bin/bash