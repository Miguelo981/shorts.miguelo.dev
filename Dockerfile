FROM node:18-alpine

WORKDIR /app
COPY . .

RUN apk add --no-cache git openssh
RUN yarn install

CMD [ "yarn", "dev" ]