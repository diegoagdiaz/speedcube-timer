import React from 'react';

const Settings = ({ clearTimes, exportTimes, inspectionEnabled, inspectionDuration, setInspectionEnabled, setInspectionDuration }) => {
  const handleInspectionChange = (e) => {
    const enabled = e.target.checked;
    setInspectionEnabled(enabled);
    localStorage.setItem('inspectionEnabled', JSON.stringify(enabled));
  };

  const handleDurationChange = (e) => {
    const duration = parseInt(e.target.value);
    setInspectionDuration(duration);
    localStorage.setItem('inspectionDuration', JSON.stringify(duration));
  };

  return (
    <div style={{ backgroundColor: 'var(--black)', color: 'var(--white)', padding: '20px', marginLeft: '200px' }}>
      <h2>Data Management</h2>
      <button onClick={clearTimes}>Clear All Times</button>
      <button onClick={exportTimes}>Export Times</button>

      <h2>Inspection Time</h2>
      <label>
        <input type="checkbox" checked={inspectionEnabled} onChange={handleInspectionChange} />
        Enable Inspection
      </label>
      <br />
      <label>
        Duration (seconds):
        <input
          type="number"
          value={inspectionDuration}
          onChange={handleDurationChange}
          min="1"
          max="60"
          step="1"
        />
      </label>
    </div>
  );
};

export default Settings;