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

  function localNumber() { const key = 'llmold.localIncidents'; const next = Number.parseInt(localStorage.getItem(key) || '0', 10) + 1; localStorage.setItem(key, String(next)); return String(next).padStart(4, '0'); }
  function setDailyId() { const start = Date.UTC(2026, 8, 17); const now = new Date(); const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()); dailyId.textContent = String(Math.max(1, Math.floor((today - start) / 86400000) + 1)).padStart(3, '0'); }
  function updateCount() { count.textContent = `${input.value.length} / 56`; }
  function reportText() { return `LLMOLD / LOCAL INCIDENT #${report.id}\nNUTRIENT: ${report.nutrient}\nRESULT: ${report.outcome}\n\nTHE LARGE LANGUAGE MOLD\nhttps://llmold.lol`; }
  function createReport(nutrient) { const id = localNumber(); const outcome = outcomes[Math.floor(Math.random() * outcomes.length)]; report = { id, nutrient: nutrient.toUpperCase(), outcome }; incidentId.textContent = id; title.textContent = report.nutrient; body.textContent = outcome; shareButton.href = `https://x.com/intent/tweet?text=${encodeURIComponent(reportText())}`; incident.hidden = false; }

  form.addEventListener('submit', event => { event.preventDefault(); const nutrient = input.value.trim(); if (!nutrient) return; incident.hidden = true; reading.hidden = false; form.querySelector('button').disabled = true; window.setTimeout(() => { reading.hidden = true; form.querySelector('button').disabled = false; createReport(nutrient); input.value = ''; updateCount(); incident.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 680); });
  input.addEventListener('input', updateCount);
  copyButton.addEventListener('click', async () => { if (!report) return; try { await navigator.clipboard.writeText(reportText()); copyButton.textContent = 'REPORT COPIED. IT KNOWS.'; } catch { window.prompt('Copy your report:', reportText()); } window.setTimeout(() => { copyButton.textContent = 'COPY REPORT ↗'; }, 2200); });

  function wrapped(context, text, x, y, width, lineHeight) { const words = text.split(' '); let line = ''; for (const word of words) { const next = line ? `${line} ${word}` : word; if (context.measureText(next).width > width && line) { context.fillText(line, x, y); line = word; y += lineHeight; } else line = next; } context.fillText(line, x, y); }
  async function drawCard() { const context = canvas.getContext('2d'); context.fillStyle = '#0a0f06'; context.fillRect(0, 0, canvas.width, canvas.height); const gradient = context.createRadialGradient(1260, 420, 30, 1250, 430, 750); gradient.addColorStop(0, 'rgba(200,255,77,.28)'); gradient.addColorStop(1, 'rgba(10,15,6,0)'); context.fillStyle = gradient; context.fillRect(0, 0, canvas.width, canvas.height); context.strokeStyle = '#637620'; context.lineWidth = 3; context.strokeRect(38, 38, 1524, 824); const image = new Image(); image.src = 'assets/llmold-avatar.png'; await image.decode(); context.save(); context.beginPath(); context.arc(1260, 445, 330, 0, Math.PI * 2); context.clip(); context.drawImage(image, 930, 115, 660, 660); context.restore(); context.fillStyle = '#c8ff4d'; context.font = '900 118px Arial'; context.fillText('LLMOLD', 110, 195); context.fillStyle = '#efe2b7'; context.font = '32px Courier New'; context.fillText('THE LARGE LANGUAGE MOLD', 115, 252); context.fillStyle = '#e7efbd'; context.font = '24px Courier New'; context.fillText(`LOCAL INCIDENT / ${report.id}`, 115, 370); context.fillStyle = '#c8ff4d'; context.font = '900 68px Arial'; wrapped(context, report.nutrient, 110, 460, 770, 75); context.strokeStyle = '#52621b'; context.lineWidth = 2; context.beginPath(); context.moveTo(110, 600); context.lineTo(875, 600); context.stroke(); context.fillStyle = '#d0d3ad'; context.font = '30px Courier New'; wrapped(context, report.outcome, 110, 660, 760, 42); context.fillStyle = '#83934b'; context.font = '21px Courier New'; context.fillText('IT LEARNED ENGLISH FROM A WET KEYBOARD  /  llmold.lol', 110, 812); }
  downloadButton.addEventListener('click', async () => { if (!report) return; downloadButton.textContent = 'GROWING CARD…'; try { await drawCard(); const link = document.createElement('a'); link.download = `llmold-incident-${report.id}.png`; link.href = canvas.toDataURL('image/png'); link.click(); downloadButton.textContent = 'CARD DOWNLOADED ↓'; } catch { downloadButton.textContent = 'CARD FAILED TO MOLT.'; } window.setTimeout(() => { downloadButton.textContent = 'DOWNLOAD CARD ↓'; }, 2400); });

  mutationButtons.forEach(button => button.addEventListener('click', () => { const mutation = button.dataset.mutation; mutationButtons.forEach(option => option.classList.toggle('selected', option === button)); localStorage.setItem('llmold.mutationPick', mutation); mutationCopy.textContent = `PICK RECORDED: ${mutation}. POST IT SO THE LAB CAN PRETEND TO COUNT.`; mutationPost.href = `https://x.com/intent/tweet?text=${encodeURIComponent(`LLMOLD SHOULD NOTICE NEXT: ${mutation}.\n\nTHE LAB IS PRETENDING TO COUNT.\nhttps://llmold.lol`)}`; mutationPost.textContent = 'POST YOUR MUTATION ↗'; }));
  const savedMutation = localStorage.getItem('llmold.mutationPick'); if (savedMutation) { const selected = [...mutationButtons].find(button => button.dataset.mutation === savedMutation); if (selected) selected.click(); }
  setDailyId(); updateCount();
})();
