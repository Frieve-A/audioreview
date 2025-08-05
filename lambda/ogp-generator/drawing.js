// Draw background
function drawBackground(ctx) {
  // Light off-white background to match the image
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(0, 0, 1200, 630);
}

// Draw title
function drawTitle(ctx, title) {
  ctx.fillStyle = '#333333';
  // Use system fonts that are available in Docker Alpine
  ctx.font = 'bold 48px "DejaVu Sans", "Liberation Sans", "Noto Sans CJK JP", "Noto Sans JP", Arial, sans-serif';
  ctx.textAlign = 'center';
  
  // Handle long titles with line breaks
  const maxWidth = 1120;
  const words = title.split(' ');
  let lines = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  
  // Draw multiple lines
  lines.forEach((line, index) => {
    const y = 100 + (index * 60);
    ctx.fillText(line, 600, y);
  });
  
  // Draw subtitle "Frieve - Audio Review"
  ctx.fillStyle = '#9CA3AF'; // Light gray color
  ctx.font = '32px "DejaVu Sans", "Liberation Sans", "Noto Sans CJK JP", "Noto Sans JP", Arial, sans-serif';
  ctx.textAlign = 'center';
  const subtitleY = 200;
  ctx.fillText('Frieve - Audio Review', 600, subtitleY);
}

// Draw overall score gauge with label
function drawOverallScore(ctx, score, lang) {
  const centerX = 600;
  const centerY = 305;
  const radius = 78; // Increased from 60 to 78 (1.3x)
  
  // Draw label based on language
  const label = lang === 'ja' ? '総合評価' : 'Overall Rating';
  ctx.fillStyle = '#333333';
  ctx.font = 'bold 24px "DejaVu Sans", "Liberation Sans", "Noto Sans CJK JP", "Noto Sans JP", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(label, centerX, centerY + radius + 20);
  
  // Draw background arc (7:30 to 4:30) - light gray
  const startAngle = 3 * Math.PI / 4; // 7:30 position (135 degrees after -90 rotation)
  const endAngle = startAngle + (3 * Math.PI / 2); // 4:30 position (45 degrees after -90 rotation)
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
  ctx.strokeStyle = '#E9ECEF'; // Light gray background
  ctx.lineWidth = 20;
  ctx.stroke();
  
  // Draw score arc with orange-yellow gradient
  // Arc from 7:30 (225 degrees) to 4:30 (135 degrees), clockwise
  // Rotate -90 degrees: 225 - 90 = 135, 135 - 90 = 45
  const percentage = Math.min(score / 5.0, 1.0);
  const scoreEndAngle = startAngle + (3 * Math.PI / 2 * percentage); // 270 degrees * percentage
  
  // Create gradient for the score arc
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
  gradient.addColorStop(0, '#FFD580');
  gradient.addColorStop(1, '#FFA500');
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, scoreEndAngle, false);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 20;
  ctx.stroke();
  
  // Draw score number
  ctx.fillStyle = '#333333';
  ctx.font = 'bold 48px "DejaVu Sans", "Liberation Sans", "Noto Sans CJK JP", "Noto Sans JP", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(score.toFixed(1), centerX, centerY + 18);
}

// Draw individual score gauges
function drawIndividualScores(ctx, scores, lang) {
  const labels = {
    ja: ['科学的有効性', '技術レベル', 'コストパフォーマンス', '信頼性・サポート', '設計思想の合理性'],
    en: ['Scientific Validity', 'Technology Level', 'Cost-Performance', 'Reliability & Support', 'Design Rationality']
  };
  
  // Colors matching the image: light blue-green, light teal, light green, light purple, light gray
  const colors = ['#AEC6CF', '#B2DFDB', '#C1E1C1', '#D7BDE2', '#D3D3D3'];
  
  // Single row layout for 5 gauges at the bottom
  const totalWidth = 1120;
  const gaugeSpacing = totalWidth / 5;
  const startX = 40;
  const centerY = 490; // Moved down from 450 to 490 (40px down)
  const radius = 52.5;
  
  scores.forEach((score, index) => {
    const centerX = startX + (index * gaugeSpacing) + (gaugeSpacing / 2);
    
    // Draw background arc (7:30 to 4:30) - light gray
    const startAngle = 3 * Math.PI / 4; // 7:30 position (135 degrees after -90 rotation)
    const endAngle = startAngle + (3 * Math.PI / 2); // 4:30 position (45 degrees after -90 rotation)
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
    ctx.strokeStyle = '#E9ECEF'; // Light gray background
    ctx.lineWidth = 15;
    ctx.stroke();
    
    // Draw score arc (individual ratings: 1.0 = 100%)
    // Arc from 7:30 (225 degrees) to 4:30 (135 degrees), clockwise
    // Rotate -90 degrees: 225 - 90 = 135, 135 - 90 = 45
    const percentage = Math.min(score / 1.0, 1.0);
    const scoreEndAngle = startAngle + (3 * Math.PI / 2 * percentage); // 270 degrees * percentage
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, scoreEndAngle, false);
    ctx.strokeStyle = colors[index];
    ctx.lineWidth = 15;
    ctx.stroke();
    
    // Draw score number
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 28px "DejaVu Sans", "Liberation Sans", "Noto Sans CJK JP", "Noto Sans JP", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(score.toFixed(1), centerX, centerY + 10);
    
    // Draw label
    ctx.fillStyle = '#333333';
    ctx.font = '21px "DejaVu Sans", "Liberation Sans", "Noto Sans CJK JP", "Noto Sans JP", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(labels[lang][index], centerX, centerY + radius + 20);
  });
}

module.exports = {
  drawBackground,
  drawTitle,
  drawOverallScore,
  drawIndividualScores
}; 