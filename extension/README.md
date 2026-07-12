# Forge — extension

Manifest V3 Chrome extension. See the top-level repo README for full setup, release, and Chrome Web Store steps.

Quick load:
1. `chrome://extensions` → enable Developer mode
2. Load unpacked → select this folder
3. Click the toolbar icon, paste a free Groq key (console.groq.com/keys), save
4. Try it on claude.ai, chatgpt.com, or gemini.google.com

Files:
- `manifest.json` — extension config
- `background.js` — calls the Groq API
- `content.js` — injects the floating button + preview modal
- `sites/*.js` — per-platform selectors for finding/writing the input box
- `popup.html` / `popup.js` — API key entry UI
