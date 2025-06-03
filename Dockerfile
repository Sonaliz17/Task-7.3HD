# Stage 1: Build Frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ ./
RUN npm run build

# Stage 2: Setup Backend
FROM node:18 AS backend
WORKDIR /app
COPY Backend/package*.json ./
RUN npm install
COPY Backend/ ./

# Copy frontend build into backend's public folder
COPY --from=frontend-build /app/frontend/build ./public

# 👇 Add this line to make sure you're in the right folder for server.js
WORKDIR /app

ENV PORT=5000
EXPOSE 5000

# 👇 Ensure this file exists in Backend/ folder
CMD ["node", "server.js"]


