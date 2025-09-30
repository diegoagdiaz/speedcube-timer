// src/components/TimesList.js
import React from 'react';

function TimesList({ solves, onDelete, onTogglePenalty, onSelectSolve }) {
  const formatTime = (solve) => {
    if (solve.penalty === 'DNF') return 'DNF';
    const base = solve.baseTime;
    if (solve.penalty === '+2') {
      return `${(base + 2).toFixed(2)}s (+2)`;
    }
    return `${base.toFixed(2)}s`;
  };

  const getTimeStyle = (solve) => {
    if (solve.penalty === '+2') {
      return { color: 'orange', textShadow: '0 0 5px orange' };
    }
    if (solve.penalty === 'DNF') {
      return { color: 'red', textShadow: '0 0 5px red' };
    }
    return { color: 'var(--white)', textShadow: 'none' };
  };

  return (
    <div style={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', padding: '10px', borderRadius: '5px' }}>
      <h2 style={{ marginTop: 0, marginBottom: '15px', fontWeight: 'bold', textAlign: 'center' }}>Solve Times</h2>
      <ul style={{ listStyleType: 'none', padding: 0, maxHeight: '400px', overflowY: 'auto' }}>
        {solves.map((solve, index) => (
          <li key={solve.id} className="solve-item" style={{ padding: '5px 0', borderBottom: '1px solid #555', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => onSelectSolve(solve)}>
            <span style={getTimeStyle(solve)}>{index + 1}. {formatTime(solve)}</span>
            <div style={{ opacity: 0, transition: 'opacity 0.3s' }} className="buttons">
              {/* Updated onClick handlers below */}
              <button onClick={(e) => { e.stopPropagation(); onTogglePenalty(solve.id, '+2'); }} style={{ margin: '0 2px', padding: '2px 6px', fontSize: '12px', backgroundColor: (solve.penalty === '+2' || solve.penalty === 'DNF') ? 'gray' : undefined, color: solve.penalty === '+2' ? 'orange' : 'var(--white)' }}>+2</button>
              <button onClick={(e) => { e.stopPropagation(); onTogglePenalty(solve.id, 'DNF'); }} style={{ margin: '0 2px', padding: '2px 6px', fontSize: '12px', backgroundColor: (solve.penalty === '+2' || solve.penalty === 'DNF') ? 'gray' : undefined, color: solve.penalty === 'DNF' ? 'red' : 'var(--white)' }}>DNF</button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(solve.id); }} style={{ margin: '0 2px', padding: '2px 6px', fontSize: '12px' }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TimesList;