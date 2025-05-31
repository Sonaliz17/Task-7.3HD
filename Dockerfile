# === Stage 1: Build Frontend ===
FROM node:18 as frontend-builder
WORKDIR /app/frontend
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend .
RUN npm run build

# === Stage 2: Build Backend ===
FROM node:18 as backend
WORKDIR /app
COPY Backend/package*.json ./Backend/
RUN cd Backend && npm install
COPY Backend ./Backend

# Copy built frontend to backend/public
COPY --from=frontend-builder /app/frontend/build ./Backend/public

# === Final CMD to start backend ===
WORKDIR /app/Backend
CMD ["node", "server.js"]

