# Transcript Highlights

A summary of the build session for HabitFlow.

---

## What We Built

A fully functional habit tracker web app using plain HTML, CSS, and vanilla JavaScript — no frameworks, no build tools.

---

## Key Decisions

**Architecture**
- Single `app.js` file organised into clear sections: Storage, CRUD, Helpers, Render, Events
- `localStorage` as the data layer — one key (`'habits'`), array of objects
- Event delegation on `#habitList` so dynamically added items are always handled

**Data shape**
```js
{
  id:             "uuid",
  name:           "Read 20 minutes",
  createdAt:      "2026-03-14",
  completedDates: ["2026-03-13", "2026-03-14"]
}
```

**Streak logic** — walks backwards day by day from today through sorted `completedDates`, counting consecutive matches

**Inline edit** — replaced `prompt()` with a styled in-place input that swaps in on click, saves on Enter or 💾, cancels on Escape

---

## Files Created

| File | Purpose |
|---|---|
| `index.html` | App shell — form, habit list, empty state |
| `styles.css` | Indigo/emerald design system with CSS variables |
| `app.js` | All logic — CRUD, localStorage, render, events |
| `.gitignore` | macOS, editor, Node exclusions |
| `README.md` | Project overview and customisation guide |

---

## Git History

```
Initial commit: habit tracker landing page starter
Add .gitignore for macOS, editors, and Node
Initial habit tracker build
```

Deployed to GitHub Pages: https://francescalorthe.github.io/Habit-tracker/
