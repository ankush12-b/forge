(function () {
  const site = window.ForgeSite;
  if (!site) return;

  let currentBox = null;
  let observer = null;

  function injectButton() {
    const box = site.getInputBox();
    if (!box || box === currentBox) return;
    currentBox = box;

    if (document.getElementById('forge-button')) {
      document.getElementById('forge-button').remove();
    }

    const btn = document.createElement('button');
    btn.id = 'forge-button';
    btn.title = 'Enhance prompt';
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14.5 9H21.5L15.5 13.5L18 21L12 16.5L6 21L8.5 13.5L2.5 9H9.5L12 2Z" fill="white"/>
    </svg>`;
    Object.assign(btn.style, {
      position: 'fixed',
      zIndex: 999999,
      bottom: '90px',
      right: '24px',
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      border: '1px solid rgba(255,255,255,0.12)',
      background: 'linear-gradient(135deg, #7C5CFC 0%, #22D3B8 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 4px 16px rgba(124,92,252,0.35), 0 2px 6px rgba(0,0,0,0.25)',
      transition: 'transform 0.15s ease, box-shadow 0.15s ease'
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.07)';
      btn.style.boxShadow = '0 6px 20px rgba(124,92,252,0.45), 0 2px 8px rgba(0,0,0,0.3)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '0 4px 16px rgba(124,92,252,0.35), 0 2px 6px rgba(0,0,0,0.25)';
    });

    btn.addEventListener('click', onEnhanceClick);
    document.body.appendChild(btn);
  }

  async function onEnhanceClick() {
    const box = site.getInputBox();
    const text = site.getText(box);
    if (!text || !text.trim()) return;

    const btn = document.getElementById('forge-button');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `<span style="font-size:13px;">···</span>`;
    btn.style.opacity = '0.7';
    btn.disabled = true;

    chrome.runtime.sendMessage(
      { type: 'ENHANCE_PROMPT', text, platform: site.platform },
      (response) => {
        btn.innerHTML = originalHTML;
        btn.style.opacity = '1';
        btn.disabled = false;

        if (!response) return;

        if (response.ok) {
          showPreview(text, response.enhanced, (finalText) => {
            site.setText(box, finalText);
          });
        } else {
          const fallback = window.ForgeFallback(text);
          showPreview(text, fallback, (finalText) => {
            site.setText(box, finalText);
          }, response.error);
        }
      }
    );
  }

  function showPreview(original, enhanced, onAccept, errorNote) {
    const existing = document.getElementById('forge-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'forge-modal';
    Object.assign(overlay.style, {
      position: 'fixed', inset: '0', background: 'rgba(10,9,13,0.6)', backdropFilter: 'blur(2px)',
      zIndex: 1000000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    });

    const card = document.createElement('div');
    Object.assign(card.style, {
      background: '#141317', color: '#F1EFF7', width: '480px', maxWidth: '90vw',
      maxHeight: '80vh', overflowY: 'auto', borderRadius: '14px', padding: '20px',
      fontFamily: '-apple-system, sans-serif', fontSize: '13px',
      border: '1px solid rgba(124,92,252,0.25)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)'
    });

    card.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
        <span style="width:8px; height:8px; border-radius:50%; background:linear-gradient(135deg,#7C5CFC,#22D3B8); display:inline-block;"></span>
        <span style="font-weight:600; font-size:15px;">Enhanced prompt${errorNote ? ' · offline fallback' : ''}</span>
      </div>
      ${errorNote ? `<div style="color:#FF6B7A; font-size:11px; margin-bottom:10px; line-height:1.4;">${errorNote}</div>` : ''}
      <textarea id="forge-textarea" style="width:100%; box-sizing:border-box; height:160px; background:#0D0C10; color:#F1EFF7; border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:12px; font-size:13px; line-height:1.5; resize:vertical;">${enhanced}</textarea>
      <div style="display:flex; gap:8px; margin-top:14px;">
        <button id="forge-accept" style="flex:1; padding:9px; border:none; border-radius:8px; background:linear-gradient(135deg, #7C5CFC 0%, #22D3B8 100%); color:white; font-weight:600; cursor:pointer; font-size:13px;">Use this</button>
        <button id="forge-cancel" style="flex:1; padding:9px; border:1px solid rgba(255,255,255,0.12); border-radius:8px; background:transparent; color:#9A96A8; cursor:pointer; font-size:13px;">Cancel</button>
      </div>
    `;

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    document.getElementById('forge-accept').addEventListener('click', () => {
      const finalText = document.getElementById('forge-textarea').value;
      onAccept(finalText);
      overlay.remove();
    });
    document.getElementById('forge-cancel').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  }

  observer = new MutationObserver(injectButton);
  observer.observe(document.body, { childList: true, subtree: true });
  injectButton();
})();
