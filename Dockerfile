# -------------------------------
# 🏗️ Stage 1: Build Frontend
# -------------------------------
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ ./
RUN npm run build

# -------------------------------
# 🚀 Stage 2: Setup Backend
# -------------------------------
FROM node:18 AS backend
WORKDIR /app
COPY Backend/package*.json ./
RUN npm install
COPY Backend/ ./

# Copy frontend build into backend (assuming you'll serve it statically)
COPY --from=frontend-build /app/frontend/build ./public

ENV PORT=5000
EXPOSE 5000
CMD ["node", "server.js"]

