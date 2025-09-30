function calculateMeanOf3(times) {
  if (times.length < 3) return null;
  const last3 = times.slice(-3);
  return last3.reduce((a, b) => a + b, 0) / 3;
}

function calculateAverageOf5(times) {
  if (times.length < 5) return null;
  const last5 = times.slice(-5);
  const sorted = [...last5].sort((a, b) => a - b);
  const trimmed = sorted.slice(1, 4); // remove best and worst
  return trimmed.reduce((a, b) => a + b, 0) / 3;
}

function getBestTime(times) {
  return times.length > 0 ? Math.min(...times) : null;
}

function getWorstTime(times) {
  return times.length > 0 ? Math.max(...times) : null;
}

function getSessionAverage(times) {
  return times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : null;
}

function generateScramble() {
  const faces = ['R', 'L', 'U', 'D', 'F', 'B'];
  const modifiers = ['', "'", '2'];
  let scramble = [];
  let lastFace = '';

  for (let i = 0; i < 21; i++) {
    let face;
    do {
      face = faces[Math.floor(Math.random() * faces.length)];
    } while (face === lastFace);
    lastFace = face;

    const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    scramble.push(face + modifier);
  }

  return scramble.join(' ');
}

export { calculateMeanOf3, calculateAverageOf5, getBestTime, getWorstTime, getSessionAverage, generateScramble };