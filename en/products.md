---
layout: default
title: Products
lang: en
permalink: /products/en/
---

<div class="page-header-with-sort">
  <h1 class="page-title-with-search">Products (Coming soon) <span class="search-icon">🔍</span></h1>
  <div class="sort-controls">
    <label for="sort-select">Sort by:</label>
    <select id="sort-select" class="sort-dropdown">
      <option value="name-asc">Alphabetical (A-Z)</option>
      <option value="name-desc">Alphabetical (Z-A)</option>
      <option value="date-asc">Date Updated (Oldest)</option>
      <option value="date-desc">Date Updated (Newest)</option>
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
</div>

{% assign all_products = site.products | where: 'lang', 'en' %}
<p class="review-count">{{ all_products.size }} product reviews available</p>

<div class="products-grid" id="products-grid">
  {% for product in all_products %}
    <div class="product-card" 
         data-overall="{{ product.rating[0] | default: 0 }}"
         data-scientific="{{ product.rating[1] | default: 0 }}"
         data-technical="{{ product.rating[2] | default: 0 }}"
         data-cost="{{ product.rating[3] | default: 0 }}"
         data-reliability="{{ product.rating[4] | default: 0 }}"
         data-design="{{ product.rating[5] | default: 0 }}">
      <h3><a href="{{ product.url }}">{{ product.target_name }}</a></h3>
      <div class="product-rating">
        <span class="rating-label" id="rating-label">Overall Rating</span>
        <span class="rating-value">
          {% if product.rating and product.rating.size > 0 %}
            {{ product.rating[0] }}
          {% else %}
            N/A
          {% endif %}
        </span>
        <span class="rating-stars">★</span>
      </div>
      <p class="product-summary">{{ product.summary }}</p>
      <time class="product-date" datetime="{{ product.date | date: '%Y-%m-%d' }}">
        {{ product.date | date: '%B %d, %Y' }}
      </time>
      
      {% assign parent_company = site.companies | where: 'company_id', product.company_id | where: 'lang', 'en' | first %}
      {% if parent_company %}
        <p class="product-company">Company: <a href="{{ parent_company.url }}">{{ parent_company.target_name }}</a></p>
      {% endif %}
    </div>
  {% endfor %}
</div>

{% if all_products.size == 0 %}
  <p class="no-products">No product reviews available yet.</p>
{% endif %}