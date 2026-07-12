# Forge

⚡ Rewrites your rough prompts into sharp, well-structured ones — right inside Claude, ChatGPT, and Gemini. Click a button, get a better prompt, before you hit send.

**Live site:** [forgextension.vercel.app](https://forgextension.vercel.app/) — grab the extension from there, or clone this repo if you'd rather.

---

#What's in here

Two parts:
- **`extension/`** — the actual Chrome extension. Figures out which AI site you're on, sends your prompt to Groq for a rewrite, shows you a preview before touching anything you typed.
- **`site/`** — the landing page. Plain HTML/CSS/JS, no build step, explains what this does and lets people download it directly.

It's free to run. Bring your own Groq API key (also free), no backend, nothing to pay for.

---

#Getting Started

**Just want the extension?**
Go to [forgextension.vercel.app](https://forgextension.vercel.app/), hit **Download for Chrome**, unzip it, and skip down to "Load the extension."

**Want the code?**
```bash
git clone https://github.com/ankush12-b/forge.git
cd forge
```

**Load the extension:**
1. Open `chrome://extensions`
2. Flip on **Developer mode**
3. **Load unpacked** → pick the `extension/` folder
4. Click the toolbar icon, drop in a free key from [console.groq.com/keys](https://console.groq.com/keys), save

**Run the site locally, if you want:**
```bash
cd site && python3 -m http.server 8000
```

---

#Usage

1. Head to claude.ai, chatgpt.com, or gemini.google.com
2. Type something rough
3. Hit the ⚡ button
4. Read the rewrite, click **Use this**

Changed anything in `extension/`? Rebuild the zip the site hands out, so it doesn't go stale:
```bash
./build-extension-zip.sh
```

**Deploying the site:**
```bash
cd site && npx vercel --prod
```
Or just import the repo in Vercel's dashboard and set Root Directory to `site`.

---

## Editing via Terminal

```bash
nano site/index.html        # make your edit
git status                  # check what changed
git diff                    # see the actual diff
git add .
git commit -m "whatever you changed"
git push                    # kicks off a new Vercel deploy automatically
```

Need to force a redeploy without changing anything?
```bash
git commit --allow-empty -m "redeploy"
git push
```
#Troubleshooting

**"Manifest file is missing or unreadable"** — wrong folder selected. Pick `extension/` itself, not the outer repo.

**⚡ button won't show up** — the site changed its layout on you. Go fix the selector in `extension/sites/<platform>.js`, inside `getInputBox()`.

**Clicking ⚡ does nothing** — probably your Groq key. Check it's saved right, or you've hit the free rate limit (30 requests/min).

**404 on Vercel** — Root Directory isn't set to `site`. Fix it under Settings → Build and Deployment, then redeploy.

**`git push` says "repository not found"** — your remote's pointed at the wrong place:
```bash
git remote set-url origin https://github.com/<your-username>/forge.git
```

---

#Contributing

Fork it, branch it, PR it. If you touch `extension/`, run `./build-extension-zip.sh` before you commit so the download stays in sync.

## License

MIT — free to use, modify, and distribute.
