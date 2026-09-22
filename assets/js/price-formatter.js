// Price formatter for 3-digit comma separation
document.addEventListener('DOMContentLoaded', function() {
  const priceElements = document.querySelectorAll('.price-number');
  
  priceElements.forEach(function(element) {
    const price = Number(element.getAttribute('data-price'));
    if (Number.isFinite(price) && price > 0) {
      element.textContent = price.toLocaleString();
    } else {
      element.textContent = '-';
    }
  });
});
