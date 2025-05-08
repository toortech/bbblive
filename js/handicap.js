// Handicap Calculator Logic
export function calculateCourseHandicap(grossScore, courseRating, slopeRating) {
  return Math.round((grossScore - courseRating) * 113 / slopeRating);
}

document.getElementById('calcBtn').addEventListener('click', () => {
  const gross = parseFloat(document.getElementById('gross').value);
  const rating = parseFloat(document.getElementById('rating').value);
  const slope = parseFloat(document.getElementById('slope').value);
  if (isNaN(gross) || isNaN(rating) || isNaN(slope)) {
    alert('Please enter valid numbers.');
    return;
  }
  const hcp = calculateCourseHandicap(gross, rating, slope);
  document.getElementById('result').textContent = `Your Course Handicap: ${hcp}`;
});
