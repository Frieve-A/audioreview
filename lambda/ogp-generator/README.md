# OGP Image Generator Lambda

Dynamic OGP image generator for company and product reviews

## Features
- Generate OGP images for company and product reviews
- Display overall score and 5 evaluation criteria with graphs
- Support for Japanese and English languages
- Real-time image generation via HTTP API

## Quick Start

### Option 1: Docker (Recommended for Windows)

```bash
# Build and start the container
docker-compose up --build

# The server will be available at http://localhost:3000
# Open test.html in your browser to test the interface
```

### Option 2: Local Development (Linux/macOS)

```bash
# Install dependencies
npm install

# Start the server
npm start

# Run tests
npm test
```

## Testing

### 1. Web Interface
Open `test.html` in your browser after starting the server. This provides a user-friendly interface to test different scenarios.

### 2. Command Line Tests
```bash
# Run automated tests
npm test

# This will generate test images in the output/ directory
```

### 3. Direct API Testing
```bash
# Test with curl
curl "http://localhost:3000/ogp?n=Sennheiser%20HD%20800%20S&t=p&r=2.8,0.8,0.7,0.1,0.6,0.6&l=en" -o test.png
```

## API Specification

### Endpoint
- **URL**: `/ogp`
- **Method**: GET
- **Response**: PNG image

### Parameters
- **n**: Target name (required) - Company and product name combined
- **t**: Type (optional) - "c" for company, "p" for product (default: "p")
- **r**: Rating (required) - Comma-separated 6 values (e.g., "4.2,0.8,0.9,0.7,0.9,0.9")
- **l**: Language (optional) - "ja" for Japanese, default is English

### Example URLs

**Product Review (English):**
```
http://localhost:3000/ogp?n=Sennheiser%20HD%20800%20S&t=p&r=2.8,0.8,0.7,0.1,0.6,0.6&l=en
```

**Product Review (Japanese):**
```
http://localhost:3000/ogp?n=Sennheiser%20HD%20800%20S&t=p&r=2.8,0.8,0.7,0.1,0.6,0.6&l=ja
```

**Company Review (English):**
```
http://localhost:3000/ogp?n=Sennheiser&t=c&r=4.5,0.9,1.0,0.7,1.0,0.9&l=en
```

**Company Review (Japanese):**
```
http://localhost:3000/ogp?n=Sennheiser&t=c&r=4.5,0.9,1.0,0.7,1.0,0.9&l=ja
```

## Jekyll Integration

### Layout File Example (_layouts/default.html)
```liquid
{% if page.rating %}
  {% assign ogp_url = "https://api.example.com/ogp?n=" | append: page.target_name | url_encode | append: "&t=" | append: page.layout | slice: 0, 1 | append: "&r=" | append: page.rating | join: "," | append: "&l=" | append: page.lang %}
  <meta property="og:image" content="{{ ogp_url }}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
{% endif %}
```

### Front Matter Examples

**Product Review:**
```yaml
---
layout: product
title: "Sennheiser HD 800 S Product Review"
target_name: "Sennheiser HD 800 S"
company_id: sennheiser
lang: en
ref: sennheiser-hd-800-s
date: 2025-07-18
rating: [2.8, 0.8, 0.7, 0.1, 0.6, 0.6]
summary: "The Sennheiser HD 800 S is a legendary open-back headphone..."
tags: [Headphones, Open-back, Dynamic, Reference, High-end]
permalink: /products/en/sennheiser-hd-800-s/
---
```

**Company Review:**
```yaml
---
layout: company
title: "Sennheiser Review"
target_name: "Sennheiser"
company_id: sennheiser
lang: en
ref: sennheiser-review
date: 2025-07-05
rating: [4.5, 0.9, 1.0, 0.7, 1.0, 0.9]
summary: "A German giant at the forefront of audio technology..."
tags: [Germany, Audio, Headphones, Professional, Sonova]
permalink: /companies/en/sennheiser/
---
```

## Evaluation Criteria
1. Scientific Validity (科学的有効性)
2. Technology Level (技術レベル)
3. Cost-Performance (コストパフォーマンス)
4. Reliability & Support (信頼性・サポート)
5. Design Rationality (設計思想の合理性)

## Deployment

### AWS Lambda Deployment
```bash
# Deploy to AWS Lambda
npm run deploy:prod
```

### Local Docker Testing
```bash
# Start with Docker
npm run test:docker

# Clean up Docker resources
npm run test:docker:clean
```

## Troubleshooting

### Windows Canvas Installation Issues
If you encounter issues installing `node-canvas` on Windows, use Docker:
```bash
docker-compose up --build
```

### Font Issues
Make sure the Noto Sans JP font is available in the `fonts/` directory:
```bash
# Download font if missing
curl -L -o fonts/NotoSansJP-Regular.otf "https://github.com/googlefonts/noto-cjk/raw/main/Sans/OTF/Japanese/NotoSansJP-Regular.otf"
```

### Port Already in Use
If port 3000 is already in use, change the port in `server.js` or use a different port:
```bash
PORT=3001 npm start
```

## File Structure
```
ogp-generator/
├── index.js              # Lambda function main
├── drawing.js            # Drawing logic
├── utils.js              # Utility functions
├── server.js             # HTTP server for testing
├── test.js               # Automated tests
├── test.html             # Web interface for testing
├── package.json          # Dependencies
├── serverless.yml        # Deployment configuration
├── docker-compose.yml    # Docker configuration
├── Dockerfile            # Docker image definition
├── fonts/                # Font files
│   └── NotoSansJP-Regular.otf
├── output/               # Generated test images
└── README.md             # This file
``` 