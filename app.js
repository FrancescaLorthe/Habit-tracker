// ============================================================
// STORAGE
// ============================================================

function getHabits() {
  return JSON.parse(localStorage.getItem('habits') || '[]');
}

function saveHabits(habits) {
  localStorage.setItem('habits', JSON.stringify(habits));
}

// ============================================================
// CRUD
// ============================================================

function addHabit(name) {
  const habits = getHabits();
  const habit = {
    id:             crypto.randomUUID(),
    name:           name.trim(),
    createdAt:      getTodayString(),
    completedDates: [],
  };
  habits.push(habit);
  saveHabits(habits);
  return habit;
}

function deleteHabit(id) {
  saveHabits(getHabits().filter(h => h.id !== id));
}

function updateHabitName(id, newName) {
  const habits = getHabits().map(h =>
    h.id === id ? { ...h, name: newName.trim() } : h
  );
  saveHabits(habits);
}

function toggleToday(id) {
  const today = getTodayString();
  const habits = getHabits().map(h => {
    if (h.id !== id) return h;
    const completedDates = h.completedDates.includes(today)
      ? h.completedDates.filter(d => d !== today)
      : [...h.completedDates, today];
    return { ...h, completedDates };
  });
  saveHabits(habits);
}

// ============================================================
// HELPERS
// ============================================================

function getTodayString() {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function isCompletedToday(habit) {
  return habit.completedDates.includes(getTodayString());
}

function getStreak(habit) {
  if (habit.completedDates.length === 0) return 0;

  const sorted = [...habit.completedDates].sort().reverse(); // newest first
  let streak = 0;
  let cursor = new Date();

  for (const dateStr of sorted) {
    const expected = cursor.toISOString().slice(0, 10);
    if (dateStr === expected) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

// ============================================================
// RENDER
// ============================================================

function renderHabits() {
  const habits    = getHabits();
  const list      = document.getElementById('habitList');
  const emptyState = document.getElementById('emptyState');

  list.innerHTML = '';

  if (habits.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  habits.forEach(habit => {
    list.appendChild(renderHabitItem(habit));
  });
}

function renderHabitItem(habit) {
  const done   = isCompletedToday(habit);
  const streak = getStreak(habit);

  const li = document.createElement('li');
  li.className = `habit-item${done ? ' habit-item--done' : ''}`;
  li.dataset.id = habit.id;

  li.innerHTML = `
    <div class="habit-info">
      <span class="habit-name">${escapeHtml(habit.name)}</span>
      <span class="habit-streak" title="Current streak">${streak > 0 ? `🔥 ${streak} day${streak !== 1 ? 's' : ''}` : ''}</span>
    </div>
    <div class="habit-actions">
      <button class="btn-complete ${done ? 'btn-complete--done' : ''}" aria-label="Mark complete">✓</button>
      <button class="btn-edit"    aria-label="Edit habit">✏️</button>
      <button class="btn-delete"  aria-label="Delete habit">🗑️</button>
    </div>
  `;

  return li;
}

function escapeHtml(str) {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}

// ============================================================
// EVENTS
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  renderHabits();

  // --- Add habit ---
  document.getElementById('addHabitForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const input = document.getElementById('habitInput');
    const name  = input.value.trim();
    if (!name) return;
    addHabit(name);
    input.value = '';
    renderHabits();
  });

  // --- Complete / Edit / Delete (event delegation) ---
  document.getElementById('habitList').addEventListener('click', function (e) {
    const item = e.target.closest('.habit-item');
    if (!item) return;
    const id = item.dataset.id;

    if (e.target.closest('.btn-complete')) {
      toggleToday(id);
      renderHabits();
      return;
    }

    if (e.target.closest('.btn-delete')) {
      deleteHabit(id);
      renderHabits();
      return;
    }

    if (e.target.closest('.btn-save')) {
      const input   = item.querySelector('.habit-edit-input');
      const newName = input.value.trim();
      if (newName) updateHabitName(id, newName);
      renderHabits();
      return;
    }

    if (e.target.closest('.btn-edit')) {
      const nameEl = item.querySelector('.habit-name');
      const input  = document.createElement('input');
      input.type      = 'text';
      input.value     = nameEl.textContent;
      input.className = 'habit-edit-input';
      nameEl.replaceWith(input);
      input.focus();
      input.select();

      // Swap edit button → save button
      const editBtn = item.querySelector('.btn-edit');
      editBtn.textContent = '💾';
      editBtn.classList.replace('btn-edit', 'btn-save');

      input.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter') {
          const newName = input.value.trim();
          if (newName) updateHabitName(id, newName);
          renderHabits();
        }
        if (ev.key === 'Escape') renderHabits();
      });
      return;
    }
  });

});
