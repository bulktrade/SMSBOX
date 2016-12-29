FROM node:7-alpine

ADD ./ /app

WORKDIR /app

RUN npm install

WORKDIR /app/backend

RUN npm install
RUN npm run build:universal

WORKDIR /app/client

RUN npm install

CMD ["node","/app"]

EXPOSE 80