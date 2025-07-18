---
layout: default
title: 検索結果
lang: ja
permalink: /search/ja/
---

<div class="search-page">
  <div class="search-page-header">
    <h1>検索結果</h1>
    <div class="search-box-container">
      <input type="text" id="search-page-input" placeholder="企業名・製品名で検索..." autocomplete="off">
      <button id="search-page-button" type="button">検索</button>
    </div>
  </div>
  
  <div id="search-page-results" class="search-page-results">
    <div class="search-message" id="search-message">検索キーワードを入力してください</div>
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
      const response = await fetch('/assets/data/search_ja.json');
      this.searchData = await response.json();
    } catch (error) {
      console.error('Failed to load search data:', error);
      this.searchMessage.textContent = '検索データの読み込みに失敗しました。';
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
      this.searchMessage.textContent = '2文字以上入力してください。';
      this.searchResults.innerHTML = '<div class="search-message">2文字以上入力してください。</div>';
      return;
    }

    if (!this.searchData) {
      this.searchMessage.textContent = '検索データが読み込まれていません。';
      this.searchResults.innerHTML = '<div class="search-message">検索データが読み込まれていません。</div>';
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

    titleResults.sort((a, b) => b.score - a.score);
    otherResults.sort((a, b) => b.score - a.score);

    return [...titleResults, ...otherResults];
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

  containsWords(text, query) {
    const words = query.split(/\s+/);
    return words.some(word => text.includes(word));
  }

  displayResults(results, query) {
    if (results.length === 0) {
      this.searchResults.innerHTML = `
        <div class="search-message">
          「${this.escapeHtml(query)}」の検索結果が見つかりませんでした。
        </div>
      `;
      return;
    }

    const html = `
      <div class="search-results-header">
        <h2>「${this.escapeHtml(query)}」の検索結果 (${results.length}件)</h2>
      </div>
      <div class="search-results-list">
        ${results.map(item => `
          <div class="search-result-item">
            <div class="search-result-type">${item.type}</div>
            <h3><a href="${item.url}">${item.title}</a></h3>
            <div class="search-result-rating">
              <span class="rating-value">${item.rating}</span>
              <span class="rating-stars">★</span>
            </div>
            <p class="search-result-summary">${item.summary}</p>
            ${item.tags.length > 0 ? `
              <div class="search-result-tags">
                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;

    this.searchResults.innerHTML = html;
  }

  clearResults() {
    this.searchResults.innerHTML = '<div class="search-message">検索キーワードを入力してください</div>';
    
    // Clear URL query
    const url = new URL(window.location);
    url.searchParams.delete('q');
    window.history.replaceState({}, '', url);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  unescapeHtml(text) {
    const div = document.createElement('div');
    div.innerHTML = text;
    return div.textContent || div.innerText || '';
  }
}

// Initialize search page
document.addEventListener('DOMContentLoaded', () => {
  new SearchPage();
});
</script> 