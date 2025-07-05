class SearchEngine {
  constructor() {
    this.searchData = null;
    this.searchOverlay = document.getElementById('search-overlay');
    this.searchInput = document.getElementById('search-input');
    this.searchResults = document.getElementById('search-results');
    this.searchToggle = document.getElementById('search-toggle');
    this.searchClose = document.getElementById('search-close');
    
    this.init();
  }

  async init() {
    await this.loadSearchData();
    this.bindEvents();
  }

  async loadSearchData() {
    try {
      // Get current page language
      const currentLang = this.getCurrentLanguage();
      const searchFile = `/assets/data/search_${currentLang}.json`;
      const response = await fetch(searchFile);
      this.searchData = await response.json();
    } catch (error) {
      console.error('Failed to load search data:', error);
    }
  }

  bindEvents() {
    // Open search overlay
    this.searchToggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.openSearch();
    });

    // Handle search icons in page titles
    document.querySelectorAll('.search-icon').forEach(icon => {
      icon.addEventListener('click', (e) => {
        e.preventDefault();
        this.openSearch();
      });
    });

    // Close search overlay
    this.searchClose.addEventListener('click', () => {
      this.closeSearch();
    });

    // Close by clicking overlay background
    this.searchOverlay.addEventListener('click', (e) => {
      if (e.target === this.searchOverlay) {
        this.closeSearch();
      }
    });

    // Close search with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.searchOverlay.style.display === 'block') {
        this.closeSearch();
      }
    });

    // Search input event
    this.searchInput.addEventListener('input', (e) => {
      this.performSearch(e.target.value);
    });
  }

  openSearch() {
    this.searchOverlay.style.display = 'block';
    this.searchInput.focus();
    this.searchInput.value = '';
    this.searchResults.innerHTML = '';
  }

  closeSearch() {
    this.searchOverlay.style.display = 'none';
    this.searchInput.value = '';
    this.searchResults.innerHTML = '';
  }

  performSearch(query) {
    if (!query.trim() || query.length < 2) {
      this.searchResults.innerHTML = '';
      return;
    }

    if (!this.searchData) {
      const currentLang = this.getCurrentLanguage();
      const errorMsg = currentLang === 'ja' ? '検索データが読み込めませんでした。' : 'Failed to load search data.';
      this.searchResults.innerHTML = `<p>${errorMsg}</p>`;
      return;
    }

    const results = this.searchItems(query);
    this.displayResults(results);
  }

  searchItems(query) {
    const normalizedQuery = query.toLowerCase();
    const titleResults = [];
    const otherResults = [];

    const allItems = [...this.searchData.companies, ...this.searchData.products];

    allItems.forEach(item => {
      const score = this.calculateScore(item, normalizedQuery);
      if (score > 0) {
        const titleMatch = item.title.toLowerCase().includes(normalizedQuery) || 
                           this.containsWords(item.title.toLowerCase(), normalizedQuery);
        
        if (titleMatch) {
          titleResults.push({ ...item, score });
        } else {
          otherResults.push({ ...item, score });
        }
      }
    });

    // Sort each list by score (descending)
    titleResults.sort((a, b) => b.score - a.score);
    otherResults.sort((a, b) => b.score - a.score);

    return [...titleResults, ...otherResults];
  }

  calculateScore(item, query) {
    let score = 0;
    const title = item.title.toLowerCase();
    const summary = item.summary.toLowerCase();
    const tags = item.tags.map(tag => tag.toLowerCase());

    // Exact match in title
    if (title === query) {
      score += 100;
    }
    // Partial match in title
    else if (title.includes(query)) {
      score += 50;
    }
    // Word match in title
    else if (this.containsWords(title, query)) {
      score += 30;
    }

    // Partial match in summary
    if (summary.includes(query)) {
      score += 20;
    }
    // Word match in summary
    else if (this.containsWords(summary, query)) {
      score += 10;
    }

    // Match in tags
    tags.forEach(tag => {
      if (tag.includes(query)) {
        score += 15;
      }
    });

    return score;
  }

  containsWords(text, query) {
    const words = query.split(/\s+/);
    return words.some(word => text.includes(word));
  }

  displayResults(results) {
    if (results.length === 0) {
      const currentLang = this.getCurrentLanguage();
      const noResultsMsg = currentLang === 'ja' ? '検索結果が見つかりませんでした。' : 'No search results found.';
      this.searchResults.innerHTML = `<p>${noResultsMsg}</p>`;
      return;
    }

    const html = results.map(item => `
      <div class="search-result">
        <div class="search-result-type">${item.type}</div>
        <h3><a href="${item.url}">${this.escapeHtml(item.title)}</a></h3>
        <div class="search-result-rating">
          <span class="rating-value">${item.rating}</span>
          <span class="rating-stars">★</span>
        </div>
        <p class="search-result-summary">${this.escapeHtml(item.summary)}</p>
        ${item.tags.length > 0 ? `
          <div class="search-result-tags">
            ${item.tags.map(tag => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    `).join('');

    this.searchResults.innerHTML = html;
  }

  getCurrentLanguage() {
    // Get language from URL (/en/ or /ja/)
    const path = window.location.pathname;
    if (path.includes('/en/')) {
      return 'en';
    } else if (path.includes('/ja/')) {
      return 'ja';
    }
    // Default to English
    return 'en';
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize search engine after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SearchEngine();
});