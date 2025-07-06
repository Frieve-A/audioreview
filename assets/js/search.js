// Add SortManager class before SearchEngine class
class SortManager {
  constructor() {
    this.sortSelect = document.getElementById('sort-select');
    this.companiesGrid = document.getElementById('companies-grid');
    this.productsGrid = document.getElementById('products-grid');
    this.originalOrder = [];
    
    this.init();
  }

  init() {
    if (this.sortSelect) {
      this.bindEvents();
      this.saveOriginalOrder();
      this.loadSortFromURL();
    }
  }

  bindEvents() {
    this.sortSelect.addEventListener('change', (e) => {
      this.handleSort(e.target.value);
      this.updateURL(e.target.value);
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.loadSortFromURL();
    });
  }

  saveOriginalOrder() {
    const grid = this.companiesGrid || this.productsGrid;
    if (grid) {
      this.originalOrder = Array.from(grid.children);
    }
  }

  handleSort(sortType) {
    const grid = this.companiesGrid || this.productsGrid;
    if (!grid) return;

    const cards = Array.from(grid.children);
    const sortedCards = this.sortCards(cards, sortType);
    
    // Clear and re-append sorted cards
    grid.innerHTML = '';
    sortedCards.forEach(card => grid.appendChild(card));
    
    // Update displayed ratings based on sort type
    this.updateDisplayedRatings(sortType);
  }

  updateDisplayedRatings(sortType) {
    const grid = this.companiesGrid || this.productsGrid;
    if (!grid) return;

    const cards = grid.querySelectorAll('.company-card, .product-card');
    
    // Get current language for labels
    const currentLang = this.getCurrentLanguage();
    const labels = this.getRatingLabels(currentLang);
    
    cards.forEach(card => {
      const ratingValueElement = card.querySelector('.rating-value');
      const ratingLabelElement = card.querySelector('.rating-label');
      if (!ratingValueElement || !ratingLabelElement) return;

      let newValue = 'N/A';
      let newLabel = labels.overall;
      
      switch (sortType) {
        case 'scientific-asc':
        case 'scientific-desc':
          newValue = this.getSpecificRatingValue(card, 'scientific');
          newLabel = labels.scientific;
          break;
        case 'technical-asc':
        case 'technical-desc':
          newValue = this.getSpecificRatingValue(card, 'technical');
          newLabel = labels.technical;
          break;
        case 'cost-asc':
        case 'cost-desc':
          newValue = this.getSpecificRatingValue(card, 'cost');
          newLabel = labels.cost;
          break;
        case 'reliability-asc':
        case 'reliability-desc':
          newValue = this.getSpecificRatingValue(card, 'reliability');
          newLabel = labels.reliability;
          break;
        case 'design-asc':
        case 'design-desc':
          newValue = this.getSpecificRatingValue(card, 'design');
          newLabel = labels.design;
          break;
        default:
          // For name, date, and overall rating sorts, show original overall rating
          newValue = this.getSpecificRatingValue(card, 'overall');
          newLabel = labels.overall;
          break;
      }
      
      ratingValueElement.textContent = (newValue !== null && !isNaN(newValue)) ? newValue.toFixed(1) : 'N/A';
      ratingLabelElement.textContent = newLabel;
    });
  }

  sortCards(cards, sortType) {
    return cards.sort((a, b) => {
      switch (sortType) {
        case 'name-asc':
          return this.compareNames(a, b, false);
        case 'name-desc':
          return this.compareNames(a, b, true);
        case 'date-asc':
          return this.compareDates(a, b, false);
        case 'date-desc':
          return this.compareDates(a, b, true);
        case 'rating-asc':
          return this.compareRatings(a, b, false);
        case 'rating-desc':
          return this.compareRatings(a, b, true);
        case 'scientific-asc':
          return this.compareSpecificRating(a, b, 'scientific', false);
        case 'scientific-desc':
          return this.compareSpecificRating(a, b, 'scientific', true);
        case 'technical-asc':
          return this.compareSpecificRating(a, b, 'technical', false);
        case 'technical-desc':
          return this.compareSpecificRating(a, b, 'technical', true);
        case 'cost-asc':
          return this.compareSpecificRating(a, b, 'cost', false);
        case 'cost-desc':
          return this.compareSpecificRating(a, b, 'cost', true);
        case 'reliability-asc':
          return this.compareSpecificRating(a, b, 'reliability', false);
        case 'reliability-desc':
          return this.compareSpecificRating(a, b, 'reliability', true);
        case 'design-asc':
          return this.compareSpecificRating(a, b, 'design', false);
        case 'design-desc':
          return this.compareSpecificRating(a, b, 'design', true);
        default:
          return 0;
      }
    });
  }

  compareNames(a, b, reverse) {
    const nameA = a.querySelector('h3 a').textContent.toLowerCase();
    const nameB = b.querySelector('h3 a').textContent.toLowerCase();
    const result = nameA.localeCompare(nameB);
    return reverse ? -result : result;
  }

  compareDates(a, b, reverse) {
    const dateA = new Date(a.querySelector('time').getAttribute('datetime'));
    const dateB = new Date(b.querySelector('time').getAttribute('datetime'));
    const result = dateA - dateB;
    return reverse ? -result : result;
  }

  compareRatings(a, b, reverse) {
    const ratingA = this.getSpecificRatingValue(a, 'overall') || 0;
    const ratingB = this.getSpecificRatingValue(b, 'overall') || 0;
    const result = ratingA - ratingB;
    return reverse ? -result : result;
  }

  getRatingValue(card) {
    const ratingElement = card.querySelector('.rating-value');
    if (!ratingElement) return 0;
    const rating = ratingElement.textContent.trim();
    return rating === 'N/A' ? 0 : parseFloat(rating);
  }

  compareSpecificRating(a, b, ratingType, reverse) {
    const ratingA = this.getSpecificRatingValue(a, ratingType) || 0;
    const ratingB = this.getSpecificRatingValue(b, ratingType) || 0;
    const result = ratingA - ratingB;
    return reverse ? -result : result;
  }

  getSpecificRatingValue(card, ratingType) {
    const rating = card.dataset[ratingType];
    if (rating === undefined || rating === null || rating === '') return null;
    const numericRating = parseFloat(rating);
    return isNaN(numericRating) ? null : numericRating;
  }

  getRatingLabels(lang) {
    if (lang === 'ja') {
      return {
        overall: '総合評価',
        scientific: '科学的有効性',
        technical: '技術レベル',
        cost: 'コストパフォーマンス',
        reliability: '信頼性・サポート',
        design: '設計思想の合理性'
      };
    } else {
      return {
        overall: 'Overall Rating',
        scientific: 'Scientific Validity',
        technical: 'Technical Level',
        cost: 'Cost Performance',
        reliability: 'Reliability & Support',
        design: 'Design Philosophy'
      };
    }
  }

  getCurrentLanguage() {
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

  loadSortFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const sortParam = urlParams.get('sort');
    
    if (sortParam && this.isValidSortOption(sortParam)) {
      this.sortSelect.value = sortParam;
      this.handleSort(sortParam);
    }
  }

  updateURL(sortType) {
    const url = new URL(window.location);
    if (sortType === 'name-asc') {
      // Remove sort parameter for default sorting
      url.searchParams.delete('sort');
    } else {
      url.searchParams.set('sort', sortType);
    }
    
    // Update URL without page reload
    window.history.replaceState({}, '', url);
  }

  isValidSortOption(sortType) {
    const validOptions = [
      'name-asc', 'name-desc', 'date-asc', 'date-desc',
      'rating-asc', 'rating-desc', 'scientific-asc', 'scientific-desc',
      'technical-asc', 'technical-desc', 'cost-asc', 'cost-desc',
      'reliability-asc', 'reliability-desc', 'design-asc', 'design-desc'
    ];
    return validOptions.includes(sortType);
  }
}

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

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize search engine and sort manager after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SearchEngine();
  new SortManager();
});