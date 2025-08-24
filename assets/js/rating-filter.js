/**
 * Rating Filter Manager
 * Handles rating-based filtering for companies and products pages
 */
class RatingFilterManager {
  constructor() {
    this.isExpanded = false;
    this.currentLanguage = window.siteLanguage || 'ja';
    this.strings = window.ratingFilterStrings || {};
    this.originalResultText = '';
    
    // Rating filter state
    this.ratingFilters = {
      overall: { min: 0, max: 5 },
      scientific: { min: 0, max: 1 },
      technical: { min: 0, max: 1 },
      cost: { min: 0, max: 1 },
      reliability: { min: 0, max: 1 },
      design: { min: 0, max: 1 }
    };
    
    this.init();
  }

  init() {
    // Only initialize on products pages
    if (!window.location.pathname.includes('/products/')) {
      return;
    }
    
    // Prevent image dragging
    this.preventImageDragging();
    
    const resultCountElement = document.getElementById('result-count');
    if (resultCountElement) {
      this.originalResultText = resultCountElement.innerHTML;
    }
    
    this.buildRatingFilter();
    this.bindEvents();
    this.loadStateFromURL();
  }

  preventImageDragging() {
    // Set draggable="false" on all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('draggable', 'false');
    });
  }

  buildRatingFilter() {
    const filterSection = document.getElementById('rating-filter-section');
    if (!filterSection) return;

    const labels = this.getLabels();
    const ratingRanges = this.getRatingRanges();

    filterSection.innerHTML = `
      <div class="rating-filter-toggle" id="rating-filter-toggle">
        <span>⭐ ${labels.filterTitle}</span>
        <span class="rating-filter-toggle-icon" id="rating-toggle-icon">▼</span>
      </div>
      
      <div class="rating-filter-panel" id="rating-filter-panel">
        <div class="rating-filter-content">
          <div class="rating-filters">
            ${this.buildRatingFiltersHtml(ratingRanges, labels)}
          </div>
          
          <div class="filter-actions">
            <button class="clear-rating-filters-btn" id="clear-rating-filters" style="display: none;">${labels.clearFilters}</button>
          </div>
        </div>
      </div>
    `;
  }

  getLabels() {
    return {
      filterTitle: this.strings.filterTitle || 'Filter by Rating',
      clearFilters: this.strings.clearFilters || 'Clear Filters',
      overall: this.strings.overall || 'Overall Rating',
      scientific: this.strings.scientific || 'Scientific Validity',
      technical: this.strings.technical || 'Technology Level',
      cost: this.strings.cost || 'Cost Performance',
      reliability: this.strings.reliability || 'Reliability & Support',
      design: this.strings.design || 'Design Rationality'
    };
  }

  getRatingRanges() {
    return {
      overall: { min: 0, max: 5, step: 0.1 },
      scientific: { min: 0, max: 1, step: 0.1 },
      technical: { min: 0, max: 1, step: 0.1 },
      cost: { min: 0, max: 1, step: 0.1 },
      reliability: { min: 0, max: 1, step: 0.1 },
      design: { min: 0, max: 1, step: 0.1 }
    };
  }

  buildRatingFiltersHtml(ratingRanges, labels) {
    const ratingTypes = [
      { key: 'overall', label: labels.overall },
      { key: 'scientific', label: labels.scientific },
      { key: 'technical', label: labels.technical },
      { key: 'cost', label: labels.cost },
      { key: 'reliability', label: labels.reliability },
      { key: 'design', label: labels.design }
    ];

    return ratingTypes.map(type => {
      const range = ratingRanges[type.key];
      const currentFilter = this.ratingFilters[type.key];
      
             return `
         <div class="rating-filter-item">
           <div class="rating-filter-label">${type.label}</div>
           <div class="drange" data-rating-type="${type.key}">
             <div class="track"></div>
             <input type="range" 
                    id="${type.key}-min" 
                    min="${range.min}" 
                    max="${range.max}" 
                    step="${range.step}" 
                    value="${currentFilter.min}"
                    data-rating-type="${type.key}"
                    data-bound="min">
             <input type="range" 
                    id="${type.key}-max" 
                    min="${range.min}" 
                    max="${range.max}" 
                    step="${range.step}" 
                    value="${currentFilter.max}"
                    data-rating-type="${type.key}"
                    data-bound="max">
             <div class="highlight" id="${type.key}-highlight"></div>
             <div class="dmin" id="${type.key}-dmin">-</div>
             <div class="dmax" id="${type.key}-dmax">-</div>
           </div>
         </div>
       `;
    }).join('');
  }

  bindEvents() {
    const toggleButton = document.getElementById('rating-filter-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.togglePanel());
    }

    // Rating slider events
    document.addEventListener('input', (e) => {
      if (e.target.matches('input[type="range"][data-rating-type]')) {
        this.handleRatingSliderChange(e.target);
      }
    });

    // Clear button
    const clearButton = document.getElementById('clear-rating-filters');
    if (clearButton) {
      clearButton.addEventListener('click', () => this.clearAllFilters());
    }

    window.addEventListener('popstate', () => this.loadStateFromURL());
    window.addEventListener('resize', () => {
      if (this.isExpanded) {
        this.adjustPanelHeight();
      }
    });
  }

  handleRatingSliderChange(slider) {
    const ratingType = slider.dataset.ratingType;
    const bound = slider.dataset.bound;
    const value = parseFloat(slider.value);
    
    // Update filter state
    this.ratingFilters[ratingType][bound] = value;
    
    // Handle min/max crossing
    if (bound === 'min' && value > this.ratingFilters[ratingType].max) {
      this.ratingFilters[ratingType].max = value;
      const maxSlider = document.getElementById(`${ratingType}-max`);
      if (maxSlider) maxSlider.value = value;
    } else if (bound === 'max' && value < this.ratingFilters[ratingType].min) {
      this.ratingFilters[ratingType].min = value;
      const minSlider = document.getElementById(`${ratingType}-min`);
      if (minSlider) minSlider.value = value;
    }
    
    this.updateSliderUI(ratingType);
    this.applyFiltersAndUI();
  }

  updateSliderUI(ratingType) {
    const minSlider = document.getElementById(`${ratingType}-min`);
    const maxSlider = document.getElementById(`${ratingType}-max`);
    const highlight = document.getElementById(`${ratingType}-highlight`);
    const dmin = document.getElementById(`${ratingType}-dmin`);
    const dmax = document.getElementById(`${ratingType}-dmax`);
    const drange = minSlider?.closest('.drange');
    
    if (!minSlider || !maxSlider || !highlight || !dmin || !dmax || !drange) return;

    const rangeWidth = drange.getBoundingClientRect().width;
    const sliderMin = parseFloat(minSlider.min);
    const sliderMax = parseFloat(maxSlider.max);
    const sliderRange = sliderMax - sliderMin;
    const minVal = parseFloat(minSlider.value);
    const maxVal = parseFloat(maxSlider.value);
    
    // Calculate thumb width (20px as defined in CSS)
    const thumbWidth = 20;
    const thumbRadius = thumbWidth / 2;
    
    // Calculate thumb center positions directly
    // The slider thumb center position is based on the slider value
    // We need to account for the thumb radius in the calculation
    const minThumbCenter = (minVal - sliderMin) / sliderRange * (rangeWidth - thumbWidth) + thumbRadius;
    const maxThumbCenter = (maxVal - sliderMin) / sliderRange * (rangeWidth - thumbWidth) + thumbRadius;
    
    // Calculate highlight positions ensuring they stay within the track bounds
    // The highlight should start from the min thumb center and end at the max thumb center
    const leftPos = Math.max(0, Math.min(rangeWidth, minThumbCenter));
    const rightPos = Math.max(0, Math.min(rangeWidth, maxThumbCenter));
    const highlightWidth = Math.max(0, rightPos - leftPos);
    
    highlight.style.left = `${leftPos}px`;
    highlight.style.width = `${highlightWidth}px`;
    
    // Update labels
    dmin.textContent = (minVal === sliderMin) ? '-' : minVal.toFixed(1);
    dmax.textContent = (maxVal === sliderMax) ? '-' : maxVal.toFixed(1);
  }

  togglePanel() {
    this.isExpanded = !this.isExpanded;
    const panel = document.getElementById('rating-filter-panel');
    const icon = document.getElementById('rating-toggle-icon');
    
    if (!panel || !icon) return;

    if (this.isExpanded) {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      icon.textContent = '▲';
      panel.classList.add('expanded');
    } else {
      panel.style.maxHeight = '0';
      icon.textContent = '▼';
      panel.classList.remove('expanded');
    }
  }

  expandPanel() {
    if (this.isExpanded) return;
    this.isExpanded = true;
    const panel = document.getElementById('rating-filter-panel');
    const icon = document.getElementById('rating-toggle-icon');
    
    if (!panel || !icon) return;
    
    panel.style.maxHeight = panel.scrollHeight + 'px';
    icon.textContent = '▲';
    panel.classList.add('expanded');
  }

  adjustPanelHeight() {
    const panel = document.getElementById('rating-filter-panel');
    if (!panel || !this.isExpanded) return;
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }

  clearAllFilters() {
    const ratingRanges = this.getRatingRanges();
    Object.keys(ratingRanges).forEach(ratingType => {
      const range = ratingRanges[ratingType];
      this.ratingFilters[ratingType] = { min: range.min, max: range.max };
      
      const minSlider = document.getElementById(`${ratingType}-min`);
      const maxSlider = document.getElementById(`${ratingType}-max`);
      if (minSlider) minSlider.value = range.min;
      if (maxSlider) maxSlider.value = range.max;
      
      this.updateSliderUI(ratingType);
    });
    
    this.applyFiltersAndUI();
  }

  applyFiltersAndUI() {
    this.updateUI();
    this.updateURL();
    
    // Trigger InfiniteScrollManager filtering if available
    if (window.infiniteScrollManager) {
      window.infiniteScrollManager.handleRatingFilterChange();
    }
  }

  updateUI() {
    const clearButton = document.getElementById('clear-rating-filters');
    const hasActiveFilters = this.hasActiveFilters();
    
    if (clearButton) {
      clearButton.style.display = hasActiveFilters ? 'inline-block' : 'none';
    }

    // Update all slider UIs
    Object.keys(this.ratingFilters).forEach(ratingType => {
      this.updateSliderUI(ratingType);
    });

    if (this.isExpanded) {
      setTimeout(() => this.adjustPanelHeight(), 50);
    }
  }

  hasActiveFilters() {
    const ratingRanges = this.getRatingRanges();
    return Object.keys(ratingRanges).some(ratingType => {
      const range = ratingRanges[ratingType];
      const filter = this.ratingFilters[ratingType];
      return filter.min > range.min || filter.max < range.max;
    });
  }

  updateURL() {
    const url = new URL(window.location);
    const hasActiveFilters = this.hasActiveFilters();
    
    if (hasActiveFilters) {
      Object.keys(this.ratingFilters).forEach(ratingType => {
        const filter = this.ratingFilters[ratingType];
        const range = this.getRatingRanges()[ratingType];
        
        if (filter.min > range.min) {
          url.searchParams.set(`${ratingType}_min`, filter.min.toFixed(1));
        } else {
          url.searchParams.delete(`${ratingType}_min`);
        }
        
        if (filter.max < range.max) {
          url.searchParams.set(`${ratingType}_max`, filter.max.toFixed(1));
        } else {
          url.searchParams.delete(`${ratingType}_max`);
        }
      });
    } else {
      // Remove all rating parameters
      Object.keys(this.ratingFilters).forEach(ratingType => {
        url.searchParams.delete(`${ratingType}_min`);
        url.searchParams.delete(`${ratingType}_max`);
      });
    }
    
    history.replaceState({}, '', url.toString());
  }

  loadStateFromURL() {
    const url = new URL(window.location);
    const ratingRanges = this.getRatingRanges();
    
    Object.keys(ratingRanges).forEach(ratingType => {
      const range = ratingRanges[ratingType];
      const minParam = url.searchParams.get(`${ratingType}_min`);
      const maxParam = url.searchParams.get(`${ratingType}_max`);
      
      this.ratingFilters[ratingType] = {
        min: minParam ? parseFloat(minParam) : range.min,
        max: maxParam ? parseFloat(maxParam) : range.max
      };
      
      // Update sliders
      const minSlider = document.getElementById(`${ratingType}-min`);
      const maxSlider = document.getElementById(`${ratingType}-max`);
      if (minSlider) minSlider.value = this.ratingFilters[ratingType].min;
      if (maxSlider) maxSlider.value = this.ratingFilters[ratingType].max;
    });
    
    if (this.hasActiveFilters()) {
      this.expandPanel();
    }
    
    this.updateUI();
    
    // Notify InfiniteScrollManager about the state change if it exists
    if (window.infiniteScrollManager && this.hasActiveFilters()) {
      window.infiniteScrollManager.handleRatingFilterChange();
    }
  }

  // Method to get current filter state for InfiniteScrollManager
  getFilterState() {
    return { ...this.ratingFilters };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.ratingFilter = new RatingFilterManager();
});
