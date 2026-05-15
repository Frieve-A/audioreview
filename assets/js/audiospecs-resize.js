// AudioSpecs embed widget - position, auto-resize, and show iframe on successful load

document.addEventListener('DOMContentLoaded', function() {
  var widget = document.querySelector('.audiospecs-widget');
  if (!widget) return;

  var scientificSection = document.querySelector('.metric-section[data-metric-index="0"]');
  var metricHeading = scientificSection && scientificSection.querySelector('.metric-heading');
  if (metricHeading) {
    metricHeading.after(widget);
    return;
  }

  var content = document.querySelector('.review-content');
  if (!content) return;
  var h2s = content.querySelectorAll('h2');
  if (h2s.length >= 2) {
    var scoreEl = h2s[1].nextElementSibling;
    if (scoreEl) {
      scoreEl.after(widget);
    }
  }
});

window.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'audiospecs-embed-resize') {
    var widget = document.querySelector('.audiospecs-widget');
    var iframe = widget && widget.querySelector('iframe');
    if (iframe) {
      if (e.data.height) {
        iframe.style.height = (e.data.height + 2) + 'px';
      }
      if (widget.style.display === 'none') {
        widget.style.display = '';
      }
    }
  }
});
