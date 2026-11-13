// Año del pie de página
document.getElementById('anio').textContent = new Date().getFullYear();

// ---------- Tema claro / oscuro ----------
const raiz = document.documentElement;
document.querySelector('.tema-btn').addEventListener('click', () => {
  const oscuroActual = raiz.dataset.theme
    ? raiz.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  const nuevo = oscuroActual ? 'light' : 'dark';
  raiz.dataset.theme = nuevo;
  try { localStorage.setItem('tema', nuevo); } catch (e) {}
});

// ---------- Menú móvil ----------
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
  const abierto = menu.classList.toggle('abierto');
  menuBtn.setAttribute('aria-expanded', abierto);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('abierto');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

// ---------- Borde de la barra al hacer scroll ----------
const barra = document.querySelector('.barra');
addEventListener('scroll', () => barra.classList.toggle('con-borde', scrollY > 10), { passive: true });

// ---------- Filtro de proyectos ----------
const filtros = document.querySelectorAll('.filtro');
const proyectos = document.querySelectorAll('.proyecto');
filtros.forEach(btn => btn.addEventListener('click', () => {
  filtros.forEach(b => { b.classList.remove('activo'); b.setAttribute('aria-pressed', 'false'); });
  btn.classList.add('activo');
  btn.setAttribute('aria-pressed', 'true');
  const f = btn.dataset.filtro;
  proyectos.forEach(p => p.classList.toggle('oculto', f !== 'todos' && !p.dataset.tags.includes(f)));
}));

// ---------- Contadores ----------
function contar(el) {
  const fin = +el.dataset.contar;
  const inicio = performance.now();
  const dur = 900;
  (function paso(t) {
    const p = Math.min((t - inicio) / dur, 1);
    el.textContent = Math.round(fin * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(paso);
  })(inicio);
}

// ---------- Aparición al hacer scroll + sección activa ----------
const elementos = document.querySelectorAll('.titulo-seccion, .sobre-grid, .skill-grupo, .proyecto, .contacto-caja');
if ('IntersectionObserver' in window) {
  elementos.forEach(el => el.classList.add('aparecer'));
  const obs = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      e.target.querySelectorAll('[data-contar]').forEach(contar);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  elementos.forEach(el => obs.observe(el));

  const enlaces = document.querySelectorAll('.menu a');
  const obsSeccion = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      enlaces.forEach(a => a.classList.toggle('activo', a.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => obsSeccion.observe(s));
} else {
  document.querySelectorAll('[data-contar]').forEach(el => el.textContent = el.dataset.contar);
}
