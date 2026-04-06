/* ===== JEAN DE DIEU PORTFOLIO — main.js ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. MOBILE MENU TOGGLE ── */
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const headerNav = document.querySelector('.header-nav');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      headerNav.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking on a nav link
  const mobileNavHeaders = document.querySelectorAll('.nav-header');
  mobileNavHeaders.forEach(header => {
    header.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      headerNav.classList.remove('active');
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!headerNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenuToggle.classList.remove('active');
      headerNav.classList.remove('active');
    }
  });

  /* ── 2. DARK / LIGHT MODE ── */
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

  /* ── 2. ACTIVE NAV HEADER ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navHeaders  = document.querySelectorAll('.nav-header');
  function updateNav() {
    const scrollY = window.scrollY + window.innerHeight / 3;
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
        navHeaders.forEach(h => h.classList.remove('active'));
        const header = document.querySelector(`.nav-header[href="#${sec.id}"]`);
        if (header) header.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── 3. BLOG READ MORE FUNCTIONALITY ── */
  const readMoreBtns = document.querySelectorAll('.blog-read-more');
  readMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.blog-card');
      const title = card.querySelector('.blog-title').textContent;
      
      // Get the specific content for this blog post
      const blogContent = getBlogContent(title);
      
      // Check if content is already expanded
      const existingContent = card.querySelector('.blog-full-content');
      if (existingContent) {
        // Content is already showing, hide it
        existingContent.style.display = 'none';
        btn.textContent = 'READ MORE →';
      } else {
        // Create and show the full content
        const fullContentDiv = document.createElement('div');
        fullContentDiv.className = 'blog-full-content';
        fullContentDiv.innerHTML = blogContent;
        
        // Add it after the blog body
        const blogBody = card.querySelector('.blog-body');
        blogBody.appendChild(fullContentDiv);
        
        // Change button text
        btn.textContent = 'READ LESS ←';
        
        // Smooth scroll to the expanded content
        setTimeout(() => {
          fullContentDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  });

  function getBlogContent(title) {
    const contents = {
      "How to Own Your Audience by Creating an Email List": `
        <div class="blog-full-content-inner">
          <p>Building an email list gives you direct access to your audience without relying on social media algorithms.</p>
          
          <h4>Key Strategy</h4>
          <p>Choose Mailchimp for beginners or ConvertKit for creators. Create valuable lead magnets like eBooks or templates. Set up automated welcome sequences to build trust immediately.</p>
        </div>
      `,
      
      "Top 10 Toolkits for Deep Learning in 2024": `
        <div class="blog-full-content-inner">
          <p>Deep learning frameworks make AI development accessible with pre-built tools and libraries.</p>
          
          <h4>Top Choices</h4>
          <p>Start with Fast.ai for beginners, use PyTorch for research flexibility, choose TensorFlow for production, and select Hugging Face for NLP projects.</p>
        </div>
      `,
      
      "Everything You Need to Know About Web Accessibility": `
        <div class="blog-full-content-inner">
          <p>Web accessibility ensures everyone can use your digital products regardless of their abilities.</p>
          
          <h4>Essential Steps</h4>
          <p>Use semantic HTML structure, maintain proper color contrast, ensure keyboard navigation works, and provide descriptive alt text for all images.</p>
        </div>
      `,
      
      "How to Inject Humor & Personality Into Your Brand": `
        <div class="blog-full-content-inner">
          <p>Your brand personality makes you memorable and different from competitors.</p>
          
          <h4>Be Human</h4>
          <p>Write conversational copy, share behind-the-scenes content, and use appropriate humor. Know your audience boundaries and stay authentic to your values.</p>
        </div>
      `,
      
      "Women in Web Design: How to Achieve Success": `
        <div class="blog-full-content-inner">
          <p>Women are increasingly succeeding in web design despite remaining underrepresented in tech roles.</p>
          
          <h4>Success Path</h4>
          <p>Build strong technical skills, create diverse portfolio projects, join women-focused communities, and don't hesitate to advocate for yourself and negotiate fairly.</p>
        </div>
      `,
      
      "Evergreen vs Topical Content: A Complete Overview": `
        <div class="blog-full-content-inner">
          <p>Content strategy balances timeless educational content with timely trend-driven posts.</p>
          
          <h4>Smart Mix</h4>
          <p>Focus 70% on evergreen content for long-term SEO value and 30% on topical content for immediate engagement. Track different metrics for each content type.</p>
        </div>
      `
    };
    
    return contents[title] || '<div class="blog-full-content-inner"><p>Full content for this blog post is coming soon. Check back later for more detailed information.</p></div>';
  }

  /* ── 4. AOS-LITE (Animate On Scroll) ── */
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
