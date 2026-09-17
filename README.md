# LLMOLD launch folder

This is a self-contained static project for `llmold.lol`. It has no packages, API keys, wallets, tracking or external scripts.

## Open locally

Open `index.html` directly, or from this directory run:

```powershell
python -m http.server 4179 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4179`.

On Windows, `START.cmd` launches the same local preview server.

## Contents

- `index.html`, `styles.css`, `app.js` — responsive launch site, local Mold Feeder and downloadable incident cards.
- `assets/llmold-avatar.png` — opaque square avatar / coin image.
- `assets/llmold-banner.png` — wide header for X and Pump.fun.
- `assets/social-profile.txt` — copy-ready X profile, first posts and post-launch template.
- `CONCEPT.md` — lore, community ritual, content system and safety boundary.

## Before public launch

1. Deploy the static folder and verify it over HTTPS.
2. Create the official X account and check the final handle.
3. Use the exact avatar/banner files in `assets`.
4. Do not state that `$LLMOLD` exists until it actually does.
5. If a token is issued, add its verified address and official link only after the owner signs the creation transaction.
