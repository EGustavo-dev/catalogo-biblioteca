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
  }

  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (motion.matches || entry.target.contains(document.activeElement)) continue;
      entry.target.animate([
        { opacity: 0.72, transform: 'translateY(9px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 280, easing: 'ease-out' });
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('main .section-head, main .stats, main .shelf-section').forEach(
    (element) => observer.observe(element)
  );
  const results = document.getElementById('results');
  function observeBooks() {
    results.querySelectorAll('.book-card:not([data-scroll-ready])').forEach((card) => {
      card.dataset.scrollReady = '';
      observer.observe(card);
    });
  }
  new MutationObserver((changes) => {
    for (const change of changes) {
      change.removedNodes.forEach((node) => {
        if (node instanceof Element && node.matches('.book-card')) observer.unobserve(node);
      });
    }
    observeBooks();
  }).observe(results, { childList: true });
  observeBooks();
})();
