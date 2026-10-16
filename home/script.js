(() => {
  const STORAGE_PREFIX = 'boba';                       // -> boba-theme, boba-dir
  const root = document.documentElement;
  const read  = (k) => { try { return localStorage.getItem(`${STORAGE_PREFIX}-${k}`); } catch { return null; } };
  const write = (k, v) => { try { localStorage.setItem(`${STORAGE_PREFIX}-${k}`, v); } catch {} };

  
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', read('theme') || (prefersDark ? 'dark' : 'light'));
  root.setAttribute('dir', read('dir') || root.getAttribute('dir') || 'ltr');

  document.addEventListener('DOMContentLoaded', () => {

    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        write('theme', next);
      });
    }

    
    const dirToggle = document.getElementById('dir-toggle');
    const updateDirLabel = () => {
      if (dirToggle) dirToggle.textContent = root.getAttribute('dir') === 'rtl' ? 'LTR' : 'RTL';
    };
    if (dirToggle) {
      dirToggle.addEventListener('click', () => {
        const next = root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
        root.setAttribute('dir', next);
        write('dir', next);
        updateDirLabel();
      });
    }
    updateDirLabel();

    
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasHover) {
      document.querySelectorAll('.nav-item').forEach((item) => {
        const link = item.querySelector(':scope > a');
        const dropdown = item.querySelector('.dropdown');
        if (!link || !dropdown) return;
        link.addEventListener('click', (e) => {
          if (!item.classList.contains('open')) {
            e.preventDefault();
            document.querySelectorAll('.nav-item.open').forEach((o) => { if (o !== item) o.classList.remove('open'); });
            item.classList.add('open');
          }
        });
      });
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item')) {
          document.querySelectorAll('.nav-item.open').forEach((i) => i.classList.remove('open'));
        }
      });
    }

    
    const menuToggle = document.getElementById('menu-toggle');
    const mobilePanel = document.getElementById('mobile-panel');
    if (menuToggle && mobilePanel) {
      const setOpen = (open) => {
        mobilePanel.classList.toggle('open', open);
        menuToggle.setAttribute('aria-expanded', open);
      };
      menuToggle.addEventListener('click', () => setOpen(!mobilePanel.classList.contains('open')));
      mobilePanel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
      window.addEventListener('resize', () => { if (window.innerWidth > 1100) setOpen(false); });
    }
  });
})();
