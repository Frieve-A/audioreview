---
layout: default
title: Companies
lang: en
permalink: /companies/en/
---

<h1 class="page-title-with-search">Companies <span class="search-icon">🔍</span></h1>

{% assign all_companies = site.companies | where: 'lang', 'en' | sort: 'target_name' %}

<div class="home-grid">
  {% for company in all_companies %}
    <div class="company-card">
      <h3><a href="{{ company.url }}">{{ company.target_name }}</a></h3>
      <div class="company-rating">
        <span class="rating-value">
          {% if company.rating and company.rating.size > 0 %}
            {{ company.rating[0] }}
          {% else %}
            N/A
          {% endif %}
        </span>
        <span class="rating-stars">★</span>
      </div>
      <p class="company-summary">{{ company.summary }}</p>
      <time class="company-date" datetime="{{ company.date | date: '%Y-%m-%d' }}">
        {{ company.date | date: '%B %d, %Y' }}
      </time>
    </div>
  {% endfor %}
</div>

{% if all_companies.size == 0 %}
  <p class="no-products">No company reviews available yet.</p>
{% endif %}