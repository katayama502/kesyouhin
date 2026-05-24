// ============================
// Creatte LP — Scroll & Interactions
// ============================

(() => {
  // ---- Header scroll state
  const header = document.querySelector('.site-header');
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (y > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Parallax on hero
  const heroMedia = document.querySelector('.hero-media');
  const heroBadge = document.querySelector('.hero-badge');
  const onParallax = () => {
    const y = window.scrollY;
    if (heroMedia && y < window.innerHeight * 1.2) {
      heroMedia.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1 + y * 0.0002})`;
    }
    if (heroBadge && y < window.innerHeight) {
      heroBadge.style.transform = `translate3d(0, ${y * -0.15}px, 0)`;
    }
  };
  let raf = null;
  window.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { onParallax(); raf = null; });
  }, { passive: true });
  onParallax();

  // ---- Reveal on scroll (IntersectionObserver)
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => io.observe(el));

  // ---- FAQ accordion
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach((o) => o.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- How-to toggle
  const toggleBtns = document.querySelectorAll('.howto-toggle button');
  const stepPanels = document.querySelectorAll('.howto-steps');
  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      toggleBtns.forEach((b) => b.classList.toggle('active', b === btn));
      stepPanels.forEach((p) => {
        p.style.display = (p.dataset.panel === target) ? 'grid' : 'none';
      });
    });
  });

  // ---- Ensure first FAQ open + steps visible
  const firstFaq = document.querySelector('.faq-item');
  if (firstFaq) firstFaq.classList.add('open');

  // ---- Smooth anchor scroll offset for fixed header
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
