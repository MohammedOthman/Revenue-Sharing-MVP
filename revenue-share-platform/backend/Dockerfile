FROM node:20-alpine

WORKDIR /app

# Install production dependencies first for better layer caching.
COPY package*.json ./
RUN npm ci --omit=dev

# Application code (includes migrations/ and openapi.yaml).
COPY . .

ENV NODE_ENV=production
EXPOSE 5000

# The server applies pending migrations on startup, then listens.
CMD ["node", "src/server.js"]
