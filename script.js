// projectData is defined in projects.js, loaded before this script.

/* =====================================================================
   1. ACTIVE NAV LINK ON SCROLL
   Uses IntersectionObserver — no scroll event polling.
   The rootMargin fires when the section occupies the vertical midpoint.
   ===================================================================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#primary-nav a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => sectionObserver.observe(section));

/* =====================================================================
   SCROLL RESTORATION
   scroll-behavior:smooth breaks the browser's native scroll restoration.
   We handle it manually: save position on unload, hide the page in <head>
   before first paint (see index.html inline script), then restore here and
   reveal. The no-smooth class is removed so smooth scroll works normally.
   ===================================================================== */
history.scrollRestoration = 'manual';

window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('scrollPos', String(window.scrollY));
});

document.addEventListener('DOMContentLoaded', () => {
  const saved = sessionStorage.getItem('scrollPos');
  if (saved !== null) {
    window.scrollTo({ top: parseInt(saved, 10), behavior: 'instant' });
    sessionStorage.removeItem('scrollPos');
  }

  updateHeaderOpacity();

  // Wait for fonts, but reveal after 300ms regardless so slow connections
  // don't leave the user staring at a blank page.
  const reveal = () => {
    document.documentElement.style.visibility = '';
    document.documentElement.classList.remove('no-smooth');
  };
  const timeout = setTimeout(reveal, 300);
  document.fonts.ready.then(() => {
    clearTimeout(timeout);
    reveal();
  });
});

/* =====================================================================
   2. MOBILE HAMBURGER NAV
   ===================================================================== */
const navToggle = document.getElementById('nav-toggle');
const primaryNav = document.getElementById('primary-nav');

navToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close nav when a link is tapped (single-page scroll UX)
primaryNav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    primaryNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// Close nav on click outside the header
document.addEventListener('click', (e) => {
  if (!e.target.closest('#site-header')) {
    primaryNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

/* =====================================================================
   3. PROJECT CARDS — build from projectData, then wire filter + modal
   ===================================================================== */
function buildCards() {
  const grid = document.getElementById('projects-grid');
  Object.entries(projectData).forEach(([slug, data]) => {
    const article        = document.createElement('article');
    article.className    = 'project-card';
    article.dataset.tags = (data.tags || []).join(' ');

    // — Media area —
    const cardMedia = document.createElement('div');
    cardMedia.className = 'card-media';

    const thumbSrc = data.thumb || (data.mediaType === 'image' ? data.mediaSrc : null);
    if (thumbSrc) {
      const img   = document.createElement('img');
      img.src     = thumbSrc;
      img.alt     = data.title || '';
      img.width   = 400;
      img.height  = 225;
      img.loading = 'lazy';
      cardMedia.appendChild(img);
    } else {
      const ph      = document.createElement('div');
      ph.className  = 'card-thumb-placeholder';
      cardMedia.appendChild(ph);
    }

    const mediaOverlay     = document.createElement('div');
    mediaOverlay.className = 'card-media-overlay';
    const viewBtn          = document.createElement('a');
    viewBtn.className      = 'btn-play-modal';
    viewBtn.href           = `projects/index.html?id=${slug}`;
    viewBtn.textContent    = 'View Details';
    mediaOverlay.appendChild(viewBtn);
    cardMedia.appendChild(mediaOverlay);

    // — Body area —
    const cardBody    = document.createElement('div');
    cardBody.className = 'card-body';

    const meta     = document.createElement('div');
    meta.className = 'card-meta';
    [
      { text: data.engine, cls: 'tag-engine' },
      { text: data.genre,  cls: 'tag-genre'  },
      { text: data.jam,    cls: 'tag-jam'    },
    ].forEach(({ text, cls }) => {
      if (!text) return;
      const span       = document.createElement('span');
      span.className   = `tag ${cls}`;
      span.textContent = text;
      meta.appendChild(span);
    });

    const h3       = document.createElement('h3');
    h3.className   = 'card-title';
    h3.textContent = data.title || '';

    const techRow     = document.createElement('div');
    techRow.className = 'card-tech-stack';
    (data.techStack || []).forEach((tech) => {
      const chip       = document.createElement('span');
      chip.className   = 'card-tech-chip';
      chip.textContent = tech;
      techRow.appendChild(chip);
    });

    const desc       = document.createElement('p');
    desc.className   = 'card-desc';
    desc.textContent = data.cardDesc || '';

    const linksDiv     = document.createElement('div');
    linksDiv.className = 'card-links';
    (data.links || []).forEach((l) => {
      const a       = document.createElement('a');
      a.href        = l.url;
      a.className   = 'card-link';
      a.target      = '_blank';
      a.rel         = 'noopener';
      a.textContent = l.label;
      linksDiv.appendChild(a);
    });

    cardBody.append(meta, h3, techRow, desc, linksDiv);
    article.append(cardMedia, cardBody);
    grid.appendChild(article);
  });
}

buildCards();

const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    projectCards.forEach((card) => {
      const tags = card.dataset.tags ? card.dataset.tags.split(' ') : [];
      const visible = filter === 'all' || tags.includes(filter);
      card.classList.toggle('hidden', !visible);
    });
  });
});



/* =====================================================================
   5. HEADER TRANSPARENCY ON SCROLL
   Lerps header background opacity from 0 (top of hero) to the target
   opacity once the user has scrolled past the hero section.
   ===================================================================== */
const siteHeader = document.getElementById('site-header');
const heroSection = document.getElementById('home');
const HEADER_OPACITY_TARGET = 0.85;

function syncHeaderHeight() {
  document.documentElement.style.setProperty('--header-h', `${siteHeader.offsetHeight}px`);
}

syncHeaderHeight();
window.addEventListener('resize', syncHeaderHeight, { passive: true });

function updateHeaderOpacity() {
  const heroHeight = heroSection.offsetHeight;
  const progress = Math.min(window.scrollY / heroHeight, 1);
  const opacity = progress * HEADER_OPACITY_TARGET;
  const blur = progress * 12;
  siteHeader.style.setProperty('--header-bg-opacity', opacity);
  siteHeader.style.backdropFilter = `blur(${blur}px)`;
  siteHeader.style.webkitBackdropFilter = `blur(${blur}px)`;
  siteHeader.style.borderBottomColor = progress > 0.05
    ? 'var(--color-border)'
    : 'transparent';
}

window.addEventListener('scroll', updateHeaderOpacity, { passive: true });
updateHeaderOpacity();

/* =====================================================================
   THEME TOGGLE
   ===================================================================== */
const themeToggle = document.getElementById('theme-toggle');

function applyTheme(theme) {
  // Add class to trigger CSS transition, then remove it once the animation is done
  document.documentElement.classList.add('theme-transitioning');
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  localStorage.setItem('theme', theme);
  window.setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 350);
}

// Sync button label to whatever theme the inline <head> script applied.
const activeTheme = document.documentElement.getAttribute('data-theme');
if (activeTheme === 'light') {
  themeToggle.setAttribute('aria-label', 'Switch to dark mode');
}

themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  applyTheme(isLight ? 'dark' : 'light');
});

// Copy email to clipboard
const copyEmailBtn = document.getElementById('copy-email-btn');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('arteam.gusev14@gmail.com').then(() => {
      copyEmailBtn.classList.add('copied');
      setTimeout(() => {
        copyEmailBtn.classList.remove('copied');
      }, 2000);
    });
  });
}
