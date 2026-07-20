# Single-service image: builds the React frontend, then runs the Express API
# which also serves the built frontend. Build from the revenue-share-platform/
# directory:  docker build -t revenue-share .

# ---- Stage 1: build the frontend ----
FROM node:22-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ---- Stage 2: backend runtime ----
FROM node:22-alpine AS backend
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev
COPY backend/ ./
# Copy the built frontend so server.js can serve it from ../../frontend/dist
COPY --from=frontend /app/frontend/dist /app/frontend/dist
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "src/server.js"]
