/**
 * VICTOR AI - AWWWARDS-TIER 3D INTERACTIVE EXPERIENCE
 * Features:
 * 1. 3D Interactive Liquid Gold Wave & Neural Mesh (WebGL/Canvas)
 * 2. Real-time Cursor Disturbance & Ripple Physics
 * 3. 3D Floating Golden Embers & Stardust
 * 4. Interactive 24K Gold Ambient Cursor Spotlight
 * 5. 3D Card Perspective Tilt & Metallic Specular Glare
 * 6. Interactive Click Energy Shockwaves & Particle Bursts
 * 7. Live Audio-Reactive Quantum Equalizer in Hero
 */

(function () {
  'use strict';

  // Wait for DOM to be ready
  function init() {
    setupBackgroundCanvas();
    setupCursorSpotlight();
    setup3DCardTilt();
    setupClickShockwave();
    setupHeroInteractiveCore();
  }

  /* ==============================================================
     1. 3D INTERACTIVE LIQUID GOLD WAVE & NEURAL PARTICLE SYSTEM
     ============================================================== */
  function setupBackgroundCanvas() {
    // Check if canvas already exists
    let canvas = document.getElementById('victor-3d-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'victor-3d-canvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '0'; // Behind content, above base bg
      canvas.style.opacity = '0.95';
      document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth damping
    let mouse = { x: width * 0.5, y: height * 0.4, vx: 0, vy: 0, targetX: width * 0.5, targetY: height * 0.4 };
    let lastMouse = { x: mouse.x, y: mouse.y };

    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGrid();
    });

    // 3D Perspective Wave Grid Setup
    const COLS = Math.min(55, Math.floor(width / 26));
    const ROWS = 38;
    const SPACING_X = Math.max(30, width / (COLS - 1));
    const SPACING_Z = 32;
    let grid = [];

    function initGrid() {
      grid = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          grid.push({
            origX: (c - COLS / 2) * SPACING_X,
            origZ: r * SPACING_Z + 120,
            y: 0,
            vy: 0,
            r: r,
            c: c,
          });
        }
      }
    }
    initGrid();

    // 3D Floating Gold Embers
    const EMBER_COUNT = 75;
    const embers = [];
    for (let i = 0; i < EMBER_COUNT; i++) {
      embers.push({
        x: (Math.random() - 0.5) * width * 1.4,
        y: Math.random() * height * 1.2,
        z: Math.random() * 800 + 100,
        size: Math.random() * 2.4 + 1.0,
        speedY: -(Math.random() * 0.6 + 0.2),
        speedX: (Math.random() - 0.5) * 0.4,
        hue: Math.random() > 0.4 ? 'rgba(255, 215, 0,' : 'rgba(212, 175, 55,',
        alpha: Math.random() * 0.6 + 0.3,
        pulseSpeed: Math.random() * 0.04 + 0.02,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Animation Loop
    let time = 0;
    const FOV = 420;

    function render() {
      requestAnimationFrame(render);
      time += 0.024;

      // Mouse Lerp
      mouse.vx = (mouse.targetX - mouse.x) * 0.07;
      mouse.vy = (mouse.targetY - mouse.y) * 0.07;
      mouse.x += mouse.vx;
      mouse.y += mouse.vy;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5 + (mouse.x - width * 0.5) * 0.08;
      const centerY = height * 0.62 + (mouse.y - height * 0.5) * 0.05;

      // Calculate Wave Heights & Mouse Disturbance
      const mouseGridDistX = mouse.x - width * 0.5;
      const mouseGridDistY = mouse.y - height * 0.6;

      for (let i = 0; i < grid.length; i++) {
        const pt = grid[i];

        // Harmonic organic multi-frequency waves
        const wave1 = Math.sin(pt.origX * 0.007 + time * 1.6) * Math.cos(pt.origZ * 0.009 + time * 1.2) * 32;
        const wave2 = Math.sin(pt.origX * 0.003 - time * 0.8) * 18;
        const wave3 = Math.cos(pt.origZ * 0.006 + time * 1.0) * 14;

        // Interactive Mouse Wave disturbance
        const dx = pt.origX - mouseGridDistX * 1.2;
        const dz = pt.origZ - (mouseGridDistY * 0.8 + 300);
        const dist = Math.sqrt(dx * dx + dz * dz);
        let mouseDisplacement = 0;
        if (dist < 260) {
          const factor = (1 - dist / 260);
          mouseDisplacement = Math.sin(dist * 0.06 - time * 6) * factor * 48;
        }

        pt.y = wave1 + wave2 + wave3 + mouseDisplacement;
      }

      // Draw 3D Perspective Lines & Glowing Nodes
      ctx.lineWidth = 1;

      for (let r = 0; r < ROWS; r++) {
        ctx.beginPath();
        let rowStarted = false;

        for (let c = 0; c < COLS; c++) {
          const idx = r * COLS + c;
          const pt = grid[idx];

          const z = pt.origZ;
          const scale = FOV / (FOV + z);
          const px = pt.origX * scale + centerX;
          const py = (pt.y + 60) * scale + centerY;

          if (scale > 0 && px >= -100 && px <= width + 100) {
            if (!rowStarted) {
              ctx.moveTo(px, py);
              rowStarted = true;
            } else {
              ctx.lineTo(px, py);
            }
          }
        }

        // Gradient color along depth
        const depthAlpha = Math.max(0.04, Math.min(0.38, 1 - r / ROWS));
        ctx.strokeStyle = `rgba(212, 175, 55, ${depthAlpha * 0.65})`;
        ctx.stroke();
      }

      // Draw Grid Nodes (Particles) with Specular Gold Core
      for (let i = 0; i < grid.length; i += 2) {
        const pt = grid[i];
        const scale = FOV / (FOV + pt.origZ);
        const px = pt.origX * scale + centerX;
        const py = (pt.y + 60) * scale + centerY;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const distToMouse = Math.hypot(px - mouse.x, py - mouse.y);
          const isNearMouse = distToMouse < 180;
          const nodeRadius = (isNearMouse ? 2.8 : 1.4) * scale;
          const alpha = (isNearMouse ? 0.95 : 0.45) * Math.min(1, scale * 1.5);

          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.6, nodeRadius), 0, Math.PI * 2);
          ctx.fillStyle = isNearMouse
            ? `rgba(255, 235, 130, ${alpha})`
            : `rgba(212, 175, 55, ${alpha * 0.75})`;
          ctx.fill();

          // Mouse proximity laser connections
          if (isNearMouse && distToMouse < 90) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 215, 0, ${(1 - distToMouse / 90) * 0.25})`;
            ctx.stroke();
          }
        }
      }

      // Render Floating 3D Embers
      for (let i = 0; i < embers.length; i++) {
        const em = embers[i];
        em.y += em.speedY;
        em.x += em.speedX + (mouse.vx * 0.015);
        if (em.y < -50) em.y = height + 50;
        if (em.x < -width * 0.3) em.x = width * 1.3;
        if (em.x > width * 1.3) em.x = -width * 0.3;

        const pulse = Math.sin(time * 2 + em.pulseOffset) * 0.2 + 0.8;
        const emScale = FOV / (FOV + em.z);
        const emPx = em.x * emScale + width * 0.5;
        const emPy = em.y;

        ctx.beginPath();
        ctx.arc(emPx, emPy, em.size * emScale * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `${em.hue} ${em.alpha * pulse})`;
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    render();
  }

  /* ==============================================================
     2. DYNAMIC 24K GOLD CURSOR AMBIENT SPOTLIGHT
     ============================================================== */
  function setupCursorSpotlight() {
    let spotlight = document.getElementById('victor-cursor-spotlight');
    if (!spotlight) {
      spotlight = document.createElement('div');
      spotlight.id = 'victor-cursor-spotlight';
      spotlight.style.position = 'fixed';
      spotlight.style.top = '0';
      spotlight.style.left = '0';
      spotlight.style.width = '680px';
      spotlight.style.height = '680px';
      spotlight.style.borderRadius = '50%';
      spotlight.style.pointerEvents = 'none';
      spotlight.style.zIndex = '1';
      spotlight.style.background = 'radial-gradient(circle at center, rgba(255, 215, 0, 0.16) 0%, rgba(212, 175, 55, 0.08) 35%, transparent 70%)';
      spotlight.style.transform = 'translate(-50%, -50%) translate3d(-999px, -999px, 0)';
      spotlight.style.transition = 'opacity 0.4s ease';
      spotlight.style.mixBlendMode = 'screen';
      document.body.appendChild(spotlight);
    }

    let curX = -999, curY = -999;
    let targetX = -999, targetY = -999;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    function updateSpotlight() {
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;
      spotlight.style.transform = `translate(-50%, -50%) translate3d(${curX}px, ${curY}px, 0)`;
      requestAnimationFrame(updateSpotlight);
    }
    updateSpotlight();
  }

  /* ==============================================================
     3. 3D CARD PERSPECTIVE TILT WITH METALLIC SPECULAR SHEEN
     ============================================================== */
  function setup3DCardTilt() {
    const cardSelectors = [
      '.glass-card',
      'nav',
      '[class*="rounded-3xl"]',
      '[class*="rounded-2xl"]',
      '[class*="bg-black/"]',
      '.btn-pill-primary'
    ];

    function applyTilt() {
      const cards = document.querySelectorAll(cardSelectors.join(','));

      cards.forEach((card) => {
        // Prevent duplicate listener
        if (card.dataset.tiltApplied) return;
        card.dataset.tiltApplied = 'true';

        card.style.transition = 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.2s ease';
        card.style.transformStyle = 'preserve-3d';

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -6.5; // Max 6.5 deg tilt
          const rotateY = ((x - centerX) / centerX) * 6.5;

          card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;
          card.style.boxShadow = `0 20px 45px -12px rgba(212, 175, 55, 0.35), 0 0 25px -4px rgba(255, 215, 0, 0.25)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
          card.style.boxShadow = '';
        });
      });
    }

    applyTilt();
    // Re-check for dynamically rendered elements
    setInterval(applyTilt, 2000);
  }

  /* ==============================================================
     4. CLICK ENERGY SHOCKWAVE & GOLDEN SPARK EXPLOSION
     ============================================================== */
  function setupClickShockwave() {
    window.addEventListener('click', (e) => {
      // Don't trigger if clicked on link/input/button directly (or still show subtle burst)
      createShockwave(e.clientX, e.clientY);
    });

    function createShockwave(x, y) {
      // 1. Expanding Holographic Ring
      const ring = document.createElement('div');
      ring.style.position = 'fixed';
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      ring.style.width = '20px';
      ring.style.height = '20px';
      ring.style.borderRadius = '50%';
      ring.style.border = '2px solid #ffd700';
      ring.style.boxShadow = '0 0 20px #ffd700, inset 0 0 15px #d4af37';
      ring.style.transform = 'translate(-50%, -50%) scale(1)';
      ring.style.pointerEvents = 'none';
      ring.style.zIndex = '99999';
      ring.style.transition = 'transform 0.65s cubic-bezier(0.1, 0.8, 0.2, 1), opacity 0.65s ease';
      document.body.appendChild(ring);

      requestAnimationFrame(() => {
        ring.style.transform = 'translate(-50%, -50%) scale(14)';
        ring.style.opacity = '0';
      });

      setTimeout(() => ring.remove(), 700);

      // 2. Bursting Golden Sparks
      const sparkCount = 14;
      for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.4;
        const velocity = Math.random() * 85 + 40;
        const targetX = Math.cos(angle) * velocity;
        const targetY = Math.sin(angle) * velocity;

        spark.style.position = 'fixed';
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        spark.style.width = `${Math.random() * 4 + 3}px`;
        spark.style.height = spark.style.width;
        spark.style.borderRadius = '50%';
        spark.style.backgroundColor = Math.random() > 0.3 ? '#ffd700' : '#ffffff';
        spark.style.boxShadow = '0 0 10px #ffd700';
        spark.style.pointerEvents = 'none';
        spark.style.zIndex = '99999';
        spark.style.transform = 'translate(-50%, -50%) scale(1)';
        spark.style.transition = 'transform 0.55s cubic-bezier(0.15, 0.85, 0.35, 1), opacity 0.55s ease';
        document.body.appendChild(spark);

        requestAnimationFrame(() => {
          spark.style.transform = `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) scale(0)`;
          spark.style.opacity = '0';
        });

        setTimeout(() => spark.remove(), 600);
      }
    }
  }

  /* ==============================================================
     5. HERO INTERACTIVE 3D CORE GYROSCOPE & AUDIO EQUALIZER
     ============================================================== */
  function setupHeroInteractiveCore() {
    // Find the hero central aspect-square avatar container
    const heroCore = document.querySelector('.aspect-square');
    if (heroCore) {
      window.addEventListener('mousemove', (e) => {
        const rect = heroCore.getBoundingClientRect();
        const coreCenterX = rect.left + rect.width / 2;
        const coreCenterY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - coreCenterX) / (window.innerWidth / 2);
        const deltaY = (e.clientY - coreCenterY) / (window.innerHeight / 2);

        heroCore.style.transform = `perspective(1000px) rotateY(${deltaX * 18}deg) rotateX(${-deltaY * 18}deg) scale(1.03)`;
        heroCore.style.transition = 'transform 0.1s ease-out';
      });

      heroCore.addEventListener('mouseleave', () => {
        heroCore.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
        heroCore.style.transition = 'transform 0.5s ease-out';
      });
    }

    // Interactive Audio Equalizer Bar
    let eqContainer = document.getElementById('victor-live-equalizer');
    if (!eqContainer) {
      const heroSection = document.querySelector('section[aria-label="Hero Introduction"]') || document.querySelector('main');
      if (heroSection) {
        eqContainer = document.createElement('div');
        eqContainer.id = 'victor-live-equalizer';
        eqContainer.style.display = 'flex';
        eqContainer.style.alignItems = 'center';
        eqContainer.style.justifyContent = 'center';
        eqContainer.style.gap = '5px';
        eqContainer.style.marginTop = '18px';
        eqContainer.style.marginBottom = '12px';
        eqContainer.style.cursor = 'pointer';
        eqContainer.title = 'Victor AI Live Neural Voice Core - Interactive';

        // 18 equalizer bars
        for (let i = 0; i < 22; i++) {
          const bar = document.createElement('div');
          bar.className = 'eq-bar';
          bar.style.width = '3.5px';
          bar.style.height = '14px';
          bar.style.borderRadius = '3px';
          bar.style.background = 'linear-gradient(180deg, #ffd700 0%, #b8860b 100%)';
          bar.style.boxShadow = '0 0 8px rgba(255, 215, 0, 0.4)';
          bar.style.transition = 'height 0.08s ease';
          eqContainer.appendChild(bar);
        }

        // Add live status pill
        const statusPill = document.createElement('div');
        statusPill.innerHTML = '<span style="display:inline-block; width:7px; height:7px; border-radius:50%; background:#ffd700; margin-right:6px; box-shadow:0 0 10px #ffd700; animation:pulse 1.5s infinite;"></span><span style="font-size:11px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#ffd700;">NEURAL 3D CORE ACTIVE</span>';
        statusPill.style.display = 'flex';
        statusPill.style.alignItems = 'center';
        statusPill.style.justifyContent = 'center';
        statusPill.style.marginTop = '8px';

        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.alignItems = 'center';
        wrapper.style.zIndex = '20';
        wrapper.style.position = 'relative';
        wrapper.appendChild(eqContainer);
        wrapper.appendChild(statusPill);

        // Insert after hero heading or under core
        const heroContainer = heroSection.querySelector('.container') || heroSection;
        heroContainer.prepend(wrapper);

        // Animate Equalizer Bars with audio-like sine pulses + mouse speed reaction
        let eqTime = 0;
        let mouseSpeed = 0;
        let lastX = 0, lastY = 0;

        window.addEventListener('mousemove', (e) => {
          const dx = e.clientX - lastX;
          const dy = e.clientY - lastY;
          mouseSpeed = Math.min(2.5, Math.hypot(dx, dy) * 0.04);
          lastX = e.clientX;
          lastY = e.clientY;
        });

        function animateEq() {
          eqTime += 0.08;
          mouseSpeed *= 0.94; // damping
          const bars = eqContainer.querySelectorAll('.eq-bar');
          bars.forEach((bar, idx) => {
            const freq = Math.sin(eqTime * 2.2 + idx * 0.38) * 0.5 + 0.5;
            const extra = Math.sin(eqTime * 4.5 + idx * 0.8) * 0.3;
            const h = Math.max(6, (freq + extra + mouseSpeed * 0.8) * 36);
            bar.style.height = `${h.toFixed(1)}px`;
            bar.style.opacity = (0.5 + freq * 0.5).toFixed(2);
          });
          requestAnimationFrame(animateEq);
        }
        animateEq();
      }
    }
  }

  // Run when document is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
