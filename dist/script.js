/* ------------------------------------------------------------------
   Configuracao da campanha - padrao Achilles Media.
   Preencha os campos abaixo. Vazio = o botao mantem o destino atual,
   nada quebra na pagina publicada.
------------------------------------------------------------------ */
const SITE_CONFIG = {
  whatsappGroupUrl: '',  // link chat.whatsapp.com do grupo oficial
  whatsappNumber: ''     // 55 + DDD + numero, so digitos. Ex.: '5534999999999'
};

if (SITE_CONFIG.whatsappGroupUrl) {
  document.querySelectorAll('[data-whatsapp-group]').forEach((element) => {
    element.href = SITE_CONFIG.whatsappGroupUrl;
    element.target = '_blank';
    element.rel = 'noreferrer';
    if (element.dataset.whatsappGroup === 'cta') {
      element.innerHTML = 'Entrar no grupo oficial <span>\u2197</span>';
    }
  });
  document.querySelectorAll('[data-whatsapp-pending]').forEach((element) => element.remove());
}

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const navAllLinks = [...document.querySelectorAll('.main-nav a')];
const currentPage = document.body.dataset.page;

document.querySelectorAll('.main-nav a[data-nav]').forEach((link) => {
  link.classList.toggle('active', link.dataset.nav === currentPage);
  if (link.dataset.nav === currentPage) link.setAttribute('aria-current', 'page');
});

// Posicao guardada enquanto o menu esta aberto. No iOS o overflow hidden
// nao segura o scroll: o jeito confiavel e tirar o body do fluxo e devolver
// a posicao ao fechar.
let lockedScroll = 0;

function isMenuOpen() {
  return nav.classList.contains('open');
}

function setMenu(open) {
  if (open === isMenuOpen()) return;

  if (open) {
    lockedScroll = window.scrollY || window.pageYOffset || 0;
    document.body.style.top = `-${lockedScroll}px`;
  }

  menuButton.classList.toggle('active', open);
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  document.documentElement.classList.toggle('menu-open', open);

  if (!open) {
    document.body.style.top = '';
    // instant: a folha usa scroll-behavior smooth, e aqui a volta tem que
    // ser seca, senao a pagina anima de volta (ou nem volta)
    window.scrollTo({ top: lockedScroll, behavior: 'instant' });
  }
}

function closeMenu() {
  setMenu(false);
}

menuButton.addEventListener('click', () => setMenu(!isMenuOpen()));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

// ao voltar pra largura de desktop o painel nao pode ficar preso
window.addEventListener('resize', () => {
  if (window.innerWidth > 980) closeMenu();
});

navAllLinks.forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('scroll', () => {
  if (isMenuOpen()) return;
  header.classList.toggle('scrolled', window.scrollY > 34);
}, { passive: true });

const revealItems = [...document.querySelectorAll('.reveal')];

function reveal(element) {
  element.classList.add('visible');
}

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        reveal(entry.target);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -45px' });

  revealItems.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    // o que ja nasce na tela nao espera o observer: o hero entra na hora
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
      reveal(element);
    } else {
      revealObserver.observe(element);
    }
  });

  // rede de seguranca: se o observer nao disparar, nada fica invisivel
  window.setTimeout(() => revealItems.forEach(reveal), 2600);
} else {
  revealItems.forEach(reveal);
}

const filters = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.priority-card')];

filters.forEach((filterButton) => {
  filterButton.addEventListener('click', () => {
    const category = filterButton.dataset.filter;
    filters.forEach((button) => button.classList.toggle('active', button === filterButton));
    cards.forEach((card) => {
      const visible = category === 'all' || card.dataset.category === category;
      card.classList.toggle('hidden', !visible);
    });
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-42% 0px -50% 0px' });

document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

const copyButton = document.querySelector('[data-copy-link]');
const copyFeedback = document.querySelector('.copy-feedback');

if (copyButton) {
  copyButton.addEventListener('click', async () => {
    const siteUrl = new URL('./index.html', window.location.href).href.replace(/index\.html$/, '');
    try {
      await navigator.clipboard.writeText(siteUrl);
      copyFeedback.textContent = 'Endereço copiado. Agora é só compartilhar.';
    } catch {
      const helper = document.createElement('textarea');
      helper.value = siteUrl;
      helper.setAttribute('readonly', '');
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      document.execCommand('copy');
      helper.remove();
      copyFeedback.textContent = 'Endereço copiado. Agora é só compartilhar.';
    }
  });
}
