FROM node:16

WORKDIR /app

COPY .nvmrc package.json package-lock.json Makefile ./

RUN npm ci

COPY . .

RUN make build
RUN npm prune --production

EXPOSE 8081
CMD ["node", "./out/app/app.js"]