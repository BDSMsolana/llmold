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
- `assets/llmold-scene-banner.png` — original wide project banner.
- `assets/llmold-x-card-v3.jpg` — 1200×600 social preview; legacy preview PNG URLs serve the same composition.
- `growth.js`, `growth.css` — random nutrients, last-eight local report archive, rotating fictional observations, community links and staged development plan.
- `POST-LAUNCH-CAMPAIGN.md` — nine ready-to-edit English posts, Russian publication instructions and measurable community goals.
- `assets/social-profile.txt` — copy-ready X profile, first posts and post-launch template.
- `CONCEPT.md` — lore, community ritual, content system and safety boundary.

## Before public launch

1. Deploy the static folder and verify it over HTTPS.
2. Create the official X account and check the final handle.
3. Use the exact avatar/banner files in `assets`.
4. Do not state that `$LLMOLD` exists until it actually does.
5. If a token is issued, add its verified address and official link only after the owner signs the creation transaction.

## Deploy

Run `./build.ps1` to stage the allowlisted public files in `.cf-deploy`, then:

```powershell
npx --yes wrangler deploy --domain llmold.lol --domain www.llmold.lol
```

Always include both domains. Do not publish this entire project folder as static assets. Campaign notes and repository metadata are not website assets.

## Data and behavior

Lab update 02: `cards.js` provides three PNG formats. `lab.js` and `lab.css` provide the Canon Vault, chapter links and copy-only submission helper. Starter chapters are project-authored fiction, not community votes or submissions. The pitch helper does not persist or upload the entered credit name/story. See the on-site release notes for shipped versus planned features.

The Feeder uses authored random outcomes, not a remote AI model. Reports and mutation picks stay in this browser. The archive retains at most eight reports; clearing browser data removes them. If browser storage is blocked, the feeder still works for the current page session. Observation text rotates through seven fictional entries by UTC day. There is no live vote tally or global user counter. Public source code is not a token audit.
