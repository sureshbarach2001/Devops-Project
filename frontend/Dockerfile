FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install react@19.0.0 react-dom@19.0.0
COPY . .
EXPOSE 3000
CMD ["npm", "start"]