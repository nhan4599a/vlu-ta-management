FROM node:20 AS BUILD_ENV

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g @vercel/ncc
RUN npm run build

FROM node:20 AS RUN_ENV

WORKDIR /app

RUN mkdir -p public

COPY --from=BUILD_ENV app/dist/ .

ENV PORT=5000
ENV CONNECTION_STRING=mongodb://mongo:27017/vlu-ta-management
ENV NODE_ENV=production

ENTRYPOINT [ "node", "index.js" ]

EXPOSE 5000
