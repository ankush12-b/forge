# Forge

A browser extension that forges rough prompts into sharp, well-structured ones — right inside Claude, ChatGPT, and Gemini. One click, powered by Groq's free API, before you hit send.

**Repo structure:**
```
forge/
├── extension/        Chrome extension (Manifest V3)
├── site/              Marketing site (static HTML, deploy to Vercel)
└── README.md
```

## Extension

See [`extension/README.md`](extension/README.md) — wait, that got removed, folded in below.

### Load it locally
1. `chrome://extensions` → enable **Developer mode**
2. **Load unpacked** → select the `extension/` folder
3. Click the toolbar icon → paste a free key from [console.groq.com/keys](https://console.groq.com/keys) → Save
4. Go to claude.ai / chatgpt.com / gemini.google.com, type a rough prompt, click the ⚡ button

### Ship a release
The site downloads the extension **directly from itself** — `site/public/forge-extension.zip` is a same-origin static file, no GitHub redirect. Whenever you change anything in `extension/`, regenerate it:
```bash
./build-extension-zip.sh
```
This prints a new SHA-256 checksum — paste it into the `checksumRow` line near the bottom of `site/index.html` so the displayed hash stays accurate.

You can *additionally* publish to GitHub Releases if you want a version history, but it's optional — the site's download button never depends on it.


## Site

Plain static HTML/CSS/JS — no build step, no framework, so Vercel deploys it as-is.

### Deploy to Vercel
```bash
npm i -g vercel        # one-time
cd site
vercel                 # first deploy, follow the prompts
vercel --prod           # promote to production
```
Or connect the GitHub repo directly in the [Vercel dashboard](https://vercel.com/new) → set **Root Directory** to `site` → deploy. Every push to `main` auto-deploys after that.

### Before deploying
Search `site/index.html` for `ankush12-b` and replace with your actual GitHub username/repo, so the GitHub and download links resolve correctly.

## Push this repo to GitHub
```bash
cd forge
git init
git add .
git commit -m "Initial commit: Forge extension + site"
git branch -M main
git remote add origin https://github.com/ankush12-b/forge.git
git push -u origin main
```

## License
MIT — do whatever you want with it.
