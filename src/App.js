import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import TimesList from './components/TimesList';
import Stats from './components/Stats';
import SolveDetailsModal from './components/SolveDetailsModal';
import { generateScramble } from './utils/calculations';
import './App.css';

function App() {
  const [solves, setSolves] = useState([]);
  const [scramble, setScramble] = useState('');
  const [selectedSolve, setSelectedSolve] = useState(null);

  useEffect(() => {
    const savedSolves = localStorage.getItem('speedcube-solves');
    if (savedSolves) {
      setSolves(JSON.parse(savedSolves));
    }
    setScramble(generateScramble());
  }, []);

  useEffect(() => {
    localStorage.setItem('speedcube-solves', JSON.stringify(solves));
  }, [solves]);

  useEffect(() => {
    if (selectedSolve) {
      const updatedSolve = solves.find(s => s.id === selectedSolve.id);
      setSelectedSolve(updatedSolve);
    }
  }, [solves, selectedSolve]);

  const handleSaveTime = (time) => {
    const newSolve = { id: Date.now(), baseTime: time, penalty: null, scramble, timestamp: new Date() };
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

  return (
    <div className="App">
      <Timer onSaveTime={handleSaveTime} scramble={scramble} />
      <div style={{ position: 'absolute', top: '120px', left: '20px', width: '250px', maxHeight: 'calc(100vh - 200px)', overflow: 'auto', zIndex: 10 }}>
        <TimesList solves={solves} onDelete={handleDelete} onTogglePenalty={togglePenalty} onSelectSolve={setSelectedSolve} />
      </div>
      <div style={{ position: 'absolute', top: '120px', right: '20px', width: '250px', maxHeight: 'calc(100vh - 200px)', overflow: 'visible', zIndex: 10 }}>
        <Stats solves={solves} />
      </div>
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
        <button onClick={clearTimes} style={{ margin: '0 10px', padding: '8px 16px', fontSize: '14px' }}>
          Clear All Times
        </button>
        <button onClick={exportTimes} style={{ margin: '0 10px', padding: '8px 16px', fontSize: '14px' }}>
          Export Times (CSV)
        </button>
      </div>
      <SolveDetailsModal
        solve={selectedSolve}
        onClose={() => setSelectedSolve(null)}
        onTogglePenalty={togglePenalty}
        onDelete={handleDelete}
        onUpdateScramble={handleUpdateScramble}
      />
    </div>
  );
}

export default App;
