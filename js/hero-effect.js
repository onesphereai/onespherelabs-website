(function () {
  var container = document.getElementById('heroCanvas');
  if (!container) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    container.style.background =
      'radial-gradient(ellipse at 55% 80%, rgba(40,70,160,0.4) 0%, transparent 60%)';
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
    cy = h * 0.83;
  }
  resize();
  window.addEventListener('resize', resize);

  // Beam particles
  var parts = [];
  for (var i = 0; i < 80; i++) {
    parts.push({ y: Math.random(), sp: Math.random() * 0.004 + 0.001, sz: Math.random() * 4 + 1.5, br: Math.random() * 0.5 + 0.2, ox: (Math.random() - 0.5) * 50 });
  }

  // Full-page fog clouds — 20 clouds across entire viewport
  var clouds = [];
  for (var c = 0; c < 20; c++) {
    clouds.push({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 300 + 150,
      dx: (Math.random() - 0.5) * 0.0003,
      dy: (Math.random() - 0.5) * 0.0002,
      op: Math.random() * 0.18 + 0.06,
      ph: Math.random() * 6.28,
      blue: Math.floor(Math.random() * 60 + 100),
      green: Math.floor(Math.random() * 40 + 40)
    });
  }

  function draw() {
    time += 0.016;
    ctx.clearRect(0, 0, w, h);

    // ═══ FULL-PAGE AMBIENT — lift the darkness everywhere ═══
    var amb = ctx.createRadialGradient(cx, h * 0.5, 0, cx, h * 0.5, w * 0.7);
    amb.addColorStop(0, 'rgba(20,40,100,0.25)');
    amb.addColorStop(0.5, 'rgba(12,25,70,0.12)');
    amb.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = amb;
    ctx.fillRect(0, 0, w, h);

    // ═══ FOG CLOUDS — visible across ENTIRE page ═══
    for (var ci = 0; ci < clouds.length; ci++) {
      var cl = clouds[ci];
      cl.x += cl.dx;
      cl.y += cl.dy;
      if (cl.x < -0.15) cl.x = 1.15;
      if (cl.x > 1.15) cl.x = -0.15;
      if (cl.y < -0.1) cl.y = 1.1;
      if (cl.y > 1.1) cl.y = -0.1;

      var pulse = 1 + Math.sin(time * 0.3 + cl.ph) * 0.2;
      var cr = cl.r * pulse;
      var cxp = cl.x * w;
      var cyp = cl.y * h;
      var cop = cl.op * (0.8 + Math.sin(time * 0.25 + cl.ph) * 0.2);

      var cg = ctx.createRadialGradient(cxp, cyp, 0, cxp, cyp, cr);
      cg.addColorStop(0, 'rgba(' + cl.green + ',' + cl.blue + ',200,' + cop + ')');
      cg.addColorStop(0.4, 'rgba(' + Math.floor(cl.green * 0.6) + ',' + Math.floor(cl.blue * 0.7) + ',160,' + (cop * 0.5) + ')');
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = cg;
      ctx.fillRect(cxp - cr, cyp - cr, cr * 2, cr * 2);
    }

    // ═══ BEAM FUNNEL ═══
    var s1 = 1 + Math.sin(time * 2) * 0.05;

    // Outer glow
    ctx.beginPath();
    ctx.moveTo(cx - 200 * s1, 0);
    ctx.lineTo(cx + 200 * s1, 0);
    ctx.lineTo(cx + 8, cy);
    ctx.lineTo(cx - 8, cy);
    ctx.closePath();
    var fo = ctx.createLinearGradient(0, 0, 0, cy);
    fo.addColorStop(0, 'rgba(40,70,180,0)');
    fo.addColorStop(0.05, 'rgba(50,80,200,0.1)');
    fo.addColorStop(0.3, 'rgba(60,100,220,0.16)');
    fo.addColorStop(0.6, 'rgba(70,120,240,0.18)');
    fo.addColorStop(1, 'rgba(80,130,250,0.12)');
    ctx.fillStyle = fo;
    ctx.fill();

    // Medium
    ctx.beginPath();
    ctx.moveTo(cx - 80 * s1, 0);
    ctx.lineTo(cx + 80 * s1, 0);
    ctx.lineTo(cx + 3, cy);
    ctx.lineTo(cx - 3, cy);
    ctx.closePath();
    var fm = ctx.createLinearGradient(0, 0, 0, cy);
    fm.addColorStop(0, 'rgba(130,170,255,0)');
    fm.addColorStop(0.05, 'rgba(150,190,255,0.18)');
    fm.addColorStop(0.3, 'rgba(180,210,255,0.28)');
    fm.addColorStop(0.6, 'rgba(200,220,255,0.32)');
    fm.addColorStop(1, 'rgba(210,225,255,0.22)');
    ctx.fillStyle = fm;
    ctx.fill();

    // Inner
    ctx.beginPath();
    ctx.moveTo(cx - 22 * s1, 0);
    ctx.lineTo(cx + 22 * s1, 0);
    ctx.lineTo(cx + 1.5, cy);
    ctx.lineTo(cx - 1.5, cy);
    ctx.closePath();
    var fi = ctx.createLinearGradient(0, 0, 0, cy);
    fi.addColorStop(0, 'rgba(220,235,255,0)');
    fi.addColorStop(0.03, 'rgba(240,248,255,0.5)');
    fi.addColorStop(0.15, 'rgba(250,252,255,0.8)');
    fi.addColorStop(0.5, 'rgba(255,255,255,0.92)');
    fi.addColorStop(1, 'rgba(255,255,255,0.75)');
    ctx.fillStyle = fi;
    ctx.fill();

    // Core line
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, cy);
    ctx.strokeStyle = 'rgba(255,255,255,' + (0.9 + Math.sin(time * 5) * 0.08) + ')';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(200,220,255,0.5)';
    ctx.shadowBlur = 6;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // ═══ PARTICLES ═══
    for (var pi = 0; pi < parts.length; pi++) {
      var p = parts[pi];
      p.y += p.sp;
      if (p.y > 1.02) { p.y = -0.02; p.ox = (Math.random() - 0.5) * 50; }
      var prog = p.y;
      var px = cx + p.ox * (1 - prog);
      var py = prog * cy;
      var pa = p.br * (0.5 + Math.sin(time * 3 + pi) * 0.3);
      if (prog < 0.04) pa *= prog / 0.04;
      if (prog > 0.92) pa *= (1 - prog) / 0.08;
      ctx.beginPath();
      ctx.arc(px, py, p.sz, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(210,230,255,' + pa + ')';
      ctx.shadowColor = 'rgba(150,190,255,' + (pa * 0.5) + ')';
      ctx.shadowBlur = p.sz * 4;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // ═══ MASSIVE IMPACT SPHERE — 400px+ glow ═══
    var ip = 1 + Math.sin(time * 1.5) * 0.1;

    // Layer 4: outermost haze (500px)
    var g4 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 500 * ip);
    g4.addColorStop(0, 'rgba(80,110,200,0.15)');
    g4.addColorStop(0.3, 'rgba(50,80,160,0.08)');
    g4.addColorStop(0.6, 'rgba(30,50,120,0.04)');
    g4.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g4;
    ctx.beginPath();
    ctx.arc(cx, cy, 500 * ip, 0, Math.PI * 2);
    ctx.fill();

    // Layer 3: large glow (300px)
    var g3 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 300 * ip);
    g3.addColorStop(0, 'rgba(150,180,255,0.25)');
    g3.addColorStop(0.3, 'rgba(110,145,240,0.15)');
    g3.addColorStop(0.6, 'rgba(70,100,200,0.06)');
    g3.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g3;
    ctx.beginPath();
    ctx.arc(cx, cy, 300 * ip, 0, Math.PI * 2);
    ctx.fill();

    // Layer 2: medium bright (150px)
    var g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 150 * ip);
    g2.addColorStop(0, 'rgba(220,230,255,0.4)');
    g2.addColorStop(0.3, 'rgba(180,200,255,0.22)');
    g2.addColorStop(0.7, 'rgba(130,160,240,0.08)');
    g2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.arc(cx, cy, 150 * ip, 0, Math.PI * 2);
    ctx.fill();

    // Layer 1: hot white core (70px)
    var g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70 * ip);
    g1.addColorStop(0, 'rgba(255,255,255,0.95)');
    g1.addColorStop(0.15, 'rgba(255,248,235,0.75)');
    g1.addColorStop(0.4, 'rgba(230,215,255,0.4)');
    g1.addColorStop(0.7, 'rgba(170,185,255,0.15)');
    g1.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g1;
    ctx.beginPath();
    ctx.arc(cx, cy, 70 * ip, 0, Math.PI * 2);
    ctx.fill();

    // ═══ NATURAL LIGHT WASH — soft radial spread, not geometric V ═══
    var wa = 0.12 + Math.sin(time * 0.8) * 0.03;

    // Wide soft wash spreading from impact across entire bottom
    var wash = ctx.createRadialGradient(cx, cy, 20, cx, cy + h * 0.15, w * 0.8);
    wash.addColorStop(0, 'rgba(120,150,240,' + (wa * 1.5) + ')');
    wash.addColorStop(0.15, 'rgba(80,110,200,' + wa + ')');
    wash.addColorStop(0.4, 'rgba(50,70,160,' + (wa * 0.5) + ')');
    wash.addColorStop(0.7, 'rgba(30,40,100,' + (wa * 0.2) + ')');
    wash.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = wash;
    ctx.fillRect(0, cy - 100, w, h - cy + 100);

    // Warm horizontal streak
    var sk = 0.4 + Math.sin(time * 1.2) * 0.1;
    var hw = ctx.createLinearGradient(0, 0, w, 0);
    hw.addColorStop(0, 'rgba(255,180,80,0)');
    hw.addColorStop(0.15, 'rgba(255,190,100,' + (sk * 0.15) + ')');
    hw.addColorStop(0.4, 'rgba(255,210,140,' + (sk * 0.3) + ')');
    hw.addColorStop(0.55, 'rgba(255,245,210,' + sk + ')');
    hw.addColorStop(0.7, 'rgba(255,210,140,' + (sk * 0.3) + ')');
    hw.addColorStop(0.85, 'rgba(255,190,100,' + (sk * 0.15) + ')');
    hw.addColorStop(1, 'rgba(255,180,80,0)');
    ctx.fillStyle = hw;
    ctx.fillRect(0, cy - 3, w, 6);
    ctx.shadowColor = 'rgba(255,200,120,0.25)';
    ctx.shadowBlur = 12;
    ctx.fillRect(w * 0.1, cy - 1.5, w * 0.8, 3);
    ctx.shadowBlur = 0;

    requestAnimationFrame(draw);
  }

  draw();
})();
