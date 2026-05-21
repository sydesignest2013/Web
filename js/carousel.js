// CAROUSEL LOGIC
(function() {
  var stage = document.getElementById('crStage');
  if (!stage) return;
  var cards = Array.from(stage.querySelectorAll('.cr-card'));
  var dotsWrap = document.getElementById('crDots');
  var thumbsWrap = document.getElementById('crThumbs');
  var thumbs = thumbsWrap ? Array.from(thumbsWrap.querySelectorAll('.cr-thumb')) : [];
  var countEl = document.getElementById('crCount');
  
  var n = cards.length;
  if(n === 0) return;
  var cur = 0;
  var busy = false;

  // Init dots
  if (dotsWrap) {
    cards.forEach(function(_, i) {
      var d = document.createElement('div');
      d.className = 'cr-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', function() { go(i); });
      dotsWrap.appendChild(d);
    });
  }

  // Init thumbs
  thumbs.forEach(function(t, i) {
    t.addEventListener('click', function() { go(i); });
  });

  function render() {
    cards.forEach(function(c, i) {
      var diff = i - cur;
      if (diff > n/2) diff -= n;
      if (diff < -n/2) diff += n;
      
      var pos = diff;
      if (Math.abs(diff) > 2) pos = 'far';
      c.setAttribute('data-pos', pos);
    });

    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach(function(d, i) {
        d.classList.toggle('active', i === cur);
      });
    }

    thumbs.forEach(function(t, i) {
      t.classList.toggle('active', i === cur);
    });

    if (countEl) {
      countEl.textContent = (cur + 1) + ' / ' + n;
    }
  }

  function go(idx) {
    if (busy) return;
    busy = true;
    cur = ((idx % n) + n) % n;
    render();
    setTimeout(function() { busy = false; }, 720);
  }

  var btnNext = document.getElementById('crNext');
  var btnPrev = document.getElementById('crPrev');
  if (btnNext) btnNext.addEventListener('click', function() { go(cur + 1); });
  if (btnPrev) btnPrev.addEventListener('click', function() { go(cur - 1); });

  stage.addEventListener('click', function(e) {
    if (e.target.closest('.cr-label-btn')) return;
    var card = e.target.closest('.cr-card');
    if (!card) return;
    var p = parseInt(card.getAttribute('data-pos') || '0');
    if (p > 0) go(cur + 1);
    else if (p < 0) go(cur - 1);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') go(cur + 1);
    if (e.key === 'ArrowLeft') go(cur - 1);
  });

  var dragX = null;
  stage.addEventListener('mousedown', function(e) { dragX = e.clientX; stage.classList.add('dragging'); });
  window.addEventListener('mouseup', function(e) {
    if (dragX === null) return;
    var dx = e.clientX - dragX;
    stage.classList.remove('dragging');
    if (Math.abs(dx) > 50) go(dx < 0 ? cur + 1 : cur - 1);
    dragX = null;
  });

  // Reveal bg text
  setTimeout(function() {
    var bgText = document.querySelector('.cr-bg-text');
    if (bgText) bgText.classList.add('in');
  }, 500);

  render();
})();
