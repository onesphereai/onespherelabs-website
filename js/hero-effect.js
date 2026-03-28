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

  // 40 vapor clouds — mix of huge/large/medium/small across entire hero
  var clouds = [];
  var cloudDefs = [
    // 6 HUGE (400-600px)
    {count:6, rMin:400, rMax:600, opMin:0.06, opMax:0.14, spdMul:0.15},
    // 10 large (200-400px)
    {count:10, rMin:200, rMax:400, opMin:0.05, opMax:0.14, spdMul:0.3},
    // 12 medium (100-200px)
    {count:12, rMin:100, rMax:200, opMin:0.06, opMax:0.16, spdMul:0.4},
    // 12 small (40-100px)
    {count:12, rMin:40, rMax:100, opMin:0.08, opMax:0.2, spdMul:0.6}
  ];
  cloudDefs.forEach(function(def) {
    for (var n = 0; n < def.count; n++) {
      clouds.push({
        x: Math.random(), y: Math.random(),
        r: Math.random() * (def.rMax - def.rMin) + def.rMin,
        dx: (Math.random() - 0.5) * 0.001 * def.spdMul,
        dy: (Math.random() - 0.5) * 0.0008 * def.spdMul,
        op: Math.random() * (def.opMax - def.opMin) + def.opMin,
        ph: Math.random() * 6.28,
        b: Math.floor(Math.random() * 70 + 100),
        g: Math.floor(Math.random() * 50 + 40)
      });
    }
  });

  function draw() {
    time += 0.016;
    ctx.clearRect(0, 0, w, h);

    // ═══ AMBIENT ═══
    var amb = ctx.createRadialGradient(cx, h * 0.5, 0, cx, h * 0.5, w * 0.7);
    amb.addColorStop(0, 'rgba(20,40,100,0.22)');
    amb.addColorStop(0.5, 'rgba(12,25,70,0.1)');
    amb.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = amb;
    ctx.fillRect(0, 0, w, h);

    // ═══ 40 VAPOR CLOUDS ═══
    for (var ci = 0; ci < clouds.length; ci++) {
      var cl = clouds[ci];
      cl.x += cl.dx;
      cl.y += cl.dy;
      if (cl.x < -0.25) cl.x = 1.25;
      if (cl.x > 1.25) cl.x = -0.25;
      if (cl.y < -0.2) cl.y = 1.2;
      if (cl.y > 1.2) cl.y = -0.2;

      var pulse = 1 + Math.sin(time * 0.3 + cl.ph) * 0.15;
      var cr = cl.r * pulse;
      var cpx = cl.x * w;
      var cpy = cl.y * h;
      var cop = cl.op * (0.85 + Math.sin(time * 0.25 + cl.ph) * 0.15);

      var cg = ctx.createRadialGradient(cpx, cpy, 0, cpx, cpy, cr);
      cg.addColorStop(0, 'rgba(' + cl.g + ',' + cl.b + ',210,' + cop + ')');
      cg.addColorStop(0.3, 'rgba(' + Math.floor(cl.g * 0.7) + ',' + Math.floor(cl.b * 0.8) + ',180,' + (cop * 0.55) + ')');
      cg.addColorStop(0.6, 'rgba(' + Math.floor(cl.g * 0.4) + ',' + Math.floor(cl.b * 0.5) + ',140,' + (cop * 0.2) + ')');
      cg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = cg;
      ctx.fillRect(cpx - cr, cpy - cr, cr * 2, cr * 2);
    }

    // ═══ BEAM — NO hard edges, only soft radial/elliptical gradients ═══
    var s1 = 1 + Math.sin(time * 2) * 0.04;

    // Widest beam glow — tall narrow ellipse, no lines
    var bw1 = ctx.createRadialGradient(cx, cy * 0.45, 0, cx, cy * 0.45, 220 * s1);
    bw1.addColorStop(0, 'rgba(60,100,220,0.14)');
    bw1.addColorStop(0.4, 'rgba(50,80,200,0.08)');
    bw1.addColorStop(0.7, 'rgba(40,60,160,0.04)');
    bw1.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = bw1;
    ctx.save();
    ctx.translate(cx, cy * 0.45);
    ctx.scale(0.35, 1);
    ctx.beginPath();
    ctx.arc(0, 0, cy * 0.55, 0, Math.PI * 2);
    ctx.restore();
    ctx.fill();

    // Medium beam glow — taller, narrower ellipse
    var bw2 = ctx.createRadialGradient(cx, cy * 0.45, 0, cx, cy * 0.45, 120 * s1);
    bw2.addColorStop(0, 'rgba(140,180,255,0.22)');
    bw2.addColorStop(0.3, 'rgba(120,160,245,0.15)');
    bw2.addColorStop(0.6, 'rgba(80,120,220,0.08)');
    bw2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = bw2;
    ctx.save();
    ctx.translate(cx, cy * 0.45);
    ctx.scale(0.18, 1);
    ctx.beginPath();
    ctx.arc(0, 0, cy * 0.55, 0, Math.PI * 2);
    ctx.restore();
    ctx.fill();

    // Inner beam glow — very narrow, very bright
    var bw3 = ctx.createRadialGradient(cx, cy * 0.45, 0, cx, cy * 0.45, 40 * s1);
    bw3.addColorStop(0, 'rgba(240,248,255,0.7)');
    bw3.addColorStop(0.3, 'rgba(220,235,255,0.5)');
    bw3.addColorStop(0.6, 'rgba(180,210,255,0.25)');
    bw3.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = bw3;
    ctx.save();
    ctx.translate(cx, cy * 0.45);
    ctx.scale(0.06, 1);
    ctx.beginPath();
    ctx.arc(0, 0, cy * 0.55, 0, Math.PI * 2);
    ctx.restore();
    ctx.fill();

    // Core glow line — soft, no hard stroke
    var bw4 = ctx.createRadialGradient(cx, cy * 0.45, 0, cx, cy * 0.45, 8);
    bw4.addColorStop(0, 'rgba(255,255,255,' + (0.85 + Math.sin(time * 5) * 0.1) + ')');
    bw4.addColorStop(0.5, 'rgba(220,235,255,0.4)');
    bw4.addColorStop(1, 'rgba(180,210,255,0)');
    ctx.fillStyle = bw4;
    ctx.save();
    ctx.translate(cx, cy * 0.45);
    ctx.scale(0.02, 1);
    ctx.beginPath();
    ctx.arc(0, 0, cy * 0.55, 0, Math.PI * 2);
    ctx.restore();
    ctx.fill();

    // ═══ PARTICLES ═══
    for (var pi = 0; pi < parts.length; pi++) {
      var p = parts[pi];
      p.y += p.sp;
      if (p.y > 1.02) { p.y = -0.02; p.ox = (Math.random() - 0.5) * 50; }
      var prog = p.y;
      var px = cx + p.ox * (1 - prog) * 0.6;
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

    // ═══ MASSIVE IMPACT GLOW ═══
    var ip = 1 + Math.sin(time * 1.5) * 0.1;

    var g4 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 500 * ip);
    g4.addColorStop(0, 'rgba(80,110,200,0.18)');
    g4.addColorStop(0.3, 'rgba(50,80,160,0.1)');
    g4.addColorStop(0.6, 'rgba(30,50,120,0.04)');
    g4.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g4;
    ctx.beginPath();
    ctx.arc(cx, cy, 500 * ip, 0, Math.PI * 2);
    ctx.fill();

    var g3 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 300 * ip);
    g3.addColorStop(0, 'rgba(150,180,255,0.28)');
    g3.addColorStop(0.3, 'rgba(110,145,240,0.16)');
    g3.addColorStop(0.6, 'rgba(70,100,200,0.06)');
    g3.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g3;
    ctx.beginPath();
    ctx.arc(cx, cy, 300 * ip, 0, Math.PI * 2);
    ctx.fill();

    var g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 150 * ip);
    g2.addColorStop(0, 'rgba(220,230,255,0.45)');
    g2.addColorStop(0.3, 'rgba(180,200,255,0.25)');
    g2.addColorStop(0.7, 'rgba(130,160,240,0.08)');
    g2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.arc(cx, cy, 150 * ip, 0, Math.PI * 2);
    ctx.fill();

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

    // ═══ SOFT LIGHT WASH — no V, no lines, just blended radial ═══
    var wa = 0.14 + Math.sin(time * 0.8) * 0.03;

    var wash1 = ctx.createRadialGradient(cx, cy, 30, cx, cy + h * 0.1, w * 0.7);
    wash1.addColorStop(0, 'rgba(120,150,240,' + (wa * 1.2) + ')');
    wash1.addColorStop(0.1, 'rgba(90,120,210,' + wa + ')');
    wash1.addColorStop(0.3, 'rgba(60,85,170,' + (wa * 0.5) + ')');
    wash1.addColorStop(0.6, 'rgba(35,50,120,' + (wa * 0.2) + ')');
    wash1.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = wash1;
    ctx.fillRect(0, cy - 200, w, h - cy + 200);

    var wash2 = ctx.createRadialGradient(cx, cy + 30, 50, cx, cy + 60, w * 0.9);
    wash2.addColorStop(0, 'rgba(80,110,190,' + (wa * 0.6) + ')');
    wash2.addColorStop(0.2, 'rgba(50,70,140,' + (wa * 0.3) + ')');
    wash2.addColorStop(0.5, 'rgba(25,35,80,' + (wa * 0.12) + ')');
    wash2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = wash2;
    ctx.fillRect(0, cy - 100, w, h - cy + 100);

    // Warm streak
    var sk = 0.4 + Math.sin(time * 1.2) * 0.1;
    var hw = ctx.createLinearGradient(0, 0, w, 0);
    hw.addColorStop(0, 'rgba(255,180,80,0)');
    hw.addColorStop(0.15, 'rgba(255,190,100,' + (sk * 0.12) + ')');
    hw.addColorStop(0.4, 'rgba(255,210,140,' + (sk * 0.25) + ')');
    hw.addColorStop(0.55, 'rgba(255,245,210,' + sk + ')');
    hw.addColorStop(0.7, 'rgba(255,210,140,' + (sk * 0.25) + ')');
    hw.addColorStop(0.85, 'rgba(255,190,100,' + (sk * 0.12) + ')');
    hw.addColorStop(1, 'rgba(255,180,80,0)');
    ctx.fillStyle = hw;
    ctx.fillRect(0, cy - 3, w, 6);

    requestAnimationFrame(draw);
  }

  draw();
})();
