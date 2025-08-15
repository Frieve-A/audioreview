// Price formatter for 3-digit comma separation
document.addEventListener('DOMContentLoaded', function() {
  const priceElements = document.querySelectorAll('.price-number');
  
  priceElements.forEach(function(element) {
    const price = parseInt(element.getAttribute('data-price'));
    if (!isNaN(price)) {
      element.textContent = price.toLocaleString();
    }
  });
});
