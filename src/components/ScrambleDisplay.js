import React from 'react';

function ScrambleDisplay({ scramble }) {
  return (
    <div style={{ fontSize: '16px', color: 'var(--white)', marginBottom: '10px' }}>
      {scramble}
    </div>
  );
}

export default ScrambleDisplay;