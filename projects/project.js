/* =====================================================================
   PROJECT PAGE RENDERER
   Reads ?id=<slug> from the URL, looks up projectData, and populates
   the page. projectData is defined in ../projects.js, loaded first.
   ===================================================================== */

(function () {
  // ── 1. Resolve slug ─────────────────────────────────────────────────
  const slug = new URLSearchParams(location.search).get('id');
  const data = slug && projectData[slug];

  if (!data) {
    // Unknown project — send visitor back to the portfolio
    location.replace('../index.html');
    return;
  }

  // ── 2. Page title ────────────────────────────────────────────────────
  document.title = `${data.title} — Artem Gusev`;

  // ── 3. Reveal page (mirrors scroll-restoration reveal in script.js) ──
  const reveal = () => {
    document.documentElement.style.visibility = '';
    document.documentElement.classList.remove('no-smooth');
  };
  const timeout = setTimeout(reveal, 300);
  document.fonts.ready.then(() => { clearTimeout(timeout); reveal(); });

  // ── 4. Theme toggle ──────────────────────────────────────────────────
  const themeToggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    document.documentElement.classList.add('theme-transitioning');
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-label',
      theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    localStorage.setItem('theme', theme);
    window.setTimeout(
      () => document.documentElement.classList.remove('theme-transitioning'), 350);
  }

  // Sync button label to whatever the inline <head> script applied
  if (document.documentElement.getAttribute('data-theme') === 'light') {
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    applyTheme(isLight ? 'dark' : 'light');
  });

  // ── 5. Populate sections ─────────────────────────────────────────────
  const projTitle = document.getElementById('proj-title');
  const projTech  = document.getElementById('proj-tech');
  const projMedia = document.getElementById('proj-media');
  const projDesc  = document.getElementById('proj-desc');
  const projLinks = document.getElementById('proj-links');
  const projFeats = document.getElementById('proj-features');

  // Title
  projTitle.textContent = data.title;

  // Tech badges
  (data.techStack || []).forEach((tech) => {
    const badge       = document.createElement('span');
    badge.className   = 'modal-tech-badge'; // reuses existing badge style
    badge.textContent = tech;
    projTech.appendChild(badge);
  });

  // Media
  if (data.mediaType === 'youtube') {
    const iframe         = document.createElement('iframe');
    iframe.src           = `https://www.youtube-nocookie.com/embed/${data.mediaSrc}`;
    iframe.allow         = 'encrypted-media';
    iframe.allowFullscreen = true;
    projMedia.appendChild(iframe);
  } else if (data.mediaType === 'video') {
    const video     = document.createElement('video');
    video.src       = `../${data.mediaSrc}`;
    video.controls  = true;
    video.loop      = true;
    projMedia.appendChild(video);
  } else if (data.mediaSrc) {
    const img   = document.createElement('img');
    img.src     = `../${data.mediaSrc}`;
    img.alt     = data.title;
    projMedia.appendChild(img);
  }

  // Description
  projDesc.textContent = data.description || '';

  // Links
  (data.links || []).forEach((l) => {
    const a       = document.createElement('a');
    a.href        = l.url;
    a.className   = 'btn btn-ghost';
    a.target      = '_blank';
    a.rel         = 'noopener';
    a.textContent = l.label;
    projLinks.appendChild(a);
  });

  // ── 6. Feature accordion ─────────────────────────────────────────────
  if (data.features?.length) {
    data.features.forEach((feature, i) => {
      const panel       = document.createElement('div');
      panel.className   = 'feature-panel';

      const header      = document.createElement('button');
      header.className  = 'feature-header';
      header.setAttribute('aria-expanded', 'false');
      header.setAttribute('aria-controls', `feat-body-${i}`);

      const titleSpan       = document.createElement('span');
      titleSpan.className   = 'feature-title';
      titleSpan.textContent = feature.title;

      const chevron       = document.createElement('span');
      chevron.className   = 'feature-chevron';
      chevron.textContent = '▶';
      chevron.setAttribute('aria-hidden', 'true');

      header.appendChild(titleSpan);
      header.appendChild(chevron);

      const body    = document.createElement('div');
      body.className = 'feature-body';
      body.id        = `feat-body-${i}`;
      body.hidden    = true;

      const desc       = document.createElement('p');
      desc.className   = 'feature-desc';
      desc.textContent = feature.description || '';
      body.appendChild(desc);

      if (feature.snippet) {
        const snippetPanel    = document.createElement('div');
        snippetPanel.className = 'snippet-panel';

        const snippetHeader       = document.createElement('div');
        snippetHeader.className   = 'snippet-header';
        snippetHeader.textContent = feature.snippet.label;

        const pre    = document.createElement('pre');
        const codeEl = document.createElement('code');
        codeEl.className   = `language-${feature.snippet.lang}`;
        codeEl.textContent = feature.snippet.code; // textContent is XSS-safe
        pre.appendChild(codeEl);

        snippetPanel.appendChild(snippetHeader);
        snippetPanel.appendChild(pre);
        body.appendChild(snippetPanel);
      }

      let highlighted = false;
      header.addEventListener('click', () => {
        const isOpen = header.getAttribute('aria-expanded') === 'true';
        header.setAttribute('aria-expanded', String(!isOpen));
        body.hidden         = isOpen;
        chevron.textContent = isOpen ? '▶' : '▼';
        // Highlight on first expand — avoids timing issues with deferred Prism
        if (!isOpen && !highlighted && typeof Prism !== 'undefined') {
          Prism.highlightAllUnder(body);
          highlighted = true;
        }
      });

      panel.appendChild(header);
      panel.appendChild(body);
      projFeats.appendChild(panel);
    });

  } else {
    // No features — hide the container so it leaves no gap
    projFeats.hidden = true;
  }
}());
