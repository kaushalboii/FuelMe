FROM node:20-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install --production

# Copy application source
COPY . .

# Create volume for persistent database storage
VOLUME ["/app/data"]

EXPOSE 5000

ENV PORT=5000
ENV NODE_ENV=production

CMD ["npm", "start"]
