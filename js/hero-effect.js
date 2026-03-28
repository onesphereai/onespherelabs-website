(function () {
  var container = document.getElementById('heroCanvas');
  if (!container) return;

  // Reduced motion fallback — static gradient, no canvas overhead
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    container.style.background =
      'radial-gradient(ellipse at 58% 75%, rgba(60,100,200,0.3) 0%, transparent 50%)';
    return;
  }

  var canvas = document.createElement('canvas');
  container.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  // Sphere position — bottom centre-right of hero
  var sphereX, sphereY, sphereR;

  function resize() {
    canvas.width  = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }

  function updatePositions() {
    sphereX = canvas.width  * 0.58;
    sphereY = canvas.height * 0.82;
    sphereR = Math.min(canvas.width, canvas.height) * 0.18;
  }

  resize();
  updatePositions();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ─────────────────────────────────────────────────────────
    // 1. BEAM — vertical light column falling from top of hero
    // ─────────────────────────────────────────────────────────

    // Outer atmospheric glow (widest)
    var beamGlow = ctx.createLinearGradient(sphereX, 0, sphereX, sphereY - sphereR);
    beamGlow.addColorStop(0,   'rgba(60,120,255,0)');
    beamGlow.addColorStop(0.1, 'rgba(80,140,255,0.08)');
    beamGlow.addColorStop(0.4, 'rgba(100,160,255,0.15)');
    beamGlow.addColorStop(0.8, 'rgba(120,170,255,0.12)');
    beamGlow.addColorStop(1,   'rgba(100,160,255,0.05)');
    ctx.fillStyle = beamGlow;
    ctx.fillRect(sphereX - 80, 0, 160, sphereY - sphereR);

    // Medium glow halo around beam
    var beamMed = ctx.createLinearGradient(sphereX, 0, sphereX, sphereY - sphereR);
    beamMed.addColorStop(0,    'rgba(150,190,255,0)');
    beamMed.addColorStop(0.15, 'rgba(170,200,255,0.2)');
    beamMed.addColorStop(0.5,  'rgba(200,220,255,0.3)');
    beamMed.addColorStop(0.85, 'rgba(180,210,255,0.2)');
    beamMed.addColorStop(1,    'rgba(150,190,255,0.1)');
    ctx.fillStyle = beamMed;
    ctx.fillRect(sphereX - 25, 0, 50, sphereY - sphereR + 10);

    // Core beam — bright narrow shaft
    var beamCore = ctx.createLinearGradient(sphereX, 0, sphereX, sphereY - sphereR);
    beamCore.addColorStop(0,   'rgba(255,255,255,0)');
    beamCore.addColorStop(0.1, 'rgba(220,235,255,0.7)');
    beamCore.addColorStop(0.3, 'rgba(255,255,255,0.95)');
    beamCore.addColorStop(0.7, 'rgba(255,255,255,1)');
    beamCore.addColorStop(1,   'rgba(200,220,255,0.8)');
    ctx.fillStyle = beamCore;
    ctx.fillRect(sphereX - 2, 0, 4, sphereY - sphereR + 5);

    // ─────────────────────────────────────────────────────────
    // 2. SPHERE — dark glass ball visible only by rim lighting
    // ─────────────────────────────────────────────────────────

    // Sphere body — near-opaque dark fill
    ctx.beginPath();
    ctx.arc(sphereX, sphereY, sphereR, 0, Math.PI * 2);
    var sphereBody = ctx.createRadialGradient(
      sphereX, sphereY - sphereR * 0.3, 0,
      sphereX, sphereY,                  sphereR
    );
    sphereBody.addColorStop(0,   'rgba(20,30,60,0.6)');
    sphereBody.addColorStop(0.5, 'rgba(10,15,30,0.8)');
    sphereBody.addColorStop(1,   'rgba(5,5,10,0.9)');
    ctx.fillStyle = sphereBody;
    ctx.fill();

    // Top rim — light wrapping around upper arc where beam strikes
    ctx.beginPath();
    ctx.arc(sphereX, sphereY, sphereR, -Math.PI * 0.8, -Math.PI * 0.2);
    ctx.strokeStyle = 'rgba(180,210,255,0.6)';
    ctx.lineWidth   = 3;
    ctx.shadowColor = 'rgba(150,190,255,0.8)';
    ctx.shadowBlur  = 20;
    ctx.stroke();
    ctx.shadowBlur  = 0;

    // Brighter inner rim highlight (tighter arc)
    ctx.beginPath();
    ctx.arc(sphereX, sphereY, sphereR, -Math.PI * 0.7, -Math.PI * 0.3);
    ctx.strokeStyle = 'rgba(220,235,255,0.8)';
    ctx.lineWidth   = 2;
    ctx.shadowColor = 'rgba(200,220,255,0.9)';
    ctx.shadowBlur  = 15;
    ctx.stroke();
    ctx.shadowBlur  = 0;

    // Impact point — hot white spot at the very top of the sphere
    var impactGrad = ctx.createRadialGradient(
      sphereX, sphereY - sphereR, 0,
      sphereX, sphereY - sphereR, 30
    );
    impactGrad.addColorStop(0,   'rgba(255,255,255,0.9)');
    impactGrad.addColorStop(0.3, 'rgba(200,220,255,0.5)');
    impactGrad.addColorStop(1,   'rgba(100,160,255,0)');
    ctx.fillStyle = impactGrad;
    ctx.fillRect(sphereX - 30, sphereY - sphereR - 15, 60, 40);

    // ─────────────────────────────────────────────────────────
    // 3. WATERFALL — light cascading around sphere edges
    // ─────────────────────────────────────────────────────────

    // Left cascade arc
    ctx.beginPath();
    ctx.moveTo(sphereX - sphereR * 0.7, sphereY - sphereR * 0.7);
    ctx.quadraticCurveTo(
      sphereX - sphereR * 1.2, sphereY,
      sphereX - sphereR * 1.8, sphereY + sphereR * 0.8
    );
    var leftCascade = ctx.createLinearGradient(
      sphereX - sphereR * 0.5, sphereY - sphereR,
      sphereX - sphereR * 1.8, sphereY + sphereR
    );
    leftCascade.addColorStop(0,   'rgba(150,190,255,0.4)');
    leftCascade.addColorStop(0.5, 'rgba(100,150,255,0.2)');
    leftCascade.addColorStop(1,   'rgba(60,100,255,0)');
    ctx.strokeStyle = leftCascade;
    ctx.lineWidth   = 8;
    ctx.shadowColor = 'rgba(100,160,255,0.5)';
    ctx.shadowBlur  = 25;
    ctx.stroke();
    ctx.shadowBlur  = 0;

    // Right cascade arc
    ctx.beginPath();
    ctx.moveTo(sphereX + sphereR * 0.7, sphereY - sphereR * 0.7);
    ctx.quadraticCurveTo(
      sphereX + sphereR * 1.2, sphereY,
      sphereX + sphereR * 1.8, sphereY + sphereR * 0.8
    );
    var rightCascade = ctx.createLinearGradient(
      sphereX + sphereR * 0.5, sphereY - sphereR,
      sphereX + sphereR * 1.8, sphereY + sphereR
    );
    rightCascade.addColorStop(0,   'rgba(150,190,255,0.4)');
    rightCascade.addColorStop(0.5, 'rgba(100,150,255,0.2)');
    rightCascade.addColorStop(1,   'rgba(60,100,255,0)');
    ctx.strokeStyle = rightCascade;
    ctx.lineWidth   = 8;
    ctx.shadowColor = 'rgba(100,160,255,0.5)';
    ctx.shadowBlur  = 25;
    ctx.stroke();
    ctx.shadowBlur  = 0;

    // Wide radial glow pooling below the sphere
    var bottomGlow = ctx.createRadialGradient(
      sphereX, sphereY + sphereR * 0.3, sphereR * 0.5,
      sphereX, sphereY + sphereR * 0.5, sphereR * 3
    );
    bottomGlow.addColorStop(0,   'rgba(255,200,120,0.25)');
    bottomGlow.addColorStop(0.3, 'rgba(200,160,100,0.12)');
    bottomGlow.addColorStop(0.6, 'rgba(100,120,200,0.06)');
    bottomGlow.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = bottomGlow;
    ctx.fillRect(0, sphereY - sphereR, canvas.width, canvas.height - sphereY + sphereR);

    // Horizontal equatorial light streak — light ejected sideways at sphere equator
    var horizSpread = ctx.createLinearGradient(sphereX - 400, 0, sphereX + 400, 0);
    horizSpread.addColorStop(0,    'rgba(255,180,80,0)');
    horizSpread.addColorStop(0.2,  'rgba(255,200,120,0.15)');
    horizSpread.addColorStop(0.45, 'rgba(255,220,160,0.35)');
    horizSpread.addColorStop(0.5,  'rgba(255,255,255,0.5)');
    horizSpread.addColorStop(0.55, 'rgba(255,220,160,0.35)');
    horizSpread.addColorStop(0.8,  'rgba(255,200,120,0.15)');
    horizSpread.addColorStop(1,    'rgba(255,180,80,0)');
    ctx.fillStyle = horizSpread;
    ctx.fillRect(sphereX - 400, sphereY - sphereR * 0.15, 800, 6);

    // Soft glow behind the streak
    ctx.shadowColor = 'rgba(255,200,120,0.4)';
    ctx.shadowBlur  = 20;
    ctx.fillRect(sphereX - 300, sphereY - sphereR * 0.1, 600, 3);
    ctx.shadowBlur  = 0;

    // ─────────────────────────────────────────────────────────
    // 4. ATMOSPHERIC HAZE — volumetric fog along beam corridor
    // ─────────────────────────────────────────────────────────

    var fogCenter = ctx.createRadialGradient(
      sphereX, sphereY * 0.5, 0,
      sphereX, sphereY * 0.5, 300
    );
    fogCenter.addColorStop(0,   'rgba(40,80,180,0.15)');
    fogCenter.addColorStop(0.5, 'rgba(30,60,150,0.08)');
    fogCenter.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = fogCenter;
    ctx.fillRect(sphereX - 300, 0, 600, sphereY);

    // Subtle side rim on lower hemisphere — gives depth
    ctx.beginPath();
    ctx.arc(sphereX, sphereY, sphereR + 2, Math.PI * 0.1, Math.PI * 0.9);
    ctx.strokeStyle = 'rgba(80,120,200,0.15)';
    ctx.lineWidth   = 4;
    ctx.shadowColor = 'rgba(60,100,200,0.3)';
    ctx.shadowBlur  = 15;
    ctx.stroke();
    ctx.shadowBlur  = 0;
  }

  // Initial render
  resize();
  updatePositions();
  draw();

  // Re-render on resize
  window.addEventListener('resize', function () {
    resize();
    updatePositions();
    draw();
  });
})();
