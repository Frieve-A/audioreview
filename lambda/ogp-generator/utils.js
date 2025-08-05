// Validate input parameters
function validateInput({ target_name, type, rating, lang }) {
  if (!target_name || typeof target_name !== 'string') {
    return { valid: false, error: 'n (target_name) is required and must be a string' };
  }
  
  if (target_name.length > 100) {
    return { valid: false, error: 'n (target_name) must be 100 characters or less' };
  }
  
  if (!['company', 'product'].includes(type)) {
    return { valid: false, error: 't (type) must be either "c" (company) or "p" (product)' };
  }
  
  if (!Array.isArray(rating) || rating.length !== 6) {
    return { valid: false, error: 'r (rating) must be a comma-separated string with 6 elements' };
  }
  
  if (!rating.every(score => typeof score === 'number' && score >= 0 && score <= 5)) {
    return { valid: false, error: 'r (rating) values must be numbers between 0 and 5' };
  }
  
  if (!['ja', 'en'].includes(lang)) {
    return { valid: false, error: 'l (lang) must be either "ja" or "en"' };
  }
  
  return { valid: true };
}

// Format title based on target name and type
function formatTitle(target_name, type, lang) {
  if (type === 'product') {
    return lang === 'ja' ? 
      `${target_name} 製品レビュー` : 
      `${target_name} Product Review`;
  } else {
    return lang === 'ja' ? 
      `${target_name} 企業レビュー` : 
      `${target_name} Review`;
  }
}

module.exports = {
  validateInput,
  formatTitle
}; 