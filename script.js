'use strict';

// ─── WARNING SCREEN SEQUENCE ──────────────────────────────────────────────────

const warnLines = [
  { text: '> BREACH DETECTED — ORIGIN UNKNOWN',            cls: 'wl-hi',  pause: 320 },
  { text: '> INITIATING TRACE PROTOCOL...',                cls: '',        pause: 180 },
  { text: '> SOURCE IP:  ████.████.████.████  [MASKED]',   cls: '',        pause: 120 },
  { text: '> IDENTITY:   [NO MATCH — FLAGGED]',            cls: 'wl-hi',  pause: 160 },
  { text: '',                                               cls: '',        pause: 500 },
  { text: '> CLEARANCE LEVEL REQUIRED:  ████████',         cls: '',        pause: 140 },
  { text: '> YOUR CLEARANCE:  NONE',                       cls: 'wl-hi',  pause: 200 },
  { text: '',                                               cls: '',        pause: 400 },
  { text: '  Accessing this network without authorization', cls: 'wl-dim', pause: 60  },
  { text: '  is a criminal offense under classified law.',  cls: 'wl-dim', pause: 60  },
  { text: '  M.A.R.K.S security has been notified.',       cls: 'wl-dim', pause: 60  },
  { text: '',                                               cls: '',        pause: 500 },
  { text: '> THIS ACCESS EVENT HAS BEEN LOGGED.',          cls: 'wl-hi',  pause: 200 },
];

const warnContainer = document.getElementById('warn-lines');
const bypassWrap    = document.getElementById('bypass-wrap');
const bypassBtn     = document.getElementById('bypass-btn');

function typeSpan(text, cls, speed, done) {
  const el = document.createElement('span');
  el.className = 'wl ' + (cls || '');
  warnContainer.appendChild(el);
  if (!text) { el.innerHTML = '&nbsp;'; done && done(); return; }
  let i = 0;
  const iv = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) { clearInterval(iv); done && done(); }
  }, speed);
}

function runWarning(idx) {
  if (idx >= warnLines.length) {
    setTimeout(() => bypassWrap.classList.remove('hidden'), 400);
    return;
  }
  const { text, cls, pause } = warnLines[idx];
  setTimeout(() => typeSpan(text, cls, 20, () => runWarning(idx + 1)), pause);
}

runWarning(0);

// ─── BYPASS BUTTON ────────────────────────────────────────────────────────────

bypassBtn.addEventListener('click', () => {
  document.title = 'M.A.R.K.S — CONTAINMENT & TRIAL DIVISION';

  const ws = document.getElementById('warning-screen');
  const mc = document.getElementById('main-content');

  ws.style.transition = 'opacity .7s ease';
  ws.style.opacity    = '0';

  setTimeout(() => {
    ws.style.display = 'none';
    mc.classList.remove('hidden');
    mc.style.opacity    = '0';
    mc.style.transition = 'opacity .8s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { mc.style.opacity = '1'; });
    });
  }, 700);
});

// ─── LIVE SESSION ID ──────────────────────────────────────────────────────────

(function () {
  const chars = '0123456789ABCDEF';
  const id = Array.from({ length: 12 }, (_, i) =>
    i > 0 && i % 4 === 0 ? '-' + chars[Math.random() * 16 | 0] : chars[Math.random() * 16 | 0]
  ).join('');
  const el = document.getElementById('session-id');
  if (el) el.textContent = id;
})();

// ─── REDACTED HOVER SOUND (silent fallback — no external deps) ────────────────
// Nothing needed. Pure CSS handles the hover effect.

// ─── CARD FLICKER ON HOVER ───────────────────────────────────────────────────

document.querySelectorAll('.terminal-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all .05s';
    setTimeout(() => { card.style.transition = 'all .3s'; }, 80);
  });
});
