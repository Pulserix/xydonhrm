/**
 * HRMS Theme System
 * Handles: accent color switching, dark/light mode toggle
 * Persists to localStorage
 */

const PRESETS = [
  { name: 'Indigo',  h: 239, s: '84%', l: '67%' },
  { name: 'Blue',    h: 217, s: '91%', l: '60%' },
  { name: 'Violet',  h: 263, s: '70%', l: '64%' },
  { name: 'Emerald', h: 152, s: '68%', l: '45%' },
  { name: 'Amber',   h: 43,  s: '96%', l: '56%' },
  { name: 'Rose',    h: 347, s: '89%', l: '60%' },
];

const STORAGE_KEY_ACCENT = 'hrms-accent';
const STORAGE_KEY_THEME  = 'hrms-theme';

function applyAccent(h, s, l) {
  const root = document.documentElement;
  root.style.setProperty('--accent-h', h);
  root.style.setProperty('--accent-s', s);
  root.style.setProperty('--accent-l', l);
}

function applyTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.setAttribute('data-mode', mode);
}

function saveAccent(preset) {
  localStorage.setItem(STORAGE_KEY_ACCENT, JSON.stringify(preset));
}

function saveTheme(mode) {
  localStorage.setItem(STORAGE_KEY_THEME, mode);
}

function loadAccent() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY_ACCENT));
    if (saved) { applyAccent(saved.h, saved.s, saved.l); return saved; }
  } catch {}
  return PRESETS[0];
}

function loadTheme() {
  const saved = localStorage.getItem(STORAGE_KEY_THEME) || 'dark';
  applyTheme(saved);
  return saved;
}

function buildThemePanel() {
  const panel = document.createElement('div');
  panel.id = 'theme-panel';
  panel.innerHTML = `
    <div id="theme-panel-trigger" title="Theme settings">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M12 2a10 10 0 0 1 0 20"/>
      </svg>
    </div>
    <div id="theme-panel-popup" style="display:none">
      <div class="theme-panel__title">Appearance</div>
      <div class="theme-panel__section-label">Mode</div>
      <div class="theme-panel__modes">
        <button class="theme-mode-btn" data-mode="dark">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          Dark
        </button>
        <button class="theme-mode-btn" data-mode="light">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          Light
        </button>
      </div>
      <div class="theme-panel__section-label">Accent color</div>
      <div class="theme-panel__swatches" id="accent-swatches"></div>
    </div>
  `;
  document.body.appendChild(panel);

  /* Inject panel styles */
  const style = document.createElement('style');
  style.textContent = `
    #theme-panel {
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 9999;
    }
    #theme-panel-trigger {
      width: 36px;
      height: 36px;
      background: var(--color-bg-elevated);
      border: 1px solid var(--color-border-strong);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--color-text-muted);
      transition: all var(--duration-fast);
      box-shadow: var(--shadow-md);
    }
    #theme-panel-trigger:hover {
      color: var(--color-text-primary);
      border-color: var(--color-accent);
    }
    #theme-panel-popup {
      position: absolute;
      bottom: 44px;
      left: 0;
      background: var(--color-bg-elevated);
      border: 1px solid var(--color-border-strong);
      border-radius: var(--radius-xl);
      padding: 16px;
      width: 200px;
      box-shadow: var(--shadow-xl);
      animation: scaleIn 0.15s ease;
      transform-origin: bottom left;
    }
    .theme-panel__title {
      font-size: 13px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: 12px;
    }
    .theme-panel__section-label {
      font-size: 10px;
      font-weight: 600;
      color: var(--color-text-muted);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .theme-panel__modes {
      display: flex;
      gap: 6px;
      margin-bottom: 14px;
    }
    .theme-mode-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 7px;
      background: var(--color-bg-overlay);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: 12px;
      font-weight: 500;
      color: var(--color-text-secondary);
      cursor: pointer;
      transition: all 0.12s;
      font-family: var(--font-sans);
    }
    .theme-mode-btn:hover,
    .theme-mode-btn.active {
      border-color: var(--color-accent);
      color: var(--color-accent);
      background: var(--color-accent-soft);
    }
    .theme-panel__swatches {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 6px;
    }
    .accent-swatch {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.12s;
      position: relative;
    }
    .accent-swatch:hover { transform: scale(1.15); }
    .accent-swatch.active {
      border-color: var(--color-text-primary);
    }
    .accent-swatch.active::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 6px;
      height: 6px;
      background: white;
      border-radius: 50%;
    }
  `;
  document.head.appendChild(style);

  /* Populate swatches */
  const swatchContainer = document.getElementById('accent-swatches');
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY_ACCENT) || '{}');

  PRESETS.forEach(preset => {
    const swatch = document.createElement('div');
    swatch.className = 'accent-swatch' + (preset.h === (saved.h || 239) ? ' active' : '');
    swatch.title = preset.name;
    swatch.style.background = `hsl(${preset.h}, ${preset.s}, ${preset.l})`;
    swatch.addEventListener('click', () => {
      applyAccent(preset.h, preset.s, preset.l);
      saveAccent(preset);
      document.querySelectorAll('.accent-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
    });
    swatchContainer.appendChild(swatch);
  });

  /* Mode buttons */
  const currentTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'dark';
  document.querySelectorAll('.theme-mode-btn').forEach(btn => {
    if (btn.dataset.mode === currentTheme) btn.classList.add('active');
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      applyTheme(mode);
      saveTheme(mode);
      document.querySelectorAll('.theme-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* Toggle popup */
  const trigger = document.getElementById('theme-panel-trigger');
  const popup   = document.getElementById('theme-panel-popup');

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = popup.style.display !== 'none';
    popup.style.display = isVisible ? 'none' : 'block';
  });

  document.addEventListener('click', () => { popup.style.display = 'none'; });
  popup.addEventListener('click', e => e.stopPropagation());
}

/* ─── Mobile Bottom Nav ──────────────────────────────────── */
function buildMobileBottomNav() {
  const page = window.location.pathname.split('/').pop() || 'dashboard.html';

  const NAV_ITEMS = [
    {
      id: 'home',
      label: 'Home',
      href: 'dashboard.html',
      pages: ['dashboard.html', 'index.html'],
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    },
    {
      id: 'employees',
      label: 'People',
      href: 'employees.html',
      pages: ['employees.html'],
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    },
    {
      id: 'attendance',
      label: 'Attendance',
      href: 'attendance.html',
      pages: ['attendance.html'],
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    },
    {
      id: 'leave',
      label: 'Leave',
      href: 'leave.html',
      pages: ['leave.html'],
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    },
    {
      id: 'more',
      label: 'More',
      href: null,
      pages: [],
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
    },
  ];

  const knownPages = ['dashboard.html', 'employees.html', 'attendance.html', 'leave.html'];
  const isKnown = knownPages.includes(page);

  const nav = document.createElement('nav');
  nav.id = 'mobile-bottom-nav';
  nav.innerHTML = NAV_ITEMS.map(item => {
    const isActive = item.pages.includes(page) || (item.id === 'more' && !isKnown);
    const tag = item.href ? `a href="${item.href}"` : 'button onclick="typeof toggleMobileSidebar === \'function\' && toggleMobileSidebar()"';
    const closeTag = item.href ? 'a' : 'button';
    return `
      <${tag} class="mbn-item${isActive ? ' active' : ''}">
        <span class="mbn-icon">${item.icon}</span>
        <span class="mbn-label">${item.label}</span>
      </${closeTag}>`;
  }).join('');

  document.body.appendChild(nav);

  const style = document.createElement('style');
  style.textContent = `
    #mobile-bottom-nav {
      display: none;
    }
    @media (max-width: 768px) {
      #mobile-bottom-nav {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 62px;
        background: var(--color-bg-surface);
        border-top: 1px solid var(--color-border);
        z-index: 300;
        padding: 0 var(--space-2);
        padding-bottom: env(safe-area-inset-bottom, 0px);
      }
      .mbn-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3px;
        color: var(--color-text-muted);
        text-decoration: none;
        background: none;
        border: none;
        cursor: pointer;
        font-family: var(--font-sans);
        padding: 6px 4px;
        border-radius: var(--radius-md);
        transition: color 0.15s;
        -webkit-tap-highlight-color: transparent;
      }
      .mbn-item.active {
        color: var(--color-accent);
      }
      .mbn-item:not(.active):active {
        color: var(--color-text-secondary);
      }
      .mbn-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .mbn-icon svg {
        transition: stroke 0.15s;
      }
      .mbn-item.active .mbn-icon svg {
        stroke: var(--color-accent);
        stroke-width: 2.2;
      }
      .mbn-label {
        font-size: 10px;
        font-weight: 500;
        letter-spacing: 0.01em;
        white-space: nowrap;
      }
      /* Push content above bottom nav */
      .app-content {
        padding-bottom: calc(var(--space-7) + 62px + env(safe-area-inset-bottom, 0px));
      }
      /* Hide theme panel on mobile (conflicts with bottom nav) */
      #theme-panel {
        display: none;
      }
      /* Hide topbar hamburger — bottom nav More item handles it */
      .mobile-menu-btn {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}


/* ─── Init ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadAccent();
  loadTheme();
  buildThemePanel();
  buildMobileBottomNav();
});
