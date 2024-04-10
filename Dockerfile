FROM node:18.15.0-alpine3.17

WORKDIR /app

RUN npm install -g @angular/cli@15

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4200
CMD ["ng", "serve", "--watch", "false", "--configuration", "production", "--host", "0.0.0.0"]
