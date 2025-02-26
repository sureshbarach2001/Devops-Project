FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install -g nodemon
RUN npm install 
COPY . .
EXPOSE 8000
RUN npm test
CMD ["npm", "run", "dev"]
