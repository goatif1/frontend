FROM node:16

WORKDIR /opt/goatifi/frontend

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 443

CMD npm run start