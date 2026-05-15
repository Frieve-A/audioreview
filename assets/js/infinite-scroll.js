/**
 * Infinite Scroll Manager
 * Renders listing cards and coordinates sort/filter state for product and company pages.
 */
class InfiniteScrollManager {
  constructor() {
    this.allData = [];
    this.filteredData = [];
    this.displayedCount = 90;
    this.itemsPerLoad = 30;
    this.isLoading = false;
    this.observer = null;
    this.currentLanguage = this.getCurrentLanguage();

    this.state = {
      sort: 'date-desc',
      tags: [],
      searchMode: 'and',
      ratingFilters: {
        overall: { min: 0, max: 5 },
        scientific: { min: 0, max: 1 },
        technical: { min: 0, max: 1 },
        cost: { min: 0, max: 1 },
        reliability: { min: 0, max: 1 },
        design: { min: 0, max: 1 }
      },
      priceFilter: {
        min: 0,
        max: this.currentLanguage === 'en' ? 1000000 : 100000000
      }
    };

    this.init();
  }

  async init() {
    if (!this.isListingPage()) {
      return;
    }

    this.preventImageDragging();
    window.infiniteScrollManager = this;
    this.updateResultCount();

    await this.loadData();
    this.setupEventListeners();
    this.renderInitialContent();
    this.setupInfiniteScroll();
  }

  isListingPage() {
    return window.location.pathname.includes('/companies/') || window.location.pathname.includes('/products/');
  }

  isCompaniesPage() {
    return window.location.pathname.includes('/companies/');
  }

  isProductsPage() {
    return window.location.pathname.includes('/products/');
  }

  preventImageDragging() {
    document.querySelectorAll('img').forEach((img) => {
      img.setAttribute('draggable', 'false');
    });
  }

  async loadData() {
    try {
      const response = await fetch(`/assets/data/search_${this.currentLanguage}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      this.allData = this.isCompaniesPage() ? (data.companies || []) : (data.products || []);
      this.filteredData = [...this.allData];

      if (window.tagFilter) {
        window.tagFilter.updateData(this.allData);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      this.showErrorMessage(this.currentLanguage === 'ja' ? 'データの読み込みに失敗しました' : 'Failed to load data');
    }
  }

  renderInitialContent() {
    this.sortData(this.state.sort);
    this.renderTagFilters();

    if (window.tagFilter) {
      window.tagFilter.loadStateFromURL();
      if (window.tagFilter.selectedTags.length > 0) {
        this.state.tags = [...new Set(window.tagFilter.selectedTags)];
        this.state.searchMode = window.tagFilter.searchMode;
      }
    }

    if (window.ratingFilter) {
      window.ratingFilter.loadStateFromURL();
      this.state.ratingFilters = window.ratingFilter.getFilterState();
    }

    if (window.priceFilter) {
      window.priceFilter.loadStateFromURL();
      this.state.priceFilter = window.priceFilter.getFilterState();
    }

    this.applyFilters();
  }

  renderTagFilters() {
    if (window.tagFilter) {
      window.tagFilter.updateData(this.allData);
      window.tagFilter.generateTagCategories();
      window.tagFilter.buildTagFilter();
      window.tagFilter.bindEvents();
      window.tagFilter.eventsBound = true;
    }

    if (window.ratingFilter) {
      window.ratingFilter.buildRatingFilter();
      window.ratingFilter.bindEvents();
    }

    if (window.priceFilter) {
      window.priceFilter.buildPriceFilter();
      window.priceFilter.bindEvents();
    }
  }

  getGridElement() {
    return document.getElementById('companies-grid') || document.getElementById('products-grid');
  }

  renderItems(startIndex, endIndex) {
    const grid = this.getGridElement();
    if (!grid) return;

    grid.innerHTML = '';
    grid.appendChild(this.buildFragment(startIndex, endIndex));
    this.updateResultCount();
    this.setupInfiniteScroll();
  }

  buildFragment(startIndex, endIndex) {
    const fragment = document.createDocumentFragment();
    this.filteredData.slice(startIndex, endIndex).forEach((item) => {
      fragment.appendChild(this.createItemElement(item));
    });
    return fragment;
  }

  createItemElement(item) {
    const card = document.createElement('article');
    const isCompany = this.isCompaniesPage();
    const rating = Array.isArray(item.rating) ? item.rating : [item.rating, 0, 0, 0, 0, 0];
    const { displayRating, displayLabel, scale } = this.getDisplayRatingAndLabel(rating, this.state.sort);
    const itemType = isCompany
      ? (this.currentLanguage === 'ja' ? '企業' : 'company')
      : (this.currentLanguage === 'ja' ? '製品' : 'product');

    card.className = `review-card ${isCompany ? 'company-card' : 'product-card'}`;
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `${item.title} ${itemType}`);
    card.dataset.overall = rating[0] || 0;
    card.dataset.scientific = rating[1] || 0;
    card.dataset.technical = rating[2] || 0;
    card.dataset.cost = rating[3] || 0;
    card.dataset.reliability = rating[4] || 0;
    card.dataset.design = rating[5] || 0;
    card.dataset.tags = item.tags?.join(',') || '';
    card.dataset.companyId = item.company_id || '';
    card.dataset.type = item.type || '';

    const title = this.escapeHtml(item.title || '');
    const summary = this.escapeHtml(item.summary || '');
    const tags = Array.isArray(item.tags) ? item.tags.slice(0, 2) : [];
    const dateLabel = this.formatDate(item.date);

    let html = '';
    if (this.isNewItem(item.date)) {
      html += `<span class="new-badge" aria-label="${this.currentLanguage === 'ja' ? '新着' : 'New'}">NEW</span>`;
    }

    html += `<h3><a href="${item.url}">${title}</a></h3>`;
    html += `<div class="score-row" role="group" aria-label="${displayLabel} ${displayRating}">`;
    html += `<span>${displayLabel}</span>`;
    html += `<span class="score-pill">${displayRating}<small>/${scale}</small></span>`;
    html += '</div>';
    html += `<p class="${isCompany ? 'company' : 'product'}-summary">${summary}</p>`;
    html += '<div class="meta-row">';

    if (!isCompany && item.price) {
      html += `<span>${this.currentLanguage === 'ja' ? '参考価格' : 'Reference Price'} ${this.formatPrice(item.price)}${this.currentLanguage === 'ja' ? ' 円' : ' USD'}</span>`;
    }

    html += `<time class="${isCompany ? 'company' : 'product'}-date" datetime="${item.date}">${dateLabel}</time>`;

    if (!isCompany && item.company_id) {
      html += `<span class="tag">${this.escapeHtml(item.company_id)}</span>`;
    }

    tags.forEach((tag) => {
      html += `<span class="tag">${this.escapeHtml(tag)}</span>`;
    });

    html += '</div>';
    card.innerHTML = html;
    return card;
  }

  isNewItem(dateString) {
    const currentDate = new Date();
    const itemDate = new Date(dateString);
    const daysDiff = (currentDate - itemDate) / (1000 * 60 * 60 * 24);
    return daysDiff <= 3;
  }

  getDisplayRatingAndLabel(rating, sortType) {
    const labels = this.getRatingLabels();
    let ratingIndex = 0;
    let label = labels.overall;

    switch (sortType) {
      case 'scientific-asc':
      case 'scientific-desc':
        ratingIndex = 1;
        label = labels.scientific;
        break;
      case 'technical-asc':
      case 'technical-desc':
        ratingIndex = 2;
        label = labels.technical;
        break;
      case 'cost-asc':
      case 'cost-desc':
        ratingIndex = 3;
        label = labels.cost;
        break;
      case 'reliability-asc':
      case 'reliability-desc':
        ratingIndex = 4;
        label = labels.reliability;
        break;
      case 'design-asc':
      case 'design-desc':
        ratingIndex = 5;
        label = labels.design;
        break;
      default:
        break;
    }

    const ratingValue = Number(rating[ratingIndex]);
    return {
      displayRating: Number.isFinite(ratingValue) ? ratingValue.toFixed(1) : 'N/A',
      displayLabel: label,
      scale: ratingIndex === 0 ? 5 : 1
    };
  }

  getRatingLabels() {
    if (this.currentLanguage === 'ja') {
      return {
        overall: '総合評価',
        scientific: '科学的妥当性',
        technical: '技術水準',
        cost: 'コストパフォーマンス',
        reliability: '信頼性・サポート',
        design: '設計思想の合理性'
      };
    }

    return {
      overall: 'Overall Rating',
      scientific: 'Scientific Validity',
      technical: 'Technology Level',
      cost: 'Cost-Performance',
      reliability: 'Reliability & Support',
      design: 'Design Rationality'
    };
  }

  setupInfiniteScroll() {
    if (this.observer) {
      this.observer.disconnect();
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isLoading) {
          this.loadMoreItems();
        }
      });
    }, { rootMargin: '100px' });

    this.observeLastItem();
  }

  observeLastItem() {
    const grid = this.getGridElement();
    if (!grid || grid.children.length === 0 || !this.observer) return;
    this.observer.observe(grid.lastElementChild);
  }

  loadMoreItems() {
    if (this.displayedCount >= this.filteredData.length) return;

    this.isLoading = true;
    requestAnimationFrame(() => {
      const grid = this.getGridElement();
      if (!grid) return;

      const fragment = document.createDocumentFragment();
      const nextItems = this.filteredData.slice(this.displayedCount, this.displayedCount + this.itemsPerLoad);
      nextItems.forEach((item) => fragment.appendChild(this.createItemElement(item)));
      grid.appendChild(fragment);

      this.displayedCount += this.itemsPerLoad;
      this.isLoading = false;
      this.observeLastItem();
      this.updateResultCount();

      const itemType = this.isCompaniesPage()
        ? (this.currentLanguage === 'ja' ? '企業レビュー' : 'company reviews')
        : (this.currentLanguage === 'ja' ? '製品レビュー' : 'product reviews');
      const message = this.currentLanguage === 'ja'
        ? `${nextItems.length}件の${itemType}を追加しました`
        : `${nextItems.length} ${itemType} added`;
      this.announceToScreenReader(message);
    });
  }

  sortData(sortType) {
    this.state.sort = sortType;
    this.filteredData.sort((a, b) => this.compareItems(a, b, sortType));
  }

  compareItems(a, b, sortType) {
    switch (sortType) {
      case 'name-asc':
        return (a.title || '').localeCompare(b.title || '', this.currentLanguage === 'ja' ? 'ja' : 'en');
      case 'name-desc':
        return (b.title || '').localeCompare(a.title || '', this.currentLanguage === 'ja' ? 'ja' : 'en');
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'rating-asc':
        return this.getRatingValue(a, 0) - this.getRatingValue(b, 0);
      case 'rating-desc':
        return this.getRatingValue(b, 0) - this.getRatingValue(a, 0);
      case 'scientific-asc':
        return this.getRatingValue(a, 1) - this.getRatingValue(b, 1);
      case 'scientific-desc':
        return this.getRatingValue(b, 1) - this.getRatingValue(a, 1);
      case 'technical-asc':
        return this.getRatingValue(a, 2) - this.getRatingValue(b, 2);
      case 'technical-desc':
        return this.getRatingValue(b, 2) - this.getRatingValue(a, 2);
      case 'cost-asc':
        return this.getRatingValue(a, 3) - this.getRatingValue(b, 3);
      case 'cost-desc':
        return this.getRatingValue(b, 3) - this.getRatingValue(a, 3);
      case 'reliability-asc':
        return this.getRatingValue(a, 4) - this.getRatingValue(b, 4);
      case 'reliability-desc':
        return this.getRatingValue(b, 4) - this.getRatingValue(a, 4);
      case 'design-asc':
        return this.getRatingValue(a, 5) - this.getRatingValue(b, 5);
      case 'design-desc':
        return this.getRatingValue(b, 5) - this.getRatingValue(a, 5);
      default:
        return 0;
    }
  }

  getRatingValue(item, index) {
    const rating = Array.isArray(item.rating) ? item.rating : [item.rating];
    const value = Number(rating[index]);
    return Number.isFinite(value) ? value : 0;
  }

  applyFilters() {
    this.filteredData = [...this.allData];

    if (this.state.tags.length > 0) {
      this.filteredData = this.filteredData.filter((item) => {
        if (!item.tags) return false;
        return this.state.searchMode === 'and'
          ? this.state.tags.every((tag) => item.tags.includes(tag))
          : this.state.tags.some((tag) => item.tags.includes(tag));
      });
    }

    this.filteredData = this.filteredData.filter((item) => {
      if (!item.rating || item.rating.length < 6) return false;
      const rating = item.rating;
      const filters = this.state.ratingFilters;
      return rating[0] >= filters.overall.min && rating[0] <= filters.overall.max &&
        rating[1] >= filters.scientific.min && rating[1] <= filters.scientific.max &&
        rating[2] >= filters.technical.min && rating[2] <= filters.technical.max &&
        rating[3] >= filters.cost.min && rating[3] <= filters.cost.max &&
        rating[4] >= filters.reliability.min && rating[4] <= filters.reliability.max &&
        rating[5] >= filters.design.min && rating[5] <= filters.design.max;
    });

    if (this.isProductsPage()) {
      this.filteredData = this.filteredData.filter((item) => {
        if (item.price === null || item.price === undefined) return true;
        const price = Number(item.price);
        return price >= this.state.priceFilter.min && price <= this.state.priceFilter.max;
      });
    }

    this.sortData(this.state.sort);
    this.displayedCount = 90;
    this.renderItems(0, this.displayedCount);
  }

  setupEventListeners() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (event) => {
        this.handleSortChange(event.target.value);
      });
    }

    this.setupTagFilterListeners();
    this.setupKeyboardNavigation();
  }

  setupTagFilterListeners() {
    if (window.tagFilter) {
      let isProcessingFilter = false;
      window.tagFilter.applyFilters = () => {
        if (isProcessingFilter) return;
        isProcessingFilter = true;
        try {
          window.tagFilter.updateUI();
          window.tagFilter.updateURL();
          this.handleTagFilterChange();
        } finally {
          isProcessingFilter = false;
        }
      };

      window.tagFilter.updateResultCount = () => {
        this.updateResultCount();
      };

      window.tagFilter.displayItems = () => {};
    }
  }

  handleTagFilterChange() {
    if (!window.tagFilter) return;
    this.state.tags = [...new Set(window.tagFilter.selectedTags)];
    this.state.searchMode = window.tagFilter.searchMode;
    this.applyFilters();
  }

  handleRatingFilterChange() {
    if (!window.ratingFilter) return;
    this.state.ratingFilters = window.ratingFilter.getFilterState();
    this.applyFilters();
  }

  handlePriceFilterChange() {
    if (!window.priceFilter) return;
    this.state.priceFilter = window.priceFilter.getFilterState();
    this.applyFilters();
  }

  handleSortChange(sortType) {
    this.sortData(sortType);
    this.displayedCount = 90;
    this.renderItems(0, this.displayedCount);

    const sortMessage = this.currentLanguage === 'ja'
      ? `並び替えを${this.getSortDescription(sortType)}に変更しました`
      : `Sorting changed to ${this.getSortDescription(sortType)}`;
    this.announceToScreenReader(sortMessage);
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      if ((event.key === 'Enter' || event.key === ' ') && event.target.classList.contains('tag-filter-button')) {
        event.preventDefault();
        event.target.click();
      }
    });
  }

  updateResultCount() {
    const resultCountElement = document.getElementById('result-count');
    if (!resultCountElement) return;

    if (this.allData.length === 0) {
      resultCountElement.textContent = 'Loading...';
      return;
    }

    const totalCount = this.allData.length;
    const filteredCount = this.filteredData.length;
    const hasFilters = Boolean(
      (window.tagFilter && window.tagFilter.selectedTags.length > 0) ||
      (window.ratingFilter && window.ratingFilter.hasActiveFilters()) ||
      (window.priceFilter && window.priceFilter.hasActiveFilters())
    );

    if (this.currentLanguage === 'ja') {
      if (this.isCompaniesPage()) {
        resultCountElement.textContent = hasFilters
          ? `${totalCount}社中${filteredCount}社のレビューを表示中`
          : `${totalCount}社のレビューを掲載中`;
      } else {
        resultCountElement.textContent = hasFilters
          ? `${totalCount}件中${filteredCount}件のレビューを表示中`
          : `${totalCount}件のレビューを掲載中`;
      }
      return;
    }

    if (this.isCompaniesPage()) {
      resultCountElement.textContent = hasFilters
        ? `Showing ${filteredCount} of ${totalCount} company reviews`
        : `Featuring ${totalCount} company reviews`;
    } else {
      resultCountElement.textContent = hasFilters
        ? `Showing ${filteredCount} of ${totalCount} product reviews`
        : `Featuring ${totalCount} product reviews`;
    }
  }

  showErrorMessage(message) {
    const grid = this.getGridElement();
    if (!grid) return;

    const reloadText = this.currentLanguage === 'ja' ? '再読み込み' : 'Reload';
    grid.innerHTML = `
      <div class="error-message" role="alert">
        <p>${this.escapeHtml(message)}</p>
        <button onclick="location.reload()">${reloadText}</button>
      </div>
    `;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = this.decodeHtmlEntities(String(text || ''));
    return div.innerHTML;
  }

  decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.currentLanguage === 'ja' ? 'ja-JP' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatPrice(price) {
    if (price === null || price === undefined || Number.isNaN(Number(price))) {
      return 'N/A';
    }
    return Number(price).toLocaleString();
  }

  getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.includes('/en/')) return 'en';
    if (path.includes('/ja/')) return 'ja';

    const langMeta = document.querySelector('meta[name="lang"]');
    if (langMeta) return langMeta.content;

    return document.documentElement.lang || 'ja';
  }

  getSortDescription(sortType) {
    const jaDescriptions = {
      'name-asc': '名前順（昇順）',
      'name-desc': '名前順（降順）',
      'date-asc': '更新日（古い順）',
      'date-desc': '更新日（新しい順）',
      'rating-asc': '総合評価（低い順）',
      'rating-desc': '総合評価（高い順）',
      'scientific-asc': '科学的妥当性（低い順）',
      'scientific-desc': '科学的妥当性（高い順）',
      'technical-asc': '技術水準（低い順）',
      'technical-desc': '技術水準（高い順）',
      'cost-asc': 'コストパフォーマンス（低い順）',
      'cost-desc': 'コストパフォーマンス（高い順）',
      'reliability-asc': '信頼性・サポート（低い順）',
      'reliability-desc': '信頼性・サポート（高い順）',
      'design-asc': '設計思想の合理性（低い順）',
      'design-desc': '設計思想の合理性（高い順）'
    };

    const enDescriptions = {
      'name-asc': 'Alphabetical (A-Z)',
      'name-desc': 'Alphabetical (Z-A)',
      'date-asc': 'Date Updated (Oldest)',
      'date-desc': 'Date Updated (Newest)',
      'rating-asc': 'Overall Rating (Low to High)',
      'rating-desc': 'Overall Rating (High to Low)',
      'scientific-asc': 'Scientific Validity (Low to High)',
      'scientific-desc': 'Scientific Validity (High to Low)',
      'technical-asc': 'Technology Level (Low to High)',
      'technical-desc': 'Technology Level (High to Low)',
      'cost-asc': 'Cost Performance (Low to High)',
      'cost-desc': 'Cost Performance (High to Low)',
      'reliability-asc': 'Reliability & Support (Low to High)',
      'reliability-desc': 'Reliability & Support (High to Low)',
      'design-asc': 'Design Rationality (Low to High)',
      'design-desc': 'Design Rationality (High to Low)'
    };

    const descriptions = this.currentLanguage === 'ja' ? jaDescriptions : enDescriptions;
    return descriptions[sortType] || sortType;
  }

  announceToScreenReader(message) {
    let liveRegion = document.getElementById('sr-live-region');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'sr-live-region';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }

    liveRegion.textContent = message;
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    window.infiniteScrollManager = new InfiniteScrollManager();
  }, 100);
});
