// NAV
var lastY = 0;
var nav = document.getElementById('mainNav');
window.addEventListener('scroll', function() {
  var y = window.scrollY;
  nav.style.transform = (y > lastY && y > 80) ? 'translateY(-100%)' : 'translateY(0)';
  lastY = y;
});

function toggleProj() {
  document.getElementById('projLi').classList.toggle('open');
}
document.addEventListener('click', function(e) {
  var li = document.getElementById('projLi');
  if (li && !li.contains(e.target)) li.classList.remove('open');
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('projLi').classList.remove('open');
    closeMob();
  }
});

// MOBILE MENU
function toggleMob() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobMenu').classList.toggle('open');
  document.getElementById('mobOverlay').classList.toggle('open');
  document.body.style.overflow = document.getElementById('mobMenu').classList.contains('open') ? 'hidden' : '';
}
function closeMob() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobMenu').classList.remove('open');
  document.getElementById('mobOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function toggleMobSub() {
  document.getElementById('mobProjBtn').classList.toggle('open');
  document.getElementById('mobSub').classList.toggle('open');
}