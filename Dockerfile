FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

run npm install

COPY . .

EXPOSE 3001

CMD ['npm', 'dev']
