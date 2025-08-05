const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const { drawBackground, drawTitle, drawOverallScore, drawIndividualScores } = require('./drawing');
const { validateInput, formatTitle } = require('./utils');

// Register Japanese font with better error handling
let fontRegistered = false;
try {
  const fontPath = path.join(__dirname, 'fonts/NotoSansJP-Regular.ttf');
  
  // Check if font file exists
  const fs = require('fs');
  if (!fs.existsSync(fontPath)) {
    throw new Error(`Font file not found: ${fontPath}`);
  }
  
  registerFont(fontPath, { 
    family: 'Noto Sans JP',
    weight: 'normal'
  });
  // Register the same font for bold weight since we only have one file
  registerFont(fontPath, { 
    family: 'Noto Sans JP',
    weight: 'bold'
  });
  fontRegistered = true;
  console.log('Japanese font registered successfully for both normal and bold weights');
} catch (error) {
  console.warn('Font registration failed, using fallback fonts:', error.message);
  // Try alternative font paths
  try {
    const altFontPath = path.join(__dirname, 'fonts/NotoSansJP-Bold.ttf');
    registerFont(altFontPath, { 
      family: 'Noto Sans JP',
      weight: 'bold'
    });
    fontRegistered = true;
    console.log('Alternative Japanese font registered successfully');
  } catch (altError) {
    console.warn('Alternative font registration also failed:', altError.message);
  }
}

// Test font availability
function testFonts(ctx) {
  const testFonts = [
    'Arial',
    'DejaVu Sans',
    'Liberation Sans',
    'Noto Sans CJK JP',
    'Noto Sans JP',
    'sans-serif'
  ];
  
  console.log('Testing available fonts:');
  testFonts.forEach(font => {
    try {
      ctx.font = `12px "${font}"`;
      const metrics = ctx.measureText('Test');
      console.log(`✓ ${font}: ${metrics.width}px width`);
    } catch (error) {
      console.log(`✗ ${font}: ${error.message}`);
    }
  });
}

exports.handler = async (event) => {
  try {
    // Parse request - support both JSON body and query parameters
    let params;
    if (event.body) {
      params = JSON.parse(event.body);
    } else {
      // Parse query parameters for GET requests
      params = event.queryStringParameters || {};
    }
    
    const { n, t = 'p', r, l } = params;
    
    // Parse rating string to array
    const rating = r ? r.split(',').map(Number) : null;
    
    // Set defaults
    const type = t === 'c' ? 'company' : 'product';
    const lang = l === 'ja' ? 'ja' : 'en';
    
    // Validate input
    const validation = validateInput({ target_name: n, type, rating, lang });
    if (!validation.valid) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: validation.error })
      };
    }
    
    // Create canvas
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    
    // Test available fonts for debugging
    testFonts(ctx);
    
    // Set default font family for better text rendering
    if (!fontRegistered) {
      ctx.font = 'bold 48px "DejaVu Sans", "Liberation Sans", Arial, sans-serif';
    }
    
    // Draw background
    drawBackground(ctx);
    
    // Draw title
    const title = formatTitle(n, type, lang);
    drawTitle(ctx, title);
    
    // Draw overall score
    drawOverallScore(ctx, rating[0], lang);
    
    // Draw individual scores
    drawIndividualScores(ctx, rating.slice(1), lang);
    
    // Generate PNG
    const buffer = canvas.toBuffer('image/png');
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*'
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true
    };
    
  } catch (error) {
    console.error('OGP generation error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 