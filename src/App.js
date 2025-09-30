import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Timer from './components/Timer';
import TimesList from './components/TimesList';
import Stats from './components/Stats';
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
    const saved = localStorage.getItem('inspectionEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [inspectionDuration, setInspectionDuration] = useState(() => {
    const saved = localStorage.getItem('inspectionDuration');
    return saved !== null ? JSON.parse(saved) : 15;
  });

  useEffect(() => {
    setScramble(generateScramble());
  }, []);

  useEffect(() => {
    localStorage.setItem('speedcube-solves', JSON.stringify(solves));
  }, [solves]);

  useEffect(() => {
    localStorage.setItem('inspectionEnabled', JSON.stringify(inspectionEnabled));
  }, [inspectionEnabled]);

  useEffect(() => {
    localStorage.setItem('inspectionDuration', JSON.stringify(inspectionDuration));
  }, [inspectionDuration]);

  useEffect(() => {
    if (selectedSolve) {
      const updatedSolve = solves.find(s => s.id === selectedSolve.id);
      setSelectedSolve(updatedSolve);
    }
  }, [solves, selectedSolve]);

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

  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={
          <div style={{ marginLeft: '200px' }}>
            <Timer onSaveTime={handleSaveTime} scramble={scramble} inspectionEnabled={inspectionEnabled} inspectionDuration={inspectionDuration} onToggleInspection={toggleInspection} />
            <div style={{ position: 'absolute', top: '120px', left: '220px', width: '250px', maxHeight: 'calc(100vh - 200px)', overflow: 'auto', zIndex: 10 }}>
              <TimesList solves={solves} onDelete={handleDelete} onTogglePenalty={togglePenalty} onSelectSolve={setSelectedSolve} />
            </div>
            <div style={{ position: 'absolute', top: '120px', right: '20px', width: '250px', maxHeight: 'calc(100vh - 200px)', overflow: 'visible', zIndex: 10 }}>
              <Stats solves={solves} />
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
        <Route path="/settings" element={<Settings clearTimes={clearTimes} exportTimes={exportTimes} inspectionEnabled={inspectionEnabled} inspectionDuration={inspectionDuration} setInspectionEnabled={setInspectionEnabled} setInspectionDuration={setInspectionDuration} />} />
        <Route path="/tutorial" element={<Tutorial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
