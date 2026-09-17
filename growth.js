(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const input = $('#feed-input');
  const samples = ['haunted office yogurt', 'wet pope lasagna', 'forbidden ethernet soup', 'sock divorce lawyer', 'sentient keyboard crumbs', 'microwave tax ritual', 'fermented browser history', 'emotional support fungus'];
  const randomButton = document.createElement('button');
  randomButton.type = 'button';
  randomButton.id = 'random-nutrient';
  randomButton.className = 'text-button random-nutrient';
  randomButton.textContent = 'GIVE ME BAD DATA ↯';
  input.after(randomButton);
  randomButton.addEventListener('click', () => {
    const choices = samples.filter(value => value !== input.value);
    input.value = choices[Math.floor(Math.random() * choices.length)];
    input.dispatchEvent(new Event('input'));
    input.focus();
  });

  const archive = document.createElement('section');
  archive.className = 'local-archive';
  archive.setAttribute('aria-labelledby', 'archive-title');
  archive.innerHTML = '<h3 id="archive-title">YOUR LOCAL EVIDENCE</h3><p id="archive-notice">Last 8 reports, saved only in this browser. No account. No upload.</p><div id="archive-list"></div><button type="button" class="text-button" id="clear-archive">CLEAR LOCAL EVIDENCE ×</button><p class="archive-feedback" role="status"></p>';
  $('.terminal-footnote').before(archive);
  const key = 'llmold.reportArchive.v1';
  let saved = [];
  let storageAvailable = true;
  function valid(value) {
    return value && typeof value.id === 'string' && /^\d{1,16}$/.test(value.id) && typeof value.nutrient === 'string' && value.nutrient.length <= 112 && typeof value.outcome === 'string' && value.outcome.length <= 200;
  }
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || '[]');
    saved = Array.isArray(parsed) ? parsed.filter(valid).slice(0, 8) : [];
  } catch { storageAvailable = false; }
  function persist() {
    try { localStorage.setItem(key, JSON.stringify(saved)); storageAvailable = true; }
    catch { storageAvailable = false; }
  }
  function render() {
    $('#archive-notice').textContent = storageAvailable ? 'Last 8 reports, saved only in this browser. No account. No upload.' : 'Storage unavailable. Reports last only for this open page.';
    const list = $('#archive-list');
    list.replaceChildren();
    if (!saved.length) {
      const empty = document.createElement('p');
      empty.textContent = 'No evidence. Suspicious. Feed the Mold to start.';
      list.append(empty);
    }
    for (const value of saved) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'archive-item';
      button.textContent = `#${value.id} / ${value.nutrient}`;
      button.addEventListener('click', () => document.dispatchEvent(new CustomEvent('llmold:restore', { detail: value })));
      list.append(button);
    }
    $('#clear-archive').disabled = !saved.length;
  }
  document.addEventListener('llmold:report', event => {
    if (!valid(event.detail)) return;
    saved = [{ ...event.detail }, ...saved].slice(0, 8);
    persist(); render();
  });
  $('#clear-archive').addEventListener('click', () => {
    if (!window.confirm('Clear your saved local reports? This cannot be undone.')) return;
    saved = []; persist(); render();
    $('.archive-feedback').textContent = 'Local archive cleared. The currently open report is unchanged.';
  });
  render();

  const observations = [
    ['THE USB PORTS ARE WARM.', 'LLMOLD believes every cable remembers the hands that touched it. It has started asking them questions after midnight.'],
    ['THE SOCK HAS LEGAL COUNSEL.', 'It returned with a smaller sock. The Mold has mistaken this for a hostile acquisition.'],
    ['THE CURSOR IS BREATHING.', 'The lab closed every window. The breathing continued. It is coming from the spreadsheet.'],
    ['THE ROUTER WANTS CUSTODY.', 'Nobody knows whose child the printer is. The router has requested a private conversation.'],
    ['THE MOON IS WET HARDWARE.', 'LLMOLD has classified the moon as an external drive. It is asking where the cable goes.'],
    ['THE GRAPES KNOW THE PASSWORD.', 'Seven failed login attempts. Then a successful one. The fruit bowl is empty.'],
    ['THE KEYBOARD HAS A LANDLORD.', 'The space bar is no longer included in the rent. The Mold has started writing without pauses.']
  ];
  function updateObservation() {
    const day = Math.floor(Date.now() / 86400000);
    const [headline, description] = observations[day % observations.length];
    $('.daily-content h3').textContent = headline;
    $('.daily-content > p:last-child').textContent = description;
    $('#daily-id').textContent = new Date().toISOString().slice(0, 10);
    $('.live-dot').textContent = 'FICTION';
    $('#share-daily').href = `https://x.com/intent/tweet?text=${encodeURIComponent(`${headline}\n${description}\n\nhttps://llmold.lol`)}`;
  }
  updateObservation();
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateObservation(); });
  window.setInterval(updateObservation, 60000);

  const communityLink = document.createElement('a');
  communityLink.href = 'https://t.me/LLMOLD';
  communityLink.target = '_blank';
  communityLink.rel = 'noopener noreferrer';
  communityLink.className = 'button ghost';
  communityLink.textContent = 'JOIN THE COLONY ↗';
  $('.hero-actions').append(communityLink);
})();
