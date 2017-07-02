FROM node:8

EXPOSE 8888

VOLUME /app

WORKDIR /app
RUN npm install -g supervisor
#If you have problem with links on windows use this intead of npm install
#RUN npm install
#CMD npm install --no-bin-links && node server.js
ADD package.json package.json
COPY entrypoint.sh /root/entrypoint.sh
RUN chmod +x /root/entrypoint.sh
ENTRYPOINT /root/entrypoint.sh

#CMD supervisor server.js