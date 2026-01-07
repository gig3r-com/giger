FROM node:20 AS builder
ARG TENANT=giger

WORKDIR /src
COPY package*.json ./
RUN apt update \
    && apt install -y \
        libvips-dev \
    && rm -rf /var/lib/apt/lists/*
RUN npm install
COPY . .
RUN npm run build:${TENANT}

FROM nginxinc/nginx-unprivileged:alpine3.18-slim AS intermediate
ARG TENANT=giger

COPY --from=builder --chown=nginx:nginx /src/dist-${TENANT} /usr/share/nginx/html
COPY ./docker/default.conf /etc/nginx/conf.d/
