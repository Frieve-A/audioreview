/**
 * Price Filter Manager
 * Handles price-based filtering for products pages only
 */
class PriceFilterManager {
     constructor() {
     this.isExpanded = false;
     this.currentLanguage = window.siteLanguage || 'ja';
     this.strings = window.priceFilterStrings || {};
     this.originalResultText = '';
     
     // Price filter state (logarithmic scale) - language dependent
     const maxPrice = this.currentLanguage === 'en' ? 1000000 : 100000000; // 1M USD or 1億円
     this.priceFilter = { min: 0, max: maxPrice };
     
     // Logarithmic scale points (1, 2, 5 for each digit)
     this.logScale = this.generateLogScale();
     
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
    
    this.buildPriceFilter();
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

     generateLogScale() {
     const scale = [];
     
     // Add 0
     scale.push(0);
     
     // Determine max value based on language
     const maxPrice = this.currentLanguage === 'en' ? 1000000 : 100000000;
     
     // Generate logarithmic scale: 1, 2, 5 for each digit
     for (let digit = 0; digit <= 8; digit++) {
       const base = Math.pow(10, digit);
       
       // Add values only if they don't exceed maxPrice
       if (base * 1 <= maxPrice) scale.push(base * 1);
       if (base * 2 <= maxPrice) scale.push(base * 2);
       if (base * 5 <= maxPrice) scale.push(base * 5);
     }
     
     // Ensure maxPrice is the last value
     if (scale[scale.length - 1] !== maxPrice) {
       scale.push(maxPrice);
     }
     
     return scale;
   }

  buildPriceFilter() {
    const filterSection = document.getElementById('price-filter-section');
    if (!filterSection) return;

    const labels = this.getLabels();

    filterSection.innerHTML = `
      <div class="price-filter-toggle" id="price-filter-toggle">
        <span>💰 ${labels.filterTitle}</span>
        <span class="price-filter-toggle-icon" id="price-toggle-icon">▼</span>
      </div>
      
      <div class="price-filter-panel" id="price-filter-panel">
        <div class="price-filter-content">
                     <div class="price-filter-item">
             <div class="price-filter-label">${labels.priceRange}</div>
             <div class="drange" data-rating-type="price">
               <div class="track"></div>
               <input type="range" 
                      id="price-min" 
                      min="0" 
                      max="${this.logScale.length - 1}" 
                      step="1" 
                      value="0"
                      data-rating-type="price"
                      data-bound="min">
               <input type="range" 
                      id="price-max" 
                      min="0" 
                      max="${this.logScale.length - 1}" 
                      step="1" 
                      value="${this.logScale.length - 1}"
                      data-rating-type="price"
                      data-bound="max">
               <div class="highlight" id="price-highlight"></div>
               <div class="dmin" id="price-dmin">-</div>
               <div class="dmax" id="price-dmax">-</div>
             </div>
           </div>
          
          <div class="filter-actions">
            <button class="clear-price-filters-btn" id="clear-price-filters" style="display: none;">${labels.clearFilters}</button>
          </div>
        </div>
      </div>
    `;
  }

  getLabels() {
    return {
      filterTitle: this.strings.filterTitle || 'Filter by Price',
      priceRange: this.strings.priceRange || 'Price Range',
      clearFilters: this.strings.clearFilters || 'Clear Filters'
    };
  }

  bindEvents() {
    const toggleButton = document.getElementById('price-filter-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.togglePanel());
    }

    // Price slider events
    document.addEventListener('input', (e) => {
      if (e.target.matches('input[type="range"]#price-min, input[type="range"]#price-max')) {
        this.handlePriceSliderChange(e.target);
      }
    });

    // Clear button
    const clearButton = document.getElementById('clear-price-filters');
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

  handlePriceSliderChange(slider) {
    const bound = slider.dataset.bound;
    const index = parseInt(slider.value);
    const value = this.logScale[index];
    
    // Update filter state
    this.priceFilter[bound] = value;
    
    // Handle min/max crossing
    if (bound === 'min' && value > this.priceFilter.max) {
      this.priceFilter.max = value;
      const maxSlider = document.getElementById('price-max');
      if (maxSlider) {
        const maxIndex = this.logScale.indexOf(value);
        maxSlider.value = maxIndex;
      }
    } else if (bound === 'max' && value < this.priceFilter.min) {
      this.priceFilter.min = value;
      const minSlider = document.getElementById('price-min');
      if (minSlider) {
        const minIndex = this.logScale.indexOf(value);
        minSlider.value = minIndex;
      }
    }
    
    this.updateSliderUI();
    this.applyFiltersAndUI();
  }

     updateSliderUI() {
     const minSlider = document.getElementById('price-min');
     const maxSlider = document.getElementById('price-max');
     const highlight = document.getElementById('price-highlight');
     const dmin = document.getElementById('price-dmin');
     const dmax = document.getElementById('price-dmax');
     const drange = minSlider?.closest('.drange');
     
     if (!minSlider || !maxSlider || !highlight || !dmin || !dmax || !drange) return;

     const rangeWidth = drange.getBoundingClientRect().width;
     const sliderMin = parseInt(minSlider.min);
     const sliderMax = parseInt(maxSlider.max);
     const sliderRange = sliderMax - sliderMin;
     const minIndex = parseInt(minSlider.value);
     const maxIndex = parseInt(maxSlider.value);
     
     // Calculate thumb width (20px as defined in CSS)
     const thumbWidth = 20;
     const thumbRadius = thumbWidth / 2;
     
     // Calculate thumb center positions directly
     // The slider thumb center position is based on the slider value
     // We need to account for the thumb radius in the calculation
     const minThumbCenter = (minIndex - sliderMin) / sliderRange * (rangeWidth - thumbWidth) + thumbRadius;
     const maxThumbCenter = (maxIndex - sliderMin) / sliderRange * (rangeWidth - thumbWidth) + thumbRadius;
     
     // Calculate highlight positions ensuring they stay within the track bounds
     // The highlight should start from the min thumb center and end at the max thumb center
     const leftPos = Math.max(0, Math.min(rangeWidth, minThumbCenter));
     const rightPos = Math.max(0, Math.min(rangeWidth, maxThumbCenter));
     const highlightWidth = Math.max(0, rightPos - leftPos);
     
     highlight.style.left = `${leftPos}px`;
     highlight.style.width = `${highlightWidth}px`;
     
     // Update labels with formatted prices
     const minValue = this.logScale[minIndex];
     const maxValue = this.logScale[maxIndex];
     const maxPrice = this.currentLanguage === 'en' ? 1000000 : 100000000;
     
     dmin.textContent = (minValue === 0) ? '-' : this.formatPrice(minValue);
     dmax.textContent = (maxValue === maxPrice) ? '-' : this.formatPrice(maxValue);
   }

     formatPrice(price) {
     if (this.currentLanguage === 'ja') {
       // Japanese: Use comma-separated numbers
       return price.toLocaleString('ja-JP');
     } else {
       // English: Use K, M format
       if (price >= 1000000) {
         return `${(price / 1000000).toFixed(1)}M`;
       } else if (price >= 1000) {
         return `${(price / 1000).toFixed(0)}K`;
       } else {
         return price.toString();
       }
     }
   }

  togglePanel() {
    this.isExpanded = !this.isExpanded;
    const panel = document.getElementById('price-filter-panel');
    const icon = document.getElementById('price-toggle-icon');
    
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
    const panel = document.getElementById('price-filter-panel');
    const icon = document.getElementById('price-toggle-icon');
    
    if (!panel || !icon) return;
    
    panel.style.maxHeight = panel.scrollHeight + 'px';
    icon.textContent = '▲';
    panel.classList.add('expanded');
  }

  adjustPanelHeight() {
    const panel = document.getElementById('price-filter-panel');
    if (!panel || !this.isExpanded) return;
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }

     clearAllFilters() {
     const maxPrice = this.currentLanguage === 'en' ? 1000000 : 100000000;
     this.priceFilter = { min: 0, max: maxPrice };
     
     const minSlider = document.getElementById('price-min');
     const maxSlider = document.getElementById('price-max');
     if (minSlider) minSlider.value = 0;
     if (maxSlider) maxSlider.value = this.logScale.length - 1;
     
     this.updateSliderUI();
     this.applyFiltersAndUI();
   }

  applyFiltersAndUI() {
    this.updateUI();
    this.updateURL();
    
    // Trigger InfiniteScrollManager filtering if available
    if (window.infiniteScrollManager) {
      window.infiniteScrollManager.handlePriceFilterChange();
    }
  }

  updateUI() {
    const clearButton = document.getElementById('clear-price-filters');
    const hasActiveFilters = this.hasActiveFilters();
    
    if (clearButton) {
      clearButton.style.display = hasActiveFilters ? 'inline-block' : 'none';
    }

    this.updateSliderUI();

    if (this.isExpanded) {
      setTimeout(() => this.adjustPanelHeight(), 50);
    }
  }

     hasActiveFilters() {
     const maxPrice = this.currentLanguage === 'en' ? 1000000 : 100000000;
     return this.priceFilter.min > 0 || this.priceFilter.max < maxPrice;
   }

     updateURL() {
     const url = new URL(window.location);
     const hasActiveFilters = this.hasActiveFilters();
     const maxPrice = this.currentLanguage === 'en' ? 1000000 : 100000000;
     
     if (hasActiveFilters) {
       if (this.priceFilter.min > 0) {
         url.searchParams.set('price_min', this.priceFilter.min.toString());
       } else {
         url.searchParams.delete('price_min');
       }
       
       if (this.priceFilter.max < maxPrice) {
         url.searchParams.set('price_max', this.priceFilter.max.toString());
       } else {
         url.searchParams.delete('price_max');
       }
     } else {
       url.searchParams.delete('price_min');
       url.searchParams.delete('price_max');
     }
     
     history.replaceState({}, '', url.toString());
   }

     loadStateFromURL() {
     const url = new URL(window.location);
     const minParam = url.searchParams.get('price_min');
     const maxParam = url.searchParams.get('price_max');
     const maxPrice = this.currentLanguage === 'en' ? 1000000 : 100000000;
     
     this.priceFilter = {
       min: minParam ? parseInt(minParam) : 0,
       max: maxParam ? parseInt(maxParam) : maxPrice
     };
     
     // Update sliders
     const minSlider = document.getElementById('price-min');
     const maxSlider = document.getElementById('price-max');
     
     if (minSlider) {
       const minIndex = this.logScale.findIndex(price => price >= this.priceFilter.min);
       minSlider.value = minIndex >= 0 ? minIndex : 0;
     }
     
     if (maxSlider) {
       const maxIndex = this.logScale.findIndex(price => price >= this.priceFilter.max);
       maxSlider.value = maxIndex >= 0 ? maxIndex : this.logScale.length - 1;
     }
     
     if (this.hasActiveFilters()) {
       this.expandPanel();
     }
     
     this.updateUI();
     
     // Notify InfiniteScrollManager about the state change if it exists
     if (window.infiniteScrollManager && this.hasActiveFilters()) {
       window.infiniteScrollManager.handlePriceFilterChange();
     }
   }

  // Method to get current filter state for InfiniteScrollManager
  getFilterState() {
    return { ...this.priceFilter };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.priceFilter = new PriceFilterManager();
});
