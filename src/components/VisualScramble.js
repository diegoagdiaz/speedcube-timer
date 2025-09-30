import React from 'react';
import CubeVisualizerWrapper from './CubeVisualizerWrapper';

function VisualScramble({ scramble }) {
  return (
    <div style={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', padding: '10px', borderRadius: '5px', height: '100%' }}>
      <h3 style={{ marginTop: 0, marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>Visual Scramble</h3>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100% - 40px)' }}>
        <CubeVisualizerWrapper scramble={scramble} />
      </div>
    </div>
  );
}

export default VisualScramble;