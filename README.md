# Forge

⚡ Rewrites your rough prompts into sharp ones right inside Claude, ChatGPT, and Gemini. Click a button, get a better prompt, before you hit send.

**Live site:** [forgextension.vercel.app](https://forgextension.vercel.app/)

---

## What's in here

- **`extension/`** — the Chrome extension itself
- **`site/`** — the landing page (plain HTML/CSS/JS, deployed on Vercel)

Free to run. Bring your own Groq API key (also free), no backend, nothing to pay for.

---

## Setup

**Option 1 — Via the site**
1. Go to [forgextension.vercel.app](https://forgextension.vercel.app/) and click **Download for Chrome**
2. Unzip the file

**Option 2 — Via GitHub**
```bash
git clone https://github.com/ankush12-b/forge.git
```

Either way, once you have the `extension/` folder:

3. Open `chrome://extensions` in your browser
4. Turn on **Developer mode** (top right)
5. Click **Load unpacked** and select the `extension/` folder
6. Click the Forge icon in your toolbar
7. Grab a free key from [console.groq.com/keys](https://console.groq.com/keys), paste it in, save

That's it — go to claude.ai, chatgpt.com, or gemini.google.com, type a rough prompt, and hit the ⚡ button.

---

## Usage

1. Type something rough into any of the three sites
2. Click ⚡
3. Read the rewrite, click **Use this**

Changed something in `extension/`? Rebuild the zip the site hands out:
```bash
./build-extension-zip.sh
```

---

## Editing via Terminal

```bash
nano site/index.html
git add .
git commit -m "whatever you changed"
git push
```

---

## Troubleshooting

**"Manifest file is missing or unreadable"** — wrong folder. Pick `extension/` itself, not the outer repo.

**⚡ button won't show up** — site changed its layout. Fix the selector in `extension/sites/<platform>.js`.

**Clicking ⚡ does nothing** — check your Groq key, or you've hit the free rate limit (30 req/min).

---

## License

MIT — free to use, modify, and distribute.
