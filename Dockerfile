FROM node:10.19

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production --no-optional

COPY . .

EXPOSE 3000

CMD [ "node", "main.js" ]


