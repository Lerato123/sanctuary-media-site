/* ================================================================
   SANCTUARY MEDIA — script.js
   Sections:
     1. Custom Cursor
     2. Navigation (scroll + mobile hamburger)
     3. Portfolio Tabs
     4. Gallery Lightbox
     5. Scroll Reveal (IntersectionObserver)
     6. Contact Form
     7. Footer Year
     8. Gallery Zoom Icons (injected)
================================================================ */

document.addEventListener('DOMContentLoaded', () => {


  /* ==============================================================
     1. CUSTOM CURSOR
     Follows mouse with a slight lag on the ring for smoothness.
     To disable: delete this block + remove .cursor/.cursor-ring
     in index.html and set body { cursor: default } in style.css
  ============================================================== */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  if (cursor && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows immediately
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    // Ring follows with lerp (smooth lag)
    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';

      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Ring grows on hover over interactive elements
    const interactives = document.querySelectorAll('a, button, .gallery-item, .tab-btn');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)';
        cursorRing.style.borderColor = 'rgba(201,160,48,0.8)';
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.borderColor = 'rgba(201,160,48,0.45)';
      });
    });
  }


  /* ==============================================================
     2. NAVIGATION
  ============================================================== */
  const navbar       = document.getElementById('navbar');
  const hamburger    = document.getElementById('navHamburger');
  const navLinks     = document.getElementById('navLinks');

  // Add .scrolled class when page scrolls past 60px
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Mobile hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');

      // Animate hamburger lines to X
      const spans = hamburger.querySelectorAll('span');
      const isOpen = navLinks.classList.contains('open');

      spans[0].style.transform  = isOpen ? 'rotate(45deg) translate(4px, 4px)'  : '';
      spans[1].style.opacity    = isOpen ? '0' : '1';
      spans[2].style.transform  = isOpen ? 'rotate(-45deg) translate(4px, -4px)' : '';
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity   = '1';
        });
      });
    });
  }


  /* ==============================================================
     3. PORTFOLIO TABS
     Switches visible gallery by matching data-tab to #tab-{name}
  ============================================================== */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const galleries = document.querySelectorAll('.gallery');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Hide all galleries, show the matching one
      galleries.forEach(g => g.classList.remove('active'));

      const targetId = 'tab-' + btn.dataset.tab;
      const target   = document.getElementById(targetId);
      if (target) target.classList.add('active');
    });
  });


  /* ==============================================================
     4. GALLERY LIGHTBOX
     Click any .gallery-item to open full image.
     Navigate with prev/next buttons OR arrow keys.
     Close with the close button, Escape key, or clicking backdrop.
  ============================================================== */
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lbImg');
  const lbCaption  = document.getElementById('lbCaption');
  const lbCounter  = document.getElementById('lbCounter');
  const lbClose    = document.getElementById('lbClose');
  const lbPrev     = document.getElementById('lbPrev');
  const lbNext     = document.getElementById('lbNext');

  let currentItems = [];  // array of gallery-item elements in active tab
  let currentIndex = 0;   // which image is showing

  // Open lightbox at a specific index
  function openLightbox(items, index) {
    currentItems = items;
    currentIndex = index;
    renderLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // Update image, caption, counter
  function renderLightbox() {
    const item = currentItems[currentIndex];
    lbImg.src           = item.dataset.src || item.querySelector('img').src;
    lbImg.alt           = item.dataset.caption || '';
    lbCaption.textContent = item.dataset.caption || '';
    lbCounter.textContent = `${currentIndex + 1} / ${currentItems.length}`;
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = ''; // free memory
  }

  // Go to previous image (wraps around)
  function prevImage() {
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    renderLightbox();
  }

  // Go to next image (wraps around)
  function nextImage() {
    currentIndex = (currentIndex + 1) % currentItems.length;
    renderLightbox();
  }

  // Attach click to every gallery item
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      // Get all items in the currently ACTIVE gallery only
      const activeGallery = document.querySelector('.gallery.active');
      const items         = Array.from(activeGallery.querySelectorAll('.gallery-item'));
      const index         = items.indexOf(item);
      openLightbox(items, index);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click',  prevImage);
  lbNext.addEventListener('click',  nextImage);

  // Close on backdrop click (not on image click)
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   prevImage();
    if (e.key === 'ArrowRight')  nextImage();
  });

  // Swipe support for mobile
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  lightbox.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextImage() : prevImage();
    }
  });


  /* ==============================================================
     5. SCROLL REVEAL
     Uses IntersectionObserver — no scroll listener needed.
     Add class 'reveal' to any element you want to animate in.
     Optional 'reveal-delay-1/2/3' for staggered children.
  ============================================================== */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // animate once only
      }
    });
  }, {
    threshold: 0.1,   // trigger when 10% of element is visible
    rootMargin: '0px 0px -40px 0px' // slightly before bottom of viewport
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ==============================================================
     6. CONTACT FORM
     Currently just shows a success message on submit.
     TO CONNECT TO A REAL BACKEND:
       - Remove the e.preventDefault() + fake success block
       - Add your formsubmit.co / EmailJS / backend fetch call here
       Example with FormSubmit (free, no backend needed):
         Change <form> action="https://formsubmit.co/YOUR_EMAIL"
         method="POST" and remove this JS block entirely.
  ============================================================== */
  // const contactForm   = document.getElementById('contactForm');
  // const formSuccess   = document.getElementById('formSuccess');

  // if (contactForm) {
  //   contactForm.addEventListener('submit', e => {
  //     e.preventDefault();

  //     // TODO: Replace this block with real form submission
  //     // e.g. EmailJS, FormSubmit, Netlify Forms, or fetch() to backend

  //     // Fake success for now
  //     if (formSuccess) {
  //       formSuccess.style.display = 'block';
  //       contactForm.reset();

  //       setTimeout(() => {
  //         formSuccess.style.display = 'none';
  //       }, 5000); // hide after 5 seconds
  //     }
  //   });
  // }


  /* ==============================================================
     7. FOOTER YEAR — auto-updates every year
  ============================================================== */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ==============================================================
     8. INJECT ZOOM ICONS INTO GALLERY ITEMS
     Keeps the HTML clean — no repeated SVG markup.
     The icon is injected into every .gallery-zoom div on load.
  ============================================================== */
  const zoomSVG = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
      <path d="M11 8v6M8 11h6"/>
    </svg>
  `;

  document.querySelectorAll('.gallery-zoom').forEach(el => {
    el.innerHTML = zoomSVG;
  });


}); // end DOMContentLoaded
