// AudioSpecs embed widget — position, auto-resize, and show iframe on successful load

// Move widget to after the Scientific Validity score
(function() {
  var widget = document.querySelector('.audiospecs-widget');
  if (!widget) return;
  var content = document.querySelector('.review-content');
  if (!content) return;
  var h2s = content.querySelectorAll('h2');
  // h2s[0] = Overview, h2s[1] = Scientific Validity
  if (h2s.length >= 2) {
    var scoreEl = h2s[1].nextElementSibling; // the score paragraph
    if (scoreEl) {
      scoreEl.after(widget);
    }
  }
})();

window.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'audiospecs-embed-resize') {
    var widget = document.querySelector('.audiospecs-widget');
    var iframe = widget && widget.querySelector('iframe');
    if (iframe) {
      if (e.data.height) {
        iframe.style.height = (e.data.height + 2) + 'px';
      }
      // Show widget on first successful postMessage (proves widget loaded)
      if (widget.style.display === 'none') {
        widget.style.display = '';
      }
    }
  }
});
