# Portfolio Content Guide

Everything lives in **projects.js**. Edit that one file and refresh — nothing else needs touching.

Clicking a project card navigates to `/projects/?id=<slug>`, which renders the full project page.

---

## Project 1 (`'game-one'` block, lines 22–68)

| Field | Line | What to put |
|---|---|---|
| `title` | 25 | Game name (shown on card + project page header) |
| `tags` | 26 | Filter values: `['unity']`, `['godot']`, `['unity', 'jam']`, etc. |
| `engine` | 27 | Engine tag: `'Unity'` / `'Godot'` / `'Unreal'` |
| `genre` | 28 | Genre tag: `'Platformer'` / `'Puzzle'` / `'Action'` / etc. |
| `jam` | 29 | Jam name e.g. `'Global Game Jam 2025'` — or `''` to hide the tag |
| `thumb` | 30 | Card thumbnail path (see Assets below) |
| `cardDesc` | 31 | One sentence for the card. Lead with the mechanic: *"Implements X using Y"* |
| `links[0].url` | 33 | itch.io URL |
| `links[1].url` | 34 | GitHub URL |
| `description` | 38 | 2–3 sentences for the project page header |
| `mediaType` | 39 | `'youtube'` / `'video'` / `'image'` |
| `mediaSrc` | 40 | YouTube ID, local video path, or image path |
| `techStack` | 41 | 4–6 strings: `['Unity', 'C#', 'FMOD', 'Git']` |
| `features` | 42 | Accordion sections (see Writing a feature below) |

---

## Project 2 (`'game-two'` block, lines 71–88)

| Field | Line | What to put |
|---|---|---|
| `title` | 72 | Game name |
| `tags` | 73 | Filter values array |
| `engine` | 74 | Engine tag |
| `genre` | 75 | Genre tag |
| `jam` | 76 | Jam name or `''` |
| `thumb` | 77 | Thumbnail path |
| `cardDesc` | 78 | One-sentence card description |
| `links[0].url` | 80 | itch.io URL |
| `links[1].url` | 81 | GitHub URL |
| `description` | 83 | Project page overview |
| `mediaType` | 84 | `'youtube'` / `'video'` / `'image'` |
| `mediaSrc` | 85 | YouTube ID, video path, or image path |
| `techStack` | 86 | Tech stack array |
| `features` | 87 | Accordion sections |

---

## Project 3 (`'game-three'` block, lines 91–108)

| Field | Line | What to put |
|---|---|---|
| `title` | 92 | Game name |
| `tags` | 93 | Filter values array |
| `engine` | 94 | Engine tag |
| `genre` | 95 | Genre tag |
| `jam` | 96 | Jam name or `''` |
| `thumb` | 97 | Thumbnail path |
| `cardDesc` | 98 | One-sentence card description |
| `links[0].url` | 100 | itch.io URL |
| `links[1].url` | 101 | GitHub URL |
| `description` | 103 | Project page overview |
| `mediaType` | 104 | `'youtube'` / `'video'` / `'image'` |
| `mediaSrc` | 105 | YouTube ID, video path, or image path |
| `techStack` | 106 | Tech stack array |
| `features` | 107 | Accordion sections |

---

## Adding a 4th project

Copy the `'game-three'` block (lines 91–108), paste it after line 109, give it a new key (e.g. `'game-four'`), and add a thumbnail at `assets/images/projects/game-four/screenshot.jpg`.

---

## Writing a feature entry

Each entry in `features` becomes one expandable accordion panel on the project page.

```js
features: [
  {
    title:       'Combat System',           // panel header (shown collapsed)
    description: 'Implemented a state-machine-driven combat loop with ' +
                 '4 attack states, hit-stop, and hitstun frames.',
    snippet: {                              // optional — omit entirely if no code
      label: 'CombatController.cs — Attack State',
      lang:  'csharp',
      code:  `IEnumerator AttackState() {
    yield return new WaitForSeconds(hitStopDuration);
    animator.SetTrigger("Attack");
    // ...
}`,
    },
  },
  {
    title:       'Shader Pipeline',
    description: 'Wrote a toon shader in Shader Graph that reads the sin meter ' +
                 'and shifts colour temperature dynamically.',
    // no snippet field → no code block rendered for this panel
  },
],
```

**Description tips:**
- Lead with what you *implemented*, not what the feature *is*
- One paragraph (3–5 sentences) is ideal
- Mention the specific class, system, or algorithm by name

**Snippet tips (pick code that shows a non-trivial decision):**
- Custom mechanic core loop
- Performance technique (pooling, spatial hash, job system)
- Procedural generation
- Shader / VFX logic written by hand
- AI state machine or BT node

**Avoid:** `Start()` / `Update()`, `GetComponent`, tutorial boilerplate.
Keep snippets to **10–20 lines** — extract just the key function if needed.

---

## Assets

| File | Used for |
|---|---|
| `assets/images/projects/game-one/screenshot.png` | Card thumbnail (`thumb`) + project page media (`mediaSrc` if `mediaType: 'image'`) |
| `assets/images/projects/game-two/screenshot.png` | Same for project 2 |
| `assets/images/projects/game-three/screenshot2.png` | Same for project 3 |
| `assets/resume/resume.pdf` | Resume link in the header |

Recommended thumbnail size: **800 × 450 px** (16:9).
Set `thumb` to a static screenshot even when `mediaType` is `'youtube'` or `'video'`.

---

## Filter tags reference

| Value | Button |
|---|---|
| `'unity'` | Unity |
| `'godot'` | Godot |
| `'unreal'` | Unreal |
| `'jam'` | Game Jam |

Multiple tags: `tags: ['unity', 'jam']`
