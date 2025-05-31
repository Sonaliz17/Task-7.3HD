FROM node:18

# Backend setup
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend .

# Frontend setup
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Optional: expose ports, set up for Node.js backend
WORKDIR /app/backend
CMD ["node", "server.js"]
