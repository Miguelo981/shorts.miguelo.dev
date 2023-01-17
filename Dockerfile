FROM node:18-alpine

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build

CMD [ "yarn", "start" ]
#CMD [ "yarn", "dev" ]