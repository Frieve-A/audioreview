FROM node:18-alpine

# Install system dependencies for canvas and fonts
RUN apk add --no-cache \
    build-base \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    fontconfig \
    ttf-dejavu \
    ttf-liberation \
    font-noto \
    font-noto-cjk

# Update font cache
RUN fc-cache -fv

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port for local testing
EXPOSE 3000

# Default command
CMD ["node", "server.js"] 