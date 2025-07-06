---
layout: default
title: 企業一覧
lang: ja
permalink: /companies/ja/
---

<div class="page-header-with-sort">
  <h1 class="page-title-with-search">企業一覧 <span class="search-icon">🔍</span></h1>
  <div class="sort-controls">
    <label for="sort-select">並び替え:</label>
    <select id="sort-select" class="sort-dropdown">
      <option value="name-asc">アルファベット順（昇順）</option>
      <option value="name-desc">アルファベット順（降順）</option>
      <option value="date-asc">更新日順（昇順）</option>
      <option value="date-desc">更新日順（降順）</option>
      <option value="rating-asc">総合評価順（昇順）</option>
      <option value="rating-desc">総合評価順（降順）</option>
      <option value="scientific-asc">科学的有効性順（昇順）</option>
      <option value="scientific-desc">科学的有効性順（降順）</option>
      <option value="technical-asc">技術レベル順（昇順）</option>
      <option value="technical-desc">技術レベル順（降順）</option>
      <option value="cost-asc">コストパフォーマンス順（昇順）</option>
      <option value="cost-desc">コストパフォーマンス順（降順）</option>
      <option value="reliability-asc">信頼性・サポート順（昇順）</option>
      <option value="reliability-desc">信頼性・サポート順（降順）</option>
      <option value="design-asc">設計思想の合理性順（昇順）</option>
      <option value="design-desc">設計思想の合理性順（降順）</option>
    </select>
  </div>
</div>

{% assign all_companies = site.companies | where: 'lang', 'ja' | sort: 'target_name' %}
<p class="review-count">{{ all_companies.size }}社の企業レビューを掲載中</p>

<div class="home-grid" id="companies-grid">
  {% for company in all_companies %}
    <div class="company-card" 
         data-overall="{{ company.rating[0] | default: 0 }}"
         data-scientific="{{ company.rating[1] | default: 0 }}"
         data-technical="{{ company.rating[2] | default: 0 }}"
         data-cost="{{ company.rating[3] | default: 0 }}"
         data-reliability="{{ company.rating[4] | default: 0 }}"
         data-design="{{ company.rating[5] | default: 0 }}">
      <h3><a href="{{ company.url }}">{{ company.target_name }}</a></h3>
      <div class="company-rating">
        <span class="rating-label" id="rating-label">総合評価</span>
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
        {{ company.date | date: '%Y年%m月%d日' }}
      </time>
    </div>
  {% endfor %}
</div>

{% if all_companies.size == 0 %}
  <p class="no-products">現在、企業レビューはありません。</p>
{% endif %}