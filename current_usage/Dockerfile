FROM node:slim
WORKDIR /app
COPY package*.json ./
COPY . /app
RUN npm install
EXPOSE 8082
CMD ["npm", "start" ]
