# Create image based on the official Node 6 image from dockerhub
FROM node:6

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependecies
RUN npm install

# Install prebuild material components
RUN npm install --save @angular/material @angular/cdk
RUN npm install --save @angular/animations
RUN npm install --save hammerjs

# Install FileSaver + typescript definitions for it
RUN npm install file-saver --save
RUN npm install @types/file-saver --save-dev

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD ["npm", "start"]
