(function () {
  var container = document.getElementById('heroCanvas');
  if (!container) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    container.style.background =
      'radial-gradient(ellipse at 55% 85%, rgba(60,100,200,0.3) 0%, transparent 50%)';
    return;
  }

  var canvas = document.createElement('canvas');
  container.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  var cx, cy, w, h;

  function resize() {
    w = canvas.width = container.offsetWidth;
    h = canvas.height = container.offsetHeight;
    cx = w * 0.55;
    cy = h * 0.88;
  }

  resize();

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // ── ATMOSPHERIC FOG — heavy blue haze behind everything ──
    // Upper fog
    var fogUpper = ctx.createRadialGradient(cx, h * 0.3, 0, cx, h * 0.3, w * 0.5);
    fogUpper.addColorStop(0, 'rgba(30,60,140,0.25)');
    fogUpper.addColorStop(0.4, 'rgba(20,40,120,0.12)');
    fogUpper.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = fogUpper;
    ctx.fillRect(0, 0, w, h);

    // Lower warm fog around impact
    var fogLower = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.4);
    fogLower.addColorStop(0, 'rgba(80,60,30,0.2)');
    fogLower.addColorStop(0.3, 'rgba(40,30,60,0.1)');
    fogLower.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = fogLower;
    ctx.fillRect(0, h * 0.5, w, h * 0.5);

    // ── BEAM — funnel shape, wide at top converging to impact point ──
    // The beam is a trapezoid/triangle: wide at top, narrow at bottom

    // Outermost glow funnel
    ctx.beginPath();
    ctx.moveTo(cx - 120, 0);
    ctx.lineTo(cx + 120, 0);
    ctx.lineTo(cx + 3, cy);
    ctx.lineTo(cx - 3, cy);
    ctx.closePath();
    var funnelOuter = ctx.createLinearGradient(0, 0, 0, cy);
    funnelOuter.addColorStop(0, 'rgba(60,100,200,0)');
    funnelOuter.addColorStop(0.1, 'rgba(60,100,200,0.06)');
    funnelOuter.addColorStop(0.5, 'rgba(80,130,220,0.1)');
    funnelOuter.addColorStop(0.9, 'rgba(100,150,240,0.08)');
    funnelOuter.addColorStop(1, 'rgba(80,120,200,0.04)');
    ctx.fillStyle = funnelOuter;
    ctx.fill();

    // Medium glow funnel
    ctx.beginPath();
    ctx.moveTo(cx - 50, 0);
    ctx.lineTo(cx + 50, 0);
    ctx.lineTo(cx + 2, cy);
    ctx.lineTo(cx - 2, cy);
    ctx.closePath();
    var funnelMed = ctx.createLinearGradient(0, 0, 0, cy);
    funnelMed.addColorStop(0, 'rgba(120,160,255,0)');
    funnelMed.addColorStop(0.1, 'rgba(140,180,255,0.12)');
    funnelMed.addColorStop(0.4, 'rgba(160,200,255,0.2)');
    funnelMed.addColorStop(0.7, 'rgba(180,210,255,0.25)');
    funnelMed.addColorStop(1, 'rgba(200,220,255,0.15)');
    ctx.fillStyle = funnelMed;
    ctx.fill();

    // Inner bright funnel
    ctx.beginPath();
    ctx.moveTo(cx - 15, 0);
    ctx.lineTo(cx + 15, 0);
    ctx.lineTo(cx + 1, cy);
    ctx.lineTo(cx - 1, cy);
    ctx.closePath();
    var funnelInner = ctx.createLinearGradient(0, 0, 0, cy);
    funnelInner.addColorStop(0, 'rgba(200,220,255,0)');
    funnelInner.addColorStop(0.05, 'rgba(220,235,255,0.5)');
    funnelInner.addColorStop(0.3, 'rgba(240,245,255,0.8)');
    funnelInner.addColorStop(0.6, 'rgba(255,255,255,0.9)');
    funnelInner.addColorStop(1, 'rgba(255,255,255,0.7)');
    ctx.fillStyle = funnelInner;
    ctx.fill();

    // Core bright line
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, cy);
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(200,220,255,0.8)';
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // ── IMPACT POINT — bright convergence where beam meets the surface ──
    var impactR = 40;
    var impact = ctx.createRadialGradient(cx, cy, 0, cx, cy, impactR);
    impact.addColorStop(0, 'rgba(255,255,255,1)');
    impact.addColorStop(0.15, 'rgba(255,240,220,0.8)');
    impact.addColorStop(0.4, 'rgba(200,180,255,0.4)');
    impact.addColorStop(1, 'rgba(100,120,255,0)');
    ctx.fillStyle = impact;
    ctx.beginPath();
    ctx.arc(cx, cy, impactR, 0, Math.PI * 2);
    ctx.fill();

    // Larger soft glow behind impact
    var impactWide = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
    impactWide.addColorStop(0, 'rgba(200,210,255,0.3)');
    impactWide.addColorStop(0.4, 'rgba(150,170,255,0.15)');
    impactWide.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = impactWide;
    ctx.beginPath();
    ctx.arc(cx, cy, 120, 0, Math.PI * 2);
    ctx.fill();

    // ── LIGHT SPREAD — V-shape spreading outward from impact along bottom ──
    // Left spread
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx - w * 0.45, h);
    ctx.lineTo(cx - w * 0.35, h);
    ctx.closePath();
    var leftSpread = ctx.createLinearGradient(cx, cy, cx - w * 0.4, h);
    leftSpread.addColorStop(0, 'rgba(180,200,255,0.25)');
    leftSpread.addColorStop(0.3, 'rgba(120,150,255,0.12)');
    leftSpread.addColorStop(0.7, 'rgba(80,100,200,0.05)');
    leftSpread.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = leftSpread;
    ctx.fill();

    // Right spread
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + w * 0.45, h);
    ctx.lineTo(cx + w * 0.35, h);
    ctx.closePath();
    var rightSpread = ctx.createLinearGradient(cx, cy, cx + w * 0.4, h);
    rightSpread.addColorStop(0, 'rgba(180,200,255,0.25)');
    rightSpread.addColorStop(0.3, 'rgba(120,150,255,0.12)');
    rightSpread.addColorStop(0.7, 'rgba(80,100,200,0.05)');
    rightSpread.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rightSpread;
    ctx.fill();

    // Wider diffuse V-spread
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(0, h + 50);
    ctx.lineTo(w, h + 50);
    ctx.closePath();
    var wideV = ctx.createLinearGradient(cx, cy, cx, h);
    wideV.addColorStop(0, 'rgba(100,130,220,0.08)');
    wideV.addColorStop(0.5, 'rgba(60,80,160,0.04)');
    wideV.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = wideV;
    ctx.fill();

    // Warm horizontal accent at impact level
    var horizWarm = ctx.createLinearGradient(cx - 300, 0, cx + 300, 0);
    horizWarm.addColorStop(0, 'rgba(255,180,80,0)');
    horizWarm.addColorStop(0.3, 'rgba(255,200,120,0.2)');
    horizWarm.addColorStop(0.5, 'rgba(255,240,200,0.4)');
    horizWarm.addColorStop(0.7, 'rgba(255,200,120,0.2)');
    horizWarm.addColorStop(1, 'rgba(255,180,80,0)');
    ctx.fillStyle = horizWarm;
    ctx.fillRect(cx - 300, cy - 2, 600, 4);
    ctx.shadowColor = 'rgba(255,200,120,0.3)';
    ctx.shadowBlur = 15;
    ctx.fillRect(cx - 200, cy - 1, 400, 2);
    ctx.shadowBlur = 0;

    // ── SIDE FOG — volumetric haze on both sides ──
    var fogLeft = ctx.createRadialGradient(cx - w * 0.2, h * 0.4, 0, cx - w * 0.2, h * 0.4, w * 0.3);
    fogLeft.addColorStop(0, 'rgba(20,40,100,0.12)');
    fogLeft.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = fogLeft;
    ctx.fillRect(0, 0, w * 0.5, h);

    var fogRight = ctx.createRadialGradient(cx + w * 0.15, h * 0.35, 0, cx + w * 0.15, h * 0.35, w * 0.35);
    fogRight.addColorStop(0, 'rgba(30,50,120,0.1)');
    fogRight.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = fogRight;
    ctx.fillRect(w * 0.3, 0, w * 0.7, h);
  }

  draw();
  window.addEventListener('resize', function () { resize(); draw(); });
})();
