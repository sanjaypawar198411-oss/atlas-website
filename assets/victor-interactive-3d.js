/**
 * STARK INDUSTRIES // EXECUTIVE DESKTOP AI
 * - Deep Space Interactive Starfield (3D Multi-plane Parallax)
 * - Authentic Stark Industries Official Brand Mark
 * - Clean Luxury UI Glassmorphism
 * - Refined 3D Card Perspective
 * - Avengers Theme Cinematic Background Music (BGM) with Floating Controller
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
    setup3DCardTilt();
    setupAvengersBGM();

    // Cleanly hook brand & typography without interfering with React
    applyExecutiveBranding();
    const timer = setInterval(applyExecutiveBranding, 150);
    setTimeout(() => clearInterval(timer), 8000);

    if (window.MutationObserver) {
      const observer = new MutationObserver(() => {
        applyExecutiveBranding();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  /* ==============================================================
     1. OFFICIAL STARK INDUSTRIES BRANDING
     ============================================================== */
  function applyExecutiveBranding() {
    // 1. Clean Navbar Brand
    const navBar = document.querySelector('nav');
    if (navBar) {
      const firstLink = navBar.querySelector('a');
      if (firstLink && !firstLink.classList.contains('stark-applied')) {
        firstLink.classList.add('stark-applied');
        firstLink.className = 'stark-brand-logo stark-applied group';
        firstLink.setAttribute('aria-label', 'Stark Industries — Victor AI');
        firstLink.innerHTML = `
          <img src="/assets/stark-industries-official.png" alt="Stark Industries" class="stark-logo-img" />
          <span class="stark-logo-divider"></span>
          <span class="stark-product-tag"><span class="stark-product-dot"></span>VICTOR AI</span>
        `;
      }
    }

    // 2. Clean Footer Brand
    const footer = document.querySelector('footer');
    if (footer) {
      const footerLink = footer.querySelector('a[href="/"]');
      if (footerLink && !footerLink.classList.contains('stark-applied')) {
        footerLink.classList.add('stark-applied');
        footerLink.className = 'stark-brand-logo stark-applied group w-fit';
        footerLink.innerHTML = `
          <img src="/assets/stark-industries-official.png" alt="Stark Industries" class="stark-logo-img" />
          <span class="stark-logo-divider"></span>
          <span class="stark-product-tag"><span class="stark-product-dot"></span>VICTOR AI</span>
        `;
      }
    }

    // 3. Executive Hero Headline & Subhead
    const heroHeading = document.querySelector('h1');
    if (heroHeading && !heroHeading.classList.contains('stark-heading-applied')) {
      heroHeading.classList.add('stark-heading-applied');
      heroHeading.innerHTML = `
        <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-semibold tracking-[0.2em] uppercase text-cyan-400 mb-4 font-mono">Stark Industries R&D</span>
        <span class="block text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-2">The Autonomous <br class="sm:hidden"/><span class="text-gradient-cyan">JARVIS-Class AI</span></span>
        <span class="block text-3xl sm:text-5xl md:text-6xl font-light text-white/90">for Windows PC.</span>
      `;

      const subtitle = heroHeading.parentNode.querySelector('p');
      if (subtitle && !subtitle.classList.contains('stark-sub-applied')) {
        subtitle.classList.add('stark-sub-applied');
        subtitle.textContent = 'Engineered by Stark Industries. Transform Windows into a cinematic, voice-controlled command center with local neural execution and complete privacy.';
      }
    }
  }

  /* ==============================================================
     2. CINEMATIC 3D DEEP SPACE CANVAS
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

    const STAR_COUNT = Math.min(400, Math.floor((width * height) / 3200));
    let stars = [];

    function initStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: (Math.random() - 0.5) * width * 2,
          y: (Math.random() - 0.5) * height * 2,
          z: Math.random() * 1000 + 1,
          size: Math.random() * 1.4 + 0.6,
          baseAlpha: Math.random() * 0.6 + 0.35,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          isCyan: Math.random() < 0.25
        });
      }
    }
    initStars();

    let lastTime = performance.now();

    function render(now) {
      lastTime = now;

      mouse.x += (mouse.targetX - mouse.x) * 0.035;
      mouse.y += (mouse.targetY - mouse.y) * 0.035;
      mouse.tiltX = ((mouse.x - width * 0.5) / (width * 0.5)) * 90;
      mouse.tiltY = ((mouse.y - height * 0.5) / (height * 0.5)) * 90;

      ctx.fillStyle = '#02040a';
      ctx.fillRect(0, 0, width, height);

      const grad = ctx.createRadialGradient(
        width * 0.5 - mouse.tiltX * 0.2, height * 0.3 - mouse.tiltY * 0.2, 5,
        width * 0.5 - mouse.tiltX * 0.2, height * 0.3 - mouse.tiltY * 0.2, width * 0.6
      );
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.035)');
      grad.addColorStop(0.5, 'rgba(2, 132, 199, 0.015)');
      grad.addColorStop(1, 'rgba(2, 4, 10, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= 0.5;
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
          const alpha = star.baseAlpha * (0.65 + 0.35 * twinkle) * (1 - star.z / 1000);
          const r = star.size * (1 - star.z / 1000) * 1.5 + 0.4;

          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);

          if (star.isCyan) {
            ctx.fillStyle = 'rgba(0, 240, 255, ' + alpha + ')';
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = r * 2.5;
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
            ctx.shadowBlur = 0;
          }

          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  /* ==============================================================
     3. REFINED 3D CARD PERSPECTIVE TILT
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

        const rotX = ((y - cy) / cy) * -4.5;
        const rotY = ((x - cx) / cx) * 4.5;

        card.style.transform = 'perspective(1200px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) translateY(-2px)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* ==============================================================
     4. AVENGERS THEME BGM CONTROLLER & AUDIO ENGINE
     ============================================================== */
  function setupAvengersBGM() {
    if (document.getElementById('stark-bgm-widget')) return;

    // Create Audio Element
    let audio = document.getElementById('stark-avengers-audio');
    if (!audio) {
      audio = document.createElement('audio');
      audio.id = 'stark-avengers-audio';
      audio.src = '/assets/avengers-theme.mp3';
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0.35;
      document.body.appendChild(audio);
    }

    // Create Floating Controller
    const widget = document.createElement('div');
    widget.id = 'stark-bgm-widget';
    widget.className = 'stark-bgm-controller';
    widget.title = 'Click to Play / Pause Avengers Theme BGM';
    widget.innerHTML = `
      <div class="stark-bgm-soundwave">
        <span class="stark-bgm-bar"></span>
        <span class="stark-bgm-bar"></span>
        <span class="stark-bgm-bar"></span>
        <span class="stark-bgm-bar"></span>
      </div>
      <span class="stark-bgm-label">Avengers BGM</span>
      <span class="stark-bgm-status" id="stark-bgm-status-text">▶ PLAY</span>
    `;
    document.body.appendChild(widget);

    const statusText = widget.querySelector('#stark-bgm-status-text');

    function togglePlay() {
      if (audio.paused) {
        audio.play().then(() => {
          widget.classList.add('stark-bgm-playing');
          statusText.textContent = '⏸ PAUSE';
          statusText.style.color = '#00f0ff';
        }).catch((err) => {
          console.log('Autoplay restriction, user click required');
        });
      } else {
        audio.pause();
        widget.classList.remove('stark-bgm-playing');
        statusText.textContent = '▶ PLAY';
        statusText.style.color = '#94a3b8';
      }
    }

    widget.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });

    // Optional: Start on first user interaction with the page
    const startOnInteraction = () => {
      if (audio.paused) {
        audio.play().then(() => {
          widget.classList.add('stark-bgm-playing');
          statusText.textContent = '⏸ PAUSE';
          statusText.style.color = '#00f0ff';
        }).catch(() => {});
      }
      window.removeEventListener('click', startOnInteraction);
    };

    window.addEventListener('click', startOnInteraction, { once: true });
  }

})();
