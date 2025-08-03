/**
 * Tag Filter Manager
 * Handles collapsible tag filtering for companies and products pages
 */


/**
 * Tag Filter Manager
 * Handles collapsible tag filtering for companies and products pages
 */
class TagFilterManager {
  constructor() {
    this.isExpanded = false;
    this.selectedTags = [];
    this.searchMode = 'and'; // 'and' or 'or'
    this.allItems = [];
    this.filteredItems = [];
    this.allTags = new Set();
    this.tagCategories = {};
    this.currentLanguage = window.siteLanguage || 'ja';
    this.strings = window.tagFilterStrings || {};
    this.originalResultText = '';
    
    // Use common tag rules
    this.categoryRules = window.TagUtils.getCategoryRules(this.currentLanguage);

    this.init();
  }

  init() {
    const resultCountElement = document.getElementById('result-count');
    if (resultCountElement) {
      this.originalResultText = resultCountElement.innerHTML;
    }
    this.loadAllItems();
    this.generateTagCategories();
    this.buildTagFilter();
    this.bindEvents();
    this.loadStateFromURL();
  }

  loadAllItems() {
    const grid = document.getElementById('companies-grid') || document.getElementById('products-grid');
    if (grid) {
      this.allItems = Array.from(grid.children).map(card => {
        const tags = this.extractTagsFromCard(card);
        tags.forEach(tag => this.allTags.add(tag));
        return { element: card, tags: tags };
      });
    }
  }

  // Add this method to support new data source from JSON
  updateData(newData) {
    this.allItems = newData.map(item => {
      const tags = item.tags || [];
      tags.forEach(tag => this.allTags.add(tag));
      return { 
        element: null, // Will be created dynamically
        tags: tags,
        data: item // Store original data
      };
    });
    
    // Regenerate tag categories with new data
    this.generateTagCategories();
  }

  extractTagsFromCard(card) {
    const tagData = card.dataset.tags;
    return tagData ? [...new Set(tagData.split(',').map(tag => tag.trim()).filter(tag => tag))] : [];
  }

  getCategory(tag) {
    // Use common tag utils if available, otherwise fallback to local logic
    if (window.TagUtils && window.TagUtils.getCategory) {
      return window.TagUtils.getCategory(tag, this.currentLanguage);
    }
    
    // Fallback logic for when TagUtils is not available
    for (const category in this.categoryRules) {
      if (this.categoryRules[category].test(tag)) {
        return category;
      }
    }
    
    // Special cases that don't fit regex well
    if (tag.endsWith('BA') || tag.endsWith('DD')) return 'technology';
    if (tag.includes('Channel') || tag.includes('チャンネル')) return 'technology';
    if (tag.match(/^\d+in\d+out$/)) return 'technology'; // For 18in20out, 2in2out

    return 'other';
  }

  generateTagCategories() {
      // Initialize categories
      Object.keys(this.categoryRules).forEach(key => {
          this.tagCategories[key] = { tags: [] };
      });
      this.tagCategories['other'] = { tags: [] };

      // Categorize all unique tags
      this.allTags.forEach(tag => {
          const categoryKey = this.getCategory(tag);
          this.tagCategories[categoryKey].tags.push(tag);
      });

      // Remove empty categories
      Object.keys(this.tagCategories).forEach(categoryKey => {
          if (this.tagCategories[categoryKey].tags.length === 0) {
              delete this.tagCategories[categoryKey];
          }
      });
  }

  getCategoryName(categoryKey) {
    const categoryMappings = {
      'region': 'region',
      'productType': 'productCategory',
      'technology': 'technologyFeatures',
      'purpose': 'purpose',
      'other': 'other'
    };
    const mappedKey = categoryMappings[categoryKey];
    return this.strings[mappedKey] || categoryKey;
  }

  buildTagFilter() {
    const filterSection = document.getElementById('tag-filter-section');
    if (!filterSection) return;

    const tagCounts = this.calculateTagCounts();
    const categoriesHtml = this.buildCategoriesHtml(tagCounts);
    
    const labels = this.getLabels();

    filterSection.innerHTML = `
      <div class="tag-filter-toggle" id="tag-filter-toggle">
        <span>🏷️ ${labels.filterTitle}</span>
        <div class="search-mode-toggle" id="search-mode-toggle" style="display: none;">
          <label class="search-mode-radio">
            <input type="radio" name="search-mode" value="and" checked>
            <span>AND</span>
          </label>
          <label class="search-mode-radio">
            <input type="radio" name="search-mode" value="or">
            <span>OR</span>
          </label>
        </div>
        <span class="tag-filter-toggle-icon" id="toggle-icon">▼</span>
      </div>
      
      <div class="tag-filter-panel" id="tag-filter-panel">
        <div class="tag-filter-content">
          <div class="tag-categories">
            ${categoriesHtml}
          </div>
          
          <div class="selected-tags" id="selected-tags" style="display: none;">
            <h5>${labels.selectedTags}</h5>
            <div class="selected-tag-list" id="selected-tag-list"></div>
          </div>
          
          <div class="filter-actions">
            <button class="clear-filters-btn" id="clear-filters" style="display: none;">${labels.clearFilters}</button>
          </div>
        </div>
      </div>
    `;
  }
  
  getLabels() {
    return {
      filterTitle: this.strings.filterTitle || 'Filter by Tags',
      selectedTags: this.strings.selectedTags || 'Selected Tags:',
      clearFilters: this.strings.clearFilters || 'Clear Filters'
    };
  }

  calculateTagCounts() {
    const tagCounts = {};
    this.allItems.forEach(item => {
      item.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return tagCounts;
  }

  buildCategoriesHtml(tagCounts) {
    // Define the desired order: productType, technology, purpose, region, other
    const categoryOrder = ['productType', 'technology', 'purpose', 'region', 'other'];
    
    return categoryOrder
      .filter(categoryKey => this.tagCategories[categoryKey])
      .map(categoryKey => {
        const category = this.tagCategories[categoryKey];
        const categoryName = this.getCategoryName(categoryKey);
        const relevantTags = category.tags.filter(tag => tagCounts[tag] > 0);
        
        if (relevantTags.length === 0) return '';

        const sortedTags = relevantTags.sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0));
        const visibleTags = sortedTags.slice(0, 6);
        const hiddenTags = sortedTags.slice(6);

        const createTagHtml = (tag) => `
          <div class="tag-checkbox-item">
            <input type="checkbox" class="tag-checkbox" value="${tag}" id="tag-${tag.replace(/[\s/]/g, '-')}">
            <label class="tag-label" for="tag-${tag.replace(/[\s/]/g, '-')}">
              ${tag} <span class="tag-count">(${tagCounts[tag] || 0})</span>
            </label>
          </div>
        `;

        const visibleTagsHtml = visibleTags.map(createTagHtml).join('');
        const hiddenTagsHtml = hiddenTags.map(createTagHtml).join('');

        const moreButton = hiddenTags.length > 0 ? `
          <div class="tag-more-section">
            <button class="tag-more-button" data-category="${categoryKey}">
              <span class="more-text">more... (+${hiddenTags.length})</span>
              <span class="less-text" style="display: none;">less...</span>
            </button>
            <div class="tag-hidden-list">
              ${hiddenTagsHtml}
            </div>
          </div>
        ` : '';

        return `
          <div class="tag-category">
            <h4>${categoryName}</h4>
            <div class="tag-checkbox-list">
              ${visibleTagsHtml}
              ${moreButton}
            </div>
          </div>
        `;
      }).join('');
  }

  bindEvents() {
    // Remove existing event listeners to prevent duplication
    if (this.eventsBound) {
      // Remove existing document click listener
      document.removeEventListener('click', this._boundDocumentClickHandler);
    }
    
    const toggleButton = document.getElementById('tag-filter-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', (e) => {
        if (!e.target.closest('#search-mode-toggle')) {
          this.togglePanel();
        }
      });
    }

    document.addEventListener('change', (e) => {
      if (e.target.classList.contains('tag-checkbox')) {
        this.handleTagSelection(e.target);
      } else if (e.target.name === 'search-mode') {
        this.handleSearchModeChange(e.target);
      }
    });

    // Store the bound handler for removal
    this._boundDocumentClickHandler = (e) => {
      const moreButton = e.target.closest('.tag-more-button');
      if (moreButton) {
        this.handleMoreButtonClick(moreButton);
      }
      const removeButton = e.target.closest('.selected-tag-remove');
      if (removeButton) {
        this.removeTag(removeButton.dataset.tag);
      }
    };
    
    document.addEventListener('click', this._boundDocumentClickHandler);

    const clearButton = document.getElementById('clear-filters');
    if (clearButton) {
      clearButton.addEventListener('click', () => this.clearAllFilters());
    }

    window.addEventListener('popstate', () => this.loadStateFromURL());
    window.addEventListener('resize', () => {
      if (this.isExpanded) {
        this.adjustPanelHeight();
      }
    });
    
    this.eventsBound = true;
  }

  togglePanel() {
    this.isExpanded = !this.isExpanded;
    const panel = document.getElementById('tag-filter-panel');
    const icon = document.getElementById('toggle-icon');
    const searchModeToggle = document.getElementById('search-mode-toggle');
    
    if (!panel || !icon) return;

    if (this.isExpanded) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      icon.textContent = '▲';
      panel.classList.add('expanded');
      if (searchModeToggle && this.selectedTags.length > 0) {
        searchModeToggle.style.display = 'flex';
      }
    } else {
      panel.style.maxHeight = '0';
      icon.textContent = '▼';
      panel.classList.remove('expanded');
      if (searchModeToggle) {
        searchModeToggle.style.display = 'none';
      }
    }
  }

  expandPanel() {
    if (this.isExpanded) return;
    this.isExpanded = true;
    const panel = document.getElementById('tag-filter-panel');
    const icon = document.getElementById('toggle-icon');
    const searchModeToggle = document.getElementById('search-mode-toggle');
    
    if (!panel || !icon) return;
    
    panel.style.maxHeight = panel.scrollHeight + 'px';
    icon.textContent = '▲';
    panel.classList.add('expanded');
    if (searchModeToggle && this.selectedTags.length > 0) {
      searchModeToggle.style.display = 'flex';
    }
  }

  adjustPanelHeight() {
    const panel = document.getElementById('tag-filter-panel');
    if (!panel || !this.isExpanded) return;
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }

  handleTagSelection(checkbox) {
    const tagValue = checkbox.value;
    if (checkbox.checked) {
      // Prevent duplicate tags
      if (!this.selectedTags.includes(tagValue)) {
        this.selectedTags.push(tagValue);
      }
    } else {
      this.selectedTags = this.selectedTags.filter(tag => tag !== tagValue);
    }
    
    this.applyFiltersAndUI();
  }

  handleSearchModeChange(radio) {
    this.searchMode = radio.value;
    this.applyFiltersAndUI();
  }

  handleMoreButtonClick(button) {
    const moreSection = button.closest('.tag-more-section');
    const hiddenList = moreSection.querySelector('.tag-hidden-list');
    const moreText = button.querySelector('.more-text');
    const lessText = button.querySelector('.less-text');
    
    hiddenList.classList.toggle('show');
    moreText.style.display = hiddenList.classList.contains('show') ? 'none' : 'inline';
    lessText.style.display = hiddenList.classList.contains('show') ? 'inline' : 'none';
    
    setTimeout(() => this.adjustPanelHeight(), 350);
  }

  applyFilters() {
    if (this.selectedTags.length > 0) {
      this.filteredItems = this.allItems.filter(item => {
        if (this.searchMode === 'and') {
          return this.selectedTags.every(tag => item.tags.includes(tag));
        } else {
          return this.selectedTags.some(tag => item.tags.includes(tag));
        }
      });
      this.displayItems(this.filteredItems);
    } else {
      this.showAllItems();
    }
    this.updateResultCount();
  }

  showAllItems() {
    this.displayItems(this.allItems);
  }

  displayItems(items) {
    // Display is handled by InfiniteScrollManager in infinite scroll implementation
    // This method only manages UI state, so do nothing
  }

  clearAllFilters() {
    this.selectedTags = [];
    this.searchMode = 'and';
    document.querySelectorAll('.tag-checkbox').forEach(checkbox => {
      checkbox.checked = false;
    });
    const andRadio = document.querySelector('input[name="search-mode"][value="and"]');
    if (andRadio) andRadio.checked = true;
    
    this.applyFiltersAndUI();
  }

  applyFiltersAndUI() {
    this.applyFilters();
    this.updateUI();
    this.updateURL();
  }

  updateUI() {
    const selectedTagsDisplay = document.getElementById('selected-tags');
    const clearButton = document.getElementById('clear-filters');
    const searchModeToggle = document.getElementById('search-mode-toggle');
    
    const hasSelection = this.selectedTags.length > 0;
    if (selectedTagsDisplay) selectedTagsDisplay.style.display = hasSelection ? 'block' : 'none';
    if (clearButton) clearButton.style.display = hasSelection ? 'inline-block' : 'none';
    if (searchModeToggle) searchModeToggle.style.display = hasSelection && this.isExpanded ? 'flex' : 'none';

    if (hasSelection) {
      this.renderSelectedTags();
    }

    // Adjust panel height after UI updates are complete
    if (this.isExpanded) {
      setTimeout(() => this.adjustPanelHeight(), 50);
    }
  }

  renderSelectedTags() {
    const container = document.getElementById('selected-tag-list');
    if (!container) return;

    container.innerHTML = this.selectedTags.map(tag => `
      <span class="selected-tag">
        ${tag}
        <button class="selected-tag-remove" data-tag="${tag}">×</button>
      </span>
    `).join('');
  }

  removeTag(tag) {
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
    const checkbox = document.querySelector(`input.tag-checkbox[value="${CSS.escape(tag)}"]`);
    if (checkbox) {
      checkbox.checked = false;
    }
    this.applyFiltersAndUI();
  }

  updateResultCount() {
    const resultCountElement = document.getElementById('result-count');
    if (!resultCountElement) return;

    if (this.selectedTags.length > 0) {
      const totalCount = this.allItems.length;
      const filteredCount = this.filteredItems.length;
      const isCompanyPage = !!document.getElementById('companies-grid');

      if (this.currentLanguage === 'ja') {
        const unit = isCompanyPage ? '社' : '製品';
        resultCountElement.innerHTML = `${totalCount}${unit}中${filteredCount}${unit}のレビューを表示中`;
      } else {
        const unit_singular = isCompanyPage ? 'company review' : 'product review';
        const unit_plural = isCompanyPage ? 'company reviews' : 'product reviews';
        const totalUnit = totalCount === 1 ? unit_singular : unit_plural;
        resultCountElement.innerHTML = `Showing ${filteredCount} of ${totalCount} ${totalUnit}`;
      }
    } else {
      resultCountElement.innerHTML = this.originalResultText;
    }
  }

  updateURL() {
    const url = new URL(window.location);
    if (this.selectedTags.length > 0) {
      url.searchParams.set('tags', this.selectedTags.join(','));
      url.searchParams.set('mode', this.searchMode);
    } else {
      url.searchParams.delete('tags');
      url.searchParams.delete('mode');
    }
    history.replaceState({}, '', url.toString());
  }

  loadStateFromURL() {
    const url = new URL(window.location);
    const tagsParam = url.searchParams.get('tags');
    const modeParam = url.searchParams.get('mode');
    
    this.searchMode = (modeParam === 'or') ? 'or' : 'and';
    const radioButton = document.querySelector(`input[name="search-mode"][value="${this.searchMode}"]`);
    if (radioButton) radioButton.checked = true;
    
    this.selectedTags = tagsParam ? tagsParam.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
    
    document.querySelectorAll('.tag-checkbox').forEach(checkbox => {
      checkbox.checked = this.selectedTags.includes(checkbox.value);
    });
    
    if (this.selectedTags.length > 0) {
      this.applyFilters();
      this.expandPanel();
    } else {
      this.showAllItems();
    }
    
    this.updateUI();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.tagFilter = new TagFilterManager();
}); 