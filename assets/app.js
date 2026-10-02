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
	if (window.gtag) gtag('event', 'contact_form_submit');
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
  var S = { p: 0, pointerX: 0, pointerY: 0, mx: 0, my: 0, px: 0, py: 0, present: false, pulseReq: null, dirty: true };
  function readScroll(){
    var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    S.p = Math.min(1, Math.max(0, window.scrollY / max)); S.dirty = true;
  }
  var tick = false;
  window.addEventListener('scroll', function(){ readScroll(); if (tick) return; tick = true; requestAnimationFrame(function(){ tick = false; updateActive(); }); }, { passive: true });
  window.addEventListener('resize', function(){ readScroll(); updateActive(); });
  /* pointer position feeds the galaxy (mouse, pen or finger); only a real mouse tilts the panels */
  function setPointer(x, y, mouse){
    S.px = x; S.py = y; S.mx = x / innerWidth * 2 - 1; S.my = -(y / innerHeight * 2 - 1); S.present = true;
    if (mouse){ S.pointerX = x / innerWidth - .5; S.pointerY = y / innerHeight - .5; }
    S.dirty = true;
  }
  if (!reduced){
    window.addEventListener('pointermove', function(e){ setPointer(e.clientX, e.clientY, e.pointerType === 'mouse'); }, { passive: true });
    window.addEventListener('pointerdown', function(e){ setPointer(e.clientX, e.clientY, e.pointerType === 'mouse'); S.pulseReq = { x: S.mx, y: S.my }; }, { passive: true });
    window.addEventListener('pointerup', function(e){ if (e.pointerType !== 'mouse') setTimeout(function(){ S.present = false; }, 400); }, { passive: true });
    window.addEventListener('touchmove', function(e){ var t = e.touches && e.touches[0]; if (t) setPointer(t.clientX, t.clientY, false); }, { passive: true });
    document.addEventListener('mouseout', function(e){ if (!e.relatedTarget) S.present = false; });
  }
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

  /* ================= cosmos: a real-looking Earth, filmed by a camera that follows your scroll ================= */
  (function cosmos(){
    var canvas = $('bg');
    if (!window.THREE || !canvas){ document.body.classList.add('no-webgl'); return; }
    var T = THREE, D2R = Math.PI / 180;
    var small = Math.min(innerWidth, innerHeight) < 700 || /Mobi|Android/i.test(navigator.userAgent);
    var renderer;
    try { renderer = new T.WebGLRenderer({ canvas: canvas, antialias: !small, alpha: true, powerPreference: 'high-performance' }); }
    catch(e){ document.body.classList.add('no-webgl'); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    canvas.addEventListener('webglcontextlost', function(e){ e.preventDefault(); document.body.classList.add('no-webgl'); }, false);
    canvas.addEventListener('webglcontextrestored', function(){ document.body.classList.remove('no-webgl'); S.dirty = true; }, false);

    var scene = new T.Scene(), camera = new T.PerspectiveCamera(36, 1, .1, 600); scene.add(camera);
    var R = 5;                                                     // Earth radius in scene units
    var SUN = new T.Vector3(-.86, .30, -.42).normalize();          // direction towards the sun
    function rnd(a, b){ return a + Math.random() * (b - a); }
    function clamp(v, a, b){ return Math.min(b, Math.max(a, v)); }
    function ease(t){ return t * t * (3 - 2 * t); }

    /* ---- textures (self-hosted; lighter set on phones) ---- */
    var q = small ? '1k' : '2k', base = 'assets/earth/', maxAn = Math.min(8, renderer.capabilities.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 1);
    var pending = 0, loaded = false, loadedAt = 0, TL = new T.TextureLoader();
    function tex(file, repeat){
      pending++;
      var t = TL.load(base + file, function(){ done(); }, undefined, function(){ done(); });
      t.anisotropy = maxAn; if (repeat) t.wrapS = T.RepeatWrapping; return t;
    }
    function done(){ if (--pending === 0){ loaded = true; loadedAt = time; S.dirty = true; } }
    var tDay = tex('day_' + q + '.jpg', true), tSpec = tex('spec_' + q + '.jpg', true), tNight = tex('night_' + q + '.jpg', true);
    var tClouds = tex(small ? 'clouds_512.jpg' : 'clouds_1k.jpg', true), tMoon = tex(small ? 'moon_512.jpg' : 'moon_1k.jpg', false);

    /* ---- Earth: day map, ocean sun-glint, city lights on the night side, warm twilight band ---- */
    var seg = small ? [64, 44] : [128, 88];
    var earthU = { tDay: { value: tDay }, tSpec: { value: tSpec }, tNight: { value: tNight }, uSun: { value: new T.Vector3() }, uAmb: { value: .05 }, uCity: { value: 1 } };
    var earthMat = new T.ShaderMaterial({
      uniforms: earthU,
      vertexShader: 'varying vec2 vUv; varying vec3 vN; varying vec3 vV; void main(){ vUv = uv; vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }',
      fragmentShader: [
        'uniform sampler2D tDay; uniform sampler2D tSpec; uniform sampler2D tNight; uniform vec3 uSun; uniform float uAmb; uniform float uCity;',
        'varying vec2 vUv; varying vec3 vN; varying vec3 vV;',
        'void main(){',
        '  vec3 N = normalize(vN), V = normalize(vV), L = normalize(uSun);',
        '  float ndl = dot(N, L);',
        '  vec3 day = texture2D(tDay, vUv).rgb; float sp = texture2D(tSpec, vUv).r; vec3 night = texture2D(tNight, vUv).rgb;',
        '  float lit = max(ndl, 0.0), dayMix = smoothstep(-0.08, 0.2, ndl);',
        '  vec3 col = day * (uAmb + 1.28 * lit);',
        '  vec3 H = normalize(L + V); col += vec3(1.0, 0.92, 0.8) * pow(max(dot(N, H), 0.0), 180.0) * sp * 0.75 * step(0.0, ndl);',
        '  float tw = exp(-pow((ndl - 0.03) / 0.09, 2.0)); col += vec3(1.0, 0.42, 0.14) * tw * 0.16 * day.b;',
        '  col += night * vec3(1.0, 0.76, 0.46) * (1.0 - smoothstep(-0.06, 0.16, ndl)) * 1.35 * uCity;',
        '  float fr = pow(1.0 - max(dot(N, V), 0.0), 3.2); col += vec3(0.30, 0.52, 0.95) * fr * (0.12 + 0.88 * smoothstep(-0.35, 0.5, ndl)) * 0.9;',
        '  gl_FragColor = vec4(col, 1.0);',
        '}'].join('\n')
    });
    var tilt = new T.Group(); tilt.rotation.z = -.41; scene.add(tilt);
    var earth = new T.Mesh(new T.SphereGeometry(R, seg[0], seg[1]), earthMat); tilt.add(earth);

    var cloudU = { tClouds: { value: tClouds }, uSun: earthU.uSun };
    var cloudMat = new T.ShaderMaterial({
      uniforms: cloudU, transparent: true, depthWrite: false,
      vertexShader: 'varying vec2 vUv; varying vec3 vN; void main(){ vUv = uv; vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform sampler2D tClouds; uniform vec3 uSun; varying vec2 vUv; varying vec3 vN; void main(){ float c = texture2D(tClouds, vUv).r; float l = smoothstep(-0.12, 0.35, dot(normalize(vN), normalize(uSun))); gl_FragColor = vec4(vec3(1.0) * (0.035 + 1.05 * l), c * 0.9); }'
    });
    var clouds = new T.Mesh(new T.SphereGeometry(R * 1.012, seg[0], seg[1]), cloudMat); tilt.add(clouds);

    var atmoU = { uColor: { value: new T.Color(0x4f8dff) }, uStrength: { value: 1.0 }, uSun: earthU.uSun };
    var atmoMat = new T.ShaderMaterial({
      uniforms: atmoU, side: T.BackSide, transparent: true, depthWrite: false, blending: T.AdditiveBlending,
      vertexShader: 'varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'varying vec3 vN; uniform vec3 uColor; uniform float uStrength; uniform vec3 uSun; void main(){ float i = pow(smoothstep(0.0, 0.36, -vN.z), 1.7); float s = dot(normalize(vN), normalize(uSun)) * 0.5 + 0.5; gl_FragColor = vec4(uColor, i * uStrength * (0.1 + 0.9 * smoothstep(0.3, 0.85, s))); }'
    });
    scene.add(new T.Mesh(new T.SphereGeometry(R * 1.075, 64, 48), atmoMat));

    /* ---- the Moon, parked in the distance ---- */
    var sunLight = new T.DirectionalLight(0xfff2e0, 1.6); sunLight.position.copy(SUN).multiplyScalar(100); scene.add(sunLight, new T.AmbientLight(0x20242c, .6));
    var moon = new T.Mesh(new T.SphereGeometry(2.4, 40, 28), new T.MeshPhongMaterial({ map: tMoon, shininess: 4, specular: 0x111111, emissive: 0x1a1c20 })); scene.add(moon);

    /* ---- sun: a glow that Earth really occludes, so it rises over the limb ---- */
    function glowTexture(){
      var c = document.createElement('canvas'); c.width = c.height = 128; var g = c.getContext('2d'), gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.12, 'rgba(255,236,205,.8)'); gr.addColorStop(.4, 'rgba(255,170,90,.22)'); gr.addColorStop(1, 'rgba(255,140,60,0)');
      g.fillStyle = gr; g.fillRect(0, 0, 128, 128); return new T.CanvasTexture(c);
    }
    var gt = glowTexture(), sunPos = SUN.clone().multiplyScalar(320);
    function sprite(size, op){ var s = new T.Sprite(new T.SpriteMaterial({ map: gt, transparent: true, depthWrite: false, blending: T.AdditiveBlending, opacity: op })); s.scale.setScalar(size); s.position.copy(sunPos); scene.add(s); return s; }
    var sunSprites = [sprite(300, .32), sprite(90, .9), sprite(26, 1)];

    /* lens-flare ghosts are plain elements so they stay cheap */
    var flareEls = [], flareDefs = [[.0, 90, 'rgba(255,214,160,.55)'], [.45, 54, 'rgba(255,170,110,.22)'], [.8, 120, 'rgba(255,200,150,.14)'], [1.35, 40, 'rgba(255,255,255,.2)']];
    flareDefs.forEach(function(d){
      var e = document.createElement('div'); e.className = 'fg'; e.setAttribute('aria-hidden', 'true');
      e.style.width = e.style.height = d[1] + 'px'; e.style.marginLeft = e.style.marginTop = (-d[1] / 2) + 'px'; e.style.background = 'radial-gradient(circle, ' + d[2] + ' 0%, rgba(255,160,90,0) 70%)';
      document.body.appendChild(e); flareEls.push(e);
    });

    /* ---- the galaxy reacts to the pointer: nearby stars swirl, flare and warm up; a tap sends a ripple through them ---- */
    var fx = !reduced;
    var MU = { uMouse: { value: new T.Vector2(9, 9) }, uForce: { value: 0 }, uPulsePos: { value: new T.Vector2(9, 9) }, uPulseAge: { value: 99 }, uAsp: { value: 1 } };
    var WARP = 'uniform vec2 uMouse; uniform float uForce; uniform vec2 uPulsePos; uniform float uPulseAge; uniform float uAsp;' +
      'vec4 warp(vec4 clip, out float boost){ vec2 ndc = clip.xy / clip.w; boost = 0.0; vec2 off = vec2(0.0);' +
      ' vec2 d = ndc - uMouse; d.x *= uAsp; float r = length(d); float f = exp(-r * r * 6.0) * uForce; vec2 dir = d / (r + 0.0001); vec2 tang = vec2(-dir.y, dir.x);' +
      ' off += (tang * 0.12 + dir * 0.07) * f; boost += f;' +
      ' vec2 pd = ndc - uPulsePos; pd.x *= uAsp; float pl = length(pd); float ring = exp(-pow((pl - uPulseAge * 0.85) / 0.08, 2.0)) * exp(-uPulseAge * 1.1);' +
      ' off += pd / (pl + 0.0001) * ring * 0.06; boost += ring * 1.4;' +
      ' off.x /= uAsp; clip.xy += off * clip.w; return clip; }';

    /* ---- stars, a faint Milky Way band, and dust that streams past the lens as you scroll ---- */
    function pointsMat(extra){
      var m = new T.ShaderMaterial({
        uniforms: Object.assign({ uTime: { value: 0 }, uPR: { value: renderer.getPixelRatio() }, uColor: { value: new T.Color(0xd8dae0) }, uAlpha: { value: 1 } }, MU, extra || {}),
        vertexShader: WARP + 'attribute float size; attribute float phase; uniform float uTime; uniform float uPR; varying float vA; varying float vB; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); float b; gl_Position = warp(projectionMatrix * mv, b); gl_PointSize = size * uPR * (300.0 / -mv.z) * (1.0 + b * 1.4); vA = (0.7 + 0.3 * sin(uTime * 0.9 + phase)) * (1.0 + b * 1.8); vB = clamp(b, 0.0, 1.0); }',
        fragmentShader: 'uniform vec3 uColor; uniform float uAlpha; varying float vA; varying float vB; void main(){ float d = length(gl_PointCoord - 0.5); float a = pow(smoothstep(0.5, 0.0, d), 1.8); vec3 c = mix(uColor, vec3(1.0, 0.82, 0.58), vB * 0.65); gl_FragColor = vec4(c, a * vA * uAlpha); }',
        transparent: true, depthWrite: false, blending: T.AdditiveBlending
      });
      return m;
    }
    function starField(count, sMin, sMax, bandAxis, spread){
      var pos = new Float32Array(count * 3), size = new Float32Array(count), ph = new Float32Array(count);
      for (var i = 0; i < count; i++){
        var v = new T.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)).normalize();
        if (bandAxis){ v.addScaledVector(bandAxis, -v.dot(bandAxis) * (1 - spread)).normalize(); }
        v.multiplyScalar(rnd(230, 330)); pos[i*3] = v.x; pos[i*3+1] = v.y; pos[i*3+2] = v.z; size[i] = rnd(sMin, sMax) * (230 / 300); ph[i] = rnd(0, 6.28);
      }
      var geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(pos, 3)); geo.setAttribute('size', new T.BufferAttribute(size, 1)); geo.setAttribute('phase', new T.BufferAttribute(ph, 1));
      var p = new T.Points(geo, pointsMat()); p.frustumCulled = false; scene.add(p); return p;
    }
    var band = new T.Vector3(.3, 1, .45).normalize();
    var starsA = starField(small ? 1300 : 3400, 1.0, 3.0, null, 1);
    var milky = starField(small ? 900 : 2800, .8, 1.8, band, .07); milky.material.uniforms.uAlpha.value = .5;
    var dustN = small ? 90 : 240, dpos = new Float32Array(dustN * 3), dsz = new Float32Array(dustN), dph = new Float32Array(dustN), RANGE = 90;
    for (var di = 0; di < dustN; di++){ dpos[di*3] = rnd(-26, 26); dpos[di*3+1] = rnd(-15, 15); dpos[di*3+2] = rnd(0, RANGE); dsz[di] = rnd(.25, .9); dph[di] = rnd(0, 6.28); }
    var dgeo = new T.BufferGeometry(); dgeo.setAttribute('position', new T.BufferAttribute(dpos, 3)); dgeo.setAttribute('size', new T.BufferAttribute(dsz, 1)); dgeo.setAttribute('phase', new T.BufferAttribute(dph, 1));
    var dustMat = pointsMat({ uOff: { value: 0 }, uRange: { value: RANGE } });
    dustMat.vertexShader = WARP + 'attribute float size; attribute float phase; uniform float uTime; uniform float uPR; uniform float uOff; uniform float uRange; varying float vA; varying float vB; void main(){ vec3 p = position; float z = mod(p.z - uOff, uRange); p.z = -z - 2.0; vec4 mv = modelViewMatrix * vec4(p,1.0); float b; gl_Position = warp(projectionMatrix * mv, b); gl_PointSize = size * uPR * (240.0 / -mv.z) * (1.0 + b * 1.2); vA = smoothstep(0.0, 8.0, z) * smoothstep(uRange, uRange - 16.0, z) * (1.0 + b * 1.5); vB = clamp(b, 0.0, 1.0); }';
    var dust = new T.Points(dgeo, dustMat); dust.frustumCulled = false; camera.add(dust);
    var starMats = [starsA.material, milky.material];

    var TN = small ? 70 : 140, tPos = new Float32Array(TN * 3), tAge = new Float32Array(TN), tSize = new Float32Array(TN), tp = [], tNext = 0;
    for (var ti = 0; ti < TN; ti++){ tAge[ti] = 1; tp.push({ x: 0, y: 0, vx: 0, vy: 0, age: 9, life: 1 }); }
    var tgeo = new T.BufferGeometry();
    tgeo.setAttribute('position', new T.BufferAttribute(tPos, 3)); tgeo.setAttribute('aAge', new T.BufferAttribute(tAge, 1)); tgeo.setAttribute('aSize', new T.BufferAttribute(tSize, 1));
    var trailMat = new T.ShaderMaterial({
      uniforms: { uPR: { value: renderer.getPixelRatio() }, uColor: { value: new T.Color(0xffd9a8) }, uAlpha: { value: .9 } },
      vertexShader: 'attribute float aAge; attribute float aSize; uniform float uPR; varying float vA; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix * mv; gl_PointSize = aSize * uPR * (1.0 - aAge * 0.55) * (300.0 / -mv.z); vA = pow(clamp(1.0 - aAge, 0.0, 1.0), 1.5); }',
      fragmentShader: 'uniform vec3 uColor; uniform float uAlpha; varying float vA; void main(){ vec2 c = gl_PointCoord - 0.5; float d = length(c); float a = pow(smoothstep(0.5, 0.0, d), 2.2); float spike = max(0.0, 1.0 - abs(c.x) * 14.0) * max(0.0, 1.0 - abs(c.y) * 2.2) + max(0.0, 1.0 - abs(c.y) * 14.0) * max(0.0, 1.0 - abs(c.x) * 2.2); gl_FragColor = vec4(uColor, (a + spike * 0.35) * vA * uAlpha); }',
      transparent: true, depthWrite: false, blending: T.AdditiveBlending
    });
    var trail = new T.Points(tgeo, trailMat); trail.frustumCulled = false; camera.add(trail);
    function spawn(px, py, mvx, mvy){
      var p = tp[tNext]; tNext = (tNext + 1) % TN;
      p.x = px / innerWidth * 2 - 1 + rnd(-.012, .012); p.y = -(py / innerHeight * 2 - 1) + rnd(-.012, .012);
      p.vx = -mvx * .02 + rnd(-.05, .05); p.vy = -mvy * .02 + rnd(-.05, .05) - .01; p.age = 0; p.life = rnd(.8, 1.7); tSize[tNext === 0 ? TN - 1 : tNext - 1] = rnd(.5, 1.7);
    }

    /* ---- theme ---- */
    var PAL = {
      dark:  { blend: T.AdditiveBlending, star: 0xd8dae0, starA: 1,   dust: 0xfff0e0, dustA: .5,  amb: .05, city: 1, atmo: 0x4f8dff, atmoS: 1,   flare: 1, sun: 1, dim: .72, trail: 0xffd9a8, trailA: .75 },
      light: { blend: T.NormalBlending,   star: 0x39404f, starA: .4,  dust: 0x39404f, dustA: .22, amb: .2,  city: 0, atmo: 0x6fa6ff, atmoS: .55, flare: 0, sun: 0, dim: .7, trail: 0x39404f, trailA: .55 }
    };
    var pal = PAL.dark;
    function applyPalette(){
      pal = PAL[currentTheme()];
      starMats.forEach(function(m, i){ m.blending = pal.blend; m.uniforms.uColor.value.setHex(pal.star); m.uniforms.uAlpha.value = (i ? .5 : 1) * pal.starA; m.needsUpdate = true; });
      dustMat.blending = pal.blend; dustMat.uniforms.uColor.value.setHex(pal.dust); dustMat.uniforms.uAlpha.value = pal.dustA; dustMat.needsUpdate = true;
      trailMat.blending = pal.blend; trailMat.uniforms.uColor.value.setHex(pal.trail); trailMat.uniforms.uAlpha.value = pal.trailA; trailMat.needsUpdate = true;
      earthU.uAmb.value = pal.amb; earthU.uCity.value = pal.city;
      atmoU.uColor.value.setHex(pal.atmo); atmoU.uStrength.value = pal.atmoS; atmoMat.blending = pal.blend; atmoMat.needsUpdate = true;
      sunSprites.forEach(function(s){ s.visible = !!pal.sun; });
      S.dirty = true;
    }
    applyPalette(); window.addEventListener('themechange', applyPalette);

    /* ---- the shots: where the camera is at each point of the page ----
       az/el = angle around Earth, dist = distance, sx/sy = where Earth sits on screen (-1..1), fov, roll, spin = extra planet rotation, mx/my = Moon position on screen */
    var KEYS = [
      { az:  40, el:  8,  dist: 28, sx:  .52, sy: -.42, fov: 34, roll:  0,  spin: 0,   mx: -.62, my:  .52 },
      { az: -12, el: 16,  dist: 19, sx: -.42, sy: -.08, fov: 38, roll: -3,  spin: .5,  mx:  .70, my:  .50 },
      { az: -72, el:  4,  dist: 13, sx:  .46, sy: -.18, fov: 44, roll:  4,  spin: 1.1, mx: -.70, my:  .58 },
      { az: -130,el: 30,  dist: 15, sx: -.46, sy:  .06, fov: 40, roll: -2,  spin: 1.7, mx:  .62, my:  .55 },
      { az: -192,el: -10, dist: 15, sx:  .44, sy:  .12, fov: 42, roll:  3,  spin: 2.4, mx: -.66, my: -.40 },
      { az: -250,el: 12,  dist: 27, sx:  .0,  sy:  .48, fov: 34, roll:  0,  spin: 3.0, mx:  .60, my:  .50 }
    ];
    var FIELDS = ['az','el','dist','sx','sy','fov','roll','spin','mx','my'];
    function cr(p0, p1, p2, p3, t){ var t2 = t * t, t3 = t2 * t; return .5 * ((2 * p1) + (-p0 + p2) * t + (2*p0 - 5*p1 + 4*p2 - p3) * t2 + (-p0 + 3*p1 - 3*p2 + p3) * t3); }
    function shot(p){
      var f = clamp(p, 0, .9999) * (KEYS.length - 1), i = Math.floor(f), t = f - i, o = {};
      var a = KEYS[Math.max(0, i - 1)], b = KEYS[i], c = KEYS[i + 1], d = KEYS[Math.min(KEYS.length - 1, i + 2)];
      FIELDS.forEach(function(k){ o[k] = cr(a[k], b[k], c[k], d[k], t); }); return o;
    }
    var cur = shot(0), vel = 0, lastY = window.scrollY, kickS = 0;
    var pmx = 0, pmy = 0, mN = { x: 0, y: 0 }, lastMx = 0, lastMy = 0, lastPx = 0, lastPy = 0, speedS = 0, forceS = 0, pvx = 0, dragSpin = 0, pulseAge = 99;

    var W = 0, H = 0;
    function resize(){
      var w = innerWidth, h = innerHeight;
      if (small && w === W && Math.abs(h - H) < 160) return;
      W = w; H = h; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      [starsA.material, milky.material, dustMat, trailMat].forEach(function(m){ m.uniforms.uPR.value = renderer.getPixelRatio(); }); MU.uAsp.value = camera.aspect; S.dirty = true;
    }
    var time = 0, raf = 0, clock = new T.Clock();
    resize(); window.addEventListener('resize', resize);

    var fw = new T.Vector3(), rt = new T.Vector3(), up = new T.Vector3(), tgt = new T.Vector3(), UP = new T.Vector3(0, 1, 0), tmp = new T.Vector3();
    function frame(dt, snap){
      time += dt;
      var y = window.scrollY; vel += (((y - lastY) / Math.max(dt, .001)) - vel) * Math.min(1, dt * 6); lastY = y;
      if (snap) vel = 0;
      var kick = clamp(vel / 2400, -1, 1); kickS += (kick - kickS) * Math.min(1, dt * 5);
      var tg = shot(S.p), k = snap ? 1 : 1 - Math.exp(-dt * 2.1);
      FIELDS.forEach(function(f){ cur[f] += (tg[f] - cur[f]) * k; });
      var intro = reduced ? 1 : (loaded ? ease(clamp((time - loadedAt - .1) / 3.6, 0, 1)) : 0);
      canvas.style.opacity = (reduced ? 1 : clamp(intro * 3, 0, 1)) * (1 - (1 - pal.dim) * ease(clamp((S.p - .03) / .07, 0, 1)));

      var aspect = camera.aspect, narrow = aspect < 1.25, portrait = aspect < 1;
      var dist = cur.dist * (narrow ? 1 + (1.25 - aspect) * .8 : 1) * (1 + (1 - intro) * .6);
      var az = (cur.az - (1 - intro) * 22) * D2R, el = cur.el * D2R;
      var sh = .006 * dist, hx = Math.sin(time * .55) * sh + Math.sin(time * 1.3) * sh * .4, hy = Math.cos(time * .43) * sh * .8;
      camera.position.set(dist * Math.cos(el) * Math.sin(az) + hx, dist * Math.sin(el) + hy, dist * Math.cos(el) * Math.cos(az));
      var fov = cur.fov + Math.abs(kickS) * 10;
      if (Math.abs(fov - camera.fov) > .01){ camera.fov = fov; camera.updateProjectionMatrix(); }
      fw.copy(camera.position).negate().normalize(); rt.crossVectors(fw, UP).normalize(); up.crossVectors(rt, fw).normalize();
      var halfH = Math.tan(fov * D2R / 2) * dist, halfW = halfH * aspect, sx = cur.sx * (portrait ? .3 : narrow ? .65 : 1), sy = cur.sy * (portrait ? 1.1 : 1);
      tgt.set(0, 0, 0).addScaledVector(rt, -sx * halfW).addScaledVector(up, -sy * halfH);
      /* pointer: smooth it, measure its speed, and let it turn the camera a touch (parallax) */
      if (fx && dt > 0){
        var tx = S.present ? S.mx : mN.x, ty = S.present ? S.my : mN.y;
        mN.x += (tx - mN.x) * Math.min(1, dt * 9); mN.y += (ty - mN.y) * Math.min(1, dt * 9);
        var sp = S.present ? Math.hypot(S.mx - lastMx, S.my - lastMy) / dt : 0;
        speedS += (sp - speedS) * Math.min(1, dt * 7);
        pvx += (((S.mx - lastMx) / dt) * (S.present ? 1 : 0) - pvx) * Math.min(1, dt * 6);
        lastMx = S.mx; lastMy = S.my;
        var fT = S.present ? clamp(.22 + speedS * .5, 0, 1) : 0; forceS += (fT - forceS) * Math.min(1, dt * 5);
        MU.uMouse.value.set(mN.x, mN.y); MU.uForce.value = forceS; MU.uAsp.value = aspect;
        dragSpin += clamp(pvx, -3, 3) * dt * .22;
        pmx += ((S.present ? S.mx : 0) - pmx) * Math.min(1, dt * 3); pmy += ((S.present ? S.my : 0) - pmy) * Math.min(1, dt * 3);
        if (S.pulseReq){ MU.uPulsePos.value.set(S.pulseReq.x, S.pulseReq.y); pulseAge = 0; S.pulseReq = null; }
        pulseAge = Math.min(99, pulseAge + dt); MU.uPulseAge.value = pulseAge;
        if (S.present){
          var ddx = S.px - lastPx, ddy = S.py - lastPy, dd = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dd > 2){ var n = Math.min(5, Math.ceil(dd / 14)); for (var si = 1; si <= n; si++) spawn(lastPx + ddx * si / n, lastPy + ddy * si / n, ddx / innerWidth * 10, ddy / innerHeight * 10); }
        }
        lastPx = S.px; lastPy = S.py;
      }
      camera.up.copy(UP); camera.lookAt(tgt); camera.rotateY(-pmx * .045); camera.rotateX(pmy * .03); camera.rotateZ((cur.roll + kickS * 3.5) * D2R);
      camera.updateMatrixWorld();

      earthU.uSun.value.copy(SUN).transformDirection(camera.matrixWorldInverse);
      var spin = time * .014 + cur.spin + kickS * .12 + dragSpin;
      earth.rotation.y = spin; clouds.rotation.y = spin * 1.0 + time * .006;

      /* the Moon sits at a fixed spot on screen, far away */
      camera.getWorldDirection(fw); rt.setFromMatrixColumn(camera.matrixWorld, 0); up.setFromMatrixColumn(camera.matrixWorld, 1);
      var dm = 70, mh = Math.tan(fov * D2R / 2) * dm, mw = mh * aspect, mxs = cur.mx * (portrait ? .55 : 1);
      moon.position.copy(camera.position).addScaledVector(fw, dm).addScaledVector(rt, mxs * mw * .85).addScaledVector(up, cur.my * mh * .85);
      moon.rotation.y = time * .01;
      moon.visible = S.p < .995;

      starsA.material.uniforms.uTime.value = time; milky.material.uniforms.uTime.value = time;
      starsA.rotation.y = time * .002; milky.rotation.y = time * .002;
      dustMat.uniforms.uOff.value = S.p * 520 + time * 3; dustMat.uniforms.uTime.value = time;

      if (fx){
        var th = Math.tan(fov * D2R / 2) * 12, tw = th * aspect;
        for (var ti2 = 0; ti2 < TN; ti2++){
          var tq = tp[ti2]; tq.age += dt;
          if (tq.age >= tq.life){ tAge[ti2] = 1; continue; }
          tq.x += tq.vx * dt; tq.y += tq.vy * dt; tq.vx *= .985; tq.vy -= .02 * dt;
          tPos[ti2*3] = tq.x * tw; tPos[ti2*3+1] = tq.y * th; tPos[ti2*3+2] = -12; tAge[ti2] = tq.age / tq.life;
        }
        tgeo.attributes.position.needsUpdate = true; tgeo.attributes.aAge.needsUpdate = true; tgeo.attributes.aSize.needsUpdate = true;
      }

      /* sun flare: only when the sun is on screen and not hidden behind Earth */
      var flareA = 0;
      if (pal.flare){
        tmp.copy(sunPos).project(camera);
        if (tmp.z < 1 && Math.abs(tmp.x) < 1.35 && Math.abs(tmp.y) < 1.35){
          var cam = camera.position, d = sunPos.clone().sub(cam).normalize(), b = cam.dot(d), dmin = Math.sqrt(Math.max(0, cam.lengthSq() - b * b));
          var vis = (-b > 0) ? ease(clamp((dmin - R * .985) / (R * .17), 0, 1)) : 1;
          var edge = 1 - ease(clamp((Math.max(Math.abs(tmp.x), Math.abs(tmp.y)) - .7) / .6, 0, 1));
          flareA = vis * edge * intro;
          var sxp = (tmp.x * .5 + .5) * innerWidth, syp = (-tmp.y * .5 + .5) * innerHeight, cx = innerWidth / 2, cy = innerHeight / 2;
          for (var j = 0; j < flareEls.length; j++){
            var u = flareDefs[j][0], px = sxp + (cx - sxp) * u, py = syp + (cy - syp) * u;
            flareEls[j].style.transform = 'translate3d(' + px.toFixed(1) + 'px,' + py.toFixed(1) + 'px,0)';
            flareEls[j].style.opacity = (flareA * (j ? .8 : 1)).toFixed(3);
          }
        }
      }
      if (!flareA) for (var z2 = 0; z2 < flareEls.length; z2++) flareEls[z2].style.opacity = 0;
      renderer.render(scene, camera);
    }

    function loop(){
      var dt = Math.min(.05, clock.getDelta());
      frame(dt, false); floatPanels(); S.dirty = false;
      raf = requestAnimationFrame(loop);
    }
    if (reduced){
      var pending2 = false;
      var once = function(){ if (pending2) return; pending2 = true; requestAnimationFrame(function(){ pending2 = false; frame(0, true); }); };
      frame(0, true); window.addEventListener('scroll', once, { passive: true }); window.addEventListener('resize', once); window.addEventListener('themechange', once);
      var wait = setInterval(function(){ if (loaded){ clearInterval(wait); once(); } }, 200);
    } else {
      clock.start(); loop();
      document.addEventListener('visibilitychange', function(){
        if (document.hidden){ cancelAnimationFrame(raf); } else { clock.getDelta(); raf = requestAnimationFrame(loop); }
      });
    }
  })();
})();
