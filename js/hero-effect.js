(function () {
  var container = document.getElementById('heroCanvas');
  if (!container) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    container.style.background =
      'radial-gradient(ellipse at 55% 80%, rgba(60,100,200,0.4) 0%, transparent 50%)';
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
    cy = h * 0.82;
  }
  resize();
  window.addEventListener('resize', resize);

  // Particles flowing down beam
  var particles = [];
  for (var i = 0; i < 80; i++) {
    particles.push({
      y: Math.random(), speed: Math.random() * 0.004 + 0.001,
      size: Math.random() * 4 + 1.5, brightness: Math.random() * 0.6 + 0.2,
      offset: (Math.random() - 0.5) * 40
    });
  }

  // Large vapor clouds — VISIBLE fog masses
  var vapors = [];
  for (var v = 0; v < 12; v++) {
    vapors.push({
      x: Math.random() * 0.6 + 0.25,
      y: Math.random() * 0.7 + 0.15,
      radius: Math.random() * 180 + 80,
      dx: (Math.random() - 0.5) * 0.0004,
      dy: -Math.random() * 0.0003 - 0.0001,
      opacity: Math.random() * 0.12 + 0.05,
      phase: Math.random() * Math.PI * 2
    });
  }

  function draw() {
    time += 0.016;
    ctx.clearRect(0, 0, w, h);

    // ── LARGE AMBIENT GLOW — makes the scene less dark ──
    var ambient = ctx.createRadialGradient(cx, cy * 0.6, 0, cx, cy * 0.6, w * 0.6);
    ambient.addColorStop(0, 'rgba(25,50,120,0.2)');
    ambient.addColorStop(0.4, 'rgba(15,30,80,0.1)');
    ambient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ambient;
    ctx.fillRect(0, 0, w, h);

    // ── VAPOR CLOUDS — big, visible, drifting fog ──
    for (var vi = 0; vi < vapors.length; vi++) {
      var vc = vapors[vi];
      vc.x += vc.dx;
      vc.y += vc.dy;
      if (vc.y < -0.1) { vc.y = 0.9; vc.x = Math.random() * 0.6 + 0.25; }
      if (vc.x < 0.1) vc.dx = Math.abs(vc.dx);
      if (vc.x > 0.9) vc.dx = -Math.abs(vc.dx);

      var pulse = 1 + Math.sin(time * 0.4 + vc.phase) * 0.2;
      var r = vc.radius * pulse;
      var vx = vc.x * w;
      var vy = vc.y * h;
      var op = vc.opacity * (0.8 + Math.sin(time * 0.3 + vc.phase) * 0.2);

      var vg = ctx.createRadialGradient(vx, vy, 0, vx, vy, r);
      vg.addColorStop(0, 'rgba(80,120,200,' + op + ')');
      vg.addColorStop(0.3, 'rgba(50,80,160,' + (op * 0.6) + ')');
      vg.addColorStop(0.6, 'rgba(30,50,120,' + (op * 0.3) + ')');
      vg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = vg;
      ctx.fillRect(vx - r, vy - r, r * 2, r * 2);
    }

    // ── BEAM FUNNEL — wide at top, converging to sphere ──
    var s1 = 1 + Math.sin(time * 2) * 0.06;
    var s2 = 1 + Math.sin(time * 3.5) * 0.04;

    // Outermost glow — WIDER and BRIGHTER
    ctx.beginPath();
    ctx.moveTo(cx - 180 * s1, 0);
    ctx.lineTo(cx + 180 * s1, 0);
    ctx.lineTo(cx + 6, cy);
    ctx.lineTo(cx - 6, cy);
    ctx.closePath();
    var fo = ctx.createLinearGradient(0, 0, 0, cy);
    fo.addColorStop(0, 'rgba(40,70,180,0)');
    fo.addColorStop(0.05, 'rgba(50,80,200,0.08)');
    fo.addColorStop(0.3, 'rgba(60,100,220,0.14)');
    fo.addColorStop(0.6, 'rgba(70,120,240,0.16)');
    fo.addColorStop(1, 'rgba(80,130,250,0.1)');
    ctx.fillStyle = fo;
    ctx.fill();

    // Medium funnel
    ctx.beginPath();
    ctx.moveTo(cx - 70 * s2, 0);
    ctx.lineTo(cx + 70 * s2, 0);
    ctx.lineTo(cx + 3, cy);
    ctx.lineTo(cx - 3, cy);
    ctx.closePath();
    var fm = ctx.createLinearGradient(0, 0, 0, cy);
    fm.addColorStop(0, 'rgba(120,160,255,0)');
    fm.addColorStop(0.06, 'rgba(140,180,255,0.15)');
    fm.addColorStop(0.3, 'rgba(170,200,255,0.25)');
    fm.addColorStop(0.6, 'rgba(190,215,255,0.3)');
    fm.addColorStop(1, 'rgba(200,220,255,0.2)');
    ctx.fillStyle = fm;
    ctx.fill();

    // Inner bright funnel
    ctx.beginPath();
    ctx.moveTo(cx - 20 * s1, 0);
    ctx.lineTo(cx + 20 * s1, 0);
    ctx.lineTo(cx + 1.5, cy);
    ctx.lineTo(cx - 1.5, cy);
    ctx.closePath();
    var fi = ctx.createLinearGradient(0, 0, 0, cy);
    fi.addColorStop(0, 'rgba(200,220,255,0)');
    fi.addColorStop(0.03, 'rgba(230,240,255,0.5)');
    fi.addColorStop(0.2, 'rgba(245,250,255,0.75)');
    fi.addColorStop(0.5, 'rgba(255,255,255,0.9)');
    fi.addColorStop(1, 'rgba(255,255,255,0.7)');
    ctx.fillStyle = fi;
    ctx.fill();

    // Core line
    var ca = 0.9 + Math.sin(time * 5) * 0.08;
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, cy);
    ctx.strokeStyle = 'rgba(255,255,255,' + ca + ')';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(200,220,255,0.6)';
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // ── PARTICLES flowing down beam ──
    for (var pi = 0; pi < particles.length; pi++) {
      var p = particles[pi];
      p.y += p.speed;
      if (p.y > 1) { p.y = -0.02; p.offset = (Math.random() - 0.5) * 40; }
      var prog = p.y;
      var fw = (1 - prog) * 70;
      var px = cx + p.offset * (fw / 70);
      var py = prog * cy;
      var pa = p.brightness * (0.6 + Math.sin(time * 3 + pi) * 0.3);
      if (prog < 0.04) pa *= prog / 0.04;
      if (prog > 0.92) pa *= (1 - prog) / 0.08;
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,225,255,' + pa + ')';
      ctx.shadowColor = 'rgba(150,190,255,' + (pa * 0.6) + ')';
      ctx.shadowBlur = p.size * 4;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // ── BIG IMPACT SPHERE — large bright glow ──
    var ip = 1 + Math.sin(time * 1.5) * 0.12;

    // Outermost sphere glow — BIG (250px radius)
    var ig3 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 250 * ip);
    ig3.addColorStop(0, 'rgba(150,180,255,0.2)');
    ig3.addColorStop(0.3, 'rgba(100,140,240,0.1)');
    ig3.addColorStop(0.6, 'rgba(60,90,200,0.05)');
    ig3.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ig3;
    ctx.beginPath();
    ctx.arc(cx, cy, 250 * ip, 0, Math.PI * 2);
    ctx.fill();

    // Medium sphere glow (120px)
    var ig2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120 * ip);
    ig2.addColorStop(0, 'rgba(200,215,255,0.35)');
    ig2.addColorStop(0.3, 'rgba(160,185,255,0.2)');
    ig2.addColorStop(0.7, 'rgba(120,150,240,0.08)');
    ig2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ig2;
    ctx.beginPath();
    ctx.arc(cx, cy, 120 * ip, 0, Math.PI * 2);
    ctx.fill();

    // Hot bright center (60px)
    var ig1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60 * ip);
    ig1.addColorStop(0, 'rgba(255,255,255,0.95)');
    ig1.addColorStop(0.15, 'rgba(255,245,230,0.7)');
    ig1.addColorStop(0.4, 'rgba(220,200,255,0.35)');
    ig1.addColorStop(0.7, 'rgba(160,170,255,0.15)');
    ig1.addColorStop(1, 'rgba(100,130,255,0)');
    ctx.fillStyle = ig1;
    ctx.beginPath();
    ctx.arc(cx, cy, 60 * ip, 0, Math.PI * 2);
    ctx.fill();

    // ── WIDE V-SPREAD from impact — MUCH WIDER ──
    var sa = 0.2 + Math.sin(time * 0.8) * 0.05;

    // Left wide spread
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy);
    ctx.lineTo(0, h + 30);
    ctx.lineTo(cx * 0.4, h + 30);
    ctx.closePath();
    var ls = ctx.createLinearGradient(cx, cy, 0, h);
    ls.addColorStop(0, 'rgba(140,170,255,' + sa + ')');
    ls.addColorStop(0.3, 'rgba(100,140,240,' + (sa * 0.5) + ')');
    ls.addColorStop(0.6, 'rgba(60,90,200,' + (sa * 0.2) + ')');
    ls.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ls;
    ctx.fill();

    // Right wide spread
    ctx.beginPath();
    ctx.moveTo(cx + 10, cy);
    ctx.lineTo(w, h + 30);
    ctx.lineTo(cx + (w - cx) * 0.6, h + 30);
    ctx.closePath();
    var rs = ctx.createLinearGradient(cx, cy, w, h);
    rs.addColorStop(0, 'rgba(140,170,255,' + sa + ')');
    rs.addColorStop(0.3, 'rgba(100,140,240,' + (sa * 0.5) + ')');
    rs.addColorStop(0.6, 'rgba(60,90,200,' + (sa * 0.2) + ')');
    rs.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rs;
    ctx.fill();

    // Warm horizontal streak — wider
    var sk = 0.35 + Math.sin(time * 1.2) * 0.1;
    var hw = ctx.createLinearGradient(cx - w * 0.4, 0, cx + w * 0.4, 0);
    hw.addColorStop(0, 'rgba(255,180,80,0)');
    hw.addColorStop(0.2, 'rgba(255,200,120,' + (sk * 0.3) + ')');
    hw.addColorStop(0.5, 'rgba(255,240,200,' + sk + ')');
    hw.addColorStop(0.8, 'rgba(255,200,120,' + (sk * 0.3) + ')');
    hw.addColorStop(1, 'rgba(255,180,80,0)');
    ctx.fillStyle = hw;
    ctx.fillRect(cx - w * 0.4, cy - 3, w * 0.8, 6);

    // Warm streak glow
    ctx.shadowColor = 'rgba(255,200,120,0.3)';
    ctx.shadowBlur = 15;
    ctx.fillRect(cx - w * 0.3, cy - 1.5, w * 0.6, 3);
    ctx.shadowBlur = 0;

    requestAnimationFrame(draw);
  }

  draw();
})();
