FROM node:16-alpine

WORKDIR /shorten-link/backend

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli @babel/node @babel/preset-env

COPY . .

RUN npm run build

CMD  /shorten-link/backend/start.sh

EXPOSE 80