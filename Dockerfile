FROM node:8.11.4
WORKDIR /code
COPY /client /code/client
COPY /server /code/server
WORKDIR /code/client
RUN npm install -g @angular/cli && npm install && ng build
WORKDIR /code/server
RUN npm install