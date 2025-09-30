import React from 'react';
import CubeVisualizerWrapper from './CubeVisualizerWrapper';

function SolveDetailsModal({ solve, onClose, onTogglePenalty, onDelete }) {
  if (!solve) return null;

  const formatTime = (solve) => {
    if (solve.penalty === 'DNF') return 'DNF';
    const base = solve.baseTime;
    if (solve.penalty === '+2') {
      return `${(base + 2).toFixed(2)}s`;
    }
    return `${base.toFixed(2)}s`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '500px',
        width: '90%',
        color: '#ffffff'
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>{formatTime(solve)}</h2>
          <button style={{ padding: '5px 10px' }}>Edit</button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => onTogglePenalty(solve.id, '+2')} style={{ margin: '0 5px', padding: '5px 10px' }}>+2</button>
          <button onClick={() => onTogglePenalty(solve.id, 'DNF')} style={{ margin: '0 5px', padding: '5px 10px' }}>DNF</button>
          <button onClick={() => onDelete(solve.id)} style={{ margin: '0 5px', padding: '5px 10px' }}>Delete</button>
        </div>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <CubeVisualizerWrapper scramble={solve.scramble} />
        </div>
        <div style={{ textAlign: 'center', color: '#cccccc' }}>
          {formatDate(solve.timestamp)}
        </div>
        <button onClick={onClose} style={{ marginTop: '20px', padding: '5px 10px', width: '100%' }}>Close</button>
      </div>
    </div>
  );
}

export default SolveDetailsModal;