FROM node:7-alpine

ADD modules/backend /app/backend
ADD modules/client /app/client

WORKDIR /app/backend

RUN npm install
RUN npm run build:universal

WORKDIR /app/client

RUN npm install

EXPOSE 80