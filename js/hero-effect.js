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
  var w, h, cx, cy, time = 0;

  function resize() {
    w = canvas.width = container.offsetWidth;
    h = canvas.height = container.offsetHeight;
    cx = w * 0.55;
    cy = h * 0.88;
  }
  resize();
  window.addEventListener('resize', resize);

  // Particles flowing down the beam
  var particles = [];
  for (var i = 0; i < 60; i++) {
    particles.push({
      x: 0, y: Math.random(), speed: Math.random() * 0.003 + 0.001,
      size: Math.random() * 3 + 1, brightness: Math.random() * 0.5 + 0.3,
      offset: (Math.random() - 0.5) * 30
    });
  }

  // Fog clouds drifting
  var fogClouds = [];
  for (var f = 0; f < 8; f++) {
    fogClouds.push({
      x: Math.random(), y: Math.random() * 0.8 + 0.1,
      radius: Math.random() * 200 + 100,
      dx: (Math.random() - 0.5) * 0.0003,
      dy: (Math.random() - 0.5) * 0.0002,
      opacity: Math.random() * 0.08 + 0.03
    });
  }

  function draw() {
    time += 0.016;
    ctx.clearRect(0, 0, w, h);

    // ── ATMOSPHERIC FOG — drifting clouds ──
    for (var fi = 0; fi < fogClouds.length; fi++) {
      var fc = fogClouds[fi];
      fc.x += fc.dx;
      fc.y += fc.dy;
      if (fc.x < -0.1) fc.x = 1.1;
      if (fc.x > 1.1) fc.x = -0.1;
      if (fc.y < 0.05) fc.dy = Math.abs(fc.dy);
      if (fc.y > 0.9) fc.dy = -Math.abs(fc.dy);

      var pulse = 1 + Math.sin(time * 0.5 + fi) * 0.15;
      var fog = ctx.createRadialGradient(
        fc.x * w, fc.y * h, 0,
        fc.x * w, fc.y * h, fc.radius * pulse
      );
      fog.addColorStop(0, 'rgba(30,60,150,' + (fc.opacity * pulse) + ')');
      fog.addColorStop(0.5, 'rgba(20,40,120,' + (fc.opacity * 0.5 * pulse) + ')');
      fog.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, w, h);
    }

    // ── BEAM — funnel converging to impact, with shimmer ──
    var shimmer = 1 + Math.sin(time * 2) * 0.08;
    var shimmer2 = 1 + Math.sin(time * 3.7) * 0.05;

    // Outermost glow funnel
    ctx.beginPath();
    ctx.moveTo(cx - 140 * shimmer, 0);
    ctx.lineTo(cx + 140 * shimmer, 0);
    ctx.lineTo(cx + 4, cy);
    ctx.lineTo(cx - 4, cy);
    ctx.closePath();
    var funnelOuter = ctx.createLinearGradient(0, 0, 0, cy);
    funnelOuter.addColorStop(0, 'rgba(40,70,180,0)');
    funnelOuter.addColorStop(0.05, 'rgba(50,80,200,0.05)');
    funnelOuter.addColorStop(0.3, 'rgba(60,100,220,0.08)');
    funnelOuter.addColorStop(0.7, 'rgba(70,110,230,0.1)');
    funnelOuter.addColorStop(1, 'rgba(80,120,240,0.06)');
    ctx.fillStyle = funnelOuter;
    ctx.fill();

    // Medium funnel
    ctx.beginPath();
    ctx.moveTo(cx - 60 * shimmer2, 0);
    ctx.lineTo(cx + 60 * shimmer2, 0);
    ctx.lineTo(cx + 2, cy);
    ctx.lineTo(cx - 2, cy);
    ctx.closePath();
    var funnelMed = ctx.createLinearGradient(0, 0, 0, cy);
    funnelMed.addColorStop(0, 'rgba(120,160,255,0)');
    funnelMed.addColorStop(0.08, 'rgba(140,180,255,0.1)');
    funnelMed.addColorStop(0.3, 'rgba(160,200,255,0.2)');
    funnelMed.addColorStop(0.6, 'rgba(180,210,255,0.25)');
    funnelMed.addColorStop(1, 'rgba(200,220,255,0.15)');
    ctx.fillStyle = funnelMed;
    ctx.fill();

    // Inner bright funnel
    ctx.beginPath();
    ctx.moveTo(cx - 18 * shimmer, 0);
    ctx.lineTo(cx + 18 * shimmer, 0);
    ctx.lineTo(cx + 1, cy);
    ctx.lineTo(cx - 1, cy);
    ctx.closePath();
    var funnelInner = ctx.createLinearGradient(0, 0, 0, cy);
    funnelInner.addColorStop(0, 'rgba(200,220,255,0)');
    funnelInner.addColorStop(0.04, 'rgba(220,235,255,0.4)');
    funnelInner.addColorStop(0.2, 'rgba(240,245,255,0.7)');
    funnelInner.addColorStop(0.5, 'rgba(255,255,255,0.85)');
    funnelInner.addColorStop(1, 'rgba(255,255,255,0.6)');
    ctx.fillStyle = funnelInner;
    ctx.fill();

    // Core bright line with subtle flicker
    var coreAlpha = 0.85 + Math.sin(time * 5) * 0.1;
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, cy);
    ctx.strokeStyle = 'rgba(255,255,255,' + coreAlpha + ')';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(200,220,255,0.7)';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // ── PARTICLES — flowing down the beam ──
    for (var pi = 0; pi < particles.length; pi++) {
      var p = particles[pi];
      p.y += p.speed;
      if (p.y > 1) { p.y = 0; p.offset = (Math.random() - 0.5) * 30; p.brightness = Math.random() * 0.5 + 0.3; }

      // Particle position follows the funnel shape
      var progress = p.y;
      var funnelWidth = (1 - progress) * 60;
      var px = cx + p.offset * (funnelWidth / 60);
      var py = progress * cy;

      var particleAlpha = p.brightness * (0.7 + Math.sin(time * 3 + pi) * 0.3);
      if (progress < 0.05) particleAlpha *= progress / 0.05;
      if (progress > 0.9) particleAlpha *= (1 - progress) / 0.1;

      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,220,255,' + particleAlpha + ')';
      ctx.shadowColor = 'rgba(150,190,255,' + (particleAlpha * 0.8) + ')';
      ctx.shadowBlur = p.size * 3;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // ── IMPACT — bright convergence point ──
    var impactPulse = 1 + Math.sin(time * 1.5) * 0.15;
    var impactR = 35 * impactPulse;

    // Wide glow
    var impactWide = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140 * impactPulse);
    impactWide.addColorStop(0, 'rgba(200,210,255,0.25)');
    impactWide.addColorStop(0.3, 'rgba(150,170,255,0.12)');
    impactWide.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = impactWide;
    ctx.beginPath();
    ctx.arc(cx, cy, 140 * impactPulse, 0, Math.PI * 2);
    ctx.fill();

    // Hot center
    var impact = ctx.createRadialGradient(cx, cy, 0, cx, cy, impactR);
    impact.addColorStop(0, 'rgba(255,255,255,0.95)');
    impact.addColorStop(0.2, 'rgba(255,240,220,0.7)');
    impact.addColorStop(0.5, 'rgba(180,200,255,0.3)');
    impact.addColorStop(1, 'rgba(100,140,255,0)');
    ctx.fillStyle = impact;
    ctx.beginPath();
    ctx.arc(cx, cy, impactR, 0, Math.PI * 2);
    ctx.fill();

    // ── LIGHT SPREAD — V shape from impact along bottom ──
    var spreadAlpha = 0.15 + Math.sin(time * 0.8) * 0.05;

    // Left spread
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx - w * 0.5, h + 20);
    ctx.lineTo(cx - w * 0.3, h + 20);
    ctx.closePath();
    var ls = ctx.createLinearGradient(cx, cy, cx - w * 0.4, h);
    ls.addColorStop(0, 'rgba(160,180,255,' + spreadAlpha + ')');
    ls.addColorStop(0.4, 'rgba(100,130,240,' + (spreadAlpha * 0.5) + ')');
    ls.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ls;
    ctx.fill();

    // Right spread
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + w * 0.5, h + 20);
    ctx.lineTo(cx + w * 0.3, h + 20);
    ctx.closePath();
    var rs = ctx.createLinearGradient(cx, cy, cx + w * 0.4, h);
    rs.addColorStop(0, 'rgba(160,180,255,' + spreadAlpha + ')');
    rs.addColorStop(0.4, 'rgba(100,130,240,' + (spreadAlpha * 0.5) + ')');
    rs.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rs;
    ctx.fill();

    // Wide diffuse spread
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(0, h + 50);
    ctx.lineTo(w, h + 50);
    ctx.closePath();
    var wv = ctx.createLinearGradient(cx, cy, cx, h);
    wv.addColorStop(0, 'rgba(80,100,200,0.06)');
    wv.addColorStop(0.5, 'rgba(40,60,140,0.03)');
    wv.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = wv;
    ctx.fill();

    // Warm horizontal streak
    var streakAlpha = 0.3 + Math.sin(time * 1.2) * 0.1;
    var horizW = ctx.createLinearGradient(cx - 350, 0, cx + 350, 0);
    horizW.addColorStop(0, 'rgba(255,180,80,0)');
    horizW.addColorStop(0.25, 'rgba(255,200,120,' + (streakAlpha * 0.4) + ')');
    horizW.addColorStop(0.5, 'rgba(255,240,200,' + streakAlpha + ')');
    horizW.addColorStop(0.75, 'rgba(255,200,120,' + (streakAlpha * 0.4) + ')');
    horizW.addColorStop(1, 'rgba(255,180,80,0)');
    ctx.fillStyle = horizW;
    ctx.fillRect(cx - 350, cy - 2, 700, 4);
    ctx.shadowColor = 'rgba(255,200,120,0.25)';
    ctx.shadowBlur = 12;
    ctx.fillRect(cx - 250, cy - 1, 500, 2);
    ctx.shadowBlur = 0;

    requestAnimationFrame(draw);
  }

  draw();
})();
