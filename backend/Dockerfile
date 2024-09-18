FROM node:alpine AS base

WORKDIR /app

EXPOSE 5000

COPY package*.json .

# dev stage

FROM base AS dev

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

# prod stage

FROM base AS prod

RUN npm install --production

COPY . .

CMD ["npm", "start"]
