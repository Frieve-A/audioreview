// Move search buttons above reference section
document.addEventListener('DOMContentLoaded', function() {
  // Find the search buttons section
  const searchButtonsSection = document.querySelector('.search-buttons');
  
  if (!searchButtonsSection) {
    return; // No search buttons found
  }
  
  // Find the reference section (h2 with text containing "参考情報" or "Reference")
  const referenceHeading = Array.from(document.querySelectorAll('h2')).find(heading => {
    const text = heading.textContent.trim();
    return text === '参考情報' || text === 'References' || text.includes('参考情報') || text.includes('Reference');
  });
  
  if (!referenceHeading) {
    return; // No reference section found
  }
  
  // Insert the search buttons before the reference heading
  referenceHeading.parentElement.insertBefore(searchButtonsSection, referenceHeading);
  
  // Add some spacing
  searchButtonsSection.style.marginBottom = '30px';
  searchButtonsSection.style.marginTop = '30px';
});
