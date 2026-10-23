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

// gallery slideshows
document.querySelectorAll('.slideshow').forEach(function (ss) {
  var main = ss.querySelector('.ss-main'), thumbs = Array.prototype.slice.call(ss.querySelectorAll('.ss-thumb')), i = 0;
  function go(k) {
    i = (k + thumbs.length) % thumbs.length;
    thumbs.forEach(function (t, n) { t.classList.toggle('is-active', n === i); });
    main.classList.add('is-loading');
    main.onload = function () { main.classList.remove('is-loading'); };
    main.src = thumbs[i].dataset.full;
    var t = thumbs[i], strip = t.parentElement;
    strip.scrollLeft = t.offsetLeft - strip.clientWidth / 2 + t.clientWidth / 2;
  }
  thumbs.forEach(function (t, n) { t.addEventListener('click', function () { go(n); }); });
  ss.querySelector('.ss-prev').addEventListener('click', function () { go(i - 1); });
  ss.querySelector('.ss-next').addEventListener('click', function () { go(i + 1); });
  ss.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') go(i - 1); if (e.key === 'ArrowRight') go(i + 1); });
});
