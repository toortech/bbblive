// Handicap calculator logic
function calculateHandicap(gross, rating, slope) {
  return Math.round((gross - rating) * 113 / slope);
}
