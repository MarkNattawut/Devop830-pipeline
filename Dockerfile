# ---------- Build Stage ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ---------- Production Stage ----------
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# copy build output (Vite)
COPY --from=build /app/dist ./dist

# copy backend
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/src/data/products.js ./src/data/products.js

EXPOSE 80

ENV NODE_ENV=production

CMD ["node", "server.js"]
