(function(){
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function(s){ return (s==null?'':String(s)).replace(/[&<>]/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];}); };

  /* ---------------- content: hero ---------------- */
  (function splitName(){
    var el = document.getElementById('heroName');
    el.setAttribute('aria-label', PROFILE.name);
    el.textContent = '';
    var i = 0;
    PROFILE.name.split(' ').forEach(function(word, wi){
      if (wi) { var sp = document.createElement('span'); sp.className = 'sp'; sp.setAttribute('aria-hidden','true'); el.appendChild(sp); }
      var w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden','true');
      word.split('').forEach(function(c){
        var ch = document.createElement('span'); ch.className = 'ch'; ch.textContent = c; ch.style.setProperty('--i', i++); w.appendChild(ch);
      });
      el.appendChild(w);
    });
  })();
  document.getElementById('heroRole').textContent = PROFILE.role + ' · ' + PROFILE.location;
  document.getElementById('heroTag').textContent = PROFILE.tag;
  document.getElementById('aboutText').innerHTML = esc(PROFILE.blurb);
  document.getElementById('heroPhoto').src = PROFILE.photo;
  document.getElementById('yr').textContent = new Date().getFullYear();

  var bootLines = [
    'ssh nitesh@production — authenticated',
    'loading profile\u2026 ' + PROFILE.location,
    'status: available for backend / devops roles'
  ];
  (function typeBoot(){
    var el = document.getElementById('boot');
    if (reduced){ el.textContent = bootLines[bootLines.length-1]; return; }
    var li = 0, ci = 0;
    function step(){
      if (li >= bootLines.length){ return; }
      var line = bootLines[li];
      if (ci <= line.length){
        el.innerHTML = esc(line.slice(0, ci)) + '<span class="caret"></span>';
        ci++;
        setTimeout(step, 22 + Math.random()*20);
      } else {
        li++; ci = 0;
        if (li < bootLines.length) setTimeout(step, 420);
        else el.innerHTML = esc(line) + '<span class="caret"></span>';
      }
    }
    step();
  })();

  /* ---------------- experience timeline ---------------- */
  var tl = document.getElementById('timeline');
  CHAPTERS.forEach(function(c){
    var row = document.createElement('div'); row.className = 'tl-item reveal';
    row.innerHTML =
      '<div class="tl-yr">'+esc(c.yr)+'</div>' +
      '<div class="tl-dot"></div>' +
      '<div class="tl-card">' +
        '<div class="tl-head"><span class="tl-role">'+esc(c.role)+'</span><span class="tl-when">'+esc(c.when)+'</span></div>' +
        '<div class="tl-org">'+esc(c.org)+'</div>' +
        '<ul>' + c.pts.map(function(p){ return '<li>'+esc(p)+'</li>'; }).join('') + '</ul>' +
        '<div class="tl-stack">' + c.stack.map(function(s){ return '<span class="chip">'+esc(s)+'</span>'; }).join('') + '</div>' +
      '</div>';
    tl.appendChild(row);
  });

  /* ---------------- projects ---------------- */
  var pg = document.getElementById('projects-grid');
  PROJECTS.forEach(function(p, i){
    var el = document.createElement('div'); el.className = 'proj reveal';
    el.innerHTML =
      '<div class="pk">SVC-0'+(i+1)+' · '+esc(p.when)+'</div>' +
      '<h3>'+esc(p.name)+'</h3>' +
      '<div class="sub">'+esc(p.sub)+'</div>' +
      '<p class="what">'+esc(p.what)+'</p>' +
      '<ul>' + p.hits.map(function(h){ return '<li>'+esc(h)+'</li>'; }).join('') + '</ul>' +
      '<div class="tl-stack">' + p.stack.map(function(s){ return '<span class="chip">'+esc(s)+'</span>'; }).join('') + '</div>';
    pg.appendChild(el);
  });

  /* ---------------- stack / platform ---------------- */
  var sg = document.getElementById('stack-grid');
  Object.keys(STACK).forEach(function(cat){
    var col = document.createElement('div'); col.className = 'stack-col reveal';
    var rows = STACK[cat].map(function(r){
      return '<div class="stack-row"><b>'+esc(r[0])+'</b><span>'+esc(r[1])+'</span></div>';
    }).join('');
    col.innerHTML = '<h4>'+esc(cat)+'</h4>' + rows;
    sg.appendChild(col);
  });

  /* ---------------- skill meters ---------------- */
  var meters = document.getElementById('meters');
  if (meters && typeof SKILLS !== 'undefined'){
    SKILLS.forEach(function(s){
      var row = document.createElement('div'); row.className = 'meter reveal';
      row.innerHTML =
        '<div class="meter-top"><span>'+esc(s[0])+'</span><b>'+s[1]+'%</b></div>' +
        '<div class="meter-track"><div class="meter-fill" data-pct="'+s[1]+'"></div></div>';
      meters.appendChild(row);
    });
  }

  /* ---------------- education ---------------- */
  var eg = document.getElementById('edu-grid');
  if (eg && typeof EDUCATION !== 'undefined'){
    EDUCATION.forEach(function(e){
      var el = document.createElement('div'); el.className = 'edu-card reveal';
      el.innerHTML =
        '<div class="edu-when">'+esc(e.when)+'</div>' +
        '<h4>'+esc(e.org)+'</h4>' +
        '<div class="edu-deg">'+esc(e.deg)+'</div>';
      eg.appendChild(el);
    });
  }

  /* ---------------- personal projects + hobbies ---------------- */
  var pergrid = document.getElementById('personal-grid');
  if (pergrid && typeof PERSONAL_PROJECTS !== 'undefined'){
    PERSONAL_PROJECTS.forEach(function(p){
      var el = document.createElement('div'); el.className = 'proj reveal';
      el.innerHTML =
        '<div class="pk">PERSONAL</div>' +
        '<h3>'+esc(p.name)+'</h3>' +
        '<div class="sub">'+esc(p.sub)+'</div>' +
        '<p class="what">'+esc(p.d)+'</p>' +
        '<div class="tl-stack">' + p.stack.map(function(s){ return '<span class="chip">'+esc(s)+'</span>'; }).join('') + '</div>' +
        (p.url ? '<a class="btn" style="margin-top:16px" href="'+esc(p.url)+'" target="_blank" rel="noopener">View on GitHub →</a>' : '');
      pergrid.appendChild(el);
    });
  }
  var hobbyRow = document.getElementById('hobby-row');
  if (hobbyRow && typeof HOBBIES !== 'undefined'){
    HOBBIES.forEach(function(h){
      var el = document.createElement('div'); el.className = 'hobby reveal';
      el.innerHTML = '<b>'+esc(h[0])+'</b><span>'+esc(h[1])+'</span>';
      hobbyRow.appendChild(el);
    });
  }

  /* ---------------- proof ---------------- */
  var prg = document.getElementById('proof-grid');
  PROOF.forEach(function(p){
    var el = document.createElement('div'); el.className = 'proof-card reveal';
    el.innerHTML =
      '<div class="proof-k">'+esc(p.k.toUpperCase())+'</div>' +
      '<h4>'+esc(p.name)+'</h4>' +
      '<div class="org">'+esc(p.org)+'</div>' +
      (p.d ? '<p>'+esc(p.d)+'</p>' : '');
    prg.appendChild(el);
  });

  /* ---------------- contact links ---------------- */
  var cl = document.getElementById('contactLinks');
  cl.innerHTML = '<a class="btn primary" href="mailto:'+esc(PROFILE.email)+'">Email me</a>';
  Object.keys(PROFILE.links).forEach(function(k){
    var url = PROFILE.links[k];
    if (url) cl.innerHTML += '<a class="btn" href="'+esc(url)+'" target="_blank" rel="noopener">'+esc(k)+'</a>';
  });

  /* ---------------- scroll reveal ---------------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){
        e.target.classList.add('in');
        var fill = e.target.querySelector && e.target.querySelector('.meter-fill');
        if (fill && !fill.dataset.done){ fill.dataset.done = '1'; fill.style.width = (reduced ? fill.getAttribute('data-pct') : 0) + '%'; requestAnimationFrame(function(){ requestAnimationFrame(function(){ fill.style.width = fill.getAttribute('data-pct') + '%'; }); }); }
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.reveal, .tl-item, .proj, .edu-card, .meter, .hobby').forEach(function(el){ io.observe(el); });

  /* ---------------- theme (dark / light) ---------------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeBtn');
  var metaTheme = document.querySelector('meta[name="theme-color"]');
  function currentTheme(){ return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }
  function paintThemeUI(){
    var t = currentTheme();
    themeBtn.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    if (metaTheme) metaTheme.setAttribute('content', t === 'light' ? '#eef2f7' : '#080b10');
  }
  function setTheme(t, persist){
    root.setAttribute('data-theme', t);
    if (persist){ try { localStorage.setItem('theme', t); } catch(e){} }
    paintThemeUI();
    window.dispatchEvent(new CustomEvent('themechange', { detail: t }));
  }
  paintThemeUI();
  themeBtn.addEventListener('click', function(){ setTheme(currentTheme() === 'light' ? 'dark' : 'light', true); });
  // follow the device setting until the visitor picks one themselves
  var mq = window.matchMedia('(prefers-color-scheme: light)');
  var onScheme = function(e){ var saved = null; try { saved = localStorage.getItem('theme'); } catch(err){} if (!saved) setTheme(e.matches ? 'light' : 'dark', false); };
  if (mq.addEventListener) mq.addEventListener('change', onScheme); else if (mq.addListener) mq.addListener(onScheme);

  /* ---------------- dock + section sheet ---------------- */
  var menuBtn = document.getElementById('menuBtn');
  var sheet = document.getElementById('sheet');
  var scrim = document.getElementById('scrim');
  function sheetOpen(){ return !sheet.hidden; }
  function openSheet(){
    sheet.hidden = false; scrim.hidden = false;
    requestAnimationFrame(function(){ sheet.classList.add('show'); scrim.classList.add('show'); });
    menuBtn.setAttribute('aria-expanded', 'true');
    var first = sheet.querySelector('a.active') || sheet.querySelector('a'); if (first) first.focus({ preventScroll: true });
  }
  function closeSheet(returnFocus){
    sheet.classList.remove('show'); scrim.classList.remove('show');
    menuBtn.setAttribute('aria-expanded', 'false');
    setTimeout(function(){ if (!sheet.classList.contains('show')){ sheet.hidden = true; scrim.hidden = true; } }, reduced ? 0 : 260);
    if (returnFocus) menuBtn.focus({ preventScroll: true });
  }
  menuBtn.addEventListener('click', function(){ sheetOpen() ? closeSheet(false) : openSheet(); });
  scrim.addEventListener('click', function(){ closeSheet(false); });
  sheet.addEventListener('click', function(e){ if (e.target.closest('a')) closeSheet(false); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && sheetOpen()) closeSheet(true); });

  /* ---------------- nav active state (scroll position, works for very tall sections) ---------------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('#dock a[data-k], #sheet a[data-k]'));
  var activeId = '';
  function updateActive(){
    var line = window.innerHeight * 0.4, cur = sections[0].id;
    sections.forEach(function(s){ if (s.getBoundingClientRect().top <= line) cur = s.id; });
    if (cur === activeId) return;
    activeId = cur;
    navLinks.forEach(function(l){ l.classList.toggle('active', l.getAttribute('href') === '#' + cur); });
  }
  var ticking = false;
  window.addEventListener('scroll', function(){
    if (ticking) return; ticking = true;
    requestAnimationFrame(function(){ ticking = false; updateActive(); });
  }, { passive: true });
  window.addEventListener('resize', updateActive);
  updateActive();

  /* ---------------- photo 3D tilt ---------------- */
  var frame = document.getElementById('photoFrame');
  if (frame && !reduced && window.matchMedia('(hover:hover)').matches){
    frame.addEventListener('mousemove', function(e){
      var r = frame.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      frame.style.transform = 'rotateY('+(x*10)+'deg) rotateX('+(-y*10)+'deg) translateZ(10px)';
    });
    frame.addEventListener('mouseleave', function(){
      frame.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  /* ----------------------------------------------------------------------
     three.js background: a camera that flies through a chain of "service
     node" clusters — one cluster per section — as the PAGE scrolls.
     Deliberately driven by native window scroll (no preventDefault, no
     custom touch handling) so it rides along with normal swipe/wheel/
     scrollbar scrolling and never fights mobile/tablet gesture handling.
  --------------------------------------------------------------------- */
  (function initFlythrough(){
    var canvas = document.getElementById('bg');
    if (!window.THREE || !canvas || reduced) { if(canvas) canvas.style.display='none'; return; }

    var small = window.innerWidth < 720;
    var tablet = window.innerWidth >= 720 && window.innerWidth < 1024;

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: !small, alpha: true, powerPreference: 'low-power' });
    } catch (e) { canvas.style.display = 'none'; return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(58, window.innerWidth/window.innerHeight, 0.1, 600);

    // One anchor per section, in page order — the spine the camera travels.
    var SECTION_IDS = ['hero','about','experience','projects','stack','education','personal','proof','contact'];
    var ANCHORS = [
      [0,   0,    0],
      [12, -3,  -35],
      [-14,  5,  -75],
      [16,  -7, -115],
      [-12,  4, -155],
      [13,  -4, -190],
      [-11,  6, -225],
      [11,  -5, -258],
      [0,    0, -290]
    ];
    var PALETTES = {
      dark:  { colors: [0x3fe0c9, 0x3fe0c9, 0xffb454, 0x3fe0c9, 0xffb454, 0x3fe0c9, 0xff6467, 0xff6467, 0x3fe0c9], spine: 0x1c4a44, links: 0x2a3b55, nodeOpacity: 0.88, linkOpacity: 0.5 },
      light: { colors: [0x0a8a7a, 0x0a8a7a, 0xc97800, 0x0a8a7a, 0xc97800, 0x0a8a7a, 0xd6393c, 0xd6393c, 0x0a8a7a], spine: 0x8fcfc6, links: 0x9fb0c8, nodeOpacity: 0.7, linkOpacity: 0.7 }
    };
    var clusterMats = [];
    var CLUSTER_N = small ? 5 : (tablet ? 7 : 10);

    var spinePts = ANCHORS.map(function(a){ return new THREE.Vector3(a[0],a[1],a[2]); });
    var spine = new THREE.CatmullRomCurve3(spinePts, false, 'catmullrom', 0.5);

    // camera rides offset from the spine (behind/above), looking slightly ahead
    var camPts = ANCHORS.map(function(a, i){
      var side = (i % 2 === 0) ? 1 : -1;
      return new THREE.Vector3(a[0] - side*4, a[1] + 5, a[2] + 16);
    });
    var camCurve = new THREE.CatmullRomCurve3(camPts, false, 'catmullrom', 0.5);

    var group = new THREE.Group();
    var allNodes = [];
    var sphereGeo = new THREE.SphereGeometry(0.5, small ? 6 : 10, small ? 6 : 10);

    ANCHORS.forEach(function(a, ci){
      var mat = new THREE.MeshBasicMaterial({ color: PALETTES.dark.colors[ci], transparent: true, opacity: 0.88 });
      clusterMats.push(mat);
      for (var i = 0; i < CLUSTER_N; i++){
        var m = new THREE.Mesh(sphereGeo, mat);
        var rad = 5 + Math.random()*4;
        var theta = Math.random()*Math.PI*2, phi = Math.random()*Math.PI;
        m.position.set(
          a[0] + rad*Math.sin(phi)*Math.cos(theta),
          a[1] + rad*Math.cos(phi)*0.6,
          a[2] + rad*Math.sin(phi)*Math.sin(theta)
        );
        m.userData.base = m.position.clone();
        m.userData.ph = Math.random()*Math.PI*2;
        group.add(m);
        allNodes.push(m);
      }
    });
    scene.add(group);

    // glowing spine line + per-cluster connective lines (built once; positions
    // only bob slightly at runtime so a static line stays visually attached)
    var spinePositions = [];
    var spineSamples = spine.getPoints(160);
    spineSamples.forEach(function(p){ spinePositions.push(p.x,p.y,p.z); });
    var spineGeo = new THREE.BufferGeometry();
    spineGeo.setAttribute('position', new THREE.Float32BufferAttribute(spinePositions, 3));
    var spineMat = new THREE.LineBasicMaterial({ color: 0x1c4a44, transparent: true, opacity: 0.55 });
    var spineLine = new THREE.Line(spineGeo, spineMat);
    scene.add(spineLine);

    var clusterLinePositions = [];
    for (var ci2 = 0; ci2 < ANCHORS.length; ci2++){
      var start = ci2*CLUSTER_N, end = start+CLUSTER_N;
      for (var a2 = start; a2 < end; a2++){
        for (var b2 = a2+1; b2 < end; b2++){
          if (allNodes[a2].position.distanceTo(allNodes[b2].position) < 7){
            clusterLinePositions.push(allNodes[a2].position.x, allNodes[a2].position.y, allNodes[a2].position.z);
            clusterLinePositions.push(allNodes[b2].position.x, allNodes[b2].position.y, allNodes[b2].position.z);
          }
        }
      }
    }
    var clusterLineGeo = new THREE.BufferGeometry();
    clusterLineGeo.setAttribute('position', new THREE.Float32BufferAttribute(clusterLinePositions, 3));
    var linkMat = new THREE.LineBasicMaterial({ color: 0x2a3b55, transparent: true, opacity: 0.5 });
    scene.add(new THREE.LineSegments(clusterLineGeo, linkMat));

    function applyScenePalette(){
      var p = PALETTES[document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'];
      clusterMats.forEach(function(m, i){ m.color.setHex(p.colors[i]); m.opacity = p.nodeOpacity; });
      spineMat.color.setHex(p.spine);
      linkMat.color.setHex(p.links); linkMat.opacity = p.linkOpacity;
    }
    applyScenePalette();
    window.addEventListener('themechange', applyScenePalette);

    // ---- scroll progress, mapped from real section positions on the page ----
    var sectionEls = SECTION_IDS.map(function(id){ return document.getElementById(id); });
    var offsets = [];
    function measure(){
      offsets = sectionEls.map(function(el){ return el ? el.offsetTop : 0; });
    }
    measure();
    window.addEventListener('load', measure);
    setTimeout(measure, 600); // after web fonts / images settle

    function scrollProgress(){
      var y = window.scrollY || window.pageYOffset;
      var max = Math.max(1, (document.documentElement.scrollHeight - window.innerHeight));
      var n = offsets.length;
      for (var i = 0; i < n-1; i++){
        var a = offsets[i], b = offsets[i+1];
        if (b <= a) continue;
        if (y >= a && y <= b || (i === n-2 && y > b)){
          var local = Math.min(1, Math.max(0, (y - a) / (b - a)));
          return Math.min(1, (i + local) / (n - 1));
        }
      }
      return y <= offsets[0] ? 0 : Math.min(1, y / max);
    }

    var targetT = 0, curT = 0;
    window.addEventListener('scroll', function(){ targetT = scrollProgress(); }, { passive: true });
    window.addEventListener('resize', function(){
      small = window.innerWidth < 720;
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      measure();
      targetT = scrollProgress();
    });

    var clock = new THREE.Clock();
    function animate(){
      requestAnimationFrame(animate);
      var dt = clock.getDelta(), t = clock.getElapsedTime();

      curT += (targetT - curT) * 0.065;
      var camPos = camCurve.getPointAt(Math.min(1, Math.max(0, curT)));
      var lookPos = spine.getPointAt(Math.min(1, Math.max(0, curT + 0.015)));
      camera.position.lerp(camPos, 0.18);
      camera.lookAt(lookPos);

      allNodes.forEach(function(n){
        n.position.y = n.userData.base.y + Math.sin(t*0.6 + n.userData.ph)*0.5;
      });
      group.rotation.y = Math.sin(t*0.05)*0.03;

      renderer.render(scene, camera);
    }
    animate();
  })();
})();
