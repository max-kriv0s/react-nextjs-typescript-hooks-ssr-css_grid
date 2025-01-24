FROM node:22-alpine

WORKDIR /opt/app

COPY package*.json ./
RUN npm ci

COPY . ./

ENV NODE_ENV=production
RUN npm run build
RUN npm prune --production

CMD ["npm", "start"]

EXPOSE 3011