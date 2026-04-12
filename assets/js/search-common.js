// Common search logic for both overlay search and search pages
class SearchCommon {
  // Decode HTML entities using a reusable textarea element
  static _decodeTextarea = null;
  static decodeHtmlEntities(text) {
    if (!SearchCommon._decodeTextarea) {
      SearchCommon._decodeTextarea = document.createElement('textarea');
    }
    SearchCommon._decodeTextarea.innerHTML = text;
    return SearchCommon._decodeTextarea.value;
  }

  // Pre-process search data: decode entities once and cache lowercase versions
  static prepareSearchIndex(searchData) {
    const allItems = [...searchData.companies, ...searchData.products];
    return allItems.map(item => {
      const title = SearchCommon.decodeHtmlEntities(item.title.toLowerCase());
      const summary = SearchCommon.decodeHtmlEntities(item.summary.toLowerCase());
      const tags = item.tags.map(tag => SearchCommon.decodeHtmlEntities(tag.toLowerCase()));
      return { ...item, _title: title, _summary: summary, _tags: tags };
    });
  }

  static searchItems(searchData, query) {
    const normalizedQuery = query.toLowerCase();
    const words = normalizedQuery.split(/\s+/).filter(w => w.length > 0);
    if (words.length === 0) return [];

    // Build word-boundary regexes once per search
    const wordRegexes = words.map(w => {
      const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`\\b${escaped}`, 'i');
    });

    // Use pre-built index if available, otherwise build on the fly
    const allItems = searchData._index || SearchCommon.prepareSearchIndex(searchData);

    const titleExactMatchResults = [];
    const summaryExactMatchResults = [];

    for (let i = 0; i < allItems.length; i++) {
      const item = allItems[i];
      const title = item._title;
      const summary = item._summary;
      const tags = item._tags;

      // Check all keywords present (inline for speed)
      let allMatch = true;
      for (let wi = 0; wi < words.length; wi++) {
        const w = words[wi];
        if (title.includes(w) || summary.includes(w) || tags.some(t => t.includes(w))) {
          continue;
        }
        allMatch = false;
        break;
      }
      if (!allMatch) continue;

      // Compute all match counts in a single pass over words
      let titleMatchCount = 0;
      let titleWordStartMatchCount = 0;
      let totalMatchCount = 0;
      let totalWordStartMatchCount = 0;

      for (let wi = 0; wi < words.length; wi++) {
        const w = words[wi];
        const re = wordRegexes[wi];
        const inTitle = title.includes(w);
        const inSummary = summary.includes(w);
        const inTags = tags.some(t => t.includes(w));

        if (inTitle) titleMatchCount++;
        if (inTitle || inSummary || inTags) totalMatchCount++;
        if (re.test(title)) titleWordStartMatchCount++;
        if (re.test(title) || re.test(summary) || tags.some(t => re.test(t))) totalWordStartMatchCount++;
      }

      const result = {
        ...item,
        titleMatchCount,
        titleWordStartMatchCount,
        totalMatchCount,
        totalWordStartMatchCount
      };

      if (titleMatchCount === totalMatchCount) {
        titleExactMatchResults.push(result);
      } else {
        summaryExactMatchResults.push(result);
      }
    }

    titleExactMatchResults.sort((a, b) => {
      if (b.titleWordStartMatchCount !== a.titleWordStartMatchCount) {
        return b.titleWordStartMatchCount - a.titleWordStartMatchCount;
      }
      if (b.titleMatchCount !== a.titleMatchCount) {
        return b.titleMatchCount - a.titleMatchCount;
      }
      return a.title.length - b.title.length;
    });

    summaryExactMatchResults.sort((a, b) => {
      if (b.totalWordStartMatchCount !== a.totalWordStartMatchCount) {
        return b.totalWordStartMatchCount - a.totalWordStartMatchCount;
      }
      if (b.totalMatchCount !== a.totalMatchCount) {
        return b.totalMatchCount - a.totalMatchCount;
      }
      return a.title.length - b.title.length;
    });

    return [...titleExactMatchResults, ...summaryExactMatchResults];
  }

  static containsWords(text, query) {
    const words = query.split(/\s+/);
    return words.some(word => text.includes(word));
  }

  static escapeHtml(text) {
    const div = document.createElement('div');
    div.innerHTML = text;
    const decodedText = div.textContent || div.innerText || '';
    div.textContent = decodedText;
    return div.innerHTML;
  }

  static getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.includes('/en/')) {
      return 'en';
    } else if (path.includes('/ja/')) {
      return 'ja';
    }
    return 'ja';
  }
}