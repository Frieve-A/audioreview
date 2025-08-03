class CategoryTagsManager {
  constructor() {
    this.currentLanguage = window.siteLanguage || 'ja';
    this.init();
  }

  init() {
    this.buildCategoryTags();
  }

  buildCategoryTags() {
    const grid = document.getElementById('category-tags-grid');
    if (!grid) return;

    // Use common product type tags
    const productTypeTags = window.TagUtils.getProductTypeTags(this.currentLanguage);
    
    if (productTypeTags.length === 0) {
      grid.innerHTML = '<p class="no-categories">No product categories available.</p>';
      return;
    }

    const tagsHtml = productTypeTags
      .map(tag => this.createTagLink(tag))
      .join('');

    grid.innerHTML = `
      <div class="category-tags">
        ${tagsHtml}
      </div>
    `;
  }

  createTagLink(tag) {
    const currentLang = this.currentLanguage;
    const url = `/products/${currentLang}/?tags=${encodeURIComponent(tag)}`;
    return `<a href="${url}" class="category-tag-link">${tag}</a>`;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  new CategoryTagsManager();
}); 