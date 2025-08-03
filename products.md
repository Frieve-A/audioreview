---
layout: default
title: Products
permalink: /products/
---

<script>
// Browser language detection and redirect
const userLang = navigator.language || navigator.userLanguage;
const lang = userLang.toLowerCase().startsWith('ja') ? 'ja' : 'en';
window.location.href = `/products/${lang}/`;
</script>

# Products / 製品一覧

Redirecting to your language preference...