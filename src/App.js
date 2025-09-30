import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Timer from './components/Timer';
import TimesList from './components/TimesList';
import Stats from './components/Stats';
import VisualScramble from './components/VisualScramble';
import LastSolve from './components/LastSolve';
import Consistency from './components/Consistency';
import TimeGraph from './components/TimeGraph';
import TimeDistribution from './components/TimeDistribution';
import SolveDetailsModal from './components/SolveDetailsModal';
import Sidebar from './components/Sidebar';
import Statistics from './components/Statistics';
import Settings from './components/Settings';
import Tutorial from './components/Tutorial';
import { generateScramble } from './utils/calculations';
import './App.css';

function App() {
  const [solves, setSolves] = useState(() => {
    const saved = localStorage.getItem('speedcube-solves');
    return saved ? JSON.parse(saved) : [];
  });
  const [scramble, setScramble] = useState('');
  const [selectedSolve, setSelectedSolve] = useState(null);
  const [inspectionEnabled, setInspectionEnabled] = useState(() => {
    const saved = localStorage.getItem('speedcube-app-settings');
    return saved ? JSON.parse(saved).inspectionEnabled ?? true : true;
  });
  const [inspectionDuration, setInspectionDuration] = useState(() => {
    const saved = localStorage.getItem('speedcube-app-settings');
    return saved ? JSON.parse(saved).inspectionDuration ?? 15 : 15;
  });
  const [widgets, setWidgets] = useState(() => {
    const saved = localStorage.getItem('speedcube-widgets');
    return saved ? JSON.parse(saved) : ['Solves', 'Stats', 'None'];
  });

  useEffect(() => {
    setScramble(generateScramble());
  }, []);

  // Consolidated localStorage persistence
  useEffect(() => {
    const settings = {
      inspectionEnabled,
      inspectionDuration
    };
    localStorage.setItem('speedcube-app-settings', JSON.stringify(settings));
  }, [inspectionEnabled, inspectionDuration]);

  useEffect(() => {
    if (selectedSolve) {
      const updatedSolve = solves.find(s => s.id === selectedSolve.id);
      setSelectedSolve(updatedSolve);
    }
  }, [solves, selectedSolve]);

  useEffect(() => {
    localStorage.setItem('speedcube-widgets', JSON.stringify(widgets));
  }, [widgets]);

  const handleSaveTime = (time, penalty) => {
    const newSolve = { id: Date.now(), baseTime: time, penalty, scramble, timestamp: new Date() };
    setSolves(prevSolves => [...prevSolves, newSolve]);
    setScramble(generateScramble());
  };

  const handleDelete = (id) => {
    setSolves(prevSolves => prevSolves.filter(solve => solve.id !== id));
  };

  const togglePenalty = (id, penaltyType) => {
    setSolves(prevSolves => prevSolves.map(solve =>
      solve.id === id
        ? { ...solve, penalty: solve.penalty === penaltyType ? null : penaltyType }
        : solve
    ));
  };

  const handleUpdateScramble = (solveId, newScramble) => {
    setSolves(prevSolves =>
      prevSolves.map(solve =>
        solve.id === solveId ? { ...solve, scramble: newScramble } : solve
      )
    );
  };

  const clearTimes = () => {
    setSolves([]);
  };

  const exportTimes = () => {
    if (solves.length === 0) return;
    const csvContent = 'Solve,Time\n' + solves.map((solve, index) => {
      const displayTime = solve.penalty === 'DNF' ? 'DNF' : solve.penalty === '+2' ? (solve.baseTime + 2).toFixed(2) : solve.baseTime.toFixed(2);
      return `${index + 1},${displayTime}`;
    }).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'speedcube-times.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleInspection = () => {
    setInspectionEnabled(!inspectionEnabled);
  };

  const renderWidget = (widgetName) => {
    switch (widgetName) {
      case 'Solves':
        return <TimesList solves={solves} onDelete={handleDelete} onTogglePenalty={togglePenalty} onSelectSolve={setSelectedSolve} />;
      case 'Stats':
        return <Stats solves={solves} />;
      case 'Visual Scramble':
        return <VisualScramble scramble={scramble} />;
      case 'Last Solve':
        return <LastSolve solves={solves} />;
      case 'Consistency':
        return <Consistency solves={solves} />;
      case 'Time Graph':
        return <TimeGraph solves={solves} />;
      case 'Time Distribution':
        return <TimeDistribution solves={solves} />;
      case 'None':
      default:
        return <div style={{ height: '100%', backgroundColor: 'rgba(26, 26, 26, 0.9)', borderRadius: '5px' }}></div>;
    }
  };

  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={
          <div className="main-view">
            <div className="timer-wrapper">
              <Timer onSaveTime={handleSaveTime} scramble={scramble} inspectionEnabled={inspectionEnabled} inspectionDuration={inspectionDuration} onToggleInspection={toggleInspection} />
            </div>
            <div className="widget-area">
              {widgets.map((widget, index) => (
                <div key={index} className="widget-slot">
                  {renderWidget(widget)}
                </div>
              ))}
            </div>
            <SolveDetailsModal
              solve={selectedSolve}
              onClose={() => setSelectedSolve(null)}
              onTogglePenalty={togglePenalty}
              onDelete={handleDelete}
              onUpdateScramble={handleUpdateScramble}
            />
          </div>
        } />
        <Route path="/stats" element={<Statistics solves={solves} />} />
        <Route path="/settings" element={<Settings clearTimes={clearTimes} exportTimes={exportTimes} inspectionEnabled={inspectionEnabled} inspectionDuration={inspectionDuration} setInspectionEnabled={setInspectionEnabled} setInspectionDuration={setInspectionDuration} widgets={widgets} setWidgets={setWidgets} />} />
        <Route path="/tutorial" element={<Tutorial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
