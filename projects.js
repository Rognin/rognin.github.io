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
  'game-one': {

    // ── Card ──────────────────────────────────────────────────────────
    title:    'Masterpiece of Sin',          // game name (also used in the modal header)
    tags:     ['unity'],          // filter values: 'unity' | 'godot' | 'unreal' | 'jam'
    engine:   'Unity',          // orange tag, e.g. 'Unity'
    genre:    'Action',          // blue tag,   e.g. 'Platformer'
    jam:      '',          // yellow tag, e.g. 'Global Game Jam 2025' — leave empty if not a jam
    thumb:    'assets/images/projects/game-one/screenshot.png',
    cardDesc: 'Description placeholder of MoS',          // one sentence — lead with the mechanic, not the genre
    links: [
      { label: 'Play on itch.io',         url: '#' },
      { label: 'View Source on GitHub ↗', url: '#' },
    ],

    // ── Project page ──────────────────────────────────────────────────
    description: '',       // 2–3 sentences shown at the top of the project page
    mediaType:   'image',  // 'youtube' | 'video' | 'image'
    mediaSrc:    'assets/images/projects/game-one/screenshot.png',
    techStack:     [],     // 4–6 strings shown as badges, e.g. ['Unity', 'C#', 'FMOD', 'Git']
    features:      [],     // accordion sections — see example below
    // features example:
    // [
    //   {
    //     title:       'Audio Raycast System',
    //     description: 'Implemented a spherical raycast system using Physics.Raycast ' +
    //                  'that casts rays in all directions and maps reflections to HUD waypoints.',
    //     snippet: {   // optional — omit this field entirely if no code to show
    //       label: 'AudioRaycast.cs — Core Loop',
    //       lang:  'csharp',
    //       code:  `void CastAudioRays(Vector3 sourcePos, int rayCount) {
    //   float angleStep = 360f / rayCount;
    //   for (int i = 0; i < rayCount; i++) {
    //     Vector3 dir = Quaternion.Euler(0, angleStep * i, 0) * Vector3.forward;
    //     if (Physics.Raycast(sourcePos, dir, out RaycastHit hit, maxRange, mask))
    //       RegisterEcho(hit.point, hit.distance);
    //   }
    // }`,
    //     },
    //   },
    //   {
    //     title:       'Procedural Level Assembly',
    //     description: 'Built a chunking system that assembles prefabs at runtime.',
    //     // no snippet field = no code block for this feature
    //   },
    // ],
  },

  /* ─── PROJECT 2 ─────────────────────────────────────────────────── */
  'game-two': {
    title:    'Treasure Together',
    tags:     ['unity'],
    engine:   'Unity',
    genre:    'Action',
    jam:      '',
    thumb:    'assets/images/projects/game-two/screenshot.png',
    cardDesc: 'Description placeholder of TT',
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
  'game-three': {
    title:    'Lost in Orbit',
    tags:     ['unity'],
    engine:   'Unity',
    genre:    'Simulator',
    jam:      '',
    thumb:    'assets/images/projects/game-three/screenshot2.png',
    cardDesc: 'Description placeholder of LiO',
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
