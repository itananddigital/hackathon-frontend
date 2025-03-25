# Stage 1: Build
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/.next .next
COPY --from=build /app/package.json package.json
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
