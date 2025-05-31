# Use Node.js base image
FROM node:18

# === Backend build ===
WORKDIR /app/backend
COPY Backend/package*.json ./
RUN npm install
COPY Backend .

# === Frontend build ===
WORKDIR /app/frontend
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend .
RUN npm run build

# === Final CMD to start backend ===
CMD ["node", "/app/backend/server.js"]
