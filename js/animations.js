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

  // Floating particles in hero
  var heroEl = document.querySelector('.hero');
  if (heroEl && !prefersReducedMotion) {
    for (var i = 0; i < 20; i++) {
      var particle = document.createElement('div');
      particle.style.cssText = 'position:absolute;width:' + (Math.random() * 3 + 1) + 'px;height:' + (Math.random() * 3 + 1) + 'px;background:rgba(150,190,255,' + (Math.random() * 0.4 + 0.1) + ');border-radius:50%;left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;z-index:2;pointer-events:none;animation:floatUp ' + (Math.random() * 8 + 6) + 's linear infinite;animation-delay:' + (Math.random() * 8) + 's;';
      heroEl.appendChild(particle);
    }
  }
});
