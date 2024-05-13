FROM node:18-alpine as buildstage

WORKDIR /app

COPY package.json /app/

COPY package-lock.json /app/

RUN npm i 

RUN npm run build 

