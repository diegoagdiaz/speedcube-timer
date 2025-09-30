import React from 'react';
import { calculateStandardDeviation } from '../utils/calculations';

function Consistency({ solves }) {
  const validSolves = solves.filter(solve => solve.penalty !== 'DNF');
  const times = validSolves.map(solve => solve.penalty === '+2' ? solve.baseTime + 2 : solve.baseTime);
  const stdDev = calculateStandardDeviation(times);

  return (
    <div style={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', padding: '10px', borderRadius: '5px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h3 style={{ marginTop: 0, marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>Consistency</h3>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--white)' }}>
        {stdDev ? `${stdDev.toFixed(2)}s` : 'N/A'}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--white)', marginTop: '10px' }}>Standard Deviation</div>
    </div>
  );
}

export default Consistency;