FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

RUN npm run migration:run

CMD ["npm", "run", "start:dev"]
