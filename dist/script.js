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
const currentPage = document.body.dataset.page;

document.querySelectorAll('.main-nav a[data-nav]').forEach((link) => {
  link.classList.toggle('active', link.dataset.nav === currentPage);
  if (link.dataset.nav === currentPage) link.setAttribute('aria-current', 'page');
});

function closeMenu() {
  menuButton.classList.remove('active');
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const open = !nav.classList.contains('open');
  menuButton.classList.toggle('active', open);
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 34);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -45px' });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});

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
