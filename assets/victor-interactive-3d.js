/**
 * STARK INDUSTRIES // AVENGERS INITIATIVE // VICTOR AI 3D SPACE ENGINE
 * - 3D Deep Space Starfield with Real-time Parallax & Nebula
 * - Periodic Shooting Stars / Cosmic Meteors
 * - Dynamic Constellation Lines Near Cursor
 * - Stark Industries Hologram Logo Enhancer & Arc Reactor HUD
 * - Avengers Tactical Telemetry HUD Bar
 * - Web Audio API High-Tech Sound Synthesizer (Zero External Audio Files)
 * - 3D Card Perspective Tilt & Cyan Specular Glare
 */

(function () {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    setupDeepSpaceCanvas();
    setupAvengersHudBar();
    setup3DCardTilt();
    setupAvengersAudio();
    setupClickShockwaves();

    // Repeatedly apply branding to cleanly hook after React client-side hydration
    applyBranding();
    const intervalId = setInterval(applyBranding, 150);
    setTimeout(() => clearInterval(intervalId), 10000);

    // MutationObserver to lock the branding in place
    if (window.MutationObserver) {
      const observer = new MutationObserver(() => {
        applyBranding();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  /* ==============================================================
     1. STARK INDUSTRIES BRANDING & HERO ENHANCEMENT
     ============================================================== */
  function applyBranding() {
    // 1. Navbar Brand
    const navBar = document.querySelector('nav');
    if (navBar) {
      const firstLink = navBar.querySelector('a');
      if (firstLink && !firstLink.classList.contains('stark-applied')) {
        firstLink.classList.add('stark-applied');
        firstLink.className = 'stark-brand-logo stark-applied group';
        firstLink.setAttribute('aria-label', 'Stark Industries — Victor AI');
        firstLink.innerHTML = `
          <div class="stark-logo-frame">
            <div class="stark-logo-halo"></div>
            <img src="/assets/stark-industries-logo.png" alt="Stark Industries" class="stark-logo-img" />
          </div>
          <span class="stark-product-badge"><span class="stark-product-dot"></span>VICTOR AI</span>
        `;
      }
    }

    // 2. Footer Brand
    const footer = document.querySelector('footer');
    if (footer) {
      const footerLink = footer.querySelector('a[href="/"]');
      if (footerLink && !footerLink.classList.contains('stark-applied')) {
        footerLink.classList.add('stark-applied');
        footerLink.className = 'stark-brand-logo stark-applied group w-fit';
        footerLink.innerHTML = `
          <div class="stark-logo-frame">
            <div class="stark-logo-halo"></div>
            <img src="/assets/stark-industries-logo.png" alt="Stark Industries" class="stark-logo-img" />
          </div>
          <span class="stark-product-badge"><span class="stark-product-dot"></span>VICTOR AI</span>
        `;
      }
    }

    // 3. Hero Headline
    const heroHeading = document.querySelector('h1');
    if (heroHeading && !heroHeading.classList.contains('stark-heading-applied')) {
      heroHeading.classList.add('stark-heading-applied');
      heroHeading.innerHTML = `
        <span class="block text-xs uppercase tracking-[0.28em] text-[#00f0ff] mb-2 font-mono font-bold" style="text-shadow:0 0 12px rgba(0,240,255,0.8);">STARK INDUSTRIES // FLAGSHIP AI</span>
        <span class="block">The Autonomous <br class="sm:hidden"/><span class="text-gradient-cyan">JARVIS-Class AI</span></span> 
        <span class="block">for Windows PC.</span>
      `;

      const subtitle = heroHeading.parentNode.querySelector('p');
      if (subtitle && !subtitle.classList.contains('stark-sub-applied')) {
        subtitle.classList.add('stark-sub-applied');
        subtitle.textContent = 'Engineered by Stark Industries R&D. Tactical voice control, deep PC automation, and local privacy.';
      }
    }

    // 4. Cards Tactical Notches
    const cards = document.querySelectorAll('.card-tier, div[class*="rounded-2xl"], div[class*="rounded-3xl"]');
    cards.forEach((card) => {
      if (!card.classList.contains('hud-notched')) {
        card.classList.add('hud-notched');
      }
    });
  }

  /* ==============================================================
     2. 3D INTERACTIVE DEEP SPACE CANVAS (STARS, NEBULA, METEORS)
     ============================================================== */
  function setupDeepSpaceCanvas() {
    let canvas = document.getElementById('victor-3d-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'victor-3d-canvas';
      document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
      tiltX: 0,
      tiltY: 0
    };

    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    }, { passive: true });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    }, { passive: true });

    // Starfield Setup
    const STAR_COUNT = Math.min(480, Math.floor((width * height) / 2800));
    let stars = [];

    function initStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: (Math.random() - 0.5) * width * 2,
          y: (Math.random() - 0.5) * height * 2,
          z: Math.random() * 1000 + 1,
          size: Math.random() * 1.6 + 0.6,
          baseAlpha: Math.random() * 0.6 + 0.4,
          twinkleSpeed: Math.random() * 0.04 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          colorType: Math.random() < 0.35 ? 'cyan' : (Math.random() < 0.15 ? 'gold' : 'white')
        });
      }
    }
    initStars();

    // Shooting Stars / Meteors
    let meteors = [];
    function spawnMeteor() {
      meteors.push({
        x: Math.random() * width * 0.9,
        y: Math.random() * height * 0.4,
        length: Math.random() * 120 + 80,
        speed: Math.random() * 14 + 10,
        angle: (Math.PI / 4) + (Math.random() * 0.3 - 0.15),
        alpha: 1,
        life: 1,
        decay: Math.random() * 0.02 + 0.015
      });
    }

    let meteorTimer = 0;
    let lastTime = performance.now();

    function render(now) {
      const dt = Math.min(32, now - lastTime) * 0.001;
      lastTime = now;

      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      mouse.tiltX = ((mouse.x - width * 0.5) / (width * 0.5)) * 120;
      mouse.tiltY = ((mouse.y - height * 0.5) / (height * 0.5)) * 120;

      ctx.fillStyle = '#02040a';
      ctx.fillRect(0, 0, width, height);

      // Render Cosmic Nebula Dust Glows
      const grad1 = ctx.createRadialGradient(
        width * 0.25 - mouse.tiltX * 0.2, height * 0.3 - mouse.tiltY * 0.2, 10,
        width * 0.25 - mouse.tiltX * 0.2, height * 0.3 - mouse.tiltY * 0.2, width * 0.45
      );
      grad1.addColorStop(0, 'rgba(0, 240, 255, 0.055)');
      grad1.addColorStop(0.5, 'rgba(2, 132, 199, 0.035)');
      grad1.addColorStop(1, 'rgba(2, 4, 10, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.8 - mouse.tiltX * 0.15, height * 0.7 - mouse.tiltY * 0.15, 10,
        width * 0.8 - mouse.tiltX * 0.15, height * 0.7 - mouse.tiltY * 0.15, width * 0.5
      );
      grad2.addColorStop(0, 'rgba(251, 191, 36, 0.03)');
      grad2.addColorStop(0.5, 'rgba(0, 240, 255, 0.025)');
      grad2.addColorStop(1, 'rgba(2, 4, 10, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 3D Stars
      const cx = width * 0.5;
      const cy = height * 0.5;
      const visibleStars = [];

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= 0.6;
        if (star.z <= 1) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const px = (star.x - mouse.tiltX) * (400 / star.z) + cx;
        const py = (star.y - mouse.tiltY) * (400 / star.z) + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          star.twinklePhase += star.twinkleSpeed;
          const twinkle = (Math.sin(star.twinklePhase) + 1) * 0.5;
          const alpha = star.baseAlpha * (0.6 + 0.4 * twinkle) * (1 - star.z / 1000);
          const r = star.size * (1 - star.z / 1000) * 1.8 + 0.4;

          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);

          if (star.colorType === 'cyan') {
            ctx.fillStyle = 'rgba(0, 240, 255, ' + alpha + ')';
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = r * 3;
          } else if (star.colorType === 'gold') {
            ctx.fillStyle = 'rgba(251, 191, 36, ' + alpha + ')';
            ctx.shadowColor = '#fbbf24';
            ctx.shadowBlur = r * 2;
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
            ctx.shadowBlur = 0;
          }

          ctx.fill();
          ctx.shadowBlur = 0;

          const distToCursor = Math.hypot(px - mouse.x, py - mouse.y);
          if (distToCursor < 180) {
            visibleStars.push({ x: px, y: py, dist: distToCursor });
          }
        }
      }

      // Constellation Lines
      for (let i = 0; i < visibleStars.length; i++) {
        for (let j = i + 1; j < visibleStars.length; j++) {
          const dx = visibleStars[i].x - visibleStars[j].x;
          const dy = visibleStars[i].y - visibleStars[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 85) {
            const lineAlpha = (1 - d / 85) * 0.35;
            ctx.beginPath();
            ctx.moveTo(visibleStars[i].x, visibleStars[i].y);
            ctx.lineTo(visibleStars[j].x, visibleStars[j].y);
            ctx.strokeStyle = 'rgba(0, 240, 255, ' + lineAlpha + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Meteors
      meteorTimer += dt;
      if (meteorTimer > 4 && Math.random() < 0.03) {
        spawnMeteor();
        meteorTimer = 0;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.life -= m.decay;

        if (m.life <= 0 || m.x > width || m.y > height) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.length * m.life;
        const tailY = m.y - Math.sin(m.angle) * m.length * m.life;

        const mGrad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        mGrad.addColorStop(0, 'rgba(255, 255, 255, ' + m.life + ')');
        mGrad.addColorStop(0.3, 'rgba(0, 240, 255, ' + (m.life * 0.8) + ')');
        mGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = mGrad;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  /* ==============================================================
     3. AVENGERS INITIATIVE TACTICAL HUD BAR
     ============================================================== */
  function setupAvengersHudBar() {
    if (document.getElementById('avengers-hud-bar')) return;

    const bar = document.createElement('div');
    bar.id = 'avengers-hud-bar';
    bar.className = 'avengers-hud-bar';
    bar.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;">
        <img src="/assets/avengers-badge.svg" class="avengers-badge-icon" alt="Avengers Emblem" />
        <span><strong>STARK INDUSTRIES</strong> // AVENGERS INITIATIVE PROTOCOL 421</span>
      </div>
      <div style="display:none;align-items:center;gap:18px;" class="md:flex">
        <span>PRODUCT: <strong style="color:#00f0ff;">VICTOR AI</strong> (JARVIS-CLASS OS)</span>
        <span>ARC REACTOR: <strong style="color:#00f0ff;">100% OPERATIONAL</strong></span>
        <span>SECURITY: <strong style="color:#fbbf24;">CLEARANCE LEVEL 7</strong></span>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <button id="stark-sound-toggle" style="background:rgba(0,240,255,0.12);border:1px solid rgba(0,240,255,0.4);border-radius:4px;padding:2px 8px;font-size:10px;color:#00f0ff;cursor:pointer;font-family:inherit;">⚡ FX: ON</button>
        <span style="color:#22c55e;">● SYSTEM LIVE</span>
      </div>
    `;

    document.body.prepend(bar);
  }

  /* ==============================================================
     4. AVENGERS HIGH-TECH SCI-FI AUDIO SYNTHESIZER (WEB AUDIO API)
     ============================================================== */
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playHighTechChirp(freq1, freq2, duration, type = 'sine', gainVal = 0.04) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq1, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq2, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function setupAvengersAudio() {
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('#stark-sound-toggle');
      if (toggle) {
        soundEnabled = !soundEnabled;
        toggle.textContent = soundEnabled ? '⚡ FX: ON' : '⚡ FX: OFF';
        toggle.style.color = soundEnabled ? '#00f0ff' : '#94a3b8';
        if (soundEnabled) playHighTechChirp(800, 1600, 0.08, 'sine', 0.06);
      }
    });

    const interactiveElements = document.querySelectorAll('button, a, .card-tier');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        playHighTechChirp(1800, 2400, 0.035, 'sine', 0.02);
      }, { passive: true });
    });
  }

  /* ==============================================================
     5. 3D CARD PERSPECTIVE TILT
     ============================================================== */
  function setup3DCardTilt() {
    const cards = document.querySelectorAll('.card-tier, div[class*="rounded-2xl"], div[class*="rounded-3xl"]');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const rotX = ((y - cy) / cy) * -6;
        const rotY = ((x - cx) / cx) * 6;

        card.style.transform = 'perspective(1000px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) translateY(-4px)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* ==============================================================
     6. CLICK ENERGY SHOCKWAVE EFFECT
     ============================================================== */
  function setupClickShockwaves() {
    window.addEventListener('click', (e) => {
      playHighTechChirp(880, 1760, 0.08, 'triangle', 0.05);

      const wave = document.createElement('div');
      wave.style.position = 'fixed';
      wave.style.left = e.clientX + 'px';
      wave.style.top = e.clientY + 'px';
      wave.style.width = '10px';
      wave.style.height = '10px';
      wave.style.borderRadius = '50%';
      wave.style.border = '2px solid #00f0ff';
      wave.style.boxShadow = '0 0 20px #00f0ff, inset 0 0 10px #00f0ff';
      wave.style.transform = 'translate(-50%, -50%) scale(1)';
      wave.style.pointerEvents = 'none';
      wave.style.zIndex = '99999';
      wave.style.transition = 'all 0.65s cubic-bezier(0.1, 0.9, 0.2, 1)';
      wave.style.opacity = '1';

      document.body.appendChild(wave);

      requestAnimationFrame(() => {
        wave.style.transform = 'translate(-50%, -50%) scale(22)';
        wave.style.opacity = '0';
      });

      setTimeout(() => wave.remove(), 700);
    });
  }

})();
