---
layout: default
title: 企業レビュー
lang: ja
permalink: /companies/ja/
---

<section class="listing-page">
  <div class="section-heading listing-heading">
    <div>
      <h1>{{ site.data.strings.ja.companies }}</h1>
      <p>{{ site.data.strings.ja.content_hint }}</p>
    </div>
    <span class="review-count" id="result-count">Loading...</span>
  </div>

  <div class="sort-controls">
    <label for="sort-select">{{ site.data.strings.ja.sort_by }}</label>
    <select id="sort-select" class="sort-dropdown">
      <option value="name-asc">名前順（昇順）</option>
      <option value="name-desc">名前順（降順）</option>
      <option value="date-asc">更新日（古い順）</option>
      <option value="date-desc" selected>更新日（新しい順）</option>
      <option value="rating-asc">総合評価（低い順）</option>
      <option value="rating-desc">総合評価（高い順）</option>
      <option value="scientific-asc">科学的妥当性（低い順）</option>
      <option value="scientific-desc">科学的妥当性（高い順）</option>
      <option value="technical-asc">技術水準（低い順）</option>
      <option value="technical-desc">技術水準（高い順）</option>
      <option value="cost-asc">コストパフォーマンス（低い順）</option>
      <option value="cost-desc">コストパフォーマンス（高い順）</option>
      <option value="reliability-asc">信頼性・サポート（低い順）</option>
      <option value="reliability-desc">信頼性・サポート（高い順）</option>
      <option value="design-asc">設計思想の合理性（低い順）</option>
      <option value="design-desc">設計思想の合理性（高い順）</option>
    </select>
  </div>

  <div class="tag-filter-section" id="tag-filter-section"></div>
  <div class="rating-filter-section" id="rating-filter-section"></div>

  <div class="catalog-grid products-grid" id="companies-grid"></div>

  {% if all_companies.size == 0 %}
    <p class="no-products">{{ site.data.strings.ja.no_company_reviews }}</p>
  {% endif %}
</section>
