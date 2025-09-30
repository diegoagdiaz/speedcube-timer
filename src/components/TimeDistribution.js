import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateTimeDistribution } from '../utils/calculations';

function TimeDistribution({ solves }) {
  const validSolves = solves.filter(solve => solve.penalty !== 'DNF');
  const times = validSolves.map(solve => solve.penalty === '+2' ? solve.baseTime + 2 : solve.baseTime);
  const distribution = calculateTimeDistribution(times);

  return (
    <div style={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', padding: '10px', borderRadius: '5px', height: '100%' }}>
      <h3 style={{ marginTop: 0, marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>Time Distribution</h3>
      {distribution.length > 0 ? (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={distribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: 'var(--white)' }}>No data</div>
      )}
    </div>
  );
}

export default TimeDistribution;