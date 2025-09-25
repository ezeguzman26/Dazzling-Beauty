/* Dazzling Beauty - Interactions */
document.addEventListener('DOMContentLoaded', () => {
  /* --- Mobile side panel --- */
  const hamburger = document.getElementById('hamburger');
  const sidePanel = document.querySelector('.side-panel') || document.getElementById('side-panel');
  const panelOverlay = document.querySelector('.panel-overlay') || document.getElementById('panel-overlay');

  function openPanel() {
    sidePanel.classList.add('open');
    panelOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }
  function closePanel() {
    sidePanel.classList.remove('open');
    panelOverlay.classList.remove('show');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && sidePanel && panelOverlay) {
    hamburger.addEventListener('click', () => {
      if (sidePanel.classList.contains('open')) closePanel();
      else openPanel();
    });
    panelOverlay.addEventListener('click', closePanel);
    document.querySelectorAll('.side-nav a').forEach(a => a.addEventListener('click', closePanel));
  }

  /* --- Simple parallax for hero bg on desktop --- */
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    if (window.innerWidth > 768 && heroBg) {
      const sc = window.scrollY;
      heroBg.style.transform = `translateY(${sc * 0.15}px)`;
    }
  }, { passive: true });

  /* --- AOS-like simple fade-in on scroll --- */
  const aosEls = document.querySelectorAll('[data-aos]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('aos-init');
        setTimeout(()=> e.target.classList.add('aos-animate'), 20);
      }
    });
  }, { threshold: 0.12 });
  aosEls.forEach(el => obs.observe(el));

  /* --- Before/After slider --- */
  const ba = document.getElementById('beforeAfter');
  const resizer = document.getElementById('baResizer');
  if (ba && resizer) {
    let active = false;
    function setPos(clientX) {
      const rect = ba.getBoundingClientRect();
      let x = clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      const pct = (x / rect.width) * 100;
      ba.querySelector('.ba-after').style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      resizer.style.left = `${pct}%`;
    }
    // mouse
    resizer.addEventListener('mousedown', ()=> active = true);
    window.addEventListener('mouseup', ()=> active = false);
    window.addEventListener('mousemove', (ev)=> active && setPos(ev.clientX));
    // touch
    resizer.addEventListener('touchstart', ()=> active = true, {passive:true});
    window.addEventListener('touchend', ()=> active = false);
    window.addEventListener('touchmove', (ev)=> {
      if (!active) return;
      setPos(ev.touches[0].clientX);
    }, {passive:true});
    // allow click on container to move
    ba.addEventListener('click', (ev)=> setPos(ev.clientX));
    // initial center
    setTimeout(()=> setPos( ba.getBoundingClientRect().left + ba.getBoundingClientRect().width/2 ), 100);
  }

 

  /* --- Reserva form (simple handler: open whatsapp with prefilled sms) --- */
  const form = document.getElementById('reservaForm');
  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    
    const servicio = document.getElementById('servicio').value;
    const fecha = document.getElementById('fecha').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    // Validate basic
    if (!nombre || !tel || !servicio || !fecha) {
      alert('Por favor completa nombre, teléfono, servicio y fecha.');
      return;
    }

    // Build whatsapp message (phone is example, replace with yours)
    const phone = '5493512301846';
    const text = encodeURIComponent(
      `Reserva: %0ANombre: ${nombre}%0ATeléfono: ${tel}%0AServicio: ${servicio}%0AFecha: ${fecha}%0AMensaje: ${mensaje}`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');

    // Optionally reset
    form.reset();
  });

});
// Swiper inicialización
const swiper = new Swiper('.works-swiper', {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 1,
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});
