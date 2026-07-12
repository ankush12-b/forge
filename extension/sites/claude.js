window.ForgeSite = {
  platform: 'claude',

  getInputBox() {
    return document.querySelector('div[contenteditable="true"].ProseMirror')
      || document.querySelector('div[contenteditable="true"]');
  },

  getText(box) {
    return box ? box.innerText : '';
  },

  setText(box, text) {
    if (!box) return;
    box.focus();
    document.execCommand('selectAll', false, null);
    document.execCommand('insertText', false, text);
  },

  // Where to anchor the enhancer button, relative to the input box
  getAnchor(box) {
    return box ? box.closest('div[class*="Composer"]') || box.parentElement : null;
  }
};
