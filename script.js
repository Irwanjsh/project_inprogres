// ─────────────────────────────────────────
// STAGGERED CARD ENTRANCE ON LOAD
// ─────────────────────────────────────────
const allCards = document.querySelectorAll('.card');

function revealCards(cards) {
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, i * 100);
  });
}

// Run on page load
window.addEventListener('DOMContentLoaded', () => {
  revealCards(allCards);
});


// ─────────────────────────────────────────
// CATEGORY FILTER
// ─────────────────────────────────────────
const filterButtons  = document.querySelectorAll('.categories button');
const projectGrid    = document.getElementById('project-grid');
const visibleCount   = document.getElementById('visible-count');
const emptyState     = document.getElementById('empty-state');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {

    // 1. Update active button
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    // 2. Filter cards
    let count = 0;

    allCards.forEach(card => {
      const match = filter === 'all' || card.classList.contains(filter);

      if (match) {
        card.classList.remove('hidden', 'visible');
        count++;

        // Re-trigger entrance animation
        requestAnimationFrame(() => {
          setTimeout(() => card.classList.add('visible'), 60);
        });

      } else {
        card.classList.remove('visible');
        card.classList.add('hidden');
      }
    });

    // 3. Update count text
    visibleCount.textContent = count;

    // 4. Show/hide empty state
    if (count === 0) {
      emptyState.style.display = 'block';
      projectGrid.style.display = 'none';
    } else {
      emptyState.style.display = 'none';
      projectGrid.style.display = 'grid';
    }
  });
});
