import React from 'react';

function ScrambleDisplay({ scramble }) {
  return (
    <div style={{ fontSize: '16px', color: '#cccccc', marginBottom: '10px' }}>
      {scramble}
    </div>
  );
}

export default ScrambleDisplay;