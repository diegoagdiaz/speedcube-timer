import React from 'react';

function Statistics({ solves }) {
  // Helper functions
  const getTotalTimeSpent = () => {
    return solves.reduce((total, solve) => {
      if (solve.penalty === 'DNF') return total;
      return total + solve.baseTime + (solve.penalty === '+2' ? 2 : 0);
    }, 0);
  };

  const getTotalSolves = () => solves.length;

  const getNumberOfEvents = () => {
    const events = new Set(solves.map(solve => solve.event).filter(Boolean));
    return events.size || 1; // Assume 1 if no event
  };

  const getTopEvent = () => {
    const eventCounts = {};
    solves.forEach(solve => {
      const event = solve.event || 'Default';
      eventCounts[event] = (eventCounts[event] || 0) + 1;
    });
    const top = Object.entries(eventCounts).reduce((a, b) => a[1] > b[1] ? a : b, ['', 0]);
    return top[0] || 'N/A';
  };

  const getSolveStreak = () => {
    let streak = 0;
    for (let i = solves.length - 1; i >= 0; i--) {
      if (solves[i].penalty !== 'DNF') {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const getHighestStreak = () => {
    let maxStreak = 0;
    let currentStreak = 0;
    solves.forEach(solve => {
      if (solve.penalty !== 'DNF') {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    });
    return maxStreak;
  };

  const getDNFCount = () => solves.filter(solve => solve.penalty === 'DNF').length;

  const getPlusTwoCount = () => solves.filter(solve => solve.penalty === '+2').length;

  const getAvgSolvesPerSession = () => {
    if (solves.length === 0) return 'N/A';
    // Assuming sessions are per day
    const dates = solves.map(solve => new Date(solve.timestamp).toDateString());
    const uniqueDates = new Set(dates);
    return (solves.length / uniqueDates.size).toFixed(1);
  };

  const getFirstSolve = () => {
    if (solves.length === 0) return 'N/A';
    const first = solves.reduce((earliest, solve) =>
      new Date(solve.timestamp) < new Date(earliest.timestamp) ? solve : earliest
    );
    return new Date(first.timestamp).toLocaleDateString();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(2);
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div style={{ backgroundColor: 'var(--black)', color: 'var(--white)', padding: '20px', borderRadius: '8px', marginLeft: '200px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Advanced Statistics</h2>

      <div style={{ marginBottom: '30px' }}>
        <h3>Overview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>Time Spent Cubing: {formatTime(getTotalTimeSpent())}</div>
          <div>Total Solves: {getTotalSolves()}</div>
          <div>Number of Events: {getNumberOfEvents()}</div>
          <div>Top Event: {getTopEvent()}</div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Community</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>Matches: N/A</div>
          <div>Wins: N/A</div>
          <div>Losses: N/A</div>
        </div>
      </div>

      <div>
        <h3>More Stats</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>Solve Streak: {getSolveStreak()}</div>
          <div>Highest Streak: {getHighestStreak()}</div>
          <div>DNFs: {getDNFCount()}</div>
          <div>+2s: {getPlusTwoCount()}</div>
          <div>Avg # Solves / Session: {getAvgSolvesPerSession()}</div>
          <div>First Solve: {getFirstSolve()}</div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;