(() => {
  const form = document.querySelector('#feed-form');
  const input = document.querySelector('#feed-input');
  const count = document.querySelector('#nutrient-count');
  const reading = document.querySelector('#reading');
  const incident = document.querySelector('#incident');
  const incidentId = document.querySelector('#incident-id');
  const title = document.querySelector('#incident-title');
  const body = document.querySelector('#incident-body');
  const copyButton = document.querySelector('#copy-incident');
  const shareButton = document.querySelector('#share-incident');
  const downloadButton = document.querySelector('#download-incident');
  const canvas = document.querySelector('#incident-canvas');
  const dailyId = document.querySelector('#daily-id');
  const mutationButtons = document.querySelectorAll('[data-mutation]');
  const mutationCopy = document.querySelector('#mutation-copy');
  const mutationPost = document.querySelector('#mutation-post');
  const outcomes = ['HAS BEEN CLASSIFIED AS A VEGETABLE BY THE MOLD.','HAS CAUSED THE MODEL TO REMEMBER A FOURTH TUESDAY.','IS NOW LEGALLY RESPONSIBLE FOR THE SMELL IN THE SERVER ROOM.','HAS BEEN TRANSLATED INTO A SMALLER, WETTER VERSION OF ITSELF.','WAS REJECTED FOR BEING TOO HUMAN.','HAS BEEN APPOINTED ACTING MINISTER OF CABLES.','IS BEEPING IN A LANGUAGE WITH NO SPEAKERS.','HAS ENTERED THE MOLD AS A THOUGHT. IT WILL NOT LEAVE.'];
  let report = null;

  const storage = { get(key) { try { return localStorage.getItem(key); } catch { return null; } }, set(key, value) { try { localStorage.setItem(key, value); } catch { /* Feeder works without storage. */ } } };
  let localCounter = Number.parseInt(storage.get('llmold.localIncidents'), 10);
  if (!Number.isSafeInteger(localCounter) || localCounter < 0) localCounter = 0;
  function localNumber() { localCounter += 1; storage.set('llmold.localIncidents', String(localCounter)); return String(localCounter).padStart(4, '0'); }
  function setDailyId() { const start = Date.UTC(2026, 8, 17); const now = new Date(); const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()); dailyId.textContent = String(Math.max(1, Math.floor((today - start) / 86400000) + 1)).padStart(3, '0'); }
  function updateCount() { count.textContent = `${input.value.length} / 56`; }
  function reportText() { return `LLMOLD / LOCAL INCIDENT #${report.id}\nNUTRIENT: ${report.nutrient}\nRESULT: ${report.outcome}\n\nTHE LARGE LANGUAGE MOLD\nhttps://llmold.lol`; }
  function displayReport(value) { report = { ...value }; incidentId.textContent = report.id; title.textContent = report.nutrient; body.textContent = report.outcome; shareButton.href = `https://x.com/intent/tweet?text=${encodeURIComponent(reportText())}`; incident.hidden = false; }
  function createReport(nutrient) { const id = localNumber(); const outcome = outcomes[Math.floor(Math.random() * outcomes.length)]; displayReport({ id, nutrient: nutrient.toUpperCase(), outcome }); document.dispatchEvent(new CustomEvent('llmold:report', { detail: { ...report } })); }
  document.addEventListener('llmold:restore', event => { if (form.querySelector('[type="submit"]').disabled) return; const value = event.detail; if (value && /^\d{1,16}$/.test(value.id) && typeof value.nutrient === 'string' && value.nutrient.length <= 112 && outcomes.includes(value.outcome)) displayReport(value); });

  form.addEventListener('submit', event => { event.preventDefault(); const submit = form.querySelector('[type="submit"]'); const nutrient = input.value.trim().slice(0, 56); if (!nutrient || submit.disabled) return; incident.hidden = true; reading.hidden = false; submit.disabled = true; window.setTimeout(() => { reading.hidden = true; submit.disabled = false; createReport(nutrient); input.value = ''; updateCount(); incident.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' }); }, 680); });
  input.addEventListener('input', updateCount);
  copyButton.addEventListener('click', async () => { if (!report) return; try { await navigator.clipboard.writeText(reportText()); copyButton.textContent = 'REPORT COPIED. IT KNOWS.'; } catch { window.prompt('Copy your report:', reportText()); } window.setTimeout(() => { copyButton.textContent = 'COPY REPORT ↗'; }, 2200); });

  function wrapped(context, text, x, y, width, lineHeight) {
    const original = context.font;
    let size = Number(original.match(/(\d+)px/)[1]);
    function split() { const lines = []; let line = ''; for (const character of text) { if (line && context.measureText(line + character).width > width) { lines.push(line); line = ''; } line += character; } if (line) lines.push(line); return lines; }
    let lines = split();
    while (lines.length * size * 1.15 > 125 && size > 16) { size -= 2; context.font = original.replace(/\d+px/, `${size}px`); lines = split(); }
    lines.forEach((line, index) => context.fillText(line, x, y + index * Math.min(lineHeight, size * 1.15)));
    context.font = original;
  }
  async function drawCard() { const context = canvas.getContext('2d'); context.fillStyle = '#0a0f06'; context.fillRect(0, 0, canvas.width, canvas.height); const gradient = context.createRadialGradient(1260, 420, 30, 1250, 430, 750); gradient.addColorStop(0, 'rgba(200,255,77,.28)'); gradient.addColorStop(1, 'rgba(10,15,6,0)'); context.fillStyle = gradient; context.fillRect(0, 0, canvas.width, canvas.height); context.strokeStyle = '#637620'; context.lineWidth = 3; context.strokeRect(38, 38, 1524, 824); const image = new Image(); image.src = 'assets/llmold-avatar.png'; await image.decode(); context.save(); context.beginPath(); context.arc(1260, 445, 330, 0, Math.PI * 2); context.clip(); context.drawImage(image, 930, 115, 660, 660); context.restore(); context.fillStyle = '#c8ff4d'; context.font = '900 118px Arial'; context.fillText('LLMOLD', 110, 195); context.fillStyle = '#efe2b7'; context.font = '32px Courier New'; context.fillText('THE LARGE LANGUAGE MOLD', 115, 252); context.fillStyle = '#e7efbd'; context.font = '24px Courier New'; context.fillText(`LOCAL INCIDENT / ${report.id}`, 115, 370); context.fillStyle = '#c8ff4d'; context.font = '900 68px Arial'; wrapped(context, report.nutrient, 110, 460, 770, 75); context.strokeStyle = '#52621b'; context.lineWidth = 2; context.beginPath(); context.moveTo(110, 600); context.lineTo(875, 600); context.stroke(); context.fillStyle = '#d0d3ad'; context.font = '30px Courier New'; wrapped(context, report.outcome, 110, 660, 760, 42); context.fillStyle = '#83934b'; context.font = '21px Courier New'; context.fillText('IT LEARNED ENGLISH FROM A WET KEYBOARD  /  llmold.lol', 110, 812); }
  downloadButton.addEventListener('click', async () => {
    if (!report || downloadButton.disabled) return;
    const snapshot = { ...report };
    const style = document.querySelector('#card-style').value;
    downloadButton.disabled = true;
    downloadButton.textContent = 'GROWING CARD…';
    try {
      await window.LLMoldCards.render(canvas, snapshot, style);
      const link = document.createElement('a');
      link.download = `llmold-${style}-${snapshot.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      downloadButton.textContent = 'CARD DOWNLOADED ↓';
    } catch { downloadButton.textContent = 'CARD FAILED. TRY AGAIN.'; }
    finally { downloadButton.disabled = false; }
    window.setTimeout(() => { downloadButton.textContent = 'DOWNLOAD CARD ↓'; }, 2400);
  });

  mutationButtons.forEach(button => { button.setAttribute('aria-pressed', 'false'); button.addEventListener('click', () => { const mutation = button.dataset.mutation; mutationButtons.forEach(option => { option.classList.toggle('selected', option === button); option.setAttribute('aria-pressed', String(option === button)); }); storage.set('llmold.mutationPick', mutation); mutationCopy.textContent = `LOCAL PICK: ${mutation}. SHARE IT WITH THE COLONY. THIS IS NOT A SERVER-SIDE VOTE.`; mutationPost.href = `https://x.com/intent/tweet?text=${encodeURIComponent(`LLMOLD SHOULD NOTICE NEXT: ${mutation}.\n\nhttps://llmold.lol`)}`; mutationPost.textContent = 'POST YOUR MUTATION ↗'; }); });
  const savedMutation = storage.get('llmold.mutationPick'); if (savedMutation) { const selected = [...mutationButtons].find(button => button.dataset.mutation === savedMutation); if (selected) selected.click(); }
  setDailyId(); updateCount();
})();
