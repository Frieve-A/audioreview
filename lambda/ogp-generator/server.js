const http = require('http');
const { handler } = require('./index');

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const event = { queryStringParameters: Object.fromEntries(url.searchParams) };
    
    console.log(`📝 Request: ${req.method} ${req.url}`);
    console.log(`🔍 Parameters:`, event.queryStringParameters);
    
    const result = await handler(event);
    
    // Set response headers
    Object.entries(result.headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    
    res.writeHead(result.statusCode);
    
    if (result.isBase64Encoded) {
      res.end(Buffer.from(result.body, 'base64'));
    } else {
      res.end(result.body);
    }
    
    console.log(`✅ Response: ${result.statusCode}`);
    
  } catch (error) {
    console.error(`💥 Error: ${error.message}`);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Error: ${error.message}`);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 OGP Generator running on port ${PORT}`);
  console.log(`📖 Test URLs:`);
  console.log(`   Product Review (EN): http://localhost:${PORT}/ogp?n=Sennheiser%20HD%20800%20S&t=p&r=2.8,0.8,0.7,0.1,0.6,0.6&l=en`);
  console.log(`   Product Review (JA): http://localhost:${PORT}/ogp?n=Sennheiser%20HD%20800%20S&t=p&r=2.8,0.8,0.7,0.1,0.6,0.6&l=ja`);
  console.log(`   Company Review (EN): http://localhost:${PORT}/ogp?n=Sennheiser&t=c&r=4.5,0.9,1.0,0.7,1.0,0.9&l=en`);
  console.log(`   Company Review (JA): http://localhost:${PORT}/ogp?n=Sennheiser&t=c&r=4.5,0.9,1.0,0.7,1.0,0.9&l=ja`);
}); 