# Stage 1: Build
FROM node:latest AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the TypeScript project
RUN npm run build

# Stage 2: Run
FROM node:alpine

# Set NODE_ENV to production
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm ci --only=production

# Expose the application port
ENV PORT=3000
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/server.js"]
