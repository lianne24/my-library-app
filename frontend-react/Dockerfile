# Stage 1: Build the React app

# Use an official lightweight Node.js image based on Alpine Linux
FROM node:20-alpine AS build

# Set the working directory inside the container to /app
WORKDIR /app

# Copy only package.json and package-lock.json first 
COPY package*.json ./

# Install dependencies using npm ci for clean, reproducible builds
RUN npm ci

# Copy the rest of the frontend source code into the image
COPY . .

# Build the production-ready static files for React
# This will generate the optimized /build folder
RUN npm run build

# Stage 2: Serve the built app with Nginx

# Use a lightweight Nginx image to serve the static React files
FROM nginx:alpine

# Copy the compiled React build from the previous stage to Nginx’s default web root
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to allow web traffic into the container
EXPOSE 80

# Start the Nginx server in the foreground (required by Docker)
CMD ["nginx","-g","daemon off;"]