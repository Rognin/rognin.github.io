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
    location.replace('../');
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

  // Adjust open ancestor panels by a height delta so their max-height
  // stays accurate when nested panels toggle.
  function adjustAncestors(el, delta) {
    let ancestor = el.parentElement?.closest('.feature-body');
    while (ancestor) {
      if (ancestor.classList.contains('is-open')) {
        ancestor.style.maxHeight = (parseFloat(ancestor.style.maxHeight) + delta) + 'px';
      }
      ancestor = ancestor.parentElement?.closest('.feature-body');
    }
  }

  // Builds one accordion panel. Call recursively for subfeatures.
  // id must be unique across the page (used for aria-controls).
  function createFeaturePanel(feature, id) {
    const panel      = document.createElement('div');
    panel.className  = 'feature-panel';

    const header     = document.createElement('button');
    header.className = 'feature-header';
    header.setAttribute('aria-expanded', 'false');
    header.setAttribute('aria-controls', id);

    // Left group: optional icon + title
    const headerLeft     = document.createElement('span');
    headerLeft.className = 'feature-header-left';

    if (feature.icon) {
      const iconWrap       = document.createElement('span');
      iconWrap.className   = 'feature-icon';
      iconWrap.setAttribute('aria-hidden', 'true');
      iconWrap.innerHTML   = feature.icon; // trusted SVG from projectData
      headerLeft.appendChild(iconWrap);
    }

    const titleSpan       = document.createElement('span');
    titleSpan.className   = 'feature-title';
    titleSpan.textContent = feature.title;
    headerLeft.appendChild(titleSpan);

    // Right: animated plus/× toggle (× SVG rotated -45° = +, 0° = ×)
    const toggle     = document.createElement('span');
    toggle.className = 'feature-toggle';
    toggle.setAttribute('aria-hidden', 'true');
    toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="2" x2="12" y2="12"/><line x1="12" y1="2" x2="2" y2="12"/></svg>`;

    header.appendChild(headerLeft);
    header.appendChild(toggle);

    // Body: grid-based smooth reveal
    const body      = document.createElement('div');
    body.className  = 'feature-body';
    body.id         = id;

    // Inner wrapper required for grid 0fr trick
    const inner     = document.createElement('div');
    inner.className = 'feature-body-inner';

    // Optional description paragraph
    if (feature.description) {
      const desc       = document.createElement('p');
      desc.className   = 'feature-desc';
      desc.textContent = feature.description;
      inner.appendChild(desc);
    }

    // Optional code snippet
    if (feature.snippet) {
      const snippetPanel     = document.createElement('div');
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
      inner.appendChild(snippetPanel);
    }

    // Optional nested sub-panels
    if (feature.subfeatures?.length) {
      const subList     = document.createElement('div');
      subList.className = 'feature-sublist';
      feature.subfeatures.forEach((sub, j) => {
        subList.appendChild(createFeaturePanel(sub, `${id}-sub-${j}`));
      });
      inner.appendChild(subList);
    }

    body.appendChild(inner);

    let highlighted = false;
    header.addEventListener('click', () => {
      const isOpen = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', String(!isOpen));
      body.classList.toggle('is-open', !isOpen);

      if (!isOpen) {
        const h = body.scrollHeight;
        body.style.maxHeight = h + 'px';
        adjustAncestors(body, h);
        if (!highlighted && typeof Prism !== 'undefined') {
          Prism.highlightAllUnder(body);
          highlighted = true;
        }
      } else {
        const h = parseFloat(body.style.maxHeight) || body.scrollHeight;
        body.style.maxHeight = '0';
        adjustAncestors(body, -h);
      }
    });

    panel.appendChild(header);
    panel.appendChild(body);
    return panel;
  }

  if (data.features?.length) {
    data.features.forEach((feature, i) => {
      projFeats.appendChild(createFeaturePanel(feature, `feat-body-${i}`));
    });
  } else {
    // No features — hide the container so it leaves no gap
    projFeats.hidden = true;
  }
}());
