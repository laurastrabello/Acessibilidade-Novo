
(function () {
  const state = {
    scale: parseFloat(localStorage.getItem('a11y:scale')) || 1,
    theme: localStorage.getItem('a11y:theme') || 'default',
    contrast: localStorage.getItem('a11y:contrast') || 'normal',
    underline: localStorage.getItem('a11y:underline') === 'true',
    motion: localStorage.getItem('a11y:motion') === 'reduced',
  };

  const root = document.documentElement;
  const body = document.body;

  function applyState() {
    root.style.setProperty('--scale', String(state.scale));
    // theme
    document.documentElement.setAttribute('data-theme', state.theme);
    // contrast
    if (state.contrast === 'high') {
      document.documentElement.setAttribute('data-contrast', 'high');
    } else {
      document.documentElement.removeAttribute('data-contrast');
    }
    // underline
    document.querySelectorAll('a').forEach(a => {
      if (state.underline) a.classList.add('underline');
      else a.classList.remove('underline');
    });
    // motion
    if (state.motion) root.classList.add('reduced-motion');
    else root.classList.remove('reduced-motion');

    // update switches
    setPressed('#btn-theme', state.theme === 'light');
    setPressed('#btn-contrast', state.contrast === 'high');
    setPressed('#btn-underline', state.underline);
    setPressed('#btn-motion', state.motion);
  }

  function setPressed(selector, pressed) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute('aria-checked', pressed ? 'true' : 'false');
  }

  // Toolbar actions
  const actions = {
    'font-up': () => {
      state.scale = Math.min(1.6, (state.scale + 0.1));
      localStorage.setItem('a11y:scale', state.scale);
      applyState();
    },
    'font-down': () => {
      state.scale = Math.max(0.8, (state.scale - 0.1));
      localStorage.setItem('a11y:scale', state.scale);
      applyState();
    },
    'toggle-theme': () => {
      state.theme = (state.theme === 'light') ? 'default' : 'light';
      localStorage.setItem('a11y:theme', state.theme);
      applyState();
    },
    'toggle-contrast': () => {
      state.contrast = (state.contrast === 'high') ? 'normal' : 'high';
      localStorage.setItem('a11y:contrast', state.contrast);
      applyState();
    },
    'toggle-underline': () => {
      state.underline = !state.underline;
      localStorage.setItem('a11y:underline', String(state.underline));
      applyState();
    },
    'toggle-motion': () => {
      state.motion = !state.motion;
      localStorage.setItem('a11y:motion', state.motion ? 'reduced' : 'full');
      applyState();
    }
  };

  document.querySelectorAll('.a11y-toolbar .btn-ico').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.getAttribute('data-action');
      if (actions[action]) actions[action]();
    });
  });

  // Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === '.') { actions['font-up'](); }
    if (e.altKey && e.key === ',') { actions['font-down'](); }
  });

  // Render movie cards
  const grid = document.querySelector('.grid');
  const data = window.__MOVIES__ || [];
  const fragment = document.createDocumentFragment();

  data.forEach(item => {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-labelledby', `h-${item.id}`);

    const img = document.createElement('img');
    img.src = `./imagens/${item.id}.png`;
    img.alt = `Capa do filme: ${item.title}`;

    const body = document.createElement('div');
    body.className = 'card-body';

    const h3 = document.createElement('h3');
    h3.id = `h-${item.id}`;
    h3.textContent = item.title;

    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = item.tag;

    const p = document.createElement('p');
    p.textContent = item.synopsis;

    const actionsRow = document.createElement('div');
    actionsRow.className = 'actions';

    const btnAssistir = document.createElement('a');
    btnAssistir.className = 'btn primary';
    btnAssistir.href = '#';
    btnAssistir.setAttribute('role', 'button');
    btnAssistir.setAttribute('aria-label', `Abrir ${item.title} na Netflix (link ilustrativo)`);
    btnAssistir.textContent = 'Assistir na Netflix';

    const btnDetalhes = document.createElement('a');
    btnDetalhes.className = 'btn secondary';
    btnDetalhes.href = '#';
    btnDetalhes.setAttribute('role', 'button');
    btnDetalhes.setAttribute('aria-label', `Mais detalhes sobre ${item.title} (exemplo)`);
    btnDetalhes.textContent = 'Detalhes';

    actionsRow.appendChild(btnAssistir);
    actionsRow.appendChild(btnDetalhes);

    body.appendChild(h3);
    body.appendChild(tag);
    body.appendChild(p);

    card.appendChild(img);
    card.appendChild(body);
    card.appendChild(actionsRow);

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);

  applyState();
})();
