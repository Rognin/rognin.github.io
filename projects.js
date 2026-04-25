/* =====================================================================
   PROJECTS DATA — edit this file to update everything about a project.
   No build step needed: just save and refresh the browser.

   Adding a project: copy one entry block, give it a new unique key,
   and add a thumbnail at assets/images/projects/<key>/screenshot.jpg.

   mediaType (project page media):
     'youtube' — mediaSrc is the YouTube video ID (part after ?v=)
     'video'   — mediaSrc is a path to a local .mp4 / .webm file
     'image'   — mediaSrc is a path to a screenshot

   features: one entry per major contribution. Each becomes an
   expandable accordion panel on the project page with a description
   and an optional code snippet.
     snippet.lang: 'csharp' | 'gdscript' | 'javascript' | 'glsl'
   ===================================================================== */

const projectData = {

  /* ─── PROJECT 1 ─────────────────────────────────────────────────── */
  'masterpiece-of-sin': {

    // ── Card ──────────────────────────────────────────────────────────
    title:    'Masterpiece of Sin',          // game name (also used in the modal header)
    tags:     ['unity'],          // filter values: 'unity' | 'godot' | 'unreal' | 'jam'
    engine:   'Unity',          // orange tag, e.g. 'Unity'
    lang:     'C#',              // blue tag — programming language
    jam:      '',          // yellow tag, e.g. 'Global Game Jam 2025' — leave empty if not a jam
    thumb:    'assets/images/projects/game-one/screenshot.png',
    cardDesc: 'An action game developed over the course of three months. I was one of two programmers on the team.',          // one sentence — lead with the mechanic, not the genre
    contributionsTitle: 'My contributions', // omit or set '' to hide the title
    contributions: ['Audio system using FMOD', 'Inventory system', 'Character controller', 'Interaction system'],
    links: [
      { label: 'itch.io',         url: '#' },
      { label: 'GitHub ↗', url: '#' },
    ],

    // ── Project page ──────────────────────────────────────────────────
    description: '',       // 2–3 sentences shown at the top of the project page
    mediaType:   'image',  // 'youtube' | 'video' | 'image'
    mediaSrc:    'assets/images/projects/game-one/screenshot.png',
    techStack:     [],     // 4–6 strings shown as badges, e.g. ['Unity', 'C#', 'FMOD', 'Git']
    features: [
      {
        // icon: paste an SVG string here (18×18 viewBox, currentColor stroke)
        // leave icon out to show no icon — both work fine
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
        title: 'Combat System',
        description: 'Optional intro shown at the top.',
        subfeatures: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-xml-icon lucide-code-xml"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
            title: 'Attack State Machine',
            description: 'Implemented...',
            snippet: { label: '...', lang: 'csharp', code: `...` },
          },
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
            title: 'Hit Detection',
            description: 'Used overlap spheres...',
          },
        ],
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
        title: 'Shader Pipeline',
        description: 'Wrote a toon shader...',
      },
    ],

    // features example:
    // [
    //   {
    //     title:       'Combat System',
    //     description: 'Optional overview shown at the top of this panel.',
    //     // subfeatures — nested accordions inside this panel (optional)
    //     subfeatures: [
    //       {
    //         title:       'Attack State Machine',
    //         description: 'Implemented a state-machine-driven combat loop with ' +
    //                      '4 attack states, hit-stop, and hitstun frames.',
    //         snippet: {   // optional — omit entirely if no code to show
    //           label: 'CombatController.cs — Attack State',
    //           lang:  'csharp',
    //           code:  `IEnumerator AttackState() {
    //   yield return new WaitForSeconds(hitStopDuration);
    //   animator.SetTrigger("Attack");
    // }`,
    //         },
    //       },
    //       {
    //         title:       'Hit Detection',
    //         description: 'Used overlap spheres on attack frames rather than continuous colliders.',
    //         // no snippet = no code block
    //       },
    //     ],
    //   },
    //   {
    //     title:       'Procedural Level Assembly',
    //     description: 'Built a chunking system that assembles prefabs at runtime.',
    //     // flat panel — no subfeatures, no snippet
    //   },
    // ],
  },

  /* ─── PROJECT 2 ─────────────────────────────────────────────────── */
  'treasure-together': {
    title:    'Treasure Together',
    tags:     ['unity'],
    engine:   'Unity',
    lang:     'C#',
    jam:      '',
    thumb:    'assets/images/projects/game-two/screenshot.png',
    cardDesc: 'A co-op action game built with Netcode for GameObjects.',
    contributionsTitle: 'Features',
    contributions: ['Local multiplayer', 'Network-synced shooting', 'Treasure tracking system', 'Feedbacks with FEEL asset', 'Powerups'],
    links: [
      { label: 'Play on itch.io',         url: '#' },
      { label: 'View Source on GitHub ↗', url: '#' },
    ],
    description:   '',
    mediaType:     'image',
    mediaSrc:      'assets/images/projects/game-two/screenshot.png',
    techStack:     [],
    features:      [],
  },

  /* ─── PROJECT 3 ─────────────────────────────────────────────────── */
  'gba-homebrew': {
    title:    'Homebrew game for GBA',
    tags:     [],
    engine:   'Butano',
    lang:     'C++',
    jam:      '',
    thumb:    'assets/images/projects/game-three/screenshot2.png',
    cardDesc: 'A 2D platformer created for a university elective about retro consoles.',
    contributionsTitle: 'Features',
    contributions: ['Tile based 2D collisions', 'Health and damage', "Enemies", "Melee attack", 'Collectables'],
    links: [
      { label: 'Play on itch.io',         url: '#' },
      { label: 'View Source on GitHub ↗', url: '#' },
    ],
    description:   '',
    mediaType:     'image',
    mediaSrc:      'assets/images/projects/game-three/screenshot2.png',
    techStack:     [],
    features:      [],
  },

  // ── Add more projects by copying a block above and giving it a new key ──

};
