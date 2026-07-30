// ---- Loading screen ----
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if(loader){
    setTimeout(() => loader.classList.add('hidden'), 700);
  }
});

// ---- Ambient floating particles ----
const glowLayer = document.querySelector('.bg-glow');
if(glowLayer){
  for(let i = 0; i < 18; i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (12 + Math.random() * 14) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    glowLayer.appendChild(p);
  }
}

// ---- Typing animation for hero title ----
const typeTarget = document.getElementById('typewriter');
if(typeTarget){
  const roles = ['Java Backend Developer', 'Spring Boot Developer', 'Java Full Stack Developer'];
  let roleIndex = 0, charIndex = 0, deleting = false;
  function tick(){
    const current = roles[roleIndex];
    if(!deleting){
      charIndex++;
      if(charIndex > current.length){ deleting = true; setTimeout(tick, 1400); return; }
    } else {
      charIndex--;
      if(charIndex < 0){ deleting = false; roleIndex = (roleIndex + 1) % roles.length; charIndex = 0; }
    }
    typeTarget.textContent = current.slice(0, charIndex);
    setTimeout(tick, deleting ? 40 : 80);
  }
  tick();
}

// ---- Reveal on scroll + animated counters ----
function animateCounter(el){
  if (el.dataset.done) return;
  const text = el.textContent.trim();
  const match = text.match(/^([\d.]+)(.*)$/);
  if(!match) return;
  el.dataset.done = 'true';
  const target = parseFloat(match[1]);
  const suffix = match[2];
  const decimals = (match[1].split('.')[1] || '').length;
  const duration = 900;
  let start = null;
  function step(ts){
    if(!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = (target * eased).toFixed(decimals) + suffix;
    if(progress < 1) requestAnimationFrame(step);
    else el.textContent = match[1] + suffix;
  }
  requestAnimationFrame(step);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      entry.target.querySelectorAll('[data-counter]').forEach(animateCounter);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Scroll progress bar ----
const progressBar = document.getElementById('progressBar');
function updateProgress(){
  if(!progressBar) return;
  const h = document.documentElement;
  const scrolled = h.scrollTop;
  const max = h.scrollHeight - h.clientHeight;
  progressBar.style.width = max > 0 ? (scrolled / max) * 100 + '%' : '0%';
}
document.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// ---- Nav: shrink-on-scroll + mobile toggle + active link ----
const headerEl = document.querySelector('header');
function updateHeaderState(){
  if(!headerEl) return;
  headerEl.classList.toggle('scrolled', window.scrollY > 20);
}
document.addEventListener('scroll', updateHeaderState, { passive: true });
updateHeaderState();

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if(navToggle && navLinks){
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    navToggle.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      navToggle.classList.remove('active');
    });
  });
}

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
if(sections.length && navAnchors.length){
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          const href = a.getAttribute('href');
          a.classList.toggle('active', href === `#${id}` || href === `index.html#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));
}

// ---- Tilt + cursor glow on glass cards ----
function initTilt(selector){
  document.querySelectorAll(selector).forEach(card => {
    card.classList.add('tilt-card');
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rotateX = (-(y - r.height / 2) / r.height) * 5;
      const rotateY = ((x - r.width / 2) / r.width) * 5;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.setProperty('--mx', `${(x / r.width) * 100}%`);
      card.style.setProperty('--my', `${(y / r.height) * 100}%`);
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}
initTilt('.proj-card');
initTilt('.skill-card');
initTilt('.exp-block');
initTilt('.pas-card');
initTilt('.fact-card');

// ---- Contact form (submits to Formspree — real delivery, no page reload) ----
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if(contactForm){
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    if(formStatus) formStatus.textContent = '';

    try{
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if(response.ok){
        contactForm.reset();
        if(formStatus){ formStatus.textContent = 'Message sent — thanks for reaching out!'; formStatus.style.color = 'var(--success)'; }
      } else {
        if(formStatus){ formStatus.textContent = "Something went wrong — please email me directly instead."; formStatus.style.color = '#F87171'; }
      }
    } catch(err){
      if(formStatus){ formStatus.textContent = "Couldn't send — please email me directly instead."; formStatus.style.color = '#F87171'; }
    } finally {
      submitBtn.textContent = originalLabel;
      submitBtn.disabled = false;
    }
  });
}
