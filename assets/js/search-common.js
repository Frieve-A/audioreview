// Common search logic for both overlay search and search pages
class SearchCommon {
  // Add HTML entity decoding function
  static decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }

  static searchItems(searchData, query) {
    const normalizedQuery = query.toLowerCase();
    const titleExactMatchResults = [];
    const summaryExactMatchResults = [];

    const allItems = [...searchData.companies, ...searchData.products];

    allItems.forEach(item => {
      // Check if ALL keywords are present
      const isAllKeywordsMatch = SearchCommon.isAllKeywordsMatch(item, normalizedQuery);
      
      if (isAllKeywordsMatch) {
        const titleMatchCount = SearchCommon.getTitleMatchCount(item, normalizedQuery);
        const titleWordStartMatchCount = SearchCommon.getTitleWordStartMatchCount(item, normalizedQuery);
        const totalMatchCount = SearchCommon.getTotalMatchCount(item, normalizedQuery);
        const totalWordStartMatchCount = SearchCommon.getTotalWordStartMatchCount(item, normalizedQuery);
        
        if (titleMatchCount === totalMatchCount) {
          // All keywords are in title
          titleExactMatchResults.push({ 
            ...item, 
            titleMatchCount,
            titleWordStartMatchCount,
            totalMatchCount,
            totalWordStartMatchCount
          });
        } else {
          // Some keywords are in summary/tags
          summaryExactMatchResults.push({ 
            ...item, 
            titleMatchCount,
            titleWordStartMatchCount,
            totalMatchCount,
            totalWordStartMatchCount
          });
        }
      }
    });

    // Sort by word start match count (descending), then by total match count (descending), then by title length (ascending)
    titleExactMatchResults.sort((a, b) => {
      // First by word start match count (descending)
      if (b.titleWordStartMatchCount !== a.titleWordStartMatchCount) {
        return b.titleWordStartMatchCount - a.titleWordStartMatchCount;
      }
      // Then by total match count (descending)
      if (b.titleMatchCount !== a.titleMatchCount) {
        return b.titleMatchCount - a.titleMatchCount;
      }
      // Finally by title length (ascending)
      return a.title.length - b.title.length;
    });

    summaryExactMatchResults.sort((a, b) => {
      // First by word start match count (descending)
      if (b.totalWordStartMatchCount !== a.totalWordStartMatchCount) {
        return b.totalWordStartMatchCount - a.totalWordStartMatchCount;
      }
      // Then by total match count (descending)
      if (b.totalMatchCount !== a.totalMatchCount) {
        return b.totalMatchCount - a.totalMatchCount;
      }
      // Finally by title length (ascending)
      return a.title.length - b.title.length;
    });

    return [...titleExactMatchResults, ...summaryExactMatchResults];
  }

  static isAllKeywordsMatch(item, query) {
    const words = query.split(/\s+/).filter(word => word.length > 0);
    if (words.length === 0) return false;
    
    // Decode HTML entities before comparison
    const title = SearchCommon.decodeHtmlEntities(item.title.toLowerCase());
    const summary = SearchCommon.decodeHtmlEntities(item.summary.toLowerCase());
    const tags = item.tags.map(tag => SearchCommon.decodeHtmlEntities(tag.toLowerCase()));
    
    // Check if ALL keywords are present in title, summary, or tags
    return words.every(word => {
      return title.includes(word) || 
             summary.includes(word) || 
             tags.some(tag => tag.includes(word));
    });
  }

  static getTitleMatchCount(item, query) {
    const words = query.split(/\s+/).filter(word => word.length > 0);
    if (words.length === 0) return 0;
    
    // Decode HTML entities before comparison
    const title = SearchCommon.decodeHtmlEntities(item.title.toLowerCase());
    
    return words.filter(word => title.includes(word)).length;
  }

  static getTitleWordStartMatchCount(item, query) {
    const words = query.split(/\s+/).filter(word => word.length > 0);
    if (words.length === 0) return 0;
    
    // Decode HTML entities before comparison
    const title = SearchCommon.decodeHtmlEntities(item.title.toLowerCase());
    
    return words.filter(word => {
      // Check for word boundary match (word starts with the keyword)
      const wordBoundaryRegex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
      return wordBoundaryRegex.test(title);
    }).length;
  }

  static getTotalMatchCount(item, query) {
    const words = query.split(/\s+/).filter(word => word.length > 0);
    if (words.length === 0) return 0;
    
    // Decode HTML entities before comparison
    const title = SearchCommon.decodeHtmlEntities(item.title.toLowerCase());
    const summary = SearchCommon.decodeHtmlEntities(item.summary.toLowerCase());
    const tags = item.tags.map(tag => SearchCommon.decodeHtmlEntities(tag.toLowerCase()));
    
    return words.filter(word => {
      return title.includes(word) || 
             summary.includes(word) || 
             tags.some(tag => tag.includes(word));
    }).length;
  }

  static getTotalWordStartMatchCount(item, query) {
    const words = query.split(/\s+/).filter(word => word.length > 0);
    if (words.length === 0) return 0;
    
    // Decode HTML entities before comparison
    const title = SearchCommon.decodeHtmlEntities(item.title.toLowerCase());
    const summary = SearchCommon.decodeHtmlEntities(item.summary.toLowerCase());
    const tags = item.tags.map(tag => SearchCommon.decodeHtmlEntities(tag.toLowerCase()));
    
    return words.filter(word => {
      // Check for word boundary match in title, summary, or tags
      const wordBoundaryRegex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
      return wordBoundaryRegex.test(title) || 
             wordBoundaryRegex.test(summary) || 
             tags.some(tag => wordBoundaryRegex.test(tag));
    }).length;
  }

  static containsWords(text, query) {
    const words = query.split(/\s+/);
    return words.some(word => text.includes(word));
  }

  static escapeHtml(text) {
    const div = document.createElement('div');
    div.innerHTML = text;
    const decodedText = div.textContent || div.innerText || '';
    div.textContent = decodedText;
    return div.innerHTML;
  }

  static getCurrentLanguage() {
    // Get language from URL (/en/ or /ja/)
    const path = window.location.pathname;
    if (path.includes('/en/')) {
      return 'en';
    } else if (path.includes('/ja/')) {
      return 'ja';
    }
    // Default to Japanese for root pages
    return 'ja';
  }
} 