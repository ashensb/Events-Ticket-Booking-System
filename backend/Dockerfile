# Production-ready Lightweight Node Image එකක් පාවිච්චි කරමු
FROM node:20-alpine

# Security Best Practice: Root යූසර් වෙනුවට අඩු අවසර තියෙන node යූසර්ව පාවිච්චි කිරීම
USER node

WORKDIR /home/node/app

# Dependencies install කිරීම
COPY --chown=node:node package*.json ./
RUN npm ci --only=production

# සෝස් කෝඩ් එක කොපි කිරීම
COPY --chown=node:node . .

# Production Node Environment එක සෙට් කිරීම
ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "server.js"]