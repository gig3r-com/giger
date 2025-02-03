FROM node:18-alpine3.18 AS builder

WORKDIR /src
COPY package*.json ./
RUN apk add --update --no-cache vips-dev
RUN npm install
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine3.18-slim AS intermediate

COPY --from=builder /src/dist /usr/share/nginx/html
COPY ./docker/default.conf /etc/nginx/conf.d/
