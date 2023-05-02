FROM node:16-alpine

WORKDIR /shorten-link/backend

COPY package*.json ./

RUN npm install

RUN npm i mysql2

RUN npm install -g @babel/core @babel/cli @babel/node @babel/preset-env

COPY . .

RUN npm run build

RUN chmod +x /shorten-link/backend/start.sh

CMD  /shorten-link/backend/start.sh