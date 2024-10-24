# Use Node.js 20
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Set environment to production
ENV NODE_ENV=production

# Bind to Render's dynamic port
ENV PORT=5173

# Expose the port
EXPOSE 5173

# Start the app using Vite's preview mode to serve production build
CMD ["npm", "run", "preview"]
