import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function TimeGraph({ solves }) {
  const validSolves = solves.filter(solve => solve.penalty !== 'DNF');
  const chartData = validSolves.map((solve, index) => ({
    solve: index + 1,
    time: solve.penalty === '+2' ? solve.baseTime + 2 : solve.baseTime,
  }));

  return (
    <div style={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', padding: '10px', borderRadius: '5px', height: '100%' }}>
      <h3 style={{ marginTop: 0, marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>Time Graph</h3>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="solve" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="time" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: 'var(--white)' }}>No data</div>
      )}
    </div>
  );
}

export default TimeGraph;