# HabitFlow — Habit Tracker Starter Project

A clean, responsive landing page starter for a habit-tracking web app. Built with plain HTML, CSS, and JavaScript — no frameworks, no build tools.

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (ES6+)

## File Structure

```
habit-tracker/
├── index.html      — Landing page (all sections)
├── styles.css      — All styles (CSS variables + utility classes)
├── script.js       — Nav toggle + smooth scroll
├── images/         — Image assets (placeholder folder)
└── README.md       — This file
```

## How to Run

1. Clone or download the project folder.
2. Open `index.html` directly in any modern browser.

No server, no install, no build step required.

## Sections Overview

| Section | ID | Description |
|---|---|---|
| Header | — | Sticky nav with logo and anchor links |
| Hero | `#hero` | Headline, tagline, and two CTA buttons |
| Features | `#features` | 4-card grid highlighting key capabilities |
| How It Works | `#how-it-works` | 3-step numbered process |
| Pricing | `#pricing` | Free vs Pro tier cards |
| Footer | — | Single-row copyright + nav links |

## Colour Palette

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#4f46e5` | Indigo — buttons, links, accents |
| `--color-primary-dark` | `#3730a3` | Hover state for primary |
| `--color-accent` | `#10b981` | Emerald — highlights, checkmarks |
| `--color-bg-primary` | `#f9fafb` | Page background |
| `--color-bg-card` | `#ffffff` | Card surfaces |

## Customisation Tips

- **Colours** — edit the CSS variables in the `:root` block at the top of `styles.css`.
- **Logo name** — find `HabitFlow` / `Habit<span>Flow</span>` in `index.html` and replace with your app name.
- **Hero background** — the hero uses a CSS gradient. To use an image instead, replace the `background` property in `.hero` with `background: url('images/hero.jpg') center/cover no-repeat` and add an overlay via `.hero::before`.
- **Pricing** — update tier names, prices, and feature lists directly in the `#pricing` section of `index.html`.
- **Nav links** — add or remove `<li>` items in the `<nav>` and add matching `id` attributes to the target sections.
