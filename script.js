 // small helpers
  const $ = q => document.querySelector(q);
  const $$ = q => Array.from(document.querySelectorAll(q));

  // mobile menu toggle
  const hamb = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamb && hamb.addEventListener('click', ()=>{
    if(mobileMenu.style.display === 'none' || mobileMenu.style.display === '') mobileMenu.style.display = 'block';
    else mobileMenu.style.display = 'none';
  });

  // smooth scroll for all data-link anchors
  $$('[data-link]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const href = a.getAttribute('href');
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      // close mobile menu if open
      if(window.innerWidth < 980) mobileMenu.style.display = 'none';
    });
  });

  // typing animation (short, accessible)
  (function(){
    const words = ['Front-end Web Developer','Web Developer'];
    const el = document.getElementById('typed');
    let wi = 0, ci = 0, back = false;
    function step(){
      const word = words[wi];
      el.textContent = word.slice(0, ci + (back ? -1 : 1));
      ci = back ? ci-1 : ci+1;
      if(!back && ci === word.length){ setTimeout(()=>back = true, 900); }
      else if(back && ci === 0){ back = false; wi = (wi+1) % words.length; }
      setTimeout(step, back ? 50 : 90);
    }
    step();
  })();

  // reveal on scroll
  (function(){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting) en.target.classList.add('in');
      });
    },{threshold:0.12});
    $$('.reveal').forEach(el=>io.observe(el));
  })();

  // Projects: open modal with details
  const modal = $('#modal');
  const modalTitle = $('#modalTitle');
  const modalBody = $('#modalBody');
  const modalLink = $('#modalLink');
  const modalClose = $('#modalClose');

  function openModal(title, desc, tags, link){
    modalTitle.textContent = title;
    modalBody.innerHTML = `<p class="muted">${desc}</p><p style=\"margin-top:10px\"><strong>Technologies:</strong> ${tags}</p>`;
    modalLink.href = link || '#';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  }
  $$('.project').forEach(p=>{
    p.addEventListener('click', ()=>{
      openModal(p.dataset.title, p.dataset.desc, p.dataset.tags, p.dataset.link);
    });
    p.addEventListener('keypress', (e)=>{ if(e.key === 'Enter') p.click(); });
  });
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });

  // Contact form placeholder behavior
  const form = document.getElementById('https://formspree.io/f/xjkelypa');
  form && form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    if(!fd.get('name') || !fd.get('email') || !fd.get('message')){ alert('Please fill name, email and message.'); return; }
    alert('Nice! Your message is ready to send. Replace the form action with your Formspree ID or backend to enable sending.');
    form.reset();
  });

  // Active nav link based on viewport
  (function(){
    const sections = $$('main section[id]');
    const navLinks = $$('nav a[data-link]');
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          navLinks.forEach(a=>a.classList.remove('active'));
          const link = navLinks.find(a => a.getAttribute('href') === '#'+en.target.id);
          if(link) link.classList.add('active');
        }
      });
    },{threshold:0.45});
    sections.forEach(s=>obs.observe(s));
  })();
