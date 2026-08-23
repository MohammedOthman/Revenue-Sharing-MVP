# syntax=docker/dockerfile:1
FROM node:22-alpine AS frontend-build
WORKDIR /app/revenue-share-platform/frontend
COPY revenue-share-platform/frontend/package.json revenue-share-platform/frontend/package-lock.json ./
RUN npm ci --ignore-scripts
COPY revenue-share-platform/frontend/ ./
RUN npm run build

FROM node:22-alpine AS backend-dependencies
WORKDIR /app/revenue-share-platform/backend
COPY revenue-share-platform/backend/package.json revenue-share-platform/backend/package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts

FROM node:22-alpine AS runtime
ENV NODE_ENV=production PORT=3000
WORKDIR /app/revenue-share-platform
COPY --chown=node:node revenue-share-platform/backend ./backend
COPY --from=backend-dependencies --chown=node:node /app/revenue-share-platform/backend/node_modules ./backend/node_modules
COPY --from=frontend-build --chown=node:node /app/revenue-share-platform/frontend/dist ./frontend/dist
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health/ready').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["npm", "start", "--prefix", "backend"]
