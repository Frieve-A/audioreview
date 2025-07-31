/**
 * AutoLinker Implementation Specification
 * 
 * This class automatically inserts links to individual company and product pages
 * within the content of company review and product review pages.
 * 
 * Target Content:
 * - Links are inserted only in the main article content (from summary to advice sections)
 * - Page footer elements such as search buttons and navigation links are excluded
 * - The .main-content selector is used to identify the target content area
 * 
 * Implementation Steps:
 * 
 * 1. Determine if the current page is an individual company review or product review page
 *    by checking if the URL follows the format /companies/lang/company/ or /products/lang/product/.
 *    Skip processing if it's not an individual review page.
 * 
 * 2. Find the longest matching target_name in the article body text, excluding:
 *    - The target_name of the currently displayed article
 *    - Text that is already inside <a href> tags
 * 
 * 3. Insert links for the matching target_name
 * 
 * 4. Repeat steps 2-3 until no more linkable strings are found
 */

class AutoLinker {
  constructor() {
    this.searchData = null;
    this.currentLang = window.siteLanguage || 'ja';
    this.excludedElements = ['nav', 'header', 'footer', 'script', 'style', 'a', 'button', 'input', 'textarea'];
    this.minLength = 2; // Minimum character length
    this.maxLength = 100; // Maximum character length
    this.processedRanges = new Set(); // Track already processed ranges
    this.init();
  }

  async init() {
    await this.loadSearchData();
    this.processContent();
  }

  async loadSearchData() {
    try {
      const response = await fetch(`/assets/data/search_${this.currentLang}.json`);
      this.searchData = await response.json();
    } catch (error) {
      console.warn('Failed to load search data for auto-linking:', error);
    }
  }

  processContent() {
    if (!this.searchData) return;

    // Check if current page is an individual review page (Step 1 of specification)
    if (!this.isIndividualReviewPage()) return;

    // Get .review-content area only
    const contentArea = document.querySelector('.review-content');
    if (!contentArea) return;

    // Check if content has already been processed
    if (contentArea.dataset.autoLinked === 'true') return;

    // Process content with repetition until no more links can be added (Step 4 of specification)
    this.processContentWithRepetition(contentArea);
    
    // Mark as processed
    contentArea.dataset.autoLinked = 'true';
  }

  isIndividualReviewPage() {
    const path = window.location.pathname;
    // Check if URL follows the format /companies/lang/company/ or /products/lang/product/
    const companyPattern = /^\/companies\/[a-z]{2}\/[^\/]+\/?$/;
    const productPattern = /^\/products\/[a-z]{2}\/[^\/]+\/?$/;
    return companyPattern.test(path) || productPattern.test(path);
  }

  processContentWithRepetition(contentArea) {
    let hasChanges = true;
    let iterationCount = 0;
    const maxIterations = 10; // Prevent infinite loops
    
    while (hasChanges && iterationCount < maxIterations) {
      hasChanges = false;
      iterationCount++;
      
      // Process text nodes excluding existing links
      const textNodes = this.getTextNodes(contentArea);
      
      for (const textNode of textNodes) {
        const text = textNode.textContent;
        if (!text || text.trim().length === 0) continue;

        // Search for matching target_name (sorted by length)
        // Current page exclusion is now handled in findMatches method
        const matches = this.findMatches(text);
        
        if (matches.length > 0) {
          this.replaceTextWithLinks(textNode, matches);
          hasChanges = true;
          break; // Exit loop to restart with new DOM structure
        }
      }
    }
  }

  getTextNodes(element) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip text in excluded elements
          if (this.isInExcludedElement(node)) {
            return NodeFilter.FILTER_REJECT;
          }
          // Skip text that is already linked or inside any link
          if (this.isInsideLink(node)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }

    return textNodes;
  }

  processTextNodes(element) {
    // This method is now deprecated in favor of processContentWithRepetition
    // Keeping for backward compatibility but it's not used in the new flow
    const textNodes = this.getTextNodes(element);
    
    // Process each text node
    textNodes.forEach(textNode => {
      this.processTextNode(textNode);
    });
  }

  isInExcludedElement(node) {
    let parent = node.parentElement;
    while (parent) {
      if (this.excludedElements.includes(parent.tagName.toLowerCase())) {
        return true;
      }
      parent = parent.parentElement;
    }
    return false;
  }

  isInsideLink(node) {
    let parent = node.parentElement;
    while (parent) {
      if (parent.tagName === 'A' || parent.classList.contains('auto-link')) {
        return true;
      }
      parent = parent.parentElement;
    }
    return false;
  }

  processTextNode(textNode) {
    const text = textNode.textContent;
    if (!text || text.trim().length === 0) return;

    // Search for matching target_name (sorted by length)
    // Current page exclusion is now handled in findMatches method
    const matches = this.findMatches(text);
    
    if (matches.length > 0) {
      this.replaceTextWithLinks(textNode, matches);
    }
  }



  getCurrentPageInfo() {
    // Get current page URL
    const currentUrl = window.location.pathname;
    
    // Extract target_name from URL if possible
    // URL format: /companies/lang/company/ or /products/lang/product/
    const urlMatch = currentUrl.match(/^\/(companies|products)\/[a-z]{2}\/([^\/]+)\/?$/);
    let targetNameFromUrl = null;
    
    if (urlMatch) {
      targetNameFromUrl = urlMatch[2];
    }
    
    // Get page title from h1 tag as fallback
    const h1 = document.querySelector('h1');
    const titleFromH1 = h1 ? h1.textContent.trim() : '';
    
    return {
      url: currentUrl,
      targetNameFromUrl: targetNameFromUrl,
      titleFromH1: titleFromH1
    };
  }

  findMatches(text) {
    const matches = [];
    const currentPageInfo = this.getCurrentPageInfo();
    const processedRanges = new Set(); // Track processed ranges to avoid overlaps
    
    // Search both companies and products
    const allItems = [
      ...this.searchData.companies.map(item => ({ ...item, type: 'company' })),
      ...this.searchData.products.map(item => ({ ...item, type: 'product' }))
    ];

    // Sort items by title length (longer first) to prioritize more specific matches
    allItems.sort((a, b) => b.title.length - a.title.length);

    // Check target_name for each item
    allItems.forEach(item => {
      const targetName = item.title;
      
      // Skip if same as current page (multiple checks for reliability)
      if (this.isCurrentPage(item, currentPageInfo)) return;
      
      // Check string length
      if (targetName.length < this.minLength || targetName.length > this.maxLength) return;
      
      // Search for exact match (case insensitive)
      const regex = new RegExp(`\\b${this.escapeRegex(targetName)}\\b`, 'gi');
      const matchResults = text.matchAll(regex);
      
      for (const match of matchResults) {
        const startIndex = match.index;
        const endIndex = match.index + match[0].length;
        
        // Check if this range overlaps with any already processed range
        let hasOverlap = false;
        for (const range of processedRanges) {
          if (startIndex < range.end && endIndex > range.start) {
            hasOverlap = true;
            break;
          }
        }
        
        if (!hasOverlap) {
          matches.push({
            targetName: targetName,
            url: item.url,
            type: item.type,
            originalText: match[0],
            startIndex: startIndex,
            endIndex: endIndex
          });
          
          // Record this range as processed
          processedRanges.add({ start: startIndex, end: endIndex });
        }
      }
    });

    // Sort by start index for proper ordering
    return matches.sort((a, b) => a.startIndex - b.startIndex);
  }

  isCurrentPage(item, currentPageInfo) {
    // Check if URL matches exactly
    if (item.url === currentPageInfo.url) return true;
    
    // Check if target_name matches the one extracted from URL
    if (currentPageInfo.targetNameFromUrl && 
        item.title.toLowerCase() === currentPageInfo.targetNameFromUrl.toLowerCase()) return true;
    
    // Check if target_name matches the H1 title
    if (currentPageInfo.titleFromH1 && 
        item.title.toLowerCase() === currentPageInfo.titleFromH1.toLowerCase()) return true;
    
    // Additional check: if the item URL contains the current page's target_name
    if (currentPageInfo.targetNameFromUrl && 
        item.url.includes(currentPageInfo.targetNameFromUrl)) return true;
    
    return false;
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  replaceTextWithLinks(textNode, matches) {
    const text = textNode.textContent;
    const parent = textNode.parentNode;
    
    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    
    // Matches are already sorted by start index from findMatches
    matches.forEach(match => {
      // Add text before match
      if (match.startIndex > lastIndex) {
        const textBefore = text.substring(lastIndex, match.startIndex);
        fragment.appendChild(document.createTextNode(textBefore));
      }
      
      // Add link
      const linkElement = this.createLinkElement(match);
      fragment.appendChild(linkElement);
      
      lastIndex = match.endIndex;
    });
    
    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      fragment.appendChild(document.createTextNode(remainingText));
    }
    
    // Replace original text node with fragment
    parent.replaceChild(fragment, textNode);
  }

  createLinkElement(match) {
    const link = document.createElement('a');
    link.href = match.url;
    link.textContent = match.originalText;
    link.className = `auto-link auto-link-${match.type}`;
    
    // Set title based on language
    const isJapanese = this.currentLang === 'ja';
    const typeText = match.type === 'company' 
      ? (isJapanese ? '企業' : 'Company')
      : (isJapanese ? '製品' : 'Product');
    const pageText = isJapanese ? 'ページ' : 'page';
    link.title = `${typeText}${isJapanese ? '' : ' '}${pageText}`;
    
    // Add bilingual tooltip with proper HTML escaping
    const tooltipText = match.type === 'company'
      ? (isJapanese ? `企業: ${match.targetName}` : `Company: ${match.targetName}`)
      : (isJapanese ? `製品: ${match.targetName}` : `Product: ${match.targetName}`);
    link.setAttribute('data-tooltip', tooltipText);
    
    return link;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize after DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  new AutoLinker();
}); 