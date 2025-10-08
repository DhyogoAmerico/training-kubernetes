FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "src/app.js"]