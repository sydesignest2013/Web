// NAV HIDE + DROPDOWN
window.toggleNav = function() { document.getElementById('navWrap').classList.toggle('open'); };
document.addEventListener('click', function(e) {
  var w = document.getElementById('navWrap');
  if (w && !w.contains(e.target)) w.classList.remove('open');
});

// SCROLL REVEAL — image and text alternate
var pairs = [
  { img: document.getElementById('img1'), txt: document.getElementById('txt1'), ps: document.getElementById('ps1') },
  { img: document.getElementById('img2'), txt: document.getElementById('txt2'), ps: document.getElementById('ps2') },
  { img: document.getElementById('img3'), txt: document.getElementById('txt3'), ps: document.getElementById('ps3') },
];

var spineFill = document.getElementById('spineFill');
var processEl = document.querySelector('.process');

function onScroll() {
  pairs.forEach(function(pair, i) {
    if (!pair.img || !pair.txt || !pair.ps) return;
    var rect = pair.img.getBoundingClientRect();
    var visible = rect.top < window.innerHeight * .78;
    if (visible) {
      pair.img.classList.add('in');
      pair.txt.classList.add('in');
      pair.ps.classList.add('in-node');
    }
  });

  // Spine fill based on scroll progress through process section
  if (processEl && spineFill) {
    var pr = processEl.getBoundingClientRect();
    var winH = window.innerHeight;
    var total = processEl.offsetHeight;
    var scrolled = winH - pr.top;
    var pct = Math.max(0, Math.min(100, (scrolled / (total + winH)) * 150));
    spineFill.style.height = pct + '%';
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // init
