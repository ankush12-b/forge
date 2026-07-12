window.ForgeSite = {
  platform: 'chatgpt',

  getInputBox() {
    return document.querySelector('#prompt-textarea')
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
    return box ? box.closest('form') || box.parentElement : null;
  }
};
