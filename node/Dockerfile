FROM node:argon

EXPOSE 8888

WORKDIR /app

RUN npm install -g supervisor
#If you have problem with links on windows use this intead of npm install
#npm install --no-bin-links
CMD npm install --no-bin-links && node server.js
# CMD /bin/bash