/* Nitesh Rawal portfolio: content rendering, theme, dock, contact form and the scroll-driven cosmos background. */
(function(){
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  function $(id){ return document.getElementById(id); }
  function esc(s){ return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function chips(arr){ return '<div class="tl-stack">' + arr.map(function(s){ return '<span class="chip">'+esc(s)+'</span>'; }).join('') + '</div>'; }

  /* ================= content: hero ================= */
  (function hero(){
    var el = $('heroName');
    el.setAttribute('aria-label', PROFILE.name); el.textContent = '';
    var i = 0;
    PROFILE.name.split(' ').forEach(function(word, wi){
      if (wi){ var sp = document.createElement('span'); sp.className = 'sp'; sp.setAttribute('aria-hidden','true'); el.appendChild(sp); }
      var w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden','true');
      word.split('').forEach(function(c){ var ch = document.createElement('span'); ch.className = 'ch'; ch.textContent = c; ch.style.setProperty('--i', i++); w.appendChild(ch); });
      el.appendChild(w);
    });
    $('heroRole').textContent = PROFILE.role + ' · ' + PROFILE.location;
    $('heroTag').textContent = PROFILE.tag;
    $('heroPhoto').src = PROFILE.photo;
    var links = $('heroLinks');
    Object.keys(PROFILE.links).forEach(function(k){ links.innerHTML += '<a href="'+esc(PROFILE.links[k])+'" target="_blank" rel="noopener">'+esc(k)+'</a>'; });
    var txt = '$ whoami', b = $('boot'), n = 0;
    if (reduced){ b.textContent = txt; return; }
    (function step(){ b.textContent = txt.slice(0, n) + (n < txt.length ? '▌' : ''); if (n++ < txt.length) setTimeout(step, 70); })();
  })();

  /* ================= content: sections ================= */
  var ag = $('aboutGrid');
  [PROFILE.about.slice(0,2), PROFILE.about.slice(2)].forEach(function(group){
    var d = document.createElement('div'); d.className = 'about-card reveal fl';
    d.innerHTML = group.map(function(p){ return '<p>'+esc(p)+'</p>'; }).join('');
    ag.appendChild(d);
  });

  CHAPTERS.forEach(function(c){
    var row = document.createElement('div'); row.className = 'tl-item reveal';
    row.innerHTML =
      '<div class="tl-yr">'+esc(c.yr)+'</div><div class="tl-dot"></div>' +
      '<div class="tl-card fl">' +
        '<div class="tl-head"><span class="tl-role">'+esc(c.role)+'</span><span class="tl-when">'+esc(c.when)+'</span></div>' +
        '<div class="tl-org">'+esc(c.org)+'</div>' +
        '<ul>'+c.pts.map(function(p){ return '<li>'+esc(p)+'</li>'; }).join('')+'</ul>' + chips(c.stack) + '</div>';
    $('timeline').appendChild(row);
  });

  PROJECTS.forEach(function(p, i){
    var el = document.createElement('div'); el.className = 'proj reveal fl';
    el.innerHTML = '<div class="pk">PROJECT 0'+(i+1)+' · '+esc(p.when)+'</div><h3>'+esc(p.name)+'</h3><div class="sub">'+esc(p.sub)+'</div>' +
      '<p class="what">'+esc(p.what)+'</p>' + chips(p.stack) + '<p class="note">'+esc(p.note)+'</p>';
    $('projects-grid').appendChild(el);
  });
  PERSONAL_PROJECTS.forEach(function(p){
    var el = document.createElement('div'); el.className = 'proj reveal fl';
    el.innerHTML = '<div class="pk">PERSONAL</div><h3>'+esc(p.name)+'</h3><div class="sub">'+esc(p.sub)+'</div><p class="what">'+esc(p.d)+'</p>' + chips(p.stack) +
      '<a class="btn" style="margin-top:16px" href="'+esc(p.url)+'" target="_blank" rel="noopener">View on GitHub →</a>';
    $('personal-grid').appendChild(el);
  });

  SKILL_GROUPS.forEach(function(g){
    var el = document.createElement('div'); el.className = 'skill-card reveal fl';
    el.innerHTML = '<h4>'+esc(g.name)+'</h4>' + g.items.map(function(s){
      return '<div class="meter"><div class="meter-top"><span>'+esc(s[0])+'</span><b>'+s[1]+'%</b></div><div class="meter-track"><div class="meter-fill" data-pct="'+s[1]+'"></div></div></div>';
    }).join('');
    $('skill-grid').appendChild(el);
  });
  $('skill-tags').innerHTML = SKILL_TAGS.map(function(t){ return '<span class="chip">'+esc(t)+'</span>'; }).join('');

  $('ai-card').className = 'ai-card reveal fl';
  $('ai-card').innerHTML = '<h2 class="h-sec">'+esc(AI_DEV.title)+'</h2>' + AI_DEV.paras.map(function(p){ return '<p>'+esc(p)+'</p>'; }).join('') +
    '<div class="ai-grid">' + AI_DEV.pills.map(function(p){ return '<div class="ai-pill"><b>'+esc(p[0])+'</b><span>'+esc(p[1])+'</span></div>'; }).join('') + '</div>';

  EDUCATION.forEach(function(e){
    var el = document.createElement('div'); el.className = 'edu-card reveal fl';
    el.innerHTML = '<div class="edu-when">'+esc(e.when)+'</div><h4>'+esc(e.org)+'</h4><div class="edu-deg">'+esc(e.deg)+'</div>';
    $('edu-grid').appendChild(el);
  });
  $('hobbyQuote').textContent = '“' + HOBBY_QUOTE + '”';
  HOBBIES.forEach(function(h){
    var el = document.createElement('div'); el.className = 'hobby reveal' + (h[2] ? ' fav' : '');
    el.innerHTML = '<b>'+esc(h[0])+'</b><span>'+esc(h[1])+'</span>' + (h[2] ? '<em>My favourite</em>' : '');
    $('hobby-row').appendChild(el);
  });
  PROOF.forEach(function(p){
    var el = document.createElement('div'); el.className = 'proof-card reveal fl';
    el.innerHTML = '<div class="proof-k">'+esc(p.k.toUpperCase())+'</div><h4>'+esc(p.name)+'</h4><div class="org">'+esc(p.org)+'</div>' + (p.d ? '<p>'+esc(p.d)+'</p>' : '');
    $('proof-grid').appendChild(el);
  });
  $('yr').textContent = new Date().getFullYear();

  /* ================= contact form (same Formspree setup as the previous portfolio) ================= */
  (function contact(){
    var form = $('contact-form'), status = $('contact-status'), submit = $('submit');
    var FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvkgpwrl';
    if (!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = $('first_name').value.trim(), email = $('email').value.trim(), subject = $('sub').value.trim(), message = $('textarea1').value.trim();
      if (!name || !email || !subject || !message){ status.className = 'contact-status error'; status.style.display = 'block'; status.textContent = 'Please fill in all the fields.'; return; }
      if (!$('email').checkValidity()){ status.className = 'contact-status error'; status.style.display = 'block'; status.textContent = 'Please enter a valid email address.'; return; }
      submit.setAttribute('disabled', 'disabled');
      status.className = 'contact-status'; status.style.display = 'block'; status.textContent = 'Sending message...';
      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, subject: subject, message: message })
      }).then(function(resp){
        if (resp.ok){
          status.className = 'contact-status'; status.style.display = 'block';
          status.textContent = "Thanks — your message was sent. I'll reply to you at " + email + '.';
          submit.textContent = 'Sent ✓';
          setTimeout(function(){ submit.textContent = 'Send message'; submit.removeAttribute('disabled'); }, 2200);
          form.reset();
        } else { return resp.json().then(function(data){ throw new Error(data.error || 'Send failed'); }); }
      }).catch(function(){
        status.className = 'contact-status error'; status.style.display = 'block';
        status.innerHTML = 'Sorry — we couldn\'t send your message. Please email me at <a href="mailto:nitesh.rawal401@gmail.com">nitesh.rawal401@gmail.com</a>.';
        submit.removeAttribute('disabled');
      });
    });
  })();

  /* ================= reveal on scroll ================= */
  var floaters = [];       // elements currently on screen that get the depth effect
  (function(){
    var els = document.querySelectorAll('.reveal, .fl');
    if (!('IntersectionObserver' in window)){ Array.prototype.forEach.call(els, function(e){ e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        var t = en.target;
        if (en.isIntersecting){
          if (t.classList.contains('reveal')){
            t.classList.add('in');
            Array.prototype.forEach.call(t.querySelectorAll('.meter-fill'), function(f){ f.style.width = f.getAttribute('data-pct') + '%'; });
          }
          if (t.classList.contains('fl') && floaters.indexOf(t) < 0) floaters.push(t);
        } else if (t.classList.contains('fl')){
          var i = floaters.indexOf(t); if (i >= 0) floaters.splice(i, 1);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    Array.prototype.forEach.call(els, function(e){ io.observe(e); });
  })();

  /* ================= theme ================= */
  var root = document.documentElement, themeBtn = $('themeBtn'), metaTheme = document.querySelector('meta[name="theme-color"]');
  function currentTheme(){ return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }
  function paintThemeUI(){
    var t = currentTheme();
    themeBtn.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    if (metaTheme) metaTheme.setAttribute('content', t === 'light' ? '#eef2f7' : '#05070b');
  }
  function setTheme(t, persist){
    root.setAttribute('data-theme', t);
    if (persist){ try { localStorage.setItem('theme', t); } catch(e){} }
    paintThemeUI();
    window.dispatchEvent(new CustomEvent('themechange', { detail: t }));
  }
  paintThemeUI();
  themeBtn.addEventListener('click', function(){ setTheme(currentTheme() === 'light' ? 'dark' : 'light', true); });
  var mq = window.matchMedia('(prefers-color-scheme: light)');
  var onScheme = function(e){ var saved = null; try { saved = localStorage.getItem('theme'); } catch(err){} if (!saved) setTheme(e.matches ? 'light' : 'dark', false); };
  if (mq.addEventListener) mq.addEventListener('change', onScheme); else if (mq.addListener) mq.addListener(onScheme);

  /* ================= dock + sheet + active section ================= */
  var menuBtn = $('menuBtn'), sheet = $('sheet'), scrim = $('scrim');
  function sheetOpen(){ return !sheet.hidden; }
  function openSheet(){
    sheet.hidden = false; scrim.hidden = false;
    requestAnimationFrame(function(){ sheet.classList.add('show'); scrim.classList.add('show'); });
    menuBtn.setAttribute('aria-expanded', 'true');
    var first = sheet.querySelector('a.active') || sheet.querySelector('a'); if (first) first.focus({ preventScroll: true });
  }
  function closeSheet(returnFocus){
    sheet.classList.remove('show'); scrim.classList.remove('show'); menuBtn.setAttribute('aria-expanded', 'false');
    setTimeout(function(){ if (!sheet.classList.contains('show')){ sheet.hidden = true; scrim.hidden = true; } }, reduced ? 0 : 260);
    if (returnFocus) menuBtn.focus({ preventScroll: true });
  }
  menuBtn.addEventListener('click', function(){ sheetOpen() ? closeSheet(false) : openSheet(); });
  scrim.addEventListener('click', function(){ closeSheet(false); });
  sheet.addEventListener('click', function(e){ if (e.target.closest('a')) closeSheet(false); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && sheetOpen()) closeSheet(true); });

  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('#dock a[data-k], #sheet a[data-k]'));
  var activeId = '';
  function updateActive(){
    var line = window.innerHeight * 0.4, cur = sections[0].id;
    sections.forEach(function(s){ if (s.getBoundingClientRect().top <= line) cur = s.id; });
    if (cur === activeId) return; activeId = cur;
    navLinks.forEach(function(l){ l.classList.toggle('active', l.getAttribute('href') === '#' + cur); });
  }

  /* ================= photo tilt ================= */
  (function(){
    var f = $('photoFrame'); if (!f || !finePointer || reduced) return;
    f.addEventListener('mousemove', function(e){
      var r = f.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      f.style.transform = 'perspective(900px) rotateY('+(x*10)+'deg) rotateX('+(-y*10)+'deg)';
    });
    f.addEventListener('mouseleave', function(){ f.style.transform = ''; });
  })();

  /* ================= shared scroll / pointer state ================= */
  var S = { p: 0, pointerX: 0, pointerY: 0, dirty: true };
  function readScroll(){
    var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    S.p = Math.min(1, Math.max(0, window.scrollY / max)); S.dirty = true;
  }
  var tick = false;
  window.addEventListener('scroll', function(){ readScroll(); if (tick) return; tick = true; requestAnimationFrame(function(){ tick = false; updateActive(); }); }, { passive: true });
  window.addEventListener('resize', function(){ readScroll(); updateActive(); });
  if (finePointer) window.addEventListener('pointermove', function(e){ S.pointerX = e.clientX / innerWidth - .5; S.pointerY = e.clientY / innerHeight - .5; S.dirty = true; }, { passive: true });
  readScroll(); updateActive();

  /* panels drift in depth as they cross the screen */
  var px = 0, py = 0;
  function floatPanels(){
    if (reduced) return;
    px += (S.pointerX - px) * .06; py += (S.pointerY - py) * .06;
    var vh = window.innerHeight, vw = window.innerWidth, amp = vw < 720 ? .55 : 1;
    for (var i = 0; i < floaters.length; i++){
      var el = floaters[i], r = el.getBoundingClientRect();
      var d = Math.max(-1, Math.min(1, ((r.top + r.height / 2) - vh / 2) / vh));
      var cx = ((r.left + r.width / 2) - vw / 2) / vw;
      el.style.setProperty('--fy', (d * -16 * amp).toFixed(1) + 'px');
      el.style.setProperty('--frx', (d * -3.4 * amp - py * 2).toFixed(2) + 'deg');
      el.style.setProperty('--fry', (px * 3 - cx * 3.2 * amp).toFixed(2) + 'deg');
    }
  }

  /* ================= cosmos background ================= */
  (function cosmos(){
    var canvas = $('bg');
    if (!window.THREE || !canvas){ document.body.classList.add('no-webgl'); return; }
    var T = THREE;
    var small = Math.min(innerWidth, innerHeight) < 700 || /Mobi|Android/i.test(navigator.userAgent);
    var renderer;
    try { renderer = new T.WebGLRenderer({ canvas: canvas, antialias: !small, alpha: true, powerPreference: 'high-performance' }); }
    catch(e){ document.body.classList.add('no-webgl'); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);

    var scene = new T.Scene();
    var camera = new T.PerspectiveCamera(40, 1, .1, 300); camera.position.set(0, 0, 14);
    var R = 2.4;

    function rnd(a, b){ return a + Math.random() * (b - a); }
    function canvasOf(w, h){ var c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

    /* procedural metallic surface: dark plates, panel seams, craters */
    function surfaceTexture(){
      var W = small ? 1024 : 2048, H = W / 2, c = canvasOf(W, H), g = c.getContext('2d'), k = W / 1024, i;
      var base = g.createLinearGradient(0, 0, 0, H);
      base.addColorStop(0, '#2a2c31'); base.addColorStop(.5, '#17181c'); base.addColorStop(1, '#25272c');
      g.fillStyle = base; g.fillRect(0, 0, W, H);
      for (i = 0; i < 520; i++){
        var l = rnd(40, 120) | 0;
        g.fillStyle = 'rgba(' + l + ',' + (l + 3) + ',' + (l + 8) + ',' + rnd(.02, .07) + ')';
        g.fillRect(rnd(0, W), rnd(0, H), rnd(20, 150) * k, rnd(10, 80) * k);
      }
      g.strokeStyle = 'rgba(170,175,185,.07)'; g.lineWidth = 1 * k;
      for (var y = 0; y < H; y += 64 * k){ g.beginPath(); g.moveTo(0, y + rnd(-3, 3)); g.lineTo(W, y + rnd(-3, 3)); g.stroke(); }
      for (var x = 0; x < W; x += 96 * k){ g.beginPath(); g.moveTo(x + rnd(-3, 3), 0); g.lineTo(x + rnd(-3, 3), H); g.stroke(); }
      for (i = 0; i < 60; i++){
        var cx = rnd(0, W), cy = rnd(0, H), r = rnd(6, 38) * k;
        var gr = g.createRadialGradient(cx, cy, r * .1, cx, cy, r);
        gr.addColorStop(0, 'rgba(0,0,0,.28)'); gr.addColorStop(.8, 'rgba(0,0,0,.06)'); gr.addColorStop(1, 'rgba(200,204,212,.1)');
        g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, r, 0, 6.2832); g.fill();
      }
      var t = new T.CanvasTexture(c); t.wrapS = T.RepeatWrapping; t.anisotropy = 4; return t;
    }
    /* thin molten fissures: the volcanic glow under the metal */
    function veinTexture(){
      var W = 1024, H = 512, c = canvasOf(W, H), g = c.getContext('2d');
      g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
      g.lineCap = 'round'; g.shadowColor = '#ff4a1c'; g.shadowBlur = 8;
      for (var i = 0; i < 46; i++){
        var x = rnd(0, W), y = rnd(0, H), a = rnd(0, 6.28);
        g.strokeStyle = 'rgba(255,' + (70 + rnd(0, 60) | 0) + ',30,' + rnd(.35, .85) + ')'; g.lineWidth = rnd(.8, 2);
        g.beginPath(); g.moveTo(x, y);
        for (var s = 0, n = 6 + (Math.random() * 12 | 0); s < n; s++){ a += rnd(-.9, .9); x += Math.cos(a) * rnd(12, 34); y += Math.sin(a) * rnd(8, 24); g.lineTo(x, y); }
        g.stroke();
      }
      var t = new T.CanvasTexture(c); t.wrapS = T.RepeatWrapping; return t;
    }
    function glowTexture(){
      var c = canvasOf(64, 64), g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.25, 'rgba(255,255,255,.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new T.CanvasTexture(c);
    }

    var surf = surfaceTexture(), veins = veinTexture(), glowTex = glowTexture();
    var world = new T.Group(); scene.add(world);      // moves with scroll
    var planet = new T.Mesh(
      new T.SphereGeometry(R, small ? 56 : 112, small ? 40 : 80),
      new T.MeshPhongMaterial({ map: surf, bumpMap: surf, bumpScale: .9, specular: 0x4a4e58, shininess: 20, emissive: 0xffffff, emissiveMap: veins, emissiveIntensity: .6 })
    );
    world.add(planet);

    var atmoMat = new T.ShaderMaterial({
      uniforms: { uColor: { value: new T.Color(0x5a2a16) }, uStrength: { value: .75 } },
      vertexShader: 'varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'varying vec3 vN; uniform vec3 uColor; uniform float uStrength; void main(){ float i = pow(clamp(-vN.z / 0.55, 0.0, 1.0), 3.2); gl_FragColor = vec4(uColor, i * uStrength); }',
      side: T.BackSide, transparent: true, depthWrite: false, blending: T.AdditiveBlending
    });
    world.add(new T.Mesh(new T.SphereGeometry(R * 1.2, 48, 32), atmoMat));

    var ambient = new T.AmbientLight(0x1c1f26, 1.1), key = new T.DirectionalLight(0xd4d9e4, .95), rim = new T.DirectionalLight(0x7a3a22, 1.2);
    key.position.set(-6, 3.5, 6); rim.position.set(6, -1, -7); scene.add(ambient, key, rim);

    /* razor-thin orbit rings with a bright body travelling on each */
    var orbitGroup = new T.Group(); world.add(orbitGroup);
    var defs = [
      { a: 3.7, b: 3.3, tilt: .35, rot: .2, sp: .16, off: 0 },
      { a: 4.7, b: 4.0, tilt: -.55, rot: 1.1, sp: -.11, off: 2 },
      { a: 5.9, b: 5.1, tilt: .85, rot: -.4, sp: .08, off: 4 },
      { a: 7.5, b: 6.3, tilt: -.25, rot: 2.0, sp: -.06, off: 1 },
      { a: 9.6, b: 8.4, tilt: .15, rot: .6, sp: .04, off: 3 }
    ];
    var orbits = defs.map(function(d, idx){
      var pts = [], n = 256;
      for (var i = 0; i < n; i++){ var t = i / n * 6.2832; pts.push(new T.Vector3(Math.cos(t) * d.a, Math.sin(t) * d.b, 0)); }
      var g = new T.Group(); g.rotation.x = d.tilt; g.rotation.z = d.rot;
      var line = new T.LineLoop(new T.BufferGeometry().setFromPoints(pts), new T.LineBasicMaterial({ color: 0x4d3b36, transparent: true, opacity: .6, blending: T.AdditiveBlending, depthWrite: false }));
      var head = new T.Sprite(new T.SpriteMaterial({ map: glowTex, color: 0xb5481f, transparent: true, blending: T.AdditiveBlending, depthWrite: false }));
      head.scale.setScalar(idx % 2 ? .5 : .38);
      g.add(line, head); orbitGroup.add(g);
      return { d: d, g: g, line: line, head: head };
    });
    var moons = [0, 2].map(function(oi, k){
      var m = new T.Mesh(new T.SphereGeometry(k ? .13 : .2, 24, 16), new T.MeshPhongMaterial({ color: 0x586274, specular: 0x9db6e0, shininess: 40 }));
      orbits[oi].g.add(m); return { m: m, o: orbits[oi], off: k ? 1.3 : 3.6 };
    });

    /* stars: depth-sorted sizes give a cheap depth-of-field (far = pin sharp, near = soft bokeh) */
    function starField(count, rMin, rMax, sMin, sMax, soft){
      var pos = new Float32Array(count * 3), size = new Float32Array(count), ph = new Float32Array(count);
      for (var i = 0; i < count; i++){
        var r = rnd(rMin, rMax), th = rnd(0, 6.2832), cp = rnd(-1, 1), sp = Math.sqrt(1 - cp * cp);
        pos[i*3] = r * sp * Math.cos(th) * 1.5; pos[i*3+1] = r * cp * .8; pos[i*3+2] = -Math.abs(r * sp * Math.sin(th)) - 6;
        size[i] = rnd(sMin, sMax); ph[i] = rnd(0, 6.28);
      }
      var geo = new T.BufferGeometry();
      geo.setAttribute('position', new T.BufferAttribute(pos, 3)); geo.setAttribute('size', new T.BufferAttribute(size, 1)); geo.setAttribute('phase', new T.BufferAttribute(ph, 1));
      var mat = new T.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uPR: { value: renderer.getPixelRatio() }, uColor: { value: new T.Color(0xcfd2da) }, uAlpha: { value: 1 }, uSoft: { value: soft } },
        vertexShader: 'attribute float size; attribute float phase; uniform float uTime; uniform float uPR; varying float vA; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix * mv; gl_PointSize = size * uPR * (300.0 / -mv.z); vA = 0.65 + 0.35 * sin(uTime * 0.8 + phase); }',
        fragmentShader: 'uniform vec3 uColor; uniform float uAlpha; uniform float uSoft; varying float vA; void main(){ float d = length(gl_PointCoord - 0.5); float a = pow(smoothstep(0.5, 0.0, d), mix(2.2, 0.9, uSoft)); gl_FragColor = vec4(uColor, a * vA * uAlpha); }',
        transparent: true, depthWrite: false, blending: T.AdditiveBlending
      });
      var pts = new T.Points(geo, mat); scene.add(pts); return pts;
    }
    var starsFar = starField(small ? 500 : 1300, 40, 120, .5, 1.5, 0);
    var starsMid = starField(small ? 70 : 180, 22, 50, 1.6, 3.4, .35);
    var bokeh = starField(small ? 10 : 22, 14, 30, 7, 18, 1);
    bokeh.material.uniforms.uAlpha.value = .09;

    /* ---- theme palette ---- */
    var PAL = {
      dark:  { blend: T.AdditiveBlending, star: 0xcfd2da, starA: .9, orbit: 0x4d3b36, orbitO: .85, head: 0xb5481f, atmo: 0x5a2a16, atmoS: .5,  amb: 0x1c1f26, ambI: 1.1, key: 0xd4d9e4, keyI: .95, rim: 0x7a3a22, rimI: 1.2, glow: .6 },
      light: { blend: T.NormalBlending,   star: 0x3a3f4a, starA: .45, orbit: 0x1b1b20, orbitO: .6, head: 0x3a2a26, atmo: 0x8a8f9a, atmoS: .35, amb: 0x8c93a1, ambI: 1.5, key: 0xffffff, keyI: 1.9, rim: 0xd9c9c0, rimI: .9, glow: .22 }
    };
    function applyPalette(){
      var p = PAL[currentTheme()];
      [starsFar, starsMid, bokeh].forEach(function(s, i){ s.material.blending = p.blend; s.material.uniforms.uColor.value.setHex(p.star); s.material.uniforms.uAlpha.value = (i === 2 ? .09 : 1) * p.starA; s.material.needsUpdate = true; });
      orbits.forEach(function(o){ o.line.material.color.setHex(p.orbit); o.line.material.opacity = p.orbitO; o.line.material.blending = p.blend; o.line.material.needsUpdate = true;
        o.head.material.color.setHex(p.head); o.head.material.blending = p.blend; o.head.material.needsUpdate = true; });
      atmoMat.uniforms.uColor.value.setHex(p.atmo); atmoMat.uniforms.uStrength.value = p.atmoS; atmoMat.blending = p.blend; atmoMat.needsUpdate = true;
      ambient.color.setHex(p.amb); ambient.intensity = p.ambI; key.color.setHex(p.key); key.intensity = p.keyI; rim.color.setHex(p.rim); rim.intensity = p.rimI;
      planet.material.emissiveIntensity = p.glow;
      S.dirty = true;
    }
    applyPalette(); window.addEventListener('themechange', applyPalette);

    /* ---- the journey: where the planet sits as you scroll ---- */
    var K = [
      { p: 0,   x:  .78, y: -.52, s: 1.55, ry: 0,   rx: .18, cz: 14,   ot: 0   },
      { p: .2,  x: -.62, y:  .12, s: .95,  ry: 1.3, rx: .28, cz: 13,   ot: .5  },
      { p: .45, x:  .66, y: -.06, s: 1.05, ry: 2.6, rx: .08, cz: 12.5, ot: 1.0 },
      { p: .72, x: -.58, y:  .1,  s: .9,   ry: 3.9, rx: .22, cz: 14,   ot: 1.6 },
      { p: 1,   x:  .1,  y:  .42, s: 1.3,  ry: 5.3, rx: .32, cz: 11,   ot: 2.3 }
    ];
    var cur = { x: K[0].x, y: K[0].y, s: K[0].s, ry: 0, rx: .18, cz: 14, ot: 0 };
    function target(p){
      var i = 0; while (i < K.length - 2 && p > K[i + 1].p) i++;
      var a = K[i], b = K[i + 1], t = Math.min(1, Math.max(0, (p - a.p) / (b.p - a.p))); t = t * t * (3 - 2 * t);
      var o = {}; for (var k in cur) o[k] = a[k] + (b[k] - a[k]) * t; return o;
    }

    var W = 0, H = 0;
    function resize(){
      var w = innerWidth, h = innerHeight;
      if (small && w === W && Math.abs(h - H) < 160) return;
      W = w; H = h; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      [starsFar, starsMid, bokeh].forEach(function(s){ s.material.uniforms.uPR.value = renderer.getPixelRatio(); }); S.dirty = true;
    }
    resize(); window.addEventListener('resize', resize);

    var clock = new T.Clock(), time = 0, raf = 0, orbitSpin = 0;
    function frame(dt, snap){
      time += dt;
      var tg = target(S.p), k = snap ? 1 : 1 - Math.exp(-dt * 2.6);
      for (var key2 in cur) cur[key2] += (tg[key2] - cur[key2]) * k;
      var halfH = Math.tan(camera.fov * Math.PI / 360) * 14, halfW = halfH * camera.aspect, narrow = camera.aspect < .95;
      var ms = Math.min(1, Math.max(.55, camera.aspect / 1.5));
      world.position.set(narrow ? cur.x * halfW * .5 : cur.x * halfW, cur.y * halfH + (narrow ? halfH * .3 : 0), 0);
      world.scale.setScalar(cur.s * ms * (narrow ? .85 : 1));
      planet.rotation.y = cur.ry + time * .035; planet.rotation.x = cur.rx;
      orbitSpin += dt * .02; orbitGroup.rotation.y = cur.ot + orbitSpin; orbitGroup.rotation.x = Math.sin(cur.ot * .7) * .25;
      orbits.forEach(function(o){ var a = time * o.d.sp + o.d.off; o.head.position.set(Math.cos(a) * o.d.a, Math.sin(a) * o.d.b, 0); });
      moons.forEach(function(m){ var a = time * m.o.d.sp * 1.4 + m.off; m.m.position.set(Math.cos(a) * m.o.d.a, Math.sin(a) * m.o.d.b, 0); });
      starsFar.rotation.y = S.p * .5 + time * .004; starsMid.rotation.y = S.p * .9 + time * .007; bokeh.rotation.y = S.p * 1.6; bokeh.position.y = S.p * 3;
      [starsFar, starsMid, bokeh].forEach(function(s){ s.material.uniforms.uTime.value = time; });
      camera.position.x += ((S.pointerX * .9) - camera.position.x) * .05; camera.position.y += ((-S.pointerY * .55) - camera.position.y) * .05;
      camera.position.z = cur.cz; camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }

    function loop(){
      var dt = Math.min(.05, clock.getDelta());
      frame(dt, false); floatPanels(); S.dirty = false;
      raf = requestAnimationFrame(loop);
    }
    if (reduced){
      var pending = false;
      var once = function(){ if (pending) return; pending = true; requestAnimationFrame(function(){ pending = false; frame(0, true); }); };
      frame(0, true); window.addEventListener('scroll', once, { passive: true }); window.addEventListener('resize', once); window.addEventListener('themechange', once);
    } else {
      clock.start(); loop();
      document.addEventListener('visibilitychange', function(){
        if (document.hidden){ cancelAnimationFrame(raf); } else { clock.getDelta(); raf = requestAnimationFrame(loop); }
      });
    }
  })();
})();
