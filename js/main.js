// CURSOR
(function() {
  var c = document.getElementById('cur');
  var r = document.getElementById('curRing');
  var mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; });
  function anim() {
    c.style.left = mx + 'px'; c.style.top = my + 'px';
    rx += (mx - rx) * .11; ry += (my - ry) * .11;
    r.style.left = rx + 'px'; r.style.top = ry + 'px';
    requestAnimationFrame(anim);
  }
  anim();
  document.querySelectorAll('a, button, .cat-tile').forEach(function(el) {
    el.addEventListener('mouseenter', function() { c.style.width='14px'; c.style.height='14px'; r.style.width='50px'; r.style.height='50px'; r.style.borderColor='var(--red)'; });
    el.addEventListener('mouseleave', function() { c.style.width='8px'; c.style.height='8px'; r.style.width='34px'; r.style.height='34px'; r.style.borderColor='rgba(215,0,15,.4)'; });
  });
})();

// REVEAL
var obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: .08 });
document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });

