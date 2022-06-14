FROM node:16

WORKDIR /usr/src/app

COPY yarn.lock ./

COPY package.json ./

RUN yarn --prod

COPY ./dist ./dist

COPY ./config ./config

COPY ./config ./config

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
