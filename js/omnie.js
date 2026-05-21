/**
 * SYDESIGN — O Mnie
 * Obsługa liczników statystyk
 */

(function() {
  // 3. ODTRZYMYWANIE LICZNIKÓW (COUNT-UP STATS)
  function countUp(el, target, suffix, duration) {
    if (!el) return;
    let current = 0;
    const startTime = performance.now();
    
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Funkcja ułatwienia (Easing Out)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(easeProgress * target);
      
      el.textContent = current + (suffix || '');
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + (suffix || '');
      }
    }
    requestAnimationFrame(update);
  }

  // Obserwator statystyk
  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    const statsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statsObserver.disconnect(); // Animacja tylko raz
          
          setTimeout(() => countUp(document.getElementById('s1'), 120, '', 1400), 0);
          setTimeout(() => countUp(document.getElementById('s2'), 45, '', 1200), 100);
          setTimeout(() => countUp(document.getElementById('s3'), 5, '', 900), 200);
          setTimeout(() => countUp(document.getElementById('s4'), 100, '', 1100), 300);
        }
      });
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsSection);
  }
})();