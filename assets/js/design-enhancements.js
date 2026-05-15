(function() {
  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  function slugify(text, index) {
    var slug = String(text || '')
      .trim()
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return slug || ('section-' + (index + 1));
  }

  function extractScore(element) {
    if (!element) return null;
    var text = element.textContent || element.nodeValue || '';
    var texMatch = text.match(/\\text\{\s*([0-9]+(?:\.[0-9]+)?)\s*\}/);
    if (texMatch) return parseFloat(texMatch[1]);
    var plain = text.trim().match(/^([0-9]+(?:\.[0-9]+)?)$/);
    return plain ? parseFloat(plain[1]) : null;
  }

  function nextMeaningfulNode(node) {
    var current = node && node.nextSibling;
    while (current) {
      if (current.nodeType === Node.TEXT_NODE && current.nodeValue.trim() === '') {
        current = current.nextSibling;
        continue;
      }
      return current;
    }
    return null;
  }

  function removeScoreNode(node) {
    if (!node) return;
    var previous = node.previousSibling;
    var next = node.nextSibling;
    node.parentNode.removeChild(node);
    if (previous && previous.nodeType === Node.TEXT_NODE && previous.nodeValue.trim() === '') {
      previous.parentNode.removeChild(previous);
    }
    if (next && next.nodeType === Node.TEXT_NODE && next.nodeValue.trim() === '') {
      next.parentNode.removeChild(next);
    }
  }

  function createScoreMeter(metric, score) {
    var value = typeof score === 'number' && !isNaN(score) ? score : Number(metric.score || 0);
    var meter = document.createElement('div');
    meter.className = 'metric-score';
    meter.style.setProperty('--score-width', Math.max(0, Math.min(100, value * 100)) + '%');
    meter.style.setProperty('--score-color', metric.color || '#087f4d');

    var strong = document.createElement('strong');
    strong.textContent = value.toFixed(1);
    var bar = document.createElement('span');
    bar.setAttribute('aria-hidden', 'true');
    var scale = document.createElement('small');
    scale.textContent = (metric.label || '') + ' / 1.0';

    meter.appendChild(strong);
    meter.appendChild(bar);
    meter.appendChild(scale);
    return meter;
  }

  function enhanceMetricSections() {
    var data = window.reviewDesignData;
    if (!data || !Array.isArray(data.metrics) || !data.metrics.length) return;

    var content = document.querySelector('.review-page .review-content');
    if (!content || content.classList.contains('metric-enhanced')) return;

    var headings = Array.prototype.filter.call(content.querySelectorAll('h2'), function(heading) {
      return !heading.closest('.audiospecs-widget');
    });

    if (headings.length < 2) return;

    data.metrics.forEach(function(metric, metricIndex) {
      var heading = headings[metricIndex + 1];
      if (!heading || heading.closest('.metric-section')) return;

      var section = document.createElement('section');
      section.className = 'metric-section metric-' + metric.key;
      section.dataset.metricIndex = String(metricIndex);
      heading.parentNode.insertBefore(section, heading);

      var nextHeading = headings[metricIndex + 2] || null;
      var node = heading;
      while (node && node !== nextHeading) {
        var next = node.nextSibling;
        section.appendChild(node);
        node = next;
      }

      var scoreCandidate = nextMeaningfulNode(heading);
      var score = extractScore(scoreCandidate);
      if (scoreCandidate && score !== null) {
        removeScoreNode(scoreCandidate);
      }

      var headingRow = document.createElement('div');
      headingRow.className = 'metric-heading';
      section.insertBefore(headingRow, section.firstChild);
      headingRow.appendChild(heading);
      headingRow.appendChild(createScoreMeter(metric, score));
    });

    content.classList.add('metric-enhanced');
  }

  function buildTocFor(tocSelector, contentSelector) {
    var toc = document.querySelector(tocSelector);
    var content = document.querySelector(contentSelector);
    if (!toc || !content) return;

    var headings = Array.prototype.filter.call(content.querySelectorAll('h2, h3'), function(heading) {
      return !heading.closest('.audiospecs-widget');
    });

    toc.innerHTML = '';
    var currentParent = null;

    headings.forEach(function(heading, index) {
      if (!heading.id) {
        heading.id = slugify(heading.textContent, index);
      }

      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent.trim();
      link.className = heading.tagName === 'H3' ? 'toc-depth-2' : 'toc-depth-1';
      item.appendChild(link);

      if (heading.tagName === 'H3' && currentParent) {
        var nested = currentParent.querySelector('ol');
        if (!nested) {
          nested = document.createElement('ol');
          currentParent.appendChild(nested);
        }
        nested.appendChild(item);
        return;
      }

      toc.appendChild(item);
      currentParent = item;
    });

    var card = toc.closest('.toc-card');
    if (card) {
      card.hidden = headings.length === 0;
    }
  }

  function buildToc() {
    buildTocFor('#review-toc', '.review-page .review-content');
    buildTocFor('#about-toc', '.about-page .about-content');
  }

  function markReferences() {
    var content = document.querySelector('.review-page .review-content');
    if (!content) return;

    var headings = Array.prototype.slice.call(content.querySelectorAll('h2'));
    var referencesHeading = headings.find(function(heading) {
      var text = heading.textContent.trim();
      return /references?/i.test(text) || text.indexOf('参考') !== -1 || text.indexOf('出典') !== -1;
    });
    if (!referencesHeading) return;

    referencesHeading.classList.add('references-heading');
    var list = referencesHeading.nextElementSibling;
    if (list && (list.tagName === 'OL' || list.tagName === 'UL')) {
      list.classList.add('references');
    }
  }

  function wireMobileSearch() {
    var searchToggle = document.getElementById('search-toggle');
    Array.prototype.forEach.call(document.querySelectorAll('.mobile-search-toggle'), function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        var details = link.closest('details');
        if (details) details.open = false;
        if (searchToggle) searchToggle.click();
      });
    });
  }

  onReady(function() {
    enhanceMetricSections();
    buildToc();
    markReferences();
    wireMobileSearch();
  });
})();
