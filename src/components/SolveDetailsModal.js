// src/components/SolveDetailsModal.js
import React, { useState, useEffect } from 'react';
import CubeVisualizerWrapper from './CubeVisualizerWrapper';

function SolveDetailsModal({ solve, onClose, onTogglePenalty, onDelete, onUpdateScramble }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedScramble, setEditedScramble] = useState(solve ? solve.scramble : '');

  useEffect(() => {
    if (solve) {
      setIsEditing(false);
      setEditedScramble(solve.scramble);
    }
  }, [solve]);

  if (!solve) return null;

  const formatTime = (solve) => {
    if (solve.penalty === 'DNF') return 'DNF';
    const base = solve.baseTime;
    const finalTime = solve.penalty === '+2' ? base + 2 : base;
    return `${finalTime.toFixed(2)}s`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleDeleteAndClose = () => {
    onDelete(solve.id);
    onClose();
  };

  const handleSave = () => {
    onUpdateScramble(solve.id, editedScramble);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedScramble(solve.scramble);
  };

  return (
    // Modal Backdrop
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }} onClick={onClose}>
      
      {/* Modal Content */}
      <div style={{
        backgroundColor: '#282828',
        padding: '20px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '440px',
        color: 'white',
        display: 'flex',          // Use Flexbox
        flexDirection: 'column',  // Stack children vertically
        alignItems: 'center',     // Center children horizontally
        gap: '18px'               // Add consistent spacing between children
      }} onClick={(e) => e.stopPropagation()}>

        {/* Header: Time and Edit Button */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>{formatTime(solve)}</h2>
          {!isEditing && <button onClick={() => setIsEditing(true)} style={{ padding: '6px 12px', fontSize: '14px' }}>Edit</button>}
        </div>

        {/* Conditional Buttons */}
        {isEditing ? (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleSave} style={{ padding: '6px 12px', fontSize: '14px' }}>Save</button>
            <button onClick={handleCancel} style={{ padding: '6px 12px', fontSize: '14px' }}>Cancel</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => onTogglePenalty(solve.id, '+2')} style={{ padding: '6px 12px', fontSize: '14px' }}>+2</button>
            <button onClick={() => onTogglePenalty(solve.id, 'DNF')} style={{ padding: '6px 12px', fontSize: '14px' }}>DNF</button>
            <button onClick={handleDeleteAndClose} style={{ padding: '6px 12px', fontSize: '14px' }}>Delete</button>
          </div>
        )}

        {/* Scramble */}
        {isEditing ? (
          <input
            type="text"
            value={editedScramble}
            onChange={(e) => setEditedScramble(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '15px',
              backgroundColor: '#444',
              color: 'white',
              border: '1px solid #666',
              borderRadius: '4px',
              wordWrap: 'break-word',
              textAlign: 'center'
            }}
          />
        ) : (
          <p style={{ color: '#b3b3b3', fontSize: '15px', wordWrap: 'break-word', textAlign: 'center', margin: 0 }}>
            {solve.scramble}
          </p>
        )}

        {/* Cube Visualizer Container */}
        <div style={{ height: '320px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CubeVisualizerWrapper scramble={solve.scramble} />
        </div>

        {/* Timestamp */}
        <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>
          {formatDate(solve.timestamp)}
        </p>
        
        {/* Close Button */}
        <button onClick={onClose} style={{ padding: '10px', width: '100%', fontSize: '16px' }}>Close</button>

      </div>
    </div>
  );
}

export default SolveDetailsModal;