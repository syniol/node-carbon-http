FROM node:22.18.0-alpine

COPY . .

RUN npm i && npm start
