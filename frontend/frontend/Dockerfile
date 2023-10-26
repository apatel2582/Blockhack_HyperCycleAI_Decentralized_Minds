# Use an official Node runtime as the base image
FROM node:18.17.1-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Specify the port the app runs on
EXPOSE 3001

# Define the command to run the app
CMD ["npm", "start"]
