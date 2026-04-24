/* ============================================================
   FastForward 向前海外 — 主 JS 入口
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 导航栏滚动毛玻璃效果 ---- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }, { passive: true });
    // 初始判断
    if (window.scrollY > 40) nav.classList.add('scrolled');
  }

  /* ---- 汉堡菜单 ---- */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // 点击链接后关闭
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ---- 当前页面导航高亮 ---- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- 平滑锚点滚动 ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- CountUp 数字动画 ---- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 2000;
    const startTime = performance.now();
    const isFloat = String(target).includes('.');
    function step(now) {
      const elapsed = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - elapsed, 3);
      const current = target * ease;
      el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
      if (elapsed < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const countEls = document.querySelectorAll('[data-countup]');
  if (countEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = '1';
          animateCount(entry.target);
        }
      });
    }, { threshold: 0.5 });
    countEls.forEach(el => observer.observe(el));
  }

  /* ---- 滚动入场动画（轻量 IntersectionObserver 替代 GSAP） ---- */
  const animTargets = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in');
  if (animTargets.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay || 0;
          setTimeout(() => {
            el.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
            el.style.opacity = '1';
            el.style.transform = 'none';
          }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15 });
    animTargets.forEach(el => io.observe(el));
  }

  /* ---- 视频自动静音播放（移动端兼容） ---- */
  document.querySelectorAll('video[autoplay]').forEach(video => {
    video.muted = true;
    video.playsInline = true;
    video.play().catch(() => {});
  });

  /* ---- 简易 Swiper 轮播（无依赖版备用） ---- */
  document.querySelectorAll('.simple-carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsWrap = carousel.querySelector('.carousel-dots');
    if (!track || !slides.length) return;

    let current = 0;
    const total = slides.length;

    // 创建 dots
    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dotsWrap && dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

    // 自动轮播
    let autoplay = setInterval(() => goTo(current + 1), 4000);
    carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
    carousel.addEventListener('mouseleave', () => { autoplay = setInterval(() => goTo(current + 1), 4000); });
  });

});
