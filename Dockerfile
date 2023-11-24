# Use the official Node.js image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN apk add --no-cache --virtual .gyp python3 make g++
RUN npm rebuild bcrypt --build-from-source

# Expose the port on which your Nest.js app is running
EXPOSE 3000

# Command to run your application
CMD ["npm", "run", "start:dev"]

