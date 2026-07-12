// Very small offline fallback — only used if the Groq call fails (e.g. no key set, no internet).
// Not the primary engine; the real enhancement happens via Groq in background.js.
window.ForgeFallback = function (text) {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;

  let out = trimmed;
  if (out.split(' ').length < 12) {
    out = `${out}\n\nPlease be specific and give a clear, well-structured answer.`;
  }
  return out;
};
