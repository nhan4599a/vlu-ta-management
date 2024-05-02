FROM node:20

WORKDIR /app

COPY . .

ENV PORT=5000
ENV CONNECTION_STRING=mongodb://mongo:27017

RUN npm install
RUN npm run build

ENTRYPOINT [ "node", "dist/index.js" ]

EXPOSE 5000
