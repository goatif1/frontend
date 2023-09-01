FROM node:16

WORKDIR /opt/goatif1/frontend

COPY . .

RUN npm install

EXPOSE 443

CMD [ "npm", "start" ]