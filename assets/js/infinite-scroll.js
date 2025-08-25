/**
 * Infinite Scroll Manager
 * Handles infinite scroll functionality for company and product listing pages
 * Integrates with existing TagFilterManager for seamless functionality
 */
class InfiniteScrollManager {
  constructor() {
    // Core data management
    this.allData = []; // Original data from JSON
    this.filteredData = []; // Filtered data
    
    // Display control
    this.displayedCount = 90; // Initial display count
    this.itemsPerLoad = 30; // Items to add per scroll
    this.isLoading = false;
    
         // State management (unified)
     this.state = {
       sort: 'date-desc',
       tags: [],
       searchMode: 'and', // Support for AND/OR search mode
       ratingFilters: {
         overall: { min: 0, max: 5 },
         scientific: { min: 0, max: 1 },
         technical: { min: 0, max: 1 },
         cost: { min: 0, max: 1 },
         reliability: { min: 0, max: 1 },
         design: { min: 0, max: 1 }
       },
       priceFilter: { min: 0, max: this.currentLanguage === 'en' ? 1000000 : 100000000 },
       displayedCount: 90,
       isLoading: false
     };
    
    // UI elements
    this.observer = null;
    this.currentLanguage = this.getCurrentLanguage();
    
    // Initialize
    this.init();
  }
  
  async init() {
    // Only initialize on companies or products pages
    if (!window.location.pathname.includes('/companies/') && !window.location.pathname.includes('/products/')) {
      return;
    }
    
    // Prevent image dragging
    this.preventImageDragging();
    
    // Set initial loading state
    this.updateResultCount();
    
    // Set global reference for other components
    window.infiniteScrollManager = this;
    
    // Load data and setup
    await this.loadData();
    this.setupEventListeners();
    this.renderInitialContent();
    this.setupInfiniteScroll();
  }

  preventImageDragging() {
    // Set draggable="false" on all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('draggable', 'false');
    });
  }
  
  async loadData() {
    const isCompaniesPage = window.location.pathname.includes('/companies/');
    const isProductsPage = window.location.pathname.includes('/products/');
    
    try {
      const response = await fetch(`/assets/data/search_${this.currentLanguage}.json`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      
      if (isCompaniesPage) {
        this.allData = data.companies || [];
      } else if (isProductsPage) {
        this.allData = data.products || [];
      }
      
      this.filteredData = [...this.allData];
      
      // Update existing TagFilterManager with new data
      if (window.tagFilter) {
        window.tagFilter.updateData(this.allData);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      const errorMessage = this.currentLanguage === 'ja' ? 
        'データの読み込みに失敗しました' : 
        'Failed to load data';
      this.showErrorMessage(errorMessage);
    }
  }
  
  renderInitialContent() {
    this.sortData(this.state.sort);
    this.renderTagFilters();
    
    // Initialize tag filter state from URL if present
    if (window.tagFilter) {
      window.tagFilter.loadStateFromURL();
      
      // Sync state with InfiniteScrollManager and apply filters if tags are present
      if (window.tagFilter.selectedTags.length > 0) {
        this.state.tags = [...new Set(window.tagFilter.selectedTags)];
        this.state.searchMode = window.tagFilter.searchMode;
      }
    }
    
    // Initialize rating filter state from URL if present
    if (window.ratingFilter) {
      window.ratingFilter.loadStateFromURL();
      this.state.ratingFilters = window.ratingFilter.getFilterState();
    }
    
    // Initialize price filter state from URL if present (products only)
    if (window.priceFilter) {
      window.priceFilter.loadStateFromURL();
      this.state.priceFilter = window.priceFilter.getFilterState();
    }
    
    // Apply all filters
    this.applyFilters();
    
    this.updateResultCount();
  }
  
  renderItems(startIndex, endIndex) {
    const grid = this.getGridElement();
    if (!grid) return;
    
    // Clear existing items efficiently
    this.clearGrid(grid);
    
    // Generate and display only specified range using DocumentFragment
    const fragment = this.buildFragment(startIndex, endIndex);
    
    // Single DOM operation for better performance
    grid.appendChild(fragment);
    
    // Post-render operations
    this.postRender();
  }
  
  getGridElement() {
    return document.getElementById('companies-grid') || document.getElementById('products-grid');
  }
  
  clearGrid(grid) {
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
  }
  
  buildFragment(startIndex, endIndex) {
    const fragment = document.createDocumentFragment();
    const itemsToRender = this.filteredData.slice(startIndex, endIndex);
    
    // Batch processing for memory efficiency
    const batchSize = 10;
    for (let i = 0; i < itemsToRender.length; i += batchSize) {
      const batch = itemsToRender.slice(i, i + batchSize);
      
      batch.forEach(item => {
        const element = this.createItemElement(item);
        fragment.appendChild(element);
      });
      
      // Yield to main thread for large batches to prevent blocking
      if (i + batchSize < itemsToRender.length && itemsToRender.length > 50) {
        this.yieldToMainThread();
      }
    }
    
    return fragment;
  }
  
  yieldToMainThread() {
    return new Promise(resolve => setTimeout(resolve, 0));
  }
  
  postRender() {
    this.setupInfiniteScroll();
    this.updateResultCount();
  }
  
  createItemElement(item) {
    const div = document.createElement('div');
    
    // Maintain existing CSS classes for compatibility
    const isCompaniesPage = window.location.pathname.includes('/companies/');
    const isProductsPage = window.location.pathname.includes('/products/');
    
    if (isCompaniesPage) {
      div.className = 'company-card';
    } else if (isProductsPage) {
      div.className = 'product-card';
    }
    
    // Enhanced ARIA labels for screen readers
    div.setAttribute('role', 'article');
    const itemType = isCompaniesPage ? 
      (this.currentLanguage === 'ja' ? '企業' : 'company') : 
      (this.currentLanguage === 'ja' ? '製品' : 'product');
    const infoLabel = this.currentLanguage === 'ja' ? '情報' : 'information';
    div.setAttribute('aria-label', `${item.title} ${itemType} ${infoLabel}`);
    
    // Handle rating data (support both array and single value for backward compatibility)
    const rating = Array.isArray(item.rating) ? item.rating : [item.rating, 0, 0, 0, 0, 0];
    
    // Set data attributes for existing functionality
    div.dataset.overall = rating[0] || 0;
    div.dataset.scientific = rating[1] || 0;
    div.dataset.technical = rating[2] || 0;
    div.dataset.cost = rating[3] || 0;
    div.dataset.reliability = rating[4] || 0;
    div.dataset.design = rating[5] || 0;
    div.dataset.tags = item.tags?.join(',') || '';
    div.dataset.companyId = item.company_id || '';
    div.dataset.type = item.type || '';
    
    // NEW badge logic
    const isNew = this.isNewItem(item.date);
    
    // Get current sort type and determine which rating to display
    const currentSort = this.state.sort;
    const { displayRating, displayLabel } = this.getDisplayRatingAndLabel(rating, currentSort);
    
    // Generate HTML with accessibility attributes
    let html = '';
    if (isNew) {
      const newLabel = this.currentLanguage === 'ja' ? '新着' : 'New';
      html += `<span class="new-badge" aria-label="${newLabel}">NEW</span>`;
    }
    
         html += `<h3><a href="${item.url}" target="_blank">${this.escapeHtml(item.title)}</a></h3>`;
     
     html += `<div class="${isCompaniesPage ? 'company' : 'product'}-rating" role="group" aria-label="${this.currentLanguage === 'ja' ? '評価情報' : 'Rating information'}">`;
     html += `<span class="rating-label">${displayLabel}</span>`;
     html += `<span class="rating-value" aria-label="${displayLabel}${displayRating}${this.currentLanguage === 'ja' ? '点' : ' points'}">${displayRating}</span>`;
     html += '<span class="rating-stars" aria-hidden="true">★</span>';
     html += '</div>';
     html += `<p class="${isCompaniesPage ? 'company' : 'product'}-summary">${this.escapeHtml(item.summary)}</p>`;
     
     // Add price for products (after summary)
     if (isProductsPage && item.price) {
       const priceLabel = this.currentLanguage === 'ja' ? '参考価格' : 'Reference Price';
       const formattedPrice = this.formatPrice(item.price);
       const currency = this.currentLanguage === 'ja' ? '円' : 'USD';
       html += `<div class="product-card-price">`;
       html += `<span class="price-label">${priceLabel}:</span>`;
       html += `<span class="price-value">${formattedPrice} ${currency}</span>`;
       html += `</div>`;
     }
    
    html += `<time class="${isCompaniesPage ? 'company' : 'product'}-date" datetime="${item.date}" aria-label="${this.currentLanguage === 'ja' ? '更新日' : 'Updated'}${this.formatDate(item.date)}">`;
    html += `${this.formatDate(item.date)}</time>`;
    
    // Add company link for products
    if (isProductsPage && item.company_id) {
      const companyUrl = this.currentLanguage === 'ja' ? 
        `/companies/ja/${item.company_id}/` : 
        `/companies/en/${item.company_id}/`;
      const companyLabel = this.currentLanguage === 'ja' ? '企業' : 'Company';
      html += `<p class="product-company">${companyLabel}: <a href="${companyUrl}" target="_blank">${this.escapeHtml(item.company_id)}</a></p>`;
    }
    
    div.innerHTML = html;
    
    return div;
  }
  
  isNewItem(dateString) {
    const currentDate = new Date();
    const itemDate = new Date(dateString);
    const daysDiff = (currentDate - itemDate) / (1000 * 60 * 60 * 24);
    return daysDiff <= 3;
  }
  
  getDisplayRatingAndLabel(rating, sortType) {
    const labels = this.getRatingLabels();
    
    let ratingIndex = 0; // Default to overall rating
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
        // For name, date, and overall rating sorts, show original overall rating
        ratingIndex = 0;
        label = labels.overall;
        break;
    }
    
    const ratingValue = rating[ratingIndex];
    const displayRating = (ratingValue !== null && !isNaN(ratingValue)) ? 
      ratingValue.toFixed(1) : 'N/A';
    
    return { displayRating, displayLabel: label };
  }
  
  getRatingLabels() {
    if (this.currentLanguage === 'ja') {
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
  
  setupInfiniteScroll() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isLoading) {
          this.loadMoreItems();
        }
      });
    }, {
      rootMargin: '100px' // Start loading slightly before reaching the end
    });
    
    this.observeLastItem();
  }
  
  observeLastItem() {
    const grid = this.getGridElement();
    if (!grid || grid.children.length === 0) return;
    
    const lastItem = grid.lastElementChild;
    if (lastItem && this.observer) {
      this.observer.observe(lastItem);
    }
  }
  
  loadMoreItems() {
    if (this.displayedCount >= this.filteredData.length) return;
    
    this.isLoading = true;
    
    requestAnimationFrame(() => {
      const nextItems = this.filteredData.slice(
        this.displayedCount,
        this.displayedCount + this.itemsPerLoad
      );
      
      const grid = this.getGridElement();
      
      // Use DocumentFragment for efficient DOM manipulation
      // Only append new items - existing items remain unchanged
      const fragment = document.createDocumentFragment();
      nextItems.forEach(item => {
        const itemElement = this.createItemElement(item);
        fragment.appendChild(itemElement);
      });
      
      // Single DOM operation - append only new items
      grid.appendChild(fragment);
      
      this.displayedCount += this.itemsPerLoad;
      this.isLoading = false;
      
      // Observe new last item
      this.observeLastItem();
      this.updateResultCount();
      
      // Announce new items to screen reader
      const itemType = window.location.pathname.includes('/companies/') ? 
        (this.currentLanguage === 'ja' ? '企業' : 'companies') : 
        (this.currentLanguage === 'ja' ? '製品' : 'products');
      const unit = this.currentLanguage === 'ja' ? '件' : '';
      const message = this.currentLanguage === 'ja' ? 
        `${nextItems.length}${unit}の${itemType}が追加されました` : 
        `${nextItems.length} ${itemType} added`;
      this.announceToScreenReader(message);
    });
  }
  
  // Unified sort functionality
  sortData(sortType) {
    this.state.sort = sortType;
    this.filteredData.sort((a, b) => {
      return this.compareItems(a, b, sortType);
    });
  }
  
  compareItems(a, b, sortType) {
    switch (sortType) {
      case 'name-asc':
        return a.title.localeCompare(b.title, this.currentLanguage === 'ja' ? 'ja' : 'en');
      case 'name-desc':
        return b.title.localeCompare(a.title, this.currentLanguage === 'ja' ? 'ja' : 'en');
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'rating-asc':
        return (this.getRatingValue(a, 0) || 0) - (this.getRatingValue(b, 0) || 0);
      case 'rating-desc':
        return (this.getRatingValue(b, 0) || 0) - (this.getRatingValue(a, 0) || 0);
      case 'scientific-asc':
        return (this.getRatingValue(a, 1) || 0) - (this.getRatingValue(b, 1) || 0);
      case 'scientific-desc':
        return (this.getRatingValue(b, 1) || 0) - (this.getRatingValue(a, 1) || 0);
      case 'technical-asc':
        return (this.getRatingValue(a, 2) || 0) - (this.getRatingValue(b, 2) || 0);
      case 'technical-desc':
        return (this.getRatingValue(b, 2) || 0) - (this.getRatingValue(a, 2) || 0);
      case 'cost-asc':
        return (this.getRatingValue(a, 3) || 0) - (this.getRatingValue(b, 3) || 0);
      case 'cost-desc':
        return (this.getRatingValue(b, 3) || 0) - (this.getRatingValue(a, 3) || 0);
      case 'reliability-asc':
        return (this.getRatingValue(a, 4) || 0) - (this.getRatingValue(b, 4) || 0);
      case 'reliability-desc':
        return (this.getRatingValue(b, 4) || 0) - (this.getRatingValue(a, 4) || 0);
      case 'design-asc':
        return (this.getRatingValue(a, 5) || 0) - (this.getRatingValue(b, 5) || 0);
      case 'design-desc':
        return (this.getRatingValue(b, 5) || 0) - (this.getRatingValue(a, 5) || 0);
      default:
        return 0;
    }
  }
  
  getRatingValue(item, index) {
    const rating = Array.isArray(item.rating) ? item.rating : [item.rating];
    return rating[index] || 0;
  }
  
  // Filter functionality - maintain existing UI structure
  renderTagFilters() {
    // Delegate to existing TagFilterManager for UI generation
    // This ensures complete compatibility with existing tag filter UI
    if (window.tagFilter) {
      // Update the tag filter with new data
      window.tagFilter.updateData(this.allData);
      window.tagFilter.generateTagCategories();
      window.tagFilter.buildTagFilter();
      
      // Always rebind events after DOM reconstruction to ensure more... button works
      window.tagFilter.bindEvents();
      window.tagFilter.eventsBound = true;
    }
    
    // Initialize rating filter if available
    if (window.ratingFilter) {
      window.ratingFilter.buildRatingFilter();
      window.ratingFilter.bindEvents();
    }
    
    // Initialize price filter if available (products only)
    if (window.priceFilter) {
      window.priceFilter.buildPriceFilter();
      window.priceFilter.bindEvents();
    }
  }
  
  // Tag filter event handling - delegate to existing TagFilterManager
  handleTagFilterChange() {
    // Get current filter state from existing TagFilterManager
    if (window.tagFilter) {
      // Prevent duplicate tags by using Set and converting back to array
      this.state.tags = [...new Set(window.tagFilter.selectedTags)];
      this.state.searchMode = window.tagFilter.searchMode;
      this.applyFilters();
    }
  }

  // Rating filter event handling
  handleRatingFilterChange() {
    if (window.ratingFilter) {
      this.state.ratingFilters = window.ratingFilter.getFilterState();
      this.applyFilters();
    }
  }

  // Price filter event handling (products only)
  handlePriceFilterChange() {
    if (window.priceFilter) {
      this.state.priceFilter = window.priceFilter.getFilterState();
      this.applyFilters();
    }
  }
  
  // Unified filter application
  applyFilters() {
    // Start with all data
    this.filteredData = [...this.allData];
    
    // Apply tag filters
    if (this.state.tags.length > 0) {
      this.filteredData = this.filteredData.filter(item => {
        if (this.state.searchMode === 'and') {
          return this.state.tags.every(tag => 
            item.tags && item.tags.includes(tag)
          );
        } else {
          return this.state.tags.some(tag => 
            item.tags && item.tags.includes(tag)
          );
        }
      });
    }
    
    // Apply rating filters
    this.filteredData = this.filteredData.filter(item => {
      if (!item.rating || item.rating.length < 6) return false;
      
      const rating = item.rating;
      const filters = this.state.ratingFilters;
      
      // Check overall rating (index 0)
      if (rating[0] < filters.overall.min || rating[0] > filters.overall.max) {
        return false;
      }
      
      // Check individual ratings (indices 1-5)
      if (rating[1] < filters.scientific.min || rating[1] > filters.scientific.max) return false;
      if (rating[2] < filters.technical.min || rating[2] > filters.technical.max) return false;
      if (rating[3] < filters.cost.min || rating[3] > filters.cost.max) return false;
      if (rating[4] < filters.reliability.min || rating[4] > filters.reliability.max) return false;
      if (rating[5] < filters.design.min || rating[5] > filters.design.max) return false;
      
      return true;
    });
    
    // Apply price filters (products only)
    if (window.location.pathname.includes('/products/')) {
      this.filteredData = this.filteredData.filter(item => {
        if (item.price === null || item.price === undefined) return true; // Include items without price
        
        const price = parseFloat(item.price);
        return price >= this.state.priceFilter.min && price <= this.state.priceFilter.max;
      });
    }
    
    // Re-sort filtered data
    this.sortData(this.state.sort);
    
    // Reset display and render
    this.resetDisplay();
    this.renderItems(0, this.displayedCount);
    this.updateResultCount();
    this.setupInfiniteScroll();
  }
  
  resetDisplay() {
    const grid = this.getGridElement();
    if (grid) {
      grid.innerHTML = '';
    }
    this.displayedCount = 90;
  }
  
  updateResultCount() {
    const resultCountElement = document.getElementById('result-count');
    if (!resultCountElement) return;
    
    // Show loading state if data is not yet loaded
    if (this.allData.length === 0) {
      resultCountElement.innerHTML = 'Loading...';
      return;
    }
    
    const totalCount = this.allData.length;
    const filteredCount = this.filteredData.length;
    const isCompaniesPage = window.location.pathname.includes('/companies/');
    
    // Check if any filters are active (tags, ratings, or price)
    const hasTagFilters = window.tagFilter && window.tagFilter.selectedTags.length > 0;
    const hasRatingFilters = window.ratingFilter && window.ratingFilter.hasActiveFilters();
    const hasPriceFilters = window.priceFilter && window.priceFilter.hasActiveFilters();
    const hasFilters = hasTagFilters || hasRatingFilters || hasPriceFilters;
    
    if (this.currentLanguage === 'ja') {
      if (isCompaniesPage) {
        if (hasFilters) {
          resultCountElement.innerHTML = `${totalCount}社中${filteredCount}社のレビューを表示中`;
        } else {
          resultCountElement.innerHTML = `${totalCount}社のレビューを掲載中`;
        }
      } else {
        if (hasFilters) {
          resultCountElement.innerHTML = `${totalCount}件中${filteredCount}件のレビューを表示中`;
        } else {
          resultCountElement.innerHTML = `${totalCount}件のレビューを掲載中`;
        }
      }
    } else {
      if (isCompaniesPage) {
        if (hasFilters) {
          resultCountElement.innerHTML = `Showing ${filteredCount} of ${totalCount} company reviews`;
        } else {
          resultCountElement.innerHTML = `Featuring ${totalCount} company reviews`;
        }
      } else {
        if (hasFilters) {
          resultCountElement.innerHTML = `Showing ${filteredCount} of ${totalCount} product reviews`;
        } else {
          resultCountElement.innerHTML = `Featuring ${totalCount} product reviews`;
        }
      }
    }
  }
  
  // Event listeners setup
  setupEventListeners() {
    // Sort dropdown event listener
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.handleSortChange(e.target.value);
      });
    }
    
    // Tag filter event listeners - delegate to existing TagFilterManager
    this.setupTagFilterListeners();
    
    // Keyboard navigation support
    this.setupKeyboardNavigation();
  }
  
  setupTagFilterListeners() {
    // Listen for changes in the existing TagFilterManager
    if (window.tagFilter) {
      // Infinite loop prevention flag
      let isProcessingFilter = false;
      
      // Replace applyFilters to integrate with infinite scroll
      window.tagFilter.applyFilters = () => {
        if (isProcessingFilter) return; // Prevent infinite loop
        
        isProcessingFilter = true;
        try {
          // Execute UI state updates only (skip data processing)
          window.tagFilter.updateUI();
          window.tagFilter.updateURL();
          // Then execute InfiniteScrollManager processing
          this.handleTagFilterChange();
        } finally {
          isProcessingFilter = false;
        }
      };
      
      // Completely replace updateResultCount
      window.tagFilter.updateResultCount = () => {
        this.updateResultCount();
      };
      
      // Replace displayItems with empty implementation
      window.tagFilter.displayItems = (items) => {
        // Do nothing - DOM operations are handled by InfiniteScrollManager
      };
    }
  }
  
  handleSortChange(sortType) {
    this.state.sort = sortType;
    this.sortData(sortType);
    this.resetDisplay();
    this.renderItems(0, this.displayedCount);
    this.updateResultCount();
    this.setupInfiniteScroll();
    
    // Announce change to screen reader
    const sortMessage = this.currentLanguage === 'ja' ? 
      `並び替えが${this.getSortDescription(sortType)}に変更されました` : 
      `Sorting changed to ${this.getSortDescription(sortType)}`;
    this.announceToScreenReader(sortMessage);
  }
  
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Enter key for tag filter buttons
      if (e.key === 'Enter' && e.target.classList.contains('tag-filter-button')) {
        e.preventDefault();
        e.target.click();
      }
      
      // Space key for tag filter buttons
      if (e.key === ' ' && e.target.classList.contains('tag-filter-button')) {
        e.preventDefault();
        e.target.click();
      }
    });
  }
  
  // Utility functions
  showErrorMessage(message) {
    const grid = this.getGridElement();
    if (grid) {
      const reloadText = this.currentLanguage === 'ja' ? '再読み込み' : 'Reload';
      grid.innerHTML = `
        <div class="error-message" role="alert">
          <p>${this.escapeHtml(message)}</p>
          <button onclick="location.reload()">${reloadText}</button>
        </div>
      `;
    }
  }
  
  escapeHtml(text) {
    // Decode HTML entities first, then escape for safe HTML insertion
    const decodedText = this.decodeHtmlEntities(text);
    const div = document.createElement('div');
    div.innerText = decodedText;
    return div.innerHTML;
  }
  
  decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }
  
  formatDate(dateString) {
    const date = new Date(dateString);
    
    if (this.currentLanguage === 'ja') {
      return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
  
  formatPrice(price) {
    if (price === null || price === undefined || isNaN(price)) {
      return 'N/A';
    }
    
    // Convert to number and format with commas
    const numPrice = Number(price);
    return numPrice.toLocaleString();
  }
  
  getCurrentLanguage() {
    const path = window.location.pathname;
    // Check for explicit language in URL first
    if (path.includes('/en/')) return 'en';
    if (path.includes('/ja/')) return 'ja';
    
    // Check for language in page metadata
    const langMeta = document.querySelector('meta[name="lang"]');
    if (langMeta) return langMeta.content;
    
    // Check for lang attribute on html element
    const htmlLang = document.documentElement.lang;
    if (htmlLang) return htmlLang;
    
    // Default fallback
    return 'ja';
  }
  
  getSortDescription(sortType) {
    if (this.currentLanguage === 'ja') {
      const descriptions = {
        'name-asc': 'アルファベット順（昇順）',
        'name-desc': 'アルファベット順（降順）',
        'date-asc': '更新日順（昇順）',
        'date-desc': '更新日順（降順）',
        'rating-asc': '総合評価順（昇順）',
        'rating-desc': '総合評価順（降順）'
      };
      return descriptions[sortType] || sortType;
    } else {
      const descriptions = {
        'name-asc': 'Alphabetical (A-Z)',
        'name-desc': 'Alphabetical (Z-A)',
        'date-asc': 'Date Updated (Oldest)',
        'date-desc': 'Date Updated (Newest)',
        'rating-asc': 'Overall Rating (Low to High)',
        'rating-desc': 'Overall Rating (High to Low)'
      };
      return descriptions[sortType] || sortType;
    }
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait for existing TagFilterManager to initialize first
  setTimeout(() => {
    window.infiniteScrollManager = new InfiniteScrollManager();
  }, 100);
}); 