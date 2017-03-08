FROM node:argon

EXPOSE 8888

VOLUME /app 

WORKDIR /app
RUN npm install -g supervisor
#If you have problem with links on windows use this intead of npm install
#RUN npm install 
#CMD npm install --no-bin-links && node server.js
CMD supervisor server.js
