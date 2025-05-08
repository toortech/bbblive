```js
import courseData from '../assets/data/courses.json' assert { type: 'json' };

function getSelectedPlayers() {
  return [...document.querySelectorAll('.controls input[type=checkbox]')]
    .filter(cb => cb.checked)
    .map(cb => cb.value)
    .slice(0,4);
}

function getSelectedHoles() {
  return document.querySelector('input[name="holes"]:checked').value;
}

document.getElementById('build').addEventListener('click', buildScorecard);

function buildScorecard() {
  const courseKey = document.getElementById('course-select').value;
  const { par, si } = courseData[courseKey];
  const slope = parseInt(document.getElementById('tee-select').value, 10);
  const players = getSelectedPlayers();
  if (!players.length) { alert('Select at least one player'); return; }
  const holeOpt = getSelectedHoles();
  let indices = [...Array(18).keys()];
  if (holeOpt === '9f') indices = indices.slice(0,9);
  if (holeOpt === '9b') indices = indices.slice(9);

  document.getElementById('created-time').textContent = `Scorecard created: ${new Date().toLocaleString()}`;
  const container = document.getElementById('table-container');
  container.innerHTML = '';

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  let hdr1 = '<tr><th>Hole</th><th>Par</th><th>SI</th>';
  players.forEach((p,i) => {
    hdr1 += `<th colspan="2">${p}<br>HCP:<input id=\"hcp-${i}\" type=\"number\" value=\"0\" min=\"0\"> Adj:<span id=\"adjhcp-${i}\">0</span></th>`;
  });
  hdr1 += '</tr>';
  let hdr2 = '<tr><th></th><th></th><th></th>';
  players.forEach(() => hdr2 += '<th>Score</th><th>Pts</th>');
  hdr2 += '</tr>';
  thead.innerHTML = hdr1 + hdr2;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  indices.forEach(i => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i+1}</td><td>${par[i]}</td><td>${si[i]}</td>`;
    players.forEach((_,pi) => {
      tr.innerHTML += `<td><input data-player=\"${pi}\" data-hole=\"${i}\" type=\"number\" min=\"0\"></td><td class=\"pts-${pi}\"></td>`;
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  const tfoot = document.createElement('tfoot');
  ['Front 9','Back 9','Overall'].forEach((lbl,ri) => {
    let row = `<tr><td colspan="3">${lbl} Total</td>`;
    players.forEach((_,pi) => { row += `<td id=\"str-${ri}-${pi}\"></td><td id=\"pts-${ri}-${pi}\"></td>`; });
    row += '</tr>';
    tfoot.innerHTML += row;
  });
  table.appendChild(tfoot);

  container.appendChild(table);

  // Bind events
  players.forEach((_,i) => {
    document.getElementById(`hcp-${i}`).addEventListener('input', () => updateScorecard(par, si, slope, players, indices));
  });
  tbody.querySelectorAll('input[type=number]').forEach(inp => inp.addEventListener('input', () => updateScorecard(par, si, slope, players, indices)));

  updateScorecard(par, si, slope, players, indices);
}

function updateScorecard(par, siArr, slope, players, indices) {
  const totals = players.map(() => ({ fS:0, fP:0, bS:0, bP:0, oS:0, oP:0 }));
  table = document.querySelector('table');
  table.querySelectorAll('tbody tr').forEach((tr,idx) => {
    const h = indices[idx];
    const pr = par[h], front = idx < 9;
    players.forEach((_,pi) => {
      const inp = tr.querySelector(`input[data-player=\"${pi}\"][data-hole=\"${h}\"]`);
      const sc = parseInt(inp.value,10) || 0;
      const ptsCell = tr.querySelector(`.pts-${pi}`);
      if (!sc) { ptsCell.textContent=''; return; }
      const raw = parseInt(document.getElementById(`hcp-${pi}`).value,10) || 0;
      const adj = Math.round(raw * slope / 113);
      document.getElementById(`adjhcp-${pi}`).textContent = adj;
      const net = sc - adj;
      let pts = 0;
      if (net <= pr - 2) pts = 4;
      else if (net === pr - 1) pts = 3;
      else if (net === pr) pts = 2;
      else if (net === pr + 1) pts = 1;
      ptsCell.textContent = pts;
      totals[pi].oS += sc;
      front ? totals[pi].fS += sc : totals[pi].bS += sc;
      totals[pi].oP += pts;
      front ? totals[pi].fP += pts : totals[pi].bP += pts;
    });
  });
  totals.forEach((t,pi) => {
    [0,1,2].forEach(r => {
      document.getElementById(`str-${r}-${pi}`).textContent = r===0 ? t.fS : r===1 ? t.bS : t.oS;
      document.getElementById(`pts-${r}-${pi}`).textContent = r===0 ? t.fP : r===1 ? t.bP : t.oP;
    });
  });
}
```

With this complete implementation in **js/scorecard.js**, the Build Scorecard button will correctly render and calculate your Stableford table. Copy this into your `js/scorecard.js` file and let me know if it works!js
import courseData from '../assets/data/courses.json' assert { type: 'json' };

function getSelectedPlayers() {
  return [...document.querySelectorAll('.controls input[type=checkbox]')]
    .filter(cb => cb.checked)
    .map(cb => cb.value)
    .slice(0,4);
}
function getSelectedHoles() {
  return document.querySelector('input[name=holes]:checked').value;
}

document.getElementById('build').addEventListener('click', buildScorecard);

function buildScorecard() {
  const courseKey = document.getElementById('course-select').value;
  const { par, si } = courseData[courseKey];
  const slope = parseInt(document.getElementById('tee-select').value,10);
  const players = getSelectedPlayers();
  if (!players.length) { alert('Select at least one player'); return; }
  const holeOpt = getSelectedHoles();

  // Clear and build table
  const container = document.getElementById('table-container');
  container.innerHTML = '';
  // ... (table construction and event binding as before)
  updateScorecard(par, si, slope, players, holeOpt);
}

function updateScorecard(par, siArr, slope, players, holeOpt) {
  // Full update logic
}
``` 
