/**
 * VICTOR AI // AUTONOMOUS SCI-FI DESKTOP AI
 * Created by Punit Pawar
 * 
 * ARCHER AI THEME SYSTEM (https://archerai.pages.dev/):
 * - Pure Pitch Black Canvas (#000000)
 * - Ambient Neon Glow Blooms (Cyan, Violet, Teal)
 * - Floating Pill Glass Navbar with Active Gradient Underline
 * - Sci-Fi Chamfered Cut-Corner Amber/Gold CTA Buttons
 * - High-Impact Neon Pricing Cards
 * - Founder Card for Punit Pawar
 */

(function () {
  'use strict';

  // 1. Remove any legacy audio / BGM widgets immediately
  function removeLegacyAudio() {
    const legacyAudio = document.getElementById('stark-avengers-audio');
    if (legacyAudio && legacyAudio.parentNode) {
      legacyAudio.pause();
      legacyAudio.parentNode.removeChild(legacyAudio);
    }
    const legacyWidget = document.getElementById('stark-bgm-widget');
    if (legacyWidget && legacyWidget.parentNode) {
      legacyWidget.parentNode.removeChild(legacyWidget);
    }
  }
  removeLegacyAudio();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    removeLegacyAudio();
    setupArcherGlowBlobs();
    setupStarfieldCanvas();
    setup3DCardTilt();

    // Apply Victor AI by Punit Pawar branding
    applyVictorBranding();
    const timer = setInterval(applyVictorBranding, 150);
    setTimeout(() => clearInterval(timer), 8000);

    if (window.MutationObserver) {
      const observer = new MutationObserver(() => {
        applyVictorBranding();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  /* ==============================================================
     1. ARCHER AI AMBIENT GLOW BLOBS
     ============================================================== */
  function setupArcherGlowBlobs() {
    if (document.getElementById('archer-glow-container')) return;

    const container = document.createElement('div');
    container.id = 'archer-glow-container';
    container.setAttribute('aria-hidden', 'true');
    container.innerHTML = `
      <div class="archer-glow-blob archer-glow-cyan"></div>
      <div class="archer-glow-blob archer-glow-violet"></div>
      <div class="archer-glow-blob archer-glow-teal"></div>
    `;
    document.body.prepend(container);
  }

  /* ==============================================================
     2. VICTOR AI (BY PUNIT PAWAR) BRANDING & THEME HOOKS
     ============================================================== */
  function applyVictorBranding() {
    // A. Clean Floating Navbar Brand
    const navBar = document.querySelector('nav');
    if (navBar) {
      const firstLink = navBar.querySelector('a');
      if (firstLink && !firstLink.classList.contains('victor-applied')) {
        firstLink.classList.add('victor-applied');
        firstLink.className = 'victor-brand-logo victor-applied group';
        firstLink.setAttribute('aria-label', 'Victor AI');
        firstLink.innerHTML = `
          <div class="victor-logo-frame">
            <img src="/logo.png" alt="Victor AI" class="victor-logo-img" />
          </div>
          <span class="victor-brand-name">VICTOR AI</span>
        `;
      }

      // Active nav link indicator
      const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
      const navLinks = navBar.querySelectorAll('a[href]');
      navLinks.forEach((link) => {
        const href = (link.getAttribute('href') || '').replace(/\/$/, '') || '/';
        if (href === currentPath) {
          link.classList.add('nav-active');
        } else if (href !== '/' && currentPath.startsWith(href)) {
          link.classList.add('nav-active');
        } else {
          link.classList.remove('nav-active');
        }
      });
    }

    // B. Clean Footer Brand
    const footer = document.querySelector('footer');
    if (footer) {
      const footerLink = footer.querySelector('a[href="/"]');
      if (footerLink && !footerLink.classList.contains('victor-applied')) {
        footerLink.classList.add('victor-applied');
        footerLink.className = 'victor-brand-logo victor-applied group w-fit';
        footerLink.innerHTML = `
          <div class="victor-logo-frame">
            <img src="/logo.png" alt="Victor AI" class="victor-logo-img" />
          </div>
          <span class="victor-brand-name">VICTOR AI</span>
        `;
      }

      // Footer Copyright
      const copyrightP = footer.querySelector('p.text-gray-500, p[class*="text-gray"]');
      if (copyrightP && !copyrightP.classList.contains('victor-copy-applied')) {
        copyrightP.classList.add('victor-copy-applied');
        copyrightP.innerHTML = '© 2026 Victor AI. All rights reserved. ';
      }
    }

    // C. Hero Headline & Subhead
    const heroHeading = document.querySelector('h1');
    if (heroHeading && !heroHeading.classList.contains('victor-heading-applied')) {
      heroHeading.classList.add('victor-heading-applied');
      heroHeading.innerHTML = `
        <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-[11px] font-semibold tracking-[0.16em] uppercase text-cyan-300 mb-4 font-mono">Autonomous Desktop Experience</span>
        <span class="block text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-2">The Autonomous <br class="sm:hidden"/><span class="text-gradient-cyan">JARVIS-Class AI</span></span>
        <span class="block text-3xl sm:text-5xl md:text-6xl font-light text-white/90">for Windows PC.</span>
      `;

      const subtitle = heroHeading.parentNode.querySelector('p');
      if (subtitle && !subtitle.classList.contains('victor-sub-applied')) {
        subtitle.classList.add('victor-sub-applied');
        subtitle.textContent = 'Victor AI — Transform Windows into a cinematic, voice-controlled command center with local neural execution and complete privacy.';
      }
    }

    // D. Founder Card Enhancement (on /about page and anywhere present)
    const founderHeading = Array.from(document.querySelectorAll('div, h2, h3, span')).find(
      (el) => el.textContent && el.textContent.trim().toUpperCase() === 'THE FOUNDER'
    );
    if (founderHeading) {
      const founderCard = founderHeading.closest('section, div[class*="rounded"]');
      if (founderCard && !founderCard.classList.contains('punit-applied')) {
        founderCard.classList.add('punit-applied');

        // Remove creator image completely as requested
        const pic = founderCard.querySelector('picture');
        if (pic && pic.parentNode) {
          pic.parentNode.removeChild(pic);
        } else {
          const img = founderCard.querySelector('img');
          if (img && img.parentNode) img.parentNode.removeChild(img);
        }

        // Update founder title / name
        const nameEl = founderCard.querySelector('.text-white.font-semibold, div[class*="text-lg"]');
        if (nameEl) {
          nameEl.textContent = 'Punit Pawar';
        }

        const roleEl = founderCard.querySelector('.text-white\\/40, div[class*="text-sm"]');
        if (roleEl) {
          roleEl.textContent = 'Founder, Engineer & Creator — India';
        }

        // Update description paragraph
        const descEl = founderCard.querySelector('p');
        if (descEl && descEl.textContent.includes('was founded by')) {
          descEl.innerHTML = 'Victor AI was founded by <strong class="text-white">Punit Pawar</strong> — a self-taught developer, engineer, and creator from India who built everything solo: <span class="text-white font-medium">the code, the design, the vision.</span> No big team. No outside funding. Just one person who decided the future shouldn’t wait.';
        }
      }
    }
  }

  /* ==============================================================
     3. DEEP BLACK PARTICLE STARFIELD CANVAS (#000000)
     ============================================================== */
  function setupStarfieldCanvas() {
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

    const STAR_COUNT = Math.min(320, Math.floor((width * height) / 3800));
    let stars = [];

    function initStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: (Math.random() - 0.5) * width * 2,
          y: (Math.random() - 0.5) * height * 2,
          z: Math.random() * 1000 + 1,
          size: Math.random() * 1.3 + 0.5,
          baseAlpha: Math.random() * 0.6 + 0.3,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          isCyan: Math.random() < 0.28
        });
      }
    }
    initStars();

    function render() {
      mouse.x += (mouse.targetX - mouse.x) * 0.035;
      mouse.y += (mouse.targetY - mouse.y) * 0.035;
      mouse.tiltX = ((mouse.x - width * 0.5) / (width * 0.5)) * 60;
      mouse.tiltY = ((mouse.y - height * 0.5) / (height * 0.5)) * 60;

      // Pure Pitch Black Base
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= 0.45;
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
          const r = star.size * (1 - star.z / 1000) * 1.4 + 0.4;

          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);

          if (star.isCyan) {
            ctx.fillStyle = 'rgba(56, 189, 248, ' + alpha + ')';
            ctx.shadowColor = '#38bdf8';
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
     4. CARD TILT
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

        const rotX = ((y - cy) / cy) * -3.5;
        const rotY = ((x - cx) / cx) * 3.5;

        card.style.transform = 'perspective(1200px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) translateY(-2px)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

})();
