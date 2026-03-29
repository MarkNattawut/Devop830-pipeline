# Build stage
FROM node:20-alpine AS build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS prod
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --production

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/server.js ./server.js
COPY --from=build /usr/src/app/src/data/products.js ./src/data/products.js

EXPOSE 4000

# default environment, optional
ENV NODE_ENV=production

CMD ["node", "server.js"]
