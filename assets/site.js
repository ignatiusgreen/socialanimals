(function () {
  // mobile menu
  var t = document.querySelector('.menu-toggle'), n = document.getElementById('site-nav');
  if (t && n) t.addEventListener('click', function () {
    var o = n.classList.toggle('open'); t.setAttribute('aria-expanded', o);
  });

  // homepage slideshow
  var slides = document.querySelectorAll('.slide');
  if (slides.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('is-on'); i = (i + 1) % slides.length; slides[i].classList.add('is-on');
    }, 5000);
  }

  // lightbox for image groups
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a.lb');
    if (!a) return;
    e.preventDefault();
    var group = Array.prototype.slice.call(a.parentElement.querySelectorAll('a.lb'));
    var idx = group.indexOf(a);
    var box = document.createElement('div');
    box.className = 'lightbox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<img alt=""><button class="lb-close" aria-label="Close">×</button>' +
      (group.length > 1 ? '<button class="lb-prev" aria-label="Previous">‹</button><button class="lb-next" aria-label="Next">›</button>' : '');
    var img = box.querySelector('img');
    function show(k) { idx = (k + group.length) % group.length; img.src = group[idx].href; }
    function close() { box.remove(); document.removeEventListener('keydown', key); a.focus(); }
    function key(ev) {
      if (ev.key === 'Escape') close();
      if (ev.key === 'ArrowRight') show(idx + 1);
      if (ev.key === 'ArrowLeft') show(idx - 1);
    }
    box.addEventListener('click', function (ev) {
      if (ev.target.classList.contains('lb-next')) show(idx + 1);
      else if (ev.target.classList.contains('lb-prev')) show(idx - 1);
      else if (ev.target !== img) close();
    });
    document.addEventListener('keydown', key);
    document.body.appendChild(box); show(idx); box.querySelector('.lb-close').focus();
  });
})();
