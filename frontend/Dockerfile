# Stage 1: Build Stage
FROM node:20-alpine AS build

WORKDIR /app

# Dependency caching සඳහා package ෆයිල්ස් මුලින්ම කොපි කරනවා
COPY package*.json ./
RUN npm font-lock --frozen-lockfile || npm install

# මුළු සෝස් කෝඩ් එකම කොපි කරලා Production Build එකක් ගන්නවා
COPY . .
RUN npm run build

# Stage 2: Production Stage (Nginx භාවිතයෙන් Serve කිරීම)
FROM nginx:1.25-alpine

# Vite එකෙන් බිල්ඩ් වෙන 'dist' ෆෝල්ඩර් එක Nginx එකට කොපි කරනවා
COPY --from=build /app/dist /usr/share/nginx/html

# React/Vite Routing ප්‍රශ්න ඇති නොවෙන්න Nginx config එකක් දානවා
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]