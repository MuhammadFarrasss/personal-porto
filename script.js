// dark mode toggle with persistence
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if(saved === 'dark'){ root.setAttribute('data-theme','dark'); toggleBtn.textContent = '☀️'; }
  toggleBtn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if(isDark){ root.removeAttribute('data-theme'); toggleBtn.textContent = '🌙'; localStorage.setItem('theme','light'); }
    else{ root.setAttribute('data-theme','dark'); toggleBtn.textContent = '☀️'; localStorage.setItem('theme','dark'); }
  });

  // scroll reveal
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');
  if(prefersReduced){
    revealEls.forEach(el => el.classList.add('visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }

  // status pill changes when case study scrolls into view
  const caseStudy = document.getElementById('caseStudy');
  const caseStatus = document.getElementById('caseStatus');
  const statusObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        caseStatus.textContent = 'shipped on time';
        caseStatus.classList.remove('progress');
        caseStatus.classList.add('pass');
        statusObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  if(caseStudy) statusObserver.observe(caseStudy);

  // playground kanban — click a card to move it to the next column
  const order = ['todo', 'progress', 'done'];
  document.querySelectorAll('.board-card').forEach(card => {
    card.addEventListener('click', () => {
      const currentCol = card.parentElement.dataset.col;
      const idx = order.indexOf(currentCol);
      const nextCol = order[(idx + 1) % order.length];
      const target = document.querySelector('.board-col[data-col="' + nextCol + '"]');
      target.appendChild(card);
    });
  });

  // email button: try mailto, and copy address as a fallback for people without a mail client set up
const emailBtn = document.getElementById('emailBtn');
const toast = document.getElementById('toast');
const toastEmail = document.getElementById('toastEmail');
if(emailBtn){
  emailBtn.addEventListener('click', () => {
    const email = emailBtn.dataset.email;
    if(navigator.clipboard){
      navigator.clipboard.writeText(email).then(() => {
        toastEmail.textContent = email;
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); }, 3000);
      });
    }
  });
}

  // small easter egg for the curious
  console.log('%cTC-13: kamu buka console.', 'font-family:monospace; font-weight:600;');
  console.log('%cstatus: curious — itu bagus buat QA.', 'font-family:monospace; color:#0E9F6E;');