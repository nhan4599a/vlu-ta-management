FROM node:18-alpine AS BUILD_ENV

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

COPY . .

FROM nginx:latest AS RUN_ENV

WORKDIR /app

COPY ./default.conf /etc/nginx/conf.d
COPY --from=BUILD_ENV /app/dist /usr/share/nginx/html