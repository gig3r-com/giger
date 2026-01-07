FROM node:18-alpine3.18 AS builder
ARG TENANT=giger

WORKDIR /src
COPY package*.json ./
RUN apk add --update --no-cache vips-dev
RUN npm install
COPY . .
RUN npm run build:${TENANT}

FROM nginxinc/nginx-unprivileged:alpine3.18-slim AS intermediate
ARG TENANT=giger

COPY --from=builder --chown=nginx:nginx /src/dist-${TENANT} /usr/share/nginx/html
COPY ./docker/default.conf /etc/nginx/conf.d/
