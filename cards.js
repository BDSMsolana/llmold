(() => {
  'use strict';
  const palettes = {
    terminal: { background: '#091006', ink: '#d5efbb', accent: '#c8ff4d', panel: '#18280f', label: 'TERMINAL / LOCAL INCIDENT' },
    casefile: { background: '#e4d8af', ink: '#202812', accent: '#782b20', panel: '#cabc8f', label: 'CASE FILE / FICTIONAL EVIDENCE' },
    quarantine: { background: '#12170c', ink: '#eee4bb', accent: '#f0b649', panel: '#2b2810', label: 'QUARANTINE / DO NOT INGEST' }
  };
  const chooser = document.createElement('div');
  chooser.className = 'card-chooser';
  chooser.innerHTML = '<label for="card-style">EVIDENCE FORMAT</label><select id="card-style"><option value="terminal">01 / TERMINAL — acid green</option><option value="casefile">02 / CASE FILE — aged paper</option><option value="quarantine">03 / QUARANTINE — warning amber</option></select><p>Same incident. Three ways to deny responsibility. Downloads as a 1600 × 900 PNG.</p>';
  document.querySelector('.incident-actions').before(chooser);
  const select = document.querySelector('#card-style');
  try { const saved = localStorage.getItem('llmold.cardStyle'); if (Object.hasOwn(palettes, saved)) select.value = saved; } catch {}
  function update() {
    document.querySelector('#incident').dataset.cardStyle = select.value;
    try { localStorage.setItem('llmold.cardStyle', select.value); } catch {}
  }
  select.addEventListener('change', update); update();
  function fit(ctx, text, x, top, width, height, initialSize, family, weight = '') {
    let size = initialSize, lines;
    do {
      ctx.font = `${weight} ${size}px ${family}`.trim();
      lines = []; let line = '';
      for (const word of String(text).split(/\s+/)) {
        const candidate = line ? `${line} ${word}` : word;
        if (ctx.measureText(candidate).width <= width) { line = candidate; continue; }
        if (line) { lines.push(line); line = ''; }
        for (const character of word) {
          if (line && ctx.measureText(line + character).width > width) { lines.push(line); line = ''; }
          line += character;
        }
      }
      if (line) lines.push(line);
      if (lines.length * size * 1.18 <= height || size <= 12) break;
      size -= 2;
    } while (size >= 12);
    ctx.textBaseline = 'top';
    lines.forEach((line, index) => ctx.fillText(line, x, top + index * size * 1.18));
  }
  async function render(canvas, report, style = 'terminal') {
    const palette = palettes[style] || palettes.terminal;
    const avatar = new Image(); avatar.src = 'assets/llmold-avatar.png';
    try { await avatar.decode(); } catch { /* A text card can still be exported offline. */ }
    canvas.width = 1600; canvas.height = 900;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = palette.background; ctx.fillRect(0, 0, 1600, 900);
    ctx.fillStyle = palette.panel; ctx.fillRect(970, 40, 590, 820);
    ctx.strokeStyle = palette.accent; ctx.lineWidth = 3; ctx.strokeRect(40, 40, 1520, 820);
    if (style === 'quarantine') {
      ctx.save(); ctx.beginPath(); ctx.rect(42, 42, 1516, 24); ctx.clip();
      ctx.fillStyle = palette.accent;
      for (let x = -30; x < 1650; x += 64) { ctx.beginPath(); ctx.moveTo(x,42);ctx.lineTo(x+32,42);ctx.lineTo(x+8,66);ctx.lineTo(x-24,66);ctx.fill(); }
      ctx.restore();
    }
    ctx.fillStyle = palette.accent; fit(ctx,'LLMOLD',100,100,820,150,116,'Arial','900');
    ctx.fillStyle = palette.ink; fit(ctx,palette.label,105,250,790,65,25,'monospace');
    fit(ctx,`REPORT #${report.id}`,105,333,780,48,24,'monospace');
    ctx.fillStyle = palette.accent; fit(ctx,report.nutrient,100,404,785,158,66,'Arial','900');
    ctx.fillStyle = palette.ink; fit(ctx,report.outcome,105,600,785,145,29,'monospace');
    ctx.fillStyle = palette.accent; fit(ctx,'llmold.lol / FEED IT BAD DATA.',105,800,780,35,22,'monospace');
    if (avatar.naturalWidth) ctx.drawImage(avatar,1005,170,520,520);
    ctx.fillStyle = palette.ink; fit(ctx,'SPECIMEN M-9000\nFICTIONAL. UNHELPFUL. DAMP.'.replace('\n',' / '),1010,730,500,76,24,'monospace');
    canvas.dataset.exportStyle = style;
    canvas.dataset.exportReport = report.id;
  }
  window.LLMoldCards = Object.freeze({ render });
})();
