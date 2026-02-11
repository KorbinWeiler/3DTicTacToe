FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --production

COPY . .

# simple wait-for-db and migrate then start script
RUN chmod +x /app/run.sh

EXPOSE 3000 3001

CMD ["/app/run.sh"]
