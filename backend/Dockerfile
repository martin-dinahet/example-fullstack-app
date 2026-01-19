FROM node:20-alpine

WORKDIR /app/backend

COPY backend/package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD [ "sh", "-c", "npx prisma migrate deploy && npm start" ]