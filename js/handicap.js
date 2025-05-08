// Handicap Calculator Logic
export function calculateCourseHandicap(grossScore, courseRating, slopeRating) {
  // USGA formula: (Gross - Rating) * 113 / Slope
  return Math.round((grossScore - courseRating) * 113 / slopeRating);
}

// Bind UI
document.getElementById('calcBtn').addEventListener('click', () => {
  const gross = parseFloat(document.getElementById('gross').value);
  const rating = parseFloat(document.getElementById('rating').value);
  const slope = parseFloat(document.getElementById('slope').value);
  if (isNaN(gross) || isNaN(rating) || isNaN(slope)) {
    alert('Please enter valid numbers for all fields.');
    return;
  }
  const hcp = calculateCourseHandicap(gross, rating, slope);
  document.getElementById('result').textContent = `Your Course Handicap: ${hcp}`;
});
