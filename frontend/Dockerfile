FROM node:18-alpine3.18 as builder

WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine3.18-slim as intermediate

COPY --from=builder /src/dist /usr/share/nginx/html
COPY ./docker/default.conf /etc/nginx/conf.d/
