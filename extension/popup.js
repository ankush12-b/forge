const input = document.getElementById('apikey');
const status = document.getElementById('status');

chrome.storage.sync.get(['groqApiKey'], (res) => {
  if (res.groqApiKey) input.value = res.groqApiKey;
});

document.getElementById('save').addEventListener('click', () => {
  const key = input.value.trim();
  if (!key) {
    status.textContent = 'Enter a key first.';
    return;
  }
  chrome.storage.sync.set({ groqApiKey: key }, () => {
    status.textContent = 'Saved ✓';
    setTimeout(() => (status.textContent = ''), 1500);
  });
});
