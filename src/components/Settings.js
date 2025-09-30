import React from 'react';

const Settings = ({ clearTimes, exportTimes, inspectionEnabled, inspectionDuration, setInspectionEnabled, setInspectionDuration, widgets, setWidgets }) => {
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

      <h2>Widget Configuration</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {widgets.map((widget, index) => (
          <label key={index}>
            Slot {index + 1}:
            <select
              value={widget}
              onChange={(e) => {
                const newWidgets = [...widgets];
                newWidgets[index] = e.target.value;
                setWidgets(newWidgets);
              }}
            >
              <option value="Solves">Solves</option>
              <option value="Stats">Stats</option>
              <option value="Visual Scramble">Visual Scramble</option>
              <option value="Last Solve">Last Solve</option>
              <option value="Consistency">Consistency</option>
              <option value="Time Graph">Time Graph</option>
              <option value="Time Distribution">Time Distribution</option>
              <option value="None">None</option>
            </select>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Settings;