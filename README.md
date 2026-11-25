# JELOS HEALTH LTD: company website

A static website (HTML, CSS and a little JavaScript) for JELOS HEALTH LTD (research team: The Health Guardian).
It has no build step, so Vercel can host it for free as it is.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole site (About, Problem, AM Detector, Research, Team, Contact) |
| `styles.css` | The design (colours, fonts, layout) |
| `main.js` | Mobile menu and the contact form |
| `thank-you.html` | Shown after a message is sent if the visitor's browser has JavaScript turned off |
| `404.html` | "Page not found" page |
| `vercel.json` | Vercel settings (clean URLs, caching, security headers) |
| `preview.bat` | Double-click to preview the site locally (not uploaded to Vercel) |
| `.vercelignore` | Keeps README and preview.bat off the live site |
| `assets/` | Images and logo |

## Preview it on your computer

Double-click **`preview.bat`** in this folder. It starts a small local web server and opens
http://localhost:8000 in your browser. Close the black window to stop the preview.

(Or, from a terminal inside this folder, run `python -m http.server 8000` and open http://localhost:8000.)

Open the preview through http://localhost:8000 rather than double-clicking `index.html`, so the
page behaves exactly as it will on Vercel.

**Video size:** `assets/video/am-detector.mp4` is about 24 MB. GitHub's website accepts files up to 25 MB
per upload, so upload it on its own if the drag-and-drop of the whole folder fails.

## Put it online with Vercel (free)

**Option A: GitHub (recommended, so you can update it easily)**
1. Create a free account at https://github.com and make a new repository, for example `health-guardian-website`.
2. Upload the *contents* of this `Company_Website` folder to it (use "Add file > Upload files" and drag everything in, including the `assets` folder).
3. Go to https://vercel.com, sign in with GitHub, and click **Add New > Project**.
4. Pick the repository. For **Framework Preset** choose **Other**. Leave the build settings empty. Click **Deploy**.
5. Your site will be live at an address like `health-guardian-website.vercel.app`. Every time you upload a change to GitHub, Vercel updates the site automatically.

**Option B: Vercel CLI** (needs Node.js installed): run `npx vercel` inside this folder and follow the prompts.

To use your own domain later (for example `thehealthguardian.ng`), add it in Vercel under **Project > Settings > Domains**.

## The contact form

The form sends messages to **theguardianhealth@gmail.com** using Web3Forms (https://web3forms.com), a free service (250 messages a month) that needs no server.

- The access key is set in `main.js` (`WEB3FORMS_KEY`). It is meant to be public, so it is safe in the page source.
- The key belongs to the address it was created with, so every message goes to that inbox. To change the receiving address, create a new key at web3forms.com and replace it in `main.js`.
- If Web3Forms does not respond within 15 seconds, the visitor is shown a link to email you directly, so no request is lost.
- Each message includes the visitor's email address, so you can reply to them directly from Gmail.

## Editing content

- Text: edit `index.html` in any text editor (VS Code, Notepad). Each section starts with a comment such as `<!-- Team -->`.
- Images: replace files in `assets/` with new ones of the same name, or change the `src="assets/..."` paths.
- Colours and fonts: the variables at the top of `styles.css` (`--navy`, `--blue`, `--gold`, and so on).
