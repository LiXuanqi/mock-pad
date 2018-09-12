FROM node:8.11.4

RUN apt-get update && apt-get install -y \
    iputils-ping \
    iproute2 \
    curl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /code

COPY /client /code/client
COPY /server /code/server
COPY /docker-server-entrypoint.sh /

WORKDIR /code/client
RUN npm install -g @angular/cli && npm install && ng build

WORKDIR /code/server
RUN npm install

WORKDIR /