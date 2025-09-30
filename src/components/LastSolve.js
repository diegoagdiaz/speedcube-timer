import React from 'react';

function LastSolve({ solves }) {
  const lastSolve = solves[solves.length - 1];
  let displayTime = 'N/A';
  if (lastSolve) {
    if (lastSolve.penalty === 'DNF') {
      displayTime = 'DNF';
    } else {
      const time = lastSolve.penalty === '+2' ? lastSolve.baseTime + 2 : lastSolve.baseTime;
      displayTime = `${time.toFixed(2)}s`;
    }
  }

  return (
    <div style={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', padding: '10px', borderRadius: '5px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h3 style={{ marginTop: 0, marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>Last Solve</h3>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--white)' }}>{displayTime}</div>
    </div>
  );
}

export default LastSolve;