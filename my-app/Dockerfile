FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install 
CMD ["npm start", "src/index.tsx"]
EXPOSE 3000