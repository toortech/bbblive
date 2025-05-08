// Stableford Scorecard Logic
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

document.getElementById('build').addEventListener('click', () => buildScorecard());

function buildScorecard() {
  const courseKey = document.getElementById('course-select').value;
  const { par, si } = courseData[courseKey];
  const slope = parseInt(document.getElementById('tee-select').value, 10);
  const players = getSelectedPlayers();
  if (!players.length) { alert('Select at least one player'); return; }
  const holeOpt = getSelectedHoles();

  // ...build table, inputs, and bind events similar to inline version...
  updateScorecard(par, si, slope, players, holeOpt);
}

function updateScorecard(par, siArr, slope, players, holeOpt) {
  // Logic to calculate adjusted handicaps and Stableford points per hole
  // Same as inline but refactored here
  console.log('Updating scorecard');
}
