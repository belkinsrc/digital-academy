FROM node:alpine AS base

WORKDIR /app

COPY package*.json .

# dev stage

FROM base AS dev

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# prod stage

FROM base AS prod

RUN npm install --production

COPY . .

CMD ["npm", "run", "build"]





