const RECOVERY_STYLES = {
  wrapper:
    'min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(150deg,#f7f9fc 0%,#eef2f7 100%);color:#13283d;font-family:"Plus Jakarta Sans","Segoe UI",sans-serif;',
  card:
    'width:min(720px,100%);border-radius:24px;padding:32px;background:#ffffff;border:1px solid rgba(201,162,39,0.35);box-shadow:0 18px 50px rgba(11,28,45,0.12);',
  eyebrow:
    'margin-bottom:12px;color:#c9a227;font-size:0.72rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;',
  title:
    'margin:0;color:#0b1c2d;font-family:"Libre Baskerville",Georgia,serif;font-size:clamp(1.8rem,4vw,2.6rem);line-height:1.2;',
  body: 'margin:16px 0 24px;color:#2a435b;line-height:1.7;',
  actions: 'display:flex;gap:12px;flex-wrap:wrap;',
  button:
    'border:none;border-radius:999px;background:#c9a227;color:#0b1c2d;padding:0.95rem 1.35rem;font-weight:800;cursor:pointer;',
  link:
    'display:inline-flex;align-items:center;border-radius:999px;border:1px solid rgba(11,28,45,0.18);padding:0.95rem 1.35rem;font-weight:700;color:#0b1c2d;background:#ffffff;text-decoration:none;',
};

function clearShell() {
  const root = document.getElementById('root');
  if (!root) return null;
  root.innerHTML = '';
  return root;
}

function renderRecovery(message) {
  const root = clearShell();
  if (!root) return;

  root.innerHTML = `
    <div style="${RECOVERY_STYLES.wrapper}">
      <div style="${RECOVERY_STYLES.card}">
        <div style="${RECOVERY_STYLES.eyebrow}">KK Group of Companies</div>
        <h1 style="${RECOVERY_STYLES.title}">We could not load the page.</h1>
        <p style="${RECOVERY_STYLES.body}">${message}</p>
        <div style="${RECOVERY_STYLES.actions}">
          <button type="button" id="kk-reload-page" style="${RECOVERY_STYLES.button}">Reload Page</button>
          <a href="/#/" style="${RECOVERY_STYLES.link}">Open Home</a>
        </div>
      </div>
    </div>
  `;

  const reloadButton = document.getElementById('kk-reload-page');
  if (reloadButton) {
    reloadButton.addEventListener('click', () => {
      window.location.reload();
    });
  }
}

async function clearStaleCaches() {
  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    }
  } catch (error) {
    // Ignore cleanup failures. The app can still boot if the browser blocks SW APIs.
  }

  try {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
  } catch (error) {
    // Ignore cache cleanup failures and continue booting the app.
  }
}

async function boot() {
  await clearStaleCaches();

  try {
    await import('./main.jsx');

    window.setTimeout(() => {
      const root = document.getElementById('root');
      if (root && root.children.length === 0 && !root.textContent.trim()) {
        renderRecovery(
          'The app loaded, but the page stayed empty. Please reload once to fetch the latest build.'
        );
      }
    }, 7000);
  } catch (error) {
    console.error('KK Group bootstrap failed:', error);
    renderRecovery(
      'We cleared stale cache and tried to load the latest app bundle, but the browser still hit an error.'
    );
  }
}

boot();
