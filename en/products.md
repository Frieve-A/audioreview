---
layout: default
title: Products
lang: en
permalink: /products/en/
---

<h1 class="page-title-with-search">Products (Coming soon) <span class="search-icon">🔍</span></h1>

{% assign all_products = site.products | where: 'lang', 'en' %}

<div class="products-grid">
  {% for product in all_products %}
    <div class="product-card">
      <h3><a href="{{ product.url }}">{{ product.target_name }}</a></h3>
      <div class="product-rating">
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