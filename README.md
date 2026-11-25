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

## The contact form (IMPORTANT: one-time activation)

The form sends messages to **theguardianhealth@gmail.com** using FormSubmit (https://formsubmit.co), a free service that needs no account or server.

1. After the site is live, open it and send yourself a test message through the form.
2. FormSubmit will email **theguardianhealth@gmail.com** asking you to **activate** the form. Click the activation link in that email (check Spam/Promotions too).
3. Send another test message. From now on every request arrives in the Gmail inbox, and you can reply to the sender directly.

Until the form is activated, visitors who use it are shown a link to email you directly instead, so no message is lost.

Optional: after activation, FormSubmit gives you a random alias (like `https://formsubmit.co/el/abc123`). You can replace the email address in `main.js` (`FORM_ENDPOINT`) and `index.html` (form `action`) with that alias so the address is not visible in the page source to spam bots.

## Editing content

- Text: edit `index.html` in any text editor (VS Code, Notepad). Each section starts with a comment such as `<!-- Team -->`.
- Images: replace files in `assets/` with new ones of the same name, or change the `src="assets/..."` paths.
- Colours and fonts: the variables at the top of `styles.css` (`--navy`, `--blue`, `--gold`, and so on).
