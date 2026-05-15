---
layout: default
title: Search Results
lang: en
permalink: /search/en/
---

<div class="search-page">
  <div class="search-page-header">
    <h1>Search Results</h1>
    <div class="search-box-container">
      <input type="text" id="search-page-input" placeholder="Search companies and products..." autocomplete="off">
      <button id="search-page-button" type="button">Search</button>
    </div>
  </div>
  
  <div id="search-page-results" class="search-page-results">
    <div class="search-message" id="search-message">Please enter a search keyword</div>
  </div>
</div>

<script>
class SearchPage {
  constructor() {
    this.searchData = null;
    this.searchInput = document.getElementById('search-page-input');
    this.searchButton = document.getElementById('search-page-button');
    this.searchResults = document.getElementById('search-page-results');
    this.searchMessage = document.getElementById('search-message');
    
    this.init();
  }

  async init() {
    await this.loadSearchData();
    this.bindEvents();
    this.handleURLQuery();
  }

  async loadSearchData() {
    try {
      const response = await fetch('/assets/data/search_en.json');
      this.searchData = await response.json();
      this.searchData._index = SearchCommon.prepareSearchIndex(this.searchData);
    } catch (error) {
      console.error('Failed to load search data:', error);
      this.searchMessage.textContent = 'Failed to load search data.';
    }
  }

  bindEvents() {
    this.searchButton.addEventListener('click', () => {
      this.performSearch();
    });

    this.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.performSearch();
      }
    });

    this.searchInput.addEventListener('input', (e) => {
      if (e.target.value.trim() === '') {
        this.clearResults();
      }
    });
  }

  handleURLQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (query) {
      this.searchInput.value = query;
      this.performSearch();
    }
  }

  performSearch() {
    const query = this.searchInput.value.trim();
    
    if (!query || query.length < 2) {
      this.searchMessage.textContent = 'Please enter at least 2 characters.';
      this.searchResults.innerHTML = '<div class="search-message">Please enter at least 2 characters.</div>';
      return;
    }

    if (!this.searchData) {
      this.searchMessage.textContent = 'Search data is not available.';
      this.searchResults.innerHTML = '<div class="search-message">Search data is not available.</div>';
      return;
    }

    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('q', query);
    window.history.replaceState({}, '', url);

    const results = this.searchItems(query);
    this.displayResults(results, query);
  }

  searchItems(query) {
    return SearchCommon.searchItems(this.searchData, query);
  }

  calculateScore(item, query) {
    let score = 0;
    const title = item.title.toLowerCase();
    const summary = item.summary.toLowerCase();
    const tags = item.tags.map(tag => tag.toLowerCase());

    if (title === query) {
      score += 100;
    } else if (title.includes(query)) {
      score += 50;
    } else if (this.containsWords(title, query)) {
      score += 30;
    }

    if (summary.includes(query)) {
      score += 20;
    } else if (this.containsWords(summary, query)) {
      score += 10;
    }

    tags.forEach(tag => {
      if (tag.includes(query)) {
        score += 15;
      }
    });

    return score;
  }



  displayResults(results, query) {
    if (results.length === 0) {
      this.searchResults.innerHTML = `
        <div class="search-message">
          No search results found for "${SearchCommon.escapeHtml(query)}".
        </div>
      `;
      return;
    }

    const html = `
      <div class="search-results-header">
        <h2>Search results for "${SearchCommon.escapeHtml(query)}" (${results.length} results)</h2>
      </div>
      <div class="search-results-list catalog-grid">
        ${results.map(item => `
          <article class="review-card search-result-item">
            <span class="search-result-type tag">${SearchCommon.escapeHtml(item.type || '')}</span>
            <h3><a href="${item.url}">${SearchCommon.escapeHtml(item.title || '')}</a></h3>
            <div class="score-row search-result-rating">
              <span>Overall Rating</span>
              <span class="score-pill">${this.getDisplayRating(item.rating)}<small>/5</small></span>
            </div>
            <p class="search-result-summary">${SearchCommon.escapeHtml(item.summary || '')}</p>
            <div class="meta-row search-result-meta">
              ${item.price ? `<span>Reference Price ${this.formatPrice(item.price)} USD</span>` : ''}
              ${Array.isArray(item.tags) && item.tags.length > 0 ? `
                ${item.tags.map(tag => `<span class="tag">${SearchCommon.escapeHtml(tag)}</span>`).join('')}
              ` : ''}
            </div>
          </article>
        `).join('')}
      </div>
    `;

    this.searchResults.innerHTML = html;
  }

  clearResults() {
    this.searchResults.innerHTML = '<div class="search-message">Please enter a search keyword</div>';
    
    // Clear URL query
    const url = new URL(window.location);
    url.searchParams.delete('q');
    window.history.replaceState({}, '', url);
  }

  unescapeHtml(text) {
    const div = document.createElement('div');
    div.innerHTML = text;
    return div.textContent || div.innerText || '';
  }

  getDisplayRating(rating) {
    if (Array.isArray(rating)) {
      return rating[0] !== null && !isNaN(rating[0]) ? rating[0].toFixed(1) : 'N/A';
    }
    return typeof rating === 'number' ? rating.toFixed(1) : (rating || 'N/A');
  }

  formatPrice(price) {
    if (price === null || price === undefined || isNaN(price)) {
      return 'N/A';
    }
    
    // Convert to number and format with commas
    const numPrice = Number(price);
    return numPrice.toLocaleString();
  }
}

// Initialize search page
document.addEventListener('DOMContentLoaded', () => {
  new SearchPage();
});
</script>
