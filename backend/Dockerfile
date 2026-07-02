# Production-ready Lightweight Node Image 
FROM node:20-alpine

# Security Best Practice: Run the application as a non-root user
USER node

WORKDIR /home/node/app

# Dependencies install 
COPY --chown=node:node package*.json ./
RUN npm ci --only=production

# Copy the source code
COPY --chown=node:node . .

# Set the environment variable for production
ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "server.js"]