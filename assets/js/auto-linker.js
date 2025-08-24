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
    // Prevent image dragging
    this.preventImageDragging();
    
    await this.loadSearchData();
    this.processContent();
  }

  preventImageDragging() {
    // Set draggable="false" on all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('draggable', 'false');
    });
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

    // Process References first so raw URLs become <a> tags and are excluded from further auto-linking
    this.processReferences(contentArea);

    // Then process content with repetition until no more links can be added (Step 4 of specification)
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
    // Find the References section to exclude content after it
    const refHeading = this.findReferenceHeading(element);
    const refSectionStart = refHeading ? refHeading : null;

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
          // Skip text that comes after the References section
          if (refSectionStart && this.isAfterReferenceSection(node, refSectionStart)) {
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

  findReferenceHeading(element) {
    const candidates = ['References', '参考情報'];
    const headings = element.querySelectorAll('h2, h3, h4, h5, h6');
    for (const h of headings) {
      const title = (h.textContent || '').trim();
      if (candidates.includes(title)) {
        return h;
      }
    }
    return null;
  }

  isAfterReferenceSection(node, refHeading) {
    // Check if the node comes after the References heading
    // Use compareDocumentPosition for efficient comparison
    const comparison = node.compareDocumentPosition(refHeading);
    
    // If node comes after refHeading in document order
    // DOCUMENT_POSITION_PRECEDING means refHeading precedes node
    return (comparison & Node.DOCUMENT_POSITION_PRECEDING) !== 0;
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

  // Reference processing: link [n]/［n］ to the References section and auto-link URLs inside that section
  processReferences(contentArea) {
    const refHeading = this.ensureReferenceHeadingId(contentArea);
    if (!refHeading) return;
    const refId = refHeading.id;

    // Auto-link raw URLs inside the References section first
    this.linkUrlsInReferenceSection(refHeading);

    // Then link bracketed reference numbers to the References section
    this.linkReferenceNumbers(contentArea, refId);
  }

  ensureReferenceHeadingId(contentArea) {
    const candidates = ['References', '参考情報'];
    const headings = contentArea.querySelectorAll('h2, h3, h4, h5, h6');
    for (const h of headings) {
      const title = (h.textContent || '').trim();
      if (candidates.includes(title)) {
        if (!h.id) h.id = 'references';
        return h;
      }
    }
    return null;
  }

  linkReferenceNumbers(rootElement, refId) {
    // Match ASCII [] or full-width ［］ brackets with digits inside
    const testRegex = /[\[\uFF3B]([0-9]+)[\]\uFF3D]/; // non-global for TreeWalker test
    const regex = /[\[\uFF3B]([0-9]+)[\]\uFF3D]/g; // global for actual replacement

    // Find the References section to exclude content after it
    const refHeading = this.findReferenceHeading(rootElement);

    // Repeat until no more replacements are found to ensure all candidates are linked
    let iterationCount = 0;
    const maxIterations = 100;
    let madeChanges = true;
    while (madeChanges && iterationCount < maxIterations) {
      iterationCount += 1;
      madeChanges = false;

      // Collect first to avoid walker state issues when mutating DOM
      const nodesToProcess = [];
      {
        const walker = document.createTreeWalker(
          rootElement,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              if (this.isInExcludedElement(node) || this.isInsideLink(node)) return NodeFilter.FILTER_REJECT;
              // Skip text that comes after the References section
              if (refHeading && this.isAfterReferenceSection(node, refHeading)) return NodeFilter.FILTER_REJECT;
              const text = node.textContent;
              return testRegex.test(text) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
          }
        );
        let n;
        while (n = walker.nextNode()) nodesToProcess.push(n);
      }

      nodesToProcess.forEach((node) => {
        const text = node.textContent;
        if (!testRegex.test(text)) return;
        regex.lastIndex = 0; // reset for global matching

        const parent = node.parentNode;
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;
        let localChanged = false;
        while ((match = regex.exec(text)) !== null) {
          const start = match.index;
          const end = regex.lastIndex;
          if (start > lastIndex) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex, start)));
          }
          const anchor = document.createElement('a');
          anchor.href = `#${refId}`;
          anchor.textContent = match[0];
          anchor.className = 'auto-link auto-link-ref';
          fragment.appendChild(anchor);
          lastIndex = end;
          localChanged = true;
        }
        if (!localChanged) return;
        if (lastIndex < text.length) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }
        parent.replaceChild(fragment, node);
        madeChanges = true;
      });

      // Next loop will create a fresh TreeWalker again if changes were made
    }
  }

  linkUrlsInReferenceSection(refHeading) {
    // Collect siblings after the References heading until the next h2 (inclusive stop)
    const sectionNodes = [];
    let sibling = refHeading.nextSibling;
    while (sibling) {
      if (sibling.nodeType === 1) { // Element
        const tag = sibling.tagName.toLowerCase();
        if (tag === 'h2') break; // end of references block
        sectionNodes.push(sibling);
      } else if (sibling.nodeType === 3) { // Text node directly under container
        sectionNodes.push(sibling);
      }
      sibling = sibling.nextSibling;
    }

    const urlRegex = /https?:\/\/\S+/g;

    const processTextNode = (textNode) => {
      const text = textNode.textContent;
      if (!text || !urlRegex.test(text)) return;

      urlRegex.lastIndex = 0; // reset
      const parent = textNode.parentNode;
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let match;
      while ((match = urlRegex.exec(text)) !== null) {
        const start = match.index;
        const end = urlRegex.lastIndex;
        if (start > lastIndex) fragment.appendChild(document.createTextNode(text.slice(lastIndex, start)));
        let url = match[0];
        let trailingComma = '';
        // If the matched URL ends with a comma, exclude it from the link and keep the comma as plain text
        if (url.endsWith(',')) {
          url = url.slice(0, -1);
          trailingComma = ',';
        }
        const a = document.createElement('a');
        a.href = url;
        a.textContent = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'auto-link auto-link-external';
        fragment.appendChild(a);
        if (trailingComma) {
          fragment.appendChild(document.createTextNode(trailingComma));
        }
        lastIndex = end;
      }
      if (lastIndex < text.length) fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
      parent.replaceChild(fragment, textNode);
    };

    const processElement = (el) => {
      const walker = document.createTreeWalker(
        el,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            if (this.isInsideLink(node)) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      let n;
      const toProcess = [];
      while (n = walker.nextNode()) toProcess.push(n);
      toProcess.forEach(processTextNode);
    };

    sectionNodes.forEach(node => {
      if (node.nodeType === 3) {
        // text node
        processTextNode(node);
      } else if (node.nodeType === 1) {
        processElement(node);
      }
    });
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