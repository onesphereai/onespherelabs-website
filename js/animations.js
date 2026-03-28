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

  // Floating vapor clouds in hero
  var heroEl = document.querySelector('.hero');
  if (heroEl && !prefersReducedMotion) {
    // Large vapor/mist clouds — clearly visible
    var vaporConfigs = [
      { size: 200, blur: 50, opacity: 0.12, x: 45, y: 60, dur: 18, anim: 'floatUpSlow' },
      { size: 250, blur: 60, opacity: 0.1, x: 55, y: 80, dur: 22, anim: 'floatUpSlow' },
      { size: 180, blur: 45, opacity: 0.15, x: 35, y: 40, dur: 16, anim: 'floatUpSlow' },
      { size: 300, blur: 70, opacity: 0.08, x: 60, y: 70, dur: 25, anim: 'floatUpSlow' },
      { size: 160, blur: 40, opacity: 0.14, x: 50, y: 90, dur: 14, anim: 'floatUp' },
      { size: 220, blur: 55, opacity: 0.1, x: 40, y: 50, dur: 20, anim: 'floatUpSlow' },
    ];
    vaporConfigs.forEach(function(v) {
      var cloud = document.createElement('div');
      cloud.style.cssText = 'position:absolute;width:' + v.size + 'px;height:' + v.size + 'px;background:radial-gradient(circle,rgba(140,180,255,' + v.opacity + ') 0%,rgba(100,150,255,' + (v.opacity * 0.5) + ') 40%,transparent 70%);border-radius:50%;left:' + v.x + '%;top:' + v.y + '%;z-index:2;pointer-events:none;filter:blur(' + v.blur + 'px);animation:' + v.anim + ' ' + v.dur + 's linear infinite;animation-delay:' + (Math.random() * 8) + 's;';
      heroEl.appendChild(cloud);
    });
    // Medium orbs rising from the sphere impact
    for (var i = 0; i < 8; i++) {
      var orb = document.createElement('div');
      var size = Math.random() * 80 + 40;
      orb.style.cssText = 'position:absolute;width:' + size + 'px;height:' + size + 'px;background:radial-gradient(circle,rgba(160,200,255,' + (Math.random() * 0.2 + 0.08) + ') 0%,transparent 70%);border-radius:50%;left:' + (Math.random() * 30 + 40) + '%;bottom:' + (Math.random() * 20) + '%;z-index:2;pointer-events:none;filter:blur(' + (size * 0.35) + 'px);animation:floatUp ' + (Math.random() * 8 + 8) + 's linear infinite;animation-delay:' + (Math.random() * 10) + 's;';
      heroEl.appendChild(orb);
    }
    // Sparkle particles near beam
    for (var j = 0; j < 10; j++) {
      var spark = document.createElement('div');
      var sparkSize = Math.random() * 3 + 2;
      spark.style.cssText = 'position:absolute;width:' + sparkSize + 'px;height:' + sparkSize + 'px;background:rgba(220,235,255,' + (Math.random() * 0.7 + 0.3) + ');border-radius:50%;left:' + (Math.random() * 20 + 45) + '%;top:' + (Math.random() * 100) + '%;z-index:3;pointer-events:none;animation:floatUp ' + (Math.random() * 5 + 4) + 's linear infinite;animation-delay:' + (Math.random() * 5) + 's;';
      heroEl.appendChild(spark);
    }
  }
});
