(() => {
  const account = document.getElementById('authModal');
  let accountTrigger;
  document.addEventListener('focusin', (event) => {
    if (!account.classList.contains('open') && !account.contains(event.target)) {
      accountTrigger = event.target;
    }
  });
  new MutationObserver(() => {
    if (!account.classList.contains('open') && account.contains(document.activeElement)
        && !document.querySelector('.modal-backdrop.open')) {
      accountTrigger?.focus({ preventScroll: true });
    }
  }).observe(account, { attributeFilter: ['class'] });

  const filter = document.querySelector('#searchPanel .bml-filter-action');
  const filterBar = document.querySelector('#searchPanel .filter-bar');
  if (filter && filterBar) {
    filterBar.id = 'catalogFilterBar';
    filter.setAttribute('aria-controls', filterBar.id);
    const shelf = filterBar.querySelector('.bml-filter-shelf');
    const fields = filterBar.querySelector('.bml-refine');
    if (shelf && fields) {
      fields.prepend(shelf);
      filterBar.prepend(fields);
    }

  }

  const controls = document.querySelector('#searchPanel .bml-search-more');
  const searchRow = document.querySelector('#searchPanel .search-row');
  if (controls && searchRow) searchRow.append(controls);

  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (motion.matches || entry.target.contains(document.activeElement)) continue;
      entry.target.animate([
        { opacity: 0.84 },
        { opacity: 1 },
      ], { duration: 420, easing: 'cubic-bezier(.16, 1, .3, 1)' });
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('main .section-head, main .stats, main .shelf-section').forEach(
    (element) => observer.observe(element)
  );
})();
