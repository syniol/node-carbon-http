FROM node:22.18.0-alpine

RUN mkdir -p /var/local/syniol/carbon-http

WORKDIR /var/local/syniol/carbon-http/
COPY . .

RUN npm i && npm test
