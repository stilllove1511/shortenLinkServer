FROM node:16-alpine

WORKDIR /shorten-link/backend

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/cli @babel/core @babel/node @babel/preset-env

COPY . .

RUN npm run build

CMD ["npm","run","production"]