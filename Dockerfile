# Stage 1: Build frontend
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ .
RUN npm run build

# Stage 2: Setup backend
FROM node:18
WORKDIR /app
COPY Backend/package*.json ./Backend/
RUN cd Backend && npm install

# Copy backend code
COPY Backend/ ./Backend/

# Copy frontend build from previous stage
COPY --from=frontend /app/frontend/build ./Frontend/build

# Start backend
WORKDIR /app/Backend
CMD ["node", "server.js"]

