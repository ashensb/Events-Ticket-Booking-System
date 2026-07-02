# Stage 1: Build Stage
FROM node:20-alpine AS build

WORKDIR /app

# Dependency caching copying package.json and package-lock.json to leverage Docker cache
COPY package*.json ./
RUN npm font-lock --frozen-lockfile || npm install

# Copy the rest of the application code and build the React app
COPY . .
RUN npm run build

# Stage 2: Production Stage (Nginx භාවිතයෙන් Serve කිරීම)
FROM nginx:1.25-alpine

# Copy the built React app from the build stage to Nginx's default public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Configure Nginx to serve the React app and handle client-side routing
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]