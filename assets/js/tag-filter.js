/**
 * Tag Filter Manager
 * Handles collapsible tag filtering for listing pages.
 */
class TagFilterManager {
  constructor() {
    this.isExpanded = false;
    this.selectedTags = [];
    this.searchMode = 'and';
    this.allTags = new Set();
    this.tagCategories = {};
    this.currentLanguage = window.siteLanguage || 'ja';
    this.strings = window.tagFilterStrings || {};
    this.categoryRules = window.TagUtils.getCategoryRules(this.currentLanguage);

    this.init();
  }

  init() {
    if (!window.location.pathname.includes('/products/') && !window.location.pathname.includes('/companies/')) {
      return;
    }

    this.preventImageDragging();
    this.generateTagCategories();
    this.buildTagFilter();
    this.bindEvents();
    this.loadStateFromURL();
  }

  preventImageDragging() {
    document.querySelectorAll('img').forEach((img) => {
      img.setAttribute('draggable', 'false');
    });
  }

  updateData(newData) {
    newData.forEach((item) => {
      (item.tags || []).forEach((tag) => this.allTags.add(tag));
    });
    this.generateTagCategories();
  }

  getCategory(tag) {
    if (window.TagUtils && window.TagUtils.getCategory) {
      return window.TagUtils.getCategory(tag, this.currentLanguage);
    }

    for (const category in this.categoryRules) {
      if (this.categoryRules[category].test(tag)) {
        return category;
      }
    }
    return 'other';
  }

  generateTagCategories() {
    this.tagCategories = {};
    Object.keys(this.categoryRules).forEach((key) => {
      this.tagCategories[key] = { tags: [] };
    });
    this.tagCategories.other = { tags: [] };

    this.allTags.forEach((tag) => {
      this.tagCategories[this.getCategory(tag)].tags.push(tag);
    });

    Object.keys(this.tagCategories).forEach((categoryKey) => {
      if (this.tagCategories[categoryKey].tags.length === 0) {
        delete this.tagCategories[categoryKey];
      }
    });
  }

  getCategoryName(categoryKey) {
    const categoryMappings = {
      region: 'region',
      productType: 'productCategory',
      technology: 'technologyFeatures',
      purpose: 'purpose',
      other: 'other'
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
        <span>${labels.filterTitle}</span>
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
        <span class="tag-filter-toggle-icon" id="toggle-icon">+</span>
      </div>

      <div class="tag-filter-panel" id="tag-filter-panel">
        <div class="tag-filter-content">
          <div class="tag-categories">${categoriesHtml}</div>
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
    if (window.infiniteScrollManager && window.infiniteScrollManager.allData) {
      const tagCounts = {};
      window.infiniteScrollManager.allData.forEach((item) => {
        (item.tags || []).forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });
      return tagCounts;
    }
    return {};
  }

  buildCategoriesHtml(tagCounts) {
    const categoryOrder = ['productType', 'technology', 'purpose', 'region', 'other'];

    return categoryOrder
      .filter((categoryKey) => this.tagCategories[categoryKey])
      .map((categoryKey) => {
        const category = this.tagCategories[categoryKey];
        const categoryName = this.getCategoryName(categoryKey);
        const relevantTags = category.tags.filter((tag) => tagCounts[tag] > 0);

        if (relevantTags.length === 0) return '';

        const sortedTags = relevantTags.sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0));
        const visibleTags = sortedTags.slice(0, 6);
        const hiddenTags = sortedTags.slice(6);

        const createTagHtml = (tag) => {
          const id = `tag-${encodeURIComponent(tag).replace(/%/g, '')}`;
          return `
            <div class="tag-checkbox-item">
              <input type="checkbox" class="tag-checkbox" value="${this.escapeHtml(tag)}" id="${id}">
              <label class="tag-label" for="${id}">
                ${this.escapeHtml(tag)} <span class="tag-count">(${tagCounts[tag] || 0})</span>
              </label>
            </div>
          `;
        };

        const moreButton = hiddenTags.length > 0 ? `
          <div class="tag-more-section">
            <button class="tag-more-button" data-category="${categoryKey}">
              <span class="more-text">more... (+${hiddenTags.length})</span>
              <span class="less-text" style="display: none;">less...</span>
            </button>
            <div class="tag-hidden-list">${hiddenTags.map(createTagHtml).join('')}</div>
          </div>
        ` : '';

        return `
          <div class="tag-category">
            <h4>${categoryName}</h4>
            <div class="tag-checkbox-list">
              ${visibleTags.map(createTagHtml).join('')}
              ${moreButton}
            </div>
          </div>
        `;
      }).join('');
  }

  bindEvents() {
    if (this.eventsBound) {
      document.removeEventListener('click', this.boundDocumentClickHandler);
    }

    const toggleButton = document.getElementById('tag-filter-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', (event) => {
        if (!event.target.closest('#search-mode-toggle')) {
          this.togglePanel();
        }
      });
    }

    document.addEventListener('change', (event) => {
      if (event.target.classList.contains('tag-checkbox')) {
        this.handleTagSelection(event.target);
      } else if (event.target.name === 'search-mode') {
        this.handleSearchModeChange(event.target);
      }
    });

    this.boundDocumentClickHandler = (event) => {
      const moreButton = event.target.closest('.tag-more-button');
      if (moreButton) {
        this.handleMoreButtonClick(moreButton);
      }

      const removeButton = event.target.closest('.selected-tag-remove');
      if (removeButton) {
        this.removeTag(removeButton.dataset.tag);
      }
    };

    document.addEventListener('click', this.boundDocumentClickHandler);

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
      panel.style.maxHeight = `${panel.scrollHeight}px`;
      icon.textContent = '-';
      panel.classList.add('expanded');
      if (searchModeToggle && this.selectedTags.length > 0) {
        searchModeToggle.style.display = 'flex';
      }
    } else {
      panel.style.maxHeight = '0';
      icon.textContent = '+';
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

    panel.style.maxHeight = `${panel.scrollHeight}px`;
    icon.textContent = '-';
    panel.classList.add('expanded');
    if (searchModeToggle && this.selectedTags.length > 0) {
      searchModeToggle.style.display = 'flex';
    }
  }

  adjustPanelHeight() {
    const panel = document.getElementById('tag-filter-panel');
    if (!panel || !this.isExpanded) return;
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  }

  handleTagSelection(checkbox) {
    const tagValue = checkbox.value;
    if (checkbox.checked && !this.selectedTags.includes(tagValue)) {
      this.selectedTags.push(tagValue);
    } else if (!checkbox.checked) {
      this.selectedTags = this.selectedTags.filter((tag) => tag !== tagValue);
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

  clearAllFilters() {
    this.selectedTags = [];
    this.searchMode = 'and';
    document.querySelectorAll('.tag-checkbox').forEach((checkbox) => {
      checkbox.checked = false;
    });

    const andRadio = document.querySelector('input[name="search-mode"][value="and"]');
    if (andRadio) andRadio.checked = true;
    this.applyFiltersAndUI();
  }

  applyFiltersAndUI() {
    this.updateUI();
    this.updateURL();
    if (window.infiniteScrollManager) {
      window.infiniteScrollManager.handleTagFilterChange();
    }
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

    if (this.isExpanded) {
      setTimeout(() => this.adjustPanelHeight(), 50);
    }
  }

  renderSelectedTags() {
    const container = document.getElementById('selected-tag-list');
    if (!container) return;

    container.innerHTML = this.selectedTags.map((tag) => `
      <span class="selected-tag">
        ${this.escapeHtml(tag)}
        <button class="selected-tag-remove" data-tag="${this.escapeHtml(tag)}" aria-label="Remove ${this.escapeHtml(tag)}">x</button>
      </span>
    `).join('');
  }

  removeTag(tag) {
    this.selectedTags = this.selectedTags.filter((selectedTag) => selectedTag !== tag);
    const checkbox = document.querySelector(`input.tag-checkbox[value="${CSS.escape(tag)}"]`);
    if (checkbox) {
      checkbox.checked = false;
    }
    this.applyFiltersAndUI();
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

    this.searchMode = modeParam === 'or' ? 'or' : 'and';
    const radioButton = document.querySelector(`input[name="search-mode"][value="${this.searchMode}"]`);
    if (radioButton) radioButton.checked = true;

    this.selectedTags = tagsParam ? tagsParam.split(',').map((tag) => tag.trim()).filter(Boolean) : [];
    document.querySelectorAll('.tag-checkbox').forEach((checkbox) => {
      checkbox.checked = this.selectedTags.includes(checkbox.value);
    });

    if (this.selectedTags.length > 0) {
      this.expandPanel();
    }

    this.updateUI();
    if (window.infiniteScrollManager && this.selectedTags.length > 0) {
      window.infiniteScrollManager.handleTagFilterChange();
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = String(text || '');
    return div.innerHTML;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.tagFilter = new TagFilterManager();
});
