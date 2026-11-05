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

/* Localização, empréstimos pessoais e revisão do acervo. */
(() => {
  const originalCard = card;
  card = function(g) {
    const labels = [...new Set((g.locations || []).map(location =>
      location.location_pending ? 'Localização a confirmar' : shelfDisplay(location.prateleira, location.shelf_label)
    ))];
    const label = labels.length ? labels.slice(0, 2).join(' · ') +
      (labels.length > 2 ? ' · +' + (labels.length - 2) : '') : 'Localização a confirmar';
    return originalCard.apply(this, arguments).replace('</article>',
      '<div class="bml-card-location" title="' + esc(labels.join(' · ')) + '">' +
      '<span>Onde encontrar</span><strong>' + esc(label) + '</strong></div></article>');
  };

  const originalOpenFavorites = openFavorites;
  openFavorites = function(tab = 'fav', personal = false) {
    window.bmlPersonalLoans = personal;
    const heading = document.querySelector('#favoritesModal .modal-head > strong');
    if (heading) heading.textContent = tab === 'loan'
      ? (personal || !isAdmin() ? 'Meus empréstimos' : 'Empréstimos da biblioteca')
      : 'Minha biblioteca · Favoritos e empréstimos';
    return originalOpenFavorites.call(this, tab);
  };
  const actions = document.querySelector('#authLoggedIn .profile-actions');
  if (actions && !document.getElementById('bmlMyLoans')) {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'btn'; button.id = 'bmlMyLoans';
    button.textContent = 'Meus empréstimos';
    button.onclick = () => { closeModal('authModal'); openFavorites('loan', true); };
    actions.prepend(button);
  }
  const loanTab = document.getElementById('loanTab');
  if (loanTab) loanTab.textContent = 'Empréstimos e prazos';

  function coverNeedsReview(group) {
    const source = String(coverFor(group) || '');
    if (!source || source.startsWith('data:') ||
        /covers\/(?:completas|ilustrativas|recriados)\//.test(source)) return true;
    try {
      const path = new URL(source, location.href).pathname.replace(/^\//, '');
      return !!window.BMLCoverEstimates?.[path];
    } catch (_) { return true; }
  }
  function pendingBooks() {
    return grouped.map(group => ({
      group,
      reasons: [
        !String(group.autor || '').trim() ? 'Conferir autor' : '',
        coverNeedsReview(group) ? 'Conferir capa' : '',
      ].filter(Boolean),
    })).filter(item => item.reasons.length);
  }
  function renderCatalogReview() {
    const body = document.querySelector('#adminModal .modal-body');
    if (!body || !isAdmin()) return;
    let panel = document.getElementById('bmlCatalogReview');
    if (!panel) {
      panel = document.createElement('details');
      panel.id = 'bmlCatalogReview';
      const summary = document.createElement('summary');
      summary.textContent = 'Revisão de capas e autores';
      const status = document.createElement('p'); status.className = 'bml-review-count';
      const hint = document.createElement('p');
      hint.textContent = 'Confira a obra antes de salvar. Capas provisórias e prováveis precisam de confirmação.';
      const exportButton = document.createElement('button');
      exportButton.type = 'button'; exportButton.className = 'btn';
      exportButton.textContent = 'Baixar lista completa de pendências';
      const list = document.createElement('ul'); list.className = 'bml-review-list';
      exportButton.onclick = () => {
        if (!isAdmin()) return;
        const cell = value => {
          let text = String(value ?? '');
          if (/^[=+@\-\t\r]/.test(text)) text = "'" + text;
          return '"' + text.replace(/"/g, '""') + '"';
        };
        const rows = [['Título', 'Autor', 'Registros', 'Pendências'],
          ...pendingBooks().map(({group, reasons}) => [
            group.titulo, group.autor || '', (group.rawIds || []).join(', '), reasons.join(' · '),
          ])];
        const blob = new Blob(['\ufeff' + rows.map(row => row.map(cell).join(';')).join('\r\n')],
          { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob), link = document.createElement('a');
        link.href = url; link.download = 'revisao-capas-autores.csv'; link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      };
      panel.append(summary, status, hint, exportButton, list);
      body.prepend(panel);
    }
    const pending = pendingBooks();
    panel.querySelector('.bml-review-count').textContent =
      pending.length + ' títulos para conferir · ' +
      pending.filter(item => !String(item.group.autor || '').trim()).length + ' sem autor separado';
    const list = panel.querySelector('.bml-review-list');
    list.replaceChildren();
    pending.slice(0, 30).forEach(({group, reasons}) => {
      const item = document.createElement('li');
      const title = document.createElement('strong'); title.textContent = group.titulo;
      const status = document.createElement('span'); status.textContent = reasons.join(' · ');
      const button = document.createElement('button'); button.type = 'button';
      button.className = 'btn'; button.textContent = 'Editar cadastro';
      button.onclick = () => {
        const id = group.rawIds?.[0];
        if (id == null) return;
        panel.open = false;
        selectAdmin(id);
        document.getElementById('fTitle')?.focus();
      };
      item.append(title, status, button); list.append(item);
    });
    if (pending.length > 30) {
      const more = document.createElement('li');
      more.textContent = 'Exibindo 30 títulos. A lista para download contém todas as pendências.';
      list.append(more);
    }
  }
  const originalAdminList = renderAdminList;
  renderAdminList = function() {
    const result = originalAdminList.apply(this, arguments);
    renderCatalogReview();
    return result;
  };
  const admin = document.getElementById('adminModal');
  if (admin) new MutationObserver(() => {
    if (admin.classList.contains('open')) renderCatalogReview();
  }).observe(admin, { attributeFilter: ['class'] });

  // Atualiza os cartões já renderizados com os registros atuais.
  if (typeof apply === 'function' && Array.isArray(grouped) && grouped.length) apply(false);
})();
