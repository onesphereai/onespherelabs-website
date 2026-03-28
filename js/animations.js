document.addEventListener('DOMContentLoaded', function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll animations
  var animatedSelectors = '.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale';

  if (prefersReducedMotion) {
    document.querySelectorAll(animatedSelectors).forEach(function (el) {
      el.classList.add('visible');
    });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = parseInt(entry.target.getAttribute('data-delay'), 10) || 0;
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll(animatedSelectors).forEach(function (el) {
      observer.observe(el);
    });
  }

  // Navbar scroll state
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }, { passive: true });
  }

  // Floating vapor orbs in hero
  var heroEl = document.querySelector('.hero');
  if (heroEl && !prefersReducedMotion) {
    // Large vapor mist orbs
    for (var i = 0; i < 12; i++) {
      var orb = document.createElement('div');
      var size = Math.random() * 60 + 20;
      var isLarge = i < 4;
      if (isLarge) size = Math.random() * 100 + 50;
      var opacity = isLarge ? (Math.random() * 0.15 + 0.05) : (Math.random() * 0.25 + 0.1);
      var anim = isLarge ? 'floatUpSlow' : 'floatUp';
      var dur = Math.random() * 10 + 8;
      var blue = Math.floor(Math.random() * 80 + 120);
      var green = Math.floor(Math.random() * 60 + 150);
      orb.style.cssText = 'position:absolute;width:' + size + 'px;height:' + size + 'px;background:radial-gradient(circle,rgba(' + green + ',' + blue + ',255,' + opacity + ') 0%,transparent 70%);border-radius:50%;left:' + (Math.random() * 80 + 10) + '%;top:' + (Math.random() * 100) + '%;z-index:2;pointer-events:none;filter:blur(' + (size * 0.3) + 'px);animation:' + anim + ' ' + dur + 's linear infinite;animation-delay:' + (Math.random() * 10) + 's;';
      heroEl.appendChild(orb);
    }
    // Small sparkle particles near the beam
    for (var j = 0; j < 15; j++) {
      var spark = document.createElement('div');
      var sparkSize = Math.random() * 4 + 2;
      spark.style.cssText = 'position:absolute;width:' + sparkSize + 'px;height:' + sparkSize + 'px;background:rgba(200,220,255,' + (Math.random() * 0.6 + 0.3) + ');border-radius:50%;left:' + (Math.random() * 30 + 40) + '%;top:' + (Math.random() * 100) + '%;z-index:3;pointer-events:none;animation:floatUp ' + (Math.random() * 6 + 5) + 's linear infinite;animation-delay:' + (Math.random() * 6) + 's;';
      heroEl.appendChild(spark);
    }
  }
});
