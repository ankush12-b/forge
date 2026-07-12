window.ForgeSite = {
  platform: 'gemini',

  getInputBox() {
    return document.querySelector('div[contenteditable="true"].ql-editor')
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

  getAnchor(box) {
    return box ? box.closest('div[class*="input-area"]') || box.parentElement : null;
  }
};
