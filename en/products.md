---
layout: default
title: Products
lang: en
permalink: /products/en/
---

<section class="listing-page">
  <div class="section-heading listing-heading">
    <div>
      <h1>{{ site.data.strings.en.products }}</h1>
      <p>{{ site.data.strings.en.content_hint }}</p>
    </div>
    <span class="review-count" id="result-count">Loading...</span>
  </div>

  <div class="sort-controls">
    <label for="sort-select">{{ site.data.strings.en.sort_by }}</label>
    <select id="sort-select" class="sort-dropdown">
      <option value="name-asc">Alphabetical (A-Z)</option>
      <option value="name-desc">Alphabetical (Z-A)</option>
      <option value="date-asc">Date Updated (Oldest)</option>
      <option value="date-desc" selected>Date Updated (Newest)</option>
      <option value="rating-asc">Overall Rating (Low to High)</option>
      <option value="rating-desc">Overall Rating (High to Low)</option>
      <option value="scientific-asc">Scientific Validity (Low to High)</option>
      <option value="scientific-desc">Scientific Validity (High to Low)</option>
      <option value="technical-asc">Technical Level (Low to High)</option>
      <option value="technical-desc">Technical Level (High to Low)</option>
      <option value="cost-asc">Cost Performance (Low to High)</option>
      <option value="cost-desc">Cost Performance (High to Low)</option>
      <option value="reliability-asc">Reliability & Support (Low to High)</option>
      <option value="reliability-desc">Reliability & Support (High to Low)</option>
      <option value="design-asc">Design Philosophy (Low to High)</option>
      <option value="design-desc">Design Philosophy (High to Low)</option>
    </select>
  </div>

  <div class="tag-filter-section" id="tag-filter-section"></div>
  <div class="rating-filter-section" id="rating-filter-section"></div>
  <div class="price-filter-section" id="price-filter-section"></div>
  <div class="spec-filter-section" id="spec-filter-section"></div>

  <div class="catalog-grid products-grid" id="products-grid"></div>

  {% if all_products.size == 0 %}
    <p class="no-products">{{ site.data.strings.en.no_product_reviews }}</p>
  {% endif %}
</section>
