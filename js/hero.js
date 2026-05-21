// HERO SLIDER
(function() {
  var slides = Array.from(document.querySelectorAll('.hero-slide'));
  var dotsWrap = document.getElementById('heroDots');
  var cur = 0;

  slides.forEach(function(_, i) {
    var d = document.createElement('div');
    d.className = 'hero-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', function() { go(i); });
    dotsWrap.appendChild(d);
  });

  function go(idx) {
    slides[cur].classList.remove('visible');
    Array.from(dotsWrap.children)[cur].classList.remove('active');
    cur = idx;
    slides[cur].classList.add('visible');
    Array.from(dotsWrap.children)[cur].classList.add('active');
  }

  setInterval(function() { go((cur + 1) % slides.length); }, 5000);
})();