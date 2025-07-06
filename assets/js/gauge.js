// Gauge chart initialization and animation
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all gauge charts
  const gaugeCharts = document.querySelectorAll('.gauge-chart');
  
  gaugeCharts.forEach(function(chart, index) {
    const score = parseFloat(chart.getAttribute('data-score'));
    const color = chart.getAttribute('data-color');
    
    // Calculate percentage based on whether it's overall rating or individual rating
    let percentage;
    if (chart.parentElement.classList.contains('overall-gauge')) {
      // Overall rating: 5.0 = 100%
      percentage = (score / 5.0) * 100;
    } else {
      // Individual ratings: 1.0 = 100%
      percentage = (score / 1.0) * 100;
    }
    
    // Get the gauge progress element
    const gaugeProgress = chart.querySelector('.gauge-progress');
    
    // Set the color
    gaugeProgress.setAttribute('stroke', color);
    
    // Get the actual path length
    const pathLength = gaugeProgress.getTotalLength();
    
    // Set initial state: no visible line
    gaugeProgress.style.strokeDasharray = `0 ${pathLength}`;
    
    // Trigger animation after a short delay for better visual effect
    setTimeout(function() {
      // Calculate visible length based on percentage
      const visibleLength = pathLength * (percentage / 100);
      // Set the final state
      gaugeProgress.style.strokeDasharray = `${visibleLength} ${pathLength}`;
    }, 200 + (index * 100)); // Stagger animations
  });
  
  // Intersection Observer for triggering animations when scrolling into view
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const chart = entry.target;
        const gaugeProgress = chart.querySelector('.gauge-progress');
        const score = parseFloat(chart.getAttribute('data-score'));
        
        // Calculate percentage based on whether it's overall rating or individual rating
        let percentage;
        if (chart.parentElement.classList.contains('overall-gauge')) {
          // Overall rating: 5.0 = 100%
          percentage = (score / 5.0) * 100;
        } else {
          // Individual ratings: 1.0 = 100%
          percentage = (score / 1.0) * 100;
        }
        
        // Get the actual path length
        const pathLength = gaugeProgress.getTotalLength();
        
        // Reset animation
        gaugeProgress.style.strokeDasharray = `0 ${pathLength}`;
        gaugeProgress.offsetHeight; // Trigger reflow
        
        setTimeout(function() {
          // Calculate visible length based on percentage
          const visibleLength = pathLength * (percentage / 100);
          // Set the final state
          gaugeProgress.style.strokeDasharray = `${visibleLength} ${pathLength}`;
        }, 100);
      }
    });
  }, {
    threshold: 0.5
  });
  
  // Observe all gauge charts
  gaugeCharts.forEach(function(chart) {
    observer.observe(chart);
  });
}); 