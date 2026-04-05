/* ===== JEAN DE DIEU PORTFOLIO — main.js ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. DARK / LIGHT MODE ── */
  const themeToggle = document.getElementById('themeToggle');
  const themeStyle  = document.getElementById('theme-style');
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') enableDark();

  themeToggle.addEventListener('click', () => {
    document.body.classList.contains('dark-mode') ? enableLight() : enableDark();
  });
  function enableDark() {
    document.body.classList.add('dark-mode');
    themeStyle.removeAttribute('disabled');
    localStorage.setItem('theme', 'dark');
  }
  function enableLight() {
    document.body.classList.remove('dark-mode');
    themeStyle.setAttribute('disabled', '');
    localStorage.setItem('theme', 'light');
  }

  /* ── 2. ACTIVE NAV DOT ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  function updateNav() {
    const scrollY = window.scrollY + window.innerHeight / 3;
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── 3. AOS-LITE (Animate On Scroll) ── */
  const aosEls = document.querySelectorAll('[data-aos]');
  const aosObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('aos-animate'); aosObs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  aosEls.forEach(el => aosObs.observe(el));

  /* ── 4. STAT COUNTER ANIMATION ── */
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target, target = +el.dataset.target, dur = 1400;
        const start = performance.now();
        const tick = now => {
          const p = Math.min((now - start) / dur, 1);
          el.textContent = Math.round(p * target);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(n => counterObs.observe(n));

  /* ── 5. SKILL BARS ANIMATE ── */
  const fills   = document.querySelectorAll('.skill-fill');
  const barObs  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target;
        fill.style.width = fill.dataset.width + '%';
        barObs.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => barObs.observe(f));

  /* ── 6. SKILL FILTER TABS ── */
  document.querySelectorAll('.skill-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.skill-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.skill-bar-item').forEach(item => {
        item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
      });
    });
  });

  /* ── 7. PORTFOLIO FILTER ── */
  setupFilter('.portfolio-filters .filter-btn', '#portfolioGrid .project-card');

  /* ── 8. BLOG FILTER ── */
  setupFilter('.blog-filters .filter-btn', '#blogGrid .blog-card');

  function setupFilter(btnSel, cardSel) {
    document.querySelectorAll(btnSel).forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll(btnSel).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll(cardSel).forEach(card => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('hidden', !show);
        });
      });
    });
  }

  /* ── 9. PROJECT MODAL ── */
  const modal      = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalData  = {
    'AgroConnect Platform':  { desc: 'Digital marketplace connecting Rwandan farmers to buyers. Built with React.js, Firebase, and Africa\'s Talking API for SMS notifications.', tags: ['React.js','Firebase','Africa\'s Talking'], gh: '#', live: '#' },
    'SmartStock System':     { desc: 'Inventory management web application for small businesses. Features product CRUD, stock adjustments, sales recording, and low-stock alerts.', tags: ['HTML','CSS','JavaScript','MySQL'], gh: '#', live: '#' },
    'Staff Management App':  { desc: 'User management system with role-based access control. Supports admin, manager, and staff roles with full CRUD operations.', tags: ['Vanilla JS','HTML','CSS'], gh: '#', live: '#' },
    'Portfolio Website':     { desc: 'This very portfolio — designed in Figma and built with vanilla HTML, CSS, and JavaScript. Fully responsive with dark/light mode.', tags: ['HTML','CSS','JavaScript'], gh: '#', live: '#' },
    'IoT Dashboard':         { desc: 'Real-time sensor monitoring interface for IoT devices. Uses MQTT protocol for live data streaming and React for dynamic UI updates.', tags: ['React','MQTT','Firebase'], gh: '#', live: '#' },
    'E-Commerce UI':         { desc: 'Modern shopping experience UI design — wireframes through high-fidelity prototype in Figma. Includes product grid, cart, and checkout flow.', tags: ['Figma','UI/UX','Prototyping'], gh: '#', live: '#' },
  };

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.project-title').textContent;
      const imgText = card.querySelector('.project-img-placeholder').textContent;
      const data = modalData[title] || {};
      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalDesc').textContent  = data.desc || '';
      document.getElementById('modalImgText').textContent = imgText;
      document.getElementById('modalTags').innerHTML = (data.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
      document.getElementById('modalLinks').innerHTML =
        `<a href="${data.gh||'#'}" class="btn btn-outline btn-sm" target="_blank">GitHub</a>
         <a href="${data.live||'#'}" class="btn btn-primary btn-sm" target="_blank">Live Site</a>`;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  /* ── 10. CONTACT FORM VALIDATION ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      const rules = [
        { id: 'firstName', errId: 'firstNameError', msg: 'First name is required.' },
        { id: 'lastName',  errId: 'lastNameError',  msg: 'Last name is required.' },
        { id: 'subject',   errId: 'subjectError',   msg: 'Subject is required.' },
        { id: 'message',   errId: 'messageError',   msg: 'Message is required.' },
      ];
      rules.forEach(r => {
        const el = document.getElementById(r.id);
        const err = document.getElementById(r.errId);
        if (!el.value.trim()) { err.textContent = r.msg; valid = false; }
        else err.textContent = '';
      });

      const emailEl  = document.getElementById('email');
      const emailErr = document.getElementById('emailError');
      const emailOk  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim());
      if (!emailEl.value.trim()) { emailErr.textContent = 'Email is required.'; valid = false; }
      else if (!emailOk)         { emailErr.textContent = 'Please enter a valid email.'; valid = false; }
      else emailErr.textContent = '';

      if (valid) {
        const success = document.getElementById('formSuccess');
        form.reset();
        success.classList.add('visible');
        setTimeout(() => success.classList.remove('visible'), 5000);
      }
    });

    /* Live clear on input */
    form.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('input', () => {
        const err = document.getElementById(el.id + 'Error');
        if (err) err.textContent = '';
      });
    });
  }

  /* ── 11. SMOOTH SCROLL FOR NAV DOTS ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ── 12. BACK TO TOP ── */
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.style.opacity = window.scrollY > 400 ? '1' : '0';
    }, { passive: true });
    btt.style.opacity = '0';
    btt.style.transition = 'opacity 0.3s';
  }

});
