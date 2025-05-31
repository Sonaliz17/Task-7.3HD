# Stage 1: Build frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY Frontend/ .
RUN npm install && npm run build

# Stage 2: Run backend + serve frontend
FROM node:18
WORKDIR /app
COPY Backend/ ./Backend/
COPY --from=frontend-build /app/frontend/build ./Frontend/build
WORKDIR /app/Backend
RUN npm install
ENV NODE_ENV=production
CMD ["node", "index.js"]
