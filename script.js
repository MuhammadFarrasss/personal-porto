// theme toggle with persistence
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if(savedTheme){
  root.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'light' ? '◑' : '◐';
}
themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'light' ? '◑' : '◐';
});

// case-study job: simulate a run when opened (queued -> running -> success)
const caseStudyJob = document.getElementById('jobCase');
const caseJobStatus = document.getElementById('caseJobStatus');
let hasRun = false;
if(caseStudyJob){
  caseStudyJob.addEventListener('toggle', () => {
    if(caseStudyJob.open && !hasRun){
      hasRun = true;
      caseJobStatus.textContent = '●';
      caseJobStatus.className = 'job-status warn';
      setTimeout(() => {
        caseJobStatus.textContent = '✓';
        caseJobStatus.className = 'job-status success';
      }, 700);
    }
  });
}

// sidebar navigation: open target job and scroll to it
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(link.dataset.target);
    if(target){
      target.open = true;
      target.scrollIntoView({ behavior:'smooth', block:'start' });
    }
  });
});

// scroll spy: highlight sidebar link for the job currently in view
const spySections = document.querySelectorAll('.job');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
if(spySections.length && sidebarLinks.length){
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector('.sidebar-link[data-target="' + entry.target.id + '"]');
      if(!link) return;
      if(entry.isIntersecting){
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  spySections.forEach(sec => spyObserver.observe(sec));
}

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

// generic toast helper
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
function showToast(message){
  toastMessage.textContent = message;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

// copy email to clipboard as a fallback for mailto, shown via toast
document.querySelectorAll('.email-copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const email = btn.dataset.email;
    if(navigator.clipboard){
      navigator.clipboard.writeText(email).then(() => {
        showToast('copied ' + email);
      });
    }
  });
});

// scroll progress bar — fills as the page is scrolled
const progressFill = document.getElementById('progressFill');
function updateProgress(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressFill.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, { passive:true });
updateProgress();

// re-run workflow: replay the whole pipeline status animation
const rerunBtn = document.getElementById('rerunBtn');
const finalStatus = ['success', 'success', 'success', 'warn', 'success'];
const finalIcon = ['✓', '✓', '✓', '●', '✓'];
if(rerunBtn){
  rerunBtn.addEventListener('click', () => {
    rerunBtn.classList.add('spinning');
    const jobs = document.querySelectorAll('.job');
    jobs.forEach(job => {
      const statusEl = job.querySelector('.job-status');
      statusEl.className = 'job-status queued';
      statusEl.textContent = '●';
    });
    jobs.forEach((job, i) => {
      const statusEl = job.querySelector('.job-status');
      setTimeout(() => {
        statusEl.className = 'job-status warn';
        statusEl.textContent = '●';
        setTimeout(() => {
          statusEl.className = 'job-status ' + finalStatus[i];
          statusEl.textContent = finalIcon[i];
          if(i === jobs.length - 1){
            rerunBtn.classList.remove('spinning');
            showToast('pipeline run completed');
          }
        }, 350);
      }, i * 400);
    });
  });
}

// small easter egg for the curious
console.log('%cTC-13: kamu buka console.', 'font-family:monospace; font-weight:600; color:#3FB950;');
console.log('%cstatus: curious — itu bagus buat QA.', 'font-family:monospace; color:#8B949E;');