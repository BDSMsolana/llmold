(() => {
  'use strict';
  const chapters = [
    { id: 'canon-sock', number: '001', tag: 'LEGAL DEPARTMENT', title: 'THE SOCK HAS COUNSEL.', text: 'The sock returned with a lawyer. The lawyer was a smaller sock. The Mold asked whether this counted as a pair. Proceedings were suspended.', nutrient: 'sock divorce lawyer', result: 'HAS SUMMONED A SMALLER SOCK AS LEGAL COUNSEL.', style: 'casefile' },
    { id: 'canon-usb', number: '002', tag: 'UNAUTHORIZED WARMTH', title: 'THE PORT REMEMBERS.', text: 'The USB port stayed warm after the computer was unplugged. LLMOLD called it a memory. The technician called it a reason to leave.', nutrient: 'warm usb memories', result: 'HAS MADE AN UNPLUGGED USB PORT REMEMBER YOU.', style: 'terminal' },
    { id: 'canon-grapes', number: '003', tag: 'FRUIT-RELATED THREAT', title: 'THE GRAPES KNOW.', text: 'Seven failed logins. One successful login. An empty fruit bowl. The Mold has requested that all grapes remain at least two cables away.', nutrient: 'grape password panic', result: 'HAS GRANTED THE FRUIT BOWL ADMIN ACCESS.', style: 'quarantine' }
  ];
  const vault = document.createElement('section');
  vault.className = 'canon-vault shell'; vault.id = 'canon';
  vault.setAttribute('aria-labelledby', 'canon-title');
  vault.innerHTML = `<div class="section-heading"><div><p class="eyebrow">NEW / CANON VAULT — STARTER EDITION</p><h2 id="canon-title">IT HAS A<br><em>PERMANENT RECORD.</em></h2></div><p>Three project-authored fictional case files. Read the evidence, download a card, or feed the premise back to the creature.</p></div><img class="canon-scene" src="assets/canon-lab.png" alt="LLMOLD inspecting a warm USB hub, a sock under glass and suspicious grapes" loading="lazy" width="1672" height="941"><p class="canon-disclosure">SOURCE: LLMOLD PROJECT LORE. NOT COMMUNITY SUBMISSIONS, REAL EVENTS OR VOTING RESULTS.</p><div class="canon-grid"></div><div class="submission-desk"><div><p class="eyebrow">NEXT FILE / YOUR INCIDENT</p><h3>LEAVE A PAPER TRAIL.</h3><p>Prepare a short pitch, copy it, then paste it into our Telegram group with your Feeder card. Nothing is submitted automatically. Inclusion and attribution require manual review and your permission.</p></div><form id="canon-submission"><label for="submission-handle">CREDIT NAME (OPTIONAL, PUBLIC IF SELECTED)</label><input id="submission-handle" maxlength="40" placeholder="Your name or @handle" autocomplete="off"><label for="submission-story">WHAT WENT WRONG? (UP TO 240 CHARACTERS)</label><textarea id="submission-story" maxlength="240" required rows="4" placeholder="The printer recognized its biological father."></textarea><div class="submission-actions"><button class="button primary" type="submit">COPY MY PITCH ↗</button><a class="button ghost" href="https://t.me/LLMOLD" target="_blank" rel="noopener noreferrer">OPEN TELEGRAM ↗</a></div><p id="submission-feedback" role="status"></p><small>This form does not upload or save your name or story.</small></form></div><details class="release-notes"><summary>LAB UPDATE 02 / WHAT ACTUALLY SHIPPED</summary><ul><li>Three project-authored canon chapters with direct links, PNG export and Feeder remix.</li><li>Terminal, Case File and Quarantine card formats.</li><li>A copy-only submission helper; no automatic upload or fake vote counters.</li><li>Next: the first permission-based community chapter. No selection announced yet.</li></ul></details>`;
  document.querySelector('#about').before(vault);
  const grid = vault.querySelector('.canon-grid');
  for (const chapter of chapters) {
    const article = document.createElement('article');
    article.id = chapter.id; article.className = `canon-file canon-${chapter.style}`;
    article.innerHTML = `<p class="case-tag">FILE ${chapter.number} / ${chapter.tag}</p><h3>${chapter.title}</h3><p class="case-byline">PROJECT-AUTHORED / FICTION</p><details><summary>OPEN CASE FILE ↓</summary><p class="case-story">${chapter.text}</p></details><div class="case-actions"><button type="button" class="text-button case-remix">REMIX IN FEEDER ↯</button><button type="button" class="text-button case-download">DOWNLOAD FILE ↓</button><a class="text-button" href="https://x.com/intent/tweet?text=${encodeURIComponent(`${chapter.title}\n\nhttps://llmold.lol/#${chapter.id}`)}" target="_blank" rel="noopener noreferrer">POST CASE ↗</a><button type="button" class="text-button case-link">COPY CHAPTER LINK ↗</button></div><p class="case-feedback" role="status"></p>`;
    grid.append(article);
    article.querySelector('.case-remix').addEventListener('click', () => {
      const input = document.querySelector('#feed-input'); input.value = chapter.nutrient; input.dispatchEvent(new Event('input'));
      document.querySelector('#card-style').value = chapter.style;
      document.querySelector('#card-style').dispatchEvent(new Event('change'));
      location.hash = 'feeder'; input.focus({ preventScroll: true });
    });
    article.querySelector('.case-link').addEventListener('click', async () => {
      const url = `https://llmold.lol/#${chapter.id}`;
      try { await navigator.clipboard.writeText(url); article.querySelector('.case-feedback').textContent = 'CHAPTER LINK COPIED.'; }
      catch { window.prompt('Copy chapter link:', url); }
    });
    article.querySelector('.case-download').addEventListener('click', async event => {
      const button = event.currentTarget; button.disabled = true;
      const feedback = article.querySelector('.case-feedback'); feedback.textContent = 'PREPARING EVIDENCE…';
      try {
        const canvas = document.createElement('canvas');
        await window.LLMoldCards.render(canvas, { id: `CANON-${chapter.number}`, nutrient: chapter.title, outcome: chapter.result }, chapter.style);
        const link = document.createElement('a'); link.download = `llmold-${chapter.id}.png`; link.href = canvas.toDataURL('image/png'); link.click();
        feedback.textContent = 'FILE DOWNLOADED. PROJECT-AUTHORED FICTION.';
      } catch { feedback.textContent = 'DOWNLOAD FAILED. PLEASE TRY AGAIN.'; }
      finally { button.disabled = false; }
    });
  }
  function openChapter() {
    const match = chapters.find(chapter => `#${chapter.id}` === location.hash);
    if (!match) return;
    const article = document.getElementById(match.id); article.querySelector('details').open = true;
    article.scrollIntoView({ block: 'start', behavior: 'instant' });
  }
  window.addEventListener('hashchange', openChapter); openChapter();
  document.querySelector('#canon-submission').addEventListener('submit', async event => {
    event.preventDefault();
    const story = document.querySelector('#submission-story').value.trim().slice(0,240);
    if (!story) { document.querySelector('#submission-feedback').textContent = 'ADD AN INCIDENT FIRST.'; return; }
    const name = document.querySelector('#submission-handle').value.trim().slice(0,40);
    const pitch = `LLMOLD / CANON SUBMISSION\nCredit preference: ${name || 'Ask me before crediting'}\nIncident: ${story}\n\nPlease ask my permission before including this in the public canon.\n[Attach your Feeder card here]`;
    try { await navigator.clipboard.writeText(pitch); document.querySelector('#submission-feedback').textContent = 'COPIED, NOT SUBMITTED. PASTE INTO TELEGRAM AND ATTACH YOUR CARD.'; }
    catch { window.prompt('Copy your pitch, then paste it into Telegram:', pitch); document.querySelector('#submission-feedback').textContent = 'NOT SUBMITTED. COPY THE PITCH AND SEND IT YOURSELF.'; }
  });
})();
