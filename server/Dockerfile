FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache openssl

COPY package.json package-lock.json* ./
RUN npm install

COPY prisma.config.ts ./
COPY prisma ./prisma/

RUN npx prisma generate

COPY . .
EXPOSE 3001
CMD ["npm", "run", "start"]