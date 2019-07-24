FROM node:10.16
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]